"use client";

import { useState } from "react";
import { MessageSquare, MapPin, Phone, Clock, ChevronRight, Star, Users, Utensils, Wine, X } from "lucide-react";

interface Attivita {
  id: string;
  nome: string;
  tipo: string;
  indirizzo: string | null;
  telefono: string | null;
  whatsapp: string | null;
  sito_config: {
    descrizione?: string;
    specialita?: string[];
    fascia_prezzo?: string;
    colore?: string;
  } | null;
}

interface Turno {
  id: string;
  nome: string;
  inizio: string;
  fine: string;
  coperti: number;
}

export default function SitoRistorante({ attivita, turni }: { attivita: Attivita; turni: Turno[] }) {
  const [showPrenotaModal, setShowPrenotaModal] = useState(false);
  const config = attivita.sito_config || {};
  const colore = config.colore || "#22c55e";
  const whatsappNum = (attivita.whatsapp || attivita.telefono || "").replace(/[\s+()-]/g, "");
  const whatsappLink = `https://wa.me/${whatsappNum}?text=${encodeURIComponent("Ciao! Vorrei prenotare un tavolo")}`;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-4xl mx-auto px-5 h-16 flex items-center justify-between">
          <span className="font-bold text-lg tracking-tight">{attivita.nome}</span>
          <div className="hidden sm:flex items-center gap-6 text-sm text-gray-400">
            <a href="#specialita" className="hover:text-white transition-colors">Menu</a>
            <a href="#orari" className="hover:text-white transition-colors">Orari</a>
            <a href="#contatti" className="hover:text-white transition-colors">Contatti</a>
          </div>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity shadow-lg"
            style={{ background: `linear-gradient(135deg, ${colore}, ${colore}dd)`, boxShadow: `0 8px 24px ${colore}30` }}
          >
            Prenota
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-20 px-5 relative overflow-hidden">
        <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] rounded-full opacity-[0.08] blur-[150px]" style={{ background: colore }} />
        <div className="absolute bottom-[-100px] right-[-150px] w-[400px] h-[400px] rounded-full bg-amber-500 opacity-[0.04] blur-[120px]" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          {config.fascia_prezzo && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6 bg-white/5 border border-white/10 text-gray-300">
              <Utensils size={12} />
              {attivita.tipo === "ristorante" ? "Ristorante" : attivita.tipo} · {config.fascia_prezzo}
            </div>
          )}

          <h1 className="text-4xl sm:text-6xl font-bold leading-tight tracking-tight mb-6">
            {attivita.nome}
          </h1>

          {config.descrizione && (
            <p className="text-lg sm:text-xl text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed">
              {config.descrizione}
            </p>
          )}

          {attivita.indirizzo && (
            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-10">
              <MapPin size={14} />
              {attivita.indirizzo}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl text-lg font-semibold text-white hover:opacity-90 transition-opacity flex items-center gap-3 shadow-xl"
              style={{ background: `linear-gradient(135deg, ${colore}, ${colore}dd)`, boxShadow: `0 12px 32px ${colore}30` }}
            >
              <MessageSquare size={22} />
              Prenota su WhatsApp
            </a>
            {attivita.telefono && (
              <a
                href={`tel:${attivita.telefono}`}
                className="px-8 py-4 rounded-2xl text-lg font-medium text-gray-300 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-3"
              >
                <Phone size={20} />
                Chiama
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Come prenotare */}
      <section className="py-16 px-5">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl p-8 bg-white/[0.03] border border-white/5 text-center">
            <h2 className="text-sm font-semibold uppercase tracking-wider mb-6" style={{ color: colore }}>
              Prenota in 30 secondi
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { icon: MessageSquare, text: "Scrivi su WhatsApp" },
                { icon: Users, text: "Dicci nome e numero persone" },
                { icon: Star, text: "Prenotazione confermata!" },
              ].map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `${colore}15` }}>
                      <Icon size={24} style={{ color: colore }} />
                    </div>
                    <span className="text-sm text-gray-300">{step.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Specialita */}
      {config.specialita && config.specialita.length > 0 && (
        <section id="specialita" className="py-16 px-5">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">Le nostre specialita</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {config.specialita.map((spec, i) => (
                <div key={i} className="rounded-2xl p-6 bg-white/[0.03] border border-white/5 text-center">
                  <div className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center mb-3" style={{ background: `${colore}15` }}>
                    <Wine size={20} style={{ color: colore }} />
                  </div>
                  <span className="text-sm text-gray-200">{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Orari */}
      <section id="orari" className="py-16 px-5">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">Orari</h2>
          <div className="rounded-2xl p-6 bg-white/[0.03] border border-white/5 space-y-4">
            {turni.map((turno) => (
              <div key={turno.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${colore}15` }}>
                    <Clock size={18} style={{ color: colore }} />
                  </div>
                  <span className="font-medium">{turno.nome}</span>
                </div>
                <span className="text-gray-400 text-sm">{turno.inizio} – {turno.fine}</span>
              </div>
            ))}
            {turni.length === 0 && (
              <p className="text-gray-500 text-sm text-center">Orari non ancora configurati</p>
            )}
          </div>
        </div>
      </section>

      {/* Contatti + Mappa */}
      <section id="contatti" className="py-16 px-5">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">Dove trovarci</h2>
          <div className="rounded-2xl p-6 bg-white/[0.03] border border-white/5 space-y-4">
            {attivita.indirizzo && (
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(attivita.indirizzo)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-500/10">
                  <MapPin size={18} className="text-blue-400" />
                </div>
                <div>
                  <div className="text-sm font-medium">{attivita.indirizzo}</div>
                  <div className="text-xs text-gray-500">Apri in Google Maps</div>
                </div>
                <ChevronRight size={16} className="text-gray-600 ml-auto" />
              </a>
            )}
            {attivita.telefono && (
              <a
                href={`tel:${attivita.telefono}`}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-500/10">
                  <Phone size={18} className="text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm font-medium">{attivita.telefono}</div>
                  <div className="text-xs text-gray-500">Chiama</div>
                </div>
                <ChevronRight size={16} className="text-gray-600 ml-auto" />
              </a>
            )}
            {attivita.whatsapp && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${colore}15` }}>
                  <MessageSquare size={18} style={{ color: colore }} />
                </div>
                <div>
                  <div className="text-sm font-medium">WhatsApp</div>
                  <div className="text-xs text-gray-500">Prenota via chat</div>
                </div>
                <ChevronRight size={16} className="text-gray-600 ml-auto" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* CTA Finale */}
      <section className="py-20 px-5">
        <div className="max-w-lg mx-auto text-center">
          <div className="rounded-3xl p-10 relative overflow-hidden bg-white/[0.03] border border-white/5">
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${colore}, ${colore}88)` }} />
            <h2 className="text-2xl font-bold mb-3">Prenota il tuo tavolo</h2>
            <p className="text-gray-400 text-sm mb-8">Scrivi su WhatsApp e conferma in 30 secondi</p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-lg font-semibold text-white hover:opacity-90 transition-opacity shadow-xl"
              style={{ background: `linear-gradient(135deg, ${colore}, ${colore}dd)`, boxShadow: `0 12px 32px ${colore}30` }}
            >
              <MessageSquare size={22} />
              Prenota su WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-bold tracking-tight">{attivita.nome}</span>
          <span className="text-xs text-gray-600">
            Prenotazioni gestite da <a href="https://reservi-two.vercel.app" className="hover:text-gray-400 transition-colors" style={{ color: colore }}>Reservi</a>
          </span>
        </div>
      </footer>

      {/* Floating WhatsApp Button (mobile) */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl sm:hidden z-50 hover:scale-105 transition-transform"
        style={{ background: `linear-gradient(135deg, ${colore}, ${colore}dd)`, boxShadow: `0 8px 24px ${colore}40` }}
      >
        <MessageSquare size={24} />
      </a>
    </div>
  );
}
