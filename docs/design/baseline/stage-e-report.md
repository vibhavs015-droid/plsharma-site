# Stage E - LCP diagnostic (closes KNOWN_ISSUES #15)

**Run date:** 16 Nov 2026. **Build:** clean production build (site/.next, 13 static routes). **Role:** perf-seo (read-only; prescriptions only - the frontend-engineer implements).

**Validity banner (KNOWN_ISSUES #17):** every **simulated** perf/LCP/TBT/TTI number in this report is an **upper bound** measured on this machine (noise-contaminated; TBT wildly so). The **deterministic** deliverables - LCP element identity, Reveal membership, computed animation delay/duration, the observed FCP-to-LCP gap pattern, and the candidate timelines - are valid regardless of machine noise and are the basis of every conclusion below.

---

## 1. What ran

| Step | Detail |
|---|---|
| LHCI collect | npx lhci collect from site/, existing lighthouserc.json (8 URLs, port 3200, npm run start -- -p 3200, numberOfRuns 1), CHROME_PATH = Playwright chromium chromium-1254. Lighthouse **13.6.0**, mobile form factor, throttlingMethod: simulate |
| Playwright supplement | %TEMP%/opencode/stage-e-lcp.mjs - own prod server on 3200, mobile viewport **412x823 / DPR 1.75** (matches LH emulation), buffered PerformanceObserver (largest-contentful-paint), reveal-ancestor walk, computed styles. **Unthrottled local** - used for element identity, candidate timelines and computed props only, never for absolute values |
| Hygiene | lhci's own server exited with collect (0 listeners on 3200); supplement server killed after the run (0 listeners); 0 leftover headless chrome |

Evidence (all in docs/design/baseline/stage-e/):

- lhr-<route>.json x 8 - raw Lighthouse Result files (route-named copies of site/.lighthouseci/lhr-*.json)
- lh-summary.json - extracted per-route metrics + LCP node data
- stage-e-lcp.json - Playwright in-page LCP candidate timelines + reveal computed styles

> Field-provenance note for lh-summary.json: observed.ttfb holds the **metrics-audit (simulated) TTFB**; the **observed** TTFB is lcp.phases.timeToFirstByte. LH 13.6 dropped the old largest-contentful-paint-element audit; LCP node data lives in lcp-breakdown-insight (used here), and lcp-discovery-insight is only populated on image-led routes.

---

## 2. Per-route results (16 Nov, NEW pages, mobile)

Scores: a11y / best-practices / SEO = **100 / 100 / 100 on all 8 routes** (a11y holds at 1.0 - consistent with the Stage D result, not re-audited). CLS = **0** everywhere. Render-blocking resources = **0**. Requests = 10 per route.

| Route | sim LCP (UB) | sim FCP | sim TBT (UB) | sim TTI (UB) | sim perf | bytes | obs FCP -> LCP | LCP element (LH node, authoritative) | in .reveal-in? | computed delay/dur |
|---|---|---|---|---|---|---|---|---|---|---|
| / | 3.29 s | 0.76 s | 71 ms | 3.31 s | 92 | 366 KB | 217 -> 634 ms (**+417**) | h1 "Income tax and GST, handled personally..." (372x210) - section.ledger-rail > div.reveal-in > div > h1 | **YES** | 0 s / 0.42 s |
| /about | 3.28 s | 0.76 s | 85 ms | 3.37 s | 92 | 364 KB | 258 -> 641 ms (**+383**) | img founder-plate.webp (300x375) - div > div.mt-10 > figure.w-fit > img.mt-3 | **YES** (DOM walk; selector omits the class) | 0 s / 0.42 s |
| /services | 3.21 s | 0.76 s | 174 ms | 3.25 s | 91 | 343 KB | 206 -> 606 ms (**+400**) | h1 "Income tax, GST, audits, registration..." (372x168) - ... > div.reveal-in > div > h1 | **YES** | 0 s / 0.42 s |
| /why-choose-us | 3.18 s | 0.76 s | 119 ms | 3.21 s | 92 | 320 KB | 262 -> 595 ms (**+333**) | h1 "Fees agreed before work begins..." - ... > div.reveal-in > div > h1 | **YES** | 0 s / 0.42 s |
| /testimonials | 3.05 s | 0.76 s | 158 ms | 3.05 s | 92 | 316 KB | 212 -> 596 ms (**+384**) | h1 "Real client words..." - ... > div.reveal-in > div > h1 | **YES** | 0 s / 0.42 s |
| /faq | 3.05 s | 0.76 s | 136 ms | 3.05 s | 93 | 317 KB | 209 -> 593 ms (**+384**) | h1 "Documents, fees, notices..." - ... > div.reveal-in > div > h1 | **YES** | 0 s / 0.42 s |
| /contact | 3.03 s | 0.76 s | 116 ms | 3.03 s | 93 | 316 KB | 248 -> 598 ms (**+350**) | h1 "One office in Jaisalmer..." - ... > div.reveal-in > div > h1 | **YES** | 0 s / 0.42 s |
| /book - **control, no Reveal** | **0.76 s** | 0.76 s | 137 ms | 3.28 s | **99** | 339 KB | 208 -> 208 ms (**+0**) | p.text-body - outside any reveal | NO | - |

**The pattern:** LCP = FCP + ~0 ms on the one route without a Reveal; LCP = FCP + 333-417 ms on all seven routes with the Reveal. On the seven Reveal routes, **simLCP ~ simTTI** (exact equality on testimonials/faq/contact; within 30-90 ms on the other four) while /book's simLCP sits at FCP against a TTI of 3.28 s.

### Playwright supplement (real page, unthrottled local, same viewport)

| Route | FCP | final LCP | gap | LCP element | in reveal | delay/dur | candidates |
|---|---|---|---|---|---|---|---|
| / | 220 | 644 | +424 | H1 (77,252 px^2) | yes | 0 s / 0.42 s | 2 - P.rail-label @220 -> **H1 @644** |
| /about | 68 | 516 | +448 | IMG founder-plate.webp (102,900 px^2) | yes | 0 s / 0.42 s | 2 - P.rail-label @68 -> **IMG @516** |
| /services | 112 | 544 | +432 | H1 | yes | 0 s / 0.42 s | 2 - P.text-body @112 -> **H1 @544** |
| /why-choose-us | 124 | 556 | +432 | H1 | yes | 0 s / 0.42 s | 2 - P.text-body @124 -> **H1 @556** |
| /testimonials | 112 | 544 | +432 | H1 | yes | 0 s / 0.42 s | 2 - P.text-body @112 -> **H1 @544** |
| /faq | 104 | 540 | +436 | H1 | yes | 0 s / 0.42 s | 2 - P.text-body @104 -> **H1 @540** |
| /contact | 120 | 552 | +432 | H1 | yes | 0 s / 0.42 s | 2 - P.text-body @120 -> **H1 @552** |
| /book | 148 | 148 | 0 | P.text-body | no | - | 1 |

(Absolute FCPs differ between the two systems - warm process vs LH's trace baseline; the **gaps** are the comparable quantity and agree within measurement noise: ~420-450 ms everywhere a Reveal exists, 0 where it does not. revealAnimations came back empty in the supplement's isolated world - instrument limitation; the computed styles above are the authoritative capture.)

---

## 3. Reveal hypothesis - VERDICT

**CONFIRMED (deferral mechanism), on all 7 rebuilt routes; REFUTED (delay half), at source level.**

1. **Deferral confirmed.** The house head pattern wraps rail-label-adjacent content in <Reveal y={8}>; on every rebuilt route the LCP element sits **inside** that wrapper (6 x h1, 1 x founder image), and the final LCP candidate appears **~one animation duration after FCP** (observed gaps 333-417 ms in LH traces; 424-448 ms via direct PerformanceObserver) - matching the 420 ms --motion-enter ramp. The computed animation on the wrapper is reveal-in 0.42s cubic-bezier(0.22,0.61,0.36,1) backwards, delay **0s**; computed opacity at rest = **1** (content ships visible - the no-JS contract holds).
2. **Delay half refuted.** Zero delay= props exist in the codebase (grep); animationDelay is only emitted for nonzero delays, and computed animation-delay = 0s on every measured wrapper. The backwards fill therefore holds nothing - the deferral comes purely from the opacity:0 ramp start.
3. **Mechanism (measured signature; internals are Chromium's).** At first paint the head block computes opacity:0 (from-keyframe), so Chromium skips it as an LCP candidate; frames during the compositor-driven opacity ramp do not register a new candidate, so the first eligible evaluation lands at the ramp's end - when the animation's completion forces the block's paint at opacity 1. The first candidate is whatever is visible at FCP outside the wrapper (rail-label or the header's intro paragraph), then it is replaced at ramp end.
4. **Why the simulated number inflates ~6x.** LH's simulated timeline schedules that ramp-end paint **after the simulated main-thread busy window (hydration)** - hence LCP_sim ~ TTI_sim (3.0-3.4 s) on all seven Reveal routes, while /book's LCP paints *before* the block and keeps LCP_sim = FCP_sim = 0.76 s. So a ~420 ms real deferral presents as +2.3-2.5 s simulated on this machine. This is an upper-bound model artefact **plus** a real ~420 ms deferral - both removed by the same fix.
5. **Old-vs-new comparison labels.** 14 Nov baseline: /, /services, /why-choose-us, /testimonials were **already rebuilt** (Reveal present - old simLCP 3.78 / 3.00 / 2.97 / 2.97 s); /about, /faq, /contact were **old pages without Reveal** (0.76 s each); /book had no Reveal then and now (0.76 s both days). The LCP profile flips **exactly with the Reveal's presence across two independent runs on two days** - the strongest confirmation short of the intervention itself.

### / and /about: image or text?

- **/** - LCP is the h1 (text, 77,252 px^2). The founder plate (48.8 KB, priority, unoptimized, arrives ~106 ms) renders ~165 px wide at mobile (~34,000 px^2) - never the largest candidate. The image is not the problem on /.
- **/about** - LCP is the founder image (300x375 = 102,900 px^2, beats the one-line h1). Its resource phases: loadDelay 28 ms + loadDuration 21 ms + **elementRenderDelay 585 ms** - the image was loaded almost instantly; the entire delay is the Reveal. (Source: the figure is inside the head <Reveal y={8}> at site/app/about/page.tsx L38-72.)

### Font-swap contribution

**Zero, measured.** Both faces are preloaded and arrive at ~102-110 ms - **before first paint** (208-262 ms observed) on every route - so the first paint already uses the final fonts; no swap repaint exists to defer anything. font-display audit passes (1.0) on all routes; LH does not gate text LCP on font arrival (proof: /book keeps LCP_sim = FCP_sim with the same fonts). Combined with the DECISION_LOG A/B (fonts exonerated for TBT): **fonts need no action.**

---

## 4. Prescriptions (for the frontend-engineer; owner/orchestrator decides design trade-offs)

| # | Route(s) | Prescription | Expected effect |
|---|---|---|---|
| **P1** | all 7 rebuilt routes | **Remove the <Reveal y={8}> wrapper from the page-head block** (h1 + lead; on / also CTAs + founder plate; on /about also the founder figure). Keep the children and their spacing classes - the wrapper is a plain block div, so removal is layout-neutral; verify spacing visually once. Keep Reveal on **below-fold** sections: those elements are out of the viewport at load and can never be LCP candidates | LCP candidate fires at FCP -> real deferral minus ~420 ms; simulated LCP decouples from the hydration window - predicted to land at the /book ceiling (LCP_sim ~ FCP_sim ~ 0.8 s, perf ~ 99) on every route, under the 2.5 s charter target |
| P1-alt | same | If a first-screen entrance is a design requirement: a **transform-only head variant** (opacity stays 1; translateY 8->0) achieves the same LCP result. Simpler to unwrap; design call | same as P1 |
| P2 | all | **No delay-related change** - zero delay= props exist; reveal.tsx itself needs no change | n/a |
| P3 (minor, optional) | /, /about | LH's lcp-discovery-insight flags priorityHinted: false on /about: the priority prop currently renders no fetchpriority attribute. Optionally set fetchPriority="high" explicitly on the two founder-plate <Image>s | Small real-network win for the image request; not the cause of anything measured |
| P4 (explicitly rejected) | all | **No font changes.** Zero swap contribution measured; A/B already exonerated fonts for TBT; payload already slimmed (Fraunces 2-axis ~116 KB preloaded on /) | n/a |
| P5 (out of scope) | all | Do **not** chase simTTI 3.0-3.4 s as an LCP fix - after P1, LCP no longer waits for it (/book proves the ceiling) | n/a |

**Recommended re-measure after P1:** one quiet-machine lhci autorun pass; success criterion = every rebuilt route shows the /book profile (LCP_sim ~ FCP_sim <= ~0.9 s, perf >= 97) and the observed FCP-to-LCP gap = 0. That closes #15 (re-classify its cause: not image weight - the head-Reveal deferral).

## 5. What did NOT regress

TBT 71-174 ms (healthy; #17 noise aside), CLS 0 everywhere, a11y/bp/SEO 100 everywhere, byte weight 316-366 KB with 10 requests per route (biggest items: hydration JS 72 KB, Fraunces 67 KB, Inter 49 KB, founder image 49 KB). No render-blocking resources flagged.

## Post-fix verification (17 Nov 2026)

**Fix implemented (Orchestrator-verified; corroborated read-only this session):** the head <Reveal y={8}> wrapper removed on all 7 rebuilt routes (plain wrapper divs kept; reveal-in class + animation style dropped); fetchPriority="high" on both founder-plate images; fresh clean production build. Source grep corroboration: reveal-in now exists only in its definitions (globals.css L506-537 + the now-unused components/site/reveal.tsx) - zero usages in any page; zero Reveal references in site/app; fetchPriority="high" at site/app/page.tsx L105 and site/app/about/page.tsx L64.

**Method:** identical to the pre-fix pass. npx lhci collect on the existing lighthouserc.json (8 URLs, port 3200, prod server via npm run start), CHROME_PATH = Playwright chromium, Lighthouse 13.6.0, mobile emulation, throttling: simulate. The Playwright supplement was **not** needed this pass: the LH metrics audit carries the observed FCP/LCP pair - exactly the gap data the verdict needs. Raw evidence: postfix-lhr-<route>.json x 8 + postfix-lh-summary.json in this folder (pre-fix files untouched). LHR fetchTimes 2026-11-17T05:12:12Z through 05:13:43Z.

**Run-level noise warning (worse than the pre-fix day):** this run's simulated timeline is strongly inflated - TBT 506-5556 ms run-wide (the one-giant-Unattributable-task signature from KNOWN_ISSUES #17), simTTI 3.1-6.4 s, and even observed FCP absolutes ran high (services 1040 ms vs 206 ms pre-fix). Proof it is machine noise, not a site change: the **unchanged control route /book measured perf 73 today vs 99 pre-fix** (identical code and bytes; its TBT went 137 -> 1766 ms). Per #17 all simulated numbers below are upper bounds; the deterministic gap criterion is the basis of the verdict.

 | Route | sim LCP pre | sim LCP post | obs gap pre | obs gap post | perf pre | perf post (UB) | KB pre/post | LCP element (post) | gap verdict |
 |---|---|---|---|---|---|---|---|---|---|
 | / | 3.29 s | 0.77 s | +417 ms | **+0 ms** | 92 | 71 | 366 / 366 | h1 - section.ledger-rail > div > div > h1 (no reveal-in) | PASS |
 | /about | 3.28 s | 3.32 s* | +383 ms | **+0 ms** | 92 | 62 | 364 / 364 | img founder-plate.webp | PASS |
 | /services | 3.21 s | 0.76 s | +400 ms | **+0 ms** | 91 | 87 | 343 / 343 | h1 (no reveal-in) | PASS |
 | /why-choose-us | 3.18 s | 0.76 s | +333 ms | **+0 ms** | 92 | 71 | 320 / 320 | h1 (no reveal-in) | PASS |
 | /testimonials | 3.05 s | 0.76 s | +384 ms | **+0 ms** | 92 | 70 | 316 / 316 | h1 (no reveal-in) | PASS |
 | /faq | 3.05 s | 0.76 s | +384 ms | **+0 ms** | 93 | 70 | 317 / 317 | h1 (no reveal-in) | PASS |
 | /contact | 3.03 s | 0.76 s | +350 ms | **+0 ms** | 93 | 72 | 316 / 316 | h1 (no reveal-in) | PASS |
 | /book (control) | 0.76 s | 0.76 s | +0 ms | **+0 ms** | 99 | 73 | 339 / 339 | p.text-body | PASS |

*about post simLCP flag: noise-era upper bound, not a site signal. The observed trace paints the image at 190 ms with clean phases (resourceLoadDelay 29 ms + resourceLoadDuration 8 ms + elementRenderDelay 146 ms - was 585 ms render delay pre-fix). Its simulated 3.32 s comes from the simulated image-arrival model riding the same inflated timeline that dragged the unchanged /book control down. Re-check this one number in the quiet re-measure.

Observed FCP/LCP pairs (post): / 508/508, /about 190/190, /services 1040/1040, /why-choose-us 187/187, /testimonials 421/421, /faq 403/403, /contact 208/208, /book 245/245.

**Decoupling confirmed:** pre-fix the defect signature was simLCP ~ simTTI on all 7 Reveal routes (the ramp-end paint waited for the hydration-blocked window). Post-fix simLCP (0.76-0.77 s) stands fully decoupled from simTTI (3.1-6.4 s) on the 7 text routes - the LCP paint no longer waits for the hydration window, exactly as predicted.

**priorityHinted:** now **true** on /about (the only route where LH surfaces the discovery checklist, because the image is the LCP element there). On / the founder image is not the LCP element, so LH emits no checklist; the attribute is source-verified in the HTML.

**a11y / best-practices / SEO:** 100 / 100 / 100 on all 8 routes (a11y holds at 1.0). CLS 0 everywhere. Byte weights identical pre/post (366/364/343/320/316/317/316/339 KB) - the fix moved no bytes, as expected.

**Overall verdict:** all 8 routes now paint LCP at FCP (observed gap = +0 ms everywhere, deterministic); simLCP sits at the /book ceiling (0.76-0.77 s) on 7 of 8 routes, with /about's 3.32 s a noise-era upper bound to re-check on a quiet machine. The perf >= 90 charter criterion cannot be demonstrated in this run - the run's own TBT explosion dragged every score down including the unchanged control - so perf >= 90 remains a quiet-machine item.

**#17 caveat (restated):** simulated perf/LCP/TBT/TTI remain upper bounds on this machine; the verdict rests on the deterministic gap criterion (obs FCP = obs LCP, element identity, phase decomposition), which is noise-immune. The quiet-machine re-measure remains the Definition-of-Done item for KNOWN_ISSUES #17 - and on its success #15 can be closed with the /book-profile criterion from the pre-fix report.

**Hygiene:** lhci's server exited with the collect; 0 live listeners on 3200 at finish (2 TIME_WAIT sockets, self-cleaning); no orphan chrome; the Playwright supplement never ran, so nothing to kill. One pre-existing listener on port 3000 was present before this pass and was not touched (not spawned by this run - Orchestrator's to adjudicate).

**Side note (cleanup candidates, no urgency):** site/components/site/reveal.tsx is now unused, and the .reveal-in rules + keyframes in globals.css are dead (a few hundred bytes of unused CSS still ship in the stylesheet). Fold into a later hygiene pass alongside KNOWN_ISSUES #4's motion-dependency note.
