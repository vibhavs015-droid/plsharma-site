# Baseline report — Phase 0 (14 Nov 2026)

Pre-work state of the existing repository, verified by tool runs. Every number below
comes from a captured tool output in this session; nothing is asserted without a
source. Charter rule for this phase: **record, do not fix** — product-code findings
are logged in `KNOWN_ISSUES.md` and scheduled, not repaired.

## 1. Environment

| Item | Value |
|---|---|
| OS / shell | Windows 11 · PowerShell 5.1 |
| Node | v24.16.0 |
| npm | 11.13.0 |
| Git branch | `main` |
| Working tree at phase start | clean (3 studio commits on top of the v1.0 site) |

*Sources for §1: commands run and captured in this session — `node --version`,
`npm --version`, `git branch --show-current`, `git status --short`, `git log
--oneline -8` (14 Nov 2026). OS/shell observed from the executing environment.*

## 2. Repository structure

Next.js 16.4.6 app-router site in `site/` (TypeScript, Tailwind v4, shadcn/ui Nova
preset), verified via the production build's route table and session file reads:

- **Routes (from `next build`, cross-checked against the prerender manifest
  `.next/server/app/`):** **8 content pages** — `/`, `/about`, `/services`,
  `/why-choose-us`, `/testimonials`, `/faq`, `/contact`, `/book` — plus 8
  framework/metadata routes (`/_not-found`, `/_global-error`, `/favicon.ico`,
  `/robots.txt`, `/sitemap.xml`, `/icon.svg`, `/icon.png`, `/apple-icon.png`).
  The build's route table lists 14 entries (it omits `/_global-error` and
  `/favicon.ico`); the generator counter reported "Generating static pages
  using 15 workers (16/16)" — table and manifest reconcile exactly: 8 content
  pages + 8 framework/metadata routes = 16 prerendered targets. The `icon*` /
  `apple-icon` routes serve static assets, not content pages.
- **Key paths:** `site/app/` (8 pages), `site/components/site/` (site components,
  incl. `booking-form.tsx`), `site/components/ui/` (shadcn/ui, restyled),
  `site/tests/booking.test.ts` (node:test), `site/tools/axe-check.mjs`,
  `site/lighthouserc.json`, `site/playwright.config.ts`, `site/next.config.ts`,
  `site/public/images/`.
- **Cache Components + Partial Prefetching enabled** (Next 16 features; flags from
  the build banner).
- Governance docs: `PROJECT-NOTES.md`, `DEPLOYMENT.md`, `docs/design/**` (studio).

## 3. Dependencies and scripts

**Production deps** (`site/package.json`; licences from `npm view <pkg> license`
where individually verified, 14 Nov 2026): next 16.4.6 (MIT), react/react-dom
19.3.0 (MIT), radix-ui ^1.8.1 (MIT), lucide-react ^1.72.0 (ISC), tailwindcss
4.3.3 (MIT), @fontsource/playfair-display ^5.3.0 (OFL-1.1),
class-variance-authority ^0.7.1 (Apache-2.0), tw-animate-css ^1.4.0 (MIT),
sharp ^0.35.5 (Apache-2.0), motion ^14.12.0 (MIT — **unused**, KNOWN_ISSUES #4),
cn ^0.5.2 and shadcn ^4.23.0 (licences not individually verified). Charter-level
licence/attribution records: `docs/design/REPOSITORY_REFERENCE.md` and
`docs/design/THIRD_PARTY_NOTICES.md` (both exist, committed `f584017`).

**Dev deps:** @playwright/test ^1.65.0, @playwright/mcp ^0.0.85,
@axe-core/playwright ^4.14.0, axe-core ^4.14.0, @lhci/cli ^0.16.1,
@tailwindcss/turbopack 4.3.3, typescript ^5, eslint ^9, eslint-config-next 16.4.6.

Licences: all permissive — verified and attributed in `REPOSITORY_REFERENCE.md` /
`THIRD_PARTY_NOTICES.md`.

**Scripts:** `dev` → `next dev`, `build` → `next build`, `start` → `next start`,
`lint` → `eslint` (no separate typecheck script; `next build` runs TypeScript).## 4. Git state

`main`; linear history:

```
f584017 charter: adopt owner charter + required doc set
1233fd2 studio: pin critic/art-director models
918f3bd design studio: 7 subagents, orchestrator rules, check tooling
3e66fac note: record repo location
47182eb v1.0 - P.L. Sharma And Company website
```

*Source for §4: `git branch --show-current` and `git log --oneline -8`, captured
14 Nov 2026; working tree via `git status --short`.*

## 5. Verification results (14 Nov 2026)

| Check | Command | Result |
|---|---|---|
| Install | `npm install` | **exit 0**; 21 audit findings (2 low / 10 moderate / 9 high), all transitive inside dev tooling (lhci chain) — pre-existing, see KNOWN_ISSUES #9 |
| Build | `npm run build` | **exit 0**; compiled 6.0 s, TypeScript clean 9.4 s, 16/16 pages generated (8 content pages + 8 framework/metadata routes — reconciled with the prerender manifest, see §2), no errors |
| Lint | `npm run lint` | **exit 1 — PRE-EXISTING FAILURE**: 1 error + 2 warnings (details below) |
| Unit tests | `node --test tests/booking.test.ts` | **5/5 pass**, exit 0 (161 ms) |
| axe-core, per route | `node tools/axe-check.mjs http://localhost:3100/<route>` × 8 | **0 violations on all 8 routes** (wcag2a/2aa/22aa, production server) |
| Lighthouse CI | `npx lhci autorun` | see §6 |

**Lint failure detail (KNOWN_ISSUES #13, scheduled for the first build phase):**

- **Error** `react-hooks/set-state-in-effect` — `site/components/site/booking-form.tsx:34:5`:
  `setToday(new Date().toISOString().slice(0, 10))` called synchronously inside `useEffect`.
- **Warnings** `@typescript-eslint/no-unused-vars` — unused `site` import at
  `site/app/testimonials/page.tsx:6:24` and `site/app/why-choose-us/page.tsx:8:10`.

## 6. Lighthouse CI baseline

Config: `site/lighthouserc.json` — `numberOfRuns: 1`, production server
(`next start`) on **port 3200**, 8 URLs, Chrome via Playwright's chromium
(`CHROME_PATH` → `%LOCALAPPDATA%\ms-playwright\chromium-1254\chrome-win64\chrome.exe`,
no system-Chrome dependency; dev-only env var).

*Numbers appended after the audit run completes — see the table below.*

**Method note (honesty about the run history):** three execution attempts are on
record. (1) The first run was cancelled mid-flight by an OpenCode server restart;
its orphaned processes are KNOWN_ISSUES #14. (2) A rerun raced that run's zombie
leftovers — the two processes competed for CPU and its scores were depressed
(e.g. `/` 79, `/about` 68); those numbers are **superseded and not reported as
baseline**. (3) The final clean run (the harness re-executed the cancelled
command; its collect step cleared the artifacts folder first) produced the table
below: exactly 8 artifacts, one per URL, all on port 3200, lhci mobile defaults
(mobile emulation, simulated throttling), local production server.

| Route | Perf | A11y | Best Practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | **89** ⚠ | 100 | 100 | 100 | **3.78 s** ⚠ | 0 | 76 ms |
| `/about` | 100 | 100 | 100 | 100 | 0.76 s | 0 | 72 ms |
| `/services` | 94 | 100 | 100 | 100 | **3.00 s** ⚠ | 0 | 114 ms |
| `/why-choose-us` | 95 | 100 | 100 | 100 | **2.97 s** ⚠ | 0 | 53 ms |
| `/testimonials` | 95 | 100 | 100 | 100 | **2.97 s** ⚠ | 0 | 51 ms |
| `/faq` | 100 | 100 | 100 | 100 | 0.76 s | 0 | 53 ms |
| `/contact` | 100 | 100 | 100 | 100 | 0.76 s | 0 | 79 ms |
| `/book` | 100 | 100 | 100 | 100 | 0.76 s | 0 | 46 ms |

**Findings vs charter targets:**

- Accessibility 100, Best Practices 100, SEO 100 on **all 8 routes** ✅ (targets 95+).
- Performance: `/` scores **89 — below the 90 target** ⚠; the other seven routes
  score 94–100.
- **LCP misses the 2.5 s target on exactly the four image-led routes** (`/`,
  `/services`, `/why-choose-us`, `/testimonials`) ⚠ — the pattern points at
  hero/founder imagery, so image optimisation (size, format, priority) is queued
  as a named task for the build phases. CLS is 0 and TBT ≤ 114 ms everywhere
  (INP healthy by proxy).
- Registered as KNOWN_ISSUES #15 (which points at the same evidence files below).

**Assertion outcome (machine verdict, final run):** exactly one warn-level
assertion failure — `categories:performance` on `/` (min 0.90, actual 0.89,
level warn). Zero error-level failures: the accessibility error assertion
(`categories:accessibility` minScore 1) passed on all 8 routes. lhci therefore
finished in a warnings-only state.

**Inspectable evidence (committed):** `docs/design/baseline/lhci/results.json`
(per-URL extract generated from the 8 raw `lhr-*.json` — includes formFactor,
throttlingMethod and the source filename per run; `artifactsCount: 8`) and
`docs/design/baseline/lhci/assertion-results.json` (verbatim copy of the final
run's assert output); provenance in `docs/design/baseline/lhci/README.md`. Raw
artifacts stay in the gitignored `site/.lighthouseci/` (~5.8 MB, regenerable
via the same commands).

## 7. Pre-existing issues register (snapshot)

Full list with status lives in `KNOWN_ISSUES.md`. Phase-0-relevant items:

1. **#13 lint failure** (above) — first fix scheduled for the first build phase.
2. **#14 zombie pair** on port 3100 (elevated lhci CLI **PID 18672** + its
   `next start` server **PID 14012**, kill denied to a non-elevated shell;
   idle lighthouse chrome children attached) — lhci moved to 3200; dies at
   reboot or an owner-run elevated
   `taskkill /PID 18672 /PID 14012 /T /F`.
3. **#4 `motion` unused** — removal candidate, pending owner approval (Phase 1).
4. **#9 npm audit 21 findings** — all dev-tooling transitive; nothing ships.
5. **#1/#2/#3 critic REJECT backlog + PLACEHOLDER content + missing team photos** —
   carried into Phase 1+ as the build backlog (not Phase 0 scope).

## 8. Phase 0 exit criteria (charter prompt)

| Criterion | Status |
|---|---|
| Structure, dependencies, scripts, git status inspected | ✅ §2–4 |
| install, build, lint, existing tests run, pre-existing failures recorded | ✅ §5 (lint failure honestly recorded, not hidden, not fixed) |
| Tooling versions confirmed | ✅ §1 |
| `STUDIO_ROLES.md` + Orchestrator/Critic/roles set up per charter | ✅ created at charter adoption (`f584017`); roles verified loaded (`opencode debug agents`) |
| `BASELINE_REPORT.md` written | ✅ this file |
| Lighthouse numbers recorded (or absence explained) | ✅ §6 (final clean run; earlier cancelled/contended attempts documented) |

## 9. Phase 0 conduct notes

- **No product code touched** (baseline rule): only `site/lighthouserc.json`
  (port retarget 3000→3100→3200), `site/.gitignore` (ignore `/.lighthouseci/`) and
  studio ledgers.
- **Environment incidents handled:** the OpenCode server restarted mid-audit,
  cancelling the first LHCI run (orphaned processes killed; one elevated zombie
  survived — KNOWN_ISSUES #14; partial artifacts deleted before relaunch). The rerun
  is a complete fresh audit on port 3200.
- Dev server restored at phase end in the background — port **3000** (its natural
  port, free since the stale servers were stopped).
