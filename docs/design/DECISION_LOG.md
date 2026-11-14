# Decision log — P.L. Sharma & Co. design studio

Append-only. One entry per decision, newest at the bottom. Never delete entries.

## 2026-11-13 — Studio created with OpenCode V2 markdown agents
- **Decision:** implement the studio as markdown agent files in `.opencode/agents/` at the OpenCode workspace root.
- **Why:** verified against the installed OpenCode v2.1.4 docs — agents are `.opencode/agents/<name>.md` with `mode: subagent`; permissions are ordered rules (`action` / `resource` / `effect`, last match wins). OpenCode discovers project `.opencode` directories from the session's working directory upward, and the session runs from the workspace root.

## 2026-11-13 — No per-agent temperature
- **Decision:** leave `temperature` unset in every agent file; encode strictness in each agent's system prompt instead.
- **Why:** the owner asked for 0.2 for reviewers, but V2 docs deprecate legacy top-level `temperature`, and the replacement (`request.body` overlay) is preserved-but-not-sent by the current session runner. Setting it would be a no-op.

## 2026-11-13 — Models left unset
- **Decision:** no `model:` field in any agent file; all agents inherit the session model.
- **Why:** owner said to leave the model field unset for now. Upgrade path: add `model: provider/model#variant` to `critic.md` and `art-director.md` (strongest model recommended there).

## 2026-11-13 — Artifacts under docs/design (not docs/ui)
- **Decision:** all studio artifacts live in `tax-consultant-website/docs/design/`.
- **Why:** owner rule — `docs/design` for website projects, `docs/ui` for Flutter. This project is obviously a website (Next.js), so no question was needed.

## 2026-11-13 — Dev dependencies installed in site/
- **Decision:** add `@playwright/test`, `@playwright/mcp`, `@axe-core/playwright`, `axe-core`, `@lhci/cli` to `site/package.json` as devDependencies; install the Playwright chromium browser only.
- **Why:** owner pre-authorised exactly these free tools ("set up Playwright (with browsers), axe-core, and Lighthouse CI as dev dependencies"). Chromium-only keeps the download to one browser. Versions, licences and removal steps in `TOOLING_LOG.md`.

## 2026-11-14 — Studio relocated into the project folder
- **Decision:** moved `.opencode/agents/` (all 7 agent files) and `.opencode/opencode.json` (Playwright MCP server) from the OpenCode workspace root into `tax-consultant-website/.opencode/`; the working session itself was moved into the project directory with `session_move`.
- **Why:** the owner asked for the studio to live inside the project folder (self-contained project). Verified rule: OpenCode discovers project `.opencode` directories from the current working directory upward — so sessions working on this project must be based in `tax-consultant-website` (or a subdirectory) to see the agents and MCP config. The root `AGENTS.md` pointer was updated to say this.
- **Effect:** a session started at the workspace root will NOT see the agents; start or move it into `tax-consultant-website` first.

## 2026-11-14 — Agent paths made project-relative
- **Decision:** rewrote all 7 agent prompt paths (`site/…`, `docs/…`) and permission patterns (`docs/design/critic/*`, `site/tests/*`, `site/app/globals.css`) relative to the project root, keeping the old `**/tax-consultant-website/…` patterns as absolute-path fallbacks.
- **Why:** after the relocation the session's workspace root is `tax-consultant-website` itself; workspace-root-relative paths would have resolved to a doubled `tax-consultant-website/tax-consultant-website/…` path and the folder-scoped write allows would have missed. Verified afterwards with `opencode debug agents`.

## 2026-11-14 — Models set for critic and art-director
- **Decision:** `critic` → `model: opencode/nemotron-3.5-super-vl-free`; `art-director` → `model: opencode/deepseek-v4.1-flash-free`. Every other agent keeps the default (inherits the session model).
- **Why:** owner instruction to use Nemotron 3.5 Super VL and DeepSeek V4.1 Flash. Exact IDs confirmed from two sources (`tools.opencode.models` and `opencode models` CLI) — both free-tier, status active. No `#variant` appended (owner did not ask for one); if wanted, variants exist — nemotron: none/minimal/low/medium/high/xhigh, deepseek: low/high/max — as `model: <id>#<variant>`.

## 2026-11-14 — Owner charter adopted
- **Decision:** saved the owner-provided `STUDIO_CHARTER.md` (replacing the Orchestrator-written draft; ownership matrix, path convention and model notes migrated to the new `STUDIO_ROLES.md`). Created the charter's required doc set: `STUDIO_ROLES.md`, `REPOSITORY_REFERENCE.md`, `THIRD_PARTY_NOTICES.md`, `IMPLEMENTATION_LOG.md`, `KNOWN_ISSUES.md`, `FINAL_QA_REPORT.md` (stub until Definition of Done). Charter PROJECT DETAILS pre-filled from project records; owner to confirm in Phase 1.
- **Why:** the owner's canonical charter now governs ([GATE] semantics, targets, page-completion rule, re-read-per-phase requirement). Reading order updated in `AGENTS.md`, `SESSION_HANDOFF.md` and `PHASE_STATUS.md`.
- **Findings during adoption (all logged where required):** all 9 charter seed repos verified via GitHub API — active and permissively licensed (Apache-2.0/MIT/MPL-2.0); `motion` dependency unused in code (grep) — removal candidate pending owner approval; direct `axe-core` dep redundant — kept per owner's explicit instruction; Storybook deliberately not adopted (charter's tooling-light constraint; Playwright screenshots + axe cover visual states). Stack choice (Next.js) already recorded in PROJECT-NOTES; no restack.

## 2026-11-14 — Phase 0 execution decisions
- **Decision:** (1) Stopped both stale in-house servers before baseline runs (PID 19780 `next start` on :3000, PID 21340 `next dev` on :3001) — the build needs `.next` free and the stale production server was the port-3000 squatter behind KNOWN_ISSUES #10; a dev server is restored at phase end. (2) `site/lighthouserc.json` moved from port 3000 to **3100** (lhci spawns and owns its own production server; 3100 keeps it out of the 3000/3001 dev-habit collision zone). (3) LHCI gets its browser through `CHROME_PATH` = Playwright's chromium binary (`%LOCALAPPDATA%\ms-playwright\chromium-1254\chrome-win64\chrome.exe`) — no system-Chrome dependency, env var dev-only, nothing committed. (4) Phase 0 is record-only: the lint error found in `booking-form.tsx` is logged (KNOWN_ISSUES #13), not fixed — charter baseline rule, no product-code changes in Phase 0.
- **Why:** machine constraint says light tooling and few duplicate processes; the charter requires recording pre-existing failures rather than silently repairing them mid-baseline.

## 2026-11-14 — Phase 1 execution decisions
- **Canonical CTA wording (critic F3 fix):** primary CTA **"Book a consultation on WhatsApp"** (end-of-page navy band, float accessible name, hero CTA); header button **"Book a consultation"** → `/book`; `/book` submit **"Open WhatsApp with my request"**; phone as **"Call the office"** / quiet tel link. One wording per surface, defined in `user-problem.md` §2.3 and referenced by both art-director files. Retired: "Book an Appointment", "Send Booking Request", "Send on WhatsApp", "Book on WhatsApp", "Send the details".
- **Orchestrator surgical product edit (critic F1 fix):** removed the unconfirmed stat tiles `"1:1"` and `"100%"` from `site/lib/site-config.ts`, merging the two owner-confirmed facts into one honest tile (`"Since 2001" / "25+ Years in Practice in Jaisalmer"`). Done by the Orchestrator rather than the frontend-engineer because it is a 2-line honesty-compliance edit mandated by the critic with zero design decisions; the Home and /why-choose-us stats bands render whatever the array holds, so no layout logic breaks. The band itself gets redesigned in Phase 2 (smoke-test REJECT backlog).
- **Duplicate-run race on `user-problem.md`:** after the server restart, two ux-strategist runs raced; the un-reviewed second version overwrote the file at 13:00. **Decision:** the critic-reviewed version 1 is canonical (restored verbatim, with an in-file note); the duplicate's ideas are discarded except one — dropping `/testimonials` + `/why-choose-us` from the header nav until real testimonials arrive — which is deferred to the owner at the **[GATE]** as an option, since it was never reviewed and is an owner-facing IA change.
- **Contrast traceability (critic F2 fix):** committed `site/tools/contrast-check.mjs` (dependency-free WCAG 2.2 verifier) and its output `docs/design/discovery/contrast-evidence.json`; all vibe-board §3 figures reproduce exactly (incl. the `#0F8344` 4.47:1 defect).

## 2026-11-14 — Port correction: lhci 3100 → 3200
- **Decision:** the first LHCI run (background) was cancelled mid-flight when the OpenCode server restarted. Its process tree survived as orphans (lhci CLI 22976, wrapper 5088, lighthouse child 4964); all were killed cleanly, but the spawned `next start` server (PID 14012) survived as an elevated zombie that `taskkill /T /F` cannot touch from a non-elevated shell (`Access is denied`). Rather than ask the owner for a UAC elevation, lhci was moved to port **3200** (`lighthouserc.json`: `startServerCommand` + all 8 URLs) and the run relaunched fresh; the zombie is logged as KNOWN_ISSUES #14. Partial `lhr-*.json` artifacts from the cancelled run were deleted so no stale reports can be mistaken for results.
- **Why:** deterministic verification over salvaging a partial run (5/8 URLs); one port is a cheaper loss than a UAC prompt on the owner's screen; charter requires approval for permission escalations.
