# Session handoff — read this first in every new session

Purpose: any new OpenCode session (fresh context window) resumes this project at
full quality with zero information loss. Last updated: 14 Nov 2026.

## 0. What this project is

Professional website for **P.L. Sharma And Company** — tax consultancy, Jaisalmer,
India (founder: Parbhati Lal Sharma, 25+ years in practice). Next.js 16 site in
`site/` with 8 pages (Home, About, Services, Why Choose Us, Testimonials, FAQ,
Contact, Book) and WhatsApp-first booking. A multi-agent design studio (7 OpenCode
subagents + Orchestrator rules) was set up on 13–14 Nov 2026 and lives inside this
folder. Full project history: `PROJECT-NOTES.md`. Deployment plan:
`DEPLOYMENT.md` (recommended domain: plsharmaco.in at Porkbun → Vercel).

## 1. Start-up procedure (every session)

1. **Start OpenCode inside this folder** (`tax-consultant-website/`). The agent
   files and MCP config live in `.opencode/` here and are discovered from the
   working directory upward — a session started in the parent workspace will NOT
   see them. (If a session is already running elsewhere, move it here with
   `session_move`.)
2. Read, in order: this file → `docs/design/STUDIO_CHARTER.md` →
   `docs/design/PHASE_STATUS.md`.
3. Verify the studio is alive:
   - Agents: `& "C:\Users\ASUS\AppData\Local\Programs\@opencodedesktop\resources\opencode-cli.exe" debug agents`
     → expect ids: critic, ux-strategist, art-director, frontend-engineer,
     a11y-checker, qa-engineer, perf-seo (plus built-ins). (The `opencode`
     command is not on PATH; use the full CLI path above.)
   - MCP: same CLI, `mcp list` → `✓ playwright  connected`. Right after a
     directory move it shows `pending` — wait ~10 s and re-check.
4. Run the dev server only if you need the site: `npm run dev` in `site/` — read
   the port it prints (3000 is often held by a stale process; then it prints 3001).

## 2. How the studio works (quick reference)

- The main agent is the **Orchestrator**. Delegate via the subagent tool by agent
  id: `critic`, `ux-strategist`, `art-director`, `frontend-engineer`,
  `a11y-checker`, `qa-engineer`, `perf-seo`. Example: "@critic review the Home
  page screenshots and give me a verdict". Full role definitions in
  `.opencode/agents/*.md`; file-ownership matrix in the charter — binding.
- Phase lifecycle: write a brief into `docs/design/PHASE_STATUS.md` (goal, inputs,
  outputs, per-agent file scope, exit criteria) → delegate → verify → critic gate
  → iterate (max **3 REJECT rounds per item**, then decide yourself and log why)
  → mark done only with critic APPROVE + verified exit criteria.
- After every step update `docs/design/PHASE_STATUS.md`; log decisions with
  reasons in `docs/design/DECISION_LOG.md` (append-only); critic reviews land in
  `docs/design/critic/<topic>-<YYYY-MM-DD>.md` (append-only).
- At the end of a session, update the status list in `PROJECT-NOTES.md` so its
  history stays truthful.

## 3. Current state (as of 14 Nov 2026)

- **Phase 0 — studio setup: DONE.** All 7 agents created, verified with
  `debug agents`, permissions resolved as designed; Playwright MCP connected;
  toolchain installed and smoke-tested (axe scan of Home returns zero
  violations).
- **Phase 1 — not started.** Awaiting the owner's Charter prompt. Open a phase by
  writing its brief into `PHASE_STATUS.md`.
- One real critic review already exists (from the setup smoke test):
  `docs/design/critic/smoke-test-2026-11-13.md` — verdict **REJECT**, 3 majors on
  the Home page: (1) founder photo is a festive snapshot wearing a consultant
  title, (2) invented testimonials with hard-coded 5-star rows, (3) two back-to-
  back identical card grids. Six required fixes listed there — these are the
  natural first work items of the next phase. Do not re-derive them; the review
  file is the source of truth.

## 4. Environment facts

- OpenCode **v2.1.4** (desktop app). CLI path:
  `C:\Users\ASUS\AppData\Local\Programs\@opencodedesktop\resources\opencode-cli.exe`.
- Node v24.16.0, npm 11.13.0. This project folder is a git repo (identity
  configured).
- Site stack: Next.js 16.4.6 (Turbopack, **Cache Components enabled**, 16 static
  routes), React 19.3, Tailwind v4, shadcn/ui Nova preset, fonts Playfair Display
  (headings) + Inter (body) via next/font.
- Brand tokens in `site/app/globals.css` (Tailwind v4 `@theme`): slate-navy
  `#282E3F`, warm gold `#CF9455`, ivory background; tuned contrast pairs
  `--gold-ink`, `--input`, WhatsApp green `#0F8344`.
- Studio tooling (all free, licences in `TOOLING_LOG.md`): @playwright/test
  1.65.0, @playwright/mcp 0.0.85, @axe-core/playwright + axe-core 4.14.0,
  @lhci/cli 0.16.1, chromium 158.0.8127.18. Dev-dependencies of `site/`.

### Commands (run from `site/`)

| Task | Command |
|---|---|
| dev server | `npm run dev` (note the printed port) |
| production check | `npm run build` |
| lint | `npm run lint` |
| unit tests | `node --test tests/booking.test.ts` |
| e2e / visual (when written) | `npx playwright test` |
| axe scan of one route | `node tools/axe-check.mjs http://localhost:<port>/<route>` |
| Lighthouse CI | `npm run build` first, then `npx lhci autorun` (`lighthouserc.json`) |

## 5. Pitfalls (already paid for — do not re-learn)

- **Free-model quota:** a subagent launch can fail with "Free usage limit
  reached" on the provider's free tier. It succeeded on a retry minutes later —
  retry once before escalating; only the owner can subscribe (opencode.ai/go).
- **Per-agent temperature is not settable in V2** (legacy field deprecated;
  `request.body` overlays are not yet sent by the session runner). Reviewer
  strictness lives in the prompts, not a temperature.
- **Permission model:** rules are ordered, last match wins, `*` spans slashes;
  patterns are relative to the project root (dual `**/tax-consultant-website/…`
  fallbacks cover absolute paths). `opencode debug agents` shows the resolved
  chain per agent.
- **Desktop harness injects `browser: deny` into every subagent** — subagents use
  the playwright MCP tools or screenshots handed to them, not the built-in
  desktop browser.
- **Port 3000 busy:** an older node process often holds it; the dev server
  prints its real port. `lighthouserc.json` assumes 3000 — free the port or
  adjust.
- **Dev owns `.next`:** never run `npm run build` while a dev server is running
  in the same folder.
- **Stale CSS in dev:** after editing `globals.css`, if a token change "doesn't
  apply", delete `.next` and restart the dev server (bit during the 13 Nov pass).
- **Cache Components:** `new Date()` at prerender is forbidden in app code
  (past bug: booking-date `min`); `app/robots.ts` / `app/sitemap.ts` were written
  to avoid it. Keep it that way.
- **npm audit:** 21 findings, all transitive inside dev tooling, none ship at
  runtime. `npm audit fix --force` deliberately not run (forces breaking majors).
- **Playwright MCP after an upgrade:** re-run `npx playwright install chromium`
  if it reports a missing browser revision.

## 6. Owner preferences (durable — never violate)

- Free tools only. Nothing paid, nothing heavy, no uploads — ask before adding.
- **Real data only.** Invented numbers (5,000+ returns, 1,200+ clients) were
  removed once already; never re-add without real data. Same rule for
  testimonials: no invented names presented as clients.
- The owner is not an editor: build the thing, state the choice, move on; at most
  one batched question when genuinely blocked.
- Never overwrite the user's originals; new work goes to new folders.
- Owner-supplied items still pending (see `PROJECT-NOTES.md`): team photos
  (team-1.jpg Vikram, team-2.jpg Bhawani, team-3.jpg Hemraj → `site/public/images/`),
  real story/testimonials/team bios, then domain purchase + Vercel deploy per
  `DEPLOYMENT.md`, then Google Search Console + Business Profile.

## 7. If something seems broken

- Agents missing → the session was started in the wrong directory (see §1).
- MCP pending → wait 10 s, re-run `mcp list`.
- Build/dev weirdness → check the `.next`-ownership and stale-CSS notes in §5.
- Anything unclear about why things are the way they are →
  `docs/design/DECISION_LOG.md` records the reasons.
