import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder");

export const PLANS = {
  starter: {
    name: "Starter",
    priceId: process.env.STRIPE_PRICE_STARTER || "",
    price: 49,
  },
  professional: {
    name: "Professional",
    priceId: process.env.STRIPE_PRICE_PROFESSIONAL || "",
    price: 69,
  },
  premium: {
    name: "Premium",
    priceId: process.env.STRIPE_PRICE_PREMIUM || "",
    price: 99,
  },
} as const;

export type PlanKey = keyof typeof PLANS;
