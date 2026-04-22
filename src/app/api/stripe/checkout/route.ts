import { NextRequest, NextResponse } from "next/server";
import { stripe, PLANS, type PlanKey } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { piano, attivitaId, email } = await request.json();

    if (!piano || !attivitaId || !email) {
      return NextResponse.json({ error: "Dati mancanti" }, { status: 400 });
    }

    const plan = PLANS[piano as PlanKey];
    if (!plan) {
      return NextResponse.json({ error: "Piano non valido" }, { status: 400 });
    }

    // Controlla se l'attivita ha gia un customer Stripe
    const { data: att } = await supabase
      .from("attivita")
      .select("stripe_customer_id")
      .eq("id", attivitaId)
      .single();

    let customerId = att?.stripe_customer_id;

    // Crea customer Stripe se non esiste
    if (!customerId) {
      const customer = await stripe.customers.create({
        email,
        metadata: { attivita_id: attivitaId },
      });
      customerId = customer.id;

      await supabase
        .from("attivita")
        .update({ stripe_customer_id: customerId })
        .eq("id", attivitaId);
    }

    // Crea sessione checkout con 30 giorni di trial
    const origin = request.headers.get("origin") || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: plan.priceId, quantity: 1 }],
      subscription_data: {
        trial_period_days: 30,
        metadata: { attivita_id: attivitaId, piano },
      },
      success_url: `${origin}/dashboard?checkout=success`,
      cancel_url: `${origin}/dashboard/billing?checkout=cancelled`,
      metadata: { attivita_id: attivitaId, piano },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Errore checkout Stripe:", error);
    return NextResponse.json({ error: "Errore creazione checkout" }, { status: 500 });
  }
}
