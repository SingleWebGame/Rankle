"use client";

import { useEffect, useState } from "react";
import { Check, Coins, LockKeyhole, Sparkles } from "lucide-react";
import { loadStats, saveStats } from "@/lib/storage";
import type { PlayerStats } from "@/types/game";

const rewards = [
  { id: "theme-violet", name: "Violet hour", type: "Theme", cost: 120, color: "#a58bff", icon: "◈" },
  { id: "theme-ocean", name: "Deep current", type: "Theme", cost: 160, color: "#71d5ff", icon: "⌁" },
  { id: "avatar-orbit", name: "Orbit", type: "Avatar", cost: 80, color: "#ff9f6b", icon: "✦" },
  { id: "avatar-sprout", name: "Sprout", type: "Avatar", cost: 80, color: "#c6f36b", icon: "❋" },
  { id: "badge-flawless", name: "Flawless", type: "Badge", cost: 220, color: "#ffcf68", icon: "✧" },
  { id: "animation-spark", name: "Spark finish", type: "Animation", cost: 300, color: "#f69ac5", icon: "✳" }
];
type Inventory = { owned: string[]; equipped: string };

export function RewardShop() {
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [inventory, setInventory] = useState<Inventory>({ owned: [], equipped: "" });
  useEffect(() => {
    setStats(loadStats());
    try {
      const saved = window.localStorage.getItem("rankle-cosmetics");
      if (saved) {
        const value = JSON.parse(saved) as Partial<Inventory>;
        setInventory({
          owned: Array.isArray(value.owned) ? value.owned.filter((id): id is string => typeof id === "string") : [],
          equipped: typeof value.equipped === "string" ? value.equipped : ""
        });
      }
    } catch (error) {
      console.error("Unable to read Rankle cosmetics", error);
    }
  }, []);

  function selectReward(id: string, cost: number) {
    if (!stats) return;
    if (!inventory.owned.includes(id)) {
      if (stats.coins < cost) return;
      const updatedStats = { ...stats, coins: stats.coins - cost };
      const updatedInventory = { ...inventory, owned: [...inventory.owned, id], equipped: id };
      saveStats(updatedStats);
      setStats(updatedStats);
      setInventory(updatedInventory);
      window.localStorage.setItem("rankle-cosmetics", JSON.stringify(updatedInventory));
      return;
    }
    const updatedInventory = { ...inventory, equipped: id };
    setInventory(updatedInventory);
    window.localStorage.setItem("rankle-cosmetics", JSON.stringify(updatedInventory));
  }

  return <section className="mt-4 rounded-3xl border border-white/[.08] bg-[#11141b] p-5 sm:p-7">
    <div className="flex flex-wrap items-center justify-between gap-3"><div><div className="flex items-center gap-2"><Sparkles size={17} className="text-[#c6f36b]" /><h2 className="font-bold">The little luxuries</h2></div><p className="mt-1 text-xs text-white/40">Spend coins on themes, avatars, badges, and celebrations.</p></div><div className="flex items-center gap-1.5 rounded-full bg-[#c6f36b]/[.08] px-3 py-2 text-xs font-bold text-[#c6f36b]"><Coins size={14} />{stats?.coins ?? 0}</div></div>
    <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">{rewards.map((reward) => {
      const owned = inventory.owned.includes(reward.id);
      const equipped = inventory.equipped === reward.id;
      const affordable = (stats?.coins ?? 0) >= reward.cost;
      return <button key={reward.id} disabled={!owned && !affordable} onClick={() => selectReward(reward.id, reward.cost)} className={`rounded-2xl border p-3 text-left transition ${equipped ? "border-[#c6f36b]/35 bg-[#c6f36b]/[.05]" : "border-white/[.07] bg-white/[.02] hover:border-white/[.16]"} disabled:cursor-not-allowed disabled:opacity-45`}>
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/[.05] text-lg" style={{ color: reward.color }}>{reward.icon}</span>
        <span className="mt-3 block text-xs font-bold">{reward.name}</span><span className="mt-1 block text-[10px] text-white/40">{reward.type}</span>
        <span className={`mt-3 flex items-center gap-1 text-[10px] font-bold ${equipped ? "text-[#c6f36b]" : "text-white/45"}`}>{equipped ? <><Check size={12} />Equipped</> : owned ? "Equip" : affordable ? <><Coins size={11} />{reward.cost}</> : <><LockKeyhole size={11} />{reward.cost}</>}</span>
      </button>;
    })}</div>
    <p className="mt-4 text-[10px] leading-4 text-white/30">Cosmetics are saved on this device. Items currently change your collection and equipped badge.</p>
  </section>;
}
