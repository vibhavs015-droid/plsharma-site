# Tooling log — P.L. Sharma & Co. design studio

Every tool the studio installed, with version, source, licence, purpose and removal steps.
All tools are free and installed from the official npm registry. Nothing paid, nothing uploaded.

## Installed 13 Nov 2026 (devDependencies of `tax-consultant-website/site`)

| Tool | Version | Source | Licence | Purpose |
|---|---|---|---|---|
| `@playwright/test` | 1.65.0 | npm registry | Apache-2.0 | Test runner + browser driver for end-to-end and visual-regression tests |
| `@playwright/mcp` | 0.0.85 | npm registry | Apache-2.0 | MCP server so agents can open pages, navigate and screenshot |
| `@axe-core/playwright` | 4.14.0 | npm registry | MPL-2.0 | axe-core engine integrated with Playwright (used by `tools/axe-check.mjs`) |
| `axe-core` | 4.14.0 | npm registry | MPL-2.0 | axe rules engine itself (kept explicit per owner's setup instruction) |
| `@lhci/cli` | 0.16.1 | npm registry | Apache-2.0 | Lighthouse CI — `npx lhci autorun` per `lighthouserc.json` |
| Chromium (Playwright build) | 158.0.8127.18 (playwright v1254: chromium + headless-shell + ffmpeg + winldd, ~330 MB) | `npx playwright install chromium` → `%LOCALAPPDATA%\ms-playwright` | Chromium (OSS) | The only browser installed, to keep the download light |

## Studio config files created (not npm packages)

| File | Purpose | Removal |
|---|---|---|
| `site/playwright.config.ts` | Playwright test config (testDir `tests/e2e/`, baseURL localhost:3000) | delete the file |
| `site/lighthouserc.json` | Lighthouse CI config — collects all 8 routes, asserts a11y ≥ 1.0 | delete the file |
| `site/tools/axe-check.mjs` | one-command axe scan of a URL, non-zero exit on violations | delete the file |
| `.opencode/opencode.json` (workspace root) | registers the `playwright` MCP server | delete the `mcp.servers.playwright` entry |

## How to run

- Dev server: `npm run dev` in `site/` — read the printed port (3000 may be taken, then it is 3001).
- axe scan: `node tools/axe-check.mjs http://localhost:<port>/<route>` (exits 1 on violations).
- Lighthouse CI: `npm run build` first (lhci's `startServerCommand` is `npm run start`), then `npx lhci autorun`.
- E2E tests: `npx playwright test` (tests live in `site/tests/e2e/`).
- MCP check: `opencode-cli.exe mcp list` → `✓ playwright  connected` (verified 13 Nov 2026).

## How to remove everything

1. `npm uninstall @playwright/test @playwright/mcp @axe-core/playwright axe-core @lhci/cli` (from `site/`)
2. `npx playwright uninstall chromium` (or delete `%LOCALAPPDATA%\ms-playwright`)
3. Delete the three studio files listed above and the `mcp.servers.playwright` entry in `.opencode/opencode.json`

## Notes

- `npm install` reported **21 audit findings (2 low / 10 moderate / 9 high)** — all transitive, all inside dev tooling (mostly the Lighthouse CI dependency chain). None ship in the site runtime bundle. `npm audit fix --force` was deliberately **not** run because it can force breaking major upgrades; review with `npm audit` before touching.
- npm also printed deprecation warnings for transitive `inflight`, `rimraf`, `glob` — informational only.
- The Playwright MCP server may need its own chromium revision after a `@playwright/mcp` upgrade — re-run `npx playwright install chromium` if it reports a missing browser.

## First LHCI production run — 14 Nov 2026 (Phase 0)

- **Config changes:** `site/lighthouserc.json` moved from port 3000 → **3200** (port hygiene; 3100 was lost to a zombie server, KNOWN_ISSUES #14). `startServerCommand` is now `npm run start -- -p 3200`; all 8 URLs updated; `numberOfRuns: 1` unchanged.
- **Chrome discovery:** lhci inherits no system Chrome here, so the run sets `CHROME_PATH` to the already-installed Playwright chromium (`%LOCALAPPDATA%\ms-playwright\chromium-1254\chrome-win64\chrome.exe`) — no new install, dev-only env var, nothing committed.
- **Execution history (honest):** first run cancelled by an OpenCode server restart; the rerun raced the zombie leftovers and produced contention-depressed scores (superseded, not recorded); the harness then re-executed the cancelled command, which cleared the artifact folder and produced the final clean set (8 artifacts, one per URL) — results in `BASELINE_REPORT.md` §6.
- **Operational cautions learned:** (a) lhci's collect step clears `.lighthouseci/` at start, so an interrupted run's artifacts are not salvageable evidence; (b) a cancelled background lhci command can be re-executed by the harness after a server restart — run lhci in the foreground when determinism matters; (c) `/.lighthouseci/` added to `site/.gitignore` (artifact dumps ~700 KB per page).
- **Results snapshot:** a11y/BP/SEO 100 on all 8 routes; perf `/` 89 (below target), others 94–100; LCP misses on the four image-led routes (KNOWN_ISSUES #15).

## Added 14 Nov 2026 (Phase 1)

| Tool | Version | Source | Licence | Purpose |
|---|---|---|---|---|
| `site/tools/contrast-check.mjs` | repo-local script (no deps) | written in-studio | project code | WCAG 2.2 contrast verifier — makes every ratio in `vibe-board.md` §3 reproducible (critic F2 fix); output committed as `docs/design/discovery/contrast-evidence.json` |

## Added 14–15 Nov 2026 (Phase 2)

| Tool | Version | Source | Licence | Purpose |
|---|---|---|---|---|
| `site/tools/process-founder-photo.mjs` | repo-local script | written in-studio | project code | One-off founder-plate crop/grade (sharp: extract → recomb grade → resize) + the acceptance test (G/R and B/R patch ratios); dev-only, nothing imports it. **Removal:** delete the file (the generated `founder-plate.{webp,avif}` are committed outputs). |
| `sharp` | 0.35.5 | already present as a Next.js image-optimisation dependency — **not newly installed** | Apache-2.0 | Used by the script above for the graded crop; no runtime code imports it directly. |
| `next/font/google` (Inter + Fraunces) | built into Next.js 16.4.6 | framework feature — no package added | fonts SIL OFL (Google Fonts); self-hosted by next/font at build time | Replaced Playfair Display + Geist Mono; Fraunces ships wght+opsz normal-only after the measured payload fix (see tokens.md §2). |

No new npm packages were added in Phase 2; the rows above are an in-repo script, an already-present dependency, and a framework feature — logged for traceability per the free-tooling clause.

## Changed 16 Nov 2026 (Phase 3) — browser automation after the server restart

- **Playwright MCP namespace is GONE** after the overnight OpenCode server restart. The `@playwright/mcp` package stays installed and configured in `.opencode/opencode.json`; the harness simply no longer exposes its tools this session (may return in future sessions — re-check before replacing anything).
- **browse MCP (relay CLI) is the working replacement:** `browse execute --file <script>` auto-starts the relay at 127.0.0.1:19988 and prints the session id each run. File-root restriction: the relay writes only inside its roots (`C:\Users\ASUS\AppData\Local\Temp`) — save there, copy into `docs/` with the shell afterwards; setting `OPENCODE_BROWSER_FILE_ROOTS` after the relay has started has no effect.
- **Code Mode `tools.browse.execute` caveat (confirmed twice, independently):** the execute realm does not bind the documented helpers (`page`, `context`, `files`, `state`… all undefined). Both the Orchestrator and the a11y-checker hit it. Working paths: the relay CLI for browser scripts; the project's own Playwright 1.65.0 (same engine `tools/axe-check.mjs` uses) via read-only scripts in `%TEMP%\opencode\` for a11y evidence.
- **Screenshot pipeline (durable script: `%TEMP%\opencode\phase3-shots.js`):** CDP `Emulation.setDeviceMetricsOverride` per width → verify `documentElement.clientWidth === w` (retry ×4 — the override silently fails ~1 in 15 shots and the previous layout gets captured left-anchored on a wider canvas) → CDP `Page.captureScreenshot` with `captureBeyondViewport` + explicit clip (Playwright's `fullPage` races the override). Scrollbars hidden via `scrollbar-width:none` so layout uses the true emulated width. `page.bringToFront()` is relay-blocked (it raises the user's window) — never use it.
- **Relay staging-dir staleness (16 Nov):** a long-lived relay references a staging dir keyed to its own PID (`%TEMP%\opencode-browser-files-<pid>-*`). When that dir is cleaned, every `browse execute` fails with `ENOENT ... lstat ...opencode-browser-files-<oldpid>-*` — retrying does not help. Fix: kill the relay PID listening on 19988 (`netstat -ano | Select-String ":19988"`); the next relay-backed command starts a fresh relay with a fresh staging dir.
