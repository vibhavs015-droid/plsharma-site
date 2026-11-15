# Session handoff — read this first in every new session

Purpose: any new OpenCode session (fresh context window) resumes this project at
full quality with zero information loss. Last updated: 15 Nov 2026.

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
   `docs/design/STUDIO_ROLES.md` → `docs/design/PHASE_STATUS.md`.
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
  → mark done only with critic APPROVE + verified exit criteria. The file-ownership
  matrix lives in `docs/design/STUDIO_ROLES.md` — binding.
- After every step update `docs/design/PHASE_STATUS.md`; log decisions with
  reasons in `docs/design/DECISION_LOG.md` (append-only); record phase work in
  `docs/design/IMPLEMENTATION_LOG.md`; keep `docs/design/KNOWN_ISSUES.md` current;
  critic reviews land in `docs/design/critic/<phase-or-page>.md` (append-only).
- At the end of a session, update the status list in `PROJECT-NOTES.md` so its
  history stays truthful.

## 3. Current state (as of 15 Nov 2026)

- **Phase 0 — setup + baseline: DONE** (critic APPROVE round 2). All 7 agents
  verified; toolchain installed and smoke-tested; baseline numbers in
  `BASELINE_REPORT.md`.
- **Phase 1 — discovery: DONE** (critic APPROVE round 2); owner passed the
  [GATE] on 14 Nov: "Kept Ledger" direction APPROVED; "first consultation is
  free" = owner-confirmed fact (stays); founder photo = interim graded crop
  (reshoot pending); header keeps all 8 links.
- **Phase 2 — Design System + Home: DONE** (critic APPROVE round 1, 15 Nov
  2026). The "Kept Ledger" token system ships in `site/app/globals.css` (sheet:
  `docs/design/phase-2/tokens.md`); Home (`/`) rebuilt as the margin-rail ledger
  (§01–§05 + act band, one `h1`, honest stat tile, placeholder-marked
  testimonials, canonical CTA wording). Verified: 35/35 tests, axe 0 violations
  on `/` + `/book`, build exit 0, a11y 100 × 8 (LHCI), quiet-run perf 93 /
  TBT 34 ms (beats the baseline; measurement caveat in KNOWN_ISSUES #17).
  Review: `docs/design/critic/phase-2-home-2026-11-15.md`.
- **Next: Phase 3 — remaining pages** (`/about`, `/services`, `/why-choose-us`,
  `/testimonials`, `/faq`, `/contact`, `/book`), each per the charter PAGE
  COMPLETION RULE with its own critic review. Open it by re-reading
  `STUDIO_CHARTER.md` and writing the brief into `PHASE_STATUS.md`.
- Carried backlog (KNOWN_ISSUES): #15 LCP image optimisation; `/book` slip
  rebuild (retire "Book an Appointment"/"Send Booking Request" — keep e2e
  expected strings in sync); reduced-motion follow-up test; 2 lint warnings
  (#13); founder reshoot (#1a); PLACEHOLDER content awaits owner data
  (testimonials, team photos).
- The setup smoke-test review (`docs/design/critic/smoke-test-2026-11-13.md`,
  REJECT with 3 Home majors) is fully resolved by the Phase 2 rebuild — history
  only; do not reopen it.

## 4. Environment facts

- OpenCode **v2.1.4** (desktop app). CLI path:
  `C:\Users\ASUS\AppData\Local\Programs\@opencodedesktop\resources\opencode-cli.exe`.
- Node v24.16.0, npm 11.13.0. This project folder is a git repo (identity
  configured).
- Site stack: Next.js 16.4.6 (Turbopack, **Cache Components enabled**, 16 static
  routes), React 19.3, Tailwind v4, shadcn/ui Nova preset, fonts Fraunces
  (display, `wght + opsz`, normal only) + Inter (body) via next/font.
- Brand tokens in `site/app/globals.css` (Tailwind v4 `@theme`): "Kept Ledger"
  palette — paper `#FAF6EC`, ink `#282E3F`, brass `#CF9455` (mark only), WhatsApp
  green `#0B6E39` (AA-fixed, 5.89:1); full sheet + measured ratios in
  `docs/design/phase-2/tokens.md`. Scan boundary: `@source not` for
  `repos/ docs/ .opencode/ logos/` — a class name written anywhere inside the
  scan is a class name (docs prose re-seeds dead utilities).
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
| e2e tests (30) | `npx playwright test` (baseURL `:3000`; needs the dev server) |
| axe scan of one route | `node tools/axe-check.mjs http://localhost:<port>/<route>` |
| Lighthouse CI | stop the dev server, `npm run build`, then `npx lhci autorun` — LHCI starts its own server on **3200**; set `CHROME_PATH` to the Playwright chromium; **run lhci in the foreground** (see pitfalls) |

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
  prints its real port. LHCI runs on **3200** and starts its own server — stop
  the dev server before `npm run build`, and run lhci **in the foreground** (a
  cancelled background lhci can be re-executed by the harness and orphan
  processes; KNOWN_ISSUES #14).
- **Lighthouse on this machine can be noise-contaminated** (KNOWN_ISSUES #17):
  identical builds measured TBT 1.0–6.0 s run-to-run (one giant
  "Unattributable" task). Treat TBT/LCP/perf from a busy session as upper
  bounds; judge on verifiable numbers (byte weights, FCP, CLS, a11y/SEO) and
  re-measure on a quiet machine/CI before Definition of Done.
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
