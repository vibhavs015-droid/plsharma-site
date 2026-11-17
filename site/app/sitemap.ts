import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/content-mode";

/**
 * Static sitemap for all 9 pages. No `lastModified` on purpose:
 * Cache Components forbids `new Date()` during prerender, and the
 * content changes rarely enough that a fixed sitemap is fine.
 * Host from siteUrl (lib/content-mode.ts) — the preview host until
 * SITE_URL is set on the live one. While indexing is off, robots.txt
 * does not advertise this file (robots.ts), so nothing consumes it.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.7 },
    { path: "/services", priority: 0.9 },
    { path: "/why-choose-us", priority: 0.7 },
    { path: "/testimonials", priority: 0.6 },
    { path: "/faq", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
    { path: "/book", priority: 0.9 },
    { path: "/privacy", priority: 0.3 },
  ];

  return routes.map((r) => ({
    url: `${siteUrl}${r.path}`,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
