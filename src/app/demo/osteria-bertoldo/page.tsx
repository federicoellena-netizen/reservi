"use client";

import { useState, useEffect } from "react";

const NOME = "Osteria il Bertoldo";
const INDIRIZZO = "Vicolo Cadrega 2/a, 37121 Verona";
const TELEFONO = "045 8015604";
const EMAIL = "osteriabertoldo@gmail.com";
const WHATSAPP_LINK = "https://wa.me/390458015604?text=Buongiorno!%20Vorrei%20prenotare%20un%20tavolo";
const SITO = "https://www.osteriabertoldo.com";

const FOTO = {
  logo: `${SITO}/images/logo.png`,
  hero1: `${SITO}/images/home/home3.jpg`,
  hero2: `${SITO}/images/home/home7.jpg`,
  gallery: [
    `${SITO}/images/blog/blog1.jpg`,
    `${SITO}/images/blog/blog2.jpg`,
    `${SITO}/images/blog/blog3.jpg`,
    `${SITO}/images/blog/blog4.jpg`,
    `${SITO}/images/blog/blog5.jpg`,
    `${SITO}/images/blog/blog6.jpg`,
  ],
};

const piatti = [
  { nome: "Battuta di Fassona Piemontese", cat: "Antipasto", desc: "Taglio a coltello di pregiata carne piemontese, olio EVO e scaglie di Parmigiano 24 mesi." },
  { nome: "Spaghetti alla Bisque di Crostacei", cat: "Primo", desc: "Pasta trafilata al bronzo con bisque di crostacei freschi del mercato ittico." },
  { nome: "Risotto all'Amarone", cat: "Primo", desc: "Il grande classico veronese. Carnaroli mantecato con Amarone della Valpolicella DOCG." },
  { nome: "Tagliata di Tonno", cat: "Secondo", desc: "Tonno rosso scottato al sesamo nero, riduzione di aceto balsamico e rucola selvatica." },
  { nome: "Bollito Misto con Peara", cat: "Secondo", desc: "Selezione di carni bollite servite con la storica salsa Peara della tradizione veronese." },
  { nome: "Menu Senza Glutine", cat: "Speciale", desc: "Ampia scelta di piatti dedicati ai celiaci, preparati con cura e ingredienti certificati." },
];

const recensioni = [
  { nome: "Marco T.", citta: "Verona", testo: "Camerieri preparati, molto attenti e cordiali. I piatti ottimi sia di carne che di pesce. Il risotto all'Amarone e' semplicemente perfetto." },
  { nome: "Giulia R.", citta: "Milano", testo: "Un angolo di autenticita che non ti aspetti. Pesce freschissimo, pasta fatta in casa, ambiente intimo. Una delle migliori esperienze a Verona." },
  { nome: "Andrea B.", citta: "Padova", testo: "Finalmente un'osteria con un vero menu per celiaci. Mia moglie ha potuto mangiare tutto. Porzioni generose, prezzi giusti." },
  { nome: "Laura M.", citta: "Roma", testo: "Siamo tornati tre volte in una settimana di vacanza. Il bollito con la peara e' il migliore che abbia mai assaggiato in vita mia." },
];

export default function OsteriaBertoldoDemo() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#f8f0eb" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
        .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-body { font-family: 'Inter', system-ui, sans-serif; }
        .gold-line { width: 40px; height: 1px; background: #9b2222; }
        .hover-lift { transition: transform 0.4s ease, box-shadow 0.4s ease; }
        .hover-lift:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(44,36,24,0.12); }
        .img-zoom { overflow: hidden; }
        .img-zoom img { transition: transform 0.8s ease; }
        .img-zoom:hover img { transform: scale(1.06); }
        .fade-up { opacity: 0; transform: translateY(20px); animation: fadeUp 0.8s ease forwards; }
        @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* TOP BAR — telefono + indirizzo */}
      <div className="font-body text-center py-2.5 text-xs tracking-wide" style={{ background: "#2a1010", color: "rgba(255,255,255,0.7)" }}>
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-center gap-6 flex-wrap">
          <a href={`tel:${TELEFONO}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.26 1.21.67 2.38 1.22 3.45a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c1.07.55 2.24.96 3.45 1.22A2 2 0 0122 16.92z"/></svg>
            {TELEFONO}
          </a>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
          <span className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {INDIRIZZO}
          </span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
          <span>Lun — Dom &middot; 12:00 — 22:00</span>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 transition-all duration-300" style={{
        background: scrolled ? "rgba(250,248,244,0.95)" : "rgba(250,248,244,0.8)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(44,36,24,0.08)" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 20px rgba(44,36,24,0.05)" : "none",
      }}>
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <div className="rounded-xl overflow-hidden shadow-md" style={{ background: "#2a1010", padding: "6px" }}>
              <img src={FOTO.logo} alt={NOME} className="h-12 w-auto object-contain" style={{ display: "block" }} />
            </div>
            <div>
              <div className="font-display text-lg sm:text-xl font-bold" style={{ color: "#2a1010" }}>Osteria il Bertoldo</div>
              <div className="font-body text-[10px] uppercase tracking-[0.2em]" style={{ color: "#a0856a" }}>Verona &middot; Dal 1988</div>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#storia" className="font-body text-sm hover:opacity-60 transition-opacity" style={{ color: "#5c4033" }}>La storia</a>
            <a href="#menu" className="font-body text-sm hover:opacity-60 transition-opacity" style={{ color: "#5c4033" }}>Menu</a>
            <a href="#galleria" className="font-body text-sm hover:opacity-60 transition-opacity" style={{ color: "#5c4033" }}>Galleria</a>
            <a href="#contatti" className="font-body text-sm hover:opacity-60 transition-opacity" style={{ color: "#5c4033" }}>Contatti</a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 shadow-md hover:shadow-lg"
              style={{ background: "#7a1e1e" }}
            >
              Prenota ora
            </a>
          </div>

          <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5">
            <span className={`w-5 h-0.5 transition-all ${mobileMenu ? "rotate-45 translate-y-1" : ""}`} style={{ background: "#2a1010" }} />
            <span className={`w-5 h-0.5 transition-all ${mobileMenu ? "opacity-0" : ""}`} style={{ background: "#2a1010" }} />
            <span className={`w-5 h-0.5 transition-all ${mobileMenu ? "-rotate-45 -translate-y-1" : ""}`} style={{ background: "#2a1010" }} />
          </button>
        </div>

        {mobileMenu && (
          <div className="md:hidden font-body px-6 py-5 space-y-1" style={{ background: "#f8f0eb", borderTop: "1px solid rgba(44,36,24,0.06)" }}>
            {["La storia", "Menu", "Galleria", "Contatti"].map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(" ", "")}`} onClick={() => setMobileMenu(false)} className="block py-3 text-sm font-medium" style={{ color: "#5c4033", borderBottom: "1px solid rgba(44,36,24,0.04)" }}>{l}</a>
            ))}
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="block text-center mt-3 px-6 py-3.5 rounded-full text-white font-semibold text-sm" style={{ background: "#7a1e1e" }}>
              Prenota un tavolo
            </a>
          </div>
        )}
      </nav>

      {/* HERO — due foto affiancate come l'originale ma meglio */}
      <section className="px-6 pt-10 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 fade-up">
            <div className="gold-line mx-auto mb-6" />
            <h1 className="font-display text-5xl sm:text-7xl font-bold leading-[1.05] mb-5" style={{ color: "#2a1010" }}>
              Benvenuti all&apos;Osteria<br />il Bertoldo
            </h1>
            <p className="font-body text-lg max-w-xl mx-auto leading-relaxed" style={{ color: "#7a6050" }}>
              Ristorante di qualita nel centro storico di Verona. Dal 1988, pesce freschissimo, carne selezionata e pasta fatta in casa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="img-zoom rounded-2xl h-[350px] sm:h-[450px]">
              <img src={FOTO.hero1} alt="Osteria il Bertoldo — Interno" className="w-full h-full object-cover rounded-2xl" />
            </div>
            <div className="img-zoom rounded-2xl h-[350px] sm:h-[450px]">
              <img src={FOTO.hero2} alt="Osteria il Bertoldo — Piatti" className="w-full h-full object-cover rounded-2xl" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 font-body">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold text-white transition-all hover:opacity-90 shadow-lg hover:shadow-xl"
              style={{ background: "#25D366" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Prenota su WhatsApp
            </a>
            <a href={`tel:${TELEFONO}`} className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-medium transition-all hover:opacity-80" style={{ color: "#7a1e1e", border: "1.5px solid #7a1e1e" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7a1e1e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
              Chiamaci
            </a>
          </div>
        </div>
      </section>

      {/* NUMERI */}
      <section className="py-16 px-6" style={{ background: "#5c1a1a" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { num: "1988", label: "Anno di apertura" },
            { num: "35+", label: "Anni di esperienza" },
            { num: "100%", label: "Ingredienti freschi" },
            { num: "4.5★", label: "TripAdvisor" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl sm:text-4xl font-bold" style={{ color: "#c4956a" }}>{s.num}</div>
              <div className="font-body text-xs mt-2 uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* LA STORIA */}
      <section id="lastoria" className="py-28 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="gold-line mb-8" />
            <p className="font-body text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "#9b2222" }}>La nostra storia</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6 leading-tight" style={{ color: "#2a1010" }}>
              Tradizione e passione dal 1988
            </h2>
            <p className="font-body text-base leading-[1.8] mb-6" style={{ color: "#5c4033" }}>
              Nel cuore del centro storico di Verona, a due passi dall&apos;Arena, l&apos;Osteria il Bertoldo
              accoglie i suoi ospiti da oltre trentacinque anni in un ambiente intimo e accogliente.
            </p>
            <p className="font-body text-base leading-[1.8] mb-8" style={{ color: "#5c4033" }}>
              La nostra cucina celebra la tradizione veronese e italiana con <strong>pesce freschissimo</strong> dal mercato,
              <strong> carne selezionata</strong> dai migliori macellai della zona e <strong>pasta fresca fatta in casa</strong> ogni giorno.
              Il tutto accompagnato da una carta dei vini che racconta le eccellenze della Valpolicella e del Veneto.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(107,66,38,0.08)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7a1e1e" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
              </div>
              <p className="font-body text-sm italic" style={{ color: "#a0856a" }}>
                &ldquo;Ogni piatto racconta la passione per la buona cucina italiana&rdquo;
              </p>
            </div>
          </div>
          <div className="img-zoom rounded-2xl">
            <img src={FOTO.gallery[0]} alt="Interno dell'osteria" className="w-full h-[500px] object-cover rounded-2xl shadow-xl" />
          </div>
        </div>
      </section>

      {/* MENU / SPECIALITA */}
      <section id="menu" className="py-28 px-6" style={{ background: "#f0e6de" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="gold-line mx-auto mb-8" />
            <p className="font-body text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "#9b2222" }}>I nostri piatti</p>
            <h2 className="font-display text-3xl sm:text-5xl font-bold mb-3" style={{ color: "#2a1010" }}>Specialita della casa</h2>
            <p className="font-body text-sm" style={{ color: "#a0856a" }}>Piatti preparati ogni giorno con ingredienti freschi e di stagione</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {piatti.map((p, i) => (
              <div key={i} className="rounded-2xl p-7 hover-lift" style={{ background: "#f8f0eb" }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-body text-[10px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full" style={{ background: "rgba(184,151,106,0.12)", color: "#9b2222" }}>{p.cat}</span>
                </div>
                <h3 className="font-display text-xl font-bold mb-2" style={{ color: "#2a1010" }}>{p.nome}</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: "#7a6050" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERIA */}
      <section id="galleria" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="gold-line mx-auto mb-8" />
            <p className="font-body text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "#9b2222" }}>Il nostro mondo</p>
            <h2 className="font-display text-3xl sm:text-5xl font-bold" style={{ color: "#2a1010" }}>Galleria</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {FOTO.gallery.map((src, i) => (
              <div key={i} className={`img-zoom rounded-xl shadow-sm ${i === 0 || i === 5 ? "md:col-span-1 md:row-span-2" : ""}`}>
                <img
                  src={src}
                  alt={`${NOME} — ${i + 1}`}
                  className="w-full h-full object-cover rounded-xl"
                  style={{ minHeight: (i === 0 || i === 5) ? "100%" : "200px", maxHeight: (i === 0 || i === 5) ? "none" : "260px" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRENOTAZIONE CTA */}
      <section className="py-24 px-6" style={{ background: "#5c1a1a" }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="gold-line mx-auto mb-8" />
          <p className="font-body text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "#c4956a" }}>Prenotazioni</p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mb-5">Prenota il tuo tavolo</h2>
          <p className="font-body text-base mb-10" style={{ color: "rgba(255,255,255,0.5)" }}>
            Scrivi su WhatsApp e il nostro assistente ti risponde subito. Disponibilita in tempo reale, conferma immediata, promemoria il giorno prima.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 mb-12 font-body">
            {[
              { num: "1", t: "Scrivi", d: "Invia un messaggio su WhatsApp" },
              { num: "2", t: "Scegli", d: "Data, orario e numero persone" },
              { num: "3", t: "Confermato", d: "Ricevi conferma e promemoria" },
            ].map((s) => (
              <div key={s.num} className="text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 font-bold" style={{ background: "#c4956a", color: "#2a1010" }}>{s.num}</div>
                <h4 className="font-semibold text-white mb-1">{s.t}</h4>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{s.d}</p>
              </div>
            ))}
          </div>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body inline-flex items-center gap-3 px-10 py-4 rounded-full text-lg font-semibold text-white transition-all hover:opacity-90 shadow-xl hover:shadow-2xl"
            style={{ background: "#25D366" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Prenota su WhatsApp
          </a>
        </div>
      </section>

      {/* RECENSIONI */}
      <section className="py-28 px-6" style={{ background: "#f0e6de" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="gold-line mx-auto mb-8" />
            <p className="font-body text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "#9b2222" }}>Recensioni</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold" style={{ color: "#2a1010" }}>Cosa dicono i nostri ospiti</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {recensioni.map((r, i) => (
              <div key={i} className="rounded-2xl p-7 hover-lift" style={{ background: "#f8f0eb" }}>
                <div className="flex gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="#c4956a"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p className="font-body text-sm leading-[1.8] mb-5" style={{ color: "#5c4033" }}>&ldquo;{r.testo}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-body text-xs font-bold" style={{ background: "rgba(184,151,106,0.15)", color: "#9b2222" }}>
                    {r.nome.charAt(0)}
                  </div>
                  <div>
                    <div className="font-body text-sm font-semibold" style={{ color: "#2a1010" }}>{r.nome}</div>
                    <div className="font-body text-xs" style={{ color: "#a0856a" }}>{r.citta}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUONI REGALO */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl p-10 sm:p-14 text-center" style={{ background: "linear-gradient(135deg, #f0e6de 0%, #f8f0eb 100%)", border: "1px solid rgba(184,151,106,0.2)" }}>
            <div className="gold-line mx-auto mb-6" />
            <p className="font-body text-xs uppercase tracking-[0.3em] mb-3" style={{ color: "#9b2222" }}>Idea regalo</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3" style={{ color: "#2a1010" }}>Buoni Regalo</h2>
            <p className="font-body text-sm mb-8" style={{ color: "#7a6050" }}>
              Regala un&apos;esperienza culinaria unica all&apos;Osteria il Bertoldo
            </p>
            <div className="flex flex-wrap justify-center gap-3 font-body">
              {["50", "100", "150", "200"].map((v) => (
                <span key={v} className="px-6 py-3 rounded-full text-sm font-semibold hover-lift cursor-default" style={{ background: "#f8f0eb", color: "#7a1e1e", border: "1px solid rgba(184,151,106,0.25)", boxShadow: "0 2px 8px rgba(44,36,24,0.04)" }}>
                  {v}&euro;
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTATTI + MAPPA */}
      <section id="contatti" className="py-28 px-6" style={{ background: "#5c1a1a" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="gold-line mx-auto mb-8" />
            <p className="font-body text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "#c4956a" }}>Vieni a trovarci</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">Dove siamo</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 font-body">
            <div className="space-y-3">
              <a href={`https://maps.google.com/?q=${encodeURIComponent(INDIRIZZO)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 rounded-xl transition-all hover:opacity-80" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(196,169,125,0.12)" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c4956a" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <div className="font-medium text-sm text-white">{INDIRIZZO}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Apri in Google Maps &rarr;</div>
                </div>
              </a>

              <a href={`tel:${TELEFONO}`} className="flex items-center gap-4 p-5 rounded-xl transition-all hover:opacity-80" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(196,169,125,0.12)" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c4956a" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                </div>
                <div>
                  <div className="font-medium text-sm text-white">{TELEFONO}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Chiamaci per informazioni</div>
                </div>
              </a>

              <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 p-5 rounded-xl transition-all hover:opacity-80" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(196,169,125,0.12)" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c4956a" strokeWidth="1.5"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <div>
                  <div className="font-medium text-sm text-white">{EMAIL}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Scrivici per info</div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-5 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(196,169,125,0.12)" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c4956a" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
                </div>
                <div>
                  <div className="font-medium text-sm text-white">Lun — Dom &middot; 12:00 — 22:00</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Orario continuato, cucina sempre aperta</div>
                </div>
              </div>

              {/* Social */}
              <div className="flex gap-3 pt-4">
                {[
                  { href: "https://www.facebook.com", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg> },
                  { href: "https://instagram.com/osteriailbertoldo_verona", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg> },
                  { href: "https://www.tripadvisor.it", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg> },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:opacity-70" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "#c4956a" }}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-xl overflow-hidden h-[420px]" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
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
      <footer className="py-10 px-6 font-body" style={{ background: "#1a0e0e" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg overflow-hidden" style={{ background: "#2a1010", padding: "4px" }}>
                <img src={FOTO.logo} alt={NOME} className="h-8 w-auto object-contain" style={{ display: "block" }} />
              </div>
              <span className="font-display text-lg font-bold text-white/70">Osteria il Bertoldo</span>
            </div>
            <div className="flex items-center gap-4 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
              <span>{INDIRIZZO}</span>
              <span>&middot;</span>
              <span>{TELEFONO}</span>
            </div>
          </div>
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.2)" }}>
            <span>P.IVA 04573830231 &middot; &copy; {new Date().getFullYear()} {NOME}</span>
            <span>
              Prenotazioni by <a href="https://getreservi.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" style={{ color: "#c4956a" }}>Reservi</a>
            </span>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-[56px] h-[56px] rounded-full flex items-center justify-center text-white shadow-2xl z-50 hover:scale-110 transition-transform"
        style={{ background: "#25D366", boxShadow: "0 8px 24px rgba(37,211,102,0.35)" }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </div>
  );
}
