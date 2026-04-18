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

// Rispondi a Twilio con TwiML
function twimlResponse(message: string) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${escapeXml(message)}</Message></Response>`;
  return new NextResponse(xml, {
    headers: { "Content-Type": "text/xml" },
  });
}

function escapeXml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// GET per verificare che il webhook funzioni
export async function GET() {
  return NextResponse.json({ status: "ok", message: "Webhook WhatsApp Reservi attivo" });
}

// POST — riceve messaggi da Twilio
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const body = formData.get("Body") as string;
    const from = formData.get("From") as string;

    if (!body || !from) {
      return twimlResponse("Mi scusi, non ho capito. Come posso aiutarla?");
    }

    // Pulisci numero telefono
    const telefono = from.replace("whatsapp:", "");

    // Carica info attività
    const { data: attivita } = await supabase
      .from("attivita")
      .select("*")
      .eq("id", ATTIVITA_ID)
      .single();

    // Carica turni
    const { data: turni } = await supabase
      .from("turni")
      .select("*")
      .eq("attivita_id", ATTIVITA_ID)
      .order("ordine");

    // Carica prenotazioni di oggi per calcolare disponibilità
    const oggi = new Date().toISOString().split("T")[0];
    const { data: prenotazioniOggi } = await supabase
      .from("prenotazioni")
      .select("*")
      .eq("attivita_id", ATTIVITA_ID)
      .eq("data", oggi)
      .in("stato", ["confermata", "in_attesa"]);

    // Carica prenotazioni di domani
    const domani = new Date(Date.now() + 86400000).toISOString().split("T")[0];
    const { data: prenotazioniDomani } = await supabase
      .from("prenotazioni")
      .select("*")
      .eq("attivita_id", ATTIVITA_ID)
      .eq("data", domani)
      .in("stato", ["confermata", "in_attesa"]);

    // Calcola disponibilità per turno
    const disponibilita = (turni || []).map((turno) => {
      const prenOggi = (prenotazioniOggi || []).filter((p) => p.turno_id === turno.id);
      const prenDomani = (prenotazioniDomani || []).filter((p) => p.turno_id === turno.id);
      const occupatiOggi = prenOggi.reduce((s: number, p: { n_persone: number }) => s + p.n_persone, 0);
      const occupatiDomani = prenDomani.reduce((s: number, p: { n_persone: number }) => s + p.n_persone, 0);
      return {
        turno: turno.nome,
        turno_id: turno.id,
        orario: `${turno.inizio}-${turno.fine}`,
        coperti_totali: turno.coperti,
        oggi: { occupati: occupatiOggi, liberi: turno.coperti - occupatiOggi },
        domani: { occupati: occupatiDomani, liberi: turno.coperti - occupatiDomani },
      };
    });

    // Controlla se il cliente ha già prenotazioni
    const { data: prenotazioniCliente } = await supabase
      .from("prenotazioni")
      .select("*")
      .eq("attivita_id", ATTIVITA_ID)
      .eq("telefono_cliente", telefono)
      .gte("data", oggi)
      .in("stato", ["confermata", "in_attesa"])
      .order("data")
      .limit(3);

    const nomeAttivita = attivita?.nome || "il ristorante";
    const dataOggi = new Date().toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" });
    const dataDomani = new Date(Date.now() + 86400000).toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" });

    // Prompt per Claude
    const systemPrompt = `Sei l'assistente di prenotazione di "${nomeAttivita}". Rispondi in italiano, in modo cordiale e professionale. Usa frasi brevi e naturali, come un vero cameriere al telefono.

INFORMAZIONI RISTORANTE:
- Nome: ${nomeAttivita}
- Indirizzo: ${attivita?.indirizzo || "Non specificato"}
- Telefono: ${attivita?.telefono || "Non specificato"}

DATA DI OGGI: ${dataOggi} (${oggi})
DATA DI DOMANI: ${dataDomani} (${domani})

TURNI E DISPONIBILITÀ:
${disponibilita.map((d) => `
${d.turno} (${d.orario}):
  - Oggi: ${d.oggi.liberi > 0 ? `${d.oggi.liberi} posti liberi` : "PIENO"}
  - Domani: ${d.domani.liberi > 0 ? `${d.domani.liberi} posti liberi` : "PIENO"}
`).join("")}

PRENOTAZIONI ESISTENTI DEL CLIENTE (${telefono}):
${prenotazioniCliente && prenotazioniCliente.length > 0
  ? prenotazioniCliente.map((p) => `- ${p.data} alle ${p.ora}, ${p.n_persone} persone (${p.stato})`).join("\n")
  : "Nessuna prenotazione attiva"}

REGOLE IMPORTANTI:
1. Se il cliente vuole prenotare, raccogli: NOME, DATA, ORA/TURNO, NUMERO PERSONE
2. Se mancano informazioni, chiedi una cosa alla volta
3. Se un turno è pieno, proponi il turno successivo o un altro giorno
4. Quando hai tutti i dati, rispondi ESATTAMENTE in questo formato per confermare:
   PRENOTA|nome|data_YYYY-MM-DD|ora_HH:MM|n_persone|turno_id|note
   Esempio: PRENOTA|Rossi|2026-04-19|20:00|4|abc-123-def|Tavolo esterno
5. Se il cliente vuole DISDIRE, rispondi: DISDICI|prenotazione_id
6. Se il cliente chiede informazioni generiche (orari, indirizzo, menu), rispondi normalmente
7. Non inventare disponibilità — usa solo i dati forniti sopra
8. Rispondi SOLO con il messaggio per il cliente, niente altro
9. Non superare i 300 caratteri per messaggio`;

    // Chiama Claude
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 400,
      system: systemPrompt,
      messages: [{ role: "user", content: body }],
    });

    const aiResponse = response.content[0].type === "text" ? response.content[0].text : "";

    // Controlla se Claude ha generato un comando di prenotazione
    if (aiResponse.startsWith("PRENOTA|")) {
      const parts = aiResponse.split("|");
      if (parts.length >= 6) {
        const [, nome, data, ora, persone, turnoId, ...noteParts] = parts;
        const note = noteParts.join("|") || "";

        // Inserisci prenotazione
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
          return twimlResponse(`Mi scusi, c'è stato un problema con la prenotazione. Può riprovare o chiamarci al ${attivita?.telefono || "telefono del ristorante"}.`);
        }

        const dataFormattata = new Date(data + "T12:00:00").toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" });
        return twimlResponse(`Perfetto! Prenotazione confermata:\n\n📋 ${nome}\n📅 ${dataFormattata}\n⏰ ${ora}\n👥 ${persone} persone${note ? `\n📝 ${note}` : ""}\n\nA presto da ${nomeAttivita}!`);
      }
    }

    // Controlla se è un comando di disdetta
    if (aiResponse.startsWith("DISDICI|")) {
      const prenId = aiResponse.split("|")[1];
      await supabase
        .from("prenotazioni")
        .update({ stato: "disdetta" })
        .eq("id", prenId);
      return twimlResponse("La prenotazione è stata cancellata. Se vuole prenotare di nuovo, mi scriva pure!");
    }

    return twimlResponse(aiResponse);
  } catch (error) {
    console.error("Errore webhook WhatsApp:", error);
    return twimlResponse("Mi scusi, c'è stato un problema. Può riprovare tra poco.");
  }
}
