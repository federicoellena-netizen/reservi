"use client";

import { useState } from "react";

interface Attivita {
  id: string;
  nome: string;
  tipo: string;
  indirizzo: string | null;
  telefono: string | null;
  whatsapp: string | null;
  sito_config: {
    descrizione?: string;
    specialita?: string[];
    fascia_prezzo?: string;
    colore?: string;
    hero_img?: string;
  } | null;
}

interface Turno {
  id: string;
  nome: string;
  inizio: string;
  fine: string;
  coperti: number;
}

export default function SitoRistorante({ attivita, turni }: { attivita: Attivita; turni: Turno[] }) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const config = attivita.sito_config || {};
  const colore = config.colore || "#22c55e";
  const whatsappNum = (attivita.whatsapp || attivita.telefono || "").replace(/[\s+()-]/g, "");
  const whatsappLink = `https://wa.me/${whatsappNum}?text=${encodeURIComponent("Ciao! Vorrei prenotare un tavolo")}`;
  const heroImg = config.hero_img || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&q=80";

  return (
    <div className="min-h-screen bg-[#090909] text-white">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#090909]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-lg tracking-tight">{attivita.nome}</span>

          <div className="hidden md:flex items-center gap-8">
            <a href="#chi-siamo" className="text-sm text-gray-500 hover:text-white transition-colors">Chi siamo</a>
            <a href="#specialita" className="text-sm text-gray-500 hover:text-white transition-colors">Menu</a>
            <a href="#orari" className="text-sm text-gray-500 hover:text-white transition-colors">Orari</a>
            <a href="#contatti" className="text-sm text-gray-500 hover:text-white transition-colors">Contatti</a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full text-sm font-semibold text-black transition-all hover:opacity-90"
              style={{ background: colore }}
            >
              Prenota
            </a>
          </div>

          <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5">
            <span className={`w-5 h-0.5 bg-white transition-all ${mobileMenu ? "rotate-45 translate-y-1" : ""}`} />
            <span className={`w-5 h-0.5 bg-white transition-all ${mobileMenu ? "opacity-0" : ""}`} />
            <span className={`w-5 h-0.5 bg-white transition-all ${mobileMenu ? "-rotate-45 -translate-y-1" : ""}`} />
          </button>
        </div>

        {mobileMenu && (
          <div className="md:hidden bg-[#0f0f0f] border-t border-white/5 px-6 py-4 space-y-3">
            <a href="#chi-siamo" onClick={() => setMobileMenu(false)} className="block text-gray-400 font-medium py-2">Chi siamo</a>
            <a href="#specialita" onClick={() => setMobileMenu(false)} className="block text-gray-400 font-medium py-2">Menu</a>
            <a href="#orari" onClick={() => setMobileMenu(false)} className="block text-gray-400 font-medium py-2">Orari</a>
            <a href="#contatti" onClick={() => setMobileMenu(false)} className="block text-gray-400 font-medium py-2">Contatti</a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block text-center px-6 py-3 rounded-full text-black font-semibold" style={{ background: colore }}>
              Prenota un tavolo
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative h-[90vh] min-h-[650px] flex items-end">
        <div className="absolute inset-0">
          <img src={heroImg} alt={attivita.nome} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-20 w-full">
          {config.fascia_prezzo && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-5 bg-white/10 backdrop-blur-sm text-white/70 border border-white/10">
              {attivita.tipo === "ristorante" ? "Ristorante" : attivita.tipo} &middot; {config.fascia_prezzo}
            </div>
          )}

          <h1 className="text-5xl sm:text-7xl font-bold leading-[1.05] tracking-tight mb-5 max-w-2xl">
            {attivita.nome}
          </h1>

          {config.descrizione && (
            <p className="text-lg sm:text-xl text-gray-400 max-w-lg mb-10 leading-relaxed">{config.descrizione}</p>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-lg font-semibold text-black transition-all hover:opacity-90"
              style={{ background: colore }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Prenota su WhatsApp
            </a>
            {attivita.telefono && (
              <a href={`tel:${attivita.telefono}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-lg font-medium text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                Chiama
              </a>
            )}
          </div>
        </div>
      </section>

      {/* CHI SIAMO */}
      <section id="chi-siamo" className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-12 h-[2px] mx-auto mb-8" style={{ background: colore }} />
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Benvenuti da {attivita.nome}</h2>
          {config.descrizione && (
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
              {config.descrizione}. Vi aspettiamo per un&apos;esperienza culinaria autentica, dove ogni piatto racconta la tradizione e la passione per la buona cucina italiana.
            </p>
          )}
          {attivita.indirizzo && (
            <p className="mt-6 text-sm text-gray-600 flex items-center justify-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {attivita.indirizzo}
            </p>
          )}
        </div>
      </section>

      {/* GALLERIA */}
      <section className="py-16 px-6 bg-[#0f0f0f]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80",
              "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
              "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80",
              "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&q=80",
            ].map((src, i) => (
              <div key={i} className={`overflow-hidden rounded-xl ${i === 0 ? "row-span-2" : ""}`}>
                <img src={src} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" style={{ minHeight: i === 0 ? "100%" : "160px" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIALITA */}
      {config.specialita && config.specialita.length > 0 && (
        <section id="specialita" className="py-24 px-6 bg-[#0f0f0f]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <div className="w-12 h-[2px] mx-auto mb-8" style={{ background: colore }} />
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">Le nostre specialita</h2>
              <p className="text-gray-600">I piatti che ci rendono unici</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {config.specialita.map((spec, i) => (
                <div key={i} className="rounded-2xl p-7 bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all group">
                  <div className="text-3xl mb-4">{["🍝", "🐟", "🍰", "🥩", "🫒", "🍷"][i % 6]}</div>
                  <h3 className="text-lg font-bold mb-2">{spec}</h3>
                  <p className="text-sm text-gray-600">Preparato con ingredienti freschi e di stagione, seguendo le ricette della tradizione.</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* COME PRENOTARE */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="w-12 h-[2px] mx-auto mb-8" style={{ background: colore }} />
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Prenota in 30 secondi</h2>
            <p className="text-gray-600">Basta un messaggio su WhatsApp</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { num: "01", titolo: "Scrivi su WhatsApp", desc: "Clicca il pulsante e invia un messaggio. Il nostro assistente ti risponde subito." },
              { num: "02", titolo: "Scegli data e orario", desc: "Dicci quando vuoi venire e per quante persone. Confermiamo la disponibilita in tempo reale." },
              { num: "03", titolo: "Sei prenotato!", desc: "Ricevi la conferma su WhatsApp. Ti mandiamo un promemoria il giorno prima." },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 text-black font-bold text-lg" style={{ background: colore }}>
                  {step.num}
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.titolo}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ORARI */}
      <section id="orari" className="py-24 px-6 bg-[#0f0f0f]">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-14">
            <div className="w-12 h-[2px] mx-auto mb-8" style={{ background: colore }} />
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Orari</h2>
          </div>

          {turni.length > 0 && (
            <div className="rounded-2xl border border-white/5 overflow-hidden mb-8">
              {turni.map((turno, i) => (
                <div key={turno.id} className={`flex items-center justify-between px-6 py-5 ${i > 0 ? "border-t border-white/5" : ""}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center bg-white/5">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
                    </div>
                    <div>
                      <div className="font-semibold">{turno.nome}</div>
                      <div className="text-sm text-gray-600">{turno.coperti} coperti</div>
                    </div>
                  </div>
                  <div className="font-mono text-sm text-gray-400">{turno.inizio} — {turno.fine}</div>
                </div>
              ))}
            </div>
          )}

          <div className="rounded-2xl border border-white/5 overflow-hidden">
            <div className="px-6 py-4 bg-white/[0.02] border-b border-white/5">
              <span className="font-semibold text-sm">Giorni di apertura</span>
            </div>
            {["Lunedi", "Martedi", "Mercoledi", "Giovedi", "Venerdi", "Sabato", "Domenica"].map((g, i) => (
              <div key={g} className={`flex items-center justify-between px-6 py-3 ${i > 0 ? "border-t border-white/[0.03]" : ""}`}>
                <span className="text-sm text-gray-400">{g}</span>
                <span className="text-sm font-medium" style={{ color: colore }}>Aperto</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTATTI */}
      <section id="contatti" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="w-12 h-[2px] mx-auto mb-8" style={{ background: colore }} />
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Dove trovarci</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {attivita.indirizzo && (
                <a href={`https://maps.google.com/?q=${encodeURIComponent(attivita.indirizzo)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all group">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-500/10 text-blue-400 shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <div className="font-medium text-sm">{attivita.indirizzo}</div>
                    <div className="text-xs text-gray-600 group-hover:text-blue-400 transition-colors">Apri in Google Maps</div>
                  </div>
                </a>
              )}

              {attivita.telefono && (
                <a href={`tel:${attivita.telefono}`} className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-emerald-500/10 text-emerald-400 shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                  </div>
                  <div>
                    <div className="font-medium text-sm">{attivita.telefono}</div>
                    <div className="text-xs text-gray-600">Chiamaci</div>
                  </div>
                </a>
              )}

              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: `${colore}15` }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={colore}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </div>
                <div>
                  <div className="font-medium text-sm">WhatsApp</div>
                  <div className="text-xs text-gray-600">Scrivici per prenotare</div>
                </div>
              </a>
            </div>

            {attivita.indirizzo && (
              <div className="rounded-2xl overflow-hidden border border-white/5 h-[320px]">
                <iframe
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(attivita.indirizzo)}&output=embed&z=15`}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA FINALE */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl p-12 sm:p-16 text-center relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${colore}20, ${colore}08)`, border: `1px solid ${colore}20` }}>
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ti aspettiamo a tavola</h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">Prenota il tuo tavolo in pochi secondi. Scrivi su WhatsApp e confermiamo subito.</p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-semibold text-black transition-all hover:opacity-90"
                style={{ background: colore }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Prenota su WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="font-bold">{attivita.nome}</span>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            {attivita.indirizzo && <span>{attivita.indirizzo}</span>}
            {attivita.telefono && <span>{attivita.telefono}</span>}
          </div>
          <div className="text-xs text-gray-700">
            Prenotazioni by <a href="https://reservi-two.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors" style={{ color: colore }}>Reservi</a>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP (mobile) */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-[60px] h-[60px] rounded-full flex items-center justify-center text-white shadow-2xl z-50 hover:scale-105 transition-transform sm:hidden"
        style={{ background: "#25D366" }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </div>
  );
}
