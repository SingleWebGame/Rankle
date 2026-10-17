import Link from "next/link";
import { ArrowDownRight, ArrowRight, ArrowUpRight, CalendarDays, CircleHelp, Crown, Flame, Layers3, Sparkles, Trophy, Zap } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { AdResponsive } from "@/components/ads/AdResponsive";
import { AdStickyMobile } from "@/components/ads/AdStickyMobile";
import { EngagementPanel } from "@/components/EngagementPanel";

const modes = [
  { href: "/play/unlimited", name: "Unlimited", tag: "NO LIMITS", desc: "Keep the streak alive for as long as you like.", icon: Layers3, color: "text-[#a58bff]", tint: "bg-[#a58bff]/10" },
  { href: "/play/survival", name: "Survival", tag: "3 LIVES", desc: "One slip costs a heart. How far can you go?", icon: Flame, color: "text-[#ff9f6b]", tint: "bg-[#ff9f6b]/10" },
  { href: "/play/speed", name: "Speed run", tag: "2 MINUTES", desc: "Race the clock and stack up your best score.", icon: Zap, color: "text-[#71d5ff]", tint: "bg-[#71d5ff]/10" }
];

export default function HomePage() {
  return <>
    <SiteHeader />
    <main className="mx-auto max-w-7xl px-5 pb-44 sm:px-8 sm:pb-28">
      <section className="relative overflow-hidden rounded-[32px] border border-white/[.08] bg-[#11141b] px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
        <div className="pointer-events-none absolute -right-20 -top-44 h-[460px] w-[460px] rounded-full bg-[#c6f36b]/[.08] blur-[100px]" />
        <div className="pointer-events-none absolute right-[22%] top-10 h-56 w-56 rounded-full bg-[#a58bff]/[.06] blur-[90px]" />
        <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c6f36b]/20 bg-[#c6f36b]/[.06] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.13em] text-[#c6f36b]"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#c6f36b]" />The daily ranking game</div>
            <h1 className="max-w-2xl text-5xl font-bold leading-[.98] tracking-[-.075em] sm:text-7xl lg:text-[82px]">You know a lot.<br /><span className="text-gradient">Put it in order.</span></h1>
            <p className="mt-6 max-w-md text-base leading-7 text-white/50 sm:text-lg">Five quick rankings. One fresh challenge every day. Trust your gut, then see how close you got.</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/play/daily" className="focus-ring group flex items-center gap-3 rounded-2xl bg-[#c6f36b] px-5 py-4 text-sm font-bold text-[#11140d] shadow-[0_8px_35px_rgba(198,243,107,.12)] transition hover:-translate-y-0.5 hover:bg-[#d4f78b]">Play today&apos;s Rankle <ArrowRight size={17} className="transition group-hover:translate-x-1" /></Link>
              <Link href="/categories" className="focus-ring rounded-2xl border border-white/10 px-5 py-4 text-sm font-semibold text-white/75 transition hover:bg-white/[.05]">Browse categories</Link>
            </div>
            <div className="mt-7 flex items-center gap-3 text-xs text-white/40"><div className="flex -space-x-2">{["#c6f36b", "#a58bff", "#71d5ff", "#ff9f6b"].map((color) => <span key={color} className="h-6 w-6 rounded-full border-2 border-[#11141b]" style={{ background: color }} />)}</div><span>Curiosity looks good on you.</span></div>
          </div>
          <div className="relative mx-auto w-full max-w-[430px] lg:ml-auto">
            <div className="absolute -inset-7 rounded-[36px] bg-[#c6f36b]/[.04] blur-2xl" />
            <div className="glass soft-shadow relative rounded-[28px] p-5 sm:p-6">
              <div className="flex items-center justify-between"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.15em] text-[#c6f36b]"><CalendarDays size={15} />Today&apos;s challenge</div><span className="rounded-full bg-white/[.06] px-2.5 py-1 text-[10px] font-semibold text-white/45">5 ROUNDS</span></div>
              <div className="mt-5 text-2xl font-bold tracking-[-.05em]">Biggest by population<span className="text-[#c6f36b]">?</span></div>
              <div className="mt-1 text-xs text-white/40">Arrange these cities, largest to smallest</div>
              <div className="mt-5 space-y-2">
                {["Tokyo", "Delhi", "Shanghai", "São Paulo"].map((city, index) => <div key={city} className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 ${index === 0 ? "border-[#c6f36b]/25 bg-[#c6f36b]/[.06]" : "border-white/[.06] bg-white/[.025]"}`}>
                  <span className={`grid h-7 w-7 place-items-center rounded-lg text-[11px] font-bold ${index === 0 ? "bg-[#c6f36b]/15 text-[#c6f36b]" : "bg-white/[.05] text-white/40"}`}>{String(index + 1).padStart(2, "0")}</span><span className="flex-1 text-sm font-medium">{city}</span><span className="text-xs text-white/25">⠿</span>
                </div>)}
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-white/[.08] pt-4"><span className="flex items-center gap-2 text-xs text-white/40"><Sparkles size={14} className="text-[#c6f36b]" />A little knowledge goes a long way</span><span className="text-xs font-bold text-white/55">+1,000 max</span></div>
            </div>
            <div className="float absolute -right-3 -top-5 hidden items-center gap-2 rounded-2xl border border-white/10 bg-[#191d26] px-3 py-2.5 shadow-xl sm:flex"><span className="grid h-7 w-7 place-items-center rounded-lg bg-[#c6f36b]/10 text-[#c6f36b]"><Trophy size={14} /></span><span className="text-xs font-bold">Perfect round!</span></div>
            <div className="absolute -bottom-5 -left-4 hidden items-center gap-2 rounded-2xl border border-white/10 bg-[#191d26] px-3 py-2.5 shadow-xl sm:flex"><span className="grid h-7 w-7 place-items-center rounded-lg bg-[#ff9f6b]/10 text-[#ff9f6b]"><Flame size={14} /></span><span className="text-xs font-bold">7 day streak</span></div>
          </div>
        </div>
      </section>

      <section className="mt-7 hidden md:block"><AdResponsive placement="home" /></section>

      <section className="mt-14 sm:mt-20">
        <div className="mb-5 flex items-end justify-between"><div><div className="text-xs font-bold uppercase tracking-[.2em] text-[#c6f36b]">Play your way</div><h2 className="mt-2 text-2xl font-bold tracking-[-.04em] sm:text-3xl">A mode for every mood.</h2></div><Link href="/categories" className="hidden items-center gap-1 text-sm font-semibold text-white/45 hover:text-white sm:flex">All categories <ArrowUpRight size={15} /></Link></div>
        <div className="grid gap-3 md:grid-cols-3">
          {modes.map(({ href, name, tag, desc, icon: Icon, color, tint }) => <Link key={name} href={href} className="group rounded-2xl border border-white/[.08] bg-[#10131a] p-5 transition hover:-translate-y-0.5 hover:border-white/[.16] hover:bg-[#141720] sm:p-6">
            <div className="flex items-start justify-between"><span className={`grid h-11 w-11 place-items-center rounded-xl ${tint} ${color}`}><Icon size={19} /></span><span className="rounded-full border border-white/[.08] px-2.5 py-1 text-[9px] font-bold tracking-[.14em] text-white/35">{tag}</span></div>
            <h3 className="mt-5 text-lg font-bold">{name}</h3><p className="mt-1 text-sm text-white/45">{desc}</p><div className={`mt-5 flex items-center gap-1 text-xs font-bold ${color}`}>Jump in <ArrowRight size={14} className="transition group-hover:translate-x-1" /></div>
          </Link>)}
        </div>
      </section>

      <EngagementPanel />

      <section className="mt-14 grid gap-3 lg:grid-cols-[1.25fr_.75fr]">
        <div className="relative overflow-hidden rounded-3xl border border-white/[.08] bg-[#10131a] p-6 sm:p-8">
          <div className="pointer-events-none absolute -right-12 -top-24 h-56 w-56 rounded-full bg-[#a58bff]/[.09] blur-[75px]" />
          <div className="relative flex h-full flex-col justify-between gap-8 sm:flex-row sm:items-center"><div><div className="text-xs font-bold uppercase tracking-[.2em] text-[#a58bff]">Your next rabbit hole</div><h2 className="mt-3 text-2xl font-bold tracking-[-.04em]">14 categories.<br />Infinite things to learn.</h2><p className="mt-3 max-w-sm text-sm leading-6 text-white/45">From the tallest peaks to the biggest box offices. Pick a topic and put your instincts to work.</p><Link href="/categories" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white">Explore all categories <ArrowRight size={16} /></Link></div><div className="grid grid-cols-3 gap-2 self-start sm:self-center">{["🌍","🏎️","🎬","🪐","🎵","🦒"].map((emoji, i) => <div key={i} className="grid h-14 w-14 place-items-center rounded-2xl border border-white/[.07] bg-white/[.03] text-2xl sm:h-16 sm:w-16">{emoji}</div>)}</div></div>
        </div>
        <div className="flex flex-col justify-between rounded-3xl border border-[#c6f36b]/15 bg-gradient-to-br from-[#c6f36b]/[.08] to-[#11141a] p-6 sm:p-8">
          <div><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-[#c6f36b]"><Crown size={14} />Your streak</div><h2 className="mt-4 text-2xl font-bold tracking-[-.04em]">Small ritual.<br />Big brain energy.</h2><p className="mt-3 text-sm leading-6 text-white/45">A fresh daily set waits every day. Keep your streak growing, earn coins, and build your personal best.</p></div>
          <Link href="/stats" className="mt-6 flex items-center justify-between rounded-xl border border-white/[.08] bg-black/15 px-4 py-3 text-sm font-semibold"><span>See your progress</span><ArrowDownRight size={16} className="text-[#c6f36b]" /></Link>
        </div>
      </section>

      <section className="mt-14 rounded-3xl border border-white/[.07] bg-white/[.02] p-6 sm:p-8">
        <div className="flex items-start gap-4"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[.05] text-white/55"><CircleHelp size={18} /></div><div><h2 className="font-bold">How to play Rankle</h2><p className="mt-1 max-w-3xl text-sm leading-6 text-white/45">Drag the five items into the order you think is right, then lock it in. Exact positions earn the most points, but near misses still count. Read the answer notes, collect coins, and come back tomorrow for a brand-new daily challenge.</p></div></div>
      </section>
      <footer className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/[.07] py-6 text-xs text-white/35"><span>Made for curious minds. Rankle © {new Date().getFullYear()}</span><div className="flex gap-4"><Link href="/stats" className="hover:text-white">Statistics</Link><Link href="/categories" className="hover:text-white">Categories</Link><Link href="/admin" className="hover:text-white">Admin preview</Link></div></footer>
    </main>
    <AdStickyMobile />
  </>;
}
