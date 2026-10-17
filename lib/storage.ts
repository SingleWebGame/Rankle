"use client";

import type { PlayerStats } from "@/types/game";
import { trackEvent } from "@/lib/analytics";

const STORAGE_KEY = "rankle-player-v1";
const blankStats = (): PlayerStats => ({
  gamesPlayed: 0, gamesWon: 0, totalScore: 0, bestScore: 0, rankingsSolved: 0,
  perfectRounds: 0, categoryScores: {}, lastPlayedDate: "", currentStreak: 0,
  bestStreak: 0, playedDates: [], coins: 0, achievements: []
});

export function loadStats(): PlayerStats {
  if (typeof window === "undefined") return blankStats();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? { ...blankStats(), ...JSON.parse(raw) as Partial<PlayerStats> } : blankStats();
  } catch (error) {
    console.error("Unable to read saved Rankle stats", error);
    return blankStats();
  }
}

export function saveStats(stats: PlayerStats): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error("Unable to save Rankle stats", error);
  }
}

export function recordGame(score: number, perfectRounds: number, categories: string[], mode?: string): PlayerStats {
  const stats = loadStats();
  const previousBest = stats.bestScore;
  const today = new Date().toISOString().slice(0, 10);
  if (stats.lastPlayedDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    stats.currentStreak = stats.lastPlayedDate === yesterday ? stats.currentStreak + 1 : 1;
    stats.bestStreak = Math.max(stats.bestStreak, stats.currentStreak);
    stats.lastPlayedDate = today;
    stats.playedDates = [...new Set([...stats.playedDates, today])].slice(-365);
    trackEvent("streak_updated", { current_streak: stats.currentStreak, best_streak: stats.bestStreak });
  }
  stats.gamesPlayed += 1;
  stats.gamesWon += score >= 2500 ? 1 : 0;
  stats.totalScore += score;
  stats.bestScore = Math.max(stats.bestScore, score);
  stats.rankingsSolved += categories.length;
  stats.perfectRounds += perfectRounds;
  let coinsEarned = 20 + perfectRounds * 10 + (score >= 2500 ? 10 : 0) + (score >= 4000 ? 25 : 0) + Math.min(stats.currentStreak, 7) * 5;
  categories.forEach((category) => {
    const record = stats.categoryScores[category] ?? { played: 0, score: 0 };
    stats.categoryScores[category] = { played: record.played + 1, score: record.score + Math.round(score / categories.length) };
  });
  const unlocked: string[] = [];
  const unlock = (id: string, condition: boolean) => {
    if (condition && !stats.achievements.includes(id)) {
      stats.achievements.push(id);
      unlocked.push(id);
    }
  };
  unlock("first-win", score >= 2500);
  unlock("perfect-round", perfectRounds > 0);
  unlock("streak-7", stats.currentStreak >= 7);
  unlock("streak-30", stats.currentStreak >= 30);
  unlock("games-100", stats.gamesPlayed >= 100);
  unlock("top-score", score > previousBest);
  unlock("accuracy-king", stats.perfectRounds >= 10);
  unlock("speed-master", mode === "speed");
  coinsEarned += unlocked.length * 25;
  stats.coins += coinsEarned;
  saveStats(stats);
  if (unlocked.length) window.dispatchEvent(new CustomEvent("rankle-achievements", { detail: unlocked }));
  unlocked.forEach((achievement) => trackEvent("achievement_unlocked", { achievement }));
  return stats;
}
