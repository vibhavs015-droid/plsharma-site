import type { NextConfig } from "next";
import { allowIndexing } from "./lib/content-mode";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  /**
   * Indexing guard, layer 3 (T9.4): X-Robots-Tag on EVERY response.
   *
   * Lives here rather than only in netlify.toml because the Netlify
   * Next runtime does not apply the platform [[headers]] block to the
   * responses it serves — verified live 18 Nov 2026 (header absent on
   * HTML, the 404 and /robots.txt alike). next.config headers() travel
   * inside the build (routes-manifest), so they work on any host,
   * including the eventual production host.
   *
   * Gated on the same ALLOW_INDEXING master switch as the layout's
   * noindex meta and robots.txt: flipping it true on the LIVE host
   * (OWNER_CHECKLIST) removes all three together.
   */
  async headers() {
    if (allowIndexing) return [];
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
