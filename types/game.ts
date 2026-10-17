export type Category =
  | "Population" | "Geography" | "Sports" | "Technology" | "Cars" | "Luxury"
  | "Finance" | "Movies" | "Music" | "Animals" | "Businesses" | "Space"
  | "Science" | "History";

export type RankingItem = {
  label: string;
  value: number;
  displayValue: string;
  explanation: string;
};

export type Puzzle = {
  id: string;
  category: Category;
  title: string;
  prompt: string;
  unit: string;
  items: RankingItem[];
  sourceNote?: string;
};

export type GameMode = "daily" | "unlimited" | "survival" | "speed" | "category";
export type RoundResult = {
  score: number;
  exact: number;
  cells: Array<"perfect" | "close" | "wrong">;
  perfect: boolean;
};

export type PlayerStats = {
  gamesPlayed: number;
  gamesWon: number;
  totalScore: number;
  bestScore: number;
  rankingsSolved: number;
  perfectRounds: number;
  categoryScores: Record<string, { played: number; score: number }>;
  lastPlayedDate: string;
  currentStreak: number;
  bestStreak: number;
  playedDates: string[];
  coins: number;
  achievements: string[];
};
