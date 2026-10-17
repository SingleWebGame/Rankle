"use client";

import { useEffect, useRef, useState } from "react";
import { Award, CheckCircle2, X } from "lucide-react";
import type { InGameNotification } from "../lib/notifications";

type QueuedNotification = InGameNotification & { id: number };

const achievementTitles: Record<string, string> = {
  "first-win": "First win",
  "perfect-round": "Perfect round",
  "streak-7": "Week of wins",
  "streak-30": "Monthly regular",
  "games-100": "Century club",
  "top-score": "Personal best",
  "accuracy-king": "Accuracy king",
  "speed-master": "Speed master"
};

export function NotificationCenter() {
  const [queue, setQueue] = useState<QueuedNotification[]>([]);
  const nextId = useRef(0);
  const current = queue[0];

  useEffect(() => {
    function enqueue(notification: InGameNotification) {
      nextId.current += 1;
      setQueue((notifications) => [...notifications, { ...notification, id: nextId.current }]);
    }

    function handleNotification(event: Event) {
      const notification = (event as CustomEvent<InGameNotification>).detail;
      if (notification?.title && (notification.type === "quest" || notification.type === "achievement")) {
        enqueue(notification);
      }
    }

    function handleAchievements(event: Event) {
      const unlocked = (event as CustomEvent<string[]>).detail;
      if (!Array.isArray(unlocked)) return;
      unlocked.forEach((achievement) => enqueue({
        type: "achievement",
        title: achievementTitles[achievement] ?? achievement
      }));
    }

    window.addEventListener("rankle-notification", handleNotification);
    window.addEventListener("rankle-achievements", handleAchievements);
    return () => {
      window.removeEventListener("rankle-notification", handleNotification);
      window.removeEventListener("rankle-achievements", handleAchievements);
    };
  }, []);

  useEffect(() => {
    if (!current) return;
    const timeout = window.setTimeout(() => {
      setQueue((notifications) => notifications.filter((notification) => notification.id !== current.id));
    }, 5000);
    return () => window.clearTimeout(timeout);
  }, [current]);

  if (!current) return null;

  const achievement = current.type === "achievement";
  const Icon = achievement ? Award : CheckCircle2;

  return <div role="status" className="fixed right-4 top-4 z-[60] flex max-w-sm items-center gap-3 rounded-2xl border border-[#c6f36b]/25 bg-[#171c18] p-4 shadow-2xl sm:right-6 sm:top-6">
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#c6f36b]/10 text-[#c6f36b]"><Icon size={19} /></span>
    <div className="min-w-0 flex-1">
      <div className="text-[10px] font-bold uppercase tracking-[.18em] text-[#c6f36b]">{achievement ? "Achievement unlocked" : "Quest completed"}</div>
      <div className="mt-1 truncate text-sm font-bold">{current.title}</div>
      {current.description && <div className="mt-0.5 truncate text-xs text-white/55">{current.description}</div>}
    </div>
    <button
      type="button"
      onClick={() => setQueue((notifications) => notifications.filter((notification) => notification.id !== current.id))}
      aria-label="Dismiss notification"
      className="text-white/35 hover:text-white"
    ><X size={16} /></button>
  </div>;
}
