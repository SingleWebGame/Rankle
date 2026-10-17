"use client";

import { useEffect, useState } from "react";
import { Award, X } from "lucide-react";

const titles: Record<string, string> = {
  "first-win": "First win", "perfect-round": "Perfect round", "streak-7": "Week of wins",
  "streak-30": "Monthly regular", "games-100": "Century club", "top-score": "Personal best",
  "accuracy-king": "Accuracy king", "speed-master": "Speed master"
};

export function AchievementToast() {
  const [achievement, setAchievement] = useState<string | null>(null);
  useEffect(() => {
    const show = (event: Event) => {
      const unlocked = (event as CustomEvent<string[]>).detail;
      if (unlocked?.length) setAchievement(unlocked[0]);
    };
    window.addEventListener("rankle-achievements", show);
    return () => window.removeEventListener("rankle-achievements", show);
  }, []);
  useEffect(() => {
    if (!achievement) return;
    const timeout = window.setTimeout(() => setAchievement(null), 5000);
    return () => window.clearTimeout(timeout);
  }, [achievement]);
  if (!achievement) return null;
  return <div role="status" className="fixed right-4 top-4 z-[60] flex max-w-sm items-center gap-3 rounded-2xl border border-[#c6f36b]/25 bg-[#171c18] p-4 shadow-2xl sm:right-6 sm:top-6">
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#c6f36b]/10 text-[#c6f36b]"><Award size={19} /></span>
    <div className="min-w-0 flex-1"><div className="text-[10px] font-bold uppercase tracking-[.18em] text-[#c6f36b]">Achievement unlocked</div><div className="mt-1 truncate text-sm font-bold">{titles[achievement] ?? achievement}</div></div>
    <button onClick={() => setAchievement(null)} aria-label="Dismiss achievement" className="text-white/35 hover:text-white"><X size={16} /></button>
  </div>;
}
