# CHANGELOG — Polish pass (owner-approved, 17 Nov 2026)

Owner's 13-task polish list, executed on branch `polish-pass` through the studio
pipeline. One commit per task. **Nothing pushed or deployed; main untouched.**
Branch base: main `8f10ae1` + chore `a64d8bf` (carried preview-deploy tooling).
Final DONE/PARTIAL/BLOCKED table for the owner closes out this file.

Free tooling this pass (Charter-compliant, logged in `docs/design/TOOLING_LOG.md`):
Playwright (e2e/crawl), axe-core, Lighthouse CI, sharp (T1 image processing,
pending), netlify CLI (preview only) — all local, no paid services.

| # | Task | Status | Commit(s) |
|---|---|---|---|
| 0 | Sample-content switch (`SHOW_SAMPLE_CONTENT`, default false) | DONE — qa runtime check staged (memory window) | `c48a861` · `71bd77f` |
| 1 | Hero bio + caption below photo + halo tone-down + phone nowrap / CTA stack | pending | — |
| 2 | "The record" fact band | pending | — |
| 3 | Wording replacements + jargon sweep | pending | — |
| 4 | Spacing/layout (scroll-padding, clamp, rail, WhatsApp overlap) | pending | — |
| 5 | Section numbering (§ → numerals + rule) | pending | — |
| 6 | Audit claim flag (`PRACTITIONER_IS_CA`, default false) | pending | — |
| 7 | Testimonials page + section (zero-confirmed behaviour) | pending | — |
| 8 | Link check + branded 404 | PARTIAL (before-crawl done) | `e2f712d` |
| 9 | Canonical/SEO/sharing (SITE_URL, per-page og, ALLOW_INDEXING) | pending | — |
| 10 | Privacy page `/privacy` | pending | — |
| 11 | Small inconsistencies (footer services/hours/claims) | pending | — |
| 12 | Android/iOS optimisation | pending | — |
| 13 | Verify (build/tests/axe/LHCI/screenshots/critic) | pending | — |

---

## TASK 0 — DONE — content tiers behind `SHOW_SAMPLE_CONTENT` (commit `c48a861`)

**What shipped**
- `site/lib/content-mode.ts` — `showSampleContent = process.env.SHOW_SAMPLE_CONTENT === "true"` (default **false**; owner-preview only, never set on a public deploy).
- `site/lib/site-config.ts` — now CLIENT-SAFE, zero sample strings: both `"use client"` importers (`header.tsx`, `booking-form.tsx`) pull from it, so no sample string can enter a client bundle by construction. Exports `confirmedTestimonials` (empty — the future owner-data slot) and `confirmedTeam` (founder entry only).
- `site/lib/sample-content.ts` — **server-side consumption only**: 4 short generic sample testimonials ("Sample client · \<area>" bylines), sample team roles for Vikram Singh Soda / Bhawani / Hemraj, one principal quote, and the derived `visibleTestimonials` / `visibleTeam` / `visiblePrincipalQuote` that pages render.
- `site/components/site/sample-tag.tsx` — visible "SAMPLE — not real, replace before launch" badge next to every sample item.
- `site/components/site/sample-banner.tsx` — "Design preview — sample content shown", first element in `<body>`, double-gated (layout gate + internal guard).
- Pages wired: `/about` (founder-only in production; sample associates + tagged principal quote in preview), `/testimonials` (zero entries in production, honesty reserve intact; 4 tagged samples in preview), `/` (founder from the visible tiers).
- The four invented detailed testimonials (Rajesh Verma / Sunita Malhotra / Amit Khanna / Priya Nair) are **deleted outright** from source.

**Evidence**
- `npx tsc --noEmit` → 0 · `npm run lint` → 0/0 (after adding `site/.netlify/**` to eslint globalIgnores — qa's deploy artifacts had exploded lint to 4890 problems, none in source; logged in DECISION_LOG).
- Honesty greps: invented names 0 hits in `site/{app,components,lib}`; sample strings confined to `sample-content.ts`, the two component literals, and comments/env names.
- qa sync committed (`71bd77f`): `about.spec.ts` / `testimonials.spec.ts` migrated to the tier imports (html+RSC-level absence sweeps) and NEW `sample-content.spec.ts` — the owner-required production guard (6 leak strings × 8 routes vs served HTML + RSC payload, plus zero `.sample-banner`/`.sample-tag` DOM nodes). **Runtime run STAGED:** the production build is temporarily blocked by a machine memory squeeze (owner applications hold ~14 GB; 4 build attempts OOM'd at the TypeScript stage; standalone `tsc` passes → not a product bug). Runs at the next build window (post-B2 qa sync or T13), together with the `SHOW_SAMPLE_CONTENT=true` preview-build positive check.

## TASK 8 — PARTIAL — before-half done (commit `e2f712d`)

**Before-crawl (qa, 17 Nov)** — `docs/design/LINK_CHECK.md` + raw evidence `docs/design/polish-evidence/link-check-before.json`:
- 8/8 pages 200 · 275 anchors recorded, 204 GET-checked → **0 broken** · 48 `<link>` GETs + all image/icon GETs 200 · `/sitemap.xml` 200 (8 locs, route set exact) · `/robots.txt` 200.
- Mapped to TASK 9: og:title/og:description/og:url identical site-wide; og:image absent; sitemap points at the unowned `plsharmaco.in` host (8 DNS failures); robots allows indexing on a now-PUBLIC unlaunched preview; no X-Robots-Tag in `site/netlify.toml` (opened as KNOWN_ISSUES #18).
- Honest surprises: the deployed preview is publicly reachable (owner flipped the Netlify visibility; the prior 401 is recorded as attributed evidence); the 404 already renders inside the branded chrome (default Next copy, status 404); all icons present (favicon.ico/png/svg + apple-icon) — the "missing icons" hypothesis is disproven with evidence; `<title>`s and canonicals are already per-page.
- **Remaining:** branded 404 page (engineer batch B5) + the AFTER re-crawl appended to `LINK_CHECK.md`.

---

Tasks 1–7 and 9–13: entries appended as each lands.
