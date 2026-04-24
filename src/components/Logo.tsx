"use client";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const heights = { sm: 50, md: 60, lg: 80 };
  const h = heights[size];

  return (
    <img
      src="/logo-reservi-dark.png"
      alt="Reservi"
      height={h}
      style={{ height: h, width: "auto", borderRadius: h * 0.3, overflow: "hidden" }}
      className="object-contain"
    />
  );
}

export function LogoText({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const heights = { sm: 52, md: 64, lg: 84 };
  const h = heights[size];

  return (
    <img
      src="/logo-reservi-dark.png"
      alt="Reservi"
      height={h}
      style={{ height: h, width: "auto", borderRadius: h * 0.3, overflow: "hidden" }}
      className="object-contain"
    />
  );
}
