"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { MessageSquare, BarChart3, Clock, Users, Zap, ArrowRight, Check, Star, ChevronRight } from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    color: "#22c55e",
    title: "AI su WhatsApp",
    desc: "Un assistente intelligente risponde ai tuoi clienti 24/7, prende prenotazioni e gestisce le richieste in automatico.",
  },
  {
    icon: BarChart3,
    color: "#3b82f6",
    title: "Dashboard in tempo reale",
    desc: "Vedi prenotazioni, coperti, turni e statistiche dal telefono. Tutto aggiornato al secondo.",
  },
  {
    icon: Clock,
    color: "#f59e0b",
    title: "Reminder automatici",
    desc: "Il sistema avvisa i clienti prima della prenotazione. Riduce i no-show fino al 60%.",
  },
  {
    icon: Users,
    color: "#a855f7",
    title: "Storico clienti",
    desc: "Ogni cliente ha il suo profilo: preferenze, allergie, prenotazioni passate. L'AI ricorda tutto.",
  },
];

const steps = [
  { num: "1", title: "Il cliente scrive su WhatsApp", desc: "Un semplice messaggio come 'Vorrei prenotare per stasera'" },
  { num: "2", title: "L'AI gestisce la conversazione", desc: "Chiede nome, data, orario e numero di persone in modo naturale" },
  { num: "3", title: "La prenotazione appare in dashboard", desc: "Tu non fai nulla. Vedi tutto dal telefono in tempo reale" },
];

const pricing = [
  {
    name: "Lancio",
    price: "49",
    badge: "Primi 10 clienti",
    desc: "Tutto incluso, zero costi nascosti",
    features: ["AI WhatsApp 24/7", "Dashboard completa", "Prenotazioni illimitate", "Reminder automatici", "Report e statistiche", "Setup gratuito", "Supporto dedicato"],
    cta: "Inizia gratis per 30 giorni",
    highlighted: true,
  },
  {
    name: "Professional",
    price: "99",
    badge: null,
    desc: "Per chi vuole il massimo",
    features: ["Tutto del piano Lancio", "Multi-sede", "Landing page personalizzata", "Integrazione Google Calendar", "Storico clienti avanzato", "API personalizzate", "Supporto prioritario"],
    cta: "Contattaci",
    highlighted: false,
  },
];

const testimonials = [
  {
    name: "Marco R.",
    role: "Ristorante Da Marco, Torino",
    text: "Prima perdevo prenotazioni perche non potevo rispondere al telefono durante il servizio. Ora l'AI risponde per me, anche alle 2 di notte.",
    stars: 5,
  },
  {
    name: "Laura B.",
    role: "Salone Laura, Milano",
    text: "I miei clienti adorano prenotare su WhatsApp. E io ho ridotto i no-show del 40% con i reminder automatici.",
    stars: 5,
  },
];

const faqs = [
  { q: "Come funziona l'assistente AI?", a: "L'assistente risponde automaticamente su WhatsApp ai tuoi clienti. Chiede le informazioni necessarie, controlla la disponibilita e conferma la prenotazione. Tu vedi tutto in dashboard." },
  { q: "Devo cambiare il mio numero WhatsApp?", a: "No. L'assistente funziona con il tuo numero WhatsApp Business. I clienti scrivono al tuo numero di sempre." },
  { q: "Quanto ci vuole per attivarlo?", a: "Meno di 10 minuti. Configuriamo tutto noi: turni, coperti, orari. Tu devi solo dirci come funziona la tua attivita." },
  { q: "Posso ancora gestire le prenotazioni manualmente?", a: "Certo. La dashboard ti permette di aggiungere prenotazioni manuali, walk-in e telefonate. L'AI e il manuale convivono perfettamente." },
  { q: "E se l'AI sbaglia?", a: "L'AI lavora solo con i dati reali: turni, coperti, disponibilita. Non inventa. E puoi sempre modificare o cancellare una prenotazione dalla dashboard." },
];

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: "var(--nav-bg)", backdropFilter: "blur(24px)", borderBottom: "1px solid var(--nav-border)" }}>
        <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Logo size="sm" />
            <span className="font-bold text-main tracking-tight">Reservi</span>
          </div>
          <div className="hidden sm:flex items-center gap-8 text-sm text-sub">
            <a href="#features" className="hover:text-main transition-colors">Funzionalita</a>
            <a href="#come-funziona" className="hover:text-main transition-colors">Come funziona</a>
            <a href="#pricing" className="hover:text-main transition-colors">Prezzi</a>
          </div>
          <Link href="/dashboard" className="gradient-green text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-green-500/15">
            Accedi
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-5 relative overflow-hidden">
        <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full bg-[#16a34a] opacity-[0.06] blur-[150px]" />
        <div className="absolute bottom-[-100px] right-[-200px] w-[500px] h-[500px] rounded-full bg-[#2979ff] opacity-[0.04] blur-[120px]" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8" style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)" }}>
            <Zap size={12} />
            L'unico sistema in Italia con AI su WhatsApp
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold text-main leading-tight tracking-tight mb-6">
            Le prenotazioni<br />
            <span className="bg-gradient-to-r from-[#22c55e] to-[#16a34a] bg-clip-text text-transparent">si gestiscono da sole</span>
          </h1>

          <p className="text-lg sm:text-xl text-sub max-w-xl mx-auto mb-10 leading-relaxed">
            Un assistente AI risponde su WhatsApp ai tuoi clienti, prende prenotazioni e ti mostra tutto in una dashboard. Zero chiamate perse, zero stress.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#pricing" className="gradient-green text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:opacity-90 transition-opacity shadow-xl shadow-green-500/20 flex items-center gap-2">
              Prova gratis 30 giorni
              <ArrowRight size={20} />
            </a>
            <a href="#come-funziona" className="card px-8 py-4 rounded-2xl text-lg font-medium text-sub hover:text-main transition-colors flex items-center gap-2">
              Guarda come funziona
              <ChevronRight size={18} />
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 mt-10 text-sm text-dim">
            <span className="flex items-center gap-1.5"><Check size={14} className="text-emerald-500" /> Nessuna carta richiesta</span>
            <span className="flex items-center gap-1.5"><Check size={14} className="text-emerald-500" /> Setup in 10 minuti</span>
            <span className="flex items-center gap-1.5"><Check size={14} className="text-emerald-500" /> Cancella quando vuoi</span>
          </div>
        </div>
      </section>

      {/* Chat Demo */}
      <section className="pb-20 px-5">
        <div className="max-w-sm mx-auto">
          <div className="card rounded-3xl p-5 space-y-3">
            <div className="flex items-center gap-3 pb-3" style={{ borderBottom: "1px solid var(--bg-card-border)" }}>
              <div className="w-10 h-10 rounded-full gradient-green flex items-center justify-center">
                <MessageSquare size={18} className="text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-main">Trattoria Da Mario</div>
                <div className="text-[10px] text-emerald-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Online
                </div>
              </div>
            </div>
            {/* Messages */}
            <div className="space-y-2.5">
              <ChatBubble from="user" text="Ciao, vorrei prenotare per stasera" time="18:42" />
              <ChatBubble from="ai" text="Buonasera! A che nome la prenotazione?" time="18:42" />
              <ChatBubble from="user" text="Rossi" time="18:42" />
              <ChatBubble from="ai" text="Per quante persone, signor Rossi?" time="18:42" />
              <ChatBubble from="user" text="4 persone" time="18:43" />
              <ChatBubble from="ai" text="Prenotazione confermata! Rossi, stasera ore 20:00, 4 persone. A presto da Trattoria Da Mario!" time="18:43" />
            </div>
            <div className="text-center pt-2">
              <span className="text-[10px] text-dim">Conversazione reale gestita dall'AI</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problema / Soluzione */}
      <section className="py-20 px-5" style={{ background: "var(--bg-card)" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-main text-center mb-12">
            Quante prenotazioni perdi ogni settimana?
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="card rounded-2xl p-6 border-red-500/10">
              <h3 className="text-red-400 font-semibold mb-4 text-sm">Senza Reservi</h3>
              <ul className="space-y-3 text-sm text-sub">
                {[
                  "Clienti chiamano durante il servizio — nessuno risponde",
                  "Messaggi WhatsApp che si accumulano — rispondi dopo ore",
                  "No-show: il 15% dei tavoli resta vuoto",
                  "Nessun dato su chi prenota di piu o quando",
                  "Sabato sera: caos totale",
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5 text-xs">&#10005;</span> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card rounded-2xl p-6 border-emerald-500/10">
              <h3 className="text-emerald-500 font-semibold mb-4 text-sm">Con Reservi</h3>
              <ul className="space-y-3 text-sm text-sub">
                {[
                  "L'AI risponde in 3 secondi, 24 ore su 24",
                  "Ogni messaggio WhatsApp diventa una prenotazione",
                  "Reminder automatici riducono i no-show del 60%",
                  "Report dettagliati: fonti, giorni, trend",
                  "Sabato sera: tutto sotto controllo in dashboard",
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-main mb-3">Tutto quello che ti serve</h2>
            <p className="text-sub">Nessun software complicato. Apri, guarda, gestisci.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="card rounded-2xl p-6">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${f.color}15` }}>
                    <Icon size={22} style={{ color: f.color }} />
                  </div>
                  <h3 className="text-main font-semibold mb-2">{f.title}</h3>
                  <p className="text-sub text-sm leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Come Funziona */}
      <section id="come-funziona" className="py-20 px-5" style={{ background: "var(--bg-card)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-main mb-3">Come funziona</h2>
            <p className="text-sub">Tre passaggi. Nessuno richiede il tuo intervento.</p>
          </div>
          <div className="space-y-6">
            {steps.map((s) => (
              <div key={s.num} className="card rounded-2xl p-6 flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl gradient-green flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/20">
                  <span className="text-white font-bold text-lg">{s.num}</span>
                </div>
                <div>
                  <h3 className="text-main font-semibold mb-1">{s.title}</h3>
                  <p className="text-sub text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-main text-center mb-12">Chi lo usa, non torna indietro</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="card rounded-2xl p-6">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sub text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div>
                  <div className="text-main text-sm font-semibold">{t.name}</div>
                  <div className="text-dim text-xs">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-5" style={{ background: "var(--bg-card)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-main mb-3">Prezzi semplici, zero sorprese</h2>
            <p className="text-sub">Tutto incluso. Nessun costo per prenotazione.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {pricing.map((p) => (
              <div key={p.name} className={`card rounded-3xl p-7 relative ${p.highlighted ? "border-emerald-500/30" : ""}`}>
                {p.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold gradient-green text-white shadow-lg shadow-green-500/20">
                    {p.badge}
                  </div>
                )}
                <div className="text-center mb-6 mt-2">
                  <h3 className="text-main font-semibold mb-2">{p.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-main">{p.price}</span>
                    <span className="text-sub text-sm">/mese</span>
                  </div>
                  <p className="text-dim text-xs mt-1">{p.desc}</p>
                </div>
                <ul className="space-y-2.5 mb-7">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-sub">
                      <Check size={14} className="text-emerald-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/393407024769?text=Ciao!%20Vorrei%20provare%20Reservi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center py-3.5 rounded-2xl font-semibold text-sm transition-opacity hover:opacity-90 ${
                    p.highlighted
                      ? "gradient-green text-white shadow-lg shadow-green-500/15"
                      : "card text-main"
                  }`}
                >
                  {p.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-main text-center mb-12">Domande frequenti</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <FaqItem key={f.q} question={f.q} answer={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Finale */}
      <section className="py-20 px-5">
        <div className="max-w-xl mx-auto text-center">
          <div className="card rounded-3xl p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 gradient-green" />
            <h2 className="text-2xl font-bold text-main mb-3">Pronto a non perdere piu prenotazioni?</h2>
            <p className="text-sub text-sm mb-8">Attivazione in 10 minuti. 30 giorni gratis. Zero rischio.</p>
            <a
              href="https://wa.me/393407024769?text=Ciao!%20Vorrei%20provare%20Reservi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 gradient-green text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:opacity-90 transition-opacity shadow-xl shadow-green-500/20"
            >
              <MessageSquare size={20} />
              Scrivici su WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-5" style={{ borderTop: "1px solid var(--bg-card-border)" }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Logo size="sm" />
            <span className="font-bold text-main tracking-tight">Reservi</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-dim">
            <a href="#features" className="hover:text-sub transition-colors">Funzionalita</a>
            <a href="#pricing" className="hover:text-sub transition-colors">Prezzi</a>
            <a href="mailto:info@reservi.app" className="hover:text-sub transition-colors">Contatti</a>
          </div>
          <div className="text-xs text-dim">
            &copy; 2026 Reservi. Tutti i diritti riservati.
          </div>
        </div>
      </footer>
    </div>
  );
}

function ChatBubble({ from, text, time }: { from: "user" | "ai"; text: string; time: string }) {
  const isUser = from === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "rounded-2xl rounded-br-md bg-emerald-600 text-white"
            : "rounded-2xl rounded-bl-md text-main"
        }`}
        style={!isUser ? { background: "var(--bg-input)" } : {}}
      >
        <div>{text}</div>
        <div className={`text-[9px] mt-1 text-right ${isUser ? "text-emerald-200" : "text-dim"}`}>{time}</div>
      </div>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen(!open)}
      className="card rounded-2xl p-5 w-full text-left transition-all"
    >
      <div className="flex items-center justify-between">
        <span className="text-main font-medium text-sm pr-4">{question}</span>
        <ChevronRight size={16} className={`text-dim flex-shrink-0 transition-transform ${open ? "rotate-90" : ""}`} />
      </div>
      {open && (
        <p className="text-sub text-sm mt-3 leading-relaxed">{answer}</p>
      )}
    </button>
  );
}

