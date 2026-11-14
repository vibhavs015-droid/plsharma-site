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
