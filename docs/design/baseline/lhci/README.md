# LHCI baseline evidence — Phase 0 (14 Nov 2026)

Inspectable, committed evidence for the Lighthouse CI numbers in
`../../BASELINE_REPORT.md` §6 and KNOWN_ISSUES #15 (broken circular sourcing
per critic finding F1, round 1).

| File | What it is |
|---|---|
| `results.json` | Per-URL extract generated from the 8 raw `lhr-*.json` of the **final clean run** (14 Nov 2026, ~11:28–11:31 local): url, fetchTime, formFactor, throttlingMethod, four category scores, LCP/CLS/TBT/FCP/SpeedIndex, source artifact filename. `artifactsCount: 8`. |
| `assertion-results.json` | Verbatim copy of `site/.lighthouseci/assertion-results.json` as written by the same run's `assert` step — exactly one warn-level entry (`/` performance 0.89 < 0.90); no error-level entries. |

**Provenance.** `npx lhci autorun` (@lhci/cli 0.16.1) on the final clean run;
config `site/lighthouserc.json` (`numberOfRuns: 1`, 8 URLs on
`http://localhost:3200/`, `startServerCommand: npm run start -- -p 3200`);
Chrome provided via `CHROME_PATH` = Playwright chromium
(`%LOCALAPPDATA%\ms-playwright\chromium-1254\chrome-win64\chrome.exe`).
Raw `lhr-*.json` (~5.8 MB total) intentionally **not** committed — they live in
the gitignored `site/.lighthouseci/` and are regenerable with the same command
(`npm run build` first). Earlier runs of the same day (cancelled; contended
rerun whose scores were superseded) are documented in `BASELINE_REPORT.md` §6
and `TOOLING_LOG.md`, not evidenced here.
