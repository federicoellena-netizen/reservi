"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { getAttivita } from "@/lib/data";
import { Check, CreditCard, ExternalLink, Sparkles } from "lucide-react";

const piani = [
  {
    key: "starter",
    name: "Starter",
    price: 49,
    features: ["WhatsApp AI 24/7", "Dashboard completa", "Report e statistiche", "Link Google"],
  },
  {
    key: "professional",
    name: "Professional",
    price: 69,
    badge: "Consigliato",
    features: ["Tutto di Starter +", "Sito web professionale", "Dominio personalizzato", "Report AI + Insight", "Reminder automatici"],
  },
  {
    key: "premium",
    name: "Premium",
    price: 99,
    features: ["Tutto di Professional +", "SEO avanzato Google", "Supporto prioritario", "Formazione staff", "Consulenza marketing"],
  },
];

export default function BillingPage() {
  const { user, attivita } = useAuth();
  const [pianoAttuale, setPianoAttuale] = useState("trial");
  const [trialFine, setTrialFine] = useState<string | null>(null);
  const [stripeCustomerId, setStripeCustomerId] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    if (!attivita) return;
    async function load() {
      const att = await getAttivita(attivita!.id);
      if (att) {
        setPianoAttuale(att.piano || "trial");
        setTrialFine(att.trial_fine || null);
        setStripeCustomerId(att.stripe_customer_id || null);
      }
    }
    load();
  }, [attivita]);

  const handleCheckout = async (piano: string) => {
    if (!attivita || !user) return;
    setLoading(piano);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ piano, attivitaId: attivita.id, email: user.email }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (e) {
      console.error("Errore checkout:", e);
    } finally {
      setLoading(null);
    }
  };

  const handlePortal = async () => {
    if (!stripeCustomerId) return;
    setLoading("portal");
    try {
      const res = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId: stripeCustomerId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (e) {
      console.error("Errore portale:", e);
    } finally {
      setLoading(null);
    }
  };

  const trialGiorniRimasti = trialFine
    ? Math.max(0, Math.ceil((new Date(trialFine).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 30;

  const isActive = pianoAttuale !== "trial" && pianoAttuale !== "expired";

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sub text-sm">Abbonamento</p>
        <h2 className="text-3xl font-bold text-main tracking-tight">Il tuo piano</h2>
      </div>

      {/* Stato attuale */}
      <div className="card rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CreditCard size={18} className="text-[#22c55e]" />
              <h3 className="font-semibold text-main text-sm">
                {isActive ? `Piano ${pianoAttuale.charAt(0).toUpperCase() + pianoAttuale.slice(1)}` : "Periodo di prova"}
              </h3>
            </div>
            {!isActive && (
              <p className="text-sub text-xs">
                {trialGiorniRimasti > 0
                  ? `${trialGiorniRimasti} giorni rimasti nel periodo di prova gratuito`
                  : "Il periodo di prova e' scaduto"}
              </p>
            )}
            {isActive && (
              <p className="text-sub text-xs">Abbonamento attivo</p>
            )}
          </div>
          <div className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
            isActive
              ? "bg-[#22c55e]/10 text-[#22c55e]"
              : trialGiorniRimasti > 0
                ? "bg-amber-500/10 text-amber-500"
                : "bg-red-500/10 text-red-500"
          }`}>
            {isActive ? "Attivo" : trialGiorniRimasti > 0 ? "Trial" : "Scaduto"}
          </div>
        </div>

        {stripeCustomerId && isActive && (
          <button
            onClick={handlePortal}
            disabled={loading === "portal"}
            className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#22c55e] bg-[#22c55e]/10 px-4 py-2 rounded-xl hover:bg-[#22c55e]/20 transition-colors"
          >
            <ExternalLink size={14} />
            {loading === "portal" ? "Apertura..." : "Gestisci abbonamento"}
          </button>
        )}
      </div>

      {/* Piani */}
      <div className="grid sm:grid-cols-3 gap-4">
        {piani.map((p) => {
          const isCurrent = pianoAttuale === p.key;
          const isHighlighted = p.key === "professional";

          return (
            <div
              key={p.key}
              className={`card rounded-2xl p-5 relative ${
                isHighlighted ? "border-[#22c55e]/30" : ""
              } ${isCurrent ? "ring-2 ring-[#22c55e]/50" : ""}`}
            >
              {p.badge && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-semibold gradient-green text-white">
                  {p.badge}
                </div>
              )}

              <div className="text-center mb-5 mt-1">
                <h4 className="text-main font-semibold mb-1">{p.name}</h4>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-bold text-main">{p.price}</span>
                  <span className="text-sub text-sm">/mese</span>
                </div>
                <p className="text-dim text-[10px] mt-1">Primo mese gratis</p>
              </div>

              <ul className="space-y-2 mb-5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-sub">
                    <Check size={13} className="text-[#22c55e] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              {isCurrent ? (
                <div className="w-full text-center py-2.5 rounded-xl text-xs font-semibold bg-[#22c55e]/10 text-[#22c55e]">
                  Piano attuale
                </div>
              ) : (
                <button
                  onClick={() => handleCheckout(p.key)}
                  disabled={loading === p.key}
                  className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-opacity hover:opacity-90 disabled:opacity-50 ${
                    isHighlighted
                      ? "gradient-green text-white shadow-lg shadow-green-500/15"
                      : "card text-main"
                  }`}
                >
                  {loading === p.key ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-3 h-3 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                      Caricamento...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-1.5">
                      <Sparkles size={13} />
                      {isActive ? "Cambia piano" : "Inizia gratis"}
                    </span>
                  )}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Info */}
      <div className="card rounded-2xl p-5">
        <div className="text-xs text-sub space-y-1.5">
          <p><strong className="text-main">Primo mese gratuito</strong> — prova senza impegno, poi scegli se continuare.</p>
          <p><strong className="text-main">Zero commissioni</strong> — nessun costo per prenotazione, solo l'abbonamento mensile.</p>
          <p><strong className="text-main">Disdici quando vuoi</strong> — nessun vincolo contrattuale, cancella con un click.</p>
        </div>
      </div>
    </div>
  );
}
