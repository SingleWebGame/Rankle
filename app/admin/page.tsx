import type { Metadata } from "next";
import Link from "next/link";
import { Activity, ArrowLeft, BarChart3, Clock3, Eye, MousePointer2, Trophy, Users } from "lucide-react";

export const metadata: Metadata = { title: "Admin dashboard", description: "Local demo dashboard with mock Rankle analytics." };

const metrics = [
  { label: "Daily users", value: "2,481", change: "+12.8%", icon: Users },
  { label: "Games played", value: "6,904", change: "+8.2%", icon: Activity },
  { label: "Average score", value: "3,280", change: "+3.1%", icon: Trophy },
  { label: "Session duration", value: "06:42", change: "+0:38", icon: Clock3 },
  { label: "Est. ad impressions", value: "11.2k", change: "Today", icon: Eye },
  { label: "Est. CTR", value: "1.84%", change: "Mock data", icon: MousePointer2 }
];
const bars = [
  ["Population", 88], ["Geography", 72], ["Movies", 64], ["Sports", 57], ["Technology", 51], ["Animals", 42]
];
const achievementRates = [["First win", 78], ["Perfect round", 46], ["7 day streak", 21], ["Century club", 8]];

export default function AdminPage() {
  return <main className="mx-auto min-h-screen max-w-7xl px-5 py-7 sm:px-8">
    <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/45 hover:text-white"><ArrowLeft size={15} />Back to Rankle</Link>
    <div className="mt-8 flex flex-wrap items-end justify-between gap-4"><div><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-[#c6f36b]"><BarChart3 size={15} />Operator view</div><h1 className="mt-2 text-4xl font-bold tracking-[-.06em]">The pulse<span className="text-[#c6f36b]">.</span></h1><p className="mt-2 text-sm text-white/45">A snapshot of the Rankle community.</p></div><span className="rounded-full border border-[#c6f36b]/20 bg-[#c6f36b]/[.06] px-3 py-1.5 text-xs font-semibold text-[#c6f36b]">LOCAL MOCK ANALYTICS</span></div>
    <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">{metrics.map(({ label, value, change, icon: Icon }) => <div key={label} className="rounded-2xl border border-white/[.08] bg-[#11141b] p-4"><div className="flex justify-between"><Icon size={16} className="text-white/40" /><span className="text-[10px] text-[#c6f36b]">{change}</span></div><div className="mt-4 text-2xl font-bold tracking-[-.04em]">{value}</div><div className="mt-1 text-[10px] text-white/40">{label}</div></div>)}</div>
    <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
      <section className="rounded-3xl border border-white/[.08] bg-[#11141b] p-5 sm:p-7"><div className="flex items-center justify-between"><div><h2 className="font-bold">Category popularity</h2><p className="mt-1 text-xs text-white/40">Share of games played today</p></div><span className="text-xs text-white/35">Last 24 hours</span></div><div className="mt-7 space-y-5">{bars.map(([category, value]) => <div key={category}><div className="mb-2 flex justify-between text-xs"><span className="font-semibold">{category}</span><span className="text-white/40">{value}%</span></div><div className="h-2 overflow-hidden rounded-full bg-white/[.06]"><div className="h-full rounded-full bg-gradient-to-r from-[#a58bff] to-[#c6f36b]" style={{ width: `${value}%` }} /></div></div>)}</div></section>
      <section className="rounded-3xl border border-white/[.08] bg-[#11141b] p-5 sm:p-7"><h2 className="font-bold">Achievement completion</h2><p className="mt-1 text-xs text-white/40">Percent of players who unlocked each</p><div className="mt-7 space-y-5">{achievementRates.map(([title, value]) => <div key={title}><div className="mb-2 flex justify-between text-xs"><span className="font-semibold">{title}</span><span className="text-white/40">{value}%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-white/[.06]"><div className="h-full rounded-full bg-[#c6f36b]" style={{ width: `${value}%` }} /></div></div>)}</div><div className="mt-7 rounded-2xl border border-white/[.06] bg-white/[.02] p-4 text-xs leading-5 text-white/40">Estimated ad impressions and CTR are illustrative placeholders. Connect your consent-aware analytics and AdSense accounts to replace these figures.</div></section>
    </div>
    <div className="mt-4 rounded-3xl border border-[#a58bff]/15 bg-[#a58bff]/[.04] p-5 text-sm text-white/55"><span className="font-semibold text-white">Premium architecture: </span>Feature flag is currently disabled. No subscription or payment collection is active.</div>
  </main>;
}
