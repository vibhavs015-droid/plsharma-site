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
 * ============================================================
 */
export const showSampleContent = process.env.SHOW_SAMPLE_CONTENT === "true";
