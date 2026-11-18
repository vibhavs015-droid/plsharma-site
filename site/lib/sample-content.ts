/**
 * ============================================================
 *  SAMPLE CONTENT — server-side consumption ONLY
 * ============================================================
 *  Everything sample-typed lives here, deliberately OUT of
 *  lib/site-config.ts: client components ("use client") import
 *  site-config, and importing ANY export from a module pulls the
 *  whole module into the client bundle — a sample string in
 *  site-config would ship in production JS chunks even though
 *  nothing renders it. Pages (server components) import the
 *  derived visible* exports below; a production build resolves
 *  them to the confirmed tier, so no sample string is rendered
 *  or shipped anywhere.
 *
 *  The preview flag is lib/content-mode.ts — SHOW_SAMPLE_CONTENT=
 *  true is OWNER PREVIEW ONLY, never set on a public deploy.
 *  Every sample item renders with a visible
 *  "SAMPLE — not real, replace before launch" tag (sample-tag.tsx).
 * ============================================================
 */

import { showSampleContent } from "./content-mode";
import type { Testimonial, TeamMember } from "./site-config";
import { confirmedTeam, confirmedTestimonials } from "./site-config";

// ── SAMPLE CLIENT WORDS ────────────────────────────────────────────
// Generic preview copy shown ONLY when SHOW_SAMPLE_CONTENT=true.
// Bylines are deliberately generic ("Sample client" + work area):
// nothing that implies a real, long-term or named client.
export const sampleTestimonials: Testimonial[] = [
  {
    quote: "My return was filed well before the deadline — no chasing.",
    name: "Sample client",
    area: "ITR filing",
  },
  {
    quote: "GST registration handled end to end, without a single visit.",
    name: "Sample client",
    area: "GST registration",
  },
  {
    quote: "The notice was explained in plain words and answered in time.",
    name: "Sample client",
    area: "Notice handling",
  },
  {
    quote: "My books stay clean and up to date, month after month.",
    name: "Sample client",
    area: "Bookkeeping",
  },
];

// ── SAMPLE TEAM ────────────────────────────────────────────────────
// Empty as of T14-E: the three associate names the owner confirmed
// moved to the confirmed tier (lib/site-config.ts), and this tier
// empties so preview and production cannot duplicate them. Kept as a
// tier for any future sample entry — anything added here renders
// owner-preview-only with a SAMPLE tag.
export const sampleTeam: TeamMember[] = [];

// ── THE PRINCIPAL'S OWN LINE ───────────────────────────────────────
// `confirmed`: null until the owner supplies the real first-person
// line (the /about §02 margin mark awaits it). `sample`: a facts-safe
// preview line — personal attention and since 2001, nothing else —
// shown only in owner preview with a SAMPLE tag.
export const principalQuote: { confirmed: string | null; sample: string } = {
  confirmed: null,
  sample:
    "Every file that comes into this office gets my personal attention — as it has since 2001.",
};

// ── Derived VISIBLE lists — the only exports pages render ─────────
// Production resolves these to the confirmed tier (which lives in
// site-config.ts); owner preview adds the sample tier above.
export const visibleTestimonials: Testimonial[] = showSampleContent
  ? sampleTestimonials
  : confirmedTestimonials;

export const visibleTeam: TeamMember[] = [
  ...confirmedTeam,
  ...(showSampleContent ? sampleTeam : []),
];

export const visiblePrincipalQuote: string | null = showSampleContent
  ? principalQuote.sample
  : principalQuote.confirmed;
