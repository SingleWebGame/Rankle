import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rankle",
    short_name: "Rankle",
    description: "A daily ranking puzzle. Drag, rank, and see how your instincts stack up.",
    start_url: "/",
    display: "standalone",
    background_color: "#080a0f",
    theme_color: "#080a0f",
    icons: [
      {
        src: "/icons/rankle-192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/icons/rankle-512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
}
