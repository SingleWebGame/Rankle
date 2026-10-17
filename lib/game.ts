import { challenges } from "@/data/challenges";
import type { GameMode, Puzzle, RoundResult } from "@/types/game";

export const ROUNDS_PER_GAME = 5;

export function seededIndex(seed: string, max: number): number {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) % max;
}

export function getRoundSet(mode: GameMode, date = new Date(), category?: string): Puzzle[] {
  const dailyKey = date.toISOString().slice(0, 10);
  const available = category ? challenges.filter((puzzle) => puzzle.category === category) : challenges;
  const pool = available.length ? available : challenges;
  const start = mode === "daily" ? seededIndex(dailyKey, pool.length) : Math.floor(Math.random() * pool.length);
  return Array.from({ length: mode === "survival" || mode === "speed" ? 100 : ROUNDS_PER_GAME }, (_, i) =>
    pool[(start + i) % pool.length]
  );
}

export function scoreRound(ordered: Puzzle["items"], correct: Puzzle["items"], elapsedSeconds: number, streak: number): RoundResult {
  const positions = new Map(correct.map((item, index) => [item.label, index]));
  const cells = ordered.map((item, index) => {
    const distance = Math.abs(index - (positions.get(item.label) ?? index));
    return distance === 0 ? "perfect" as const : distance === 1 ? "close" as const : "wrong" as const;
  });
  const exact = cells.filter((cell) => cell === "perfect").length;
  const distance = ordered.reduce((sum, item, index) => sum + Math.abs(index - (positions.get(item.label) ?? index)), 0);
  const accuracy = Math.max(0, 1 - distance / 12);
  const speedBonus = Math.max(0, Math.round((60 - Math.min(60, elapsedSeconds)) * 3));
  const streakBonus = streak > 1 ? Math.min(streak - 1, 5) * 40 : 0;
  const baseScore = exact === correct.length ? 1000 : Math.round(accuracy * 800 + exact * 25);
  const score = baseScore + speedBonus + streakBonus;
  return { score, exact, cells, perfect: exact === correct.length };
}

export function getDailyNumber(date = new Date()): number {
  const start = new Date("2025-01-01T00:00:00Z").getTime();
  return Math.max(1, Math.floor((Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) - start) / 86400000) + 1);
}

export function resultEmoji(results: RoundResult[]): string {
  return results.map((round) => round.cells.map((cell) => cell === "perfect" ? "🟩" : cell === "close" ? "🟨" : "🟥").join("")).join("\n");
}
