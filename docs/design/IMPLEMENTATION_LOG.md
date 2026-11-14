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

## Charter adoption (14 Nov 2026)

Owner-provided charter saved as `docs/design/STUDIO_CHARTER.md` (replaces the
Orchestrator-written draft; ownership matrix, path convention and model notes
migrated to `STUDIO_ROLES.md`). Created the charter's required documentation set:
`STUDIO_ROLES.md`, `REPOSITORY_REFERENCE.md`, `THIRD_PARTY_NOTICES.md`,
`KNOWN_ISSUES.md`, `IMPLEMENTATION_LOG.md` (this file), `FINAL_QA_REPORT.md` (stub
until Definition of Done). Verified all 9 charter seed repositories via the GitHub
API (all active, all permissively licensed) — details in
`REPOSITORY_REFERENCE.md`. Charter PROJECT DETAILS pre-filled from project records;
owner to confirm in Phase 1. Findings logged: `motion` dep unused; direct `axe-core`
dep redundant; Storybook deliberately not adopted (tooling-light constraint).
