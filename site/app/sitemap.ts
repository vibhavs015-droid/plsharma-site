import type { MetadataRoute } from "next";
import { site } from "@/lib/site-config";

/**
 * Static sitemap for all 8 pages. No `lastModified` on purpose:
 * Cache Components forbids `new Date()` during prerender, and the
 * content changes rarely enough that a fixed sitemap is fine.
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
  ];

  return routes.map((r) => ({
    url: `${site.siteUrl}${r.path}`,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
