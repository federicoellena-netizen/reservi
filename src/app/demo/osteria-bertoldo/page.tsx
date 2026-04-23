"use client";

import { useState } from "react";

const NOME = "Osteria il Bertoldo";
const INDIRIZZO = "Vicolo Cadrega 2/a, 37121 Verona";
const TELEFONO = "045 8015604";
const EMAIL = "osteriabertoldo@gmail.com";
const WHATSAPP_LINK = "https://wa.me/39045815604?text=Ciao!%20Vorrei%20prenotare%20un%20tavolo";
const SITO_ORIGINALE = "https://www.osteriabertoldo.com";

// Foto reali dal sito dell'osteria
const FOTO = {
  logo: `${SITO_ORIGINALE}/images/logo.png`,
  hero: `${SITO_ORIGINALE}/images/home/home3.jpg`,
  hero2: `${SITO_ORIGINALE}/images/home/home7.jpg`,
  gallery: [
    `${SITO_ORIGINALE}/images/blog/blog1.jpg`,
    `${SITO_ORIGINALE}/images/blog/blog2.jpg`,
    `${SITO_ORIGINALE}/images/blog/blog3.jpg`,
    `${SITO_ORIGINALE}/images/blog/blog4.jpg`,
    `${SITO_ORIGINALE}/images/blog/blog5.jpg`,
    `${SITO_ORIGINALE}/images/blog/blog6.jpg`,
  ],
};

const specialita = [
  { nome: "Battuta di Fassona Piemontese", desc: "Pregiata carne piemontese tagliata a coltello, condita con olio EVO e scaglie di Parmigiano Reggiano." },
  { nome: "Spaghetti alla Bisque di Crostacei", desc: "Pasta trafilata al bronzo con bisque di crostacei freschi. Un piatto che porta il mare sulla vostra tavola." },
  { nome: "Risotto all'Amarone", desc: "Il grande classico veronese. Riso Carnaroli mantecato con Amarone della Valpolicella e Monte Veronese." },
  { nome: "Tagliata di Tonno", desc: "Tonno rosso scottato al sesamo, servito al sangue con riduzione di balsamico e rucola selvatica." },
  { nome: "Bollito Misto con Peara", desc: "Selezione di carni bollite con la tradizionale salsa Peara veronese, ricetta tramandata da generazioni." },
  { nome: "Piatti Senza Glutine", desc: "Ampia scelta dedicata ai celiaci, preparati con cura e attenzione in cucina. Perche tutti meritano il meglio." },
];

const recensioni = [
  { nome: "Marco T.", testo: "Camerieri preparati, molto attenti e cordiali. I piatti ottimi sia di carne che di pesce. Il risotto all'Amarone e' da provare assolutamente." },
  { nome: "Giulia R.", testo: "Un angolo di autenticita nel centro di Verona. Il pesce e' freschissimo e la pasta fatta in casa si sente. Ambiente rilassante e personale esperto." },
  { nome: "Andrea B.", testo: "Finalmente un'osteria con un vero menu per celiaci. Mia moglie ha potuto mangiare tutto senza problemi. Ci torneremo sicuramente." },
  { nome: "Laura M.", testo: "Siamo tornati tre volte in una settimana. Il bollito con la peara e' il migliore che abbia mai assaggiato. Porzioni generose e prezzi onesti." },
];

export default function OsteriaBertoldoDemo() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: "#faf7f2", color: "#2c2418" }}>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: "rgba(250,247,242,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(44,36,24,0.08)" }}>
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={FOTO.logo} alt={NOME} className="h-12 rounded" />
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm" style={{ fontFamily: "'Georgia', serif" }}>
            <a href="#chi-siamo" className="hover:opacity-70 transition-opacity" style={{ color: "#6b5c4a" }}>Chi siamo</a>
            <a href="#menu" className="hover:opacity-70 transition-opacity" style={{ color: "#6b5c4a" }}>Menu</a>
            <a href="#galleria" className="hover:opacity-70 transition-opacity" style={{ color: "#6b5c4a" }}>Galleria</a>
            <a href="#contatti" className="hover:opacity-70 transition-opacity" style={{ color: "#6b5c4a" }}>Contatti</a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 shadow-md"
              style={{ background: "#6b4226", fontFamily: "system-ui" }}
            >
              Prenota un tavolo
            </a>
          </div>

          <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5">
            <span className={`w-5 h-0.5 transition-all ${mobileMenu ? "rotate-45 translate-y-1" : ""}`} style={{ background: "#2c2418" }} />
            <span className={`w-5 h-0.5 transition-all ${mobileMenu ? "opacity-0" : ""}`} style={{ background: "#2c2418" }} />
            <span className={`w-5 h-0.5 transition-all ${mobileMenu ? "-rotate-45 -translate-y-1" : ""}`} style={{ background: "#2c2418" }} />
          </button>
        </div>

        {mobileMenu && (
          <div className="md:hidden px-6 py-4 space-y-3" style={{ background: "#faf7f2", borderTop: "1px solid rgba(44,36,24,0.08)" }}>
            <a href="#chi-siamo" onClick={() => setMobileMenu(false)} className="block py-2" style={{ color: "#6b5c4a" }}>Chi siamo</a>
            <a href="#menu" onClick={() => setMobileMenu(false)} className="block py-2" style={{ color: "#6b5c4a" }}>Menu</a>
            <a href="#galleria" onClick={() => setMobileMenu(false)} className="block py-2" style={{ color: "#6b5c4a" }}>Galleria</a>
            <a href="#contatti" onClick={() => setMobileMenu(false)} className="block py-2" style={{ color: "#6b5c4a" }}>Contatti</a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="block text-center px-6 py-3 rounded-full text-white font-semibold" style={{ background: "#6b4226" }}>
              Prenota un tavolo
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative h-[85vh] min-h-[600px] flex items-end">
        <div className="absolute inset-0">
          <img src={FOTO.hero} alt={NOME} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(44,36,24,0.95) 0%, rgba(44,36,24,0.4) 40%, rgba(44,36,24,0.1) 100%)" }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-20 w-full">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6 text-white/80" style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)", fontFamily: "system-ui" }}>
            Dal 1988 &middot; Verona Centro Storico
          </div>

          <h1 className="text-white text-5xl sm:text-7xl font-bold leading-[1.05] tracking-tight mb-5 max-w-2xl" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
            Osteria<br />il Bertoldo
          </h1>

          <p className="text-lg sm:text-xl max-w-lg mb-10 leading-relaxed" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "system-ui" }}>
            Pesce freschissimo, carne selezionata, pasta fatta in casa e vini di qualita. Nel cuore di Verona.
          </p>

          <div className="flex flex-col sm:flex-row gap-4" style={{ fontFamily: "system-ui" }}>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-lg font-semibold transition-all hover:opacity-90 shadow-xl"
              style={{ background: "#25D366", color: "white" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Prenota su WhatsApp
            </a>
            <a href={`tel:${TELEFONO}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-lg font-medium text-white transition-all hover:bg-white/10" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
              045 8015604
            </a>
          </div>
        </div>
      </section>

      {/* CHI SIAMO */}
      <section id="chi-siamo" className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-20 h-[1px] mx-auto mb-10" style={{ background: "#c4a97d" }} />
          <p className="text-sm uppercase tracking-[0.3em] mb-6" style={{ color: "#a08b6e", fontFamily: "system-ui" }}>La nostra storia</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 leading-tight" style={{ fontFamily: "'Georgia', serif", color: "#2c2418" }}>
            Un ristorante di qualita<br />nel cuore di Verona
          </h2>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "#6b5c4a", fontFamily: "system-ui" }}>
            Dal 1988, l&apos;Osteria il Bertoldo vi accoglie in un ambiente rilassante e piacevole.
            Il nostro personale esperto e cordiale vi guidera alla scoperta di piatti preparati con
            <strong> pesce freschissimo</strong>, <strong>carne selezionata dai migliori macellai della zona</strong> e
            <strong> pasta fatta in casa</strong> ogni giorno. Il tutto accompagnato da una selezione di vini di qualita.
          </p>
          <img src={FOTO.hero2} alt="Interno Osteria il Bertoldo" className="mt-12 rounded-2xl w-full max-h-[400px] object-cover shadow-lg" />
        </div>
      </section>

      {/* SPECIALITA */}
      <section id="menu" className="py-24 px-6" style={{ background: "#f3ede4" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="w-20 h-[1px] mx-auto mb-10" style={{ background: "#c4a97d" }} />
            <p className="text-sm uppercase tracking-[0.3em] mb-4" style={{ color: "#a08b6e", fontFamily: "system-ui" }}>I nostri piatti</p>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "'Georgia', serif", color: "#2c2418" }}>Le specialita della casa</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {specialita.map((spec, i) => (
              <div key={i} className="rounded-2xl p-7 transition-all hover:shadow-md" style={{ background: "#faf7f2", border: "1px solid rgba(44,36,24,0.06)" }}>
                <div className="flex items-start gap-4">
                  <div className="w-1 h-12 rounded-full flex-shrink-0 mt-1" style={{ background: "#c4a97d" }} />
                  <div>
                    <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Georgia', serif", color: "#2c2418" }}>{spec.nome}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#6b5c4a", fontFamily: "system-ui" }}>{spec.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERIA */}
      <section id="galleria" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="w-20 h-[1px] mx-auto mb-10" style={{ background: "#c4a97d" }} />
            <p className="text-sm uppercase tracking-[0.3em] mb-4" style={{ color: "#a08b6e", fontFamily: "system-ui" }}>Il nostro locale</p>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "'Georgia', serif", color: "#2c2418" }}>Galleria</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {FOTO.gallery.map((src, i) => (
              <div key={i} className={`overflow-hidden rounded-xl shadow-sm ${i === 0 ? "md:row-span-2" : ""}`}>
                <img
                  src={src}
                  alt={`${NOME} - Foto ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  style={{ minHeight: i === 0 ? "100%" : "220px" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRENOTAZIONE */}
      <section className="py-24 px-6" style={{ background: "#2c2418", color: "white" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="w-20 h-[1px] mx-auto mb-10" style={{ background: "#c4a97d" }} />
            <p className="text-sm uppercase tracking-[0.3em] mb-4" style={{ color: "#c4a97d", fontFamily: "system-ui" }}>Prenotazioni</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ fontFamily: "'Georgia', serif" }}>Prenota in 30 secondi</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: "system-ui" }}>Scrivi su WhatsApp, il nostro assistente ti risponde subito</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8" style={{ fontFamily: "system-ui" }}>
            {[
              { num: "1", titolo: "Scrivi su WhatsApp", desc: "Invia un messaggio. Il nostro assistente ti risponde in pochi secondi, anche di sera e nel weekend." },
              { num: "2", titolo: "Scegli data e orario", desc: "Dicci quando vuoi venire e per quante persone. Verifichiamo subito la disponibilita." },
              { num: "3", titolo: "Sei prenotato!", desc: "Ricevi la conferma su WhatsApp. Ti mandiamo un promemoria il giorno prima della cena." },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 text-lg font-bold" style={{ background: "#c4a97d", color: "#2c2418" }}>
                  {step.num}
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ fontFamily: "'Georgia', serif" }}>{step.titolo}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-14">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-lg font-semibold transition-all hover:opacity-90 shadow-xl"
              style={{ background: "#25D366", color: "white" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Prenota su WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* RECENSIONI */}
      <section className="py-24 px-6" style={{ background: "#f3ede4" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="w-20 h-[1px] mx-auto mb-10" style={{ background: "#c4a97d" }} />
            <p className="text-sm uppercase tracking-[0.3em] mb-4" style={{ color: "#a08b6e", fontFamily: "system-ui" }}>Recensioni</p>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "'Georgia', serif", color: "#2c2418" }}>Cosa dicono i nostri ospiti</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {recensioni.map((r, i) => (
              <div key={i} className="rounded-2xl p-7" style={{ background: "#faf7f2", border: "1px solid rgba(44,36,24,0.06)" }}>
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} style={{ color: "#c4a97d" }}>&#9733;</span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#6b5c4a", fontFamily: "system-ui" }}>&ldquo;{r.testo}&rdquo;</p>
                <div className="font-semibold text-sm" style={{ color: "#2c2418" }}>{r.nome}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUONI REGALO */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="rounded-2xl p-10 sm:p-14" style={{ background: "#f3ede4", border: "1px solid rgba(44,36,24,0.08)" }}>
            <p className="text-sm uppercase tracking-[0.3em] mb-4" style={{ color: "#a08b6e", fontFamily: "system-ui" }}>Idea regalo</p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ fontFamily: "'Georgia', serif", color: "#2c2418" }}>Buoni Regalo</h2>
            <p className="mb-6 max-w-md mx-auto" style={{ color: "#6b5c4a", fontFamily: "system-ui" }}>
              Regala un&apos;esperienza culinaria unica all&apos;Osteria il Bertoldo.
            </p>
            <div className="flex flex-wrap justify-center gap-3" style={{ fontFamily: "system-ui" }}>
              {["50", "100", "150", "200"].map((v) => (
                <span key={v} className="px-6 py-3 rounded-full text-sm font-semibold" style={{ background: "#faf7f2", color: "#2c2418", border: "1px solid rgba(44,36,24,0.1)" }}>
                  {v}&euro;
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ORARI + CONTATTI + MAPPA */}
      <section id="contatti" className="py-24 px-6" style={{ background: "#2c2418", color: "white" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="w-20 h-[1px] mx-auto mb-10" style={{ background: "#c4a97d" }} />
            <p className="text-sm uppercase tracking-[0.3em] mb-4" style={{ color: "#c4a97d", fontFamily: "system-ui" }}>Informazioni</p>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "'Georgia', serif" }}>Dove trovarci</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8" style={{ fontFamily: "system-ui" }}>
            <div className="space-y-4">
              {/* Orari */}
              <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 className="font-semibold mb-4 text-sm" style={{ color: "#c4a97d" }}>Orari di apertura</h3>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>Lunedi — Domenica</span>
                  <span className="text-sm font-medium">12:00 — 22:00</span>
                </div>
                <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.3)" }}>Orario continuato, cucina sempre aperta</p>
              </div>

              {/* Contatti */}
              <a href={`https://maps.google.com/?q=${encodeURIComponent(INDIRIZZO)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 rounded-2xl transition-all hover:opacity-80" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(196,169,125,0.15)" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c4a97d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <div className="font-medium text-sm">{INDIRIZZO}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Apri in Google Maps</div>
                </div>
              </a>

              <a href={`tel:${TELEFONO}`} className="flex items-center gap-4 p-5 rounded-2xl transition-all hover:opacity-80" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(196,169,125,0.15)" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c4a97d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                </div>
                <div>
                  <div className="font-medium text-sm">{TELEFONO}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Chiamaci</div>
                </div>
              </a>

              <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 p-5 rounded-2xl transition-all hover:opacity-80" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(196,169,125,0.15)" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c4a97d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <div>
                  <div className="font-medium text-sm">{EMAIL}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Scrivici</div>
                </div>
              </a>
            </div>

            <div className="rounded-2xl overflow-hidden h-[400px]" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
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

      {/* FOOTER */}
      <footer className="py-10 px-6" style={{ background: "#241e14", fontFamily: "system-ui" }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <img src={FOTO.logo} alt={NOME} className="h-10 rounded opacity-80" />
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            <span>{INDIRIZZO}</span>
            <span className="hidden sm:inline">&middot;</span>
            <span>{TELEFONO}</span>
          </div>
          <div className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            Prenotazioni by <a href="https://getreservi.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:opacity-70" style={{ color: "#c4a97d" }}>Reservi</a>
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-6 pt-6 text-center text-xs" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.2)" }}>
          P.IVA 04573830231 &middot; &copy; {new Date().getFullYear()} {NOME}. Tutti i diritti riservati.
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
