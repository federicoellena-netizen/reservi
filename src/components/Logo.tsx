"use client";

import { useTheme } from "@/lib/theme";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const { theme } = useTheme();
  const dims = { sm: 28, md: 34, lg: 48 };
  const d = dims[size];
  const isDark = theme === "dark";
  const uid = `logo-${size}`;

  const rPath = "M16 36V12h8.5c2.3 0 4.1.7 5.4 2s1.9 3 1.9 5.1c0 1.7-.4 3.1-1.3 4.2-.9 1.1-2.1 1.8-3.6 2.2L33 36h-4.8l-5.5-10h-2.3v10H16zm4.4-14h4c1.2 0 2.2-.3 2.8-1 .7-.7 1-1.5 1-2.7 0-1.1-.3-2-1-2.6-.6-.7-1.6-1-2.8-1h-4v7.3z";

  return (
    <svg width={d} height={d} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Gradiente sfondo verde ricco */}
        <linearGradient id={`${uid}-bg`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="30%" stopColor="#22c55e" />
          <stop offset="65%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#0d6930" />
        </linearGradient>

        {/* Riflesso vetro grande — specchiatura dall'alto */}
        <linearGradient id={`${uid}-mirror`} x1="50%" y1="0%" x2="50%" y2="60%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="30%" stopColor="#ffffff" stopOpacity="0.2" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        {/* Riflesso angolo */}
        <radialGradient id={`${uid}-spot`} cx="20%" cy="15%" r="40%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>

        {/* Ombra box */}
        <filter id={`${uid}-boxSh`} x="-15%" y="-10%" width="130%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#053d1a" floodOpacity="0.5" />
        </filter>

        {/* Ombra bianca sopra la R — glow */}
        <filter id={`${uid}-glow`}>
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feFlood floodColor="#ffffff" floodOpacity="0.3" result="white" />
          <feComposite in="white" in2="blur" operator="in" result="whiteGlow" />
          <feMerge>
            <feMergeNode in="whiteGlow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Gradiente R — da bianco brillante a bianco caldo */}
        <linearGradient id={`${uid}-rFace`} x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#f0fdf4" />
          <stop offset="100%" stopColor="#d1fae5" />
        </linearGradient>

        {/* Riflesso speculare sulla R — striscia di luce */}
        <linearGradient id={`${uid}-rShine`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="30%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Sfondo verde con ombra */}
      <rect x="2" y="2" width="44" height="44" rx="14" fill={`url(#${uid}-bg)`} filter={`url(#${uid}-boxSh)`} />

      {/* Bordo inferiore scuro */}
      <rect x="2" y="3" width="44" height="44" rx="14" fill="none" stroke="#064e1f" strokeWidth="0.7" strokeOpacity="0.4" />

      {/* Bordo superiore chiaro */}
      <rect x="2" y="1.5" width="44" height="44" rx="14" fill="none" stroke="#4ade80" strokeWidth="0.5" strokeOpacity="0.4" />

      {/* Riflesso specchiato dall'alto */}
      <rect x="2" y="2" width="44" height="44" rx="14" fill={`url(#${uid}-mirror)`} />

      {/* Punto luce angolo */}
      <rect x="2" y="2" width="44" height="44" rx="14" fill={`url(#${uid}-spot)`} />

      {/* Ombra portata della R */}
      <g transform="translate(1.5, 2)">
        <path d={rPath} fill="#053d1a" opacity="0.4" />
      </g>

      {/* R principale bianca con glow */}
      <path d={rPath} fill={`url(#${uid}-rFace)`} filter={`url(#${uid}-glow)`} />

      {/* Striscia di luce speculare sulla R */}
      <clipPath id={`${uid}-rClip`}>
        <path d={rPath} />
      </clipPath>
      <rect x="10" y="8" width="20" height="18" fill={`url(#${uid}-rShine)`} clipPath={`url(#${uid}-rClip)`} opacity="0.6" />

      {/* Linea di riflesso sottile sul bordo sinistro */}
      <line x1="16.5" y1="13" x2="16.5" y2="35" stroke="#ffffff" strokeWidth="0.7" strokeOpacity="0.5" />
    </svg>
  );
}

export function LogoText({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const { theme } = useTheme();
  const fontSize = { sm: "text-base", md: "text-lg", lg: "text-2xl" };
  const isDark = theme === "dark";

  return (
    <div className="flex items-center gap-2.5">
      <Logo size={size} />
      <div className="flex flex-col leading-tight">
        <span className={`${fontSize[size]} font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
          Reservi
        </span>
      </div>
    </div>
  );
}
