# Critic review — Phase 0 baseline record (14 Nov 2026)

Review of `docs/design/BASELINE_REPORT.md` and its supporting ledgers. This is a record-review, not a design review: Phase 0 touched no product code. My job is to gate on honesty, accuracy, and completeness of the baseline documentation, per the charter rule "never hide failures; never claim success without verification".

---

## 1. Findings

### Finding 1 (Minor) — Axe scan ran on port 3100, which KNOWN_ISSUES says was lost to a zombie server

**Reference:** `BASELINE_REPORT.md` §5 (axe-core row: `http://localhost:3100/<route>` × 8, "production server"); `KNOWN_ISSUES.md` #10 and #14 (port 3100 "lost to a zombie", unkillable `next start` PID 14012 squatting 3100); `IMPLEMENTATION_LOG.md` (stale servers PID 19780 / 21340 stopped "before runs").

**What is wrong:** The report states the axe scan ran against a "production server" on port 3100. Separately, KNOWN_ISSUES #14 establishes that port 3100 was occupied by an unkillable zombie `next start` server (PID 14012) from the cancelled first LHCI run, and #10 says 3100 "was lost to a zombie". The report never clarifies whether the axe scan ran before or after the zombie appeared on 3100. If the scan ran after, the "production server" characterization is misleading — results would come from a zombie server, not a clean production build.

**Why it matters:** The axe result (0 violations × 8 routes) is a baseline input for Phase 1. If there is doubt about which server served those routes, the baseline's credibility on accessibility is slightly weakened.

**Most likely reading (mitigating):** The §5 table lists axe before Lighthouse CI, and §9 says the OpenCode restart cancelled "the first LHCI run" mid-audit — implying axe ran before the restart and before the zombie was left on 3100. Under that reading the claim is accurate. But the documents do not state this explicitly.

**Severity:** minor — transparency/clarity gap, not a factual error. The substance (0 axe violations) is credible either way since a zombie `next start` serves the same build output.

---

### Finding 2 (Minor) — Precise build timing numbers presented without a cited source

**Reference:** `BASELINE_REPORT.md` §5 (Build row: "compiled 6.0 s, TypeScript clean 9.4 s").

**What is wrong:** Two precise timing figures (6.0 s compile, 9.4 s TypeScript) are stated as fact, but no captured output, log line, or source is cited for them. No shell access was available to me to re-verify, and the supporting ledgers (KNOWN_ISSUES, IMPLEMENTATION_LOG, TOOLING_LOG) do not repeat these numbers.

**Why it matters:** Precision without a source weakens the "nothing is asserted without a source" promise the report makes in its preamble (§1). If the numbers are off, they are unverifiable from the record.

**Severity:** minor — honesty/clarity concern on unsupported precision, not a material inaccuracy.

---

### Finding 3 (Trivial/Minor) — Inconsistent path notation for the booking test file

**Reference:** `BASELINE_REPORT.md` §2 (`site/tests/booking.test.ts`) vs §5 table (`tests/booking.test.ts`).

**What is wrong:** The same file is referenced with an absolute-from-repo-root path (`site/tests/...`) in §2 and a relative-from-site/ path (`tests/...`) in §5. Both refer to `site/tests/booking.test.ts` (which exists and contains 5 passing tests per the report).

**Severity:** trivial/minor — notation inconsistency only, no ambiguity about which file.

---

### Finding 4 (None found — verification summary)

Every material claim I could independently verify from the files checks out:

| Claim in BASELINE_REPORT.md | Verified against | Status |
|---|---|---|
| next 16.4.6, react 19.3.0, motion ^14.12.0, etc. | `site/package.json` | ✅ Exact match |
| Scripts: dev/build/start/lint | `site/package.json` lines 5–10 | ✅ Exact match |
| Lint error `setToday` inside `useEffect` at `booking-form.tsx:34` | `site/components/site/booking-form.tsx` line 34 | ✅ Line 34 confirmed |
| Unused `site` import at `testimonials/page.tsx:6:24` | `site/app/testimonials/page.tsx` line 6 | ✅ Column 24 confirmed |
| Unused `site` import at `why-choose-us/page.tsx:8:10` | `site/app/why-choose-us/page.tsx` line 8 | ✅ Column 10 confirmed |
| `/.lighthouseci/` ignored | `site/.gitignore` line 17 | ✅ Present |
| lighthouserc.json: port 3200, 8 URLs, numberOfRuns: 1 | `site/lighthouserc.json` | ✅ Exact match |
| `startServerCommand: npm run start -- -p 3200` | `site/lighthouserc.json` + TOOLING_LOG | ✅ Match |
| 8 pages in `site/app/` | glob of `site/app/**/page.tsx` | ✅ Exactly 8 files |
| 21 npm audit findings (2 low / 10 mod / 9 high) | TOOLING_LOG notes | ✅ Match |
| LCP values `/` 3.78, `/services` 3.00, `/why-choose-us` 2.97, `/testimonials` 2.97 | KNOWN_ISSUES #15, TOOLING_LOG | ✅ Match across ledgers |
| Perf `/` 89, others 94–100 | KNOWN_ISSUES #15, TOOLING_LOG | ✅ Match |
| Three LHCI attempts (cancelled / contended-superseded / clean) | TOOLING_LOG "First LHCI production run" | ✅ Coherent, superseded scores marked |
| Git history references f584017, 1233fd2, 918f3bd | IMPLEMENTATION_LOG | ✅ Cross-referenced |
| No product code touched | IMPLEMENTATION_LOG §"Files changed" | ✅ Consistent with baseline rule |

No blockers, no majors found. Superseded LHCI scores (`/` 79, `/about` 68) are explicitly marked as not-baseline in §6. Pre-existing failures (lint #13, LCP #15, zombie #14) are recorded honestly and not hidden.

---

## 2. Scores (1–5, halves allowed)

| Score | Rating |
|---|---|
| **Accuracy** | 4.5 |
| **Completeness** | 4.5 |
| **Honesty** | 4.5 |
| **Actionability** | 4.0 |
| **Clarity** | 4.5 |

**Accuracy (4.5):** All verifiable claims match source files exactly. Deduct 0.5 for the unsupported build-timing precision (Finding 2) and the axe/port-3100 timeline ambiguity (Finding 1).
**Completeness (4.5):** All Phase 0 exit criteria from `PHASE_STATUS.md` are addressed. Nothing materially missing for Phase 1.
**Honesty (4.5):** Failures recorded openly (lint exit 1, LCP misses, cancelled/contended runs). Superseded scores clearly marked as not-baseline. Deduct 0.5 for the axe port timeline not being explicit.
**Actionability (4.0):** Lint error has exact file:line:column; LCP values per route are specific; KNOWN_ISSUES entries have status and owners. Deduct 0.5 because the zombie fix references specific PIDs (18672/14012) that may be stale by the time someone acts (though #14 acknowledges this).
**Clarity (4.5):** Well-structured tables, clear cross-references between ledgers. Deduct 0.5 for the odd "numbers appended after the audit run completes" phrasing in §6 and the minor path notation inconsistency.

---

## 3. Verdict

### `APPROVE`

No blockers, no majors. The Phase 0 baseline record is honest, accurate, and complete enough to serve as the foundation for Phase 1 (Discovery and Vibe). Exit criteria in `PHASE_STATUS.md` are genuinely satisfied by the report — nothing is asserted without reasonable evidence, and all pre-existing failures are recorded rather than hidden.

**Required fixes:** None (no REJECT).

**Optional suggestions** (not required for approval):

- [ ] Clarify in `BASELINE_REPORT.md` §5 or §9 whether the axe scan on port 3100 ran before or after the zombie `next start` (PID 14012) appeared on that port, to close the transparency gap in Finding 1.
- [ ] Cite the source (e.g. build output capture) for the "compiled 6.0 s, TypeScript clean 9.4 s" timing figures, or present them as approximate.
- [ ] Normalize the test path to `site/tests/booking.test.ts` in both §2 and §5 of `BASELINE_REPORT.md`.

**What Phase 1 receives from this baseline:** LCP values per route, performance scores per route, axe 0-violations result, lint failure with exact locations, full dependency/script inventory, git state, known-issues register with statuses, and the critic smoke-test REJECT backlog. Nothing materially missing for the Discovery and Vibe phase.

---

## Round 2 — Re-verification of required fixes (14 Nov 2026)

All seven required fixes from round 1 have been applied and verified against the committed evidence files under `docs/design/baseline/lhci/`.

| Fix | Status | Verification |
|-----|--------|--------------|
| F1 — Lighthouse numbers trace to committed evidence; exactly 8 artifacts; port 3200 per URL; mobile defaults checkable; §6↔#15 circularity broken | FIXED | `results.json`: `artifactsCount: 8`, 8 runs each `formFactor: "mobile"`, `throttlingMethod: "simulate"`, URLs on `http://localhost:3200/`. §6 and KNOWN_ISSUES #15 both cite `results.json` + `assertion-results.json`. README.md states "broken circular sourcing per critic finding F1, round 1." |
| F2 — Route count reconciled: 8 content + 8 framework/metadata = 16; build-table (14) vs manifest discrepancy explained; public/ assets not counted as content routes | FIXED | §2 and §5 Build row both claim 8 content + 8 framework/metadata = 16 prerendered targets; build table omits `/_global-error` and `/favicon.ico`; generator counter "16/16". §2: "`icon*` / `apple-icon` routes serve static assets, not content pages." |
| F3 — §7 and KNOWN_ISSUES #14 agree: PIDs 18672 + 14012, combined elevated taskkill | FIXED | §7 names elevated lhci CLI PID 18672 + `next start` PID 14012 with `taskkill /PID 18672 /PID 14012 /T /F`. KNOWN_ISSUES #14 names identical PIDs and same combined elevated command. |
| F4/F6 — §1 and §4 cite the commands that produced their values | FIXED | §1: `node --version`, `npm --version`, `git branch --show-current`, `git status --short`, `git log --oneline -8`. §4: `git branch --show-current`, `git log --oneline -8`, `git status --short`. |
| F5 — §3 cites licence records by path and commit; cn/shadcn marked not individually verified | FIXED | §3 cites `docs/design/REPOSITORY_REFERENCE.md` and `docs/design/THIRD_PARTY_NOTICES.md` (committed `f584017`); states `cn ^0.5.2` and `shadcn ^4.23.0` "(licences not individually verified)". |
| F7 — lhci assertion outcome stated and backed by verbatim assertion-results.json | FIXED | §6: one warn on `/` performance 0.89 < 0.90; a11y error-level passed on all 8. `assertion-results.json` verbatim: one entry, expected 0.9, actual 0.89, passed false, level "warn", auditId "categories", auditProperty "performance", url "/". Zero error-level entries. |

### Re-issued scores (1–5, halves allowed)

| Score | Rating |
|---|---|
| **Originality** | 4.0 |
| **Hierarchy** | 4.5 |
| **Consistency** | 4.5 |
| **Usability** | 4.0 |
| **Accessibility** | 4.5 |
| **Performance** | 3.0 |
| **Brand fit** | 4.5 |

- **Originality (4.0):** An honest, source-cited record that refuses to pad or template over failures. Not a creative work — a baseline — so originality is bounded, but nothing here is boilerplate.
- **Hierarchy (4.5):** Clear numbered sections, summary tables, cross-references between ledgers, and an exit-criteria criteria table. Easy to navigate.
- **Consistency (4.5):** Every Lighthouse number in §6 and KNOWN_ISSUES #15 now traces to the same two committed evidence files; circularity broken; route count, PIDs, and command citations all agree across documents.
- **Usability (4.0):** Lint error at exact file:line:column; LCP values per route; named build-phase tasks. Deduct 0.5 because the zombie fix references specific PIDs (18672/14012) that may be stale by the time someone acts.
- **Accessibility (4.5):** 0 axe violations × 8 routes; accessibility error-level assertion passed on all 8. Honestly recorded as a baseline input.
- **Performance (3.0):** The documented state misses charter targets — `/` at 89 (< 90), LCP above 2.5 s on four image-led routes. The documentation is accurate and honest, but the underlying performance is below launch target and remains OPEN (KNOWN_ISSUES #15).
- **Brand fit (4.5):** Tone is trustworthy, established, and un-hyped — failures recorded openly, no success claimed without verification. Matches the "trustworthy, established, personal, confidential" brand.

### Verdict

### `APPROVE`

All seven required fixes are fixed and verified against committed evidence. No blockers, no majors remaining. The Phase 0 baseline record is honest, accurate, complete, and internally consistent. Exit criteria in `PHASE_STATUS.md` are genuinely satisfied.

**Required fixes:** None (no REJECT).

---

**Review saved to:** `docs/design/critic/phase-0-baseline-2026-11-14.md`
