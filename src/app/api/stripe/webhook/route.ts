import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    if (process.env.STRIPE_WEBHOOK_SECRET && signature) {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } else {
      // In test mode senza webhook secret, parsa direttamente
      event = JSON.parse(body) as Stripe.Event;
    }
  } catch (err) {
    console.error("Errore verifica webhook Stripe:", err);
    return NextResponse.json({ error: "Webhook non valido" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const attivitaId = session.metadata?.attivita_id;
        const piano = session.metadata?.piano;

        if (attivitaId && piano) {
          await supabase
            .from("attivita")
            .update({
              piano,
              stripe_subscription_id: session.subscription as string,
              trial_fine: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            })
            .eq("id", attivitaId);
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const attivitaId = subscription.metadata?.attivita_id;

        if (attivitaId) {
          const status = subscription.status;
          let piano = "expired";

          if (status === "active" || status === "trialing") {
            // Determina il piano dal prezzo
            const priceId = subscription.items.data[0]?.price?.id;
            if (priceId === process.env.STRIPE_PRICE_STARTER) piano = "starter";
            else if (priceId === process.env.STRIPE_PRICE_PROFESSIONAL) piano = "professional";
            else if (priceId === process.env.STRIPE_PRICE_PREMIUM) piano = "premium";
          }

          const sub = subscription as unknown as Record<string, unknown>;
          const periodEnd = sub.current_period_end as number | null;

          await supabase
            .from("attivita")
            .update({
              piano,
              piano_scadenza: periodEnd
                ? new Date(periodEnd * 1000).toISOString()
                : null,
            })
            .eq("id", attivitaId);
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const attivitaId = subscription.metadata?.attivita_id;

        if (attivitaId) {
          await supabase
            .from("attivita")
            .update({ piano: "expired" })
            .eq("id", attivitaId);
        }
        break;
      }
    }
  } catch (error) {
    console.error("Errore gestione evento Stripe:", error);
  }

  return NextResponse.json({ received: true });
}
