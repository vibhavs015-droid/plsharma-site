# T13 Final Critic Review — Polish pass (owner's 13-task list), round 1 of 3

**Reviewed:** the `polish-pass` branch build as served at http://localhost:3000 (read-only);
screenshots `docs/design/screenshots/polish/*.png` (65 shots; read: `home-390-vp`, `home-390`,
`home-1440`, `services-390-vp`, `services-1440`, `about-390-vp`, `faq-390-vp`, `privacy-390-vp`,
`privacy-1440`, `testimonials-390-vp`, `testimonials-390`, `why-choose-us-390-vp`,
`contact-390-vp`, `book-390-vp`, `not-found-390` — every page at 390 + a desktop width, phone
priority per the owner's gate; 768/1024/1920 reviewed in the set);
evidence `docs/design/polish-evidence/t13-axe.json` (20/20 runs, 0 violations) + `t13-lhci-home.json`
(perf 100, LCP 0.757 s, CLS 0.000, TBT 64 ms, zero console errors, `founder-plate-polished.webp`
preloaded at 46 KB) + `t13-lhci-{book,privacy,home-2}.json` (in set);
specs of record `docs/design/polish/wording-spec.md` (+ §8 amendment), `a1-notes.md`, `a2-notes.md`;
`docs/design/DECISION_LOG.md` (17 Nov polish entries: branch/batching, wording adoptions, TASK 7
lean-testimonials override, conditional noindex, float retirement, og:image Georgia, LHCI SEO 66–69
intentional); `docs/design/CHANGELOG_POLISH.md` task table (all 13 tasks DONE).
Date: 2026-11-18. Round 1 of max 3.

## Findings — by severity

### Blockers — none

### Majors — none

### Required minors — none

No required findings. The pass ships per the owner's list and the specs of record:

- **Phone chrome (T4/B4):** sticky action bar renders below 48rem on all nine routes —
  confirmed `display: grid` in axe meta for every phone run except `/book` and `/does-not-exist`
  (owner rule, honoured) — with Call + WhatsApp as the only persistent actions, paper ground,
  brass/slate tokens, safe-area inset respected; the WhatsApp float is retired wherever the bar
  renders (DECISION_LOG float-retirement entry; one conversation entry per screen), and `/book`
  keeps its float. Viewport shots confirm true fixed placement, no overlap with the sticky header
  (z-40 under header/sheet/dialog), and no occlusion of the act bands.
- **Content honesty (T1/T2/T3/T7):** hero bio sits below the photo with the owner-confirmed
  "first consultation is free." sentence inside it; plate caption below photo (tokens §7
  convention); "The record" five-item band carries only owner-confirmed facts (Since 2001 · 25
  years in practice · Mon-Sat 10:00-7:00 · First consultation free · Office in Jaisalmer); wording
  sweep applied 1:1 per wording-spec (verified: footer blurb without "Trusted", no "2001" census
  duplication on Home beyond the record band, /about §01 de-duplicated); audit-claim gate holds
  (non-CA default, no invented qualifications anywhere — axe/qa honesty sweeps green).
- **Lean /testimonials (T7, owner override implemented literally):** page = rail + h1 + §01
  honesty reserve (one `.placeholder-mark` as real visible text + permission note + CTA with
  question-prefill) + act band; §02/§03 removed per TASK 7; conditional noindex + sitemap gate
  (DECISION_LOG); nav link absent from header AND footer (live HTML: zero `/testimonials` anchors
  anywhere, confirmed programmatically — evidence and build agree; screenshots show the same).
- **Numeral rails (T5/B3):** `01 —— SERVICES` figure/rule/text triplet renders identically on
  every section head across pages (home, services, about, faq, privacy, why-choose-us, contact,
  testimonials) — `.rail-label .rail-num` contract from a1-notes §1 respected; § marks gone.
- **New surfaces:** `/privacy` is a four-section plain-words page in full house style (rail,
  h1, ruled entries, config hours, footer); branded 404 carries rail "NOT FOUND", honest copy and
  working nav back; per-page OG + branded og:image + sitemap/robots guard present (noindex meta on
  every route pre-launch, titles byte-match the wording-spec table — verified live).
- **Gates:** axe WCAG 2.2 AA 20/20 runs 0 violations; focus walks cycle to the skip link
  (35/36 stops, Stage D addendum); 2.5.8 circle test zero intersections; reduced-motion collapse;
  320 px reflow; LHCI quiet machine perf 100 / LCP 0.757 s / CLS 0.000 closes KNOWN_ISSUES #15+#17;
  SEO 66–69 = the intentional noindex guard (DECISION_LOG, launch-flip to ~100).

### Optional minors (NOT required for APPROVE)

1. **[minor, optional] 404 `<title>` falls back to the site default** — `site/app/not-found.tsx`
   renders a fully branded page (rail, h1 "Page not found", nav), but the document title is the
   home title ("P.L. Sharma And Company — Tax Consultants & Financial Advisors") because
   `not-found.tsx` cannot export metadata. Fix if desired: a catch-all route with
   `generateMetadata` returning "Page not found | {site.name}", or accept the default — Next
   platform constraint, zero visual impact, not release-blocking.
2. **[minor, optional] Rail markers uppercase vs owner's mixed-case preference** — already
   flagged to the owner as "one declaration away" (`.rail-label` text-transform). Owner decision
   pending; not a pass defect.
3. **[minor, optional] Menu Escape focus-return lands on brand, not the toggle** — WCAG-acceptable,
   logged; a `ref.focus()` in the sheet's Escape handler closes it fully. Owner follow-up list.
4. **[minor, optional] og:image uses Georgia, not Fraunces** — accepted with rationale
   (librsvg cannot load next/font without machine fontconfig; register immaterial at preview
   size); exact Fraunces recipe logged in a2-notes §3. Owner decision if wanted.

None of the four are release-blocking; all four are pre-decided owner/known follow-ups.

## Scores (1–5)

| Axis | Score | Reason |
|---|---|---|
| Originality | 4 | Kept Ledger identity intact through the polish: manifesto-as-h1, numeral rails replacing §, the record band as honest ledger, designed placeholder as content, halo-toned real founder plate with caption below. Sticky bar is a standard pattern but executed entirely in house tokens. Docked half: the bar itself is a convention, not an invention. |
| Hierarchy | 4.5 | Fold contracts preserved on every route (rail → h1 → lead → first entry); one h1 per page (axe headings); graded h2/h3; act band closes every page; footer columns ordered; the record band sits logically between way-of-working and questions. |
| Consistency | 4.5 | Rail-label constant shape `{shortName} · <page> · Jaisalmer` on all 10 routes; numeral triplet uniform; canonical CTA table (header/band/phone) verified on shots; footer all-6-services + config hours identical site-wide; Testimonials hidden from header and footer everywhere (live-verified); noindex guard uniform; free-first offer at its three sanctioned placements, Home's carried inside the new bio. |
| Usability | 4.5 | One WhatsApp + one Call always reachable on phones without scrolling; float/bar never double up; safe-area + scroll-padding + tap-target layer; check-links on /why-choose-us answer three of four claims; /privacy explains the form in plain words; 404 offers working nav back; no dead ends. |
| Accessibility | 5 | axe 20/20 zero violations; focus walks cycle to skip link; target sizes pass incl. 2.5.8 spacing exception; reduced-motion collapse; 320 px reflow; placeholder brass 6.25:1 passes AA (O-9 accepted); skip-focus parking (O-8) and menu Escape return accepted/logged as owner follow-ups — WCAG-acceptable, not defects. |
| Performance | 5 | LHCI quiet machine: perf 100, LCP 0.757 s (target <2.5 s), CLS 0.000, TBT 64 ms, zero console errors; one preloaded 46 KB webp; text-first pages; KNOWN_ISSUES #15 + #17 closed in the ledger. |
| Brand fit | 4.5 | Slate-navy + brass on ivory, Playfair/Inter, Kept Ledger register throughout — "stated, never sold"; record band = owner-confirmed facts only; audit-claim gate prevents overclaiming; real founder photo, no stock; honest placeholder; lean testimonials reads as integrity, not absence. Docked half: the polish tightens an existing identity rather than extending it. |

## Verdict: APPROVE

No blockers, no majors, no required fixes. All 13 tasks ship per the owner's list and the specs
of record; every mechanical gate is green (axe 20/20, LHCI perf 100/LCP 0.757 s/CLS 0, titles and
noindex verified live, nav hiding verified in both evidence and build); the four known follow-ups
(404 default title, rail case, menu Escape focus, og:image font) are owner-decided or
platform-constrained, none release-blocking. Round 1 of 3 — no resubmission needed.

One-line verdict: APPROVE — the polish pass delivers all 13 owner tasks in house style with every
gate green and zero blockers or majors; four optional minors (404 title fallback, rail case, menu
Escape focus target, og:image font) are pre-decided follow-ups, not defects.

Review saved to `docs/design/critic/polish-pass-t13-r1.md`. No other files touched.
