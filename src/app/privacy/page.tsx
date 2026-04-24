import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Reservi",
  description: "Informativa sulla privacy e il trattamento dei dati personali di Reservi",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-10">Ultimo aggiornamento: Aprile 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-sm leading-relaxed">

          <section>
            <h2 className="text-lg font-semibold mb-3">1. Titolare del trattamento</h2>
            <p>Il titolare del trattamento dei dati personali e Reservi, raggiungibile all&apos;indirizzo email <a href="mailto:info@getreservi.com" className="text-emerald-600">info@getreservi.com</a>.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">2. Dati raccolti</h2>
            <p>Raccogliamo i seguenti dati personali:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Dati di registrazione:</strong> nome, email, password (criptata)</li>
              <li><strong>Dati dell&apos;attivita:</strong> nome attivita, indirizzo, telefono, numero WhatsApp</li>
              <li><strong>Dati delle prenotazioni:</strong> nome cliente, telefono, data, ora, numero persone, note</li>
              <li><strong>Conversazioni WhatsApp:</strong> messaggi scambiati tra i clienti e l&apos;assistente AI per la gestione delle prenotazioni</li>
              <li><strong>Dati di pagamento:</strong> gestiti interamente da Stripe, non memorizziamo dati di carte di credito</li>
              <li><strong>Dati di navigazione:</strong> indirizzo IP, tipo di browser, pagine visitate</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">3. Finalita del trattamento</h2>
            <p>I dati personali sono trattati per le seguenti finalita:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Erogazione del servizio di prenotazione via WhatsApp</li>
              <li>Gestione dell&apos;account e della dashboard</li>
              <li>Invio di conferme, reminder e comunicazioni relative alle prenotazioni</li>
              <li>Elaborazione dei pagamenti tramite Stripe</li>
              <li>Generazione di report e statistiche per l&apos;attivita</li>
              <li>Miglioramento del servizio e dell&apos;assistente AI</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">4. Base giuridica</h2>
            <p>Il trattamento dei dati si basa su:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Esecuzione del contratto:</strong> per fornire il servizio richiesto</li>
              <li><strong>Consenso:</strong> per l&apos;invio di comunicazioni promozionali</li>
              <li><strong>Legittimo interesse:</strong> per il miglioramento del servizio e la prevenzione di abusi</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">5. Conservazione dei dati</h2>
            <p>I dati personali sono conservati per il tempo necessario alle finalita per cui sono stati raccolti:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Dati account:</strong> fino alla cancellazione dell&apos;account</li>
              <li><strong>Dati prenotazioni:</strong> 24 mesi dalla data della prenotazione</li>
              <li><strong>Conversazioni WhatsApp:</strong> 2 ore dalla conclusione della conversazione (reset automatico)</li>
              <li><strong>Dati di fatturazione:</strong> 10 anni come richiesto dalla normativa fiscale</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">6. Condivisione dei dati</h2>
            <p>I dati possono essere condivisi con i seguenti soggetti terzi:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Supabase</strong> (database, server nell&apos;Unione Europea)</li>
              <li><strong>Vercel</strong> (hosting)</li>
              <li><strong>Stripe</strong> (pagamenti)</li>
              <li><strong>Anthropic</strong> (Claude AI, per l&apos;elaborazione delle conversazioni)</li>
              <li><strong>Meta / WhatsApp</strong> (messaggistica)</li>
            </ul>
            <p className="mt-2">Non vendiamo ne cediamo i dati personali a terzi per finalita di marketing.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">7. Diritti dell&apos;interessato</h2>
            <p>In conformita al GDPR (Regolamento UE 2016/679), hai il diritto di:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Accesso:</strong> ottenere copia dei tuoi dati personali</li>
              <li><strong>Rettifica:</strong> correggere dati inesatti o incompleti</li>
              <li><strong>Cancellazione:</strong> richiedere la cancellazione dei tuoi dati</li>
              <li><strong>Portabilita:</strong> ricevere i tuoi dati in formato strutturato</li>
              <li><strong>Opposizione:</strong> opporti al trattamento dei tuoi dati</li>
              <li><strong>Limitazione:</strong> limitare il trattamento in determinati casi</li>
            </ul>
            <p className="mt-2">Per esercitare i tuoi diritti, scrivi a <a href="mailto:info@getreservi.com" className="text-emerald-600">info@getreservi.com</a>. Risponderemo entro 30 giorni.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">8. Cookie</h2>
            <p>Il sito utilizza cookie tecnici necessari al funzionamento del servizio (autenticazione, preferenze). Non utilizziamo cookie di profilazione o di terze parti per finalita pubblicitarie.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">9. Sicurezza</h2>
            <p>Adottiamo misure di sicurezza tecniche e organizzative per proteggere i dati personali, tra cui: crittografia delle password, connessioni HTTPS, accesso limitato ai dati, backup regolari.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">10. Modifiche alla policy</h2>
            <p>Ci riserviamo il diritto di aggiornare questa Privacy Policy. Le modifiche saranno pubblicate su questa pagina con la data di aggiornamento.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">11. Contatti</h2>
            <p>Per qualsiasi domanda relativa alla privacy, contattaci:</p>
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
