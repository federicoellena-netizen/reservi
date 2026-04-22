import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendWhatsApp } from "@/lib/twilio";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Verifica che la richiesta venga dal cron Vercel
function verifyCron(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (process.env.CRON_SECRET) {
    return authHeader === `Bearer ${process.env.CRON_SECRET}`;
  }
  // In sviluppo, accetta tutte le richieste
  return true;
}

export async function GET(request: NextRequest) {
  if (!verifyCron(request)) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  try {
    const now = new Date();
    const oggi = now.toISOString().split("T")[0];
    const domani = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    const oraCorrente = now.getHours();
    const minutiCorrente = now.getMinutes();
    const oraStr = `${String(oraCorrente).padStart(2, "0")}:${String(minutiCorrente).padStart(2, "0")}`;

    let reminderInviati = 0;
    let errori = 0;

    // === REMINDER 24H PRIMA ===
    // Prendi prenotazioni di domani che non hanno ancora ricevuto reminder
    const { data: prenDomani } = await supabase
      .from("prenotazioni")
      .select("*, attivita:attivita_id(nome)")
      .eq("data", domani)
      .in("stato", ["confermata", "in_attesa"])
      .eq("reminder_inviato", false)
      .not("telefono_cliente", "is", null);

    for (const pren of prenDomani || []) {
      if (!pren.telefono_cliente) continue;

      const nomeAttivita = (pren.attivita as { nome: string } | null)?.nome || "il ristorante";
      const dataFormattata = new Date(domani + "T12:00:00").toLocaleDateString("it-IT", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });

      const messaggio = `Promemoria: domani hai una prenotazione da ${nomeAttivita}.\n\n${pren.nome_cliente}\n${dataFormattata}\nOre ${pren.ora}\n${pren.n_persone} persone\n\nA domani!`;

      try {
        await sendWhatsApp(pren.telefono_cliente, messaggio);
        await supabase.from("prenotazioni").update({ reminder_inviato: true }).eq("id", pren.id);
        reminderInviati++;
      } catch (e) {
        console.error(`Errore reminder per ${pren.nome_cliente}:`, e);
        errori++;
      }
    }

    // === REMINDER 1H PRIMA (prenotazioni di oggi fatte in giornata) ===
    // Prendi prenotazioni di oggi create oggi, la cui ora è tra 50-70 minuti da adesso
    const tra1ora = new Date(now.getTime() + 60 * 60 * 1000);
    const oraTarget = `${String(tra1ora.getHours()).padStart(2, "0")}:${String(tra1ora.getMinutes()).padStart(2, "0")}`;

    // Finestra di 20 minuti: tra 50 e 70 minuti da ora
    const tra50min = new Date(now.getTime() + 50 * 60 * 1000);
    const tra70min = new Date(now.getTime() + 70 * 60 * 1000);
    const oraMin = `${String(tra50min.getHours()).padStart(2, "0")}:${String(tra50min.getMinutes()).padStart(2, "0")}`;
    const oraMax = `${String(tra70min.getHours()).padStart(2, "0")}:${String(tra70min.getMinutes()).padStart(2, "0")}`;

    const { data: prenOggiUrgenti } = await supabase
      .from("prenotazioni")
      .select("*, attivita:attivita_id(nome)")
      .eq("data", oggi)
      .in("stato", ["confermata", "in_attesa"])
      .eq("reminder_inviato", false)
      .gte("ora", oraMin)
      .lte("ora", oraMax)
      .not("telefono_cliente", "is", null);

    for (const pren of prenOggiUrgenti || []) {
      if (!pren.telefono_cliente) continue;

      // Verifica che la prenotazione sia stata creata oggi (stessa data)
      const creatoOggi = pren.created_at?.startsWith(oggi);
      if (!creatoOggi) continue;

      const nomeAttivita = (pren.attivita as { nome: string } | null)?.nome || "il ristorante";

      const messaggio = `Promemoria: tra circa 1 ora hai una prenotazione da ${nomeAttivita}.\n\n${pren.nome_cliente}\nOggi ore ${pren.ora}\n${pren.n_persone} persone\n\nA tra poco!`;

      try {
        await sendWhatsApp(pren.telefono_cliente, messaggio);
        await supabase.from("prenotazioni").update({ reminder_inviato: true }).eq("id", pren.id);
        reminderInviati++;
      } catch (e) {
        console.error(`Errore reminder urgente per ${pren.nome_cliente}:`, e);
        errori++;
      }
    }

    return NextResponse.json({
      ok: true,
      reminderInviati,
      errori,
      timestamp: now.toISOString(),
    });
  } catch (error) {
    console.error("Errore cron reminder:", error);
    return NextResponse.json({ error: "Errore cron" }, { status: 500 });
  }
}
