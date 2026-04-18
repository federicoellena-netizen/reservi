"use client";

import { useState, useEffect } from "react";
import { Plus, Users, Phone, MessageSquare, X, Check, AlertTriangle, UserPlus, Minus, Clock } from "lucide-react";
import { getTurni, getPrenotazioniOggi, inserisciPrenotazione, type TurnoDB, type PrenotazioneDB } from "@/lib/data";

// Colori per i turni (assegnati in ordine)
const COLORI = [
  { colore: "text-amber-400", coloreBg: "bg-amber-400" },
  { colore: "text-orange-400", coloreBg: "bg-orange-400" },
  { colore: "text-blue-400", coloreBg: "bg-blue-400" },
  { colore: "text-indigo-400", coloreBg: "bg-indigo-400" },
  { colore: "text-emerald-400", coloreBg: "bg-emerald-400" },
  { colore: "text-pink-400", coloreBg: "bg-pink-400" },
];

const statoConfig = {
  confermata: { label: "Confermata", dot: "bg-[#22c55e]", text: "text-[#22c55e]", bg: "bg-[#22c55e]/10" },
  in_attesa: { label: "In attesa", dot: "bg-amber-400", text: "text-amber-400", bg: "bg-amber-400/10" },
  disdetta: { label: "Disdetta", dot: "bg-red-400", text: "text-red-400", bg: "bg-red-400/10" },
  completata: { label: "Completata", dot: "bg-blue-400", text: "text-blue-400", bg: "bg-blue-400/10" },
  no_show: { label: "No show", dot: "bg-gray-400", text: "text-gray-400", bg: "bg-gray-400/10" },
};

const fonteConfig = {
  whatsapp: { icon: <MessageSquare size={12} />, color: "text-[#16a34a]" },
  manuale: { icon: <Plus size={12} />, color: "text-blue-400" },
  telefono: { icon: <Phone size={12} />, color: "text-gray-400" },
};

export default function DashboardOggi() {
  const [turni, setTurni] = useState<TurnoDB[]>([]);
  const [prenotazioni, setPrenotazioni] = useState<PrenotazioneDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNuova, setShowNuova] = useState(false);
  const [showWalkin, setShowWalkin] = useState(false);
  const [walkinPersone, setWalkinPersone] = useState(2);
  const [nuovaForm, setNuovaForm] = useState({ nome_cliente: "", telefono_cliente: "", ora: "", turno_id: "", n_persone: 2, note: "" });

  const oggi = new Date();
  const oggiStr = oggi.toISOString().split("T")[0];
  const giornoSettimana = oggi.toLocaleDateString("it-IT", { weekday: "long" });
  const dataFormattata = oggi.toLocaleDateString("it-IT", { day: "numeric", month: "long" });

  useEffect(() => {
    async function load() {
      try {
        const [t, p] = await Promise.all([getTurni(), getPrenotazioniOggi()]);
        setTurni(t);
        setPrenotazioni(p);
      } catch (e) {
        console.error("Errore caricamento:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const attive = prenotazioni.filter((p) => p.stato === "confermata" || p.stato === "in_attesa");
  const disdette = prenotazioni.filter((p) => p.stato === "disdetta");
  const totalePersone = attive.reduce((s, p) => s + p.n_persone, 0);
  const totaleWhatsapp = attive.filter((p) => p.fonte === "whatsapp").length;

  function getCopertiTurno(turno: TurnoDB) {
    const prenTurno = prenotazioni.filter(
      (p) => p.turno_id === turno.id && (p.stato === "confermata" || p.stato === "in_attesa")
    );
    const occupati = prenTurno.reduce((s, p) => s + p.n_persone, 0);
    const rimasti = turno.coperti - occupati;
    return { occupati, rimasti, totale: turno.coperti, pieno: rimasti <= 0 };
  }

  const turniInfo = turni.map((t, i) => {
    const col = COLORI[i % COLORI.length];
    return {
      turno: t,
      ...col,
      ...getCopertiTurno(t),
      prenotazioni: attive.filter((p) => p.turno_id === t.id).sort((a, b) => a.ora.localeCompare(b.ora)),
    };
  });

  const primoTurnoLibero = turniInfo.find((t) => !t.pieno);

  const handleWalkin = async (turnoId: string) => {
    const turno = turni.find((t) => t.id === turnoId)!;
    try {
      const nuova = await inserisciPrenotazione({
        nome_cliente: "Walk-in",
        data: oggiStr,
        ora: turno.inizio,
        turno_id: turnoId,
        n_persone: walkinPersone,
        note: "Ingresso diretto",
        fonte: "manuale",
      });
      setPrenotazioni([...prenotazioni, nuova]);
    } catch (e) {
      console.error("Errore walk-in:", e);
    }
    setWalkinPersone(2);
    setShowWalkin(false);
  };

  const handleAggiungi = async () => {
    if (!nuovaForm.nome_cliente || !nuovaForm.ora || !nuovaForm.turno_id) return;
    try {
      const nuova = await inserisciPrenotazione({
        nome_cliente: nuovaForm.nome_cliente,
        telefono_cliente: nuovaForm.telefono_cliente,
        data: oggiStr,
        ora: nuovaForm.ora,
        turno_id: nuovaForm.turno_id,
        n_persone: nuovaForm.n_persone,
        note: nuovaForm.note,
        fonte: "manuale",
      });
      setPrenotazioni([...prenotazioni, nuova]);
    } catch (e) {
      console.error("Errore aggiunta:", e);
    }
    setNuovaForm({ nome_cliente: "", telefono_cliente: "", ora: "", turno_id: "", n_persone: 2, note: "" });
    setShowNuova(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-sub text-sm">Caricamento...</div>
      </div>
    );
  }

  if (turni.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <div className="text-4xl mb-4">🍽️</div>
        <h3 className="text-lg font-bold text-main mb-2">Benvenuto in Reservi!</h3>
        <p className="text-sub text-sm max-w-xs">Vai nelle <strong>Impostazioni</strong> per configurare i turni del tuo ristorante e inizia a ricevere prenotazioni.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sub text-sm capitalize">{giornoSettimana}</p>
          <h2 className="text-3xl font-bold text-main tracking-tight">{dataFormattata}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowWalkin(true)}
            className="card px-3.5 py-2.5 rounded-2xl flex items-center gap-2 text-sm font-semibold text-[#22c55e] hover:opacity-80 transition-opacity"
          >
            <UserPlus size={16} strokeWidth={2} />
            Walk-in
          </button>
          <button
            onClick={() => setShowNuova(true)}
            className="gradient-green text-black px-4 py-2.5 rounded-2xl flex items-center gap-2 text-sm font-semibold shadow-lg shadow-green-500/20 hover:opacity-90 transition-opacity"
          >
            <Plus size={16} strokeWidth={2.5} />
            Nuova
          </button>
        </div>
      </div>

      {/* Stats rapide */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card rounded-2xl p-3 text-center">
          <div className="text-2xl font-bold text-main">{attive.length}</div>
          <div className="text-[10px] text-dim mt-0.5">Prenotazioni</div>
        </div>
        <div className="card rounded-2xl p-3 text-center">
          <div className="text-2xl font-bold text-main">{totalePersone}</div>
          <div className="text-[10px] text-dim mt-0.5">Persone</div>
        </div>
        <div className="card rounded-2xl p-3 text-center">
          <div className="text-2xl font-bold text-[#16a34a]">{totaleWhatsapp}</div>
          <div className="text-[10px] text-dim mt-0.5">Via WhatsApp</div>
        </div>
      </div>

      {/* Cards turni */}
      <div className="grid grid-cols-2 gap-3">
        {turniInfo.map(({ turno, coloreBg, occupati, rimasti, totale, pieno }) => (
          <div key={turno.id} className="card rounded-2xl p-4 relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-20 h-20 rounded-full ${coloreBg} opacity-[0.06] blur-[30px]`} />
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{turno.icona}</span>
                <span className="text-xs text-sub font-medium">{turno.nome}</span>
              </div>
              <span className="text-[10px] text-dim">{turno.inizio}-{turno.fine}</span>
            </div>
            <div className="text-2xl font-bold text-main mb-1">
              {occupati}<span className="text-dim text-base">/{totale}</span>
            </div>
            <div className="w-full h-1.5 rounded-full overflow-hidden mb-2" style={{ background: "var(--bg-input)" }}>
              <div
                className={`h-full rounded-full transition-all ${pieno ? "bg-red-400" : rimasti <= 5 ? "bg-amber-400" : "bg-[#22c55e]"}`}
                style={{ width: `${Math.min((occupati / totale) * 100, 100)}%` }}
              />
            </div>
            {pieno ? (
              <span className="text-xs text-red-400 font-semibold">COMPLETO</span>
            ) : (
              <span className="text-xs text-[#22c55e]">{rimasti} posti liberi</span>
            )}
          </div>
        ))}
      </div>

      {/* Avvisi turni pieni */}
      {turniInfo.filter((t) => t.pieno).map(({ turno }) => (
        <div key={turno.id} className="card rounded-2xl p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-400/10 flex items-center justify-center flex-shrink-0">
            <AlertTriangle size={18} className="text-red-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-red-400">{turno.nome} completo ({turno.inizio}-{turno.fine})</p>
            <p className="text-xs text-dim">
              {primoTurnoLibero
                ? `L'assistente WhatsApp propone: ${primoTurnoLibero.turno.nome} (${primoTurnoLibero.turno.inizio}-${primoTurnoLibero.turno.fine}, ${primoTurnoLibero.rimasti} posti)`
                : "Tutti i turni sono pieni — l'assistente proporrà un altro giorno"}
            </p>
          </div>
        </div>
      ))}

      {/* Prenotazioni per turno */}
      {turniInfo.map(({ turno, colore, prenotazioni: prenTurno }) => {
        if (prenTurno.length === 0) return null;
        return (
          <div key={turno.id}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base">{turno.icona}</span>
              <h3 className={`text-sm font-semibold ${colore}`}>{turno.nome}</h3>
              <span className="text-xs text-dim">{turno.inizio} - {turno.fine}</span>
              <span className="text-xs text-dim ml-auto">{prenTurno.length} pren.</span>
            </div>
            <div className="space-y-2">
              {prenTurno.map((p) => (
                <PrenotazioneCard key={p.id} prenotazione={p} />
              ))}
            </div>
          </div>
        );
      })}

      {/* Prenotazioni senza turno assegnato */}
      {(() => {
        const senzaTurno = attive.filter(p => !p.turno_id || !turni.find(t => t.id === p.turno_id));
        if (senzaTurno.length === 0) return null;
        return (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock size={14} className="text-gray-400" />
              <h3 className="text-sm font-semibold text-sub">Senza turno</h3>
              <span className="text-xs text-dim ml-auto">{senzaTurno.length} pren.</span>
            </div>
            <div className="space-y-2">
              {senzaTurno.sort((a, b) => a.ora.localeCompare(b.ora)).map((p) => (
                <PrenotazioneCard key={p.id} prenotazione={p} />
              ))}
            </div>
          </div>
        );
      })()}

      {/* Disdette */}
      {disdette.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={14} className="text-red-400" />
            <h3 className="text-sm font-semibold text-sub">DISDETTE</h3>
          </div>
          <div className="space-y-2">
            {disdette.map((p) => (
              <PrenotazioneCard key={p.id} prenotazione={p} />
            ))}
          </div>
        </div>
      )}

      {/* Modale Nuova Prenotazione */}
      {showNuova && (
        <div className="fixed inset-0 flex items-end sm:items-center justify-center z-50 p-4" style={{ background: "var(--backdrop)", backdropFilter: "blur(8px)" }}>
          <div className="rounded-3xl w-full max-w-md p-6 shadow-2xl" style={{ background: "var(--modal-bg)", border: "1px solid var(--bg-card-border)" }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-main">Nuova Prenotazione</h3>
              <button onClick={() => setShowNuova(false)} className="text-dim hover:text-sub p-1"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-sub block mb-1.5">Nome *</label>
                <input type="text" placeholder="Es. Rossi" value={nuovaForm.nome_cliente}
                  onChange={(e) => setNuovaForm({ ...nuovaForm, nome_cliente: e.target.value })}
                  className="w-full input rounded-xl px-4 py-3 text-sm" />
              </div>
              <div>
                <label className="text-xs text-sub block mb-1.5">Telefono</label>
                <input type="tel" placeholder="+39 333 1234567" value={nuovaForm.telefono_cliente}
                  onChange={(e) => setNuovaForm({ ...nuovaForm, telefono_cliente: e.target.value })}
                  className="w-full input rounded-xl px-4 py-3 text-sm" />
              </div>
              {/* Selettore turno */}
              <div>
                <label className="text-xs text-sub block mb-1.5">Turno *</label>
                <div className="grid grid-cols-2 gap-2">
                  {turni.map((t) => {
                    const info = getCopertiTurno(t);
                    const selected = nuovaForm.turno_id === t.id;
                    return (
                      <button key={t.id} onClick={() => setNuovaForm({ ...nuovaForm, turno_id: t.id, ora: t.inizio })}
                        disabled={info.pieno}
                        className={`py-2.5 px-3 rounded-xl text-xs font-medium transition-all text-left disabled:opacity-20 disabled:cursor-not-allowed ${
                          selected ? "gradient-green text-black shadow-lg shadow-green-500/20" : "card text-sub hover:text-main"
                        }`}>
                        <div className="flex items-center gap-1.5">
                          <span>{t.icona}</span>
                          <span>{t.nome}</span>
                        </div>
                        <div className={`text-[10px] mt-0.5 ${selected ? "text-black/60" : "text-dim"}`}>
                          {t.inizio}-{t.fine} • {info.rimasti} posti
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-sub block mb-1.5">Ora *</label>
                  <input type="time" value={nuovaForm.ora}
                    onChange={(e) => setNuovaForm({ ...nuovaForm, ora: e.target.value })}
                    className="w-full input rounded-xl px-4 py-3 text-sm" />
                </div>
                <div>
                  <label className="text-xs text-sub block mb-1.5">Persone *</label>
                  <input type="number" min={1} max={20} value={nuovaForm.n_persone}
                    onChange={(e) => setNuovaForm({ ...nuovaForm, n_persone: parseInt(e.target.value) || 1 })}
                    className="w-full input rounded-xl px-4 py-3 text-sm" />
                </div>
              </div>
              <div>
                <label className="text-xs text-sub block mb-1.5">Note</label>
                <input type="text" placeholder="Allergie, tavolo esterno, compleanno..." value={nuovaForm.note}
                  onChange={(e) => setNuovaForm({ ...nuovaForm, note: e.target.value })}
                  className="w-full input rounded-xl px-4 py-3 text-sm" />
              </div>
              <button onClick={handleAggiungi}
                disabled={!nuovaForm.nome_cliente || !nuovaForm.ora || !nuovaForm.turno_id}
                className="w-full gradient-green text-black py-3.5 rounded-2xl font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 mt-2">
                <Check size={18} /> Conferma Prenotazione
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modale Walk-in */}
      {showWalkin && (
        <div className="fixed inset-0 flex items-end sm:items-center justify-center z-50 p-4" style={{ background: "var(--backdrop)", backdropFilter: "blur(8px)" }}>
          <div className="rounded-3xl w-full max-w-sm p-6 shadow-2xl" style={{ background: "var(--modal-bg)", border: "1px solid var(--bg-card-border)" }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#22c55e]/10 flex items-center justify-center">
                  <UserPlus size={20} className="text-[#22c55e]" />
                </div>
                <h3 className="text-lg font-bold text-main">Walk-in</h3>
              </div>
              <button onClick={() => setShowWalkin(false)} className="text-dim hover:text-sub p-1"><X size={20} /></button>
            </div>

            <div className="text-center mb-5">
              <p className="text-xs text-sub mb-3">Quante persone?</p>
              <div className="flex items-center justify-center gap-5">
                <button onClick={() => setWalkinPersone(Math.max(1, walkinPersone - 1))}
                  className="w-12 h-12 rounded-2xl card flex items-center justify-center text-sub hover:text-main transition-colors">
                  <Minus size={20} />
                </button>
                <span className="text-5xl font-bold text-main w-20 text-center">{walkinPersone}</span>
                <button onClick={() => setWalkinPersone(Math.min(20, walkinPersone + 1))}
                  className="w-12 h-12 rounded-2xl card flex items-center justify-center text-sub hover:text-main transition-colors">
                  <Plus size={20} />
                </button>
              </div>
            </div>

            <div className="flex justify-center gap-2 mb-5">
              {[1, 2, 3, 4, 5, 6, 8].map((n) => (
                <button key={n} onClick={() => setWalkinPersone(n)}
                  className={`w-9 h-9 rounded-xl text-xs font-semibold transition-all ${
                    walkinPersone === n ? "gradient-green text-black shadow-lg shadow-green-500/20" : "card text-sub hover:text-main"
                  }`}>{n}</button>
              ))}
            </div>

            <p className="text-xs text-sub mb-3 text-center">Seleziona il turno</p>
            <div className="grid grid-cols-2 gap-2">
              {turni.map((t) => {
                const info = getCopertiTurno(t);
                const col = COLORI[turni.indexOf(t) % COLORI.length];
                return (
                  <button key={t.id} onClick={() => handleWalkin(t.id)} disabled={info.pieno || info.rimasti < walkinPersone}
                    className={`py-3.5 rounded-2xl font-semibold text-sm transition-all flex flex-col items-center gap-1 disabled:opacity-20 disabled:cursor-not-allowed ${col.colore} border card hover:opacity-80`}>
                    <span className="text-lg">{t.icona}</span>
                    <span className="text-xs">{t.nome}</span>
                    <span className="text-[10px] text-dim">{t.inizio}-{t.fine}</span>
                    <span className={`text-[10px] ${info.pieno ? "text-red-400" : "text-[#22c55e]"}`}>
                      {info.pieno ? "Pieno" : `${info.rimasti} posti`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PrenotazioneCard({ prenotazione: p }: { prenotazione: PrenotazioneDB }) {
  const stato = statoConfig[p.stato];
  const fonte = fonteConfig[p.fonte];

  return (
    <div className={`card rounded-2xl p-4 transition-all ${p.stato === "disdetta" ? "opacity-40" : ""}`}>
      <div className="flex items-start gap-3">
        <div className="min-w-[48px]">
          <div className="text-lg font-bold text-main">{p.ora}</div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-main">{p.nome_cliente}</span>
            <span className={fonte.color}>{fonte.icon}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-sub mt-1">
            <span className="flex items-center gap-1"><Users size={11} /> {p.n_persone}</span>
            {p.telefono_cliente && (
              <a href={`tel:${p.telefono_cliente}`} className="flex items-center gap-1 hover:text-main transition-colors">
                <Phone size={11} /> {p.telefono_cliente}
              </a>
            )}
          </div>
          {p.note && (
            <div className="text-xs text-amber-400/80 mt-1.5 bg-amber-400/5 px-2.5 py-1 rounded-lg inline-block border border-amber-400/10">
              {p.note}
            </div>
          )}
        </div>
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold ${stato.bg} ${stato.text}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${stato.dot} ${p.stato === "in_attesa" ? "pulse-soft" : ""}`} />
          {stato.label}
        </div>
      </div>
    </div>
  );
}
