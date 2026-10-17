import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { CategoryPicker } from "@/components/GameClient";
import { AdStickyMobile } from "@/components/ads/AdStickyMobile";

export const metadata: Metadata = { title: "Choose a category", description: "Explore 14 ranking puzzle categories in Rankle." };

export default function CategoriesPage() {
  return <><SiteHeader /><CategoryPicker /><AdStickyMobile /></>;
}
