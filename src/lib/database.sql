-- Schema database PrenotaAI
-- Da eseguire su Supabase SQL Editor

-- Tabella attività (ristoranti, parrucchieri, dentisti, ecc.)
CREATE TABLE attivita (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('ristorante', 'parrucchiere', 'dentista', 'altro')),
  indirizzo TEXT,
  telefono TEXT,
  whatsapp TEXT,
  orari JSONB DEFAULT '[]',
  coperti_totali INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabella operatori (camerieri, parrucchiere, dottori)
CREATE TABLE operatori (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  attivita_id UUID REFERENCES attivita(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  specializzazione TEXT,
  giorni_lavoro JSONB DEFAULT '[1,2,3,4,5]',
  orario_inizio TEXT DEFAULT '09:00',
  orario_fine TEXT DEFAULT '18:00',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabella servizi (taglio, pulizia dentale, ecc.)
CREATE TABLE servizi (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  attivita_id UUID REFERENCES attivita(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  durata_minuti INTEGER NOT NULL DEFAULT 30,
  prezzo DECIMAL(10,2),
  operatore_ids JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabella prenotazioni
CREATE TABLE prenotazioni (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  attivita_id UUID REFERENCES attivita(id) ON DELETE CASCADE,
  nome_cliente TEXT NOT NULL,
  telefono_cliente TEXT,
  data DATE NOT NULL,
  ora TEXT NOT NULL,
  n_persone INTEGER DEFAULT 1,
  servizio TEXT,
  operatore TEXT,
  note TEXT,
  stato TEXT NOT NULL DEFAULT 'confermata' CHECK (stato IN ('confermata', 'in_attesa', 'disdetta', 'completata', 'no_show')),
  fonte TEXT NOT NULL DEFAULT 'manuale' CHECK (fonte IN ('whatsapp', 'manuale', 'telefono')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indici per performance
CREATE INDEX idx_prenotazioni_data ON prenotazioni(attivita_id, data);
CREATE INDEX idx_prenotazioni_stato ON prenotazioni(stato);
CREATE INDEX idx_operatori_attivita ON operatori(attivita_id);
CREATE INDEX idx_servizi_attivita ON servizi(attivita_id);

-- Row Level Security (ogni utente vede solo i suoi dati)
ALTER TABLE attivita ENABLE ROW LEVEL SECURITY;
ALTER TABLE operatori ENABLE ROW LEVEL SECURITY;
ALTER TABLE servizi ENABLE ROW LEVEL SECURITY;
ALTER TABLE prenotazioni ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Utenti vedono solo la propria attività"
  ON attivita FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Utenti vedono solo i propri operatori"
  ON operatori FOR ALL
  USING (attivita_id IN (SELECT id FROM attivita WHERE user_id = auth.uid()));

CREATE POLICY "Utenti vedono solo i propri servizi"
  ON servizi FOR ALL
  USING (attivita_id IN (SELECT id FROM attivita WHERE user_id = auth.uid()));

CREATE POLICY "Utenti vedono solo le proprie prenotazioni"
  ON prenotazioni FOR ALL
  USING (attivita_id IN (SELECT id FROM attivita WHERE user_id = auth.uid()));

-- Policy per API webhook (inserimento prenotazioni da WhatsApp senza auth)
CREATE POLICY "Webhook può inserire prenotazioni"
  ON prenotazioni FOR INSERT
  WITH CHECK (true);
