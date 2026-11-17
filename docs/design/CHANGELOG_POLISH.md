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
| 1 | Hero bio + caption below photo + halo tone-down + phone nowrap / CTA stack | DONE (code) — A1 CSS + runtime pending | `dcc4977` |
| 2 | "The record" fact band | DONE (code) — runtime pending | `dcc4977` |
| 3 | Wording replacements + jargon sweep | DONE (code) — runtime pending | `dcc4977` |
| 4 | Spacing/layout (scroll-padding, clamp, rail, WhatsApp overlap) | pending (art-director A1) | — |
| 5 | Section numbering (§ → numerals + rule) | pending (B3 markup + A1 CSS) | — |
| 6 | Audit claim flag (`PRACTITIONER_IS_CA`, default false) | pending | — |
| 7 | Testimonials page + section (zero-confirmed behaviour) | DONE (code) — runtime pending | `dcc4977` |
| 8 | Link check + branded 404 | PARTIAL (before-crawl done) | `e2f712d` |
| 9 | Canonical/SEO/sharing (SITE_URL, per-page og, ALLOW_INDEXING) | pending | — |
| 10 | Privacy page `/privacy` | pending | — |
| 11 | Small inconsistencies (footer services/hours/claims) | DONE (code) — runtime pending | `dcc4977` |
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

## BATCH B2 — TASKS 1, 2, 3, 7, 11 — code complete (commit `dcc4977`)

Engineer batch, 14 files. Verification: `npx tsc --noEmit` → 0 · `npx eslint app lib components` → 0/0 · grep proofs for every removed/new string. Runtime behaviour (served HTML in both modes) verifies at the qa window / T13.

**TASK 1 — hero, bio, photo.** Home hero: the two short lines → the owner-supplied bio paragraph (single spec deviation "questions"→"work" — owner sign-off item; "The first consultation is free." survives exactly once on Home). Founder plates on Home + /about: captions moved BELOW the image (`Parbhati Lal Sharma` / `Principal Consultant · Jaisalmer`), the `· Since 2001` variants deleted per the §3.4 census; the name stays inside the `/about` link so the accessible name keeps the principal. New polished plates `founder-plate-polished.webp` (45.1 KB) + `.avif` (61.6 KB), 600×750, derived from the current plate via sharp, refined once after Orchestrator visual inspection: global desaturation ×0.75 + a gradient-masked top-region pass (saturation ×0.5, fading to zero just above the face). Originals byte-untouched (sizes verified pre/post). Measured: top-region channel spread 26.5 → 14.0 (−47%); face receives the global pass only (spread 29.1 → 22.4, hue preserved). The reshoot item in OWNER_CHECKLIST remains the real fix. Phone numbers wrapped in `.phone-number` spans ×14 site-wide; the `white-space: nowrap` CSS lands with art-director A1. The reshoot item is already in OWNER_CHECKLIST.

**TASK 2 — the record band.** Home §03 single line → h2 `The record` + five items: `Since 2001` · `{yearsInPractice} years in practice` (computed `site.copyrightYear − site.establishedYear`, renders 25; `new Date()` still nowhere) · `Mon–Sat 10:00–7:00` (config-derived constant with keep-in-sync comment) · `First consultation free` · `Office in Jaisalmer`. `stats[0]` untouched (renders on /about §01). `data-numeric` on the three numeric items.

**TASK 3 — wording.** Every applicable spec row applied: hero rail drops `· Since 2001`; "and where to check each" removed from the /why-choose-us lead + meta; /services quiet-link stutter fixed; /faq head ask de-duplicated; `site.description` "trusted"→"in Jaisalmer"; `whyChooseUs[2]` "agreed" form; `whyChooseUs[3]` "Strict deadlines discipline" removed; booking-form label "requirement"→"What you need help with (optional)"; /about §01 drops the 2001-restating sentence; /book SENT tel → canonical `Call the office · {number}` (spec §6 deviation; its task-cell "6" corrected to this batch). §3.1 rows 1–5 + §3.3 + §3.4 rows 8–9 mooted per the §8 amendment. The kept-list is untouched.

**TASK 7 — testimonials restructure (per §8 amendment).** /testimonials: §02 + §03 removed entirely; lean page = head + §01 honesty reserve + reworded CTA `A quote to share? Send it — your permission decides what appears.` (prefill unchanged); `robots: { index: false }`; new meta description; future-proofed gated strings (permission note + lead replacement) ready for real quotes; preview adds the intro line + 4 tagged samples. Home §04 hidden in production (gated on `visibleTestimonials`); preview shows the §5.2 note + quiet link + tagged samples. `visibleNavLinks` in site-config (client-safe: content-mode flag only) hides the nav + footer Testimonials links in production; header consumes it.

**TASK 11 — footer.** All 6 services (`.slice(0, 5)` removed; titles byte-match config); blurb self-claim "Trusted" dropped → "in Jaisalmer" form; hours rendered from `site.hours` in the /contact `{days} · {time}` composition; bottom descriptor + copyright unchanged.

**Evidence:** grep proofs — 0 hits for every removed string (`slice(0, 5)`, "Trusted tax consultancy", "Mon to Sat: 10:00 AM", "agreed-upon", "Strict deadlines discipline", "Call us directly at", old hero bio, old §04 note, hero/plate `Since 2001`); new strings verified present; sample-string wall intact (zero sample strings in site-config or any `"use client"` file). CTA container classes reported to the art-director. **Pending:** A1 CSS (nowrap, CTA stacking, sample chrome, T4/T5/T12), qa runtime (mode-gating, noindex, computed band, nav absence — sync list extended with the §8 flips), critic at T13.

---

Tasks 9, 10, 12, 13 and the remaining parts: entries appended as each lands.
