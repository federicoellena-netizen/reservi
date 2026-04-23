import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offerta Reservi — Prenotazioni AI via WhatsApp",
  description: "Scopri come Reservi puo' aiutare il tuo ristorante a gestire le prenotazioni via WhatsApp con intelligenza artificiale.",
};

export default function OffertaPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#0a0a1a] to-[#0f1a2e] text-white py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <img src="/logo-reservi-dark.png" alt="Reservi" className="h-16 mx-auto mb-6 rounded-xl" />
          <p className="text-white/60 text-lg">Prenotazioni intelligenti via WhatsApp per il tuo ristorante</p>
          <div className="mt-6 inline-block bg-[#22c55e]/15 border border-[#22c55e]/30 text-[#4ade80] px-6 py-2 rounded-full text-sm font-semibold">
            Primo mese completamente gratuito
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Il problema */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 pb-3 border-b-2 border-[#22c55e]">Il problema che risolviamo</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "WhatsApp senza risposta", desc: "I clienti scrivono ma nessuno risponde subito — soprattutto durante il servizio, la sera e nel weekend." },
              { title: "Prenotazioni perse", desc: "Ogni messaggio WhatsApp non risposto in tempo e' un cliente che va da un altro. E sono il 70% delle prenotazioni." },
              { title: "Gestione manuale", desc: "Agenda cartacea, foglietti, messaggi sparsi. Rischio di doppie prenotazioni e confusione." },
              { title: "Nessuna presenza online", desc: "Chi ti cerca su Google non trova un sito professionale con un modo facile per prenotare." },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cosa include */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 pb-3 border-b-2 border-[#22c55e]">Cosa include Reservi</h2>
          <div className="space-y-4">
            {[
              { num: "1", title: "Assistente WhatsApp AI 24/7", desc: "Risponde ai tuoi clienti in 10 secondi, prende prenotazioni, risponde a domande su orari, menu, posizione." },
              { num: "2", title: "Dashboard professionale", desc: "Vedi le prenotazioni del giorno, aggiungi walk-in, gestisci turni e coperti. Dal telefono." },
              { num: "3", title: "Report e insight", desc: "Coperti al giorno, giorno piu' forte, tasso no-show, andamento mensile. Dati concreti per migliorare." },
              { num: "4", title: "Reminder automatici", desc: "Il cliente riceve un promemoria WhatsApp prima della prenotazione. I no-show calano del 40-50%." },
              { num: "5", title: "Sito web con dominio tuo", desc: "www.tuoristorante.it — design professionale, mappa, orari, pulsante prenota su WhatsApp." },
              { num: "6", title: "Menu digitale QR Code", desc: "Un QR code sul tavolo — il cliente scansiona e vede il menu dal telefono. Moderno e aggiornabile." },
            ].map((item) => (
              <div key={item.num} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-[#22c55e] text-white flex items-center justify-center font-bold text-sm shrink-0">{item.num}</div>
                <div>
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Esempio sito web */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 pb-3 border-b-2 border-[#22c55e]">Esempio: il sito del tuo ristorante</h2>
          <p className="text-gray-500 mb-6">Ecco come potrebbe apparire il tuo sito web, realizzato da noi e incluso nel piano Professional:</p>

          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
            <div className="bg-gray-100 px-4 py-2 flex items-center gap-2 border-b border-gray-200">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span className="text-xs text-gray-400 ml-2">www.ristorantedamario.it</span>
            </div>
            <div className="bg-[#faf8f5] p-8 text-center">
              <div className="text-xs text-gray-400 mb-1">Ristorante · €€</div>
              <h3 className="text-2xl font-serif font-bold mb-2">Ristorante Da Mario</h3>
              <p className="text-gray-500 text-sm mb-6">Cucina tradizionale italiana dal 1985</p>
              <div className="flex gap-3 justify-center mb-6">
                {["Pasta fresca", "Pesce del giorno", "Dolci artigianali"].map((s) => (
                  <span key={s} className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-xs text-gray-600">{s}</span>
                ))}
              </div>
              <div className="inline-block bg-[#22c55e] text-white px-6 py-3 rounded-xl font-semibold text-sm">Prenota su WhatsApp</div>
              <div className="mt-4 text-xs text-gray-400">Orari · Mappa · Contatti · Menu</div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <a href="https://getreservi.com/s/ristorante-da-mario" target="_blank" rel="noopener noreferrer" className="text-[#22c55e] font-semibold text-sm hover:underline">
              Vedi il sito demo completo →
            </a>
          </div>
        </section>

        {/* Confronto competitor */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 pb-3 border-b-2 border-[#22c55e]">Perche' Reservi e' diverso</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 pr-4 font-semibold">Funzione</th>
                  <th className="text-center py-3 px-3 font-semibold text-gray-400">TheFork</th>
                  <th className="text-center py-3 px-3 font-semibold text-gray-400">Plateform</th>
                  <th className="text-center py-3 px-3 font-semibold text-[#22c55e]">Reservi</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b border-gray-100"><td className="py-2.5">AI risponde su WhatsApp</td><td className="text-center text-red-400">✗</td><td className="text-center text-red-400">✗</td><td className="text-center text-[#22c55e] font-bold">✓</td></tr>
                <tr className="border-b border-gray-100"><td className="py-2.5">Prende prenotazioni via WhatsApp</td><td className="text-center text-red-400">✗</td><td className="text-center text-red-400">✗</td><td className="text-center text-[#22c55e] font-bold">✓</td></tr>
                <tr className="border-b border-gray-100"><td className="py-2.5">Sito web + dominio incluso</td><td className="text-center text-red-400">✗</td><td className="text-center text-red-400">✗</td><td className="text-center text-[#22c55e] font-bold">✓</td></tr>
                <tr className="border-b border-gray-100"><td className="py-2.5">Dashboard gestione</td><td className="text-center text-gray-400">✓</td><td className="text-center text-gray-400">✓</td><td className="text-center text-[#22c55e] font-bold">✓</td></tr>
                <tr className="border-b border-gray-100"><td className="py-2.5">Reminder WhatsApp</td><td className="text-center text-red-400">✗</td><td className="text-center text-gray-400">Solo notifica</td><td className="text-center text-[#22c55e] font-bold">✓</td></tr>
                <tr className="border-b border-gray-100"><td className="py-2.5">Commissioni per coperto</td><td className="text-center text-red-400 font-semibold">2-4€</td><td className="text-center">No</td><td className="text-center text-[#22c55e] font-bold">Mai</td></tr>
                <tr><td className="py-2.5">Costo setup</td><td className="text-center text-red-400">~300€</td><td className="text-center text-red-400">149€</td><td className="text-center text-[#22c55e] font-bold">0€</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Prezzi */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-2 pb-3 border-b-2 border-[#22c55e]">Primo mese gratis. Poi prezzi semplici.</h2>
          <p className="text-gray-500 text-sm mb-6">Zero setup. Zero commissioni. Disdici quando vuoi.</p>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { name: "Starter", price: "49", desc: "WhatsApp AI + Dashboard", features: ["AI WhatsApp 24/7", "Dashboard completa", "Report base", "Link Google"] },
              { name: "Professional", price: "69", desc: "Tutto + Sito web + Dominio", badge: true, features: ["Tutto di Starter +", "Sito web professionale", "Dominio personalizzato", "Report AI + Insight", "Reminder automatici"] },
              { name: "Premium", price: "99", desc: "Per chi vuole il massimo", features: ["Tutto di Professional +", "SEO avanzato", "Supporto prioritario", "Formazione staff"] },
            ].map((plan) => (
              <div key={plan.name} className={`rounded-2xl p-5 text-center border ${plan.badge ? "border-[#22c55e] bg-[#f0fdf4]" : "border-gray-200"} relative`}>
                {plan.badge && <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#22c55e] text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase">Consigliato</div>}
                <h4 className="font-semibold mb-1">{plan.name}</h4>
                <div className="text-3xl font-bold text-[#22c55e]">{plan.price}€<span className="text-sm font-normal text-gray-400">/mese</span></div>
                <div className="text-xs text-gray-500 mt-1 mb-4">{plan.desc}</div>
                <ul className="text-left space-y-1.5">
                  {plan.features.map((f) => (
                    <li key={f} className="text-xs text-gray-600 flex items-center gap-2">
                      <span className="text-[#22c55e] font-bold">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-gradient-to-br from-[#f0fdf4] to-[#eff6ff] rounded-3xl p-12 mb-16">
          <h2 className="text-2xl font-bold mb-3">Pronto a non perdere piu' prenotazioni?</h2>
          <p className="text-gray-500 mb-8">Primo mese gratis. Setup in 10 minuti. Zero rischio.</p>
          <a
            href="https://wa.me/393407024769?text=Ciao!%20Vorrei%20provare%20Reservi%20per%20il%20mio%20ristorante"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#22c55e] text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg"
          >
            Scrivici su WhatsApp
          </a>
          <p className="text-xs text-gray-400 mt-4">Oppure scrivi a info@getreservi.com</p>
        </section>

        {/* Il nostro sito */}
        <section className="text-center mb-8">
          <p className="text-sm text-gray-400">
            Scopri di piu' su <a href="https://getreservi.com" target="_blank" rel="noopener noreferrer" className="text-[#22c55e] font-semibold hover:underline">getreservi.com</a>
          </p>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8 px-6 text-center">
        <img src="/logo-reservi-dark.png" alt="Reservi" className="h-10 mx-auto mb-3 rounded-lg" />
        <p className="text-xs text-gray-400 mt-1">Prenotazioni intelligenti via WhatsApp</p>
      </footer>
    </div>
  );
}
