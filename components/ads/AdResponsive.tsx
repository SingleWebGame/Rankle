import { AdBanner } from "./AdBanner";
import type { AdPlacement } from "@/lib/ads";

export function AdResponsive({ placement, className = "" }: { placement: AdPlacement; className?: string }) {
  return <AdBanner placement={placement} format="auto" className={` ${className}`} />;
}
