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
  const colore = config.colore || "#b45309";
  const whatsappNum = (attivita.whatsapp || attivita.telefono || "").replace(/[\s+()-]/g, "");
  const whatsappLink = `https://wa.me/${whatsappNum}?text=${encodeURIComponent("Ciao! Vorrei prenotare un tavolo")}`;

  const heroImg = config.hero_img || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&q=80";

  const giorni = [
    { giorno: "Lunedi", aperto: true },
    { giorno: "Martedi", aperto: true },
    { giorno: "Mercoledi", aperto: true },
    { giorno: "Giovedi", aperto: true },
    { giorno: "Venerdi", aperto: true },
    { giorno: "Sabato", aperto: true },
    { giorno: "Domenica", aperto: true },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5]" style={{ "--accent": colore, "--accent-light": `${colore}18`, "--accent-dark": `${colore}dd` } as React.CSSProperties}>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-[70px] flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
              style={{ background: colore }}
            >
              {attivita.nome.charAt(0)}
            </div>
            <span className="font-serif text-xl font-bold text-gray-900 tracking-tight">{attivita.nome}</span>
          </a>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#chi-siamo" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">Chi siamo</a>
            <a href="#specialita" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">Il Menu</a>
            <a href="#orari" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">Orari</a>
            <a href="#contatti" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">Contatti</a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:shadow-lg active:scale-95"
              style={{ background: colore }}
            >
              Prenota un tavolo
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          >
            <span className={`w-5 h-0.5 bg-gray-800 transition-all ${mobileMenu ? "rotate-45 translate-y-1" : ""}`} />
            <span className={`w-5 h-0.5 bg-gray-800 transition-all ${mobileMenu ? "opacity-0" : ""}`} />
            <span className={`w-5 h-0.5 bg-gray-800 transition-all ${mobileMenu ? "-rotate-45 -translate-y-1" : ""}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
            <a href="#chi-siamo" onClick={() => setMobileMenu(false)} className="block text-gray-700 font-medium py-2">Chi siamo</a>
            <a href="#specialita" onClick={() => setMobileMenu(false)} className="block text-gray-700 font-medium py-2">Il Menu</a>
            <a href="#orari" onClick={() => setMobileMenu(false)} className="block text-gray-700 font-medium py-2">Orari</a>
            <a href="#contatti" onClick={() => setMobileMenu(false)} className="block text-gray-700 font-medium py-2">Contatti</a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center px-6 py-3 rounded-full text-white font-semibold"
              style={{ background: colore }}
            >
              Prenota un tavolo
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative h-[85vh] min-h-[600px] flex items-end">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt={attivita.nome}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16 w-full">
          {config.fascia_prezzo && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5 bg-white/15 backdrop-blur-sm text-white/90 border border-white/20">
              {attivita.tipo === "ristorante" ? "Ristorante" : attivita.tipo} &middot; {config.fascia_prezzo}
            </div>
          )}

          <h1 className="text-5xl sm:text-7xl font-serif font-bold text-white leading-[1.1] mb-4 max-w-2xl">
            {attivita.nome}
          </h1>

          {config.descrizione && (
            <p className="text-lg sm:text-xl text-white/80 max-w-lg mb-8 leading-relaxed">
              {config.descrizione}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-lg font-semibold text-white transition-all hover:shadow-xl active:scale-95"
              style={{ background: colore }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Prenota su WhatsApp
            </a>
            {attivita.telefono && (
              <a
                href={`tel:${attivita.telefono}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-lg font-medium text-white bg-white/15 backdrop-blur-sm border border-white/25 hover:bg-white/25 transition-all"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
                Chiama
              </a>
            )}
          </div>
        </div>
      </section>

      {/* CHI SIAMO */}
      <section id="chi-siamo" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block w-12 h-[2px] mb-6" style={{ background: colore }} />
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Benvenuti da {attivita.nome}
          </h2>
          {config.descrizione && (
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {config.descrizione}. Vi aspettiamo per un&apos;esperienza culinaria autentica,
              dove ogni piatto racconta la tradizione e la passione per la buona cucina italiana.
            </p>
          )}
          {attivita.indirizzo && (
            <p className="mt-6 text-sm text-gray-500 flex items-center justify-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              {attivita.indirizzo}
            </p>
          )}
        </div>
      </section>

      {/* SPECIALITA */}
      {config.specialita && config.specialita.length > 0 && (
        <section id="specialita" className="py-24 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <div className="inline-block w-12 h-[2px] mb-6" style={{ background: colore }} />
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Le nostre specialita</h2>
              <p className="text-gray-500">I piatti che ci rendono unici</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {config.specialita.map((spec, i) => (
                <div
                  key={i}
                  className="group relative rounded-2xl p-8 bg-[#faf8f5] border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-5 text-2xl"
                    style={{ background: `${colore}12` }}
                  >
                    {["🍝", "🐟", "🍰", "🥩", "🫒", "🍷"][i % 6]}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">{spec}</h3>
                  <p className="text-sm text-gray-500">Preparato con ingredienti freschi e di stagione, seguendo le ricette della tradizione.</p>
                  <div className="absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `${colore}15` }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colore} strokeWidth="2.5"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* COME PRENOTARE */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block w-12 h-[2px] mb-6" style={{ background: colore }} />
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Prenota in 30 secondi</h2>
            <p className="text-gray-500">Basta un messaggio su WhatsApp</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { num: "01", titolo: "Scrivi su WhatsApp", desc: "Clicca il pulsante e invia un messaggio. Il nostro assistente ti risponde subito." },
              { num: "02", titolo: "Scegli data e orario", desc: "Dicci quando vuoi venire e per quante persone. Ti confermiamo la disponibilita in tempo reale." },
              { num: "03", titolo: "Sei prenotato!", desc: "Ricevi la conferma su WhatsApp. Ti mandiamo anche un promemoria il giorno prima." },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 text-white font-bold text-lg"
                  style={{ background: colore }}
                >
                  {step.num}
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{step.titolo}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ORARI */}
      <section id="orari" className="py-24 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block w-12 h-[2px] mb-6" style={{ background: colore }} />
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Orari di apertura</h2>
          </div>

          {turni.length > 0 && (
            <div className="rounded-2xl border border-gray-100 overflow-hidden mb-8">
              {turni.map((turno, i) => (
                <div
                  key={turno.id}
                  className={`flex items-center justify-between px-6 py-5 ${i > 0 ? "border-t border-gray-100" : ""}`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-lg"
                      style={{ background: `${colore}12` }}
                    >
                      {turno.nome.toLowerCase().includes("pranzo") ? "☀️" : "🌙"}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{turno.nome}</div>
                      <div className="text-sm text-gray-500">{turno.coperti} coperti disponibili</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-sm font-semibold text-gray-900">{turno.inizio}</span>
                    <span className="text-gray-400 mx-2">—</span>
                    <span className="font-mono text-sm font-semibold text-gray-900">{turno.fine}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
              <span className="font-semibold text-gray-900 text-sm">Giorni di apertura</span>
            </div>
            {giorni.map((g, i) => (
              <div key={g.giorno} className={`flex items-center justify-between px-6 py-3 ${i > 0 ? "border-t border-gray-50" : ""}`}>
                <span className="text-sm text-gray-700">{g.giorno}</span>
                <span className="text-sm font-medium" style={{ color: colore }}>Aperto</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTATTI + MAPPA */}
      <section id="contatti" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block w-12 h-[2px] mb-6" style={{ background: colore }} />
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Dove trovarci</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Info */}
            <div className="space-y-4">
              {attivita.indirizzo && (
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(attivita.indirizzo)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-gray-100 hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-50 text-blue-500 shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{attivita.indirizzo}</div>
                    <div className="text-xs text-gray-500 group-hover:text-blue-500 transition-colors">Apri in Google Maps →</div>
                  </div>
                </a>
              )}

              {attivita.telefono && (
                <a
                  href={`tel:${attivita.telefono}`}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-gray-100 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-green-50 text-green-600 shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{attivita.telefono}</div>
                    <div className="text-xs text-gray-500">Chiamaci</div>
                  </div>
                </a>
              )}

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: `${colore}12` }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={colore}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">WhatsApp</div>
                  <div className="text-xs text-gray-500">Scrivici per prenotare</div>
                </div>
              </a>
            </div>

            {/* Mappa */}
            {attivita.indirizzo && (
              <div className="rounded-2xl overflow-hidden border border-gray-100 h-[320px]">
                <iframe
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(attivita.indirizzo)}&output=embed&z=15`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
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
          <div
            className="rounded-3xl p-12 sm:p-16 text-center text-white relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${colore}, ${colore}cc)` }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4" />

            <div className="relative z-10">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
                Ti aspettiamo a tavola
              </h2>
              <p className="text-white/80 mb-8 max-w-md mx-auto">
                Prenota il tuo tavolo in pochi secondi. Scrivi su WhatsApp e il nostro assistente ti conferma subito la disponibilita.
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-semibold bg-white hover:shadow-xl transition-all active:scale-95"
                style={{ color: colore }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Prenota su WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 border-t border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ background: colore }}
            >
              {attivita.nome.charAt(0)}
            </div>
            <span className="font-serif font-bold text-gray-900">{attivita.nome}</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            {attivita.indirizzo && <span>{attivita.indirizzo}</span>}
            {attivita.telefono && <span>{attivita.telefono}</span>}
          </div>

          <div className="text-xs text-gray-400">
            Prenotazioni by{" "}
            <a
              href="https://reservi-two.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-gray-600 transition-colors"
              style={{ color: colore }}
            >
              Reservi
            </a>
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
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}
