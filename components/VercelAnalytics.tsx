"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";

const CONSENT_KEY = "rankle-consent";

function hasAnalyticsConsent() {
  const consent = window.localStorage.getItem(CONSENT_KEY);
  return consent === "all" || consent === "analytics";
}

export function VercelAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    function syncConsent() {
      if (hasAnalyticsConsent()) setEnabled(true);
    }

    syncConsent();
    window.addEventListener("rankle-consent-change", syncConsent);
    return () => window.removeEventListener("rankle-consent-change", syncConsent);
  }, []);

  if (!enabled) return null;

  return <Analytics beforeSend={(event) => hasAnalyticsConsent() ? event : null} />;
}
