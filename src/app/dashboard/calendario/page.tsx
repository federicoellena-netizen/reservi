"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import { getPrenotazioniMese, type PrenotazioneDB } from "@/lib/data";

const giorniSettimana = ["L", "M", "M", "G", "V", "S", "D"];

export default function CalendarioPage() {
  const now = new Date();
  const [meseCorrente, setMeseCorrente] = useState(new Date(now.getFullYear(), now.getMonth(), 1));
  const [prenotazioni, setPrenotazioni] = useState<PrenotazioneDB[]>([]);
  const [loading, setLoading] = useState(true);

  const anno = meseCorrente.getFullYear();
  const mese = meseCorrente.getMonth();
  const primoGiorno = new Date(anno, mese, 1);
  const ultimoGiorno = new Date(anno, mese + 1, 0);
  let startDay = primoGiorno.getDay() - 1;
  if (startDay < 0) startDay = 6;
  const giorniMese = ultimoGiorno.getDate();
  const nomeMese = meseCorrente.toLocaleDateString("it-IT", { month: "long", year: "numeric" });

  const oggiStr = now.toISOString().split("T")[0];
  const [giornoSel, setGiornoSel] = useState<string | null>(oggiStr);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getPrenotazioniMese(anno, mese);
        setPrenotazioni(data);
      } catch (e) {
        console.error("Errore caricamento calendario:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [anno, mese]);

  // Raggruppa prenotazioni per data
  const perData: Record<string, PrenotazioneDB[]> = {};
  prenotazioni.forEach((p) => {
    if (p.stato === "disdetta") return;
    if (!perData[p.data]) perData[p.data] = [];
    perData[p.data].push(p);
  });

  const celle = [];
  for (let i = 0; i < startDay; i++) celle.push(<div key={`e-${i}`} />);
  for (let g = 1; g <= giorniMese; g++) {
    const dataStr = `${anno}-${String(mese + 1).padStart(2, "0")}-${String(g).padStart(2, "0")}`;
    const pren = perData[dataStr];
    const ha = pren && pren.length > 0;
    const sel = giornoSel === dataStr;
    const oggi = dataStr === oggiStr;

    celle.push(
      <button
        key={g}
        onClick={() => setGiornoSel(dataStr)}
        className={`h-11 rounded-xl text-sm relative flex flex-col items-center justify-center transition-all ${
          sel
            ? "gradient-green text-black font-bold shadow-lg shadow-green-500/20"
            : oggi
            ? "bg-white/10 text-main font-bold border border-[#22c55e]/30"
            : ha
            ? "bg-white/[0.03] text-main hover:bg-white/[0.07]"
            : "text-gray-600 hover:bg-white/[0.03]"
        }`}
      >
        <span className="text-xs">{g}</span>
        {ha && !sel && <span className="w-1 h-1 rounded-full bg-[#22c55e] mt-0.5" />}
      </button>
    );
  }

  const prenotazioniGiorno = giornoSel ? (perData[giornoSel] || []) : [];
  const totPersone = prenotazioniGiorno.reduce((s, p) => s + p.n_persone, 0);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <button onClick={() => setMeseCorrente(new Date(anno, mese - 1, 1))} className="p-2 card rounded-xl">
          <ChevronLeft size={18} className="text-gray-400" />
        </button>
        <h2 className="text-lg font-bold capitalize text-main">{nomeMese}</h2>
        <button onClick={() => setMeseCorrente(new Date(anno, mese + 1, 1))} className="p-2 card rounded-xl">
          <ChevronRight size={18} className="text-gray-400" />
        </button>
      </div>

      <div className="card rounded-2xl p-4">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {giorniSettimana.map((g, i) => (
            <div key={i} className="text-center text-[10px] text-gray-500 font-medium py-1">{g}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">{celle}</div>
      </div>

      {giornoSel && (
        <div className="card rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-main">
              {new Date(giornoSel + "T12:00:00").toLocaleDateString("it-IT", {
                weekday: "long", day: "numeric", month: "long",
              })}
            </h3>
            {prenotazioniGiorno.length > 0 && (
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Users size={12} /> {totPersone} persone
              </span>
            )}
          </div>
          {loading ? (
            <p className="text-gray-600 text-sm">Caricamento...</p>
          ) : prenotazioniGiorno.length === 0 ? (
            <p className="text-gray-600 text-sm">Nessuna prenotazione</p>
          ) : (
            <div className="space-y-2">
              {prenotazioniGiorno.sort((a, b) => a.ora.localeCompare(b.ora)).map((p) => (
                <div key={p.id} className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0">
                  <span className="text-[#22c55e] font-bold min-w-[48px] text-sm">{p.ora}</span>
                  <span className="font-medium text-main text-sm">{p.nome_cliente}</span>
                  <span className="text-gray-500 text-xs flex items-center gap-1 ml-auto">
                    <Users size={11} /> {p.n_persone}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
