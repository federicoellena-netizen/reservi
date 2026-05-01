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
    // Mese precedente
    const now = new Date();
    const mesePrec = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const anno = mesePrec.getFullYear();
    const mese = mesePrec.getMonth();
    const nomeMese = mesePrec.toLocaleDateString("it-IT", { month: "long", year: "numeric" });

    const inizio = `${anno}-${String(mese + 1).padStart(2, "0")}-01`;
    const fine = `${anno}-${String(mese + 1).padStart(2, "0")}-${new Date(anno, mese + 1, 0).getDate()}`;

    // Prendi tutte le attivita con whatsapp_titolare configurato
    const { data: attivitaList } = await supabase
      .from("attivita")
      .select("id, nome, whatsapp_titolare, whatsapp, telefono")
      .not("user_id", "is", null);

    let reportInviati = 0;
    let errori = 0;

    for (const att of attivitaList || []) {
      const ownerNum = att.whatsapp_titolare || att.whatsapp || att.telefono;
      if (!ownerNum) continue;

      // Prendi prenotazioni del mese
      const { data: prenotazioni } = await supabase
        .from("prenotazioni")
        .select("*")
        .eq("attivita_id", att.id)
        .gte("data", inizio)
        .lte("data", fine);

      if (!prenotazioni || prenotazioni.length === 0) continue;

      const attive = prenotazioni.filter(p => p.stato === "confermata" || p.stato === "completata");
      const totPersone = attive.reduce((s: number, p: { n_persone: number }) => s + p.n_persone, 0);
      const noShow = prenotazioni.filter(p => p.stato === "no_show").length;
      const disdette = prenotazioni.filter(p => p.stato === "disdetta").length;
      const whatsapp = attive.filter(p => p.fonte === "whatsapp").length;
      const pctWhatsapp = attive.length > 0 ? Math.round((whatsapp / attive.length) * 100) : 0;

      // Giorno piu forte
      const giorniCount: Record<number, number> = {};
      attive.forEach(p => {
        const day = new Date(p.data + "T12:00:00").getDay();
        giorniCount[day] = (giorniCount[day] || 0) + 1;
      });
      const giorniNomi = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"];
      let giornoTop = "N/D";
      let maxCount = 0;
      for (const [day, count] of Object.entries(giorniCount)) {
        if (count > maxCount) {
          maxCount = count;
          giornoTop = giorniNomi[parseInt(day)];
        }
      }

      const messaggio = `Report ${nomeMese} — ${att.nome}\n\nPrenotazioni: ${attive.length}\nPersone totali: ${totPersone}\nNo-show: ${noShow}\nDisdette: ${disdette}\n\nFonte: ${pctWhatsapp}% WhatsApp\nGiorno top: ${giornoTop}\n\nGrazie per usare Reservi!`;

      try {
        await sendWhatsApp(ownerNum, messaggio);
        reportInviati++;
      } catch (e) {
        console.error(`Errore report per ${att.nome}:`, e);
        errori++;
      }
    }

    return NextResponse.json({
      ok: true,
      mese: nomeMese,
      reportInviati,
      errori,
    });
  } catch (error) {
    console.error("Errore cron report mensile:", error);
    return NextResponse.json({ error: "Errore cron" }, { status: 500 });
  }
}
