"use client";

import { useState } from "react";
import { Check, Copy, Download, Share2 } from "lucide-react";
import { getDailyNumber, resultEmoji } from "@/lib/game";
import type { RoundResult } from "@/types/game";
import { trackEvent } from "@/lib/analytics";

type Props = { score: number; results: RoundResult[]; mode: string };

export function ShareCard({ score, results, mode }: Props) {
  const [copied, setCopied] = useState(false);
  const title = `RANKLE #${getDailyNumber()}${mode === "daily" ? "" : ` · ${mode.toUpperCase()}`}`;
  const shareText = `${title}\n\n${resultEmoji(results)}\n\nTOTAL SCORE: ${score.toLocaleString()}\nPlay at rankle.game`;

  async function copyResult() {
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    trackEvent("share_clicked", { method: "copy" });
    window.setTimeout(() => setCopied(false), 1800);
  }

  function downloadImage() {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 850;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const gradient = ctx.createLinearGradient(0, 0, 1080, 850);
    gradient.addColorStop(0, "#171d19");
    gradient.addColorStop(1, "#090b10");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 850);
    ctx.fillStyle = "#c6f36b";
    ctx.font = "bold 28px Arial";
    ctx.fillText("RANKLE", 76, 86);
    ctx.fillStyle = "#f6f7fb";
    ctx.font = "bold 52px Arial";
    ctx.fillText(title, 76, 170);
    ctx.font = "54px Arial";
    resultEmoji(results).split("\n").forEach((row, i) => ctx.fillText(row, 76, 278 + i * 76));
    ctx.fillStyle = "#9299aa";
    ctx.font = "bold 20px Arial";
    ctx.fillText("TOTAL SCORE", 76, 730);
    ctx.fillStyle = "#f6f7fb";
    ctx.font = "bold 48px Arial";
    ctx.fillText(score.toLocaleString(), 76, 790);
    const link = document.createElement("a");
    link.download = "rankle-result.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    trackEvent("share_clicked", { method: "download" });
  }

  async function share() {
    if (navigator.share) {
      await navigator.share({ title: "My Rankle result", text: shareText, url: window.location.origin });
      trackEvent("share_clicked", { method: "native" });
    } else {
      await copyResult();
    }
  }

  return <div className="rounded-3xl border border-white/10 bg-[#0d1017] p-5 sm:p-7">
    <div className="mb-4 flex items-center justify-between">
      <div><div className="text-xs font-bold tracking-[.2em] text-[#c6f36b]">YOUR RESULT</div><div className="mt-1 text-sm text-white/45">A little knowledge goes a long way.</div></div>
      <div className="rounded-xl border border-white/10 px-3 py-2 text-sm font-bold">{title}</div>
    </div>
    <pre className="overflow-x-auto rounded-2xl bg-white/[.025] p-4 font-sans text-lg leading-8 sm:text-xl" aria-label="Round result grid">{resultEmoji(results)}</pre>
    <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
      <div><span className="text-xs font-semibold uppercase tracking-widest text-white/35">Total score</span><div className="text-2xl font-bold">{score.toLocaleString()}</div></div>
      <div className="flex gap-2">
        <button onClick={downloadImage} className="rounded-xl border border-white/10 p-3 text-white/65 hover:bg-white/[.06]" aria-label="Download result image"><Download size={17} /></button>
        <button onClick={copyResult} className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-white/80 hover:bg-white/[.06]">{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? "Copied" : "Copy"}</button>
        <button onClick={share} className="flex items-center gap-2 rounded-xl bg-[#c6f36b] px-4 py-3 text-sm font-bold text-[#11140d] hover:bg-[#d4f78b]"><Share2 size={16} />Share</button>
      </div>
    </div>
  </div>;
}
