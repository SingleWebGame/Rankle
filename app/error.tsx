"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, TriangleAlert } from "lucide-react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => console.error("Rankle page error", error), [error]);
  return <main className="grid min-h-[75vh] place-items-center px-5 py-16">
    <div className="max-w-md text-center"><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-rose-400/10 text-rose-300"><TriangleAlert /></div><h1 className="mt-5 text-3xl font-bold">A little hiccup.</h1><p className="mt-2 text-sm leading-6 text-white/50">This page hit an unexpected issue. Your saved progress is still in your browser.</p><div className="mt-6 flex justify-center gap-3"><button onClick={() => reset()} className="flex items-center gap-2 rounded-xl bg-[#c6f36b] px-4 py-3 text-sm font-bold text-[#11140d]"><RefreshCw size={15} />Try again</button><Link href="/" className="rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold">Go home</Link></div></div>
  </main>;
}
