import type { MetadataRoute } from "next";
import { allowIndexing, siteUrl } from "@/lib/content-mode";

/**
 * Indexing guard (T9.4) — mirrors the ALLOW_INDEXING flag in
 * lib/content-mode.ts. DEFAULT FALSE: every crawler is disallowed and no
 * sitemap is advertised (nothing is indexable yet). When the owner flips
 * ALLOW_INDEXING=true on the live host, the previous allow-all behaviour
 * returns together with the sitemap link. The Netlify preview additionally
 * sends X-Robots-Tag: noindex, nofollow on every response (netlify.toml).
 */
export default function robots(): MetadataRoute.Robots {
  if (!allowIndexing) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
