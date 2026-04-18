"use client";

// Icone professionali per i turni — sostituzione emoji
export function ShiftIcon({ type, size = 20, className = "" }: { type: string; size?: number; className?: string }) {
  // Determina l'icona in base al nome/tipo del turno
  const iconType = getIconType(type);

  switch (iconType) {
    case "pranzo":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "cena":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
  }
}

function getIconType(type: string): "pranzo" | "cena" | "default" {
  const lower = type.toLowerCase();
  if (lower.includes("pranzo") || lower.includes("lunch") || lower.includes("sole") || lower.includes("☀")) return "pranzo";
  if (lower.includes("cena") || lower.includes("dinner") || lower.includes("luna") || lower.includes("🌙") || lower.includes("notte")) return "cena";
  return "default";
}

// Colori professionali per i turni
export const SHIFT_STYLES = [
  { accent: "#f59e0b", accentLight: "rgba(245, 158, 11, 0.1)", accentMid: "rgba(245, 158, 11, 0.15)", label: "text-amber-500" },
  { accent: "#f97316", accentLight: "rgba(249, 115, 22, 0.1)", accentMid: "rgba(249, 115, 22, 0.15)", label: "text-orange-500" },
  { accent: "#6366f1", accentLight: "rgba(99, 102, 241, 0.1)", accentMid: "rgba(99, 102, 241, 0.15)", label: "text-indigo-400" },
  { accent: "#8b5cf6", accentLight: "rgba(139, 92, 246, 0.1)", accentMid: "rgba(139, 92, 246, 0.15)", label: "text-violet-400" },
  { accent: "#06b6d4", accentLight: "rgba(6, 182, 212, 0.1)", accentMid: "rgba(6, 182, 212, 0.15)", label: "text-cyan-400" },
  { accent: "#ec4899", accentLight: "rgba(236, 72, 153, 0.1)", accentMid: "rgba(236, 72, 153, 0.15)", label: "text-pink-400" },
];
