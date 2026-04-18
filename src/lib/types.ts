export interface Attivita {
  id: string
  nome: string
  tipo: 'ristorante' | 'parrucchiere' | 'dentista' | 'altro'
  indirizzo: string
  telefono: string
  whatsapp: string
  orari: OrarioGiorno[]
  coperti_totali?: number
  created_at: string
}

export interface OrarioGiorno {
  giorno: number // 0=dom, 1=lun, ..., 6=sab
  aperto: boolean
  fasce: FasciaOraria[]
}

export interface FasciaOraria {
  nome: string // "Pranzo", "Cena", "Mattina", "Pomeriggio"
  inizio: string // "12:30"
  fine: string // "15:00"
  capacita: number // coperti o slot disponibili
}

export interface Prenotazione {
  id: string
  attivita_id: string
  nome_cliente: string
  telefono_cliente: string
  data: string // "2026-04-19"
  ora: string // "21:00"
  n_persone: number
  servizio?: string // per parrucchieri/dentisti
  operatore?: string // nome operatore/dottore
  note?: string
  stato: 'confermata' | 'in_attesa' | 'disdetta' | 'completata' | 'no_show'
  fonte: 'whatsapp' | 'manuale' | 'telefono'
  created_at: string
}

export interface Operatore {
  id: string
  attivita_id: string
  nome: string
  specializzazione?: string
  giorni_lavoro: number[] // [1,2,3,4,5] = lun-ven
  orario_inizio: string
  orario_fine: string
}

export interface Servizio {
  id: string
  attivita_id: string
  nome: string
  durata_minuti: number
  prezzo: number
  operatore_ids?: string[] // quali operatori lo fanno
}
