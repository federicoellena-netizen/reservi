import { supabase } from "./supabase";

// ============ TURNI ============

export interface TurnoDB {
  id: string;
  attivita_id: string;
  nome: string;
  inizio: string;
  fine: string;
  coperti: number;
  icona: string;
  ordine: number;
}

export async function getTurni(attivitaId: string): Promise<TurnoDB[]> {
  const { data, error } = await supabase
    .from("turni")
    .select("*")
    .eq("attivita_id", attivitaId)
    .order("ordine");
  if (error) throw error;
  return data || [];
}

export async function saveTurni(attivitaId: string, turni: Omit<TurnoDB, "attivita_id">[]) {
  const rows = turni.map((t, i) => ({
    id: t.id,
    attivita_id: attivitaId,
    nome: t.nome,
    inizio: t.inizio,
    fine: t.fine,
    coperti: t.coperti,
    icona: t.icona,
    ordine: i,
  }));
  const { error } = await supabase.from("turni").upsert(rows);
  if (error) throw error;

  const idsAttuali = turni.map(t => t.id);
  const { data: tutti } = await supabase.from("turni").select("id").eq("attivita_id", attivitaId);
  if (tutti) {
    const daCancellare = tutti.filter(t => !idsAttuali.includes(t.id)).map(t => t.id);
    if (daCancellare.length > 0) {
      await supabase.from("turni").delete().in("id", daCancellare);
    }
  }
}

// ============ PRENOTAZIONI ============

export interface PrenotazioneDB {
  id: string;
  attivita_id: string;
  nome_cliente: string;
  telefono_cliente: string | null;
  data: string;
  ora: string;
  n_persone: number;
  servizio: string | null;
  operatore: string | null;
  note: string | null;
  stato: "confermata" | "in_attesa" | "disdetta" | "completata" | "no_show";
  fonte: "whatsapp" | "manuale" | "telefono";
  turno_id: string | null;
  created_at: string;
}

export async function getPrenotazioniOggi(attivitaId: string): Promise<PrenotazioneDB[]> {
  const oggi = new Date().toISOString().split("T")[0];
  const { data, error } = await supabase
    .from("prenotazioni")
    .select("*")
    .eq("attivita_id", attivitaId)
    .eq("data", oggi)
    .order("ora");
  if (error) throw error;
  return data || [];
}

export async function getPrenotazioniMese(attivitaId: string, anno: number, mese: number): Promise<PrenotazioneDB[]> {
  const inizio = `${anno}-${String(mese + 1).padStart(2, "0")}-01`;
  const fine = `${anno}-${String(mese + 1).padStart(2, "0")}-${new Date(anno, mese + 1, 0).getDate()}`;
  const { data, error } = await supabase
    .from("prenotazioni")
    .select("*")
    .eq("attivita_id", attivitaId)
    .gte("data", inizio)
    .lte("data", fine)
    .order("data")
    .order("ora");
  if (error) throw error;
  return data || [];
}

export async function getPrenotazioniPeriodo(attivitaId: string, dataInizio: string, dataFine: string): Promise<PrenotazioneDB[]> {
  const { data, error } = await supabase
    .from("prenotazioni")
    .select("*")
    .eq("attivita_id", attivitaId)
    .gte("data", dataInizio)
    .lte("data", dataFine)
    .order("data")
    .order("ora");
  if (error) throw error;
  return data || [];
}

export async function inserisciPrenotazione(attivitaId: string, pren: {
  nome_cliente: string;
  telefono_cliente?: string;
  data: string;
  ora: string;
  n_persone: number;
  note?: string;
  stato?: string;
  fonte?: string;
  turno_id?: string;
}) {
  const { data, error } = await supabase.from("prenotazioni").insert({
    attivita_id: attivitaId,
    nome_cliente: pren.nome_cliente,
    telefono_cliente: pren.telefono_cliente || null,
    data: pren.data,
    ora: pren.ora,
    n_persone: pren.n_persone,
    note: pren.note || null,
    stato: pren.stato || "confermata",
    fonte: pren.fonte || "manuale",
    turno_id: pren.turno_id || null,
  }).select().single();
  if (error) throw error;
  return data;
}

export async function aggiornaStatoPrenotazione(id: string, stato: string) {
  const { error } = await supabase
    .from("prenotazioni")
    .update({ stato })
    .eq("id", id);
  if (error) throw error;
}

// ============ ATTIVITA ============

export interface AttivitaDB {
  id: string;
  nome: string;
  tipo: string;
  indirizzo: string | null;
  telefono: string | null;
  whatsapp: string | null;
  orari: unknown;
  coperti_totali: number | null;
}

export async function getAttivita(attivitaId: string): Promise<AttivitaDB | null> {
  const { data, error } = await supabase
    .from("attivita")
    .select("*")
    .eq("id", attivitaId)
    .single();
  if (error) return null;
  return data;
}

export async function aggiornaAttivita(attivitaId: string, updates: Partial<AttivitaDB>) {
  const { error } = await supabase
    .from("attivita")
    .update(updates)
    .eq("id", attivitaId);
  if (error) throw error;
}

// ============ REPORT ============

export async function getStatsMese(attivitaId: string, anno: number, mese: number) {
  const prenotazioni = await getPrenotazioniMese(attivitaId, anno, mese);

  const attive = prenotazioni.filter(p => p.stato === "confermata" || p.stato === "completata");
  const totPersone = attive.reduce((s, p) => s + p.n_persone, 0);
  const noShow = prenotazioni.filter(p => p.stato === "no_show").length;
  const disdette = prenotazioni.filter(p => p.stato === "disdetta").length;
  const pctDisdette = prenotazioni.length > 0 ? Math.round((disdette / prenotazioni.length) * 100) : 0;

  // Per fonte
  const whatsapp = attive.filter(p => p.fonte === "whatsapp").length;
  const manuale = attive.filter(p => p.fonte === "manuale").length;
  const telefono = attive.filter(p => p.fonte === "telefono").length;
  const totFonte = whatsapp + manuale + telefono || 1;

  // Per giorno della settimana
  const giorniCount: Record<number, number> = {};
  attive.forEach(p => {
    const day = new Date(p.data + "T12:00:00").getDay();
    giorniCount[day] = (giorniCount[day] || 0) + 1;
  });
  const maxGiorno = Math.max(...Object.values(giorniCount), 1);
  const giorniNomi = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"];
  const giorniPopolari = giorniNomi
    .map((nome, i) => ({ giorno: nome, count: giorniCount[i] || 0, pct: Math.round(((giorniCount[i] || 0) / maxGiorno) * 100) }))
    .sort((a, b) => b.count - a.count);

  return {
    totPrenotazioni: attive.length,
    totPersone,
    noShow,
    pctDisdette: `${pctDisdette}%`,
    perFonte: [
      { fonte: "WhatsApp", count: whatsapp, pct: Math.round((whatsapp / totFonte) * 100) },
      { fonte: "Manuale", count: manuale, pct: Math.round((manuale / totFonte) * 100) },
      { fonte: "Telefono", count: telefono, pct: Math.round((telefono / totFonte) * 100) },
    ],
    giorniPopolari,
  };
}
