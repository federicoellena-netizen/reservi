import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

const ATTIVITA_ID = "00000000-0000-0000-0000-000000000001";

function twimlResponse(message: string) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${escapeXml(message)}</Message></Response>`;
  return new NextResponse(xml, {
    headers: { "Content-Type": "text/xml" },
  });
}

function escapeXml(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// Carica o crea conversazione per questo numero
async function getConversazione(telefono: string) {
  const { data } = await supabase
    .from("conversazioni_whatsapp")
    .select("*")
    .eq("telefono", telefono)
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
    .insert({ telefono, messaggi: [] })
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

    // Carica conversazione precedente
    const conv = await getConversazione(telefono);

    // Carica dati ristorante
    const { data: attivita } = await supabase
      .from("attivita")
      .select("*")
      .eq("id", ATTIVITA_ID)
      .single();

    const { data: turni } = await supabase
      .from("turni")
      .select("*")
      .eq("attivita_id", ATTIVITA_ID)
      .order("ordine");

    // Disponibilità oggi e domani
    const oggi = new Date().toISOString().split("T")[0];
    const domani = new Date(Date.now() + 86400000).toISOString().split("T")[0];

    const { data: prenOggi } = await supabase
      .from("prenotazioni")
      .select("*")
      .eq("attivita_id", ATTIVITA_ID)
      .eq("data", oggi)
      .in("stato", ["confermata", "in_attesa"]);

    const { data: prenDomani } = await supabase
      .from("prenotazioni")
      .select("*")
      .eq("attivita_id", ATTIVITA_ID)
      .eq("data", domani)
      .in("stato", ["confermata", "in_attesa"]);

    const disponibilita = (turni || []).map((turno) => {
      const occOggi = (prenOggi || []).filter((p) => p.turno_id === turno.id).reduce((s: number, p: { n_persone: number }) => s + p.n_persone, 0);
      const occDomani = (prenDomani || []).filter((p) => p.turno_id === turno.id).reduce((s: number, p: { n_persone: number }) => s + p.n_persone, 0);
      return {
        turno: turno.nome,
        turno_id: turno.id,
        orario: `${turno.inizio}-${turno.fine}`,
        coperti: turno.coperti,
        oggi_liberi: turno.coperti - occOggi,
        domani_liberi: turno.coperti - occDomani,
      };
    });

    const nomeAttivita = attivita?.nome || "il ristorante";
    const dataOggi = new Date().toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" });
    const dataDomani = new Date(Date.now() + 86400000).toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" });

    const systemPrompt = `Sei l'assistente WhatsApp di "${nomeAttivita}". Sei cordiale, professionale e conciso. Rispondi come un cameriere esperto al telefono — frasi brevi, mai più di 2-3 frasi.

OGGI: ${dataOggi} (${oggi})
DOMANI: ${dataDomani} (${domani})
INDIRIZZO: ${attivita?.indirizzo || "non specificato"}
TELEFONO: ${attivita?.telefono || "non specificato"}

TURNI DISPONIBILI:
${disponibilita.map((d) => `- ${d.turno} (${d.orario}): oggi ${d.oggi_liberi > 0 ? d.oggi_liberi + " liberi" : "PIENO"}, domani ${d.domani_liberi > 0 ? d.domani_liberi + " liberi" : "PIENO"} [turno_id: ${d.turno_id}]`).join("\n")}

COME GESTIRE UNA PRENOTAZIONE:
Per prenotare servono 4 informazioni. Chiedile UNA ALLA VOLTA se mancano:
1. NOME (cognome del cliente) — chiedi sempre per primo: "A che nome la prenotazione?"
2. DATA (quando) — se dice "stasera" = oggi, "domani sera" = domani
3. TURNO/ORA — proponi i turni disponibili
4. NUMERO PERSONE — "Per quante persone?"

QUANDO HAI TUTTE E 4 LE INFORMAZIONI, rispondi SOLO con questo formato esatto (nessun altro testo):
PRENOTA|nome_cliente|YYYY-MM-DD|HH:MM|numero_persone|turno_id|note

Esempio: PRENOTA|Rossi|2026-04-18|20:00|4|abc-def-123|

REGOLE:
- Chiedi UNA informazione alla volta, non tutte insieme
- Se un turno è pieno, proponi l'alternativa
- Se il cliente chiede info (orari, indirizzo), rispondi normalmente
- Mai inventare disponibilità
- Max 200 caratteri per risposta
- Non mostrare mai il formato PRENOTA al cliente, usalo solo quando hai tutti i dati`;

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

    // Controlla se è un comando di prenotazione
    if (aiResponse.startsWith("PRENOTA|")) {
      const parts = aiResponse.split("|");
      if (parts.length >= 6) {
        const [, nome, data, ora, persone, turnoId, ...noteParts] = parts;
        const note = noteParts.join("|") || "";

        const { error } = await supabase.from("prenotazioni").insert({
          attivita_id: ATTIVITA_ID,
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
