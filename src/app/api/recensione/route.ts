import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendWhatsApp } from "@/lib/twilio";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { prenotazioneId, attivitaId } = await request.json();

    if (!prenotazioneId || !attivitaId) {
      return NextResponse.json({ error: "Dati mancanti" }, { status: 400 });
    }

    // Carica attivita con link recensioni
    const { data: attivita } = await supabase
      .from("attivita")
      .select("nome, link_tripadvisor, link_google")
      .eq("id", attivitaId)
      .single();

    if (!attivita) {
      return NextResponse.json({ error: "Attivita non trovata" }, { status: 404 });
    }

    // Se non ci sono link recensioni configurati, non inviare nulla
    if (!attivita.link_tripadvisor && !attivita.link_google) {
      return NextResponse.json({ sent: false, reason: "Nessun link recensione configurato" });
    }

    // Carica prenotazione per avere il telefono del cliente
    const { data: pren } = await supabase
      .from("prenotazioni")
      .select("nome_cliente, telefono_cliente")
      .eq("id", prenotazioneId)
      .single();

    if (!pren?.telefono_cliente) {
      return NextResponse.json({ sent: false, reason: "Nessun telefono cliente" });
    }

    // Costruisci il messaggio
    const nome = attivita.nome || "noi";
    let messaggio = `Grazie per aver cenato da ${nome}! Speriamo che sia stato di suo gradimento.\n\nSe ha apprezzato l'esperienza, ci farebbe molto piacere una sua recensione:`;

    if (attivita.link_google) {
      messaggio += `\n\nGoogle: ${attivita.link_google}`;
    }
    if (attivita.link_tripadvisor) {
      messaggio += `\n\nTripAdvisor: ${attivita.link_tripadvisor}`;
    }

    messaggio += `\n\nGrazie e a presto!`;

    // Invia il messaggio WhatsApp
    await sendWhatsApp(pren.telefono_cliente, messaggio);

    return NextResponse.json({ sent: true });
  } catch (error) {
    console.error("Errore invio recensione:", error);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}
