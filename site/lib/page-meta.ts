/**
 * ============================================================
 *  PER-PAGE METADATA BUILDER (T9.2)
 * ============================================================
 *  Every page gets its own title, description, canonical AND its
 *  own openGraph + twitter block. Next.js REPLACES (never merges)
 *  nested metadata per segment — a page that sets `openGraph`
 *  discards the layout's entirely (generate-metadata.md, segment
 *  merge rules) — so each page must carry the full set, and this
 *  builder is the one place that does it.
 *
 *  The og/twitter titles mirror the layout title template
 *  (`%s | P.L. Sharma And Company`), so a share card reads like
 *  the browser tab. URLs stay relative ("/about") and resolve
 *  against the layout's metadataBase, which is built from
 *  siteUrl (lib/content-mode.ts) — one host for canonical, og:url,
 *  sitemap and JSON-LD.
 * ============================================================
 */
import type { Metadata } from "next";
import { site } from "./site-config";

/** The one site-wide share image (1200×630 PNG) — brand tokens only. */
const OG_IMAGE = "/images/og-default.png";

const OG_IMAGE_ALT = `${site.name} — ${site.tagline}, Jaisalmer`;

type PageMetaInput = {
  /**
   * The page title, rendered by the layout template as
   * `<title> | P.L. Sharma And Company`. Omit on the home page — there
   * the layout's default title (`P.L. Sharma And Company — Tax
   * Consultants & Financial Advisors`) must survive the template.
   */
  title?: string;
  /** Per-page meta description — also the og/twitter description. */
  description: string;
  /** Route path: the canonical and the og:url (relative; resolved by metadataBase). */
  path: string;
};

export function pageMetadata({ title, description, path }: PageMetaInput): Metadata {
  const shareTitle = title
    ? `${title} | ${site.name}`
    : `${site.name} — ${site.tagline}`;

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      title: shareTitle,
      description,
      url: path,
      type: "website",
      locale: "en_IN",
      siteName: site.name,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: OG_IMAGE_ALT }],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      images: [OG_IMAGE],
    },
  };
}
