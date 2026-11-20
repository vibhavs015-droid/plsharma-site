/**
 * ============================================================
 *  CONTENT MODE — confirmed vs sample
 * ============================================================
 *  SHOW_SAMPLE_CONTENT=true is OWNER PREVIEW ONLY — never set on a
 *  public deploy.
 *
 *  When true, the site renders its sample tier: generic sample
 *  testimonials, the sample team members and a sample principal
 *  quote — every sample item carrying a visible
 *  "SAMPLE — not real, replace before launch" tag, plus a
 *  "Design preview — sample content shown" banner above the header.
 *
 *  Default is FALSE: a production build prerenders the confirmed
 *  tier only, and no sample string reaches the served HTML, the RSC
 *  payload or a client component's props. The env var is read at
 *  build/prerender time, so the tier is fixed per build — not per
 *  request.
 *
 *  This file also carries the build-time MODE flags (booleans and one
 *  URL — never content): the deployment URL, the indexing master
 *  switch and the owner's confirmed CA status. All default to the
 *  safe state; each is set on the host when its OWNER_CHECKLIST gate
 *  passes. Like the sample flag they are read at build/prerender
 *  time, so a build fixes them — they are not per-request.
 * ============================================================
 */
export const showSampleContent = process.env.SHOW_SAMPLE_CONTENT === "true";

// ── DEPLOYMENT & CLAIM FLAGS ───────────────────────────────────────

/**
 * The canonical site URL behind EVERY absolute URL the site emits:
 * canonical links (via layout metadataBase), og:url, sitemap.xml,
 * robots.txt and the JSON-LD url. Set SITE_URL to plsharmaco.in only
 * when the live domain is ready — the default is the site's OFFICIAL
 * Netlify host (renamed for launch, T16: plsharmaandcompany replaces
 * the old plsharma-site-preview preview site).
 */
export const siteUrl =
  process.env.SITE_URL ?? "https://plsharmaandcompany.netlify.app";

/**
 * Indexing master switch — DEFAULT FALSE (T9.4). While false, the root
 * layout emits noindex/nofollow site-wide and robots.txt disallows every
 * crawler (the Netlify preview additionally sends X-Robots-Tag on every
 * response). Flip ALLOW_INDEXING=true on the LIVE host only, together
 * with SITE_URL — see OWNER_CHECKLIST. Page-level robots (e.g.
 * /testimonials' noindex) still override this when true.
 */
export const allowIndexing = process.env.ALLOW_INDEXING === "true";

/**
 * The owner's confirmed professional status — DEFAULT FALSE (T6). Only a
 * practising chartered accountant may advertise audit engagements
 * (statutory audit and tax audit under s.44AB are reserved territory).
 * While false, audit claims stay gated out of the service card, the
 * descriptions and the keywords. The owner must confirm CA status — see
 * OWNER_CHECKLIST; if true, check ICAI advertising rules before the
 * audit wording ships.
 */
export const practitionerIsCa = process.env.PRACTITIONER_IS_CA === "true";
