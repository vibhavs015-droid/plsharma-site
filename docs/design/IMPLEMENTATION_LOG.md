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
