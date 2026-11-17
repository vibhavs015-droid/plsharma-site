# Critic review — /testimonials page, Phase 3 Stage D round 1 of 3

**Reviewed:** `site/app/testimonials/page.tsx`; `site/lib/site-config.ts` (`testimonials[]` invented sample data — must not render; `team[0]`, `site` facts); page-specs.md §4 (/testimonials) + §0.1–§0.6 (page head, CTA table, wording constants); tokens.md §5.1 (`.placeholder-mark`, `.ruled-entry`, `.rail-label`, `.act-band`, `.btn-primary`/`.btn-quiet`), §0.6 (no italic ships; Fraunces italic removed for payload), §7 (plate-caption convention — not applicable here, no plate); DECISION_LOG 2026-11-16 (Stage D: `testimonials` unused-var warning dies here; `section-header.tsx` sanctioned Stage E); a11y phase-3 report Stage D addendum (/testimonials clean, axe 0, one real-text placeholder mark, no invented names, question-prefill collection link, `data-numeric` record line, signed page free of italic and drawn signature); QA `testimonials.spec.ts` (12 tests: one h1; exactly one `.placeholder-mark` as real visible text; collection link = QUESTION prefill asserted NOT a booking prefill; record line `Since 2001 · 25+ Years in Practice in Jaisalmer` with data-numeric; the three proof links' href+text pairs; founder/role line with zero italic faces; no sample/preview framing; band once + testimonials-page prefill; title "Client words — published with permission | …"; the invented-data wall: the 4 config names + 2 roles + quote-fragments asserted absent from visible text AND RSC payload on every route); KNOWN_ISSUES #17 (perf numbers are upper bounds only, not scored off dev timing); screenshots `docs/design/screenshots/phase-3/testimonials-{360,1440}.png` (360/1440 inspected; 768/1024/1920 reviewed in the set). Date: 2026-11-16. Model: nemotron-3.5-super-vl-free.

## Findings — by severity

### Blockers — none

### Majors — none

### Minors — none required

No required findings. /testimonials ships per page-specs §4: fold contract exact (rail-label `P.L. SHARMA & CO. · TESTIMONIALS · JAISALMER` → h1 "Real client words — published with permission, and not before." → lead "This page stays empty until real clients agree to be quoted. Nothing here is invented." → exactly one `.placeholder-mark` entry visible in the fold as the designed gap); the honesty sentence adapted from Home §04 ("A quote appears here only after a real client has read it and agreed to be named… this page publishes only what the firm can stand behind") — adapted here, not duplicated verbatim, avoiding triple-saying costume; collection link below it with QUESTION prefill ("…I have a question." — NOT a booking prefill, per the S0.1 exception, giving the page a live function instead of emptiness); exactly one h1; h2/h3 nesting clean ("Client words" → "The proof that exists today" → "The signed page" → h3 "Parbhati Lal Sharma").

§02 "The proof that exists today": record line "Since 2001 · 25+ Years in Practice in Jaisalmer" with `data-numeric="true"` (the one honest stat, /about tile precedent) + three quiet proof links ("The principal" → /about · "How we work" → /why-choose-us · "Straight answers" → /faq), names == visible text, no star/rating markup (the single `[class*='star']` DOM hit is the header CTA class substring "inline-start", a false positive — zero rating elements exist).

§03 "The signed page": hairline + h3 "Parbhati Lal Sharma" + role line "Principal Consultant · Jaisalmer · Since 2001", set in regular faces, zero italic faces (`em` 0, `i` 0, `font-style: normal`), no drawn/traced/faked signature — per tokens §0.6 and the plate-caption convention applied by analogy to the unsigned principal line.

Invented-data wall verified: the four config names (Rajesh Verma, Sunita Malhotra, Amit Khanna, Priya Nair) and two roles asserted absent from rendered text AND from the RSC/HTML payload on every route; no sample/preview framing; no fake counts; no carousel/slider.

Act-band close once ("While this page waits, your questions get answered — ask us directly." + canonical primary + testimonials-page prefill + quiet tel); title "Client words — published with permission | …".

DECISION_LOG items judged as context, not defects: unused-var warning on this file dies in Stage D (not a defect on the page); `section-header.tsx` sanctioned Stage E.

Cross-reference: /testimonials's head rail-label uses the constant shape `{shortName} · <page> · Jaisalmer` ("· TESTIMONIALS ·"), matching all other routes — the consistency bar set by critic/book-, about-, services-, faq-, contact-, why-choose-us-2026-11-16.md (all APPROVE, minor-only findings only).

## Scores (1–5)

| Axis | Score | Reason |
|---|---|---|
| Originality | 4 | The honest reserve — an empty page designed as integrity rather than absence (placeholder + collection invite + proof-that-exists) is a genuine alternative to a template testimonial carousel. Docked half: the device is specified, not invented here. |
| Hierarchy | 4.5 | Fold contract exact: rail → h1 policy statement → lead → placeholder mark in fold; §02 proof-that-exists and §03 signed page below fold; one h1; graded h2/h3; act band last; no skipped levels. |
| Consistency | 4.5 | Rail-label constant shape; `.placeholder-mark` (brass-ink 6.25:1 on paper, tokens S1); ruled entries; canonical CTA table; question-prefill collection link (booking prefill correctly withheld); record line with `data-numeric`. |
| Usability | 4.5 | The empty reserve reads as integrity: placeholder explains why, collection invite gives a live function, three proof links route to existing proof (/about, /why-choose-us, /faq) so the page never dead-ends despite zero journey weight. |
| Accessibility | 5 | axe 0; focus system settled-correct; one h1; logical heading order; target sizes incl. 2.5.8 spacing exception (zero circle intersections); placeholder mark is real visible text (colour not the sole carrier — brass-ink 6.25:1 passes AA, O-9 accepted as-is below the AAA 7:1 bar); reduced motion + 320px reflow pass. |
| Performance | 4 | Text-only page, no images, no reveal stagger. Judged on structure/weight plausibility only (#17 upper bound; not a regression). |
| Brand fit | 4.5 | Kept Ledger: honesty as a design feature ("stated, never sold"), no invented quotes/names/roles/avatars, no stars, no stock faces, slate-navy + brass on ivory, regular faces only (no italic impersonation). |

## Verdict: APPROVE

No blockers, no unresolved majors. /testimonials fully satisfies page-specs §4 and the charter PAGE COMPLETION RULE at 360/1440 (768/1024/1920 reviewed in the set); the designed honest reserve reads as integrity not absence; a11x clean; the honesty sentence adapted from Home §04 not duplicated verbatim; the invented-data wall holds across text and RSC payload.

One-line verdict: APPROVE — /testimonials matches page-specs §4 exactly (one real-text placeholder mark, question-prefill collection link, three named proof links, signed page free of italic/drawn signature, no stars/carousel); no blockers or majors; O-9 placeholder contrast accepted as-is per the AA charter target.

## Optional suggestions (not required for APPROVE)

- [ ] O-9 placeholder brass-ink at 6.25:1 passes AA with headroom but is below the AAA 7:1 bar — accepted as-is per the AA charter target; darken the placeholder ink one step only if the studio ever targets AAA on this page. Art-director's call, no action now.
- [ ] perf/image optimisation (#15/#17) is cross-cutting; /testimonials is text-only so it carries no image weight — no action needed here.

Review saved to `docs/design/critic/testimonials-2026-11-16.md`. No other files touched.
