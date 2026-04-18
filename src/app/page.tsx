"use client";

import Link from "next/link";
import { LogoText } from "@/components/Logo";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] rounded-full bg-[#16a34a] opacity-[0.05] blur-[120px]" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full bg-[#2979ff] opacity-[0.05] blur-[120px]" />

      <div className="text-center max-w-lg relative z-10">
        <div className="flex justify-center mb-8">
          <LogoText size="lg" />
        </div>
        <p className="text-lg text-sub mb-10">
          Prenotazioni intelligenti per la tua attività
        </p>
        <Link
          href="/dashboard"
          className="inline-block gradient-green text-black font-semibold px-8 py-4 rounded-2xl text-lg hover:opacity-90 transition-opacity shadow-lg shadow-green-500/20"
        >
          Accedi alla Dashboard
        </Link>
      </div>
    </div>
  );
}
