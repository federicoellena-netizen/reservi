"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "./supabase";
import type { User } from "@supabase/supabase-js";

interface AttivitaInfo {
  id: string;
  nome: string;
  tipo: string;
}

interface AuthContextType {
  user: User | null;
  attivita: AttivitaInfo | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  attivita: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [attivita, setAttivita] = useState<AttivitaInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        // Try to find attivita linked to this user (limit 1 per evitare errori con duplicati)
        const { data: attivitaList } = await supabase
          .from("attivita")
          .select("id, nome, tipo")
          .eq("user_id", user.id)
          .limit(1);

        let data = attivitaList && attivitaList.length > 0 ? attivitaList[0] : null;

        if (!data) {
          // Fallback: check for unlinked attivita and claim it (first user setup)
          const { data: unlinkedList } = await supabase
            .from("attivita")
            .select("id, nome, tipo")
            .is("user_id", null)
            .limit(1);

          const unlinked = unlinkedList && unlinkedList.length > 0 ? unlinkedList[0] : null;

          if (unlinked) {
            await supabase
              .from("attivita")
              .update({ user_id: user.id })
              .eq("id", unlinked.id);
            data = unlinked;
          }
          // Non creare automaticamente una nuova attivita — evita duplicati
        }

        if (data) {
          setAttivita(data);
        }
      }

      setLoading(false);
    }

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null);
        if (!session?.user) {
          setAttivita(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setAttivita(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, attivita, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
