import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";
import { sendWhatsApp } from "@/lib/twilio";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

// Numero sandbox Twilio per fallback in sviluppo
const TWILIO_SANDBOX_NUMBER = "+14155238886";

function twimlResponse(message: string) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${escapeXml(message)}</Message></Response>`;
  return new NextResponse(xml, {
    headers: { "Content-Type": "text/xml" },
  });
}

function escapeXml(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// Trova l'attivita dal numero WhatsApp di destinazione (To)
async function findAttivitaByWhatsApp(toNumber: string) {
  // Prova lookup diretto per numero WhatsApp
  const { data } = await supabase
    .from("attivita")
    .select("*")
    .eq("whatsapp", toNumber)
    .single();

  if (data) return data;

  // Fallback sandbox: se il numero è quello sandbox Twilio, usa la prima attivita con un user_id (attiva)
  if (toNumber === TWILIO_SANDBOX_NUMBER || toNumber === "") {
    const { data: first } = await supabase
      .from("attivita")
      .select("*")
      .not("whatsapp", "is", null)
      .not("user_id", "is", null)
      .limit(1)
      .single();
    return first;
  }

  return null;
}

// Carica o crea conversazione per questo numero + attivita
async function getConversazione(telefono: string, attivitaId: string) {
  const { data } = await supabase
    .from("conversazioni_whatsapp")
    .select("*")
    .eq("telefono", telefono)
    .eq("attivita_id", attivitaId)
    .single();

  if (data) {
    // Se la conversazione è vecchia di più di 2 ore, resettala
    const lastUpdate = new Date(data.updated_at).getTime();
    const now = Date.now();
    if (now - lastUpdate > 2 * 60 * 60 * 1000) {
      await supabase.from("conversazioni_whatsapp").update({ messaggi: [], updated_at: new Date().toISOString() }).eq("id", data.id);
      return { id: data.id, messaggi: [] };
    }
    return { id: data.id, messaggi: data.messaggi || [] };
  }

  // Crea nuova conversazione
  const { data: nuova } = await supabase
    .from("conversazioni_whatsapp")
    .insert({ telefono, attivita_id: attivitaId, messaggi: [] })
    .select()
    .single();
  return { id: nuova?.id, messaggi: [] };
}

// Salva messaggio nella conversazione
async function salvaMessaggi(convId: string, messaggi: Array<{ role: string; content: string }>) {
  // Tieni solo gli ultimi 10 messaggi per non superare il contesto
  const ultimi = messaggi.slice(-10);
  await supabase
    .from("conversazioni_whatsapp")
    .update({ messaggi: ultimi, updated_at: new Date().toISOString() })
    .eq("id", convId);
}

export async function GET() {
  return NextResponse.json({ status: "ok", message: "Webhook WhatsApp Reservi attivo" });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const body = formData.get("Body") as string;
    const from = formData.get("From") as string;

    if (!body || !from) {
      return twimlResponse("Buongiorno! Come posso aiutarla con la prenotazione?");
    }

    const telefono = from.replace("whatsapp:", "");
    const to = ((formData.get("To") as string) || "").replace("whatsapp:", "");

    // Trova il ristorante dal numero WhatsApp di destinazione
    const attivita = await findAttivitaByWhatsApp(to);

    if (!attivita) {
      return twimlResponse("Questo numero non è ancora configurato. Contatta il supporto Reservi.");
    }

    const attivitaId = attivita.id;

    // Carica conversazione precedente (scoped per attivita)
    const conv = await getConversazione(telefono, attivitaId);

    const { data: turni } = await supabase
      .from("turni")
      .select("*")
      .eq("attivita_id", attivitaId)
      .order("ordine");

    // Disponibilità prossimi 7 giorni
    const oggi = new Date().toISOString().split("T")[0];
    const tra7gg = new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0];

    const { data: prenSettimana } = await supabase
      .from("prenotazioni")
      .select("*")
      .eq("attivita_id", attivitaId)
      .gte("data", oggi)
      .lte("data", tra7gg)
      .in("stato", ["confermata", "in_attesa"]);

    // Mappa giorni di apertura (0=Domenica in JS, ma orari è 0=Lunedì)
    // Converte: orari[0]=Lunedì → JS day 1, orari[6]=Domenica → JS day 0
    const orariAttivita = Array.isArray(attivita?.orari) && attivita.orari.length === 7 ? attivita.orari : null;
    const giorniAperti = new Set<number>();
    if (orariAttivita) {
      orariAttivita.forEach((o: { aperto: boolean }, i: number) => {
        if (o.aperto) {
          // orari[0]=Lunedì=JS 1, orari[1]=Martedì=JS 2, ... orari[6]=Domenica=JS 0
          giorniAperti.add(i === 6 ? 0 : i + 1);
        }
      });
    }

    // Genera disponibilita per ogni giorno x turno
    const giorniDisp: string[] = [];
    for (let d = 0; d < 7; d++) {
      const dataObj = new Date(Date.now() + d * 86400000);
      const dataStr = dataObj.toISOString().split("T")[0];
      const nomeGiorno = dataObj.toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" });
      const jsDay = dataObj.getDay(); // 0=Domenica, 1=Lunedì, ...

      // Se i giorni di apertura sono configurati e questo giorno è chiuso, segnalo CHIUSO
      if (orariAttivita && !giorniAperti.has(jsDay)) {
        giorniDisp.push(`${nomeGiorno} (${dataStr}): CHIUSO`);
        continue;
      }

      const righe = (turni || []).map((turno) => {
        const occ = (prenSettimana || []).filter((p) => p.turno_id === turno.id && p.data === dataStr).reduce((s: number, p: { n_persone: number }) => s + p.n_persone, 0);
        const liberi = turno.coperti - occ;
        return `  - ${turno.nome} (${turno.inizio}-${turno.fine}): ${liberi > 0 ? liberi + " liberi" : "PIENO"} [turno_id: ${turno.id}]`;
      });

      giorniDisp.push(`${nomeGiorno} (${dataStr}):\n${righe.join("\n")}`);
    }

    const disponibilitaStr = giorniDisp.join("\n\n");

    // Carica prenotazioni future del cliente (per gestire disdette)
    const { data: prenCliente } = await supabase
      .from("prenotazioni")
      .select("*")
      .eq("attivita_id", attivitaId)
      .eq("telefono_cliente", telefono)
      .gte("data", oggi)
      .in("stato", ["confermata", "in_attesa"])
      .order("data");

    const prenotazioniClienteStr = (prenCliente && prenCliente.length > 0)
      ? prenCliente.map((p: { id: string; nome_cliente: string; data: string; ora: string; n_persone: number }) => {
          const dataF = new Date(p.data + "T12:00:00").toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" });
          return `- ${p.nome_cliente}, ${dataF} ore ${p.ora}, ${p.n_persone} persone [id: ${p.id}]`;
        }).join("\n")
      : "Nessuna prenotazione futura";

    const nomeAttivita = attivita?.nome || "il ristorante";
    const dataOggi = new Date().toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" });

    const infoExtra = attivita?.info_extra || "";

    const systemPrompt = `Sei l'assistente WhatsApp di "${nomeAttivita}". Sei cordiale, professionale e conciso. Rispondi come un cameriere esperto al telefono — frasi brevi, mai più di 2-3 frasi.

OGGI: ${dataOggi} (${oggi})
INDIRIZZO: ${attivita?.indirizzo || "non specificato"}
TELEFONO: ${attivita?.telefono || "non specificato"}
${infoExtra ? `\nINFORMAZIONI SULL'ATTIVITA':\n${infoExtra}\n` : ""}

DISPONIBILITA' PROSSIMI 7 GIORNI:
${disponibilitaStr}

PRENOTAZIONI ATTIVE DI QUESTO CLIENTE:
${prenotazioniClienteStr}

COME GESTIRE UNA PRENOTAZIONE:
Per prenotare servono 4 informazioni. Chiedile UNA ALLA VOLTA se mancano:
1. NOME (cognome del cliente) — chiedi sempre per primo: "A che nome la prenotazione?"
2. DATA (quando) — se dice "stasera" = oggi, "domani sera" = domani
3. TURNO/ORA — proponi i turni disponibili
4. NUMERO PERSONE — "Per quante persone?"

QUANDO HAI TUTTE E 4 LE INFORMAZIONI, rispondi SOLO con questo formato esatto (nessun altro testo):
PRENOTA|nome_cliente|YYYY-MM-DD|HH:MM|numero_persone|turno_id|note

Esempio: PRENOTA|Rossi|2026-04-18|20:00|4|abc-def-123|

COME GESTIRE UNA DISDETTA:
Se il cliente vuole cancellare/disdire una prenotazione:
1. Cerca la prenotazione nelle PRENOTAZIONI ATTIVE DI QUESTO CLIENTE
2. Se c'è una sola prenotazione, chiedi conferma: "Vuole cancellare la prenotazione per [data] alle [ora]?"
3. Se ce ne sono più di una, chiedi quale vuole cancellare
4. Quando il cliente conferma, rispondi SOLO con questo formato esatto:
DISDETTA|prenotazione_id

Esempio: DISDETTA|abc-123-def-456

Se non ci sono prenotazioni attive, informa il cliente gentilmente.

REGOLE:
- Chiedi UNA informazione alla volta, non tutte insieme
- Se un giorno è CHIUSO, informa il cliente e proponi il giorno aperto più vicino
- Se un turno è pieno, proponi l'alternativa
- Se il cliente chiede info presenti nelle INFORMAZIONI SULL'ATTIVITA', rispondi con quelle informazioni
- Se il cliente chiede qualcosa che NON è nelle informazioni fornite, rispondi: "Non ho questa informazione, ma può chiamarci al ${attivita?.telefono || "ristorante"} e saremo felici di aiutarla!"
- Mai inventare informazioni o disponibilità
- Max 200 caratteri per risposta
- Non mostrare mai i formati PRENOTA o DISDETTA al cliente, usali solo quando hai tutti i dati`;

    // Costruisci i messaggi con la cronologia
    const messaggiClaude: Array<{ role: "user" | "assistant"; content: string }> = [];
    for (const msg of conv.messaggi) {
      messaggiClaude.push({ role: msg.role as "user" | "assistant", content: msg.content });
    }
    messaggiClaude.push({ role: "user", content: body });

    // Chiama Claude con la cronologia
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system: systemPrompt,
      messages: messaggiClaude,
    });

    const aiResponse = response.content[0].type === "text" ? response.content[0].text : "";

    // Controlla se è un comando di disdetta
    if (aiResponse.startsWith("DISDETTA|")) {
      const parts = aiResponse.split("|");
      const prenotazioneId = parts[1]?.trim();

      if (prenotazioneId) {
        const { data: pren, error } = await supabase
          .from("prenotazioni")
          .update({ stato: "disdetta" })
          .eq("id", prenotazioneId)
          .eq("attivita_id", attivitaId)
          .select("nome_cliente, data, ora, n_persone")
          .single();

        if (error || !pren) {
          conv.messaggi.push({ role: "user", content: body });
          conv.messaggi.push({ role: "assistant", content: "Errore disdetta" });
          await salvaMessaggi(conv.id, conv.messaggi);
          return twimlResponse("Mi scusi, non sono riuscito a cancellare la prenotazione. Provi a chiamarci.");
        }

        const dataF = new Date(pren.data + "T12:00:00").toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" });
        const conferma = `Prenotazione cancellata.\n\n${pren.nome_cliente}\n${dataF} ore ${pren.ora}\n${pren.n_persone} persone\n\nSperiamo di rivederla presto da ${nomeAttivita}!`;

        await supabase.from("conversazioni_whatsapp").update({ messaggi: [], updated_at: new Date().toISOString() }).eq("id", conv.id);

        // Notifica disdetta al titolare
        const ownerNumD = attivita.whatsapp || attivita.telefono;
        if (ownerNumD && ownerNumD !== telefono) {
          try {
            await sendWhatsApp(ownerNumD, `Disdetta via WhatsApp\n\n${pren.nome_cliente}\n${dataF} ore ${pren.ora}\n${pren.n_persone} persone`);
          } catch (e) {
            console.error("Errore notifica disdetta titolare:", e);
          }
        }

        return twimlResponse(conferma);
      }
    }

    // Controlla se è un comando di prenotazione
    if (aiResponse.startsWith("PRENOTA|")) {
      const parts = aiResponse.split("|");
      if (parts.length >= 6) {
        const [, nome, data, ora, persone, turnoId, ...noteParts] = parts;
        const note = noteParts.join("|") || "";

        const { error } = await supabase.from("prenotazioni").insert({
          attivita_id: attivitaId,
          nome_cliente: nome,
          telefono_cliente: telefono,
          data: data,
          ora: ora,
          n_persone: parseInt(persone),
          turno_id: turnoId,
          note: note,
          stato: "confermata",
          fonte: "whatsapp",
        });

        if (error) {
          console.error("Errore inserimento prenotazione:", error);
          // Salva comunque la conversazione
          conv.messaggi.push({ role: "user", content: body });
          conv.messaggi.push({ role: "assistant", content: "Errore prenotazione" });
          await salvaMessaggi(conv.id, conv.messaggi);
          return twimlResponse(`Mi scusi, c'è stato un problema. Può riprovare o chiamarci al ${attivita?.telefono || "ristorante"}.`);
        }

        const dataFormattata = new Date(data + "T12:00:00").toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" });
        const conferma = `Prenotazione confermata!\n\n${nome}\n${dataFormattata}\nOre ${ora}\n${persone} persone${note ? `\n${note}` : ""}\n\nA presto da ${nomeAttivita}!`;

        // Salva conversazione e resettala (prenotazione completata)
        await supabase.from("conversazioni_whatsapp").update({ messaggi: [], updated_at: new Date().toISOString() }).eq("id", conv.id);

        // Notifica al titolare
        const ownerNum = attivita.whatsapp || attivita.telefono;
        if (ownerNum && ownerNum !== telefono) {
          try {
            await sendWhatsApp(ownerNum, `Nuova prenotazione WhatsApp!\n\n${nome}\n${dataFormattata}\nOre ${ora}\n${persone} persone${note ? `\nNote: ${note}` : ""}`);
          } catch (e) {
            console.error("Errore notifica titolare:", e);
          }
        }

        return twimlResponse(conferma);
      }
    }

    // Salva la conversazione aggiornata
    conv.messaggi.push({ role: "user", content: body });
    conv.messaggi.push({ role: "assistant", content: aiResponse });
    await salvaMessaggi(conv.id, conv.messaggi);

    return twimlResponse(aiResponse);
  } catch (error) {
    console.error("Errore webhook WhatsApp:", error);
    return twimlResponse("Mi scusi, c'è stato un problema. Può riprovare tra poco.");
  }
}
