"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export function InstallAppButton() {
  const [isAndroid, setIsAndroid] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    setIsAndroid(/Android/i.test(navigator.userAgent));

    const standalone = window.matchMedia("(display-mode: standalone)");
    const syncInstalledState = () => setIsInstalled(standalone.matches);
    const handleInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
    };
    const handleInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    };

    syncInstalledState();
    standalone.addEventListener("change", syncInstalledState);
    window.addEventListener("beforeinstallprompt", handleInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      standalone.removeEventListener("change", syncInstalledState);
      window.removeEventListener("beforeinstallprompt", handleInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  if (!isAndroid || isInstalled) return null;

  async function install() {
    if (!installPrompt) {
      setShowInstructions(true);
      return;
    }

    const prompt = installPrompt;
    setInstallPrompt(null);
    try {
      await prompt.prompt();
      const { outcome } = await prompt.userChoice;
      if (outcome === "accepted") setIsInstalled(true);
    } catch (error) {
      console.error("Could not open the app install prompt:", error);
      setShowInstructions(true);
    }
  }

  return <>
    <button
      type="button"
      onClick={install}
      className="focus-ring flex items-center gap-1.5 rounded-full border border-[#c6f36b]/30 bg-[#c6f36b]/10 px-3 py-2 text-xs font-semibold text-[#c6f36b] transition hover:bg-[#c6f36b]/15"
      aria-label="Install Rankle on your device"
    >
      <Download size={14} aria-hidden="true" />
      <span>Install</span>
    </button>
    {showInstructions && <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-5" onClick={() => setShowInstructions(false)}>
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="install-title"
        className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#141720] p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="install-title" className="text-lg font-semibold">Install Rankle</h2>
            <p className="mt-2 text-sm leading-6 text-white/60">
              In your browser menu, tap <span className="font-semibold text-white">Install app</span> or <span className="font-semibold text-white">Add to Home screen</span>.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowInstructions(false)}
            className="rounded-lg p-1 text-white/50 hover:text-white"
            aria-label="Close install instructions"
          >
            <X size={18} />
          </button>
        </div>
      </section>
    </div>}
  </>;
}
