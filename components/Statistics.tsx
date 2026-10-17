"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Activity, ArrowRight, Award, CalendarDays, Coins, Gamepad2, Target, Trophy } from "lucide-react";
import { usePlayerStats } from "@/hooks/usePlayerStats";

const achievementList = [
  { id: "first-win", title: "First win", detail: "Score 2,500 or more in a game.", icon: Trophy },
  { id: "perfect-round", title: "Perfect round", detail: "Get every item in the right spot.", icon: Target },
  { id: "streak-7", title: "Week of wins", detail: "Keep a 7 day streak.", icon: CalendarDays },
  { id: "streak-30", title: "Monthly regular", detail: "Keep a 30 day streak.", icon: Award },
  { id: "games-100", title: "Century club", detail: "Play 100 games.", icon: Gamepad2 },
  { id: "top-score", title: "Personal best", detail: "Set a new high score.", icon: Activity },
  { id: "accuracy-king", title: "Accuracy king", detail: "Complete 10 perfect rounds.", icon: Target },
  { id: "speed-master", title: "Speed master", detail: "Finish a speed run.", icon: Activity }
];

export function Statistics() {
  const stats = usePlayerStats();
  const days = useMemo(() => Array.from({ length: 35 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (34 - index));
    return date.toISOString().slice(0, 10);
  }), []);
  if (!stats) return <div className="h-[600px] animate-pulse rounded-3xl bg-white/[.025]" aria-label="Loading statistics" />;
  const average = stats.gamesPlayed ? Math.round(stats.totalScore / stats.gamesPlayed) : 0;
  const winRate = stats.gamesPlayed ? Math.round(stats.gamesWon / stats.gamesPlayed * 100) : 0;
  const thisMonth = new Date().toISOString().slice(0, 7);
  const monthlyStreak = stats.playedDates.filter((date) => date.startsWith(thisMonth)).length;
  const playedSet = new Set(stats.playedDates);
  const categoryRows = Object.entries(stats.categoryScores).sort((a, b) => b[1].played - a[1].played);

  return <div className="mx-auto max-w-6xl px-5 pb-44 pt-8 sm:px-8 sm:pb-8">
    <div className="flex flex-wrap items-end justify-between gap-4"><div><div className="text-xs font-bold uppercase tracking-[.2em] text-[#c6f36b]">Your personal dashboard</div><h1 className="mt-2 text-4xl font-bold tracking-[-.06em] sm:text-5xl">The long game<span className="text-[#c6f36b]">.</span></h1><p className="mt-2 text-sm text-white/45">Every round adds up. Here&apos;s how you&apos;re doing.</p></div><div className="flex items-center gap-2 rounded-xl border border-[#c6f36b]/20 bg-[#c6f36b]/[.06] px-4 py-3 text-sm font-bold text-[#c6f36b]"><Coins size={17} />{stats.coins} coins</div></div>

    <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
      {[
        { label: "Games played", value: stats.gamesPlayed.toLocaleString(), icon: Gamepad2, tint: "text-[#a58bff]" },
        { label: "Win rate", value: `${winRate}%`, icon: Target, tint: "text-[#c6f36b]" },
        { label: "Average score", value: average.toLocaleString(), icon: Activity, tint: "text-[#71d5ff]" },
        { label: "Personal best", value: stats.bestScore.toLocaleString(), icon: Trophy, tint: "text-[#ffb46b]" }
      ].map(({ label, value, icon: Icon, tint }) => <div key={label} className="rounded-2xl border border-white/[.08] bg-[#11141b] p-4 sm:p-5"><Icon size={17} className={tint} /><div className="mt-4 text-2xl font-bold tracking-[-.04em] sm:text-3xl">{value}</div><div className="mt-1 text-xs text-white/40">{label}</div></div>)}
    </div>

    <div className="mt-4 grid gap-4 lg:grid-cols-[1.3fr_.7fr]">
      <section className="rounded-3xl border border-white/[.08] bg-[#11141b] p-5 sm:p-7">
        <div className="flex items-center justify-between"><div><h2 className="font-bold">Consistency calendar</h2><p className="mt-1 text-xs text-white/40">Your last 35 days</p></div><div className="flex items-center gap-2 text-xs text-white/40"><span>Less</span>{["bg-white/[.04]", "bg-[#c6f36b]/25", "bg-[#c6f36b]/55", "bg-[#c6f36b]"].map((tone) => <span key={tone} className={`h-3 w-3 rounded-[3px] ${tone}`} />)}<span>More</span></div></div>
        <div className="mt-6 grid grid-cols-7 gap-2 sm:grid-cols-7 sm:gap-2.5" aria-label="Played day calendar">
          {days.map((date) => <div key={date} title={date} aria-label={`${date}${playedSet.has(date) ? ", played" : ", no games"}`} className={`aspect-square rounded-md border ${playedSet.has(date) ? "border-[#c6f36b]/20 bg-[#c6f36b]/60" : "border-white/[.04] bg-white/[.035]"}`} />)}
        </div>
        <div className="mt-6 flex flex-wrap gap-6 border-t border-white/[.07] pt-5 text-xs"><div><span className="text-white/40">Current streak</span><div className="mt-1 font-bold text-[#ff9f6b]">{stats.currentStreak} days</div></div><div><span className="text-white/40">Best streak</span><div className="mt-1 font-bold">{stats.bestStreak} days</div></div><div><span className="text-white/40">This month</span><div className="mt-1 font-bold">{monthlyStreak} active days</div></div><div><span className="text-white/40">Perfect rounds</span><div className="mt-1 font-bold">{stats.perfectRounds}</div></div><div><span className="text-white/40">Rankings solved</span><div className="mt-1 font-bold">{stats.rankingsSolved}</div></div></div>
      </section>
      <section className="rounded-3xl border border-[#c6f36b]/15 bg-gradient-to-br from-[#c6f36b]/[.08] to-[#11141b] p-5 sm:p-7">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-[#c6f36b]"><CalendarDays size={15} />Keep showing up</div><div className="mt-4 text-4xl font-bold tracking-[-.06em]">{stats.currentStreak}<span className="ml-2 text-base font-medium text-white/45">day streak</span></div><p className="mt-3 text-sm leading-6 text-white/45">A little practice today keeps your streak growing. Your next daily challenge is ready.</p><Link href="/play/daily" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#c6f36b] px-4 py-3 text-sm font-bold text-[#11140d]">Play today <ArrowRight size={15} /></Link>
      </section>
    </div>

    <div className="mt-4 grid gap-4 lg:grid-cols-2">
      <section className="rounded-3xl border border-white/[.08] bg-[#11141b] p-5 sm:p-7"><div className="flex items-center justify-between"><div><h2 className="font-bold">Category performance</h2><p className="mt-1 text-xs text-white/40">Where your instincts shine</p></div><span className="text-xs text-white/35">{categoryRows.length} explored</span></div>
        {categoryRows.length ? <div className="mt-5 space-y-4">{categoryRows.slice(0, 7).map(([category, value]) => <div key={category}><div className="mb-2 flex justify-between text-xs"><span className="font-semibold">{category}</span><span className="text-white/40">{value.played} games · {Math.round(value.score / value.played).toLocaleString()} avg</span></div><div className="h-1.5 overflow-hidden rounded-full bg-white/[.06]"><div className="h-full rounded-full bg-[#a58bff]" style={{ width: `${Math.min(100, Math.round(value.score / value.played / 50))}%` }} /></div></div>)}</div> : <div className="mt-8 rounded-2xl border border-dashed border-white/10 p-6 text-center"><p className="text-sm text-white/45">Your category stats will show up after your first game.</p></div>}
      </section>
      <section className="rounded-3xl border border-white/[.08] bg-[#11141b] p-5 sm:p-7"><div className="flex items-center justify-between"><div><h2 className="font-bold">Achievement shelf</h2><p className="mt-1 text-xs text-white/40">Small wins, proudly earned</p></div><span className="rounded-full bg-white/[.06] px-2.5 py-1 text-xs font-bold">{stats.achievements.length}/{achievementList.length}</span></div>
        <div className="mt-5 grid grid-cols-2 gap-2">{achievementList.map(({ id, title, detail, icon: Icon }) => {
          const unlocked = stats.achievements.includes(id);
          return <div key={id} title={detail} className={`rounded-2xl border p-3 ${unlocked ? "border-[#c6f36b]/20 bg-[#c6f36b]/[.045]" : "border-white/[.06] bg-white/[.02] opacity-45"}`}><Icon size={17} className={unlocked ? "text-[#c6f36b]" : "text-white/40"} /><div className="mt-3 text-xs font-bold">{title}</div><div className="mt-1 text-[10px] leading-4 text-white/40">{detail}</div></div>;
        })}</div>
      </section>
    </div>
    <div className="mt-8 text-center text-xs text-white/30">Stats are saved on this device. Premium mode is coming soon.</div>
  </div>;
}
