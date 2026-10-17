"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, Check, Clock3, GripVertical, Heart, RotateCcw, Sparkles, Trophy } from "lucide-react";
import { AdInline } from "@/components/ads/AdInline";
import { AdResponsive } from "@/components/ads/AdResponsive";
import { ShareCard } from "@/components/ShareCard";
import { Button } from "@/components/ui/button";
import { notifyInGame } from "@/lib/notifications";
import { challenges, categories } from "@/data/challenges";
import { getRoundSet, scoreRound } from "@/lib/game";
import { loadStats, recordGame } from "@/lib/storage";
import { trackEvent } from "@/lib/analytics";
import type { GameMode, Puzzle, RoundResult, PlayerStats } from "@/types/game";

function SortableItem({ id, label, index, revealed, correct }: { id: string; label: string; index: number; revealed: boolean; correct: boolean }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    transition: { duration: 220, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" }
  });
  return <li ref={setNodeRef} {...attributes} {...listeners} aria-label={`Drag ${label} to reorder`} style={{ transform: CSS.Transform.toString(transform), transition }}
    className={`group flex cursor-grab touch-none select-none items-center gap-3 rounded-2xl border px-3 py-3.5 transition-[border-color,background-color,box-shadow] duration-200 ease-out sm:px-4 ${isDragging ? "z-10 scale-[1.015] cursor-grabbing border-[#c6f36b]/60 bg-[#22291c] shadow-[0_22px_55px_rgba(0,0,0,.48)]" : "border-white/[.075] bg-[#151821] hover:border-white/[.16]"} ${revealed ? correct ? "border-emerald-400/40 bg-emerald-400/[.08]" : "border-rose-400/35 bg-rose-400/[.07]" : ""}`}>
    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs font-bold ${revealed && correct ? "bg-emerald-400/15 text-emerald-300" : revealed ? "bg-rose-400/10 text-rose-300" : "bg-white/[.055] text-white/45"}`}>{String(index + 1).padStart(2, "0")}</span>
    <span className="min-w-0 flex-1 text-[14px] font-medium">{label}</span>
    {revealed && (correct ? <Check size={16} className="text-emerald-300" /> : <span className="text-xs text-rose-300">Not here</span>)}
    {!revealed && <span aria-hidden="true" className={`rounded-lg p-2 text-white/30 transition-colors group-hover:text-white/75 ${isDragging ? "text-[#c6f36b]" : ""}`}><GripVertical size={17} /></span>}
  </li>;
}

function displayCorrectOrder(puzzle: Puzzle) {
  return [...puzzle.items].sort((a, b) => b.value - a.value);
}

function shuffleForRound(puzzle: Puzzle, round: number) {
  const hash = (value: string) => Array.from(value).reduce((result, character) => Math.imul(result ^ character.charCodeAt(0), 16777619) >>> 0, 2166136261);
  return [...puzzle.items].sort((a, b) => hash(`${puzzle.id}:${round}:${a.label}`) - hash(`${puzzle.id}:${round}:${b.label}`));
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(seconds % 60).padStart(2, "0")}`;
}

export function GameClient({ mode, category }: { mode: GameMode; category?: string }) {
  const pool = useMemo(() => getRoundSet(mode, new Date(), category), [mode, category]);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
  const [tutorialReady, setTutorialReady] = useState(false);
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [roundIndex, setRoundIndex] = useState(0);
  const [items, setItems] = useState<Puzzle["items"]>([]);
  const [results, setResults] = useState<RoundResult[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [roundStartedAt, setRoundStartedAt] = useState(0);
  const [lives, setLives] = useState(3);
  const [remaining, setRemaining] = useState(120);
  const [finalStats, setFinalStats] = useState<PlayerStats | null>(null);
  const puzzle = pool[roundIndex] ?? challenges[0];
  const finished = finalStats !== null;
  const unlimited = mode === "unlimited" || mode === "category";
  const targetRounds = mode === "survival" || mode === "speed" ? Number.POSITIVE_INFINITY : 5;

  useEffect(() => {
    try {
      setTutorialOpen(window.localStorage.getItem("rankle-tutorial-seen") !== "true");
    } catch (error) {
      console.error("Unable to read saved Rankle tutorial state", error);
      setTutorialOpen(true);
    }
    setTutorialReady(true);
  }, []);

  useEffect(() => {
    if (!tutorialReady || tutorialOpen) return;
    setItems(shuffleForRound(puzzle, roundIndex));
    setSubmitted(false);
    setRoundStartedAt(Date.now());
  }, [puzzle, roundIndex, tutorialReady, tutorialOpen]);

  useEffect(() => {
    if (mode !== "speed" || finished || !tutorialReady || tutorialOpen) return;
    const timer = window.setInterval(() => setRemaining((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [mode, finished, tutorialReady, tutorialOpen]);

  const finishGame = useCallback((finalScore: number, finalResults: RoundResult[]) => {
    const completedCategories = Array.from({ length: finalResults.length }, (_, index) => pool[index % pool.length].category);
    const previousCoins = loadStats().coins;
    const stats = recordGame(finalScore, finalResults.filter((round) => round.perfect).length, completedCategories, mode);
    setFinalStats(stats);
    setCoinsEarned(stats.coins - previousCoins);
    trackEvent("game_complete", { mode, score: finalScore, rounds: finalResults.length });
  }, [mode, pool]);

  useEffect(() => {
    if (mode === "speed" && remaining === 0 && !finished) finishGame(score, results);
  }, [mode, remaining, finished, results, score, finishGame]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((current) => {
        const oldIndex = current.findIndex((item) => item.label === active.id);
        const newIndex = current.findIndex((item) => item.label === over.id);
        return arrayMove(current, oldIndex, newIndex);
      });
    }
  }

  function submit() {
    const previousPerfectStreak = [...results].reverse().findIndex((result) => !result.perfect);
    const streakCount = results.length > 0 && results.at(-1)?.perfect ? (previousPerfectStreak === -1 ? results.length : previousPerfectStreak) + 1 : 0;
    const round = scoreRound(items, displayCorrectOrder(puzzle), (Date.now() - roundStartedAt) / 1000, streakCount);
    setSubmitted(true);
    setResults((previous) => [...previous, round]);
    setScore((previous) => previous + round.score);
    notifyInGame({
      type: "quest",
      title: `${puzzle.category} ranking complete`,
      description: `+${round.score.toLocaleString()} points`
    });
    trackEvent("puzzle_submit", { category: puzzle.category, exact: round.exact, score: round.score });
    trackEvent("puzzle_complete", { category: puzzle.category, perfect: round.perfect });
    if (mode === "survival" && !round.perfect) setLives((value) => value - 1);
  }

  function continueGame() {
    const gameOver = (mode === "survival" && lives <= 0) || (mode === "speed" && remaining <= 0) || (!unlimited && mode !== "speed" && roundIndex + 1 >= targetRounds);
    if (gameOver) {
      finishGame(score, results);
      return;
    }
    setRoundIndex((value) => (value + 1) % pool.length);
  }

  function restart() {
    setRoundIndex(0);
    setItems([]);
    setResults([]);
    setScore(0);
    setCoinsEarned(0);
    setLives(3);
    setRemaining(120);
    setFinalStats(null);
    trackEvent("game_start", { mode });
  }

  function acknowledgeTutorial() {
    try {
      window.localStorage.setItem("rankle-tutorial-seen", "true");
    } catch (error) {
      console.error("Unable to save Rankle tutorial state", error);
    }
    setTutorialOpen(false);
  }

  useEffect(() => {
    if (tutorialReady && !tutorialOpen) trackEvent("game_start", { mode });
  }, [mode, tutorialReady, tutorialOpen]);

  if (finished) return <main className="mx-auto w-full max-w-4xl px-5 pb-28 pt-8 sm:px-8">
    <div className="mb-8 text-center"><div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-[#c6f36b]/10 text-[#c6f36b]"><Trophy /></div>
      <p className="text-xs font-bold uppercase tracking-[.25em] text-[#c6f36b]">Run complete</p><h1 className="mt-2 text-4xl font-bold tracking-[-.05em]">That&apos;s a wrap.</h1>
      <p className="mt-2 text-white/50">You earned <span className="font-bold text-white">{score.toLocaleString()}</span> points and <span className="font-bold text-[#c6f36b]">{coinsEarned} coins</span>.</p>
    </div>
    <div className="mb-6"><ShareCard score={score} results={results} mode={mode} /></div>
    <AdInline placement="results" />
    <div className="mt-6 flex flex-wrap justify-center gap-3">
      <button onClick={restart} className="flex items-center gap-2 rounded-xl bg-[#c6f36b] px-5 py-3 text-sm font-bold text-[#11140d]"><RotateCcw size={16} />Play again</button>
      <Link href="/stats" className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-white/75">Your stats</Link>
      <Link href="/" className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-white/75">Home</Link>
    </div>
    <p className="mt-4 text-center text-xs text-white/35">Current streak: {finalStats.currentStreak} day{finalStats.currentStreak === 1 ? "" : "s"} · {finalStats.coins} coins banked</p>
  </main>;

  const revealedOrder = displayCorrectOrder(puzzle);
  const roundResult = submitted ? results.at(-1) : undefined;
  const perfectStreak = roundResult?.perfect;
  const progress = mode === "speed" ? (remaining / 120) * 100 : mode === "survival" ? (lives / 3) * 100 : (roundIndex / 5) * 100;

  return <main className="mx-auto w-full max-w-7xl px-5 pb-28 pt-5 sm:px-8 sm:pt-10">
    {tutorialReady && tutorialOpen && <div className="fixed inset-0 z-[60] grid place-items-center overflow-y-auto bg-black/75 p-5 backdrop-blur-sm">
      <section role="dialog" aria-modal="true" aria-labelledby="tutorial-title" className="my-auto w-full max-w-lg rounded-3xl border border-white/10 bg-[#141720] p-6 shadow-2xl sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-[#c6f36b]">Quick tutorial</p>
        <h2 id="tutorial-title" className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">How to play Rankle</h2>
        <p className="mt-2 text-sm leading-6 text-white/55">Put your instincts to the test in each ranking round.</p>
        <ol className="mt-6 space-y-4 text-sm leading-6 text-white/75">
          <li className="flex gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#c6f36b]/10 text-xs font-bold text-[#c6f36b]">1</span><span><strong className="text-white">Read the question.</strong> Each round asks you to rank five items by a fact, such as population or distance.</span></li>
          <li className="flex gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#c6f36b]/10 text-xs font-bold text-[#c6f36b]">2</span><span><strong className="text-white">Reorder the cards</strong> from highest to lowest. Drag them into place, or use your keyboard to move them.</span></li>
          <li className="flex gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#c6f36b]/10 text-xs font-bold text-[#c6f36b]">3</span><span><strong className="text-white">Lock in your ranking</strong> to reveal the answers and earn points. Accuracy and speed both count.</span></li>
        </ol>
        {mode === "speed" && <p className="mt-5 rounded-xl border border-white/[.08] bg-white/[.03] p-3 text-xs leading-5 text-white/55">Speed mode is timed. The clock starts after you press OK.</p>}
        {mode === "survival" && <p className="mt-5 rounded-xl border border-white/[.08] bg-white/[.03] p-3 text-xs leading-5 text-white/55">Survival mode: an imperfect round costs a life.</p>}
        <Button autoFocus onClick={acknowledgeTutorial} className="mt-7 w-full" size="large">OK</Button>
      </section>
    </div>}
    <div className="mb-7 flex items-center justify-between">
      <Link href="/" className="focus-ring flex items-center gap-2 rounded-lg text-sm text-white/45 hover:text-white"><ArrowLeft size={16} />Exit game</Link>
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[.025] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/65">
        {mode === "daily" ? "Daily challenge" : `${mode} mode`}
      </div>
      {mode === "speed" ? <span className={`flex items-center gap-1.5 text-sm font-bold ${remaining < 20 ? "text-rose-300" : "text-white/75"}`}><Clock3 size={15} />{formatTime(remaining)}</span>
        : mode === "survival" ? <span className="flex gap-1" aria-label={`${lives} lives remaining`}>{Array.from({ length: 3 }, (_, i) => <Heart key={i} size={16} fill={i < lives ? "#ff806b" : "transparent"} className={i < lives ? "text-[#ff806b]" : "text-white/20"} />)}</span>
          : <span className="text-sm font-semibold tabular-nums text-white/65">{Math.min(roundIndex + 1, 5)}<span className="text-white/30"> / 5</span></span>}
    </div>

    <div className="mb-10 h-1 overflow-hidden rounded-full bg-white/[.07]">
      <motion.div className={`h-full rounded-full ${mode === "survival" && lives <= 1 ? "bg-[#ff806b]" : "bg-[#c6f36b]"}`} animate={{ width: `${Math.max(0, progress)}%` }} transition={{ duration: .35 }} />
    </div>

    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
      <section>
        <AnimatePresence mode="wait">
          <motion.div key={puzzle.id + roundIndex} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .22 }}>
            <div className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-[#c6f36b]"><span className="h-1.5 w-1.5 rounded-full bg-[#c6f36b]" />{puzzle.category}<span className="text-white/20">/</span><span className="text-white/40">Round {roundIndex + 1}</span></div>
            <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-[-.055em] sm:text-5xl">{puzzle.prompt}<span className="text-[#c6f36b]">.</span></h1>
            <p className="mt-3 flex items-center gap-2 text-sm text-white/45"><ArrowDown size={14} />Order from highest to lowest · {puzzle.items.length} items</p>
          </motion.div>
        </AnimatePresence>
        <div className="mt-7 space-y-2.5">
          {submitted ? revealedOrder.map((item, index) => {
            const placedIndex = items.findIndex((entry) => entry.label === item.label);
            const isCorrect = placedIndex === index;
            return <div key={item.label} className={`flex items-center gap-3 rounded-2xl border px-3 py-3.5 sm:px-4 ${isCorrect ? "border-emerald-400/35 bg-emerald-400/[.06]" : "border-white/[.07] bg-[#151821]"}`}>
              <span className={`grid h-8 w-8 place-items-center rounded-lg text-xs font-bold ${isCorrect ? "bg-emerald-400/15 text-emerald-300" : "bg-white/[.06] text-white/40"}`}>{String(index + 1).padStart(2, "0")}</span>
              <span className="flex-1 text-sm font-medium">{item.label}</span><span className="text-sm font-semibold text-white/70">{item.displayValue}</span>
              {isCorrect ? <Check size={16} className="text-emerald-300" /> : <span className="rounded-full bg-rose-400/10 px-2 py-1 text-[10px] font-bold text-rose-300">Your spot {placedIndex + 1}</span>}
            </div>;
          }) : <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items.map((item) => item.label)} strategy={verticalListSortingStrategy}>
              <ul className="space-y-2.5" aria-label="Your ranking, drag items to reorder">
                {items.map((item, index) => <SortableItem key={item.label} id={item.label} label={item.label} index={index} revealed={false} correct={false} />)}
              </ul>
            </SortableContext>
          </DndContext>}
        </div>
        {!submitted ? <Button size="large" onClick={submit} className="mt-5 w-full rounded-2xl active:scale-[.99]"><Check size={17} />Lock in ranking<ArrowRight size={16} className="ml-1" /></Button>
          : <div className="mt-5 rounded-2xl border border-white/10 bg-[#10131b] p-5">
            <div className="flex items-start justify-between gap-4">
              <div><div className="flex items-center gap-2 text-sm font-bold">{perfectStreak ? <><Sparkles size={16} className="text-[#c6f36b]" />Perfect round</> : <><Trophy size={16} className="text-[#a58bff]" />{roundResult?.exact} of 5 in the right spot</>}</div>
                <p className="mt-1 text-xs text-white/45">+{roundResult?.score.toLocaleString()} points · {perfectStreak ? "Perfect round bonus" : "Every place is a chance to learn"}</p></div>
              <div className="text-xl font-black text-[#c6f36b]">+{roundResult?.score}</div>
            </div>
            <div className="mt-4 space-y-2 border-t border-white/[.07] pt-4">
              {revealedOrder.map((item, index) => <div key={item.label} className="flex gap-3 text-xs leading-5 text-white/55"><span className="w-5 shrink-0 font-bold text-white/30">{index + 1}.</span><span><b className="font-semibold text-white/80">{item.label}</b> — {item.explanation}</span></div>)}
            </div>
            {puzzle.sourceNote && <p className="mt-3 text-[10px] text-white/30">{puzzle.sourceNote}</p>}
            {mode !== "daily" && results.length === 3 && <div className="mt-5"><AdInline placement="game" /></div>}
            <Button onClick={continueGame} className="mt-5 w-full">{(mode === "survival" && lives <= 0) || (!unlimited && mode !== "speed" && roundIndex + 1 >= targetRounds) ? "See your results" : "Next ranking"}<ArrowRight size={16} /></Button>
          </div>}
      </section>

      <aside className="space-y-4 lg:pt-2">
        <div className="glass soft-shadow rounded-3xl p-5">
          <div className="flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-[.15em] text-white/40">Run score</span><Sparkles size={15} className="text-[#c6f36b]" /></div>
          <div className="mt-2 text-4xl font-bold tracking-[-.06em] tabular-nums">{score.toLocaleString()}</div>
          <div className="mt-4 flex justify-between border-t border-white/[.08] pt-4 text-xs text-white/45"><span>Rankings solved</span><span className="text-white/75">{results.length}</span></div>
          <div className="mt-2 flex justify-between text-xs text-white/45"><span>Perfect rounds</span><span className="text-white/75">{results.filter((result) => result.perfect).length}</span></div>
        </div>
        {mode === "daily" && <div className="rounded-3xl border border-[#c6f36b]/20 bg-gradient-to-br from-[#c6f36b]/[.09] to-transparent p-5">
          <div className="text-xs font-bold uppercase tracking-[.15em] text-[#c6f36b]">Daily bonus</div><p className="mt-2 text-sm font-semibold">Play all 5 rounds</p><p className="mt-1 text-xs leading-5 text-white/45">Finish today&apos;s challenge to claim coins and keep your streak alive.</p>
        </div>}
        <div className="rounded-3xl border border-white/[.07] bg-white/[.02] p-5">
          <div className="text-xs font-bold uppercase tracking-[.15em] text-white/40">Quick tip</div><p className="mt-2 text-sm leading-6 text-white/65">Press and hold anywhere on a card, then move it into place. You can also use your keyboard to reorder.</p>
        </div>
      </aside>
    </div>
  </main>;
}

export function CategoryPicker() {
  return <main className="mx-auto max-w-6xl px-5 pb-44 pt-10 sm:px-8 sm:pb-28">
    <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.25em] text-[#c6f36b]">Find your lane</p><h1 className="mt-3 text-4xl font-bold tracking-[-.06em] sm:text-6xl">Pick a category<span className="text-[#c6f36b]">.</span></h1><p className="mt-4 text-white/50">Choose a topic and see how well your instincts rank up.</p></div>
    <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category, index) => <Link key={category} href={`/play/category?category=${encodeURIComponent(category)}`} onClick={() => trackEvent("category_selected", { category })} className="group focus-ring rounded-2xl border border-white/[.08] bg-[#11141c] p-5 transition hover:-translate-y-0.5 hover:border-[#c6f36b]/30 hover:bg-[#151a20]">
        <div className="flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white/[.05] text-lg">{["◎", "⌁", "◉", "◈", "✳", "◇", "↗", "▧", "♫", "♧", "▤", "✦", "⚗", "⌛"][index]}</span><ArrowRight size={16} className="text-white/25 transition group-hover:translate-x-1 group-hover:text-[#c6f36b]" /></div>
        <div className="mt-5 text-lg font-semibold">{category}</div><p className="mt-1 text-xs text-white/40">Play a focused 5-round set</p>
      </Link>)}
    </div>
    <div className="mt-10 hidden md:block"><AdResponsive placement="game" /></div>
  </main>;
}
