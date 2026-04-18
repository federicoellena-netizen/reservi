-- ============================================
-- SETUP SVILUPPO — Eseguire su Supabase SQL Editor
-- ============================================

-- 1. Tabella turni (configurazione turni per attività)
CREATE TABLE IF NOT EXISTS turni (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  attivita_id UUID REFERENCES attivita(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  inizio TEXT NOT NULL,
  fine TEXT NOT NULL,
  coperti INTEGER NOT NULL DEFAULT 30,
  icona TEXT DEFAULT '🍽️',
  ordine INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_turni_attivita ON turni(attivita_id);

ALTER TABLE turni ENABLE ROW LEVEL SECURITY;

-- 2. Aggiungere turno_id alla tabella prenotazioni
ALTER TABLE prenotazioni ADD COLUMN IF NOT EXISTS turno_id UUID REFERENCES turni(id);

-- 3. Policy temporanee per sviluppo (senza autenticazione)
-- NOTA: Da rimuovere quando si aggiunge il login!

-- Attività
CREATE POLICY "dev_read_attivita" ON attivita FOR SELECT USING (true);
CREATE POLICY "dev_write_attivita" ON attivita FOR INSERT WITH CHECK (true);
CREATE POLICY "dev_update_attivita" ON attivita FOR UPDATE USING (true);

-- Turni
CREATE POLICY "dev_all_turni" ON turni FOR ALL USING (true) WITH CHECK (true);

-- Prenotazioni
CREATE POLICY "dev_read_prenotazioni" ON prenotazioni FOR SELECT USING (true);
CREATE POLICY "dev_update_prenotazioni" ON prenotazioni FOR UPDATE USING (true);

-- Operatori e Servizi
CREATE POLICY "dev_all_operatori" ON operatori FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "dev_all_servizi" ON servizi FOR ALL USING (true) WITH CHECK (true);

-- 4. Inserire dati iniziali (Ristorante demo)
INSERT INTO attivita (id, nome, tipo, indirizzo, telefono, whatsapp, coperti_totali)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Ristorante Da Mario',
  'ristorante',
  'Via Napoli 45, Cosenza',
  '0984 123456',
  '+39 333 9876543',
  120
);

-- Turni del ristorante
INSERT INTO turni (attivita_id, nome, inizio, fine, coperti, icona, ordine) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Pranzo T1', '12:30', '14:00', 30, '☀️🍽️', 0),
  ('00000000-0000-0000-0000-000000000001', 'Pranzo T2', '14:00', '15:30', 30, '☀️🍽️', 1),
  ('00000000-0000-0000-0000-000000000001', 'Cena T1', '19:30', '21:00', 30, '🌙🍽️', 2),
  ('00000000-0000-0000-0000-000000000001', 'Cena T2', '21:00', '22:30', 30, '🌙🍽️', 3);
