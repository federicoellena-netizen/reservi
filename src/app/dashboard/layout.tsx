"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, LayoutDashboard, Settings, BarChart3, Sun, Moon, LogOut } from "lucide-react";
import { LogoText } from "@/components/Logo";
import { useTheme } from "@/lib/theme";
import { AuthProvider, useAuth } from "@/lib/auth-context";

const navItems = [
  { href: "/dashboard", label: "Oggi", icon: LayoutDashboard },
  { href: "/dashboard/calendario", label: "Calendario", icon: CalendarDays },
  { href: "/dashboard/report", label: "Report", icon: BarChart3 },
  { href: "/dashboard/impostazioni", label: "Impostazioni", icon: Settings },
];

function DashboardContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const { attivita, loading, signOut } = useAuth();
  const [showLogout, setShowLogout] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
        <div className="text-sub text-sm">Caricamento...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-primary)" }}>
      {/* Header */}
      <header className="px-5 pt-10 pb-2 flex items-center justify-between">
        <LogoText size="md" />
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="card w-9 h-9 rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity"
          >
            {theme === "dark" ? (
              <Sun size={16} className="text-amber-400" />
            ) : (
              <Moon size={16} className="text-indigo-500" />
            )}
          </button>
          <button
            onClick={() => setShowLogout(!showLogout)}
            className="card px-3 py-1.5 rounded-full relative"
          >
            <span className="text-xs text-sub">{attivita?.nome || "Reservi"}</span>
          </button>
          {showLogout && (
            <button
              onClick={signOut}
              className="card px-3 py-1.5 rounded-full flex items-center gap-1.5 text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut size={12} />
              <span className="text-xs font-medium">Esci</span>
            </button>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 pb-28 pt-4 max-w-lg mx-auto w-full">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50"
        style={{
          background: "var(--nav-bg)",
          backdropFilter: "blur(24px)",
          borderTop: "1px solid var(--nav-border)",
        }}
      >
        <div className="flex justify-around items-center max-w-lg mx-auto px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex flex-col items-center py-3 px-5 transition-all group"
              >
                {isActive && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-full gradient-green shadow-lg shadow-green-500/30" />
                )}
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                    isActive
                      ? "bg-[#22c55e]/10"
                      : "group-hover:bg-[var(--bg-card-hover)]"
                  }`}
                >
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.2 : 1.5}
                    className={`transition-colors ${
                      isActive ? "text-[#22c55e]" : "text-dim group-hover:text-sub"
                    }`}
                  />
                </div>
                <span
                  className={`text-[10px] mt-0.5 font-medium transition-colors ${
                    isActive ? "text-[#22c55e]" : "text-dim"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <DashboardContent>{children}</DashboardContent>
    </AuthProvider>
  );
}
