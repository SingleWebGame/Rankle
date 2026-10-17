"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Flame, Gamepad2, Layers3 } from "lucide-react";
import { usePlayerStats } from "@/hooks/usePlayerStats";
import { InstallAppButton } from "@/components/InstallAppButton";

const links = [
  { href: "/", label: "Play", icon: Gamepad2 },
  { href: "/categories", label: "Explore", icon: Layers3 },
  { href: "/stats", label: "Stats", icon: BarChart3 }
];

export function SiteHeader() {
  const pathname = usePathname();
  const stats = usePlayerStats();
  return <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
    <Link href="/" className="focus-ring flex items-center gap-2 rounded-xl" aria-label="Rankle home">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#c6f36b] text-[#10130d]">
        <span className="text-lg font-black tracking-[-.12em]">R.</span>
      </span>
      <span className="text-[19px] font-bold tracking-[-.06em]">rankle<span className="text-[#c6f36b]">.</span></span>
    </Link>
    <nav aria-label="Main navigation" className="hidden items-center gap-1 rounded-full border border-white/[.07] bg-white/[.025] p-1 sm:flex">
      {links.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || (href !== "/" && pathname.startsWith(href));
        return <Link key={href} href={href} className={`focus-ring flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium transition ${active ? "bg-white/[.08] text-white" : "text-white/50 hover:text-white"}`}>
          <Icon size={15} />{label}
        </Link>;
      })}
    </nav>
    <div className="flex items-center gap-2">
      <InstallAppButton />
      <div className="flex items-center gap-2 rounded-full border border-white/[.08] bg-white/[.035] px-3 py-2 text-sm">
        <Flame size={15} className="text-[#ff9f6b]" aria-hidden="true" /><span className="font-semibold">{stats?.currentStreak ?? 0}</span>
        <span className="hidden text-white/45 sm:inline">day streak</span>
      </div>
    </div>
    <nav aria-label="Mobile navigation" className="fixed inset-x-0 bottom-0 z-30 flex justify-around border-t border-white/10 bg-[#090b11]/95 px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl sm:hidden">
      {links.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className={`flex min-w-16 flex-col items-center gap-1 p-2 text-[10px] ${pathname === href ? "text-[#c6f36b]" : "text-white/45"}`}>
        <Icon size={18} />{label}
      </Link>)}
    </nav>
  </header>;
}
