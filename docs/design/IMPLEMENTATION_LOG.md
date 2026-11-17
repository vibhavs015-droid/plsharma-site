# Implementation log — P.L. Sharma & Co. website

Per-phase record required by the charter: work done, files changed, dependencies
added, tests run, problems found and resolved, exit criteria. Newest at the bottom.

## Phase 0 — Studio setup (13–14 Nov 2026)

**Work done.** Multi-agent design studio stood up inside the repo: 7 OpenCode V2
subagents (critic, ux-strategist, art-director, frontend-engineer, a11y-checker,
qa-engineer, perf-seo) in `.opencode/agents/` with scoped permissions; Orchestrator
rules in `AGENTS.md` (+ pointer in the workspace-root `AGENTS.md`); Playwright MCP
server configured in `.opencode/opencode.json` and connected; screenshot/check
tooling installed and smoke-tested; session relocated into the project folder and
agent paths made project-relative; models pinned (critic →
`opencode/nemotron-3.5-super-vl-free`, art-director → `opencode/deepseek-v4.1-flash-free`).

**Files changed.** See commits `918f3bd` (studio + tooling + docs) and `1233fd2`
(model pins): `.opencode/**`, `AGENTS.md`, `PROJECT-NOTES.md` (status entry),
`docs/design/**`, `site/package.json` + lockfile, `site/playwright.config.ts`,
`site/lighthouserc.json`, `site/tools/axe-check.mjs`.

**Dependencies added (dev).** @playwright/test 1.65.0, @playwright/mcp 0.0.85,
@axe-core/playwright 4.14.0, axe-core 4.14.0, @lhci/cli 0.16.1 + Playwright chromium
158.0.8127.18 (headless shell, ffmpeg, winldd). Licences and removal steps in
`TOOLING_LOG.md`.

**Tests run.** Booking unit tests 5/5 (pre-existing, untouched); axe-core scan of
Home on the dev server → 0 violations (exit 0); critic smoke test → full scored
review, verdict REJECT (3 majors), auto-saved to
`docs/design/critic/smoke-test-2026-11-13.md`; critic model check → CRITIC-OK.

**Problems found and resolved.** (1) `AxeBuilder` rejected `browser.newPage()` →
switched to `browser.newContext()` in `axe-check.mjs`. (2) DECISION_LOG heading
clipped by an edit → restored. (3) Permission patterns were workspace-root-relative
→ rebased to project-relative after the session move, verified with
`opencode debug agents`. (4) First critic invocation failed on free-model quota →
succeeded on retry.

**Exit criteria.** Met: agents verified loaded; MCP connected; toolchain verified
end-to-end; critic returned a scored verdict and its out-of-scope edit was denied.

## Phase 0 — Baseline (14 Nov 2026)

**Work done.** Verified pre-work baseline of the existing site, per the charter
prompt: environment (Node v24.16.0, npm 11.13.0, branch `main`); repo structure and
16-route build table; dependency and script inventory; install → build → lint →
tests → axe (8 routes, production server) → Lighthouse CI (8 routes, port 3200,
Playwright chromium via `CHROME_PATH`). Port hygiene: both stale in-house servers
(PID 19780 `next start`, PID 21340 dev) stopped before runs; dev server restored
afterwards. Deliverable: `docs/design/BASELINE_REPORT.md`.

**Files changed.** `site/lighthouserc.json` (port 3000 → 3200), `site/.gitignore`
(ignore `/.lighthouseci/`), `docs/design/BASELINE_REPORT.md`, ledgers
(`KNOWN_ISSUES.md`, `DECISION_LOG.md`, `TOOLING_LOG.md`, this file). No product
code touched (charter baseline rule).

**Tests run.** Build exit 0 (16/16 static routes); lint exit 1 — 1 error + 2
warnings recorded as KNOWN_ISSUES #13, deliberately not fixed in Phase 0; unit
tests 5/5; axe 0 violations × 8 routes; Lighthouse final clean run: a11y/BP/SEO
100 × 8, perf 89–100, LCP misses on `/` `/services` `/why-choose-us`
`/testimonials` (KNOWN_ISSUES #15).

**Problems found and resolved.** (1) First LHCI run cancelled by an OpenCode
server restart → orphaned processes killed; an elevated zombie pair survived
(PID 18672/14012, KNOWN_ISSUES #14). (2) The rerun raced the zombie and produced
depressed scores → superseded. (3) The harness re-executed the cancelled command
→ that run cleared the folder and delivered the final clean artifact set. (4) An
edit here clipped one line of the Charter-adoption entry → restored in the same
session.

**Exit criteria.** Structure/deps/scripts/git inspected; install/build/lint/tests
run with failures recorded honestly; Lighthouse numbers recorded; studio roles in
place; `BASELINE_REPORT.md` written. **Critic verdict:** round 1 REJECT (F1–F7:
2 majors — LHCI numbers not traceable to artifacts; route count inconsistent —
5 minors) → all fixes applied (committed evidence bundle
`docs/design/baseline/lhci/`, route-count reconciliation against the prerender
manifest, zombie-PID unification, command citations for §1/§4, licence-record
citations, assertion outcome stated) → round 2 **APPROVE** (originality 4,
hierarchy 4.5, consistency 4.5, usability 4, accessibility 4.5, performance 3,
brand fit 4.5). Review: `docs/design/critic/phase-0-baseline-2026-11-14.md`.

## Phase 1 — Discovery and Vibe (14 Nov 2026) — [GATE] reached

**Work done.** Owner's 8 charter questions asked and answered in one batch
(fundamentals confirmed; WhatsApp booking primary; dual audience; vibe and
uniqueness delegated to the studio; no admired references; three style
exclusions; content reality recorded). Deliverables produced by delegated roles:
`docs/design/discovery/vibe-board.md` + `brand-personality.md` (art-director —
"The Kept Ledger": warm paper `#FAF6EC`, ink `#282E3F`, brass `#CF9455` as mark
only, margin-rail structure replacing cards, Fraunces + Inter, honest designed
placeholders) and `docs/design/discovery/user-problem.md` (ux-strategist —
problem statements for both audiences, WhatsApp-first conversion design, one CTA
per surface, journey sketches, honest measurement plan). Critic review round 1
REJECT → fixes applied → round 2 **APPROVE**.

**Files changed.** `docs/design/discovery/*` (3 deliverables + contrast evidence),
`site/lib/site-config.ts` (critic-mandated honesty edit: stat tiles → one
owner-confirmed tile), `site/tools/contrast-check.mjs` (new dev-only verifier),
`docs/design/KNOWN_ISSUES.md` (#16 contrast defect), `docs/design/DECISION_LOG.md`,
`docs/design/PHASE_STATUS.md`, this file.

**Tests run.** `node tools/contrast-check.mjs` exit 0 (19 pairs verified);
dev server on 3000 re-rendered with the single stat tile without errors.

**Problems found and resolved.** (1) Critic F1: unconfirmed stat tiles removed.
(2) Critic F2: ratios now reproducible from a committed script (art-director's
figures verified exactly). (3) Critic F3: canonical CTA wording converged across
all three documents. (4) A duplicate ux-strategist run (server-restart race)
overwrote `user-problem.md` → critic-reviewed v1 restored verbatim; the
duplicate's nav proposal deferred to the owner at the [GATE] (DECISION_LOG).
(5) Free-model quota failed two subagent launches → retry succeeded (KNOWN_ISSUES #11 pattern).

**Exit criteria.** Three deliverables written; critic verdict recorded
(APPROVE). **[GATE] stop:** Phase 2 awaits owner approval of the direction plus
verification of the "first consultation free" promise.

## Charter adoption (14 Nov 2026)

Owner-provided charter saved as `docs/design/STUDIO_CHARTER.md` (replaces the
orchestrator-written draft; ownership matrix, path convention and model notes
migrated to `STUDIO_ROLES.md`). Created the charter's required documentation set:
`STUDIO_ROLES.md`, `REPOSITORY_REFERENCE.md`, `THIRD_PARTY_NOTICES.md`,
`KNOWN_ISSUES.md`, `IMPLEMENTATION_LOG.md` (this file), `FINAL_QA_REPORT.md` (stub
until Definition of Done). Verified all 9 charter seed repositories via the GitHub
API (all active, all permissively licensed) — details in
`REPOSITORY_REFERENCE.md`. Charter PROJECT DETAILS pre-filled from project records;
owner to confirm in Phase 1. Findings logged: `motion` dep unused; direct `axe-core`
dep redundant; Storybook deliberately not adopted (tooling-light constraint).

## Phase 2 — Design System + Home (14–15 Nov 2026)

**Work done.** Token layer rebuilt to the owner-approved "Kept Ledger" system in
`site/app/globals.css`: every shadcn var name preserved, values re-pointed (warm
paper `#FAF6EC`, ink `#282E3F`, brass `#CF9455` as mark only, `--radius` 2px);
WhatsApp green fixed `#0F8344` → `#0B6E39` (KNOWN_ISSUES #16); dark mode not
authored (`color-scheme: light` pinned); primitives `.ledger-rail .rail-label
.ruled-entry .act-band .placeholder-mark .slip .btn-primary .btn-quiet .measure`.
Global focus system: base `:focus-visible` 2px solid ink (12.53:1 on paper),
brass (5.17:1) on ink surfaces; six ui primitives stripped of `outline-none` +
alpha rings — exactly one focus indicator anywhere. Tailwind scan boundary
`@source not` for `repos/ docs/ .opencode/ logos/` (147 → 63 scanned files,
−6.5 KB dead CSS; leak source corrected of record to the studio's own `docs/`).
Fonts via `next/font/google`: Playfair + Geist retired → Inter + Fraunces; then
the measured payload fix — Fraunces ships `wght + opsz`, normal only (italic was
loaded-but-unused; SOFT/WONK rendered at defaults): `/` preloads 311.3 → 115.8 KB,
total woff2 781 → 357 KB, zero italic @font-face; `/about` faux-italic `<em>`
replaced with the house emphasis. Home rebuilt as a margin-rail ledger (§01–§05 +
navy act band, one `h1`, canonical CTA wording per §2.3, one honest stat tile,
testimonials only as designed `.placeholder-mark`, founder plate = owner-approved
interim graded 4:5 crop, acceptance-tested via sharp, whole plate links `/about`,
"first consultation is free" retained per gate). Skip link added; booking-form
mobile CTA height collapse and select-trigger height fixed per the a11y findings.
`.rail-label` re-issued as `:where()` (zero specificity) so marker utilities win;
both inline colour styles converted to token utilities with a computed-colour
proof (pixel-identical). Screenshots at all five charter widths + float-graze
checks (verified: no graze).

**Files changed.** Tokens: `site/app/globals.css`. Home + shared: `site/app/page.tsx`,
`site/app/layout.tsx`, `site/components/site/{header,footer,whatsapp-float,booking-form}.tsx`,
`site/components/ui/{button,input,textarea,select,accordion,badge}.tsx`,
`site/app/about/page.tsx`. Assets: `site/public/images/founder-plate.{webp,avif}`
(original `father.jpg` untouched) + `site/tools/process-founder-photo.mjs`
(dev-only). Tests: `site/tests/e2e/**` (helpers + 3 spec files). Evidence/docs:
`docs/design/phase-2/tokens.md`, `docs/design/screenshots/phase-2/**`,
`docs/design/a11y/phase-2-2026-11-15/**`,
`docs/design/critic/phase-2-home-2026-11-15.md`, ledgers. This commit.

**Dependencies added.** None new (TOOLING_LOG Phase 2 rows: in-repo
`process-founder-photo.mjs`; `sharp` already present; `next/font` framework
feature; fonts SIL OFL, self-hosted by next/font at build time).

**Tests run.** Unit 5/5; e2e **30/30** (22 home.spec incl. honesty regression
guards — no stars/ratings/invented names/"Book Appointment", checked against
`page.content()` incl. RSC payload; 3 booking offline e2e; 6 responsive — measured
overflow = 0 at 360/768/1024/1440/1920). axe **0 violations** on `/` and `/book`
(baseline 0). Build exit 0 (16 static targets); typecheck 0; lint exit 0 (#13
error fixed via `useSyncExternalStore`; the 2 pre-existing warnings remain,
KNOWN_ISSUES #13). Contrast verifier: 19 pairs deep-equal. LHCI (15 Nov, noise
caveat #17): 8-route autorun exit 0, a11y assertion passed, a11y 100 × 8,
CLS 0 × 8; quiet run on `/`: perf 93, TBT 34 ms, FCP 766 ms — beats the Phase 0
baseline (89 / 76 ms); busy-run TBT 3.5–5.7 s are upper bounds only. LCP ~3.3 s
on `/` remains open (KNOWN_ISSUES #15, image optimisation).

**Problems found and resolved.** (1) Focus-token defect: base `outline-ring/50`
≈2.88:1 → solid token outline + primitive sweep, verified across 78 tab stops.
(2) Dead-CSS leak first attributed to `repos/` — corrected with a measured control
experiment: the source was the studio's own `docs/` (prose quoting class names +
the committed evidence CSS re-seeding utilities); boundary shipped, correction of
record in tokens.md §9.1. (3) Lighthouse measurement contamination (KNOWN_ISSUES
#17): identical builds measured TBT 1071 → 5955 ms; fonts A/B-exonerated (task
grew without Fraunces); experiment edits reverted from a backup; distributions
recorded; foreground LHCI runs from now on. (4) Font payload: unused italic +
default-pinned axes preloaded 311 KB → measured fix. (5) `/about` faux-italic
regression caught by the art-director before it shipped. (6) Overnight machine
reboot cleared zombie pair #14; dev server relaunched in the Orchestrator session.
(7) One QA selector bug (`star` substring-matching `-start`) fixed in-test; two
stale alt assertions updated after the F5 `alt=""` change. (8) `.rail-label`
colour: the art-director's `:where()` deviation accepted (8 of 10 markers must
keep receding); computed-colour proof pixel-identical. (9) Free-model quota killed
one subagent launch → retry succeeded (#11 pattern).

**Exit criteria.** Charter PAGE COMPLETION RULE met for Home: content final or
honestly marked (placeholders designed and visible); responsive at all five
widths (overflow 0); all states (focus/hover/active verified); keyboard +
screen-reader usable (axe 0, manual WCAG 2.2 AA pass); images optimised with
dimensions + honest alt (founder plate 47.7 KB webp + avif); SEO metadata served
from layout + site-config (SEO category was 100 × 8 at baseline); Lighthouse
targets judged with the #17 caveat (a11y/SEO/BP 100 × 8, CLS 0 × 8, quiet-run
perf 93); screenshots reviewed at five widths; tests exist (35). **Critic
verdict: APPROVE round 1** (originality 4, hierarchy 4.5, consistency 4.5,
usability 4.5, accessibility 5, performance 4, brand fit 4; zero majors, zero
blockers; every smoke-test backlog major verified resolved). All three optional
minors closed: (1) founder sunglasses = owner-tracked interim (#1a), (2)
float-graze verified a non-issue, (3) inline styles → utilities. Review:
`docs/design/critic/phase-2-home-2026-11-15.md`.

## Phase 3 - Content pages (15-17 Nov 2026)

**Work done.** All seven remaining routes built through the full studio pipeline
(engineering -> qa -> a11y -> screenshots -> critic) in five stages:

- **Stage A `/book`** - the booking slip: request-only form (name / service /
  message, config-sourced options), `?service=` preselect via
  `useSyncExternalStore` (Turbopack-prerender-safe; `useSearchParams` breaks
  static builds without a Suspense boundary), canonical CTA wording table
  (header "Book a consultation"; primary "Book a consultation on WhatsApp";
  submit "Open WhatsApp with my request"; phone "Call the office · {number}").
- **Stage B `/about` + `/services`** - founder plate (owner-tracked interim
  #1a), one honest stat, services recognition layer with six deep links to
  `/book?service=`.
- **Stage C `/faq` + `/contact`** - seven always-visible answers (zero
  `<details>`), fee sentence exactly once (spec §0.6), slip desk card (tel /
  WhatsApp / address+Maps / hours / email last, zero iframe), question-prefill
  exceptions. Closures: O-6 FAQPage JSON-LD generated with `JSON.stringify`
  over config `faqs[]` (fee pair = config answer + newline + the shared
  `FREE_FIRST_CONSULTATION` constant, so schema byte-matches the served
  block); O-7a desk wa.me `aria-label` built from config.
- **Stage D `/why-choose-us` + `/testimonials`** - manifesto h1; four
  config-verbatim way-of-working entries with honest check-links to /faq on
  01/03/04 (the on-time entry deliberately link-free); testimonials honest
  reserve (one clearly-marked placeholder + collection question-prefill +
  record line + three proof links + unsigned principal line); the 4 invented
  config testimonials never render (qa wall extended to visible text AND RSC
  payload on all routes); `page-hero.tsx` + `feature-icon.tsx` deleted; lint
  reached 0 errors / 0 warnings; `mapsQuery` removed from site-config.
- **Stage E (17 Nov) - KNOWN_ISSUES #15 closed by diagnosis:** perf-seo proved
  the LCP element sat inside the head `<Reveal y={8}>` on all 7 rebuilt routes
  (final candidate ~420 ms past FCP = the `--motion-enter` ramp; simulated
  +2.3-2.5 s via the hydration window; `/book` control: LCP = FCP, 0.76 s,
  perf 99; image weight, fonts and delay props all exonerated - the 14 Nov
  "image-led" diagnosis was stale). Fix P1: heads unwrapped x7 (minimal-diff:
  wrapper divs + classNames preserved); P3: `fetchPriority="high"` on both
  founder images. Post-fix verification: **observed FCP-to-LCP gap +0 ms on
  all 8 routes** (deterministic criterion; simulated values remain KNOWN_ISSUES
  #17 upper bounds - the untouched control's perf score fell 99 to 73 on
  identical bytes, proving run contamination; /about's simulated 3.32 s is the
  image-arrival model and is flagged for the quiet-machine re-measure).
  Sanctioned tidy: `section-header.tsx` + `reveal.tsx` deleted (zero
  consumers), `.reveal-in` rule / keyframes / reduced-motion member +
  `--motion-enter` / `--ease-entrance` retired from globals.css (motion sheet
  now 4 tokens, all live); O-8 skip-link fix `<main tabIndex={-1}>` shipped.

**Files changed.** `site/app/**` (7 page files, layout.tsx, globals.css),
`site/lib/site-config.ts`, `site/components/site/**` (page-hero, feature-icon,
section-header, reveal deleted), `site/tests/**` (25 new e2e specs since Stage
B; shared honesty wall in helpers.ts extended to the RSC payload;
fetchpriority + tabindex guards), plus docs: page-specs, tokens.md,
DECISION_LOG, a11y report + evidence, 7 critic reviews, 40/40 screenshots,
stage-e baseline evidence, KNOWN_ISSUES, PHASE_STATUS, SESSION_HANDOFF.

**Dependencies added.** None (all tooling pre-existing and logged in
TOOLING_LOG.md).

**Tests run.** Final state: **123/123 e2e + 5/5 unit against the production
build** (served via `next start`; Playwright + `node --test
tests/booking.test.ts`), tsc 0, lint 0 errors / 0 warnings, all 8 routes 200.
axe-core: 0 violations on all 8 routes (Stage B/C/D audits; Stage D addendum in
`docs/design/a11y/phase-3-2026-11-16/report.md`).

**Problems found and resolved.** (1) Free-model quota killed subagent runs
mid-flight four times (a11y Stage C, a11y Stage D, perf-seo E2, engineer E3) -
the inventory-first retry protocol recovered every one; in two cases the work
was already complete and only the report had been lost. (2) Turbopack
persistent-cache stale CSS (KNOWN_ISSUES #8) - clean prod builds (delete
`.next` first) used as ground truth; one "clean" build was discovered NOT
clean (deletion failed on a lock left by the just-killed dev server) and
re-run properly. (3) React serialises a bare `data-numeric` attribute as
`"true"` (qa spec fix). (4) `/faq` band assertion `last-child` -> 
`last-of-type` (the JSON-LD script is a legitimate last child). (5) Next
16.4.6 emits camelCase `fetchPriority` in SSR HTML (HTML parsing normalizes
attribute names; qa guards use the rendered DOM). (6) `node --test <dir>`
fails in this setup - invoke the file directly.

**Exit criteria.** MET: all 8 routes carry their own per-route critic APPROVE
(round 1, zero majors: book / about / services / faq / contact /
why-choose-us / testimonials + the Phase 2 Home review); responsive 360-1920
via 40/40 screenshots at exact charter widths; axe 0 + clean manual audits on
every route; SEO metadata + FAQPage JSON-LD verified byte-matched; honesty
rules enforced site-wide (no invented testimonials, no invented fees, zero
"appointment" on CTA surfaces, the one placeholder clearly marked); LCP
deterministic criterion met on all routes (simulated confirmation = the
KNOWN_ISSUES #17 quiet-machine item). Phase 3 closed: this entry + PHASE_STATUS
DONE + KNOWN_ISSUES refresh + SESSION_HANDOFF update + commit (NO push /
deploy / publish without the owner).
