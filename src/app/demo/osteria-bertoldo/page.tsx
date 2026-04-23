"use client";

import { useState } from "react";

const NOME = "Osteria il Bertoldo";
const INDIRIZZO = "Vicolo Cadrega 2/a, 37121 Verona";
const TELEFONO = "045 8015604";
const EMAIL = "osteriabertoldo@gmail.com";
const COLORE = "#c4842d";
const COLORE_LIGHT = "#c4842d20";
const WHATSAPP_LINK = "https://wa.me/39045815604?text=Ciao!%20Vorrei%20prenotare%20un%20tavolo";
const HERO_IMG = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1400&q=80";

const specialita = [
  { nome: "Battuta di Fassona Piemontese", desc: "Taglio a coltello di pregiata carne piemontese, condita con olio EVO e scaglie di Parmigiano.", icon: "🥩" },
  { nome: "Spaghetti alla Bisque", desc: "Pasta trafilata al bronzo con bisque di crostacei freschi, un'esplosione di sapore marino.", icon: "🦐" },
  { nome: "Risotto all'Amarone", desc: "Il grande classico veronese. Riso Carnaroli mantecato con Amarone della Valpolicella.", icon: "🍷" },
  { nome: "Tagliata di Tonno", desc: "Tonno rosso scottato al sesamo, servito al sangue con riduzione di balsamico e rucola.", icon: "🐟" },
  { nome: "Bollito Misto con Peara", desc: "Selezione di carni bollite con la tradizionale salsa Peara veronese, ricetta storica.", icon: "🍖" },
  { nome: "Menu Senza Glutine", desc: "Ampia scelta di piatti dedicati ai celiaci, preparati con cura in cucina separata.", icon: "🌾" },
];

const recensioni = [
  { nome: "Marco T.", stelle: 5, testo: "Camerieri preparati, molto attenti e cordiali. I piatti ottimi sia di carne che di pesce. Il risotto all'Amarone e' un capolavoro." },
  { nome: "Giulia R.", stelle: 5, testo: "Ambiente rilassante nel cuore di Verona. Il pesce e' freschissimo e la pasta fatta in casa si sente. Ci torneremo sicuramente." },
  { nome: "Andrea B.", stelle: 5, testo: "Finalmente un'osteria che ha un menu completo per celiaci! Mia moglie ha potuto mangiare tutto senza problemi. Grazie!" },
];

export default function OsteriaBertoldoDemo() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0908] text-white" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0908]/85 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-lg tracking-tight" style={{ fontFamily: "Georgia, serif" }}>{NOME}</span>

          <div className="hidden md:flex items-center gap-8">
            <a href="#chi-siamo" className="text-sm text-gray-500 hover:text-white transition-colors" style={{ fontFamily: "system-ui" }}>Chi siamo</a>
            <a href="#specialita" className="text-sm text-gray-500 hover:text-white transition-colors" style={{ fontFamily: "system-ui" }}>Specialita</a>
            <a href="#orari" className="text-sm text-gray-500 hover:text-white transition-colors" style={{ fontFamily: "system-ui" }}>Orari</a>
            <a href="#contatti" className="text-sm text-gray-500 hover:text-white transition-colors" style={{ fontFamily: "system-ui" }}>Contatti</a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full text-sm font-semibold text-black transition-all hover:opacity-90"
              style={{ background: COLORE, fontFamily: "system-ui" }}
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
          <div className="md:hidden bg-[#0f0e0c] border-t border-white/5 px-6 py-4 space-y-3">
            <a href="#chi-siamo" onClick={() => setMobileMenu(false)} className="block text-gray-400 font-medium py-2">Chi siamo</a>
            <a href="#specialita" onClick={() => setMobileMenu(false)} className="block text-gray-400 font-medium py-2">Specialita</a>
            <a href="#orari" onClick={() => setMobileMenu(false)} className="block text-gray-400 font-medium py-2">Orari</a>
            <a href="#contatti" onClick={() => setMobileMenu(false)} className="block text-gray-400 font-medium py-2">Contatti</a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="block text-center px-6 py-3 rounded-full text-black font-semibold" style={{ background: COLORE }}>
              Prenota un tavolo
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative h-[95vh] min-h-[700px] flex items-end">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt={NOME} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908] via-[#0a0908]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-24 w-full">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6 bg-white/10 backdrop-blur-sm text-white/70 border border-white/10" style={{ fontFamily: "system-ui" }}>
            Osteria &middot; Dal 1988 &middot; Verona Centro
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold leading-[1.05] tracking-tight mb-5 max-w-2xl">
            Osteria<br />il Bertoldo
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-lg mb-10 leading-relaxed" style={{ fontFamily: "system-ui" }}>
            Pesce freschissimo, carne selezionata, pasta fatta in casa e vini di qualita nel cuore di Verona. Dal 1988.
          </p>

          <div className="flex flex-col sm:flex-row gap-4" style={{ fontFamily: "system-ui" }}>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-lg font-semibold text-black transition-all hover:opacity-90 shadow-2xl"
              style={{ background: COLORE }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Prenota su WhatsApp
            </a>
            <a href={`tel:${TELEFONO}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-lg font-medium text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
              045 8015604
            </a>
          </div>
        </div>
      </section>

      {/* DAL 1988 */}
      <section id="chi-siamo" className="py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-[1px] mx-auto mb-10" style={{ background: COLORE }} />
          <p className="text-sm uppercase tracking-[0.3em] mb-6" style={{ color: COLORE, fontFamily: "system-ui" }}>Dal 1988</p>
          <h2 className="text-3xl sm:text-5xl font-bold mb-8 leading-tight">
            Un angolo di tradizione<br />nel cuore di Verona
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: "system-ui" }}>
            Da oltre 35 anni, l&apos;Osteria il Bertoldo accoglie i suoi ospiti con la passione per la cucina autentica.
            Pesce freschissimo dal mercato, carne selezionata dai migliori macellai della zona, pasta fatta in casa ogni giorno
            e una carta dei vini che celebra le eccellenze venete e italiane.
          </p>
          <div className="flex items-center justify-center gap-8 mt-12" style={{ fontFamily: "system-ui" }}>
            {[
              { num: "35+", label: "Anni di storia" },
              { num: "4.5", label: "Stelle TripAdvisor" },
              { num: "100%", label: "Ingredienti freschi" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold" style={{ color: COLORE }}>{s.num}</div>
                <div className="text-xs text-gray-600 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERIA */}
      <section className="py-4 px-6 bg-[#0f0e0c]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            {[
              "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80",
              "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&q=80",
              "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&q=80",
              "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500&q=80",
            ].map((src, i) => (
              <div key={i} className={`overflow-hidden rounded-xl ${i === 0 ? "row-span-2" : ""}`}>
                <img src={src} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" style={{ minHeight: i === 0 ? "100%" : "180px" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIALITA */}
      <section id="specialita" className="py-28 px-6 bg-[#0f0e0c]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="w-16 h-[1px] mx-auto mb-10" style={{ background: COLORE }} />
            <p className="text-sm uppercase tracking-[0.3em] mb-4" style={{ color: COLORE, fontFamily: "system-ui" }}>Il menu</p>
            <h2 className="text-3xl sm:text-5xl font-bold mb-3">Le nostre specialita</h2>
            <p className="text-gray-600" style={{ fontFamily: "system-ui" }}>Piatti che raccontano la tradizione veronese e italiana</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {specialita.map((spec, i) => (
              <div key={i} className="rounded-2xl p-7 bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group">
                <div className="text-3xl mb-4">{spec.icon}</div>
                <h3 className="text-lg font-bold mb-2">{spec.nome}</h3>
                <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: "system-ui" }}>{spec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUONI REGALO */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="rounded-3xl p-10 sm:p-14 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${COLORE}15, ${COLORE}05)`, border: `1px solid ${COLORE}20` }}>
            <p className="text-sm uppercase tracking-[0.3em] mb-4" style={{ color: COLORE, fontFamily: "system-ui" }}>Idea regalo</p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Buoni Regalo</h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto" style={{ fontFamily: "system-ui" }}>
              Regala un&apos;esperienza culinaria unica. Buoni disponibili da 50, 100, 150 e 200 euro.
            </p>
            <div className="flex flex-wrap justify-center gap-3" style={{ fontFamily: "system-ui" }}>
              {["50", "100", "150", "200"].map((v) => (
                <span key={v} className="px-5 py-2.5 rounded-full text-sm font-semibold border border-white/10 bg-white/5">
                  {v}&euro;
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RECENSIONI */}
      <section className="py-28 px-6 bg-[#0f0e0c]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="w-16 h-[1px] mx-auto mb-10" style={{ background: COLORE }} />
            <p className="text-sm uppercase tracking-[0.3em] mb-4" style={{ color: COLORE, fontFamily: "system-ui" }}>Recensioni</p>
            <h2 className="text-3xl sm:text-4xl font-bold">Cosa dicono i nostri ospiti</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {recensioni.map((r, i) => (
              <div key={i} className="rounded-2xl p-6 bg-white/[0.02] border border-white/5">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: r.stelle }).map((_, j) => (
                    <span key={j} className="text-amber-400 text-sm">&#9733;</span>
                  ))}
                </div>
                <p className="text-sm text-gray-400 leading-relaxed mb-4" style={{ fontFamily: "system-ui" }}>&ldquo;{r.testo}&rdquo;</p>
                <div className="text-sm font-semibold" style={{ color: COLORE }}>{r.nome}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COME PRENOTARE */}
      <section className="py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="w-16 h-[1px] mx-auto mb-10" style={{ background: COLORE }} />
            <p className="text-sm uppercase tracking-[0.3em] mb-4" style={{ color: COLORE, fontFamily: "system-ui" }}>Prenotazioni</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Prenota in 30 secondi</h2>
            <p className="text-gray-600" style={{ fontFamily: "system-ui" }}>Scrivi su WhatsApp, il nostro assistente ti risponde subito</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8" style={{ fontFamily: "system-ui" }}>
            {[
              { num: "01", titolo: "Scrivi su WhatsApp", desc: "Clicca il pulsante e invia un messaggio. Il nostro assistente ti risponde in pochi secondi, 24 ore su 24." },
              { num: "02", titolo: "Scegli data e orario", desc: "Dicci quando vuoi venire e per quante persone. Verifichiamo la disponibilita in tempo reale." },
              { num: "03", titolo: "Sei prenotato!", desc: "Ricevi la conferma su WhatsApp. Ti mandiamo un promemoria il giorno prima." },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-black font-bold text-lg" style={{ background: COLORE }}>
                  {step.num}
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ fontFamily: "Georgia, serif" }}>{step.titolo}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ORARI */}
      <section id="orari" className="py-28 px-6 bg-[#0f0e0c]">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-14">
            <div className="w-16 h-[1px] mx-auto mb-10" style={{ background: COLORE }} />
            <p className="text-sm uppercase tracking-[0.3em] mb-4" style={{ color: COLORE, fontFamily: "system-ui" }}>Quando trovarci</p>
            <h2 className="text-3xl sm:text-4xl font-bold">Orari</h2>
          </div>

          <div className="rounded-2xl border border-white/5 overflow-hidden mb-6">
            {[
              { nome: "Pranzo", orario: "12:00 — 15:00" },
              { nome: "Cena", orario: "18:30 — 22:00" },
            ].map((turno, i) => (
              <div key={turno.nome} className={`flex items-center justify-between px-6 py-5 ${i > 0 ? "border-t border-white/5" : ""}`}>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: COLORE_LIGHT }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORE} strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
                  </div>
                  <span className="font-semibold">{turno.nome}</span>
                </div>
                <span className="font-mono text-sm text-gray-400" style={{ fontFamily: "system-ui" }}>{turno.orario}</span>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-white/5 overflow-hidden" style={{ fontFamily: "system-ui" }}>
            <div className="px-6 py-4 bg-white/[0.02] border-b border-white/5">
              <span className="font-semibold text-sm">Apertura</span>
            </div>
            <div className="flex items-center justify-between px-6 py-4">
              <span className="text-sm text-gray-400">Lunedi — Domenica</span>
              <span className="text-sm font-medium" style={{ color: COLORE }}>12:00 — 22:00</span>
            </div>
            <div className="px-6 py-3 border-t border-white/[0.03]">
              <span className="text-xs text-gray-600">Orario continuato</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTATTI + MAPPA */}
      <section id="contatti" className="py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="w-16 h-[1px] mx-auto mb-10" style={{ background: COLORE }} />
            <p className="text-sm uppercase tracking-[0.3em] mb-4" style={{ color: COLORE, fontFamily: "system-ui" }}>Contatti</p>
            <h2 className="text-3xl sm:text-4xl font-bold">Dove trovarci</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8" style={{ fontFamily: "system-ui" }}>
            <div className="space-y-4">
              <a href={`https://maps.google.com/?q=${encodeURIComponent(INDIRIZZO)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all group">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-500/10 text-blue-400 shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <div className="font-medium text-sm">{INDIRIZZO}</div>
                  <div className="text-xs text-gray-600 group-hover:text-blue-400 transition-colors">Apri in Google Maps</div>
                </div>
              </a>

              <a href={`tel:${TELEFONO}`} className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: `${COLORE}15` }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={COLORE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                </div>
                <div>
                  <div className="font-medium text-sm">{TELEFONO}</div>
                  <div className="text-xs text-gray-600">Chiamaci per informazioni</div>
                </div>
              </a>

              <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-purple-500/10 text-purple-400 shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <div>
                  <div className="font-medium text-sm">{EMAIL}</div>
                  <div className="text-xs text-gray-600">Scrivici per info</div>
                </div>
              </a>

              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: "#25D36615" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </div>
                <div>
                  <div className="font-medium text-sm">WhatsApp</div>
                  <div className="text-xs text-gray-600">Prenota con un messaggio</div>
                </div>
              </a>

              {/* Social */}
              <div className="flex gap-3 pt-4">
                <a href="https://instagram.com/osteriailbertoldo_verona" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:border-white/20 transition-all">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="#" className="w-11 h-11 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:border-white/20 transition-all">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </a>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/5 h-[400px]">
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(INDIRIZZO)}&output=embed&z=16`}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINALE */}
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl p-14 sm:p-20 text-center relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${COLORE}18, ${COLORE}06)`, border: `1px solid ${COLORE}20` }}>
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-5xl font-bold mb-5">Ti aspettiamo<br />a tavola</h2>
              <p className="text-gray-500 mb-10 max-w-md mx-auto" style={{ fontFamily: "system-ui" }}>Prenota il tuo tavolo in pochi secondi. Scrivi su WhatsApp e confermiamo subito.</p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-full text-lg font-semibold text-black transition-all hover:opacity-90 shadow-2xl"
                style={{ background: COLORE, fontFamily: "system-ui" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Prenota su WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-white/5" style={{ fontFamily: "system-ui" }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="font-bold text-lg" style={{ fontFamily: "Georgia, serif" }}>{NOME}</span>
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-600">
            <span>{INDIRIZZO}</span>
            <span className="hidden sm:inline">&middot;</span>
            <span>{TELEFONO}</span>
          </div>
          <div className="text-xs text-gray-700">
            Prenotazioni by <a href="https://getreservi.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gray-400" style={{ color: COLORE }}>Reservi</a>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-[60px] h-[60px] rounded-full flex items-center justify-center text-white shadow-2xl z-50 hover:scale-105 transition-transform"
        style={{ background: "#25D366" }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </div>
  );
}
