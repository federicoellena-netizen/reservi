"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, Check, Plus, Trash2, MapPin, Phone, Store } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { aggiornaAttivita, saveTurni, completeOnboarding } from "@/lib/data";
import { ShiftIcon, SHIFT_STYLES } from "@/components/ShiftIcon";
import { Logo } from "@/components/Logo";

const iconeDisponibili = ["pranzo", "cena", "default"];

interface TurnoConfig {
  id: string;
  nome: string;
  inizio: string;
  fine: string;
  coperti: number;
  icona: string;
}

const turniDefault: TurnoConfig[] = [
  { id: crypto.randomUUID(), nome: "Pranzo", inizio: "12:30", fine: "15:00", coperti: 30, icona: "pranzo" },
  { id: crypto.randomUUID(), nome: "Cena", inizio: "19:30", fine: "23:00", coperti: 40, icona: "cena" },
];

export default function OnboardingPage() {
  const { attivita } = useAuth();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);

  // Step 1: Info attivita
  const [info, setInfo] = useState({
    nome: attivita?.nome || "",
    tipo: "ristorante",
    indirizzo: "",
    telefono: "",
    whatsapp: "",
  });

  // Step 2: Turni
  const [turni, setTurni] = useState<TurnoConfig[]>(turniDefault);

  const aggiornaTurno = (id: string, campo: keyof TurnoConfig, valore: string | number) => {
    setTurni(turni.map((t) => (t.id === id ? { ...t, [campo]: valore } : t)));
  };

  const aggiungiTurno = () => {
    const ultimo = turni[turni.length - 1];
    setTurni([...turni, {
      id: crypto.randomUUID(),
      nome: `Turno ${turni.length + 1}`,
      inizio: ultimo ? ultimo.fine : "19:00",
      fine: "23:00",
      coperti: 30,
      icona: iconeDisponibili[turni.length % iconeDisponibili.length],
    }]);
  };

  const rimuoviTurno = (id: string) => {
    if (turni.length <= 1) return;
    setTurni(turni.filter((t) => t.id !== id));
  };

  const handleComplete = async () => {
    if (!attivita) return;
    setSaving(true);
    try {
      // Salva info attivita
      await aggiornaAttivita(attivita.id, {
        nome: info.nome,
        tipo: info.tipo,
        indirizzo: info.indirizzo,
        telefono: info.telefono,
        whatsapp: info.whatsapp,
      });

      // Salva turni
      await saveTurni(attivita.id, turni.map((t, i) => ({
        id: t.id,
        nome: t.nome,
        inizio: t.inizio,
        fine: t.fine,
        coperti: t.coperti,
        icona: t.icona,
        ordine: i,
      })));

      // Segna onboarding come completato
      await completeOnboarding(attivita.id);

      // Redirect alla dashboard
      window.location.href = "/dashboard";
    } catch (e) {
      console.error("Errore onboarding:", e);
      setSaving(false);
    }
  };

  const canProceedStep1 = info.nome.trim().length > 0;
  const canProceedStep2 = turni.length > 0 && turni.every(t => t.nome.trim().length > 0 && t.coperti > 0);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-primary)" }}>
      {/* Header */}
      <div className="px-6 py-5 flex items-center justify-between" style={{ borderBottom: "1px solid var(--bg-card-border)" }}>
        <div className="flex items-center gap-2.5">
          <Logo size="sm" />
          <span className="font-bold text-main tracking-tight">Reservi</span>
        </div>
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-8 h-1.5 rounded-full transition-all ${
                s <= step ? "bg-[#22c55e]" : ""
              }`}
              style={s > step ? { background: "var(--bg-card-border)" } : {}}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-start justify-center px-5 py-10">
        <div className="w-full max-w-lg">

          {/* STEP 1: Info Attivita */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl gradient-green flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/20">
                  <Store size={24} className="text-white" />
                </div>
                <h1 className="text-2xl font-bold text-main">La tua attivita</h1>
                <p className="text-sub text-sm mt-2">Inserisci le informazioni base. Potrai modificarle dopo.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-sub block mb-1.5 font-medium">Nome attivita *</label>
                  <input
                    type="text"
                    value={info.nome}
                    onChange={(e) => setInfo({ ...info, nome: e.target.value })}
                    className="w-full input rounded-xl px-4 py-3 text-sm"
                    placeholder="Es. Ristorante Da Mario"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="text-xs text-sub block mb-1.5 font-medium">Tipo</label>
                  <select
                    value={info.tipo}
                    onChange={(e) => setInfo({ ...info, tipo: e.target.value })}
                    className="w-full input rounded-xl px-4 py-3 text-sm"
                  >
                    <option value="ristorante">Ristorante</option>
                    <option value="parrucchiere">Parrucchiere</option>
                    <option value="dentista">Studio Dentistico</option>
                    <option value="altro">Altro</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-sub block mb-1.5 font-medium">Indirizzo</label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dim" />
                    <input
                      type="text"
                      value={info.indirizzo}
                      onChange={(e) => setInfo({ ...info, indirizzo: e.target.value })}
                      className="w-full input rounded-xl pl-10 pr-4 py-3 text-sm"
                      placeholder="Via Roma 1, Milano"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-sub block mb-1.5 font-medium">Telefono</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dim" />
                      <input
                        type="tel"
                        value={info.telefono}
                        onChange={(e) => setInfo({ ...info, telefono: e.target.value })}
                        className="w-full input rounded-xl pl-10 pr-4 py-3 text-sm"
                        placeholder="02 1234567"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-sub block mb-1.5 font-medium">WhatsApp</label>
                    <input
                      type="tel"
                      value={info.whatsapp}
                      onChange={(e) => setInfo({ ...info, whatsapp: e.target.value })}
                      className="w-full input rounded-xl px-4 py-3 text-sm"
                      placeholder="+39 333 1234567"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!canProceedStep1}
                className="w-full gradient-green text-white py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-green-500/20 disabled:opacity-40"
              >
                Continua
                <ArrowRight size={18} />
              </button>
            </div>
          )}

          {/* STEP 2: Turni */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                  <ShiftIcon type="pranzo" size={24} style={{ color: "#f59e0b" }} />
                </div>
                <h1 className="text-2xl font-bold text-main">Configura i turni</h1>
                <p className="text-sub text-sm mt-2">Imposta gli orari e i coperti per ogni turno. Puoi aggiungerne quanti ne vuoi.</p>
              </div>

              <div className="space-y-3">
                {turni.map((turno, i) => (
                  <div key={turno.id} className="card rounded-2xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: SHIFT_STYLES[i % SHIFT_STYLES.length].accentLight }}>
                        <ShiftIcon type={turno.nome} size={18} style={{ color: SHIFT_STYLES[i % SHIFT_STYLES.length].accent }} />
                      </div>

                      <div className="flex-1 space-y-3">
                        <input
                          type="text"
                          value={turno.nome}
                          onChange={(e) => aggiornaTurno(turno.id, "nome", e.target.value)}
                          className="input rounded-lg px-3 py-2 text-sm font-semibold w-full"
                          placeholder="Nome turno"
                        />
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <label className="text-[10px] text-dim block mb-1">Inizio</label>
                            <input
                              type="time"
                              value={turno.inizio}
                              onChange={(e) => aggiornaTurno(turno.id, "inizio", e.target.value)}
                              className="input rounded-lg px-2.5 py-2 text-xs w-full"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-dim block mb-1">Fine</label>
                            <input
                              type="time"
                              value={turno.fine}
                              onChange={(e) => aggiornaTurno(turno.id, "fine", e.target.value)}
                              className="input rounded-lg px-2.5 py-2 text-xs w-full"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-dim block mb-1">Coperti</label>
                            <input
                              type="number"
                              min={1}
                              max={500}
                              value={turno.coperti}
                              onChange={(e) => aggiornaTurno(turno.id, "coperti", parseInt(e.target.value) || 1)}
                              className="input rounded-lg px-2.5 py-2 text-xs w-full"
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => rimuoviTurno(turno.id)}
                        disabled={turni.length <= 1}
                        className="p-2 rounded-xl text-red-400/50 hover:text-red-400 hover:bg-red-400/10 transition-all disabled:opacity-20"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={aggiungiTurno}
                className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-[#22c55e] bg-[#22c55e]/10 py-3 rounded-xl hover:bg-[#22c55e]/20 transition-colors"
              >
                <Plus size={16} />
                Aggiungi turno
              </button>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 card py-3.5 rounded-2xl font-semibold text-sm text-sub flex items-center justify-center gap-2 hover:text-main transition-colors"
                >
                  <ArrowLeft size={18} />
                  Indietro
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!canProceedStep2}
                  className="flex-[2] gradient-green text-white py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-green-500/20 disabled:opacity-40"
                >
                  Continua
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Riepilogo e completamento */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[#22c55e]/10 flex items-center justify-center mx-auto mb-4">
                  <Check size={28} className="text-[#22c55e]" />
                </div>
                <h1 className="text-2xl font-bold text-main">Tutto pronto!</h1>
                <p className="text-sub text-sm mt-2">Controlla il riepilogo e attiva il tuo account.</p>
              </div>

              {/* Riepilogo attivita */}
              <div className="card rounded-2xl p-5 space-y-3">
                <h3 className="font-semibold text-main text-sm">La tua attivita</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-sub">Nome</span>
                    <span className="text-main font-medium">{info.nome}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sub">Tipo</span>
                    <span className="text-main font-medium capitalize">{info.tipo}</span>
                  </div>
                  {info.indirizzo && (
                    <div className="flex justify-between">
                      <span className="text-sub">Indirizzo</span>
                      <span className="text-main font-medium">{info.indirizzo}</span>
                    </div>
                  )}
                  {info.telefono && (
                    <div className="flex justify-between">
                      <span className="text-sub">Telefono</span>
                      <span className="text-main font-medium">{info.telefono}</span>
                    </div>
                  )}
                  {info.whatsapp && (
                    <div className="flex justify-between">
                      <span className="text-sub">WhatsApp</span>
                      <span className="text-main font-medium">{info.whatsapp}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Riepilogo turni */}
              <div className="card rounded-2xl p-5 space-y-3">
                <h3 className="font-semibold text-main text-sm">Turni configurati</h3>
                <div className="space-y-2">
                  {turni.map((t, i) => (
                    <div key={t.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <ShiftIcon type={t.nome} size={16} style={{ color: SHIFT_STYLES[i % SHIFT_STYLES.length].accent }} />
                        <span className="text-main font-medium">{t.nome}</span>
                      </div>
                      <span className="text-sub">{t.inizio}–{t.fine} ({t.coperti} coperti)</span>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-dim pt-2" style={{ borderTop: "1px solid var(--bg-card-border)" }}>
                  Coperti totali: {turni.reduce((s, t) => s + t.coperti, 0)}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 card py-3.5 rounded-2xl font-semibold text-sm text-sub flex items-center justify-center gap-2 hover:text-main transition-colors"
                >
                  <ArrowLeft size={18} />
                  Modifica
                </button>
                <button
                  onClick={handleComplete}
                  disabled={saving}
                  className="flex-[2] gradient-green text-white py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-green-500/20 disabled:opacity-50"
                >
                  {saving ? "Configurazione..." : "Attiva Reservi"}
                  {!saving && <Check size={18} />}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
