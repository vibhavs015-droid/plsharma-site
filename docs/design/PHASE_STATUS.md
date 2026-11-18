# Phase status — P.L. Sharma & Co. design studio

> Resuming session? Read `SESSION_HANDOFF.md` first (start-up procedure, state,
> pitfalls), then `STUDIO_CHARTER.md` and `STUDIO_ROLES.md`, then this file top to
> bottom. Update this file after every step so a new session can resume exactly.

## Current phase

**Phase 3 — Pages (Design & Build) — IN PROGRESS** (opened 15 Nov 2026; charter
re-read done; brief below)

### Phase 3 brief
- **Goal:** rebuild the 7 remaining routes (`/about`, `/services`, `/why-choose-us`,
  `/testimonials`, `/faq`, `/contact`, `/book`) on the Kept Ledger system to the
  charter PAGE COMPLETION RULE — each with its own critic APPROVE — and close the
  carried engineering backlog (#15 LCP, `/book` slip rebuild, reduced-motion test,
  2 lint warnings).
- **Inputs:** `STUDIO_CHARTER.md` (re-read 15 Nov), `docs/design/phase-2/tokens.md`,
  `docs/design/discovery/{vibe-board,brand-personality,user-problem}.md`
  (§2.1–2.4 prohibitions/CTA table, §4 journeys, §5.2 slip spec, §5.3
  availability), phase-2 critic review (the consistency bar), KNOWN_ISSUES
  #15/#13/#1a, `site/lib/site-config.ts` (real content inventory), dev server on 3000.
- **Outputs:** `docs/design/phase-3/page-specs.md` (ux-strategist — per-route fold
  contracts + section inventories); rebuilt routes (frontend-engineer, staged);
  tests updated + honesty guards extended (qa-engineer); a11y evidence + 5-width
  screenshots per page; **per-page** critic reviews in `docs/design/critic/`.
- **Files agents may touch:** ux-strategist → `docs/**`; frontend-engineer →
  `site/**` (no architecture changes); qa-engineer → `site/tests/**`;
  a11y-checker/perf-seo/critic → reports only; art-director → `globals.css` +
  `docs/**`. Orchestrator: ledgers.
- **Exit criteria:** every remaining route passes the PAGE COMPLETION RULE with
  its own critic review (max 3 REJECT rounds per item); axe 0 on all 8 routes;
  build/lint/typecheck 0; §2.4 honesty rules hold; #15 closed or re-scoped with
  evidence; slip wording retired with e2e expected strings in sync.
- **Delegations (staged):** A (now): ux-strategist page specs ∥ engineer
  `/book` slip rebuild → qa string sync. B: `/about` + `/services`. C: `/faq` +
  `/contact`. D: `/why-choose-us` + `/testimonials`. E: #15 image optimisation
  (cross-cutting, after image-led pages rebuild). Per-page critic reviews
  throughout.
- **Critic verdicts:** pending (per page).

### Resume state (update after every step)
1. ✅ Charter re-read (phase-start rule); Phase 2 closed with critic APPROVE r1,
   all minors closed, committed `5fdc364` (ledgers + handoff + PROJECT-NOTES current).
2. ⏳ **Running (Stage A):** ux-strategist → `docs/design/phase-3/page-specs.md` (per-route specs for the 6 non-book routes).
3. ✅ Frontend-engineer `/book` slip rebuild DONE — shipped per §5.2: h1 "Book a consultation"; honest next-step line verbatim; three steps as rail-label margin notes; `.slip` wraps the form; submit "Open WhatsApp with my request"; SENT "Request noted — we will confirm your slot on WhatsApp."; reset "Write another request"; mailto → quiet text link; "Prefer to talk first?" preserved as ruled entries; act band added per §2.3; zero "appointment" on the served page; tsc 0 / lint 0 / 200. **Adaptation accepted:** ruled entries instead of the old rounded Card (off-language). **Deferred:** `?service=` preselect (Next 16 + Cache Components: useSearchParams needs a Suspense hole that would trade the static above-fold form for an unwired feature — documented path for the /services stage). **Flags:** (a) `lib/booking.ts` prefill subject still "New Appointment Request" → engineer micro-fix running; (b) `.slip-head` ships title-only (Orchestrator decision: no invented slip numbers; honest ruled-blank "No." slot risks reading as a broken field — tokens.md note pending with art-director in Stage B).
4. ✅ Engineer booking.ts prefill micro-fix DONE — `*New Appointment Request*` → `*Consultation Request*` (tsc 0, lint 0). Sweep flag: 4 pages still carry retired "Book an Appointment" link text — `about/page.tsx:157`, `faq/page.tsx:52`, `services/page.tsx:73`, `why-choose-us/page.tsx:72` + `site-config.ts:168` FAQ answer "confirm your appointment slot" — all owned by the Stage B–D rebuilds (and site-config by the stage that touches FAQ content).
5. ✅ qa-engineer `/book` sync DONE — **40/40 e2e + 5/5 unit**. `booking-form.spec.ts` synced (submit, SENT strings, reset; mailto-as-quiet-link test new); **`book.spec.ts` new: 9 tests** (one h1, honest line verbatim, three-step rail, `.slip` on the form, act band once + wa.me prefill mentions "booking page", title; honesty: zero "appointment" across content/aria, no stars/invented names/stats, date-min clock kept); `helpers.ts` waits on the new submit label; one stale unit assertion synced + **prefill-subject `/appointment/i` guard added** (caught the parallel booking.ts edit mid-run, resolved honestly). Not covered: axe (a11y-checker), visual baselines (none exist), build (barred while dev server runs). Flag for Stage B engineer: pending label "Opening WhatsApp…" is unreachable dead code (sync handler + batching; double-submit guard still works) — remove or leave, not a defect.
6. ✅ ux-strategist page-specs DONE — `docs/design/phase-3/page-specs.md` (§0–§10: global head pattern + per-route fold contracts, inventories, CTA maps, do-not lists, owner questions, build order B–E). Key calls: PageHero retires everywhere; no scroll-stagger; per-page act band with tailored sentence; page-aware wa.me prefill on all routes; `/services` six numbered entries with `/book?service=` deep links; `/faq` accordion dropped (all answers visible); `/testimonials` honest reserve; `/contact` loses BookingForm + map iframe; **`/book` ships NO act band** (slip = act surface — deviation accepted over my Stage A instruction, logged in DECISION_LOG).
7. ✅ **Stage B engineer DONE** (completed on disk before the quota death; verified 16 Nov after the overnight restart): act band removed from `/book` (DECISION_LOG deviation applied); pending dead-branch → synchronous `submitting` ref; **`?service=` preselect via `useSyncExternalStore`** — adaptation BETTER than prescribed (no Suspense island: server snapshot `""` ships the real form in the static shell; popstate-honest; illegal values degrade silently; the Stage-A trade-off disappears); `/about` rebuilt (ruled head, h1 "Parbhati Lal Sharma has practised in Jaisalmer since 2001."); `/services` rebuilt (6 numbered entries, 6 `/book?service=` deep links verified live). tsc 0 / lint 0 (same 2 warnings) / all 4 routes 200 / markers verified in served HTML. Retry lesson: the quota-killed run had finished — always inventory the tree before re-delegating.
8. ✅ qa Stage B sync DONE — **66/66 e2e + 5/5 unit** (3 runs to green; all failures qa's own import/locator bugs, none product). `book.spec.ts` band-assertion inverted (zero `.act-band` on `/book`; closure section = "Prefer to talk first?" with real `tel:`); **`about.spec.ts` new (13)** + **`services.spec.ts` new (12)** — all content asserted against `site-config`, deep-link hrefs byte-matched to config, page-aware prefill byte-equal, honesty sweeps via new shared helpers `expectNoInventedClaims` + `expectNoAppointmentOnCtaSurfaces`; +3 `?service=` prefill-source tests (title/illegal/Other). Two Stage B string supersessions confirmed product-correct vs page-specs and synced: SENT reset "Send another request" (§7.5), mailto label "Or send by email instead" (§7.6). Untested (noted): popstate path; one-click deep-link journey tested as its two halves.
9. ✅ **a11y Stage B audit DONE** (the run completed before its quota death; full report on disk) — **all three routes CLEAN**: axe 0 ×3 (baseline intact), focus system / skip link / target sizes / reduced motion / reflow all PASS, **zero findings**; 5 advisory observations: O-1 deep-link accessible names pass AA, fail only AAA 2.4.9 (optional aria-label); O-2 header CTA resting `shadow-sm` (tokens-consistency call → queued for art-director); O-3 native date-input calendar segment (UA shadow-DOM; accept-and-document or replace — disposition pending); O-4 founder plate as plain decorative img (correct as shipped); O-5 quiet-link 2.5.8 spacing exception (verified, zero intersections, no fix required). Deviation logged: the browse-MCP execute realm never bound the helpers → a11y-checker fell back to the project's own Playwright + `axe-check.mjs` (TOOLING_LOG updated). Evidence: `docs/design/a11y/phase-3-2026-11-16/`. ✅ **Stage B screenshots DONE (16 Nov, v4)** — 15/15 in `docs/design/screenshots/phase-3/` at **exact** charter widths, visually verified (book-360, book-768, services-1440 read back). v1 lesson: `setViewportSize` no-ops on the user's real Chrome (byte-identical shots). v2/v3 lesson: CDP `Emulation.setDeviceMetricsOverride` **silently fails to relayout ~1 shot in 15** (previous layout left-anchored on a wider canvas — caught only by eye). v4 = the durable pipeline: CDP override → verify `documentElement.clientWidth === w` (retry ×4) → CDP `Page.captureScreenshot` `captureBeyondViewport` + explicit clip (no Playwright fullPage race); scrollbars hidden (`scrollbar-width:none`) so layout uses the true emulated width; `bringToFront()` is relay-blocked (raises the user's window) — do not use. Script: `%TEMP%\opencode\phase3-shots.js`. Critic input: qa 66/66 + a11y (pending) + these shots + page-specs + DECISION_LOG deviations.
10. **16 Nov environment notes:** OpenCode server restarted overnight → dev server relaunched (shell sh_1e2cca6a1001xAL1ssv1yUBUo1, :3000; note the workdir param ignored one batch of calls — re-verify CWD when a shell misbehaves); browse MCP supersedes playwright MCP for DOM checks/screenshots; today's date now 16 Nov 2026.
11. ✅ **Critic round 1 DONE — APPROVE ×3, zero blockers/majors** (`critic/{book,about,services}-2026-11-16.md`). Minors dispositioned (DECISION_LOG 16 Nov): /book F1 rail-label fix + /services F1 aria-labels → ordered to the running Stage C engineer; /book F2 declined with reason (route-wide title template beats the §7.4 one-page candidate). qa-sync note: if `services.spec.ts` asserts link names via role locators, the new aria-labels change those accessible names — verify on sync. ✅ **Stage C engineer DONE** — `/faq` rebuilt (accordion + PageHero + "Book an Appointment" retired; decisive trio first = documents/fees/notice = faqs[1]/[2]/[4]; all 7 answers always visible; fee answer ends with "The first consultation is free." + earned foot links; act band once; question-prefill ask link); `site-config.ts` FAQ line → "…we will confirm your slot on WhatsApp." (only that line); `/contact` rebuilt (BookingForm + map iframe REMOVED; `.slip` desk card "The office": call → WhatsApp question-prefill → address + one Maps link → static hours → email; walk-in entry; act band once); micro-fixes shipped (book rail-label "Book"; services 6 aria-labels). tsc 0 / lint 0 errors / **2 warnings — both on the Stage D files** (my 2→1 prediction corrected honestly; Stage D kills both); 4 routes 200; marker checks pass. Adaptations accepted + logged (DECISION_LOG 16 Nov). Flags: stale `site.mapsQuery` comment → backlog; PageHero deletion is Stage D's; qa unblocked (no asserted strings break).
12. ✅ **qa Stage C sync DONE — 97/97 e2e + 5/5 unit** (+31: `faq.spec.ts` 14, `contact.spec.ts` 16, `services.spec.ts` +1 O-1 distinct-accessible-name guard that pins the six aria-labels byte-matched to config — the a11y advisory is now a regression test; micro-fix regressions confirmed green; the two mid-dev failures were qa's own Playwright evaluate-serialization limits, fixed via explicit `arg`; stale-fetch flake never reproduced). ✅ **a11y Stage C audit DONE — `/faq` + `/contact` CLEAN** (axe 0 ×2, zero findings; the run survived a mid-flight quota death — evidence was intact, finished via a focused follow-up that re-ran only the gaps: 360 targets + 2.5.8 circle test zero intersections ×2, reflow, reduced motion, contact desk tel settled read; Stage C addendum appended to `report.md`). Advisories: O-6 (FAQPage JSON-LD missing — spec gap, not WCAG) → engineer fix running; O-7a (desk tel/WhatsApp links share one accessible name, AAA-only) → config-sourced aria-label fix running; O-7b (band/float share the canonical CTA name, pre-existing) → declined-with-reason (DECISION_LOG). ✅ **O-6/O-7a CLOSED by the engineer** (byte-exact verification; tsc 0 / lint unchanged): /faq ships one config-generated FAQPage JSON-LD whose fee pair byte-matches the visible answer block via the shared `FREE_FIRST_CONSULTATION` constant; /contact desk wa.me carries the config-sourced `aria-label="WhatsApp · {site.phone}"`. qa note recorded for the next sync (schema guards + expected fee-pair text). ✅ **Critic round 1 DONE — APPROVE ×2 for `/faq` + `/contact`, zero blockers/majors, no required fixes** (`critic/faq-2026-11-16.md`, `critic/contact-2026-11-16.md`; both scored ≥4 on every axis, accessibility 5 ×2). The three Stage C adaptations (config hours string, desk-row stacks, foot-link labels) all judged fine. **Stage C fully closed: engineering ✓ qa 97/97 ✓ a11y clean ✓ screenshots 10/10 ✓ critic APPROVE ✓ closures O-6/O-7a ✓.** ✅ **Stage D engineer DONE** — `/why-choose-us` rebuilt (h1 IS the manifesto; no stats strip/hero facts; four config-verbatim entries with check-links → /faq on 01/03/04, **on-time entry link-free**; last "Book an Appointment" dead; zero "free" hits — the fourth placement of the free-first offer retired); `/testimonials` rebuilt (honest reserve: placeholder mark ×1 + collection question-prefill + record line + three proof links + unsigned principal line; **4 invented names + 2 roles absent from raw HTML AND RSC payload on all 8 routes**); `page-hero.tsx` + `feature-icon.tsx` deleted (zero references); **lint 0 errors / 0 warnings** (both carried warnings died); `mapsQuery` field deleted from config (zero consumers). tsc 0; all 8 routes 200. Flags: `section-header.tsx` deletion sanctioned for Stage E; **art-director CSS retirement DONE** — `.hero-pattern` + `.card-lift` rules and the `.hero-pattern` focus-group member removed (verified: zero source hits; Tailwind compiler confirms `.act-band`/`.bg-primary` focus rules live, both retired names absent; lightningcss parse OK; contrast-check deep-equal 19 pairs); tokens.md §5.2/§5.3/§9 updated without rewriting the §9.1 record (annotated as pre-retirement measurement). qa flag noted: stale comment at `home.spec.ts:191` (assertion still valid, comment to refresh in qa's next touch). ✅ **qa Stage D sync DONE — 123/123 e2e + 5/5 unit** (+25: `why-choose-us.spec` 13, `testimonials.spec` 12; the invented-data wall extended site-wide to both visible text AND RSC payload; O-6 schema guards + O-7a aria guard added; two mid-dev failures were qa's own — a React bare-`data-numeric` serialization nit and `last-child` → `last-of-type` on /faq where the JSON-LD script is a legitimate last child; residual note: book.spec's inline honesty checks still read visible text only — unifiable later). ✅ **a11y Stage D audit DONE — `/why-choose-us` + `/testimonials` CLEAN** (axe 0 ×2; findings 0; addendum appended as round 3 after one quota death — inventory showed the manual+walk JSONs already covered the full protocol, so only two read-only live verifications were re-run). Raw-data anomalies resolved to artifacts: menu-button 120 ms transition reads ×2, the known O-2 header shadow + the tokens-allowed float shadow, and a star-class false hit (Tailwind substring — zero rating elements exist). Advisories dispositioned (DECISION_LOG): **O-8** skip-link focus parks on the anchor → prescription `tabindex="-1"` on `<main>` ACCEPTED, bundled into Stage E; **O-9** placeholder brass 6.25:1 (AA passes, below AAA normal-text) → ACCEPTED as-is (AA is the charter target). Cosmetic: 2 stray BOMs stripped from report.md. ✅ **Critic round 1 DONE — APPROVE ×2 for `/why-choose-us` + `/testimonials`, zero blockers/majors** (`critic/{why-choose-us,testimonials}-2026-11-16.md`; scores ≥4 on all axes, a11y 5 ×2; the flagged §02 h3s "If you're salaried"/"If you run a business" judged honest audience labels). **STAGE D FULLY CLOSED: engineering ✓ qa 123/123 ✓ a11y clean ✓ screenshots 10/10 ✓ critic APPROVE ×2 ✓ — all 8 routes now carry their own per-route critic APPROVE.**

### STAGE E (final stage) — brief
Goal: close KNOWN_ISSUES #15 honestly + the sanctioned tidy list, then phase close. Key inventory finding (Orchestrator, 16 Nov): only TWO image usages exist site-wide (`/` + `/about`, the 48.8 KB founder-plate webp, already priority + width/height + sizes + unoptimized) — the 14 Nov "image-led" labels are stale for the rebuilt routes, 3 of which now ship zero images. **Prime LCP suspect: `.reveal-in` (`animation: … backwards`) renders wrapped content at opacity 0 — invisible elements generate no LCP candidate until visible; any `animationDelay` extends the invisible window.** The house head pattern wraps the manifesto in `<Reveal y={8}>` on every rebuilt route.
- **E1 (Orchestrator) ✅ DONE:** dev server stopped; first build attempt ran against an un-removed `.next` (deletion failed on a lock from the just-killed dev server — repaired); **clean build re-run with `.next` verified absent first: success, all 13 routes prerendered static.** Ground truth for the 16 Nov CSS retirement verified in the prod bundle: `hero-pattern` 0 hits, `card-lift` 0 hits; `.act-band :focus-visible` + `.bg-primary :focus-visible` + `--focus-on-ink` + `.slip` all present (single CSS file, 67 457 B). Prod-error check: zero prerender failures.
- **E2 (perf-seo) ✅ DONE — Reveal hypothesis CONFIRMED:** all 8 routes measured on the clean prod build (lhci port 3200 + Playwright supplement). **LCP element inside the head `<Reveal y={8}>` on all 7 rebuilt routes** (h1 ×6, founder image on `/about`); final candidate ~420 ms after FCP = the `--motion-enter` ramp; presented as +2.3–2.5 s simulated via the hydration window (simLCP ≈ simTTI on Reveal routes). **`/book` control (no Reveal): LCP = FCP, 0.76 s, perf 99.** Exonerated: image weight (`/` LCP is the h1, 77k px² vs image ~34k px²), fonts (arrive ~102–110 ms, before first paint, zero swap repaint), delay props (zero `delay=` site-wide — the delay half of the hypothesis refuted). Caveats per #17: values upper bounds; element identity/membership/computed styles deterministic. Prescriptions: **P1** unwrap head Reveal ×7 (minimal-diff: keep the wrapper div + className, drop only `reveal-in` + the style), **P3** `fetchPriority="high"` ×2 founder images, P2/P4/P5 no action. Evidence: `docs/design/baseline/stage-e/` (8 LHRs + summaries) + `stage-e-report.md`.
- **E3 (frontend-engineer) DONE - engineer's session died on quota AFTER implementing everything; its full report arrived late (session resumed) and confirms the Orchestrator's verification:** P1 x7 heads unwrapped (minimal-diff: wrapper divs + classNames preserved, only `reveal-in` + the style dropped; unused imports removed - `reveal-in` count in served HTML is 0 on all 8 routes and that is CORRECT: the a11y audits prove Reveal was head-only, no below-fold usage ever existed); P3 `fetchpriority="high"` in served HTML on `/` + `/about` (Next 16.4.6 emits camelCase `fetchPriority` in SSR; HTML parsing normalizes - qa's guards use the rendered DOM); `section-header.tsx` deleted (zero references, grep-verified); O-8 `<main id="main" tabIndex={-1}>` in layout + served HTML. tsc 0; lint 0/0; all 8 routes 200.
- **E5.5 art-director retirement DONE (verified):** `.reveal-in` rule + `@keyframes reveal-in` + the reduced-motion `animation:none` member removed from `globals.css` (remaining reduced-motion collapse rules pasted-proof intact; file ends clean on the reduced-motion block); `--reveal-y` died with the keyframes (never a CSS declaration); **`--motion-enter` + `--ease-entrance` DELETED per Orchestrator sanction (zero consumers) — motion sheet now exactly 4 tokens each with a live consumer (`--ease-standard`, `--motion-fast`, `--motion-base` + the reduced-motion blanket); compiled CSS 115 B lighter (11 295 B); live tokens verified intact post-minification.** tokens.md §4/§5.2/§9 annotated without rewriting history (§9.1 never listed `.reveal-in`). Verified: zero `reveal`/`motion-enter`/`ease-entrance` hits in globals.css; lightningcss parse OK; contrast-check deep-equal 19 pairs.
- **E4 (qa) DONE - 123/123 e2e + 5/5 unit, tsc 0, lint 0/0, zero failures:** stale `home.spec.ts:191` comment refreshed to the 16 Nov retirement ground truth (assertion unchanged); `book.spec` unified onto the shared honesty helper (strict superset of the inline checks - the separate zero-appointment test stays inline deliberately, it sweeps all `[aria-label]/[title]` elements; `/book` RSC payload verified CLEAN in isolation first, 9/9); two guards added into existing specs: founder-plate `fetchpriority="high"` on `/` + `/about`, `<main tabindex="-1">` (O-8) in home.spec as the site-wide smoke. The grep fact held: zero reveal assertions existed, no spec changes needed for P1.
- **E5 (perf-seo) DONE - fix CONFIRMED:** observed FCP->LCP gap **+0 ms on all 8 routes** (deterministic criterion met; simLCP collapsed to the `/book` ceiling 0.76-0.77 s on 7 of 8 and stands decoupled from simTTI - the defect signature is gone); sim perf scores this run are contaminated (untouched control `/book` fell 99 -> 73 on identical bytes), so perf >= 90 remains the #17 quiet-machine item, and `/about` simLCP 3.32 s is flagged for the same re-measure. Artifacts: `postfix-lhr-*.json` + `postfix-lh-summary.json` in `docs/design/baseline/stage-e/` + the "Post-fix verification (17 Nov 2026)" section appended to `stage-e-report.md` (pre-fix files untouched).
- **E6 (Orchestrator) DONE — PHASE 3 CLOSED (17 Nov 2026):** IMPLEMENTATION_LOG Phase 3 entry written; PHASE_STATUS → DONE; KNOWN_ISSUES #13 (RESOLVED) / #15 (root cause fixed, deterministic criterion) / #17 (17 Nov control data point) refreshed; SESSION_HANDOFF §3 rewritten to the 17 Nov state; committed (NO push/deploy/publish — owner gate). Final gate before close: 123/123 e2e + 5/5 unit against the production build (next start), tsc 0, lint 0/0; final clean-build ground truth: zero `reveal-in` / `motion-enter` / `ease-entrance` in the shipped CSS, live focus rules + `.slip` intact (CSS 66 713 B). Next up (Definition-of-Done items): #17 quiet-machine re-measure → FINAL_QA_REPORT.md → owner [GATE] on push/deploy.
- **Preview deploy (owner request, 17 Nov):** the owner asked for a shareable link to show the site to an external reviewer (Claude) → Netlify CLI deploy on a new preview site, `plsharma-site-preview` (id `73a966b5-834f-4b56-aac2-e67f60ae8e9c`). Draft deploys proved login-walled (Netlify default access control, verified live), so the public link is the preview site's own URL: **`https://plsharma-site-preview.netlify.app`** — a free subdomain for testing, NOT the production hosting decision. The publish gate is UNAFFECTED — no real-domain hosting touched. `site/netlify.toml` + a `.gitignore` entry added (Vercel ignores them; they only affect the Netlify CLI). See DECISION_LOG (17 Nov entry) and TOOLING_LOG (17 Nov section).
13. **Backlog from a11y observations:** O-2 (art-director: drop header-CTA `shadow-sm`?) — bundle with the next art-director touch; O-3 disposition (accept-and-document vs replace the native date input) — decide after the critic's round 1.

### Phase 2 resume state (historical — phase closed 15 Nov 2026)
1. ✅ Charter re-read (phase-start rule); gate decisions recorded in DECISION_LOG.
2. ✅ Art-director token overhaul DONE (`site/app/globals.css` + `docs/design/phase-2/tokens.md`; evidence reproduces; gotchas in DECISION_LOG).
3. ✅ Frontend-engineer Home rebuild DONE — fonts via next/font (Fraunces+Inter, OFL), shared CTA wording (header/float/footer), founder plate graded + acceptance-passed (47.7 KB webp + avif, original untouched), `/` rebuilt as ledger (§01–§05, one h1, act-band, placeholder-marked testimonials), lint #13 fixed via `useSyncExternalStore` (lint 0, typecheck 0). All deviations accepted and logged (DECISION_LOG 14 Nov entry).
4. ✅ Art-director focus fix DONE (15 Nov retry) — base `:focus-visible` now 2px solid `--ring` (12.53:1 on paper) / `--focus-on-ink` brass on ink surfaces (5.17:1); CTA ring stack closed via `box-shadow: none`; evidence reproduces (19 pairs deep-equal); cascade byte-order proven; `tokens.md` §5.3/§8/§9.2 updated.
5. ✅ Frontend-engineer focus micro-fix DONE — `outline-none`+`ring-ring/50` deleted from focus strings in 6 ui primitives (badge.tsx added per tokens.md §5.3 row 2; destructive-variant alpha focus rings removed), redundant `focusOnPaper`/`focusOnInk` deleted from page.tsx; typecheck 0, lint 0, source grep 0 matches, compiled CSS clean (token outline only, one indicator anywhere; `aria-invalid` state rings kept).
6. ✅ qa-engineer Home test pass DONE — **35/35 green** (unit 5/5 + e2e 30/30: 22 home.spec, 3 booking-form offline e2e, 6 home-responsive at all five widths, overflow=0 measured). Honesty regression guards in place (no stars/ratings/invented names/"Book Appointment"; placeholder-mark only; checks run against page.content() incl. RSC payload). Zero product defects on `/`; one QA-test selector bug fixed in-test. Flagged for later: `/book` slip still carries retire-list wording (slip-rebuild phase; keep tests in sync), reduced-motion follow-up test recommended. Visual baselines NOT created; build check deferred to LHCI step.
7. ✅ a11y-checker audit DONE — `/` and `/book` both **0 axe violations** (no regression vs Phase 0 baseline of 0); 0 AA failures; #16 verified fixed (live float paint = #0B6E39, 5.89:1). All manual checks pass (focus indicator 12.53:1 ink / 5.17:1 brass-on-ink across 45+33 tab stops; reduced-motion: 0 animations; reflow clean at 320px; placeholder reads as honest text). Evidence: `docs/design/a11y/phase-2-2026-11-15/` (12 screenshots + served-CSS dump). Findings F1–F5 all non-blocking → dispatched to engineer as one batch (F1 mobile CTA height collapse in booking-form; F2 select trigger height consistency; F3 focus-outline fade on transition-colors links; F4 skip link; F5 plate alt polish). Dev-only `nextjs-portal` in tab order is expected (absent in production).
8. ✅ qa-engineer follow-up DONE — F5-adjusted assertions (plate `alt=""` pinned + accessible-name check via visible captions; image-alt test keeps presence-only) → suite back to **30/30 e2e + 5/5 unit**. Outstanding test-gap note: suite can't catch "everything went alt=''" globally (a11y-checker's territory).
9. ✅ Art-director `@source not` shipped + **leak source corrected** — the dead-CSS leak was never `repos/` (git-ignored; Tailwind's scanner respects it): it came from the studio's own `docs/` (prose quoting class names + the a11y evidence CSS snapshot re-seeding dead utilities every build). Directive `@source not "../../repos"` kept as a guard (path-corrected to `../../repos` — bases resolve from the stylesheet). ⏳ **Follow-up running:** add `@source not "../../docs"` (measured: dead `h-8` rule gone, −5.8 KB CSS, no site utility lost) + `.opencode` + `logos` exclusions for a clean site-source-only scan boundary; tokens.md note to correct the earlier repos attribution.
10. ✅ LHCI first run DONE (exit 0; a11y assertion passed; a11y 100 × 8; CLS 0 × 8) — **but perf numbers are noise-contaminated**: identical builds measured TBT 1071→5955ms run-to-run (one giant "Unattributable" main-thread task; script eval only ~360ms; baseline-day TBT was 76ms). Fonts A/B-exonerated as the TBT cause (task worsened 4258→5955ms WITHOUT Fraunces). → KNOWN_ISSUES entry pending (measurement validity); real findings: `/` preloads 311 KB fonts (Fraunces 4-axis×2-style; italic unused anywhere; SOFT/WONK pinned to 0 in CSS); globals CSS 86.5 KB. Experiment edits REVERTED (layout.tsx restored from backup).
11. ✅ Font contract slimmed (both halves done) — art-director validated + corrected the preload attribution (146 KB was the *italic* latin file, 118 KB the *normal*; total 311.3 KB) and found one real regression: `/about` renders two literal `<em>` phrases → would fall back to synthesised oblique. Amendment recorded in tokens.md §2: house emphasis = `<strong className="font-medium text-ink">`, body carries no italic. Engineer: Fraunces loader → `axes: ["opsz"]`, no style (typecheck 0, lint 0); art-director: dead `font-variation-settings` line removed from globals.css, `font-optical-sizing: auto` kept, tokens.md §2 rewritten (families, why, re-add conditions, emphasis rule) + **correction of record**: the earlier "about-page italic" was pre-existing legacy copy, not a Phase 2 addition. Contrast evidence deep-equal. ⏳ Engineer now applying the 2-line `/about` emphasis fix; then Orchestrator rebuild + lhci ×3 + real byte numbers back to tokens.md §2.
12. ✅ Font fix verified by rebuild + LHCI — build exit 0; woff2 total **781 → 357 KB**; `/` preloads **311.3 → 115.8 KB** (Fraunces latin VF 67.4 KB + Inter 48.4 KB); **zero italic @font-face**; `/about` `<em>` replaced with house emphasis. **Full 8-route autorun: exit 0, a11y assertion passed, a11y 100 × 8; perf `/` 55 → 69.** **Distribution on `/` (3 runs, same build): quiet run TBT 34 ms → perf 93/a11y 100/FCP 766 ms (BETTER than baseline 89/76 ms); busy runs TBT 3.5–5.7 s → perf 62–63 — #17 noise confirmed and bounded.** Remaining honest gap: LCP ~3.3 s on `/` (target 2.5) → #15 stays OPEN (image-optimisation task). Art-director receiving real bytes for tokens.md §2.
13. ✅ Screenshots captured — `docs/design/screenshots/phase-2/home-{360,768,1024,1440,1920}.png` (full-page, convention established). Mobile 360: ledger structure/act band/placeholders render as designed; desktop 1440: margin rail + ruled entries + Fraunces hero as designed. Founder plate = interim graded crop (reshoot pending, #1a, owner gate decision).
14. ✅ Critic round 1 DONE — **APPROVE, zero majors/blockers** (originality 4, hierarchy 4.5, consistency 4.5, usability 4.5, accessibility 5, performance 4, brand fit 4); every smoke-test backlog major verified resolved. Review: `docs/design/critic/phase-2-home-2026-11-15.md`. Three optional minors, all closed: (1) founder sunglasses = owner-tracked interim reshoot (#1a); (2) float-graze verified a non-issue at 360/375 px (`docs/design/screenshots/phase-2/float-graze-check-*.png`); (3) inline colour styles → `text-brass-ink` (paper, 6.25) / `text-brass` (ink, 5.17) via the art-director's `:where(.rail-label)` zero-specificity rule — computed colours pixel-identical.
15. **15 Nov interruption:** overnight the machine rebooted (zombie pair #14 cleared; dev server died) — dev server relaunched in the Orchestrator session on 3000. All Phase 2 edits intact on disk, uncommitted → committed at phase close.

### Phase 2 brief
- **Goal:** implement the approved "Kept Ledger" design system in code and rebuild the Home page (`/`) as its first full expression, resolving the critic smoke-test REJECT backlog on that page.
- **Inputs:** `docs/design/discovery/vibe-board.md` + `brand-personality.md` (approved direction), `user-problem.md` (conversion design), owner gate decisions (below), critic smoke-test backlog, KNOWN_ISSUES #13/#15/#16, `site/app/globals.css` (current tokens), Next 16 docs note in `site/AGENTS.md` (read `node_modules/next/dist/docs/` before product code).
- **Outputs:** token overhaul in `site/app/globals.css` (art-director); Fraunces wiring + shared primitives (margin rail, ruled entry, act band, placeholder marker, CTA set, consultation slip base) + rebuilt `/` (frontend-engineer); screenshots at 360/768/1024/1440/1920; axe + Lighthouse runs on `/`; a fresh Home test pass.
- **Files agents may touch:** art-director → `site/app/globals.css` + `docs/design/**`; frontend-engineer → `site/**` (product code; no architecture changes); qa-engineer → `site/tests/**`; a11y-checker/perf-seo/critic → reports only. Orchestrator: ledgers.
- **Owner gate decisions applied (14 Nov 2026):** direction APPROVED; "first consultation is free" = owner-confirmed fact (stays); founder photo = interim graded crop on the home hero (reshoot requested in parallel); header keeps all 8 links.
- **Exit criteria:** Home passes the charter PAGE COMPLETION RULE (content final or marked; responsive at 360/768/1024/1440/1920; all states; keyboard + screen-reader usable; images optimised with dimensions + alt; SEO metadata; Lighthouse targets on `/`; screenshots reviewed; **critic APPROVE**; tests exist). Lint error #13 fixed en route; WhatsApp token #16 replaced; no unconfirmed data anywhere.
- **Delegations:** art-director (tokens) → frontend-engineer (primitives + Home) → qa-engineer (tests) → a11y-checker + perf-seo (checks) → critic (page review, round 1).
- **Critic verdicts:** round 1 **APPROVE** (15 Nov 2026 — originality 4, hierarchy 4.5, consistency 4.5, usability 4.5, accessibility 5, performance 4, brand fit 4; zero majors/blockers; every smoke-test backlog major verified resolved; all three optional minors closed before commit). Review: `docs/design/critic/phase-2-home-2026-11-15.md`.

### Phase 2 — DONE (critic APPROVE round 1, 15 Nov 2026)
Token system + Home complete and verified: 35/35 tests, axe 0 violations on `/`
and `/book`, build exit 0, a11y 100 × 8 (LHCI), quiet-run perf 93 / TBT 34 ms
(beats the Phase 0 baseline; measurement caveat #17), font payload 781 → 357 KB,
CSS scan boundary clean. Full record: IMPLEMENTATION_LOG Phase 2 entry +
DECISION_LOG 14–15 Nov entries. Carried into Phase 3: #15 LCP image optimisation,
`/book` slip rebuild (retire "Book an Appointment"/"Send Booking Request"; keep
e2e expected strings in sync), reduced-motion follow-up test, 2 lint warnings
(#13), founder reshoot (#1a).

### Phase 1 — DONE (gate approved 14 Nov 2026)
Deliverables complete; critic round 2 APPROVE; owner passed the [GATE] with four
decisions (see DECISION_LOG 2026-11-14 gate entry). Review:
`docs/design/critic/phase-1-discovery-2026-11-14.md`. Committed `c8959d9`.

### Phase 1 brief
- **Goal:** confirm the charter's project details with the owner (max 8 probing questions) and produce the strategic design foundation.
- **Inputs:** charter PROJECT DETAILS (pre-filled from records), owner's answers, `PROJECT-NOTES.md`, existing site content, critic smoke-test backlog (`docs/design/critic/smoke-test-2026-11-13.md`).
- **Outputs:** `docs/design/discovery/vibe-board.md` (art-director), `docs/design/discovery/user-problem.md` (ux-strategist), `docs/design/discovery/brand-personality.md` (art-director) — then critic review saved under `docs/design/critic/`.
- **Files agents may touch:** ux-strategist & art-director → `docs/design/discovery/**` only; critic → `docs/design/critic/**` only.
- **Exit criteria:** three deliverables written; critic verdict recorded; **[GATE]** stop and wait for owner approval before any design/build phase.
- **Delegations:** questions by Orchestrator (batch of 8, question tool) → deliverables by art-director + ux-strategist (no overlap: different files) → critic review.
- **Owner answers received (14 Nov 2026):** fundamentals confirmed (brand, framing, WhatsApp booking goal); primary action = **book consultation via WhatsApp**; audience = **individuals and small businesses equally**; vibe and uniqueness **delegated to the studio** ("discuss with the critics and agents and decide"); admired references: **none** — "complete new work from scratch and build its own identity"; styles to avoid: **startup flash, stock-photo corporate, cluttered templates**; content available: founder photo (in repo), real testimonials (promised, **not yet supplied**), team photos (pending), nothing else — placeholders must stay clearly marked; no credentials supplied → no qualification claims.
- **Orchestrator note:** because the owner delegated the aesthetic call, the art-director's deliverables are studio **proposals**; the existing navy+gold tokens are a candidate input to evaluate, not a constraint. The [GATE] remains the owner's approval point.
- **Critic verdicts:** round 1 REJECT (F1 major: unconfirmed stat tiles `1:1`/`100%` in site-config; F2 minor: untraceable contrast ratios; F3 minor: divergent CTA wording) → all three fixes applied (single honest stat tile; committed contrast verifier `site/tools/contrast-check.mjs` + `docs/design/discovery/contrast-evidence.json`, all figures reproduce; canonical wording table per surface) → round 2 **APPROVE** (originality 4, hierarchy 4.5, consistency 4, usability 4, accessibility 4.5, performance 4, brand fit 4.5). Review: `docs/design/critic/phase-1-discovery-2026-11-14.md`. Optional critic notes for Phase 2: retire remaining "Book an Appointment" source wording; founder-photo interim grade is the highest-impact asset decision.
- **Gate items for the owner:** (1) approve the Kept Ledger direction + conversion design; (2) verify-or-cut the "first consultation is free" promise; (3) founder photo: interim graded crop on the home hero vs type-only hero until the reshoot; (4) optional nav change deferred from the duplicate run (drop /testimonials + /why-choose-us from the header until real testimonials arrive); (5) asset requests from vibe-board §10 (founder reshoot, 3 team photos, signature scan, real testimonials).

## Completed phases

### Phase 0 — Baseline — DONE (14 Nov 2026)

- **Brief:** verified pre-work baseline of the existing repo — structure, deps, scripts, git state, install/build/lint/tests, honest failure record. Deliverable `BASELINE_REPORT.md`.
- **Files touched:** `site/lighthouserc.json` (port 3000 → **3200**), `site/.gitignore` (+`/.lighthouseci/`), root `.gitignore` (pre-existing uncommitted `.lighthouseci/` line, committed with the phase), `docs/design/BASELINE_REPORT.md`, evidence bundle `docs/design/baseline/lhci/` (results.json, assertion-results.json, README.md), ledgers. **No product code** (charter baseline rule).
- **Results:** build exit 0 — 8 content pages + 8 framework/metadata routes = 16 prerendered targets (manifest-reconciled); lint exit 1 (1 error + 2 warnings → KNOWN_ISSUES #13, deliberately **not** fixed per baseline rule); unit tests 5/5; axe 0 violations × 8 routes (production server); **LHCI clean run:** a11y/BP/SEO 100 × 8, perf 89–100 (`/` 89 below target), LCP misses on the four image-led routes (→ KNOWN_ISSUES #15). Evidence committed so every number is checkable.
- **Environment incidents:** OpenCode server restart cancelled the first LHCI run (orphaned processes; elevated zombie pair remains → KNOWN_ISSUES #14); a contended rerun was superseded; the harness's re-execution of the cancelled command delivered the final clean artifact set (8 runs, port 3200, mobile/simulate). Dev server restored on port **3000**.
- **Exit criteria:** all verified — see `BASELINE_REPORT.md` §8.
- **Critic verdicts:** round 1 REJECT (F1–F7: 2 majors — LHCI numbers not traceable, route-count inconsistency; 5 minors) → all fixes applied → round 2 **APPROVE** (originality 4, hierarchy 4.5, consistency 4.5, usability 4, accessibility 4.5, performance 3, brand fit 4.5). Review: `docs/design/critic/phase-0-baseline-2026-11-14.md`.

### Setup (pre-baseline) — DONE 13–14 Nov 2026

Studio infrastructure created and verified: 7 subagents in `.opencode/agents/`
(permissions verified via `opencode debug agents`), Orchestrator rules in
`AGENTS.md`, Playwright MCP connected, tooling installed (Playwright 1.65.0,
axe-core 4.14.0, Lighthouse CI 0.16.1, chromium 158), models pinned (critic →
nemotron-3.5-super-vl-free, art-director → deepseek-v4.1-flash-free), owner
charter adopted (`f584017`), cold-start `SESSION_HANDOFF.md` wired into
`AGENTS.md`. Critic smoke test: scored REJECT review of the Home page
(`docs/design/critic/smoke-test-2026-11-13.md`) — its required fixes are the
first backlog carried into the build phases.

## Next phases (queued)

- **Phase 3 — Pages (Design & Build):** next phase; brief to be written at phase
  start (re-read STUDIO_CHARTER first per the phase rule). Each remaining route —
  `/about`, `/services`, `/why-choose-us`, `/testimonials`, `/faq`, `/contact`,
  `/book` — must clear the charter PAGE COMPLETION RULE with its own critic
  review. First backlog carried from Phase 2: KNOWN_ISSUES #15 (LCP image
  optimisation), `/book` slip rebuild (retire "Book an Appointment"/"Send Booking
  Request" wording — keep e2e expected strings in sync), reduced-motion follow-up
  test, 2 lint warnings (#13), founder reshoot (#1a), PLACEHOLDER content
  (owner data: testimonials, team photos).

## Template for a new phase brief

```md
### Phase N — <name> — IN PROGRESS | BLOCKED | DONE
- Goal:
- Inputs:
- Outputs:
- Files each agent may touch:
- Exit criteria:
- Delegations: (who, what, when)
- Critic verdicts: (APPROVE/REJECT + round count)
```

## Phase 4 — Polish pass (owner-approved, 17 Nov 2026) — IN PROGRESS

Owner's 17 Nov message = the approval for THIS pass. 13 tasks (T0–T13), run serially
in batches, **one commit per task on branch `polish-pass`** (created from main's
`8f10ae1` + chore `a64d8bf`; main pointer untouched; **no push, no deploy**).
Site language stays English. **Never invent qualifications, awards, statistics,
client counts, memberships or years beyond 2001** — sample content exists ONLY
behind the T0 preview flag with visible SAMPLE tags.

- **Goal:** execute the owner's 13-task polish list at production quality through
  the studio pipeline.
- **Inputs:** owner task list (17 Nov); STUDIO_CHARTER; KNOWN_ISSUES; DECISION_LOG;
  the site as of `8f10ae1` (+ preview tooling chore `a64d8bf`).
- **Outputs:** `docs/design/CHANGELOG_POLISH.md`, `OWNER_CHECKLIST.md` (root),
  `docs/design/LINK_CHECK.md`, updated ledgers, critic review, per-task commits.
- **File scope this phase (binding):**
  - `frontend-engineer`: `site/**` source (app, components, lib, public,
    next.config, netlify.toml) + appends to `OWNER_CHECKLIST.md`. NOT
    `site/app/globals.css` (art-director's) and NOT tests.
  - `art-director`: `site/app/globals.css` + `docs/design/phase-2/tokens.md` +
    `docs/design/polish/**` notes.
  - `qa-engineer`: `site/tests/**` + `docs/design/LINK_CHECK.md` (sanctioned
    exception, logged in DECISION_LOG) + `docs/design/screenshots/polish/**` +
    evidence files under `docs/design/polish-evidence/**`.
  - `ux-strategist`: `docs/design/polish/**`.
  - `a11y-checker`, `perf-seo`, `critic`: reports only (critic →
    `docs/design/critic/**`).
  - Orchestrator: PHASE_STATUS, DECISION_LOG, IMPLEMENTATION_LOG, KNOWN_ISSUES,
    PROJECT-NOTES, CHANGELOG_POLISH, OWNER_CHECKLIST.
- **Delegations (serial where files overlap):**
  - B1 engineer: T0 sample-content tiers + banner + tag (runs NOW, parallel with
    qa crawl + ux spec — no servers/builds for the engineer while qa owns
    ports/.next; tsc + lint only).
  - qa: T8 BEFORE-crawl of the local build + deployed preview (owns :3000/:3200
    and `.next`).
  - ux-strategist: wording spec for T1/T2/T3/T7/T11 (docs only).
  - Then B2 engineer (T1/2/3/7/11) → art-director CSS pass A1 (T4/5/12 CSS
    incl. sample-banner + nowrap-phone + CTA stacking) → B3 engineer (T6/9/10)
    → B4 engineer (T12 markup/manifest/bar) → art-director A2 (bar + final) →
    B5 engineer (T8 404 page + fixes) → qa test syncs per batch → T13 verify:
    qa (format/lint/build/tests) + a11y (axe) + perf-seo (Lighthouse
    foreground) + screenshots (360/390/430/768/1024/1440 × 9 pages incl.
    /privacy) → critic review (≤3 rounds, then Orchestrator decides + logs).
- **Exit criteria:** every task DONE or honestly BLOCKED with reason; build
  exit 0; lint 0/0; tsc 0; unit + e2e green (strings updated); axe 0 on ALL
  pages incl. /privacy; sample strings provably absent from the production
  build output (qa guard); sample mode shows tags + top banner; screenshots at
  the 6 widths for all 9 pages; critic APPROVE; CHANGELOG_POLISH complete;
  OWNER_CHECKLIST complete (CA status, reshoot, testimonials+permission, team
  photos/roles, domain, domain email, privacy review, real-phone tests,
  quiet-machine LHCI).
- **Commit discipline:** the Orchestrator commits after each task (engineers do
  not run git). Commit messages reference the task numbers.
- **T8 progress (qa) — BEFORE-crawl DONE (17 Nov):** clean prod build (one
  transient `0xC00000FD` stack-overflow crash, retry exit 0 — recorded in
  Method); 8/8 pages 200; 275 anchors recorded, 204 GET-checked → **0 broken**;
  48 `<link>` GETs + images all 200; sitemap 200 (8 locs, route set exact);
  robots 200. Honest surprises: **the deployed preview is now PUBLIC** (owner
  flipped the Netlify visibility — evidence in LINK_CHECK.md; the 401 is
  recorded as prior attributed evidence), which makes T9's indexing guard
  urgent (KNOWN_ISSUES #18); the 404 already renders inside the branded chrome
  (optional polish, B5 still adds a branded page); **icons are NOT missing**
  (favicon.ico/png/svg + apple-icon all present, hypothesis disproven);
  titles + canonicals are already per-page — the shared `og:*` trio is the
  real gap (→ T9). 10 issues consolidated: 8 → T9, 2 optional. Deliverables:
  `docs/design/LINK_CHECK.md` + `docs/design/polish-evidence/link-check-before.json`.
- **T0 progress (engineer B1) — implementation DONE, one refinement running:** 8
  files changed — `content-mode.ts` (env flag, default false), `site-config.ts`
  (tier restructure; the 4 invented testimonials DELETED outright; visible-*
  derived exports so prod cannot render or prop-drill sample data), `sample-tag.tsx`
  + `sample-banner.tsx` (visible "SAMPLE — not real, replace before launch" / first
  element in body), layout/home/about/testimonials wired; tsc 0, source eslint
  clean; old invented names zero hits in source; qa's specs flagged for the tier
  sync. **Orchestrator fixes applied:** `.netlify/**` added to eslint globalIgnores
  (qa's deploy artifacts inside `site/` had turned full lint red — 4890 problems,
  all under `.netlify/**`; after the fix `npm run lint` = 0/0, exit 0). **Refinement
  in flight:** sample data moves OUT of `site-config.ts` into a new
  `site/lib/sample-content.ts` — a client component importing any `site-config`
  export pulls the whole module into the client bundle, so sample strings would
  otherwise ship in prod JS chunks; the split keeps the client bundle
  sample-string-free. Commit follows the refinement + qa verification.
- **T0 COMMITTED (`c48a861`) + ux wording spec committed (`5999011`):** final
  engineer verification tsc 0 / lint 0/0; sample data lives ONLY in
  `site/lib/sample-content.ts` (server-side consumption only) and
  `site-config.ts` is client-safe — both `"use client"` importers (header,
  booking-form) pull from it, so the client bundle cannot carry sample strings
  by construction; invented names 0 hits in source. **Decisions logged
  (DECISION_LOG):** ux spec adopted as binding for B2 — Since-2001 census → the
  T2 band is Home's single 2001 carrier; `/testimonials` question-prefill
  extends the CTA-canon exception list; critic book-F2 title-suffix REJECTED
  (one meta-title pattern site-wide); footer all-6 services + config-format
  hours + no "Trusted" self-claim (→ T11); spec §6 SENT-tel: row corrected to
  the wording batch. Owner sign-off items (bio word, site.description,
  whyChooseUs[2]/[3]) added to OWNER_CHECKLIST. **`CHANGELOG_POLISH.md`
  started** (T0 done, T8 part 1 done, rest pending).
- **qa test sync IN FLIGHT** (session reused): tier-aware `about.spec.ts` /
  `testimonials.spec.ts`, NEW production sample-string guard (6 strings × 8
  routes vs HTML+RSC), one `SHOW_SAMPLE_CONTENT=true` preview-build positive
  check (banner first body element on all routes + tagged associates/
  testimonials + principal quote), then the default-state rebuild + full suite.
  **B2 (T1/2/3/7/11 per spec) launches the moment qa lands** — the engineer
  must not touch `site/**` while qa's builds run.
- **T0 test sync COMMITTED (`71bd77f`):** about/testimonials specs migrated
  (confirmed*/visible* imports, html+RSC-level absence sweeps), NEW
  `sample-content.spec.ts` = the 8-route production guard (6 leak strings vs
  HTML + RSC payload + zero `.sample-banner`/`.sample-tag` nodes). tsc 0.
  **Runtime verification STAGED, not run:** 4 build attempts died at the
  TypeScript stage with V8 OOM (`NewSpace::EnsureCurrentCapacity`, exit 134) —
  the machine has ~1.5 GB free commit while the owner's apps (chrome ~1.2 GB,
  five java processes, opencode-cli) hold the rest; standalone tsc passes and
  TASK 8 built this morning → **not a product bug**. Ready-to-run plan staged
  in the qa session (build → serve → 3 specs → full suite, expect 132 e2e /
  5 unit → `SHOW_SAMPLE_CONTENT=true` probe → default restore). Runs at the
  next build window (post-B2 qa sync or T13).
- **DECISION (DECISION_LOG): TASK 7 structure override** — the owner's
  keep-only list is implemented literally: `/testimonials` §02 + §03 REMOVED
  (spec §3.1 rows 1–5, §3.3, §3.4 rows 8–9 mooted; new lean-page meta string),
  Home §04 hidden entirely in production, nav link gated via `visibleNavLinks`
  (client-safe: content-mode flag only). ux amendment appended to the spec (§8).
- **B2 engineer LAUNCHED** (session reused): T1 bio + caption moves + polished
  founder plates (sharp, new files only) + phone-number markup hooks; T2 record
  band (`yearsInPractice` + hours constant); T3/T11 spec rows + the SENT-tel:
  fix; T7 restructure per the override. NO builds/servers (memory squeeze) —
  tsc + source eslint only. B2 COMMITTED (`dcc4977`, 14 files): tsc 0, eslint
  0/0, grep proofs clean (removed strings 0 hits; sample wall intact; §8
  amendment note — the engineer's "spec missing §8" claim was a stale early
  read; the file has §8 at L246–288, commit `d7363a0` verified). Engineering
  judgment calls: §03 five items as `ul.ruled-entry`; §04 preview order
  reserve→note→link→samples; footer hours via block spans. CTA container
  classes handed to the art-director. Image inspection: saturation 0.8 proved too subtle — one targeted iteration applied and verified (gradient-masked top desaturation ×0.5 + global ×0.75; measured top-region channel spread 26.5 → 14.0, −47%; face global-pass-only; visually confirmed tamer halo, same subject).
- **A1 COMMITTED (`f269e61`, art-director):** tokens — display clamp 32–56
  (FAQ/wcu h1s ~3 lines), `--header-h` (68/97) + safe-area tokens,
  `scroll-padding-top`, `.rail-num` figure/rule/text system + B3 markup
  contract (a1-notes.md §1; uppercase kept, owner case-change one declaration
  away), entry density rule, float inset/z + footer clearance + field
  scroll-margin, coarse-pointer 44px floors, sample-tag/banner styling,
  `.phone-number` nowrap. Honest already-satisfied verdicts: CTA stacking
  (flex stretch) + inputs ≥16px + zero `100vh`. Contrast script deep-equal
  (19 pairs). B4 notes captured. Residual: float can clip mid-page right edge
  on 375px — B4/A2 decision.
- **B3 COMMITTED (`62f471a`, 18 files):** T5 — 21 `.rail-num` markers per the
  A1 contract, zero `§` in markup (exclusions + doc citations held); T6 —
  `PRACTITIONER_IS_CA` default false, audit card renamed with the owner's three
  bullets, every audit claim gated (grep table in CHANGELOG; three honest
  keeps); T9 — `SITE_URL` default preview URL, per-page OG/Twitter via the
  `pageMetadata` helper, branded og:image (Orchestrator-inspected: clean,
  Georgia serif flagged to A2), `ALLOW_INDEXING` default false → noindex +
  disallow-all robots + X-Robots-Tag in netlify.toml (KNOWN_ISSUES #18 fix in
  tree), ProfessionalService JSON-LD from confirmed config only; T10 — /privacy
  (real field list, no-storage statement, deletion path, hard-coded date) +
  footer link + sitemap + consent note under the slip. tsc 0, eslint 0/0.
- **DECISION (DECISION_LOG): /testimonials noindex refined** — conditional
  while `confirmedTestimonials.length === 0` (both modes); sitemap entry gated
  on the same condition; self-maintaining when real quotes land (supersedes
  §8's "always noindex" wording). B4 implements the two-line change.
- **B4 COMMITTED (`d3c6717`, 16 files):** viewport export (cover +
  interactiveWidget, doc-validated), min-h-dvh, skip-link safe-area,
  whatsapp-float hook, manifest + icon-192/512 (apple already 180), action bar
  on 8 pages (/book excluded, zero styling — A2's), Radix RemoveScroll
  verified (overflow-y-auto added for tall sheets), Item-0 noindex/sitemap
  conditional. tsc 0, eslint 0/0.
- **A2 COMMITTED (`66d4bf7`, art-director):** `--bar-h` 61px + phones-only
  <48rem bar (the header's own md boundary), three reserve bands that never
  sum, float RETIRED where the bar renders (one WhatsApp action per screen —
  deviation accepted, DECISION_LOG; one-declaration revert documented),
  selector swap to `.whatsapp-float`, og font ACCEPT Georgia (recipe logged),
  final review 12/12 incl. contrast deep-equal. qa hand-off: home.spec L287
  nav-count assertion must be scoped (the bar adds a second nav).
- **B5 COMMITTED (`023798d`):** branded 404 (`app/not-found.tsx`, one file) —
  identity marker + h1 `That page isn't here.` + honest line + five verbatim
  quick links; doc-verified layout wrapping/main landmark/auto-noindex; no
  ActionBar by design. tsc 0, eslint 0/0. ALL 13 tasks now code-complete
  except T13's verification pass itself.
- **MEMORY WINDOW OPEN:** 6.5 GB free physical, Chrome/java gone from the top
  processes — the qa BIG SYNC WINDOW launched: clean build → serve :3000 →
  T0 staged verification (default guard + `SHOW_SAMPLE_CONTENT=true` probe +
  restore) → spec syncs (§7 pins + §8/B2 flips + B3 rail-num/conditional-h1 +
  B4 viewport/manifest/bar + B5 404 checks) → T8 after-crawl → full suite
  (unit file-form + Playwright). qa owns ports 3000/3200 + `site/.next`.
- **QA WINDOW DONE (commits `3af15af` tests + `ba9462d` evidence):** run-1
  passes (T0 positive probe, negative guard 0 leaks, spec evidence) + run-2
  completion: 10 specs migrated + 4 new (not-found, seo-head, action-bar,
  privacy) + `expectRailNum` helper; 2 test-side fixes (404 double robots meta
  scoped; float accessible name scoped vs bar); product bugs 0; suite **175/175
  e2e + 5/5 unit**; after-crawl 0 broken local links (issues 10 → 2, both
  owner/deploy-pending, LINK_CHECK after-half with the redeploy caveat);
  server killed, ports 3000/3200 clear.
- **T13 BRIEF (final phase — gate now running):**
  - **Gate:** `npx tsc --noEmit` 0 · `npm run lint` 0 (2 test-file problems
    sent back to qa for fix) · no formatter configured (prettier absent —
    format gate N/A, no new installs) · production `npm run build` exit 0
    (memory 7.5 GB free; OOM-retry-once rule) · serve :3000.
  - **a11y-checker:** axe-core WCAG 2.2 AA across all 9 pages (incl. /privacy
    and the 404 via unknown URL), production build, report = violations per
    page with node evidence → persisted by the Orchestrator. Target: 0.
  - **qa screenshots:** 9 pages × 6 widths (360/390/430/768/1024/1440) →
    `docs/design/screenshots/polish/` (script in `site/tests/**`, granted
    lane extension); includes /privacy + action-bar/float states.
  - **perf-seo:** Lighthouse CI foreground AFTER a11y/screenshots land
    (quiet machine; KNOWN_ISSUES #17 evidence): perf ≥ 90, LCP < 2.5 s.
  - **critic (≤3 rounds):** screenshots (esp. phone sizes 360/390/430) +
    a11y + LHCI reports + CHANGELOG draft → APPROVE/REJECT per charter.
  - **Finish:** CHANGELOG final task table + final DONE/PARTIAL/BLOCKED
    message with per-task evidence. No push, no deploy (owner-gated).
- **T13 GATE STATUS (18 Nov):** build exit 0 (18 routes) · lint 0 (after
  `fd733f5`) · tsc 0 · format N/A (no formatter configured) · suite 175/175
  e2e + 5/5 unit (`3af15af`) · **axe 20/20 CLEAN, 0 violations** (`b464d02`,
  `polish-evidence/t13-axe.json`) · **LHCI quiet-machine PASS: perf 100
  (≥90), LCP 0.757 s (<2.5), CLS 0.000, home ×2 variance 0** (evidence
  `t13-lhci-*.json`; KNOWN_ISSUES #15 + #17 CLOSED; SEO 66–69 = intentional
  T9 guard, flips at launch) · **65 screenshots** (`8f69819`) incl.
  360/390/430 phone set + 390-vp bar/float + 2 × 404 · after-crawl 0 broken
  links (`ba9462d`).
- **REMAINING:** critic round 1 (≤3) → fix round if REJECT → CHANGELOG final
  table → final DONE/PARTIAL/BLOCKED report. No push, no deploy.
- **T13 COMPLETE — CRITIC APPROVE (round 1, zero fixes; 18 Nov):** review at
  `docs/design/critic/polish-pass-t13-r1.md` — scores 4/4.5/4.5/4.5/5/5/4.5
  (originality/hierarchy/consistency/usability/accessibility/performance/
  brand-fit); 4 optional minors logged, none release-blocking. CHANGELOG final
  task table written (all 13 DONE). **POLISH PASS CLOSED** pending owner
  actions only: redeploy, launch env vars, CA confirmation, reshoot, real
  testimonials, real-phone tests (OWNER_CHECKLIST). Nothing pushed; main
  untouched at `8f10ae1`.
