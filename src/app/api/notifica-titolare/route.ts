import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendWhatsApp } from "@/lib/twilio";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { attivitaId, prenotazioneId, evento } = await request.json();

    if (!attivitaId || !prenotazioneId || !evento) {
      return NextResponse.json({ error: "Dati mancanti" }, { status: 400 });
    }

    // Carica attivita per il numero del titolare
    const { data: attivita } = await supabase
      .from("attivita")
      .select("whatsapp_titolare, nome")
      .eq("id", attivitaId)
      .single();

    if (!attivita?.whatsapp_titolare) {
      return NextResponse.json({ sent: false, reason: "Nessun numero titolare configurato" });
    }

    // Carica prenotazione
    const { data: pren } = await supabase
      .from("prenotazioni")
      .select("nome_cliente, data, ora, n_persone")
      .eq("id", prenotazioneId)
      .single();

    if (!pren) {
      return NextResponse.json({ sent: false, reason: "Prenotazione non trovata" });
    }

    const dataF = new Date(pren.data + "T12:00:00").toLocaleDateString("it-IT", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

    let messaggio = "";
    switch (evento) {
      case "completata":
        messaggio = `🚶 Cliente uscito (da dashboard)\n\n${pren.nome_cliente}\n${dataF} ore ${pren.ora}\n${pren.n_persone} persone`;
        break;
      case "no_show":
        messaggio = `❌ No show (da dashboard)\n\n${pren.nome_cliente}\n${dataF} ore ${pren.ora}\n${pren.n_persone} persone`;
        break;
      case "disdetta":
        messaggio = `🗑️ Disdetta (da dashboard)\n\n${pren.nome_cliente}\n${dataF} ore ${pren.ora}\n${pren.n_persone} persone`;
        break;
      default:
        return NextResponse.json({ sent: false, reason: "Evento non riconosciuto" });
    }

    await sendWhatsApp(attivita.whatsapp_titolare, messaggio);
    return NextResponse.json({ sent: true });
  } catch (error) {
    console.error("Errore notifica titolare:", error);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}
