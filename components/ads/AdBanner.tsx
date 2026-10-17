"use client";

import { useEffect, useRef, useState } from "react";
import { adSlots, adsEnabled, type AdPlacement } from "@/lib/ads";
import { trackEvent } from "@/lib/analytics";

type Props = { placement: AdPlacement; format?: "horizontal" | "rectangle" | "auto"; className?: string };

declare global {
  interface Window { adsbygoogle?: Record<string, unknown>[] }
}

export function AdBanner({ placement, format = "auto", className = "" }: Props) {
  const slot = adSlots[placement];
  const impressionSent = useRef(false);
  const [consented, setConsented] = useState(false);
  useEffect(() => {
    const updateConsent = () => setConsented(window.localStorage.getItem("rankle-consent") === "all");
    updateConsent();
    window.addEventListener("storage", updateConsent);
    window.addEventListener("rankle-consent-change", updateConsent);
    return () => {
      window.removeEventListener("storage", updateConsent);
      window.removeEventListener("rankle-consent-change", updateConsent);
    };
  }, []);
  useEffect(() => {
    if (!adsEnabled || !slot || !consented || impressionSent.current) return;
    try {
      window.adsbygoogle = window.adsbygoogle ?? [];
      window.adsbygoogle.push({});
      trackEvent("ad_impression", { placement });
      impressionSent.current = true;
    } catch (error) {
      console.error(`Unable to initialize ${placement} ad slot`, error);
    }
  }, [placement, slot, consented]);

  if (adsEnabled && slot && consented) {
    return (
      <div className={`ad-shell ${className}`} aria-label="Advertisement" onClick={() => trackEvent("ad_click", { placement })}>
        <ins className="adsbygoogle" style={{ display: "block", minHeight: format === "rectangle" ? 250 : 90 }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID} data-ad-slot={slot}
          data-ad-format={format === "auto" ? "auto" : undefined} data-full-width-responsive="true" />
      </div>
    );
  }
  return (
    <div className={`flex min-h-[90px] items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[.02] px-4 py-4 text-center ${className}`} aria-label="Advertisement placeholder">
      <div><div className="text-[10px] font-semibold uppercase tracking-[.28em] text-white/30">Your ad here</div>
        <div className="mt-1 text-[11px] text-white/20">{format === "rectangle" ? "Responsive · 300×250" : "Responsive · 728×90"}</div></div>
    </div>
  );
}
