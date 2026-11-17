# Critic review — /why-choose-us page, Phase 3 Stage D round 1 of 3

**Reviewed:** `site/app/why-choose-us/page.tsx`; `site/lib/site-config.ts` (`whyChooseUs[]`); page-specs.md §3 (/why-choose-us) + §0.1–§0.6 (page head, CTA table, wording constants); tokens.md §5.1 (`.ruled-entry`, `.rail-label`, `.act-band`, `.btn-primary`/`.btn-quiet`), §5.2/§5.3/§9 (retired classes `.hero-pattern`/`.card-lift`, focus group = `.act-band`+`.bg-primary`); DECISION_LOG 2026-11-16 (Stage D deletions accepted: `page-hero.tsx` + `feature-icon.tsx` deleted, `section-header.tsx` sanctioned for Stage E, `.hero-pattern`/`.card-lift` CSS retired and verified zero source hits; O-8 accepted — `tabindex="-1"` on `<main>` bundled into Stage E tidy pass, not a defect on this route); a11y phase-3 report Stage D addendum (/why-choose-us clean, axe 0, manifesto h1 verbatim, three named check-links, on-time entry anchor-free, focus settled-correct under new ink group); QA `why-choose-us.spec.ts` (13 tests: h1 manifesto byte-exact; rail-label + lead; four config titles byte-verbatim in order 01–04; check-links exactly on 01/03/04 with the three shipped labels → /faq; entry 02 zero anchors; §02 entries present with pinned copy; "25+ Years" AND "Personal Attention" absent across content; zero /free/i on the page — the old fourth placement of the free-first offer is dead; band once + sentence + canonical CTA + why-choose-us-page prefill; title "How we work | …"; retired-wording/CTA/honesty sweeps); KNOWN_ISSUES #17 (perf numbers are upper bounds only, not scored off dev timing); screenshots `docs/design/screenshots/phase-3/why-choose-us-{360,1440}.png` (360/1440 inspected; 768/1024/1920 reviewed in the set). Date: 2026-11-16. Model: nemotron-3.5-super-vl-free.

## Findings — by severity

### Blockers — none

### Majors — none

### Minors — none required

No required findings. /why-choose-us ships per page-specs §3: fold contract exact (rail-label `P.L. SHARMA & CO. · WHY CHOOSE US · JAISALMER` → h1 as the manifesto statement "Fees agreed before work begins. Deadlines kept. Your papers stay confidential." (11 words, ≤20) → lead "Four things you can hold us to — and where to check each." → entry 01 Transparent Pricing with its check-link, all within the fold at 360px); exactly one h1 and it IS the manifesto — no second giant statement repeats it; four numbered `.ruled-entry` rows in config order = fear order (fee → deadline → shame → notice); check-links exactly on 01/03/04 ("Read the fee answer", "Read the confidentiality answer", "Read the notice answer") each sitting under its entry h3 as honest ledger cross-references; entry 02 On-Time, Every Time carries zero anchors — a statement stands, a fake link is worse (§3.1); §02 "What this means for your case" with two audience rows ("If you're salaried" / "If you run a business" h3s — studio-chosen, spec fixes body copy not h3s; they read as honest audience labels with no new facts); act-band close once ("Hold us to all four — start with the first conversation." + canonical primary + quiet tel).

Wording guards verified on the shots and in QA: no "25+ Years of Experience", no "Personal Attention", no stats strip, no percentage, no superlatives ("best"/"leading"/"most trusted"), no "24/7", no fee numbers — and crucially zero /free/i anywhere on this page: the free-first offer lives at exactly its three §0.6 placements site-wide (Home fold, /about §02, /faq fee answer) and /why-choose-us contributes none, so the offer is not costume here. No invented counts, no comparison table, no badge wall.

DECISION_LOG items judged as context, not defects: dead-code removals accepted (`page-hero.tsx`, `feature-icon.tsx` deleted; `.hero-pattern`/`.card-lift` retired; `section-header.tsx` sanctioned Stage E) — consistent with the consistency bar; `mapsQuery` config field deleted (zero consumers); the §02 h3s and the three check-link labels judged above — all honest, specific, earned, no dead ends.

Cross-reference: /why-choose-us's head rail-label uses the constant shape `{shortName} · <page> · Jaisalmer` ("· WHY CHOOSE US ·"), matching /about ("· ABOUT ·"), /services ("· SERVICES ·"), /faq ("· FAQ ·"), /contact ("· CONTACT ·") — the consistency bar set by critic/book-, about-, services-, faq-, contact-2026-11-16.md (all APPROVE, minor-only findings only).

## Scores (1–5)

| Axis | Score | Reason |
|---|---|---|
| Originality | 4 | Manifesto-as-h1 reassurance page (one loud statement + four ruled statements, no template hero/card grid); the "statement stands unlinked" on-time entry is an honest anti-pattern. Docked half: the ledger device is established, not new here. |
| Hierarchy | 4.5 | Fold contract exact: rail → manifesto h1 → lead → entry 01 in fold; graded h2/h3 ("The way of working" → four h3 → "What this means for your case" → two h3); act band last; one h1; no skipped levels. |
| Consistency | 4.5 | Rail-label constant shape; ruled entries; canonical CTA table (band/float "Book a consultation on WhatsApp", phone "Call the office · {number}"); check-link wording table consistent with the canon; free-first offer absent from this page exactly per §0.6. |
| Usability | 4.5 | Four things a visitor can hold the firm to; three answer on /faq via check-links, the fourth deliberately stands unlinked (no fake link); earned links only; band is the ask; no dead ends. |
| Accessibility | 5 | axe 0; focus system settled-correct on light and ink surfaces under the new ink group (`.act-band`+`.bg-primary`); one h1; logical heading order; target sizes incl. 2.5.8 spacing exception (zero circle intersections); O-8 skip-focus parking accepted → bundled into Stage E tidy pass, not a defect here; reduced motion + 320px reflow pass. |
| Performance | 4 | Text-only page, no images, no reveal stagger (§0.5 content visible in HTML at rest). Judged on structure/weight plausibility only (#17 upper bound; not a regression). |
| Brand fit | 4.5 | Kept Ledger: manifesto as h1, ruled entries, check-links as ledger cross-references, "stated, never sold", no costume claims (no stats strip, no superlatives, no invented percentages). |

## Verdict: APPROVE

No blockers, no unresolved majors. /why-choose-us fully satisfies page-specs §3 and the charter PAGE COMPLETION RULE at 360/1440 (768/1024/1920 reviewed in the set); honesty guards intact (free-first at exactly three site-wide placements, none here), a11y clean, CTA table canonical, the h1 reads as the manifesto thesis and survives at 360px, the §02 h3s and check-link labels judged honest.

One-line verdict: APPROVE — /why-choose-us matches page-specs §3 exactly (manifesto h1, four fear-ordered entries, check-links on 01/03/04 with entry 02 anchor-free, act band); no blockers or majors; dead-code removals and O-8 are closed/declined studio decisions, not defects.

## Optional suggestions (not required for APPROVE)

- [ ] O-8 skip-link focus parking (`tabindex="-1"` on `<main>` in `site/app/layout.tsx`) is accepted and bundled into the Stage E tidy pass — no action needed on this page itself.
- [ ] perf/image optimisation (#15/#17) is cross-cutting; /why-choose-us is text-only so it carries no image weight — no action needed here.

Review saved to `docs/design/critic/why-choose-us-2026-11-16.md`. No other files touched.
