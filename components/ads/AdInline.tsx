import { AdBanner } from "./AdBanner";

export function AdInline({ placement = "game" }: { placement?: "game" | "results" }) {
  return <AdBanner placement={placement} format="rectangle" className="mx-auto w-full max-w-3xl" />;
}
