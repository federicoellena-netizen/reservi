import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import SitoRistorante from "./SitoRistorante";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const { data } = await supabase
    .from("attivita")
    .select("nome, indirizzo, sito_config")
    .eq("slug", slug)
    .single();

  if (!data) return { title: "Non trovato" };

  const config = data.sito_config || {};
  return {
    title: `${data.nome} — Prenota ora`,
    description: config.descrizione || `Prenota un tavolo da ${data.nome}`,
  };
}

export default async function SitoPage({ params }: Props) {
  const { slug } = await params;

  const { data: attivita } = await supabase
    .from("attivita")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!attivita) notFound();

  const { data: turni } = await supabase
    .from("turni")
    .select("*")
    .eq("attivita_id", attivita.id)
    .order("ordine");

  return <SitoRistorante attivita={attivita} turni={turni || []} />;
}
