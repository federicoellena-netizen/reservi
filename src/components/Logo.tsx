"use client";

import { useTheme } from "@/lib/theme";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const { theme } = useTheme();
  const dims = { sm: 28, md: 34, lg: 48 };
  const d = dims[size];
  const isDark = theme === "dark";

  return (
    <svg width={d} height={d} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
      </defs>
      {/* Rounded square background */}
      <rect x="2" y="2" width="44" height="44" rx="14" fill="url(#logoGrad)" />
      {/* Letter R — bold, geometric, Revolut-style */}
      <path
        d="M16 36V12h8.5c2.3 0 4.1.7 5.4 2s1.9 3 1.9 5.1c0 1.7-.4 3.1-1.3 4.2-.9 1.1-2.1 1.8-3.6 2.2L33 36h-4.8l-5.5-10h-2.3v10H16zm4.4-14h4c1.2 0 2.2-.3 2.8-1 .7-.7 1-1.5 1-2.7 0-1.1-.3-2-1-2.6-.6-.7-1.6-1-2.8-1h-4v7.3z"
        fill={isDark ? "#141420" : "#ffffff"}
      />
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
