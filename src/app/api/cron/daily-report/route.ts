import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendWhatsApp } from "@/lib/twilio";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function verifyCron(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (process.env.CRON_SECRET) {
    return authHeader === `Bearer ${process.env.CRON_SECRET}`;
  }
  return true;
}

export async function GET(request: NextRequest) {
  if (!verifyCron(request)) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  try {
    const now = new Date();
    const oggi = now.toISOString().split("T")[0];
    const nomeGiorno = now.toLocaleDateString("it-IT", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

    // Prendi tutte le attivita con whatsapp_titolare configurato
    const { data: attivitaList } = await supabase
      .from("attivita")
      .select("id, nome, whatsapp_titolare")
      .not("whatsapp_titolare", "is", null);

    let reportInviati = 0;
    let errori = 0;

    for (const att of attivitaList || []) {
      if (!att.whatsapp_titolare) continue;

      // Prenotazioni di oggi
      const { data: prenotazioni } = await supabase
        .from("prenotazioni")
        .select("*, turno:turno_id(nome, inizio, fine)")
        .eq("attivita_id", att.id)
        .eq("data", oggi)
        .order("ora");

      // Turni per calcolare disponibilità
      const { data: turni } = await supabase
        .from("turni")
        .select("*")
        .eq("attivita_id", att.id)
        .order("ordine");

      const attive = (prenotazioni || []).filter(
        (p) => p.stato === "confermata" || p.stato === "in_attesa"
      );
      const totPersone = attive.reduce((s: number, p: { n_persone: number }) => s + p.n_persone, 0);
      const whatsapp = attive.filter((p) => p.fonte === "whatsapp").length;

      // Costruisci riepilogo per turno
      const turniRiepilogo = (turni || []).map((turno) => {
        const prenTurno = attive.filter((p) => p.turno_id === turno.id);
        const occupati = prenTurno.reduce((s: number, p: { n_persone: number }) => s + p.n_persone, 0);
        const liberi = turno.coperti - occupati;
        const pieno = liberi <= 0;

        // Lista nomi per questo turno
        const nomi = prenTurno
          .sort((a, b) => a.ora.localeCompare(b.ora))
          .map((p) => `  ${p.ora} ${p.nome_cliente} (${p.n_persone}p)`)
          .join("\n");

        const statusBar = pieno ? "🔴 PIENO" : liberi <= 5 ? `🟡 ${liberi} posti` : `🟢 ${liberi} posti`;

        return `${turno.nome} ${turno.inizio}-${turno.fine} — ${statusBar}\n${occupati}/${turno.coperti} coperti${nomi ? `\n${nomi}` : "\n  (nessuna prenotazione)"}`;
      }).join("\n\n");

      // Prenotazioni senza turno
      const senzaTurno = attive.filter(
        (p) => !p.turno_id || !(turni || []).find((t) => t.id === p.turno_id)
      );
      const senzaTurnoStr = senzaTurno.length > 0
        ? `\n\nSenza turno:\n${senzaTurno.map((p) => `  ${p.ora} ${p.nome_cliente} (${p.n_persone}p)`).join("\n")}`
        : "";

      const messaggio = `☀️ Buongiorno! Ecco la situazione di oggi.\n\n📅 ${nomeGiorno}\n📊 ${attive.length} prenotazioni · ${totPersone} persone${whatsapp > 0 ? ` · ${whatsapp} da WhatsApp` : ""}\n\n${turniRiepilogo}${senzaTurnoStr}\n\nBuon servizio! 💪`;

      try {
        await sendWhatsApp(att.whatsapp_titolare, messaggio);
        reportInviati++;
      } catch (e) {
        console.error(`Errore report giornaliero per ${att.nome}:`, e);
        errori++;
      }
    }

    return NextResponse.json({
      ok: true,
      data: oggi,
      reportInviati,
      errori,
    });
  } catch (error) {
    console.error("Errore cron report giornaliero:", error);
    return NextResponse.json({ error: "Errore cron" }, { status: 500 });
  }
}
