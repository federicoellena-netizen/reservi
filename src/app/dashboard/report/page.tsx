"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Users, CalendarCheck, XCircle, MessageSquare, Phone, Plus } from "lucide-react";
import { getStatsMese } from "@/lib/data";
import { useAuth } from "@/lib/auth-context";

export default function ReportPage() {
  const { attivita } = useAuth();
  const now = new Date();
  const [anno] = useState(now.getFullYear());
  const [mese] = useState(now.getMonth());
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<{
    totPrenotazioni: number;
    totPersone: number;
    noShow: number;
    pctDisdette: string;
    perFonte: { fonte: string; count: number; pct: number }[];
    giorniPopolari: { giorno: string; count: number; pct: number }[];
  } | null>(null);

  const nomeMese = new Date(anno, mese).toLocaleDateString("it-IT", { month: "long", year: "numeric" });

  useEffect(() => {
    if (!attivita) return;
    async function load() {
      try {
        const data = await getStatsMese(attivita!.id, anno, mese);
        setStats(data);
      } catch (e) {
        console.error("Errore caricamento report:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [attivita, anno, mese]);

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-sub text-sm">Caricamento report...</div>
      </div>
    );
  }

  const statCards = [
    { label: "Prenotazioni", valore: String(stats.totPrenotazioni), icona: CalendarCheck, gradient: "gradient-green", shadow: "shadow-green-500/20" },
    { label: "Persone", valore: String(stats.totPersone), icona: Users, gradient: "gradient-blue", shadow: "shadow-blue-500/20" },
    { label: "No show", valore: String(stats.noShow), icona: XCircle, gradient: "gradient-red", shadow: "shadow-red-500/20" },
    { label: "Disdette", valore: stats.pctDisdette, icona: TrendingUp, gradient: "gradient-orange", shadow: "shadow-orange-500/20" },
  ];

  const fonteIcons: Record<string, { icon: typeof MessageSquare; color: string }> = {
    WhatsApp: { icon: MessageSquare, color: "#16a34a" },
    Manuale: { icon: Plus, color: "#448aff" },
    Telefono: { icon: Phone, color: "#888" },
  };

  const hasDati = stats.totPrenotazioni > 0;

  return (
    <div className="space-y-5">
      <div>
        <p className="text-gray-500 text-sm">Report</p>
        <h2 className="text-3xl font-bold text-main tracking-tight capitalize">{nomeMese}</h2>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        {statCards.map((s) => {
          const Icon = s.icona;
          return (
            <div key={s.label} className="card rounded-2xl p-4 relative overflow-hidden">
              <div className={`absolute top-2 right-2 w-9 h-9 rounded-xl ${s.gradient} ${s.shadow} shadow-lg flex items-center justify-center`}>
                <Icon size={16} className="text-main" />
              </div>
              <div className="text-3xl font-bold text-main mb-0.5">{s.valore}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          );
        })}
      </div>

      {!hasDati ? (
        <div className="card rounded-2xl p-6 text-center">
          <div className="text-3xl mb-3">📊</div>
          <p className="text-sub text-sm">Nessuna prenotazione questo mese. I report si popoleranno automaticamente!</p>
        </div>
      ) : (
        <>
          {/* Fonte */}
          <div className="card rounded-2xl p-4">
            <h3 className="font-semibold text-main mb-4 text-sm">Fonte prenotazioni</h3>
            <div className="space-y-3">
              {stats.perFonte.map((f) => {
                const fi = fonteIcons[f.fonte] || { icon: Plus, color: "#888" };
                const Icon = fi.icon;
                return (
                  <div key={f.fonte}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="flex items-center gap-2 text-gray-300">
                        <Icon size={13} style={{ color: fi.color }} />
                        {f.fonte}
                      </span>
                      <span className="text-gray-500 text-xs">{f.count} ({f.pct}%)</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${f.pct}%`, backgroundColor: fi.color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Giorni */}
          <div className="card rounded-2xl p-4">
            <h3 className="font-semibold text-main mb-4 text-sm">Giorni più richiesti</h3>
            <div className="space-y-2.5">
              {stats.giorniPopolari.map((g) => (
                <div key={g.giorno} className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 min-w-[28px]">{g.giorno}</span>
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-[#22c55e]" style={{ width: `${g.pct}%`, opacity: 0.3 + (g.pct / 100) * 0.7 }} />
                  </div>
                  <span className="text-xs text-gray-500 min-w-[30px] text-right">{g.pct}%</span>
                </div>
              ))}
            </div>
          </div>
          {/* Insight */}
          <div className="card rounded-2xl p-4 border-emerald-500/10">
            <h3 className="font-semibold text-emerald-500 mb-3 text-sm">Insight del mese</h3>
            <ul className="text-sm text-gray-400 space-y-2.5">
              {stats.perFonte[0] && stats.perFonte[0].pct > 0 && (
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">·</span>
                  Il <strong className="text-main">{stats.perFonte[0].pct}% delle prenotazioni</strong> arriva da {stats.perFonte[0].fonte}
                </li>
              )}
              {stats.giorniPopolari[0] && stats.giorniPopolari[0].count > 0 && (
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">·</span>
                  Il giorno più richiesto è il <strong className="text-main">{stats.giorniPopolari[0].giorno}</strong> con {stats.giorniPopolari[0].count} prenotazioni
                </li>
              )}
              {stats.noShow > 0 && (
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">·</span>
                  No-show: <strong className="text-main">{stats.noShow}</strong> — {stats.noShow <= 3 ? "sotto la media di settore (12%)" : "attenzione, valuta reminder automatici"}
                </li>
              )}
              {stats.totPrenotazioni > 0 && (
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">·</span>
                  Media <strong className="text-main">{(stats.totPersone / stats.totPrenotazioni).toFixed(1)} persone</strong> per prenotazione
                </li>
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
