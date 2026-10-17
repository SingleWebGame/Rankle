export const adsEnabled = Boolean(process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID);
export const adsPremiumEnabled = false;

export const adSlots = {
  home: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME,
  game: process.env.NEXT_PUBLIC_ADSENSE_SLOT_GAME,
  results: process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULTS,
  stats: process.env.NEXT_PUBLIC_ADSENSE_SLOT_STATS
} as const;

export type AdPlacement = keyof typeof adSlots;
