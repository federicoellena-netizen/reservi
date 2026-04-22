"use client";

// Icona turno — punto colorato minimale
export function ShiftIcon({ type, size = 20, className = "", style }: { type: string; size?: number; className?: string; style?: React.CSSProperties }) {
  const dotSize = Math.max(Math.round(size * 0.4), 6);

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        ...style,
      }}
    >
      <div
        className="rounded-full"
        style={{
          width: dotSize,
          height: dotSize,
          backgroundColor: "currentColor",
        }}
      />
    </div>
  );
}

// Colori originali — amber e orange, coerenti col tema verde
export const SHIFT_STYLES = [
  { accent: "#f59e0b", accentLight: "rgba(245, 158, 11, 0.1)", accentMid: "rgba(245, 158, 11, 0.15)", label: "text-amber-500" },
  { accent: "#f97316", accentLight: "rgba(249, 115, 22, 0.1)", accentMid: "rgba(249, 115, 22, 0.15)", label: "text-orange-500" },
  { accent: "#6366f1", accentLight: "rgba(99, 102, 241, 0.1)", accentMid: "rgba(99, 102, 241, 0.15)", label: "text-indigo-400" },
  { accent: "#8b5cf6", accentLight: "rgba(139, 92, 246, 0.1)", accentMid: "rgba(139, 92, 246, 0.15)", label: "text-violet-400" },
  { accent: "#06b6d4", accentLight: "rgba(6, 182, 212, 0.1)", accentMid: "rgba(6, 182, 212, 0.15)", label: "text-cyan-400" },
  { accent: "#ec4899", accentLight: "rgba(236, 72, 153, 0.1)", accentMid: "rgba(236, 72, 153, 0.15)", label: "text-pink-400" },
];
