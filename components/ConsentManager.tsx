"use client";

import { useEffect, useState } from "react";
import { Check, Cookie, Settings2, X } from "lucide-react";

type Consent = "all" | "essential" | "analytics";

export function ConsentManager() {
  const [open, setOpen] = useState(false);
  const [preferences, setPreferences] = useState(false);
  useEffect(() => {
    setOpen(!window.localStorage.getItem("rankle-consent"));
  }, []);

  function choose(consent: Consent) {
    window.localStorage.setItem("rankle-consent", consent);
    window.dispatchEvent(new Event("rankle-consent-change"));
    setOpen(false);
    setPreferences(false);
  }
  if (!open) return null;
  return <section role="dialog" aria-modal="true" aria-labelledby="consent-title" className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-xl rounded-3xl border border-white/10 bg-[#141720] p-5 shadow-2xl sm:bottom-6 sm:left-auto sm:right-6 sm:p-6">
    <div className="flex items-start justify-between gap-4">
      <div className="flex gap-3"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[.06] text-[#c6f36b]"><Cookie size={19} /></div>
        <div><h2 id="consent-title" className="font-semibold">Your privacy, your call</h2>
          <p className="mt-1 text-sm leading-6 text-white/50">We use essential storage to save your progress. Optional analytics and advertising help us improve Rankle.</p>
        </div>
      </div>
      <button onClick={() => choose("essential")} aria-label="Reject optional cookies" className="rounded-lg p-1 text-white/40 hover:text-white"><X size={17} /></button>
    </div>
    {preferences && <div className="mt-4 rounded-2xl border border-white/10 p-4 text-sm">
      <div className="flex justify-between"><span>Essential storage</span><span className="text-[#c6f36b]">Always on</span></div>
      <label className="mt-3 flex items-center justify-between text-white/70">Analytics
        <input type="checkbox" id="analytics-consent" className="accent-[#c6f36b]" defaultChecked />
      </label>
    </div>}
    <div className="mt-5 flex flex-wrap gap-2">
      <button onClick={() => choose("all")} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#c6f36b] px-4 py-3 text-sm font-bold text-[#12150e]"><Check size={16} />Accept all</button>
      <button onClick={() => choose(preferences && (document.getElementById("analytics-consent") as HTMLInputElement)?.checked ? "analytics" : "essential")} className="flex-1 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-white/75 hover:bg-white/[.05]">Reject non-essential</button>
      <button onClick={() => preferences ? choose((document.getElementById("analytics-consent") as HTMLInputElement)?.checked ? "analytics" : "essential") : setPreferences(true)} className="flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm text-white/55 hover:text-white"><Settings2 size={15} />{preferences ? "Save preferences" : "Manage"}</button>
    </div>
  </section>;
}
