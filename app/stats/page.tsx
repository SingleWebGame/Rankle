import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { Statistics } from "@/components/Statistics";
import { AdResponsive } from "@/components/ads/AdResponsive";
import { AdStickyMobile } from "@/components/ads/AdStickyMobile";
import { RewardShop } from "@/components/RewardShop";

export const metadata: Metadata = { title: "Your statistics", description: "Track your Rankle scores, streaks, and category performance." };

export default function StatsPage() {
  return <><SiteHeader /><div className="mx-auto max-w-6xl px-5 pt-4 sm:px-8"><div className="hidden md:block"><AdResponsive placement="stats" /></div></div><Statistics /><div className="mx-auto max-w-6xl px-5 sm:px-8"><RewardShop /></div><AdStickyMobile /></>;
}
