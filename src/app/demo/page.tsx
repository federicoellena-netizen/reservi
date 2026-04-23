import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo Dashboard — Reservi",
  description: "Vedi come funziona la dashboard Reservi con dati di esempio",
};

const prenotazioni = [
  { ora: "12:30", nome: "Rossi", persone: 4, fonte: "whatsapp", stato: "confermata", note: "" },
  { ora: "13:00", nome: "Bianchi", persone: 2, fonte: "whatsapp", stato: "confermata", note: "Tavolo esterno" },
  { ora: "13:15", nome: "Esposito", persone: 6, fonte: "manuale", stato: "confermata", note: "Compleanno" },
  { ora: "20:00", nome: "Russo", persone: 3, fonte: "whatsapp", stato: "confermata", note: "" },
  { ora: "20:30", nome: "Ferrari", persone: 2, fonte: "whatsapp", stato: "confermata", note: "Allergia glutine" },
  { ora: "21:00", nome: "Romano", persone: 5, fonte: "manuale", stato: "confermata", note: "" },
  { ora: "21:00", nome: "Colombo", persone: 4, fonte: "whatsapp", stato: "confermata", note: "" },
  { ora: "21:30", nome: "Ricci", persone: 2, fonte: "whatsapp", stato: "in_attesa", note: "" },
];

export default function DemoPage() {
  const oggi = new Date().toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" });
  const prenPranzo = prenotazioni.filter(p => p.ora < "16:00");
  const prenCena = prenotazioni.filter(p => p.ora >= "16:00");
  const totPersone = prenotazioni.reduce((s, p) => s + p.persone, 0);
  const totWhatsapp = prenotazioni.filter(p => p.fonte === "whatsapp").length;
  const copertiPranzo = prenPranzo.reduce((s, p) => s + p.persone, 0);
  const copertiCena = prenCena.reduce((s, p) => s + p.persone, 0);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">

      {/* BANNER DEMO */}
      <div className="bg-[#22c55e] text-black text-center py-2.5 text-sm font-semibold">
        Questa e' una demo interattiva — i dati sono di esempio
      </div>

      {/* HEADER */}
      <div className="max-w-2xl mx-auto px-5 pt-8 pb-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2.5">
            <img src="/logo-reservi-dark.png" alt="Reservi" className="h-8 rounded-lg" />
          </div>
          <span className="text-xs text-gray-500">Ristorante Da Mario</span>
        </div>

        {/* INTRO SPIEGAZIONE */}
        <div className="rounded-2xl p-5 mb-6 bg-[#22c55e]/5 border border-[#22c55e]/20">
          <h2 className="text-lg font-bold mb-2">Come funziona la tua dashboard</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Questa e' la schermata che vedrai ogni giorno sul tuo telefono. Qui trovi tutte le prenotazioni del giorno,
            divise per turno, con il numero di coperti occupati. Puoi aggiungere prenotazioni manuali,
            segnare i walk-in, e gestire i no-show — tutto in un tap.
          </p>
        </div>

        {/* DATA */}
        <div className="flex items-end justify-between mb-5">
          <div>
            <p className="text-gray-500 text-sm capitalize">{oggi}</p>
            <h1 className="text-3xl font-bold tracking-tight">Oggi</h1>
          </div>
          <div className="flex gap-2">
            <div className="bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl text-sm font-medium text-[#22c55e]">Walk-in</div>
            <div className="bg-[#22c55e] px-4 py-2 rounded-xl text-sm font-medium text-black">+ Nuova</div>
          </div>
        </div>

        {/* GUIDA: STATS */}
        <div className="rounded-xl p-3 mb-2 bg-blue-500/5 border border-blue-500/20">
          <p className="text-xs text-blue-400">
            <span className="font-bold">Statistiche rapide</span> — vedi subito quante prenotazioni hai, quante persone aspetti e quante sono arrivate via WhatsApp.
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-3.5 text-center">
            <div className="text-2xl font-bold">{prenotazioni.length}</div>
            <div className="text-[10px] text-gray-600 mt-0.5 uppercase tracking-wider">Prenotazioni</div>
          </div>
          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-3.5 text-center">
            <div className="text-2xl font-bold">{totPersone}</div>
            <div className="text-[10px] text-gray-600 mt-0.5 uppercase tracking-wider">Persone</div>
          </div>
          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-3.5 text-center">
            <div className="text-2xl font-bold text-[#22c55e]">{totWhatsapp}</div>
            <div className="text-[10px] text-gray-600 mt-0.5 uppercase tracking-wider">WhatsApp</div>
          </div>
        </div>

        {/* GUIDA: TURNI */}
        <div className="rounded-xl p-3 mb-2 bg-blue-500/5 border border-blue-500/20">
          <p className="text-xs text-blue-400">
            <span className="font-bold">Coperti per turno</span> — ogni card mostra quanti posti sono occupati e quanti restano liberi. La barra si riempie man mano che arrivano prenotazioni.
          </p>
        </div>

        {/* TURNI CARDS */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
              </div>
              <div>
                <span className="text-xs font-semibold block leading-tight">Pranzo</span>
                <span className="text-[10px] text-gray-600">12:30–15:00</span>
              </div>
            </div>
            <div className="text-2xl font-bold mb-1.5">{copertiPranzo}<span className="text-gray-600 text-sm font-normal">/30</span></div>
            <div className="w-full h-1 rounded-full bg-white/5 mb-2">
              <div className="h-full rounded-full bg-amber-500" style={{ width: `${(copertiPranzo / 30) * 100}%` }} />
            </div>
            <span className="text-[11px] text-amber-500 font-medium">{30 - copertiPranzo} posti liberi</span>
          </div>

          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
              </div>
              <div>
                <span className="text-xs font-semibold block leading-tight">Cena</span>
                <span className="text-[10px] text-gray-600">19:30–23:00</span>
              </div>
            </div>
            <div className="text-2xl font-bold mb-1.5">{copertiCena}<span className="text-gray-600 text-sm font-normal">/40</span></div>
            <div className="w-full h-1 rounded-full bg-white/5 mb-2">
              <div className="h-full rounded-full bg-orange-500" style={{ width: `${(copertiCena / 40) * 100}%` }} />
            </div>
            <span className="text-[11px] text-orange-500 font-medium">{40 - copertiCena} posti liberi</span>
          </div>
        </div>

        {/* GUIDA: PRENOTAZIONI */}
        <div className="rounded-xl p-3 mb-2 bg-blue-500/5 border border-blue-500/20">
          <p className="text-xs text-blue-400">
            <span className="font-bold">Lista prenotazioni</span> — ogni prenotazione mostra ora, nome, numero persone e da dove e' arrivata (WhatsApp o manuale).
            Puoi segnare "Uscito" quando il tavolo se ne va, o "No show" se non si presenta. Le note speciali (allergie, compleanni) sono evidenziate in giallo.
          </p>
        </div>

        {/* PRANZO */}
        <div className="mb-6">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-6 h-6 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            </div>
            <h3 className="text-sm font-semibold text-amber-500">Pranzo</h3>
            <span className="text-xs text-gray-600">12:30–15:00</span>
            <span className="text-xs text-gray-600 ml-auto">{prenPranzo.length}</span>
          </div>
          <div className="space-y-2">
            {prenPranzo.map((p, i) => (
              <PrenotazioneDemo key={i} {...p} />
            ))}
          </div>
        </div>

        {/* CENA */}
        <div className="mb-6">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-6 h-6 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
            </div>
            <h3 className="text-sm font-semibold text-orange-500">Cena</h3>
            <span className="text-xs text-gray-600">19:30–23:00</span>
            <span className="text-xs text-gray-600 ml-auto">{prenCena.length}</span>
          </div>
          <div className="space-y-2">
            {prenCena.map((p, i) => (
              <PrenotazioneDemo key={i} {...p} />
            ))}
          </div>
        </div>

        {/* GUIDA: FUNZIONI EXTRA */}
        <div className="rounded-2xl p-5 mb-6 bg-white/[0.03] border border-white/5">
          <h3 className="font-bold text-sm mb-4">Cosa puoi fare dalla dashboard</h3>
          <div className="space-y-4">
            {[
              { titolo: "Aggiungere una prenotazione manuale", desc: "Premi '+ Nuova' e inserisci nome, turno, ora e persone. Per le prenotazioni telefoniche o di persona." },
              { titolo: "Walk-in rapido", desc: "Arriva un cliente senza prenotazione? Premi 'Walk-in', scegli il numero di persone e il turno. Aggiunto in 2 secondi." },
              { titolo: "Segnare 'Uscito'", desc: "Quando il tavolo finisce e se ne va, premi 'Uscito'. I coperti si liberano e l'assistente WhatsApp lo sa." },
              { titolo: "Segnare 'No show'", desc: "Se qualcuno non si presenta, premi il pulsante rosso. Il sistema tiene traccia dei no-show nelle statistiche." },
              { titolo: "Vedere i report", desc: "Nella sezione Report vedi coperti al giorno, giorno piu' forte, tasso no-show, andamento mensile. Dati concreti per migliorare." },
              { titolo: "Modificare turni e coperti", desc: "Nelle Impostazioni puoi cambiare orari, aggiungere turni, modificare il numero di coperti in qualsiasi momento." },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-[#22c55e]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[#22c55e] text-xs font-bold">{i + 1}</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold">{item.titolo}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GUIDA: WHATSAPP */}
        <div className="rounded-2xl p-5 mb-6 bg-white/[0.03] border border-white/5">
          <h3 className="font-bold text-sm mb-4">Come funziona l'assistente WhatsApp</h3>
          <div className="space-y-3">
            <div className="rounded-xl p-4 bg-[#22c55e]/5 border border-[#22c55e]/10">
              <p className="text-xs text-gray-500 mb-2">Il cliente scrive:</p>
              <p className="text-sm bg-[#22c55e] text-black rounded-2xl rounded-br-md px-4 py-2.5 inline-block">"Ciao, vorrei prenotare per sabato sera, siamo in 4"</p>
            </div>
            <div className="rounded-xl p-4 bg-white/[0.02]">
              <p className="text-xs text-gray-500 mb-2">L'assistente risponde in 10 secondi:</p>
              <p className="text-sm bg-white/5 rounded-2xl rounded-bl-md px-4 py-2.5 inline-block">"Buonasera! A che nome la prenotazione?"</p>
            </div>
            <div className="rounded-xl p-4 bg-[#22c55e]/5 border border-[#22c55e]/10">
              <p className="text-sm bg-[#22c55e] text-black rounded-2xl rounded-br-md px-4 py-2.5 inline-block">"Rossi"</p>
            </div>
            <div className="rounded-xl p-4 bg-white/[0.02]">
              <p className="text-sm bg-white/5 rounded-2xl rounded-bl-md px-4 py-2.5 inline-block">"Prenotazione confermata! Rossi, sabato ore 20:00, 4 persone. A presto!"</p>
            </div>
            <p className="text-xs text-gray-600 text-center mt-2">La prenotazione appare automaticamente nella dashboard.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl p-8 text-center bg-[#22c55e]/5 border border-[#22c55e]/20 mb-8">
          <h3 className="text-xl font-bold mb-2">Prova Reservi gratis per 30 giorni</h3>
          <p className="text-sm text-gray-500 mb-6">Setup in 10 minuti. Nessun costo. Disdici quando vuoi.</p>
          <a
            href="https://wa.me/393407024769?text=Ciao!%20Vorrei%20provare%20Reservi%20per%20il%20mio%20ristorante"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#22c55e] text-black px-8 py-3.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Scrivici su WhatsApp
          </a>
        </div>

        {/* NAV DEMO */}
        <div className="rounded-2xl p-1 bg-white/[0.03] border border-white/5 mb-8">
          <div className="grid grid-cols-5 gap-1">
            {[
              { label: "Oggi", active: true },
              { label: "Calendario", active: false },
              { label: "Report", active: false },
              { label: "Piano", active: false },
              { label: "Impostazioni", active: false },
            ].map((item) => (
              <div key={item.label} className={`py-2.5 rounded-xl text-center text-[11px] font-medium ${item.active ? "bg-[#22c55e]/10 text-[#22c55e]" : "text-gray-600"}`}>
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div className="text-center py-6 border-t border-white/5">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img src="/logo-reservi-dark.png" alt="Reservi" className="h-7 rounded-md" />
          </div>
          <p className="text-xs text-gray-600">Prenotazioni intelligenti via WhatsApp</p>
          <a href="https://getreservi.com" className="text-xs text-[#22c55e] mt-2 inline-block hover:underline">getreservi.com</a>
        </div>
      </div>
    </div>
  );
}

function PrenotazioneDemo({ ora, nome, persone, fonte, stato, note }: {
  ora: string; nome: string; persone: number; fonte: string; stato: string; note: string;
}) {
  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4">
      <div className="flex items-start gap-3">
        <div className="min-w-[44px]">
          <div className="text-base font-bold">{ora}</div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">{nome}</span>
            {fonte === "whatsapp" && <span className="text-[#22c55e] text-[10px]">WhatsApp</span>}
            {fonte === "manuale" && <span className="text-blue-400 text-[10px]">Manuale</span>}
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
            <span>{persone} persone</span>
          </div>
          {note && (
            <div className="text-[11px] text-amber-500/80 mt-1.5 bg-amber-500/5 px-2 py-0.5 rounded-md inline-block">{note}</div>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium ${stato === "confermata" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${stato === "confermata" ? "bg-emerald-500" : "bg-amber-500"}`} />
            {stato === "confermata" ? "Confermata" : "In attesa"}
          </div>
          <div className="flex items-center gap-1">
            <span className="px-2 py-1 rounded-lg text-[10px] font-medium bg-emerald-500/10 text-emerald-500">Uscito</span>
            <span className="px-1.5 py-1 rounded-lg text-[10px] font-medium bg-red-500/10 text-red-400">No show</span>
          </div>
        </div>
      </div>
    </div>
  );
}
