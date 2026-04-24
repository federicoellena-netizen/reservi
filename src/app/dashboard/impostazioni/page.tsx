"use client";

import { useState, useEffect } from "react";
import { Save, Check, Plus, Trash2, GripVertical } from "lucide-react";
import { getTurni, saveTurni, getAttivita, aggiornaAttivita, type TurnoDB, type AttivitaDB } from "@/lib/data";
import { ShiftIcon, SHIFT_STYLES } from "@/components/ShiftIcon";
import { useAuth } from "@/lib/auth-context";

const giorniNomi = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];

const orariDefault = giorniNomi.map((g, i) => ({
  giorno: g,
  aperto: true,
  pranzo_inizio: "12:30",
  pranzo_fine: "15:00",
  cena_inizio: "19:30",
  cena_fine: "23:00",
}));

const iconeDisponibili = ["pranzo", "cena", "default"];

interface TurnoConfig {
  id: string;
  nome: string;
  inizio: string;
  fine: string;
  coperti: number;
  icona: string;
}

export default function ImpostazioniPage() {
  const { attivita: authAttivita } = useAuth();
  const [attivita, setAttivita] = useState({
    nome: "",
    tipo: "ristorante",
    indirizzo: "",
    telefono: "",
    whatsapp: "",
    info_extra: "",
    link_tripadvisor: "",
    link_google: "",
  });

  const [turni, setTurni] = useState<TurnoConfig[]>([]);
  const [orari, setOrari] = useState(orariDefault);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authAttivita) return;
    async function load() {
      try {
        const [att, t] = await Promise.all([getAttivita(authAttivita!.id), getTurni(authAttivita!.id)]);
        if (att) {
          setAttivita({
            nome: att.nome || "",
            tipo: att.tipo || "ristorante",
            indirizzo: att.indirizzo || "",
            telefono: att.telefono || "",
            whatsapp: att.whatsapp || "",
            info_extra: att.info_extra || "",
            link_tripadvisor: att.link_tripadvisor || "",
            link_google: att.link_google || "",
          });
          if (att.orari && Array.isArray(att.orari) && att.orari.length === 7) {
            setOrari(att.orari as typeof orariDefault);
          }
        }
        if (t.length > 0) {
          setTurni(t.map(turno => ({
            id: turno.id,
            nome: turno.nome,
            inizio: turno.inizio,
            fine: turno.fine,
            coperti: turno.coperti,
            icona: turno.icona,
          })));
        }
      } catch (e) {
        console.error("Errore caricamento impostazioni:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [authAttivita]);

  const handleSave = async () => {
    if (!authAttivita) return;
    setSaving(true);
    try {
      await Promise.all([
        aggiornaAttivita(authAttivita.id, {
          nome: attivita.nome,
          tipo: attivita.tipo,
          indirizzo: attivita.indirizzo,
          telefono: attivita.telefono,
          whatsapp: attivita.whatsapp,
          info_extra: attivita.info_extra || null,
          link_tripadvisor: attivita.link_tripadvisor || null,
          link_google: attivita.link_google || null,
          orari: orari,
        }),
        saveTurni(authAttivita.id, turni.map(t => ({
          id: t.id,
          nome: t.nome,
          inizio: t.inizio,
          fine: t.fine,
          coperti: t.coperti,
          icona: t.icona,
          ordine: 0,
        }))),
      ]);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      console.error("Errore salvataggio:", e);
    } finally {
      setSaving(false);
    }
  };

  const toggleGiorno = (index: number) => {
    const nuovi = [...orari];
    nuovi[index].aperto = !nuovi[index].aperto;
    setOrari(nuovi);
  };

  const aggiornaTurno = (id: string, campo: keyof TurnoConfig, valore: string | number) => {
    setTurni(turni.map((t) => (t.id === id ? { ...t, [campo]: valore } : t)));
  };

  const aggiungiTurno = () => {
    const newId = crypto.randomUUID();
    const ultimoTurno = turni[turni.length - 1];
    setTurni([...turni, {
      id: newId,
      nome: `Turno ${turni.length + 1}`,
      inizio: ultimoTurno ? ultimoTurno.fine : "19:00",
      fine: "23:00",
      coperti: 30,
      icona: iconeDisponibili[turni.length % iconeDisponibili.length],
    }]);
  };

  const rimuoviTurno = (id: string) => {
    if (turni.length <= 1) return;
    setTurni(turni.filter((t) => t.id !== id));
  };

  const copertiTotali = turni.reduce((s, t) => s + t.coperti, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-sub text-sm">Caricamento...</div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sub text-sm">Impostazioni</p>
          <h2 className="text-3xl font-bold text-main tracking-tight">Configurazione</h2>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-4 py-2.5 rounded-2xl text-sm font-semibold flex items-center gap-2 transition-all shadow-lg ${
            saved
              ? "bg-[#22c55e]/20 text-[#22c55e] shadow-green-500/10"
              : "gradient-green text-black shadow-green-500/20 hover:opacity-90"
          } disabled:opacity-50`}
        >
          {saved ? <Check size={16} /> : <Save size={16} />}
          {saved ? "Salvato!" : saving ? "Salvataggio..." : "Salva"}
        </button>
      </div>

      {/* Info attività */}
      <div className="card rounded-2xl p-5">
        <h3 className="font-semibold text-main mb-4 text-sm">Informazioni Attività</h3>
        <div className="space-y-4">
          <InputField label="Nome attività" value={attivita.nome} onChange={(v) => setAttivita({ ...attivita, nome: v })} />
          <div>
            <label className="text-xs text-sub block mb-1.5">Tipo</label>
            <select
              value={attivita.tipo}
              onChange={(e) => setAttivita({ ...attivita, tipo: e.target.value })}
              className="w-full input rounded-xl px-4 py-3 text-sm"
            >
              <option value="ristorante">Ristorante</option>
              <option value="parrucchiere">Parrucchiere</option>
              <option value="dentista">Studio Dentistico</option>
              <option value="altro">Altro</option>
            </select>
          </div>
          <InputField label="Indirizzo" value={attivita.indirizzo} onChange={(v) => setAttivita({ ...attivita, indirizzo: v })} />
          <div className="grid grid-cols-2 gap-3">
            <InputField label="Telefono" value={attivita.telefono} onChange={(v) => setAttivita({ ...attivita, telefono: v })} />
            <InputField label="WhatsApp" value={attivita.whatsapp} onChange={(v) => setAttivita({ ...attivita, whatsapp: v })} />
          </div>
        </div>
      </div>

      {/* Giorni di Apertura */}
      <div className="card rounded-2xl p-5">
        <h3 className="font-semibold text-main mb-4 text-sm">Giorni di Apertura</h3>
        <div className="flex flex-wrap gap-2">
          {orari.map((o, i) => (
            <button
              key={o.giorno}
              onClick={() => toggleGiorno(i)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "10px 14px",
                borderRadius: "12px",
                border: o.aperto ? "1.5px solid rgba(34,197,94,0.4)" : "1.5px solid rgba(239,68,68,0.3)",
                background: o.aperto ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.08)",
                color: o.aperto ? "#22c55e" : "#ef4444",
                minWidth: "48px",
              }}
            >
              <span style={{ fontSize: "12px", fontWeight: 700 }}>{o.giorno.slice(0, 3)}</span>
              <span style={{ fontSize: "10px", marginTop: "2px", opacity: 0.8 }}>{o.aperto ? "Aperto" : "Chiuso"}</span>
            </button>
          ))}
        </div>
        <p className="text-[10px] text-dim mt-3">Tocca un giorno per aprirlo o chiuderlo. I turni configurati sotto si applicano a tutti i giorni aperti.</p>
      </div>

      {/* Info per Assistente WhatsApp */}
      <div className="card rounded-2xl p-5">
        <h3 className="font-semibold text-main mb-1 text-sm">Informazioni per l'Assistente AI</h3>
        <p className="text-xs text-dim mb-4">Scrivi tutto ciò che l'assistente WhatsApp deve sapere sulla tua attività. I clienti potranno chiedere queste informazioni via chat.</p>
        <textarea
          value={attivita.info_extra}
          onChange={(e) => setAttivita({ ...attivita, info_extra: e.target.value })}
          rows={8}
          className="w-full input rounded-xl px-4 py-3 text-sm resize-y"
          placeholder={`Esempi di informazioni utili:\n- Parcheggio: Sì, gratuito nel cortile interno\n- Celiaci: Menù dedicato senza glutine disponibile\n- Animali: Ammessi solo in terrazza esterna\n- Pagamenti: Contanti e carte, no Amex\n- Bambini: Seggioloni disponibili (max 4)\n- Eventi: Musica live ogni venerdì sera\n- Specialità: Pesce fresco, pizza napoletana`}
        />
        <p className="text-[10px] text-dim mt-2">Se un cliente chiede qualcosa non presente qui, l'assistente lo inviterà a chiamare direttamente.</p>
      </div>

      {/* Link Recensioni */}
      <div className="card rounded-2xl p-5">
        <h3 className="font-semibold text-main mb-1 text-sm">Richiesta Recensioni</h3>
        <p className="text-xs text-dim mb-4">Dopo il pasto, il cliente riceve un messaggio WhatsApp con il link per lasciare una recensione. Inserisci i link delle tue pagine.</p>
        <div className="space-y-4">
          <InputField label="Link Google Business (recensioni)" value={attivita.link_google} onChange={(v) => setAttivita({ ...attivita, link_google: v })} />
          <InputField label="Link TripAdvisor" value={attivita.link_tripadvisor} onChange={(v) => setAttivita({ ...attivita, link_tripadvisor: v })} />
        </div>
        <p className="text-[10px] text-dim mt-3">Quando segni un cliente come &quot;Uscito&quot;, ricevera un messaggio con i link per la recensione.</p>
      </div>

      {/* Gestione Turni */}
      <div className="card rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-main text-sm">Turni e Coperti</h3>
            <p className="text-xs text-dim mt-0.5">Totale: {copertiTotali} coperti su {turni.length} turni</p>
          </div>
          <button
            onClick={aggiungiTurno}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#22c55e] bg-[#22c55e]/10 px-3 py-1.5 rounded-xl hover:bg-[#22c55e]/20 transition-colors"
          >
            <Plus size={14} />
            Turno
          </button>
        </div>

        <div className="space-y-3">
          {turni.map((turno) => (
            <div key={turno.id} className="card rounded-xl p-4">
              <div className="flex items-start gap-3">
                {/* Icona e grip */}
                <div className="flex flex-col items-center gap-1 pt-1">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: SHIFT_STYLES[turni.indexOf(turno) % SHIFT_STYLES.length].accentLight }}>
                    <ShiftIcon type={turno.nome} size={18} style={{ color: SHIFT_STYLES[turni.indexOf(turno) % SHIFT_STYLES.length].accent }} />
                  </div>
                  <GripVertical size={14} className="text-dim" />
                </div>

                {/* Contenuto */}
                <div className="flex-1 space-y-3">
                  {/* Nome turno */}
                  <input
                    type="text"
                    value={turno.nome}
                    onChange={(e) => aggiornaTurno(turno.id, "nome", e.target.value)}
                    className="input rounded-lg px-3 py-2 text-sm font-semibold w-full"
                    placeholder="Nome turno"
                  />

                  {/* Orario e coperti */}
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

                  {/* Info: l'icona si assegna automaticamente in base al nome */}
                  <p className="text-[10px] text-dim">L'icona si assegna automaticamente: usa "Pranzo" o "Cena" nel nome.</p>
                </div>

                {/* Pulsante elimina */}
                <button
                  onClick={() => rimuoviTurno(turno.id)}
                  disabled={turni.length <= 1}
                  className="p-2 rounded-xl text-red-400/50 hover:text-red-400 hover:bg-red-400/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Riepilogo turni */}
        <div className="mt-4 p-3 rounded-xl bg-[#22c55e]/5 border border-[#22c55e]/10">
          <div className="text-xs text-[#22c55e] font-medium mb-2">Riepilogo giornata</div>
          <div className="flex flex-wrap gap-3">
            {turni.map((t, i) => (
              <div key={t.id} className="flex items-center gap-1.5 text-xs text-sub">
                <ShiftIcon type={t.nome} size={13} style={{ color: SHIFT_STYLES[i % SHIFT_STYLES.length].accent }} />
                <span>{t.inizio}–{t.fine}</span>
                <span className="text-dim">({t.coperti}p)</span>
              </div>
            ))}
          </div>
          <div className="text-xs text-dim mt-2">
            Coperti totali giornalieri: <span className="text-main font-semibold">{copertiTotali}</span>
          </div>
        </div>
      </div>


      {/* WhatsApp status */}
      <div className="card rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-main text-sm">Assistente WhatsApp</h3>
            <p className="text-xs text-dim mt-1">Risponde automaticamente 24/7</p>
          </div>
          <div className="flex items-center gap-2 bg-[#22c55e]/10 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] pulse-soft" />
            <span className="text-xs font-semibold text-[#22c55e]">Attivo</span>
          </div>
        </div>
        <div className="mt-3 p-3 rounded-xl card">
          <p className="text-xs text-sub">Quando un turno è pieno, l'assistente propone automaticamente il turno successivo disponibile. Se tutti i turni sono pieni, propone un altro giorno.</p>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-xs text-sub block mb-1.5">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full input rounded-xl px-4 py-3 text-sm"
      />
    </div>
  );
}
