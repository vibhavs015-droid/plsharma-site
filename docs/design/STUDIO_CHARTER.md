# Design Studio Charter — P.L. Sharma And Company website

Standing multi-agent design studio for `tax-consultant-website/`. The primary OpenCode agent is the **Orchestrator**; the seven subagents in this project's `.opencode/agents/` do the work. This project is a website, so all studio artifacts live under `docs/design/`.

A new session must read this charter and `PHASE_STATUS.md` before doing anything.

Path convention: every path in agent prompts and permission rules is relative to this project root — `site/…` means `tax-consultant-website/site/…`, `docs/…` means `tax-consultant-website/docs/…`.

## Roles and file ownership (binding)

| Agent | Owns | May edit | Shell |
|---|---|---|---|
| `critic` | design review verdicts | `docs/design/critic/*` only | none |
| `ux-strategist` | IA, journeys, hierarchy, CTAs, wireframes | `docs/**` only | default |
| `art-director` | tokens, colour, type, spacing, motion, imagery | `docs/**` + `site/app/globals.css` | default |
| `frontend-engineer` | implementation | full `site/` source | default |
| `a11y-checker` | WCAG 2.2 AA audits | nothing (reports) | check commands only |
| `qa-engineer` | test suites | test files only (`site/tests/**`, `*.test.*`, `*.spec.*`) | test/build commands |
| `perf-seo` | Lighthouse, CWV, SEO audits | nothing (reports) | check commands only |

Nobody else edits product code. The Orchestrator may edit anything but prefers delegating.

## Phase lifecycle

1. **Brief** — Orchestrator writes a phase brief into `docs/design/PHASE_STATUS.md`: goal, inputs, outputs, per-agent file scope, exit criteria.
2. **Delegate** — Orchestrator hands work to named subagents (via the subagent tool), e.g. `critic` to review the Home page screenshots, `art-director` to produce a token sheet. Never two agents editing the same file at once.
3. **Verify** — Orchestrator checks outputs against the brief's exit criteria (run the tests, open the page, read the report).
4. **Critic gate** — `critic` reviews the result. Findings, scores 1-5 (originality, hierarchy, consistency, usability, accessibility, performance, brand fit), verdict APPROVE or REJECT with required fixes.
5. **Iterate** — on REJECT, fix the required fixes and re-submit. Max **3 REJECT rounds per item**; after the third the Orchestrator decides the resolution itself and logs why in `DECISION_LOG.md`.
6. **Done** — phase is marked done in `PHASE_STATUS.md` only with a critic APPROVE and verified exit criteria.

Reviews live in `docs/design/critic/<topic>-<YYYY-MM-DD>.md` (append-only, never edited afterwards).

## Logging

- `DECISION_LOG.md` — every consequential decision with its reason. Append-only.
- `PHASE_STATUS.md` — current phase state, updated after every step so any new session can resume.
- `TOOLING_LOG.md` — every installed tool: version, source, licence, purpose, removal steps.

## Models

All agents inherit the session model. To strengthen one (recommended for `critic` and `art-director`), add a frontmatter line to the agent file: `model: provider/model#variant`.

## Escalation

The Orchestrator asks the owner when: an agent needs a new dependency, the critic deadlock rule triggers, the booking flow or site architecture would change, or anything paid or heavy would be installed.

## Tooling summary

Playwright (+ chromium), axe-core via `site/tools/axe-check.mjs`, Lighthouse CI (`site/lighthouserc.json`), and the `playwright` MCP server configured in `.opencode/opencode.json`. See `TOOLING_LOG.md` for versions, licences and removal.
