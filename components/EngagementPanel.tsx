"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, Gift, Sparkles } from "lucide-react";
import { usePlayerStats } from "@/hooks/usePlayerStats";

function thisWeek(date: string) {
  const value = new Date(`${date}T00:00:00`);
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  start.setHours(0, 0, 0, 0);
  return value >= start && value <= now;
}

export function EngagementPanel() {
  const stats = usePlayerStats();
  const weeklyProgress = stats ? Math.min(5, stats.playedDates.filter(thisWeek).length) : 0;
  const month = new Date().toISOString().slice(0, 7);
  const monthlyProgress = stats ? Math.min(20, stats.playedDates.filter((date) => date.startsWith(month)).length) : 0;
  const weeklyPercent = Math.round(weeklyProgress / 5 * 100);
  const monthlyPercent = Math.round(monthlyProgress / 20 * 100);

  return <section className="mt-14">
    <div className="mb-5"><div className="text-xs font-bold uppercase tracking-[.2em] text-[#c6f36b]">A little momentum</div><h2 className="mt-2 text-2xl font-bold tracking-[-.04em]">Your next mini-milestone.</h2></div>
    <div className="grid gap-3 md:grid-cols-3">
      <div className="rounded-2xl border border-white/[.08] bg-[#11141a] p-5">
        <div className="flex items-center justify-between"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#a58bff]/10 text-[#a58bff]"><CalendarDays size={17} /></span><span className="text-[10px] font-bold uppercase tracking-[.16em] text-white/35">Weekly</span></div>
        <h3 className="mt-4 text-base font-bold">The regular</h3><p className="mt-1 text-xs text-white/45">Play on 5 different days this week.</p>
        <div className="mt-4 flex justify-between text-[10px] text-white/40"><span>{weeklyProgress}/5 days</span><span>+50 coins</span></div><div className="mt-2 h-1.5 rounded-full bg-white/[.07]"><div className="h-full rounded-full bg-[#a58bff] transition-all" style={{ width: `${weeklyPercent}%` }} /></div>
      </div>
      <div className="rounded-2xl border border-white/[.08] bg-[#11141a] p-5">
        <div className="flex items-center justify-between"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#71d5ff]/10 text-[#71d5ff]"><Sparkles size={17} /></span><span className="text-[10px] font-bold uppercase tracking-[.16em] text-white/35">Monthly</span></div>
        <h3 className="mt-4 text-base font-bold">Curiosity club</h3><p className="mt-1 text-xs text-white/45">Complete 20 daily sessions this month.</p>
        <div className="mt-4 flex justify-between text-[10px] text-white/40"><span>{monthlyProgress}/20 sessions</span><span>Rare badge</span></div><div className="mt-2 h-1.5 rounded-full bg-white/[.07]"><div className="h-full rounded-full bg-[#71d5ff] transition-all" style={{ width: `${monthlyPercent}%` }} /></div>
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-[#ff9f6b]/20 bg-gradient-to-br from-[#ff9f6b]/[.08] to-[#11141a] p-5">
        <div className="absolute -right-8 -top-9 h-28 w-28 rounded-full bg-[#ff9f6b]/10 blur-2xl" />
        <div className="relative flex items-center justify-between"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#ff9f6b]/10 text-[#ff9f6b]"><Gift size={17} /></span><span className="text-[10px] font-bold uppercase tracking-[.16em] text-[#ffb58e]">Limited time</span></div>
        <h3 className="relative mt-4 text-base font-bold">Curiosity week</h3><p className="relative mt-1 text-xs text-white/45">Five daily rankings. One exclusive badge.</p>
        <Link href="/play/daily" className="relative mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#ffb58e]">Take the challenge <ArrowRight size={13} /></Link>
      </div>
    </div>
  </section>;
}
