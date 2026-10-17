import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { GameClient } from "@/components/GameClient";
import type { GameMode } from "@/types/game";

const modes: GameMode[] = ["daily", "unlimited", "survival", "speed", "category"];

export function generateStaticParams() {
  return modes.map((mode) => ({ mode }));
}

export async function generateMetadata({ params }: { params: Promise<{ mode: string }> }): Promise<Metadata> {
  const { mode } = await params;
  if (!modes.includes(mode as GameMode)) return { title: "Game not found" };
  return { title: `${mode[0].toUpperCase()}${mode.slice(1)} mode`, description: "Play a Rankle ranking challenge." };
}

export default async function PlayPage({ params, searchParams }: { params: Promise<{ mode: string }>; searchParams: Promise<{ category?: string | string[] }> }) {
  const { mode } = await params;
  const query = await searchParams;
  if (!modes.includes(mode as GameMode)) notFound();
  const category = Array.isArray(query.category) ? query.category[0] : query.category;
  return <><SiteHeader /><GameClient mode={mode as GameMode} category={category} /></>;
}
