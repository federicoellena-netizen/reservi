"use client";

// Logo SVG Reservi — "R" con bolla chat, stile moderno
function ReserviLogoSVG({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Sfondo quadrato arrotondato */}
      <rect width="48" height="48" rx="14" fill="#16a34a" />
      {/* R stilizzata */}
      <text
        x="14"
        y="35"
        fontFamily="'Georgia', serif"
        fontSize="32"
        fontWeight="700"
        fill="white"
        letterSpacing="-1"
      >
        R
      </text>
      {/* Bolla chat piccola */}
      <circle cx="36" cy="12" r="7" fill="white" opacity="0.25" />
      <circle cx="36" cy="12" r="4.5" fill="white" opacity="0.5" />
      {/* Tre puntini nella bolla */}
      <circle cx="33.5" cy="12" r="0.8" fill="#16a34a" />
      <circle cx="36" cy="12" r="0.8" fill="#16a34a" />
      <circle cx="38.5" cy="12" r="0.8" fill="#16a34a" />
    </svg>
  );
}

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: 36, md: 44, lg: 56 };
  return <ReserviLogoSVG size={sizes[size]} />;
}

export function LogoText({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const logoSizes = { sm: 32, md: 40, lg: 52 };
  const textSizes = { sm: "text-lg", md: "text-xl", lg: "text-2xl" };

  return (
    <div className="flex items-center gap-2.5">
      <ReserviLogoSVG size={logoSizes[size]} />
      <span className={`${textSizes[size]} font-bold text-main tracking-tight`}>Reservi</span>
    </div>
  );
}
