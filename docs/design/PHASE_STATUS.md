# Phase status — P.L. Sharma & Co. design studio

> Resuming session? Read `SESSION_HANDOFF.md` first (start-up procedure, state,
> pitfalls), then `STUDIO_CHARTER.md` and `STUDIO_ROLES.md`, then this file top to
> bottom. Update this file after every step so a new session can resume exactly.

## Current phase

**Phase 2 — Design System + Home — DONE** (critic APPROVE round 1, 15 Nov 2026;
committed 15 Nov 2026). Next: Phase 3 — remaining pages per the charter PAGE
COMPLETION RULE (brief to be written at phase start; see "Next phases").

### Resume state (update after every step)
1. ✅ Charter re-read (phase-start rule); gate decisions recorded in DECISION_LOG.
2. ✅ Art-director token overhaul DONE (`site/app/globals.css` + `docs/design/phase-2/tokens.md`; evidence reproduces; gotchas in DECISION_LOG).
3. ✅ Frontend-engineer Home rebuild DONE — fonts via next/font (Fraunces+Inter, OFL), shared CTA wording (header/float/footer), founder plate graded + acceptance-passed (47.7 KB webp + avif, original untouched), `/` rebuilt as ledger (§01–§05, one h1, act-band, placeholder-marked testimonials), lint #13 fixed via `useSyncExternalStore` (lint 0, typecheck 0). All deviations accepted and logged (DECISION_LOG 14 Nov entry).
4. ✅ Art-director focus fix DONE (15 Nov retry) — base `:focus-visible` now 2px solid `--ring` (12.53:1 on paper) / `--focus-on-ink` brass on ink surfaces (5.17:1); CTA ring stack closed via `box-shadow: none`; evidence reproduces (19 pairs deep-equal); cascade byte-order proven; `tokens.md` §5.3/§8/§9.2 updated.
5. ✅ Frontend-engineer focus micro-fix DONE — `outline-none`+`ring-ring/50` deleted from focus strings in 6 ui primitives (badge.tsx added per tokens.md §5.3 row 2; destructive-variant alpha focus rings removed), redundant `focusOnPaper`/`focusOnInk` deleted from page.tsx; typecheck 0, lint 0, source grep 0 matches, compiled CSS clean (token outline only, one indicator anywhere; `aria-invalid` state rings kept).
6. ✅ qa-engineer Home test pass DONE — **35/35 green** (unit 5/5 + e2e 30/30: 22 home.spec, 3 booking-form offline e2e, 6 home-responsive at all five widths, overflow=0 measured). Honesty regression guards in place (no stars/ratings/invented names/"Book Appointment"; placeholder-mark only; checks run against page.content() incl. RSC payload). Zero product defects on `/`; one QA-test selector bug fixed in-test. Flagged for later: `/book` slip still carries retire-list wording (slip-rebuild phase; keep tests in sync), reduced-motion follow-up test recommended. Visual baselines NOT created; build check deferred to LHCI step.
7. ✅ a11y-checker audit DONE — `/` and `/book` both **0 axe violations** (no regression vs Phase 0 baseline of 0); 0 AA failures; #16 verified fixed (live float paint = #0B6E39, 5.89:1). All manual checks pass (focus indicator 12.53:1 ink / 5.17:1 brass-on-ink across 45+33 tab stops; reduced-motion: 0 animations; reflow clean at 320px; placeholder reads as honest text). Evidence: `docs/design/a11y/phase-2-2026-11-15/` (12 screenshots + served-CSS dump). Findings F1–F5 all non-blocking → dispatched to engineer as one batch (F1 mobile CTA height collapse in booking-form; F2 select trigger height consistency; F3 focus-outline fade on transition-colors links; F4 skip link; F5 plate alt polish). Dev-only `nextjs-portal` in tab order is expected (absent in production).
8. ✅ qa-engineer follow-up DONE — F5-adjusted assertions (plate `alt=""` pinned + accessible-name check via visible captions; image-alt test keeps presence-only) → suite back to **30/30 e2e + 5/5 unit**. Outstanding test-gap note: suite can't catch "everything went alt=''" globally (a11y-checker's territory).
9. ✅ Art-director `@source not` shipped + **leak source corrected** — the dead-CSS leak was never `repos/` (git-ignored; Tailwind's scanner respects it): it came from the studio's own `docs/` (prose quoting class names + the a11y evidence CSS snapshot re-seeding dead utilities every build). Directive `@source not "../../repos"` kept as a guard (path-corrected to `../../repos` — bases resolve from the stylesheet). ⏳ **Follow-up running:** add `@source not "../../docs"` (measured: dead `h-8` rule gone, −5.8 KB CSS, no site utility lost) + `.opencode` + `logos` exclusions for a clean site-source-only scan boundary; tokens.md note to correct the earlier repos attribution.
10. ✅ LHCI first run DONE (exit 0; a11y assertion passed; a11y 100 × 8; CLS 0 × 8) — **but perf numbers are noise-contaminated**: identical builds measured TBT 1071→5955ms run-to-run (one giant "Unattributable" main-thread task; script eval only ~360ms; baseline-day TBT was 76ms). Fonts A/B-exonerated as the TBT cause (task worsened 4258→5955ms WITHOUT Fraunces). → KNOWN_ISSUES entry pending (measurement validity); real findings: `/` preloads 311 KB fonts (Fraunces 4-axis×2-style; italic unused anywhere; SOFT/WONK pinned to 0 in CSS); globals CSS 86.5 KB. Experiment edits REVERTED (layout.tsx restored from backup).
11. ✅ Font contract slimmed (both halves done) — art-director validated + corrected the preload attribution (146 KB was the *italic* latin file, 118 KB the *normal*; total 311.3 KB) and found one real regression: `/about` renders two literal `<em>` phrases → would fall back to synthesised oblique. Amendment recorded in tokens.md §2: house emphasis = `<strong className="font-medium text-ink">`, body carries no italic. Engineer: Fraunces loader → `axes: ["opsz"]`, no style (typecheck 0, lint 0); art-director: dead `font-variation-settings` line removed from globals.css, `font-optical-sizing: auto` kept, tokens.md §2 rewritten (families, why, re-add conditions, emphasis rule) + **correction of record**: the earlier "about-page italic" was pre-existing legacy copy, not a Phase 2 addition. Contrast evidence deep-equal. ⏳ Engineer now applying the 2-line `/about` emphasis fix; then Orchestrator rebuild + lhci ×3 + real byte numbers back to tokens.md §2.
12. ✅ Font fix verified by rebuild + LHCI — build exit 0; woff2 total **781 → 357 KB**; `/` preloads **311.3 → 115.8 KB** (Fraunces latin VF 67.4 KB + Inter 48.4 KB); **zero italic @font-face**; `/about` `<em>` replaced with house emphasis. **Full 8-route autorun: exit 0, a11y assertion passed, a11y 100 × 8; perf `/` 55 → 69.** **Distribution on `/` (3 runs, same build): quiet run TBT 34 ms → perf 93/a11y 100/FCP 766 ms (BETTER than baseline 89/76 ms); busy runs TBT 3.5–5.7 s → perf 62–63 — #17 noise confirmed and bounded.** Remaining honest gap: LCP ~3.3 s on `/` (target 2.5) → #15 stays OPEN (image-optimisation task). Art-director receiving real bytes for tokens.md §2.
13. ✅ Screenshots captured — `docs/design/screenshots/phase-2/home-{360,768,1024,1440,1920}.png` (full-page, convention established). Mobile 360: ledger structure/act band/placeholders render as designed; desktop 1440: margin rail + ruled entries + Fraunces hero as designed. Founder plate = interim graded crop (reshoot pending, #1a, owner gate decision).
14. ✅ Critic round 1 DONE — **APPROVE, zero majors/blockers** (originality 4, hierarchy 4.5, consistency 4.5, usability 4.5, accessibility 5, performance 4, brand fit 4); every smoke-test backlog major verified resolved. Review: `docs/design/critic/phase-2-home-2026-11-15.md`. Three optional minors, all closed: (1) founder sunglasses = owner-tracked interim reshoot (#1a); (2) float-graze verified a non-issue at 360/375 px (`docs/design/screenshots/phase-2/float-graze-check-*.png`); (3) inline colour styles → `text-brass-ink` (paper, 6.25) / `text-brass` (ink, 5.17) via the art-director's `:where(.rail-label)` zero-specificity rule — computed colours pixel-identical.
15. **15 Nov interruption:** overnight the machine rebooted (zombie pair #14 cleared; dev server died) — dev server relaunched in the Orchestrator session on 3000. All Phase 2 edits intact on disk, uncommitted → committed at phase close.

### Phase 2 brief
- **Goal:** implement the approved "Kept Ledger" design system in code and rebuild the Home page (`/`) as its first full expression, resolving the critic smoke-test REJECT backlog on that page.
- **Inputs:** `docs/design/discovery/vibe-board.md` + `brand-personality.md` (approved direction), `user-problem.md` (conversion design), owner gate decisions (below), critic smoke-test backlog, KNOWN_ISSUES #13/#15/#16, `site/app/globals.css` (current tokens), Next 16 docs note in `site/AGENTS.md` (read `node_modules/next/dist/docs/` before product code).
- **Outputs:** token overhaul in `site/app/globals.css` (art-director); Fraunces wiring + shared primitives (margin rail, ruled entry, act band, placeholder marker, CTA set, consultation slip base) + rebuilt `/` (frontend-engineer); screenshots at 360/768/1024/1440/1920; axe + Lighthouse runs on `/`; a fresh Home test pass.
- **Files agents may touch:** art-director → `site/app/globals.css` + `docs/design/**`; frontend-engineer → `site/**` (product code; no architecture changes); qa-engineer → `site/tests/**`; a11y-checker/perf-seo/critic → reports only. Orchestrator: ledgers.
- **Owner gate decisions applied (14 Nov 2026):** direction APPROVED; "first consultation is free" = owner-confirmed fact (stays); founder photo = interim graded crop on the home hero (reshoot requested in parallel); header keeps all 8 links.
- **Exit criteria:** Home passes the charter PAGE COMPLETION RULE (content final or marked; responsive at 360/768/1024/1440/1920; all states; keyboard + screen-reader usable; images optimised with dimensions + alt; SEO metadata; Lighthouse targets on `/`; screenshots reviewed; **critic APPROVE**; tests exist). Lint error #13 fixed en route; WhatsApp token #16 replaced; no unconfirmed data anywhere.
- **Delegations:** art-director (tokens) → frontend-engineer (primitives + Home) → qa-engineer (tests) → a11y-checker + perf-seo (checks) → critic (page review, round 1).
- **Critic verdicts:** round 1 **APPROVE** (15 Nov 2026 — originality 4, hierarchy 4.5, consistency 4.5, usability 4.5, accessibility 5, performance 4, brand fit 4; zero majors/blockers; every smoke-test backlog major verified resolved; all three optional minors closed before commit). Review: `docs/design/critic/phase-2-home-2026-11-15.md`.

### Phase 2 — DONE (critic APPROVE round 1, 15 Nov 2026)
Token system + Home complete and verified: 35/35 tests, axe 0 violations on `/`
and `/book`, build exit 0, a11y 100 × 8 (LHCI), quiet-run perf 93 / TBT 34 ms
(beats the Phase 0 baseline; measurement caveat #17), font payload 781 → 357 KB,
CSS scan boundary clean. Full record: IMPLEMENTATION_LOG Phase 2 entry +
DECISION_LOG 14–15 Nov entries. Carried into Phase 3: #15 LCP image optimisation,
`/book` slip rebuild (retire "Book an Appointment"/"Send Booking Request"; keep
e2e expected strings in sync), reduced-motion follow-up test, 2 lint warnings
(#13), founder reshoot (#1a).

### Phase 1 — DONE (gate approved 14 Nov 2026)
Deliverables complete; critic round 2 APPROVE; owner passed the [GATE] with four
decisions (see DECISION_LOG 2026-11-14 gate entry). Review:
`docs/design/critic/phase-1-discovery-2026-11-14.md`. Committed `c8959d9`.

### Phase 1 brief
- **Goal:** confirm the charter's project details with the owner (max 8 probing questions) and produce the strategic design foundation.
- **Inputs:** charter PROJECT DETAILS (pre-filled from records), owner's answers, `PROJECT-NOTES.md`, existing site content, critic smoke-test backlog (`docs/design/critic/smoke-test-2026-11-13.md`).
- **Outputs:** `docs/design/discovery/vibe-board.md` (art-director), `docs/design/discovery/user-problem.md` (ux-strategist), `docs/design/discovery/brand-personality.md` (art-director) — then critic review saved under `docs/design/critic/`.
- **Files agents may touch:** ux-strategist & art-director → `docs/design/discovery/**` only; critic → `docs/design/critic/**` only.
- **Exit criteria:** three deliverables written; critic verdict recorded; **[GATE]** stop and wait for owner approval before any design/build phase.
- **Delegations:** questions by Orchestrator (batch of 8, question tool) → deliverables by art-director + ux-strategist (no overlap: different files) → critic review.
- **Owner answers received (14 Nov 2026):** fundamentals confirmed (brand, framing, WhatsApp booking goal); primary action = **book consultation via WhatsApp**; audience = **individuals and small businesses equally**; vibe and uniqueness **delegated to the studio** ("discuss with the critics and agents and decide"); admired references: **none** — "complete new work from scratch and build its own identity"; styles to avoid: **startup flash, stock-photo corporate, cluttered templates**; content available: founder photo (in repo), real testimonials (promised, **not yet supplied**), team photos (pending), nothing else — placeholders must stay clearly marked; no credentials supplied → no qualification claims.
- **Orchestrator note:** because the owner delegated the aesthetic call, the art-director's deliverables are studio **proposals**; the existing navy+gold tokens are a candidate input to evaluate, not a constraint. The [GATE] remains the owner's approval point.
- **Critic verdicts:** round 1 REJECT (F1 major: unconfirmed stat tiles `1:1`/`100%` in site-config; F2 minor: untraceable contrast ratios; F3 minor: divergent CTA wording) → all three fixes applied (single honest stat tile; committed contrast verifier `site/tools/contrast-check.mjs` + `docs/design/discovery/contrast-evidence.json`, all figures reproduce; canonical wording table per surface) → round 2 **APPROVE** (originality 4, hierarchy 4.5, consistency 4, usability 4, accessibility 4.5, performance 4, brand fit 4.5). Review: `docs/design/critic/phase-1-discovery-2026-11-14.md`. Optional critic notes for Phase 2: retire remaining "Book an Appointment" source wording; founder-photo interim grade is the highest-impact asset decision.
- **Gate items for the owner:** (1) approve the Kept Ledger direction + conversion design; (2) verify-or-cut the "first consultation is free" promise; (3) founder photo: interim graded crop on the home hero vs type-only hero until the reshoot; (4) optional nav change deferred from the duplicate run (drop /testimonials + /why-choose-us from the header until real testimonials arrive); (5) asset requests from vibe-board §10 (founder reshoot, 3 team photos, signature scan, real testimonials).

## Completed phases

### Phase 0 — Baseline — DONE (14 Nov 2026)

- **Brief:** verified pre-work baseline of the existing repo — structure, deps, scripts, git state, install/build/lint/tests, honest failure record. Deliverable `BASELINE_REPORT.md`.
- **Files touched:** `site/lighthouserc.json` (port 3000 → **3200**), `site/.gitignore` (+`/.lighthouseci/`), root `.gitignore` (pre-existing uncommitted `.lighthouseci/` line, committed with the phase), `docs/design/BASELINE_REPORT.md`, evidence bundle `docs/design/baseline/lhci/` (results.json, assertion-results.json, README.md), ledgers. **No product code** (charter baseline rule).
- **Results:** build exit 0 — 8 content pages + 8 framework/metadata routes = 16 prerendered targets (manifest-reconciled); lint exit 1 (1 error + 2 warnings → KNOWN_ISSUES #13, deliberately **not** fixed per baseline rule); unit tests 5/5; axe 0 violations × 8 routes (production server); **LHCI clean run:** a11y/BP/SEO 100 × 8, perf 89–100 (`/` 89 below target), LCP misses on the four image-led routes (→ KNOWN_ISSUES #15). Evidence committed so every number is checkable.
- **Environment incidents:** OpenCode server restart cancelled the first LHCI run (orphaned processes; elevated zombie pair remains → KNOWN_ISSUES #14); a contended rerun was superseded; the harness's re-execution of the cancelled command delivered the final clean artifact set (8 runs, port 3200, mobile/simulate). Dev server restored on port **3000**.
- **Exit criteria:** all verified — see `BASELINE_REPORT.md` §8.
- **Critic verdicts:** round 1 REJECT (F1–F7: 2 majors — LHCI numbers not traceable, route-count inconsistency; 5 minors) → all fixes applied → round 2 **APPROVE** (originality 4, hierarchy 4.5, consistency 4.5, usability 4, accessibility 4.5, performance 3, brand fit 4.5). Review: `docs/design/critic/phase-0-baseline-2026-11-14.md`.

### Setup (pre-baseline) — DONE 13–14 Nov 2026

Studio infrastructure created and verified: 7 subagents in `.opencode/agents/`
(permissions verified via `opencode debug agents`), Orchestrator rules in
`AGENTS.md`, Playwright MCP connected, tooling installed (Playwright 1.65.0,
axe-core 4.14.0, Lighthouse CI 0.16.1, chromium 158), models pinned (critic →
nemotron-3.5-super-vl-free, art-director → deepseek-v4.1-flash-free), owner
charter adopted (`f584017`), cold-start `SESSION_HANDOFF.md` wired into
`AGENTS.md`. Critic smoke test: scored REJECT review of the Home page
(`docs/design/critic/smoke-test-2026-11-13.md`) — its required fixes are the
first backlog carried into the build phases.

## Next phases (queued)

- **Phase 3 — Pages (Design & Build):** next phase; brief to be written at phase
  start (re-read STUDIO_CHARTER first per the phase rule). Each remaining route —
  `/about`, `/services`, `/why-choose-us`, `/testimonials`, `/faq`, `/contact`,
  `/book` — must clear the charter PAGE COMPLETION RULE with its own critic
  review. First backlog carried from Phase 2: KNOWN_ISSUES #15 (LCP image
  optimisation), `/book` slip rebuild (retire "Book an Appointment"/"Send Booking
  Request" wording — keep e2e expected strings in sync), reduced-motion follow-up
  test, 2 lint warnings (#13), founder reshoot (#1a), PLACEHOLDER content
  (owner data: testimonials, team photos).

## Template for a new phase brief

```md
### Phase N — <name> — IN PROGRESS | BLOCKED | DONE
- Goal:
- Inputs:
- Outputs:
- Files each agent may touch:
- Exit criteria:
- Delegations: (who, what, when)
- Critic verdicts: (APPROVE/REJECT + round count)
```
