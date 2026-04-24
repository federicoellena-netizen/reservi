import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termini di Servizio — Reservi",
  description: "Termini e condizioni di utilizzo del servizio Reservi",
};

export default function TerminiPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Termini di Servizio</h1>
        <p className="text-sm text-gray-500 mb-10">Ultimo aggiornamento: Aprile 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-sm leading-relaxed">

          <section>
            <h2 className="text-lg font-semibold mb-3">1. Descrizione del servizio</h2>
            <p>Reservi e un servizio SaaS (Software as a Service) che offre alle attivita commerciali (ristoranti, saloni, studi professionali) un sistema di prenotazione automatizzato via WhatsApp tramite intelligenza artificiale, una dashboard di gestione, e opzionalmente un sito web con dominio personalizzato.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">2. Registrazione e account</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Per utilizzare Reservi e necessario creare un account con un indirizzo email valido.</li>
              <li>L&apos;utente e responsabile della sicurezza delle proprie credenziali.</li>
              <li>Ogni account e associato a una singola attivita commerciale.</li>
              <li>L&apos;utente garantisce che le informazioni fornite sono veritiere e aggiornate.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">3. Piani e prezzi</h2>
            <p>Reservi offre tre piani di abbonamento:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Starter</strong> — 49 euro/mese: assistente WhatsApp AI, dashboard, report</li>
              <li><strong>Professional</strong> — 69 euro/mese: tutto di Starter + sito web con dominio personalizzato, report AI, reminder automatici</li>
              <li><strong>Premium</strong> — 99 euro/mese: tutto di Professional + SEO avanzato, supporto prioritario, formazione staff</li>
            </ul>
            <p className="mt-2">Tutti i piani includono un primo mese gratuito. I prezzi sono IVA esclusa dove applicabile. Ci riserviamo il diritto di modificare i prezzi con un preavviso di 30 giorni.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">4. Periodo di prova gratuito</h2>
            <p>Ogni nuovo cliente ha diritto a un mese di prova gratuito. Al termine del periodo di prova, l&apos;abbonamento si rinnova automaticamente al piano selezionato, salvo disdetta prima della scadenza.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">5. Pagamenti e fatturazione</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>I pagamenti sono gestiti tramite Stripe, piattaforma di pagamento certificata PCI-DSS.</li>
              <li>L&apos;abbonamento ha cadenza mensile e si rinnova automaticamente.</li>
              <li>In caso di mancato pagamento, il servizio viene sospeso dopo 7 giorni dalla scadenza.</li>
              <li>Non sono previsti rimborsi per periodi parziali di utilizzo.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">6. Disdetta</h2>
            <p>L&apos;utente puo disdire l&apos;abbonamento in qualsiasi momento tramite la dashboard (sezione Piano) o scrivendo a <a href="mailto:info@getreservi.com" className="text-emerald-600">info@getreservi.com</a>. La disdetta ha effetto alla fine del periodo di fatturazione corrente. Non sono previsti vincoli contrattuali ne penali di uscita.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">7. Sito web e dominio</h2>
            <p>Per i piani Professional e Premium, Reservi realizza un sito web con dominio personalizzato. Il dominio e registrato e gestito da Reservi per conto del cliente. In caso di disdetta:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Il sito web viene disattivato alla scadenza dell&apos;abbonamento.</li>
              <li>Il dominio puo essere trasferito al cliente su richiesta, previo pagamento dei costi di registrazione residui.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">8. Assistente AI e WhatsApp</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>L&apos;assistente AI gestisce le conversazioni WhatsApp in modo automatico basandosi sulle informazioni configurate dall&apos;utente.</li>
              <li>Reservi non garantisce che le risposte dell&apos;AI siano sempre accurate al 100%. L&apos;utente e responsabile della verifica delle prenotazioni nella dashboard.</li>
              <li>L&apos;utente puo modificare o cancellare qualsiasi prenotazione dalla dashboard.</li>
              <li>Le conversazioni WhatsApp vengono processate da Claude (Anthropic) per generare le risposte.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">9. Limitazione di responsabilita</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Reservi si impegna a fornire un servizio affidabile e disponibile, ma non garantisce un uptime del 100%.</li>
              <li>Reservi non e responsabile per prenotazioni perse a causa di malfunzionamenti di servizi terzi (WhatsApp, Twilio, Meta).</li>
              <li>Reservi non e responsabile per danni indiretti, perdita di profitto o mancato guadagno derivanti dall&apos;uso del servizio.</li>
              <li>La responsabilita massima di Reservi e limitata all&apos;importo pagato dall&apos;utente negli ultimi 3 mesi.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">10. Uso accettabile</h2>
            <p>L&apos;utente si impegna a:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Non utilizzare il servizio per attivita illegali o fraudolente</li>
              <li>Non inviare spam o messaggi non richiesti tramite l&apos;assistente WhatsApp</li>
              <li>Non tentare di accedere a dati di altri utenti</li>
              <li>Non sovraccaricare intenzionalmente i sistemi di Reservi</li>
            </ul>
            <p className="mt-2">La violazione di queste condizioni puo comportare la sospensione immediata dell&apos;account.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">11. Proprieta intellettuale</h2>
            <p>Il software, il design, il codice e i contenuti di Reservi sono di proprieta esclusiva di Reservi. L&apos;utente ottiene una licenza d&apos;uso non esclusiva e non trasferibile per la durata dell&apos;abbonamento. I dati inseriti dall&apos;utente (prenotazioni, informazioni attivita) restano di proprieta dell&apos;utente.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">12. Modifiche ai termini</h2>
            <p>Ci riserviamo il diritto di modificare questi Termini di Servizio. Le modifiche saranno comunicate via email con almeno 15 giorni di preavviso. L&apos;uso continuato del servizio dopo la modifica costituisce accettazione dei nuovi termini.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">13. Legge applicabile</h2>
            <p>I presenti Termini di Servizio sono regolati dalla legge italiana. Per qualsiasi controversia sara competente il Foro del luogo di residenza del consumatore, ai sensi del Codice del Consumo.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">14. Contatti</h2>
            <p>Per domande sui Termini di Servizio:</p>
            <p className="mt-2"><strong>Email:</strong> <a href="mailto:info@getreservi.com" className="text-emerald-600">info@getreservi.com</a><br /><strong>Sito:</strong> <a href="https://getreservi.com" className="text-emerald-600">getreservi.com</a></p>
          </section>

        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 text-center text-xs text-gray-400">
          <a href="https://getreservi.com" className="text-emerald-600 hover:underline">Reservi</a> — Prenotazioni intelligenti via WhatsApp
        </div>
      </div>
    </div>
  );
}
