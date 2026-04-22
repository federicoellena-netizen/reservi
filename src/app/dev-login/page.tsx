"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DevLogin() {
  const [status, setStatus] = useState("Premi il pulsante per accedere");

  const handleLogin = async () => {
    setStatus("Accesso in corso...");
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: "demo@reservi.app",
        password: "Demo2026!",
      });
      if (error) {
        setStatus("Errore: " + error.message);
      } else {
        setStatus("Login OK! Redirect...");
        window.location.href = "/dashboard";
      }
    } catch (e) {
      setStatus("Errore: " + String(e));
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: "monospace", background: "#111", color: "#0f0", minHeight: "100vh" }}>
      <h1>Dev Login</h1>
      <p style={{ marginTop: 20 }}>{status}</p>
      <button
        onClick={handleLogin}
        style={{ marginTop: 20, padding: "12px 24px", fontSize: 16, background: "#22c55e", color: "#000", border: "none", borderRadius: 8, cursor: "pointer" }}
      >
        Accedi come demo@reservi.app
      </button>
    </div>
  );
}
