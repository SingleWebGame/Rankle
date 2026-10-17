import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ConsentManager } from "@/components/ConsentManager";
import { ThirdPartyScripts } from "@/components/ThirdPartyScripts";
import { NotificationCenter } from "@/components/NotificationCenter";
import { VercelAnalytics } from "@/components/VercelAnalytics";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rankle.game";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Rankle — Put your knowledge in order", template: "%s · Rankle" },
  description: "A daily ranking puzzle. Drag, rank, and see how your instincts stack up.",
  applicationName: "Rankle",
  openGraph: {
    title: "Rankle — Put your knowledge in order",
    description: "Five quick rounds. One daily ranking challenge.",
    url: siteUrl,
    siteName: "Rankle",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Rankle — Put your knowledge in order",
    description: "Five quick rounds. One daily ranking challenge."
  },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = {
  themeColor: "#080a0f",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Rankle",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    description: "A daily ranking puzzle game."
  };

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="noise">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        {children}
        <ConsentManager />
        <ThirdPartyScripts />
        <NotificationCenter />
        <VercelAnalytics />
      </body>
    </html>
  );
}
