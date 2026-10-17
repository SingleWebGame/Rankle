"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { AdBanner } from "./AdBanner";

export function AdStickyMobile() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return <aside className="fixed inset-x-0 bottom-[58px] z-40 border-t border-white/10 bg-[#080a0f]/95 p-2 md:hidden" aria-label="Advertisement">
    <button onClick={() => setDismissed(true)} aria-label="Dismiss advertisement" className="absolute right-2 top-1 z-10 rounded-full bg-[#181b24] p-1 text-white/60"><X size={14} /></button>
    <AdBanner placement="home" className="min-h-[50px] border-0 py-2" />
  </aside>;
}
