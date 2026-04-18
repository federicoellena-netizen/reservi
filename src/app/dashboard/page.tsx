"use client";

import { useState, useEffect } from "react";
import { Plus, Users, Phone, MessageSquare, X, Check, AlertTriangle, UserPlus, Minus, Clock, LogOut } from "lucide-react";
import { getTurni, getPrenotazioniOggi, inserisciPrenotazione, aggiornaStatoPrenotazione, type TurnoDB, type PrenotazioneDB } from "@/lib/data";
import { ShiftIcon, SHIFT_STYLES } from "@/components/ShiftIcon";

const statoConfig = {
  confermata: { label: "Confermata", dot: "bg-emerald-500", text: "text-emerald-500", bg: "bg-emerald-500/8" },
  in_attesa: { label: "In attesa", dot: "bg-amber-500", text: "text-amber-500", bg: "bg-amber-500/8" },
  disdetta: { label: "Disdetta", dot: "bg-red-500", text: "text-red-500", bg: "bg-red-500/8" },
  completata: { label: "Completata", dot: "bg-blue-500", text: "text-blue-500", bg: "bg-blue-500/8" },
  no_show: { label: "No show", dot: "bg-gray-400", text: "text-gray-400", bg: "bg-gray-400/8" },
};

const fonteConfig = {
  whatsapp: { icon: <MessageSquare size={11} />, color: "text-emerald-500" },
  manuale: { icon: <Plus size={11} />, color: "text-blue-400" },
  telefono: { icon: <Phone size={11} />, color: "text-gray-400" },
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

  const handleCambiaStato = async (id: string, nuovoStato: "completata" | "disdetta" | "no_show" | "confermata") => {
    try {
      await aggiornaStatoPrenotazione(id, nuovoStato);
      setPrenotazioni(prenotazioni.map(p => p.id === id ? { ...p, stato: nuovoStato } : p));
    } catch (e) {
      console.error("Errore cambio stato:", e);
    }
  };

  const turniInfo = turni.map((t, i) => {
    const style = SHIFT_STYLES[i % SHIFT_STYLES.length];
    return {
      turno: t,
      style,
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
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4">
          <ShiftIcon type="default" size={28} className="text-emerald-500" />
        </div>
        <h3 className="text-lg font-bold text-main mb-2">Benvenuto in Reservi</h3>
        <p className="text-sub text-sm max-w-xs">Vai nelle <strong>Impostazioni</strong> per configurare i turni e inizia a ricevere prenotazioni.</p>
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
            className="card px-3.5 py-2.5 rounded-2xl flex items-center gap-2 text-sm font-medium text-emerald-500 hover:opacity-80 transition-opacity"
          >
            <UserPlus size={15} strokeWidth={2} />
            Walk-in
          </button>
          <button
            onClick={() => setShowNuova(true)}
            className="gradient-green text-white px-4 py-2.5 rounded-2xl flex items-center gap-2 text-sm font-medium shadow-lg shadow-emerald-500/15 hover:opacity-90 transition-opacity"
          >
            <Plus size={15} strokeWidth={2.5} />
            Nuova
          </button>
        </div>
      </div>

      {/* Stats rapide */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card rounded-2xl p-3.5 text-center">
          <div className="text-2xl font-bold text-main">{attive.length}</div>
          <div className="text-[10px] text-dim mt-0.5 uppercase tracking-wider">Prenotazioni</div>
        </div>
        <div className="card rounded-2xl p-3.5 text-center">
          <div className="text-2xl font-bold text-main">{totalePersone}</div>
          <div className="text-[10px] text-dim mt-0.5 uppercase tracking-wider">Persone</div>
        </div>
        <div className="card rounded-2xl p-3.5 text-center">
          <div className="text-2xl font-bold text-emerald-500">{totaleWhatsapp}</div>
          <div className="text-[10px] text-dim mt-0.5 uppercase tracking-wider">WhatsApp</div>
        </div>
      </div>

      {/* Cards turni */}
      <div className="grid grid-cols-2 gap-3">
        {turniInfo.map(({ turno, style, occupati, rimasti, totale, pieno }) => {
          const completati = prenotazioni.filter(p => p.turno_id === turno.id && p.stato === "completata");
          const postiLiberati = completati.reduce((s, p) => s + p.n_persone, 0);
          return (
            <div key={turno.id} className="card rounded-2xl p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-[0.04] blur-[40px]" style={{ background: style.accent }} />
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: style.accentLight }}>
                    <ShiftIcon type={turno.nome} size={16} style={{ color: style.accent }} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-main block leading-tight">{turno.nome}</span>
                    <span className="text-[10px] text-dim">{turno.inizio}–{turno.fine}</span>
                  </div>
                </div>
              </div>
              <div className="text-2xl font-bold text-main mb-1.5">
                {occupati}<span className="text-dim text-sm font-normal">/{totale}</span>
              </div>
              <div className="w-full h-1 rounded-full overflow-hidden mb-2" style={{ background: "var(--bg-input)" }}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min((occupati / totale) * 100, 100)}%`,
                    background: pieno ? "#ef4444" : rimasti <= 5 ? "#f59e0b" : style.accent,
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                {pieno ? (
                  <span className="text-[11px] text-red-400 font-medium">Completo</span>
                ) : (
                  <span className="text-[11px] font-medium" style={{ color: style.accent }}>{rimasti} posti liberi</span>
                )}
                {postiLiberati > 0 && (
                  <span className="text-[10px] text-emerald-500 font-medium flex items-center gap-1">
                    <LogOut size={10} /> {postiLiberati} usciti
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Avvisi turni pieni */}
      {turniInfo.filter((t) => t.pieno).map(({ turno, style }) => (
        <div key={turno.id} className="card rounded-2xl p-3.5 flex items-center gap-3 border-red-500/10">
          <div className="w-9 h-9 rounded-xl bg-red-500/8 flex items-center justify-center flex-shrink-0">
            <AlertTriangle size={16} className="text-red-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-red-400">{turno.nome} completo</p>
            <p className="text-xs text-dim mt-0.5">
              {primoTurnoLibero
                ? `WhatsApp propone: ${primoTurnoLibero.turno.nome} (${primoTurnoLibero.rimasti} posti)`
                : "Tutti i turni pieni — WhatsApp proporrà un altro giorno"}
            </p>
          </div>
        </div>
      ))}

      {/* Prenotazioni per turno */}
      {turniInfo.map(({ turno, style, prenotazioni: prenTurno }) => {
        if (prenTurno.length === 0) return null;
        return (
          <div key={turno.id}>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: style.accentLight }}>
                <ShiftIcon type={turno.nome} size={13} style={{ color: style.accent }} />
              </div>
              <h3 className="text-sm font-semibold" style={{ color: style.accent }}>{turno.nome}</h3>
              <span className="text-xs text-dim">{turno.inizio}–{turno.fine}</span>
              <span className="text-xs text-dim ml-auto">{prenTurno.length}</span>
            </div>
            <div className="space-y-2">
              {prenTurno.map((p) => (
                <PrenotazioneCard key={p.id} prenotazione={p} onCambiaStato={handleCambiaStato} />
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
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-6 h-6 rounded-lg bg-gray-500/10 flex items-center justify-center">
                <Clock size={13} className="text-gray-400" />
              </div>
              <h3 className="text-sm font-semibold text-sub">Senza turno</h3>
              <span className="text-xs text-dim ml-auto">{senzaTurno.length}</span>
            </div>
            <div className="space-y-2">
              {senzaTurno.sort((a, b) => a.ora.localeCompare(b.ora)).map((p) => (
                <PrenotazioneCard key={p.id} prenotazione={p} onCambiaStato={handleCambiaStato} />
              ))}
            </div>
          </div>
        );
      })()}

      {/* Disdette */}
      {disdette.length > 0 && (
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-6 h-6 rounded-lg bg-red-500/8 flex items-center justify-center">
              <X size={13} className="text-red-400" />
            </div>
            <h3 className="text-sm font-semibold text-sub">Disdette</h3>
          </div>
          <div className="space-y-2">
            {disdette.map((p) => (
              <PrenotazioneCard key={p.id} prenotazione={p} onCambiaStato={handleCambiaStato} />
            ))}
          </div>
        </div>
      )}

      {/* Modale Nuova Prenotazione */}
      {showNuova && (
        <div className="fixed inset-0 flex items-end sm:items-center justify-center z-50 p-4" style={{ background: "var(--backdrop)", backdropFilter: "blur(8px)" }}>
          <div className="rounded-3xl w-full max-w-md p-6 shadow-2xl" style={{ background: "var(--modal-bg)", border: "1px solid var(--bg-card-border)" }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-main">Nuova prenotazione</h3>
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
                  {turni.map((t, i) => {
                    const info = getCopertiTurno(t);
                    const selected = nuovaForm.turno_id === t.id;
                    const st = SHIFT_STYLES[i % SHIFT_STYLES.length];
                    return (
                      <button key={t.id} onClick={() => setNuovaForm({ ...nuovaForm, turno_id: t.id, ora: t.inizio })}
                        disabled={info.pieno}
                        className={`py-2.5 px-3 rounded-xl text-xs font-medium transition-all text-left disabled:opacity-20 disabled:cursor-not-allowed ${
                          selected ? "shadow-lg" : "card text-sub hover:text-main"
                        }`}
                        style={selected ? { background: st.accentMid, borderColor: st.accent, border: `1px solid ${st.accent}40` } : {}}>
                        <div className="flex items-center gap-2">
                          <ShiftIcon type={t.nome} size={14} style={{ color: selected ? st.accent : undefined }} className={selected ? "" : "text-dim"} />
                          <span>{t.nome}</span>
                        </div>
                        <div className={`text-[10px] mt-0.5 ${selected ? "" : "text-dim"}`} style={selected ? { color: st.accent } : {}}>
                          {t.inizio}–{t.fine} · {info.rimasti} posti
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
                <input type="text" placeholder="Allergie, tavolo esterno..." value={nuovaForm.note}
                  onChange={(e) => setNuovaForm({ ...nuovaForm, note: e.target.value })}
                  className="w-full input rounded-xl px-4 py-3 text-sm" />
              </div>
              <button onClick={handleAggiungi}
                disabled={!nuovaForm.nome_cliente || !nuovaForm.ora || !nuovaForm.turno_id}
                className="w-full gradient-green text-white py-3.5 rounded-2xl font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/15 mt-2">
                <Check size={16} /> Conferma
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
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                  <UserPlus size={18} className="text-emerald-500" />
                </div>
                <h3 className="text-lg font-bold text-main">Walk-in</h3>
              </div>
              <button onClick={() => setShowWalkin(false)} className="text-dim hover:text-sub p-1"><X size={20} /></button>
            </div>

            <div className="text-center mb-5">
              <p className="text-xs text-sub mb-3">Quante persone?</p>
              <div className="flex items-center justify-center gap-5">
                <button onClick={() => setWalkinPersone(Math.max(1, walkinPersone - 1))}
                  className="w-11 h-11 rounded-2xl card flex items-center justify-center text-sub hover:text-main transition-colors">
                  <Minus size={18} />
                </button>
                <span className="text-5xl font-bold text-main w-20 text-center">{walkinPersone}</span>
                <button onClick={() => setWalkinPersone(Math.min(20, walkinPersone + 1))}
                  className="w-11 h-11 rounded-2xl card flex items-center justify-center text-sub hover:text-main transition-colors">
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <div className="flex justify-center gap-2 mb-5">
              {[1, 2, 3, 4, 5, 6, 8].map((n) => (
                <button key={n} onClick={() => setWalkinPersone(n)}
                  className={`w-9 h-9 rounded-xl text-xs font-medium transition-all ${
                    walkinPersone === n ? "gradient-green text-white shadow-lg shadow-emerald-500/15" : "card text-sub hover:text-main"
                  }`}>{n}</button>
              ))}
            </div>

            <p className="text-xs text-sub mb-3 text-center">Seleziona turno</p>
            <div className="grid grid-cols-2 gap-2">
              {turni.map((t, i) => {
                const info = getCopertiTurno(t);
                const st = SHIFT_STYLES[i % SHIFT_STYLES.length];
                return (
                  <button key={t.id} onClick={() => handleWalkin(t.id)} disabled={info.pieno || info.rimasti < walkinPersone}
                    className="py-3.5 rounded-2xl font-medium text-sm transition-all flex flex-col items-center gap-1.5 disabled:opacity-20 disabled:cursor-not-allowed card hover:opacity-80">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: st.accentLight }}>
                      <ShiftIcon type={t.nome} size={18} style={{ color: st.accent }} />
                    </div>
                    <span className="text-xs text-main">{t.nome}</span>
                    <span className="text-[10px] text-dim">{t.inizio}–{t.fine}</span>
                    <span className={`text-[10px] font-medium ${info.pieno ? "text-red-400" : ""}`} style={!info.pieno ? { color: st.accent } : {}}>
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

function PrenotazioneCard({ prenotazione: p, onCambiaStato }: { prenotazione: PrenotazioneDB; onCambiaStato?: (id: string, stato: "completata" | "disdetta" | "no_show" | "confermata") => void }) {
  const [confermaNoShow, setConfermaNoShow] = useState(false);
  const stato = statoConfig[p.stato];
  const fonte = fonteConfig[p.fonte];
  const isAttiva = p.stato === "confermata" || p.stato === "in_attesa";
  const isModificata = p.stato === "completata" || p.stato === "no_show";

  return (
    <div className={`card rounded-2xl p-4 transition-all ${p.stato === "disdetta" ? "opacity-35" : isModificata ? "opacity-50" : ""}`}>
      <div className="flex items-start gap-3">
        <div className="min-w-[44px]">
          <div className="text-base font-bold text-main">{p.ora}</div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-main text-sm">{p.nome_cliente}</span>
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
            <div className="text-[11px] text-amber-500/80 mt-1.5 bg-amber-500/5 px-2 py-0.5 rounded-md inline-block">
              {p.note}
            </div>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium ${stato.bg} ${stato.text}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${stato.dot} ${p.stato === "in_attesa" ? "pulse-soft" : ""}`} />
            {stato.label}
          </div>

          {/* Pulsanti per prenotazioni attive */}
          {isAttiva && onCambiaStato && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => onCambiaStato(p.id, "completata")}
                className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 transition-all"
              >
                <LogOut size={10} /> Uscito
              </button>
              {!confermaNoShow ? (
                <button
                  onClick={() => setConfermaNoShow(true)}
                  className="flex items-center gap-1 px-1.5 py-1 rounded-lg text-[10px] font-medium bg-red-500/8 text-red-400 hover:bg-red-500/15 transition-all"
                  title="Non si è presentato"
                >
                  <X size={10} />
                </button>
              ) : (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => { onCambiaStato(p.id, "no_show"); setConfermaNoShow(false); }}
                    className="px-2 py-1 rounded-lg text-[10px] font-medium bg-red-500 text-white hover:bg-red-600 transition-all"
                  >
                    No show
                  </button>
                  <button
                    onClick={() => setConfermaNoShow(false)}
                    className="px-1.5 py-1 rounded-lg text-[10px] font-medium text-dim hover:text-sub transition-all"
                  >
                    Annulla
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Pulsante annulla per prenotazioni già modificate */}
          {isModificata && onCambiaStato && (
            <button
              onClick={() => onCambiaStato(p.id, "confermata")}
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 transition-all"
            >
              Ripristina
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
