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
| 4 | Spacing/layout (scroll-padding, clamp, rail, WhatsApp overlap) | DONE (code) — screenshot verify at T13 | `f269e61` |
| 5 | Section numbering (§ → numerals + rule) | DONE (code) — runtime pending | `f269e61` · `62f471a` |
| 6 | Audit claim flag (`PRACTITIONER_IS_CA`, default false) | DONE (code) — owner CA confirmation governs | `62f471a` |
| 7 | Testimonials page + section (zero-confirmed behaviour) | DONE (code) — runtime pending | `dcc4977` |
| 8 | Link check + branded 404 | DONE (code) — after-crawl pending qa window | `e2f712d` · `023798d` |
| 9 | Canonical/SEO/sharing (SITE_URL, per-page og, ALLOW_INDEXING) | DONE (code) — runtime pending | `62f471a` |
| 10 | Privacy page `/privacy` | DONE (code) — runtime pending | `62f471a` |
| 11 | Small inconsistencies (footer services/hours/claims) | DONE (code) — runtime pending | `dcc4977` |
| 12 | Android/iOS optimisation | DONE (code) — runtime + real-device pending | `f269e61` · `d3c6717` |
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

## BATCH A1 — TASKS 4/5/12 CSS layer (art-director, commit `f269e61`)

**T4:** `scroll-padding-top` = header height (`--header-h`: 68px, 97px ≥md, +20px air) + safe-area tokens; display headings clamped to 32–56px (the 62-ch /faq and 82-ch /why-choose-us h1s drop to ~3 lines at ≥1024); rail-label ragged wraps fixed with `text-wrap: balance`; the left rail already stacks above headings below tablet (verified); dead space killed via a one-line-entry density rule (`:has(> p:only-child)`) rather than touching section rhythm; WhatsApp float given explicit safe-area inset + z-index rank over utility classes, footer bottom clearance + field `scroll-margin` so it can't cover form fields or footer ends.

**T5 CSS (markup contract → `docs/design/polish/a1-notes.md` §1):** `.rail-num` system — figure (`--ink`, 12.53:1 on paper) + 1px brass rule ×20px + text column; number and rule never wrap. B3 swaps `§ 01 · Services` → the three-child markup site-wide. Uppercase kept (system consistency); the owner's mixed case is one `text-transform` declaration away — noted for owner review.

**T12 CSS:** `env(safe-area-inset-*)` on header/footer/float/`body > header|footer`; coarse-pointer 44×44 floors; field `scroll-margin` for keyboard submission. Already-satisfied verdicts (honest, verified not assumed): CTA buttons stretch full-width below `sm` via the existing flex containers; inputs already ≥16px; no `100vh` anywhere in `site/`. **B4 notes** (a1-notes.md): `viewportFit: "cover"` is the switch that activates the safe-area layer; `themeColor` stays `#282E3F`; candidate `interactiveWidget: "resizes-content"` (validate against the bundled Next docs); `<body>` → `min-h-dvh`; `whatsapp-float` class hook; sticky-bar reserve `--bar-h` in A2.

**Sample chrome:** `.sample-tag` (amber/gold badge, high contrast) + `.sample-banner` (brass strip above header, unmistakably non-production). `.phone-number` nowrap. Contrast script deep-equal (19 pairs, no new colours); reduced-motion untouched. **Residual risk (honest):** the 56px float circle can still clip a paragraph's right edge mid-page on 375px columns — the two ends are guarded; a hard mid-page guarantee needs the B4 bar or a reserved gutter (markup decision, A2).

---

## BATCH B3 — TASKS 5, 6, 9, 10 (commit `62f471a`)

**TASK 5 — numerals.** 21 `.rail-num` markers (17 converted + 4 on /privacy) per the A1 contract — three children in order, two-digit figure with `data-numeric`, zero `§`/`/`/`·` in markup (grep-proven). The 12 remaining plain `.rail-label`s are the contract's sanctioned exclusions (hero identity markers, act band `The next step`, plate captions, in-entry numerals); the 92 comment-only `§` hits are documentation citations, untouched.

**TASK 6 — audit gate.** `PRACTITIONER_IS_CA` (default false) in content-mode.ts. Non-CA state ships: card `Audit Support & Record Review` + the owner's exact three bullets; `site.description`, /services meta + h1, /about §01 story, layout keywords, and the footer bottom descriptor all drop audit claims. CA state restores the current wording byte-verbatim. Keeps (rationale logged): /faq's "costs much less than a business audit" fee comparison, /contact's "audit papers" (the clients' papers, not the office's engagements), the sample bio's "audit-ready" (inside the sample wall).

**TASK 9 — SEO / sharing / indexing guard.** `SITE_URL` (default = the preview URL; `plsharmaco.in` appears exactly once, in a "set when live" comment). New `pageMetadata` helper → per-page OG title/description/url + Twitter `summary_large_image` (layout keeps a fallback carrier; Next's replace-not-merge semantics documented in the helper). Branded og:image 1200×630, 34 KB PNG (ivory/brass/ink composition, only confirmed facts; Georgia serif because librsvg cannot load next/font's self-hosted files without machine-level changes — flagged to A2; Orchestrator-inspected). `ALLOW_INDEXING` default false → site-wide noindex meta + disallow-all robots.ts + `X-Robots-Tag: noindex, nofollow` for `/*` in netlify.toml (guards the Netlify preview permanently; going live = Vercel + env flips) — the KNOWN_ISSUES #18 fix, in tree. ProfessionalService JSON-LD on Home: name/url/telephone/email/address/openingHours/founder/areaServed/foundingDate — every field from confirmed config (address carries no PLACEHOLDER mark, grep-verified); no ratings, no logo, no invented fields.

**TASK 10 — /privacy.** h1 `One form collects your details — this site stores nothing.` + four numbered sections in the rail-num system: what the form collects (the form's real field list — name, phone, optional email, optional message, plus service/date/time "only if you choose them"), where details go (WhatsApp opens addressed to the office; email second path; the site stores/processes nothing), cookies/analytics (none; `If that changes, this page will say so.`), correcting/deleting (office phone + email) + `Last updated 17 November 2026` (hard-coded string). Footer Quick-links entry; sitemap `/privacy` (0.3); consent note under the booking slip: `Your details go straight to the office on WhatsApp — this site stores nothing.`

**Evidence:** tsc 0 · eslint 0/0 · grep proofs (plain rail markers = exclusions only; `plsharmaco.in` ×1 comment; `NEXT_PUBLIC_SITE_URL`/`site.siteUrl` 0 hits). **Pending:** qa runtime window (per-page `<head>` diff, robots.txt both modes, X-Robots-Tag on a real Netlify response, JSON-LD serialization, /privacy axe at T13); the noindex/sitemap self-consistency refinement (B4, DECISION_LOG); owner env vars (OWNER_CHECKLIST).

## BATCH B4 — TASK 12 markup (commit `d3c6717`)

- **Viewport export:** `themeColor: "#282E3F"` kept, `viewportFit: "cover"` (the switch that activates A1's safe-area layer), `interactiveWidget: "resizes-content"` — validated as a typed field in the bundled Next docs (keeps the submit button visible above the keyboard).
- **dvh:** `min-h-dvh` on body (html keeps `h-full`); zero `100vh` re-verified site-wide. Skip-link focus top uses the safe-area token. `whatsapp-float` class added (CSS selector swap → A2).
- **Icons + manifest:** `app/manifest.ts` (formal/short names, start_url `/`, display standalone, background `#faf6ec`, theme `#282e3f`) + `icon-192.png`/`icon-512.png` generated 1:1 from the existing 512 source (no upscaling); `apple-icon.png` verified already exactly 180×180; the favicon set untouched.
- **Sticky action bar:** `action-bar.tsx` — Call (`tel:`, aria `Call the office · +91 98297 71396`) + WhatsApp (`wa.me`, unattributed prefill identical to the float's, aria `Book a consultation on WhatsApp`) — rendered as the last element on 8 pages, `/book` excluded per the owner rule; numbers only from config; zero styling (A2 owns it).
- **Menu scroll lock:** Radix Dialog's `RemoveScroll` verified present (import + slot wrapping) — the lock already exists; `overflow-y-auto` added to SheetContent for tall menus.
- **Item 0 (DECISION_LOG refinement):** `/testimonials` `robots.index` + its sitemap entry now conditional on `confirmedTestimonials.length > 0` — agrees with the page's `hasConfirmed` and the visible-tier derivation in all three places.
- **Evidence:** tsc 0 · eslint 0/0 · grep-proof 0 ActionBar hits in `/book`. **Pending:** qa window (viewport meta content, manifest route + auto `<link>`, bar DOM/a11y tree, Item 0 in both modes), T13 device-emulation runs, real phones (OWNER_CHECKLIST list).

## BATCH A2 — TASK 12 CSS finish (art-director, commit `66d4bf7`)

- **Bar geometry:** `--bar-h` = 61px (arithmetic: 44px anchor + 2×8px padding + 1px rule; excludes `--safe-bottom` by design — every use site adds the inset so the reserve cannot drift). Phones-only **below 48rem** — the header's own `md` boundary (the contact strip makes the phone number persistent there, so the bar's Call has a home; no second breakpoint invented). Fixed, z-40 (under the z-50 header/sheet ladder), paper ground + hairline, two equal anchors: Call quiet (ink text 12.53:1), WhatsApp solid ink fill (12.53:1) — brass fill deliberately NOT used (that is the act band's one rectangle per page).
- **Reserves never sum:** three bands on the footer (bar band 77px+safe; float band 80px+safe; ≥81rem safe only), `body:has(.sticky-action-bar) > footer` overriding rather than adding; the bar band is 3px shorter than the float band so a double match still cannot cover text.
- **Float retirement (deviation accepted, DECISION_LOG):** where the bar renders (phones, all pages but /book) the float is hidden instead of lifted above it — the bar already carries WhatsApp with the identical prefill; a 56px circle 16px above an identical action would be one action twice on a 375px screen. `/book` keeps its float; ≥48rem unchanged. Revert = one declaration, quoted in a2-notes §2.
- **og:image font — ACCEPT Georgia** (rationale: 300–500px preview render, same transitional-serif register, brand carried by ground/mark/rule; the Fraunces alternative needs build machinery — exact recipe logged in a2-notes §3 for B5 only if the owner asks).
- **Final review 12/12 pass:** parse, cascade order, reserves, contrast deep-equal (19 pairs), no `!important` outside reduced-motion, zero new transitions (static bar), z-ladder, 44px floors, aria-labels contain visible labels (WCAG 2.5.3), no dead tokens, no `100vh`; two stale-comment honesty fixes. **Left for T13** (a2-notes): real iOS bar height, footer-last-line clearance, the 48rem handover, `/book` float-vs-submit edge (product call noted), landscape-phone bar weight, and qa's `home.spec` L287 `nav` count (the bar adds a second nav element — qa scopes the assertion).

---

## BATCH B5 — TASK 8 part 2: branded 404 (commit `023798d`)

`app/not-found.tsx` — one new file, nothing else touched. The page head identity marker (`P.L. Sharma & Co. · 404 · Jaisalmer`, plain rail-label — not a numbered section), h1 `That page isn't here.`, one honest line (`The address may be out of date, or the link was typed wrong.`), and five real quick links with verbatim site-config labels (`Book a consultation` → `/book`, `Home`, `Services`, `FAQ`, `Contact`). One deliberate exactness win: `/faq`'s existing label is `FAQ`, not the brief's guessed `Common questions` — the site-config-match rule outranks the brief's example. No act band, no apology voice; all classes pre-existing (grep-proven per class); no ActionBar (the root-layout chrome already carries both CTAs, and the 404 should stay lean).

Doc-verified against the bundled Next 16 docs: the root not-found handles every unmatched URL app-wide and renders inside the root layout (brand header/footer/skip link wrap it; all routes one level deep, so no nested not-found files); content lands inside the layout's `<main id="main">`, so the skip link + h1 landmark chain holds; Next auto-injects `<meta name="robots" content="noindex">` on 404s AND the layout's `ALLOW_INDEXING=false` guard applies (double insurance; no page metadata added — the docs show root not-found does support `generateMetadata`, left unused per brief). Server Component + `<Link>` only — zero client JS added.

**Evidence:** tsc 0 · eslint 0/0. **Pending (qa window):** after-crawl — status 404 on an unknown URL, branded copy present, Next's default `This page could not be found.` gone, the five links → 200, chrome intact (header/footer/skip/float), exactly one h1, list semantics, Next's auto-noindex meta in the head.

---

Task 13 and the remaining parts: entries appended as each lands.
