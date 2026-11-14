# Known issues — P.L. Sharma & Co. website

Consolidated, honest list of open problems. Sources: critic reviews, test passes,
session logs. Never hide failures here. Newest at the bottom; mark status when fixed.

| # | Issue | Severity | Source | Status |
|---|---|---|---|---|
| 1 | Home page critic REJECT (`docs/design/critic/smoke-test-2026-11-13.md`): (a) founder "portrait" is a festive snapshot wearing a consultant title, (b) invented testimonials with hard-coded 5-star rows, (c) two back-to-back identical card grids; plus same-level spec drift, stats band half-promises, founder card not linked to /about | major | critic smoke test, 13 Nov 2026 | OPEN — first backlog of Phase 1 |
| 2 | Interim content marked PLACEHOLDER in source: testimonials, team roles/bios; qualifications section removed pending real credentials | major (pre-launch) | test pass, 13 Nov 2026 | OPEN — needs owner-provided real data |
| 3 | Team photos missing: team-1.jpg (Vikram), team-2.jpg (Bhawani), team-3.jpg (Hemraj) → `site/public/images/` | minor | PROJECT-NOTES | OPEN |
| 4 | `motion` dependency unused (zero imports after Reveal rewrite to CSS-only) | minor | grep, 14 Nov 2026 | OPEN — removal candidate, pending owner approval |
| 5 | Direct `axe-core` dependency redundant (`@axe-core/playwright` declares it) — kept because the owner's setup instruction named axe-core explicitly | trivial | 14 Nov 2026 | OPEN — cleanup candidate |
| 6 | 33 Hallmark composition NOTEs intentionally kept under `redesign: polish` (word budgets per screen, 3-section subpages, subpage hero height) — owner call recorded, not a defect | note | hallmark audit, 13 Nov 2026 | ACCEPTED, revisit at owner's ask |
| 7 | Radix `data-scroll-locked` attribute leftover on `<body>` after mobile sheet nav — cosmetic only; scroll verified working | cosmetic | browser automation, 13 Nov 2026 | OPEN (cosmetic) |
| 8 | Turbopack dev serves stale CSS after `globals.css` edits until `.next` is deleted and dev restarted | tooling | 13 Nov 2026 | OPEN (workaround documented in SESSION_HANDOFF §5) |
| 9 | npm audit: 21 findings (2 low / 10 moderate / 9 high), all transitive inside dev tooling (mostly Lighthouse CI chain); none ship in the runtime bundle | note | npm, 13 Nov 2026 | ACCEPTED — `audit fix --force` deliberately not run |
| 10 | Port 3000 frequently held by a stale node process; dev falls back to 3001; `lighthouserc.json` assumes 3000 | minor | 13–14 Nov 2026 | MITIGATED 14 Nov 2026 — stale servers stopped; `lighthouserc.json` now targets port 3200 (3100 was lost to a zombie, see #14) |
| 11 | Free-model provider quota can fail subagent launches ("Free usage limit reached"); retry succeeds minutes later | minor | 14 Nov 2026 | OPEN — retry once before escalating |
| 12 | Playwright MCP may need `npx playwright install chromium` re-run after a `@playwright/mcp` upgrade (browser revision mismatch) | minor | TOOLING_LOG | OPEN (conditional) |
| 13 | `npm run lint` fails (exit 1): 1 error `react-hooks/set-state-in-effect` at `site/components/site/booking-form.tsx:34` (`setToday` inside `useEffect`) + 2 warnings (unused `site` import at `app/testimonials/page.tsx:6` and `app/why-choose-us/page.tsx:8`) | minor | Phase 0 baseline, 14 Nov 2026 | OPEN — fix scheduled in the first build phase (frontend-engineer); NOT fixed in Phase 0 per baseline rule |
| 14 | Zombie pair from the cancelled first LHCI run: elevated lhci CLI (PID 18672) + its `next start` server (PID 14012) squatting port 3100; `taskkill /T /F` denied to the non-elevated shell; idle lighthouse chrome children attached. A later harness restart resurrected the cancelled command, which self-healed the audit (cleared the artifact folder, ran clean on 3200) | minor | 14 Nov 2026 | OPEN — pair dies at reboot, or an owner-run elevated `taskkill /PID 18672 /PID 14012 /T /F`; harmless (idle, unused port) |
| 15 | LCP above the 2.5 s charter target on the four image-led routes (mobile, local production build): `/` 3.78 s, `/services` 3.00 s, `/why-choose-us` 2.97 s, `/testimonials` 2.97 s; `/` Lighthouse performance 89 (< 90 target). CLS 0, TBT ≤ 114 ms healthy | moderate (launch gate) | LHCI clean run 14 Nov 2026 — evidence: `docs/design/baseline/lhci/results.json` + `assertion-results.json` | OPEN — image optimisation (size/format/priority) queued as a named build-phase task |
