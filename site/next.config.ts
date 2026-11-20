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
   * Response headers, shipped inside the build (routes-manifest) so they
   * work on ANY host — the Netlify Next runtime does not apply the
   * platform [[headers]] block to the responses it serves (verified live
   * 18 Nov 2026 for X-Robots-Tag, re-verified 20 Nov 2026 for the T16
   * security block: toml headers reached /_next/static assets only, never
   * the HTML).
   *
   * T16 launch hardening (owner: "no trace of development", optimize):
   * the four quiet security headers below apply to every route. HSTS is
   * deliberately NOT set here — the platform already serves a stronger
   * value (max-age=31536000; includeSubDomains; preload) on both HTML
   * and assets, and a second copy would only duplicate it.
   *
   * X-Robots-Tag is layer 3 of the T9.4 indexing guard, gated on the
   * same ALLOW_INDEXING master switch as the layout's noindex meta and
   * robots.txt: flipping it true on the LIVE host removes all three
   * together (done for launch — T16, owner decision).
   */
  async headers() {
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
    ];
    if (allowIndexing) {
      return [{ source: "/:path*", headers: securityHeaders }];
    }
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
