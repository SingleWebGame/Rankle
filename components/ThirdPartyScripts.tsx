"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { adsEnabled } from "@/lib/ads";

export function ThirdPartyScripts() {
  const [consent, setConsent] = useState("");
  useEffect(() => {
    const update = () => setConsent(window.localStorage.getItem("rankle-consent") ?? "");
    update();
    window.addEventListener("storage", update);
    window.addEventListener("rankle-consent-change", update);
    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("rankle-consent-change", update);
    };
  }, []);
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const adsClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  return <>
    {measurementId && (consent === "all" || consent === "analytics") && <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="rankle-gtag" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        window.gtag = function(){window.dataLayer.push(arguments);};
        window.gtag('js', new Date());
        window.gtag('config', '${measurementId}', { anonymize_ip: true });
      `}</Script>
    </>}
    {adsEnabled && adsClient && consent === "all" && <Script
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsClient}`}
    />}
  </>;
}
