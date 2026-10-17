"use client";

import { useEffect, useState } from "react";
import { loadStats } from "@/lib/storage";
import type { PlayerStats } from "@/types/game";

export function usePlayerStats(): PlayerStats | null {
  const [stats, setStats] = useState<PlayerStats | null>(null);
  useEffect(() => setStats(loadStats()), []);
  return stats;
}
