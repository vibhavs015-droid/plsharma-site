import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/content-mode";
import { confirmedTestimonials } from "@/lib/site-config";

/**
 * Static sitemap: the 8 fixed pages plus /testimonials, which is included
 * only when the confirmed testimonial tier has quotes (Item 0) — matching
 * the page's own conditional noindex. No `lastModified` on purpose:
 * Cache Components forbids `new Date()` during prerender, and the
 * content changes rarely enough that a fixed sitemap is fine.
 * Host from siteUrl (lib/content-mode.ts) — the site's official Netlify
 * host (T16) until SITE_URL is set to the real domain. While indexing is
 * off, robots.txt does not advertise this file (robots.ts), so nothing
 * consumes it.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.7 },
    { path: "/services", priority: 0.9 },
    { path: "/why-choose-us", priority: 0.7 },
    // /testimonials only when real, permissioned quotes exist (Item 0) —
    // the page noindexes itself while the tier is empty, so the sitemap
    // agrees with the page.
    ...(confirmedTestimonials.length > 0
      ? [{ path: "/testimonials", priority: 0.6 }]
      : []),
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
