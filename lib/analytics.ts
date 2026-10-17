"use client";

type AnalyticsEvent =
  | "game_start" | "puzzle_submit" | "puzzle_complete" | "game_complete"
  | "category_selected" | "achievement_unlocked" | "streak_updated"
  | "share_clicked" | "ad_impression" | "ad_click";

declare global {
  interface Window { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] }
}

export function trackEvent(event: AnalyticsEvent, params: Record<string, string | number | boolean> = {}): void {
  if (typeof window === "undefined") return;
  const consent = window.localStorage.getItem("rankle-consent");
  if (consent !== "all" && consent !== "analytics") return;
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!id) return;
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = window.gtag ?? function gtag(...args: unknown[]) { window.dataLayer?.push(args); };
  window.gtag("event", event, params);
}
