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
