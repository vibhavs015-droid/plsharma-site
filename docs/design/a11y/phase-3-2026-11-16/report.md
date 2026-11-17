# Phase 3 Stage B - Accessibility audit: /book, /about, /services

> a11y-checker, 16 Nov 2026. WCAG 2.2 AA target (STUDIO_CHARTER).
> Dev server: http://localhost:3000 (Orchestrator's). Read-only pass; evidence only.

## Environment note (deviation from brief, logged for TOOLING_LOG)

The prescribed manual path - browse MCP via Code Mode `tools.browse.execute` with
Playwright code against `page` - is broken in this build: the execute realm never binds
the Playwright helpers (`page`, `browser`, `context`, `state`, `files`, `snapshot` all
undefined) across connected and disconnected sessions, with and without an explicit
session id. The Orchestrator's own browse session/tab was left untouched. Fallback used:
the project's own installed Playwright (same engine `tools/axe-check.mjs` uses, already in
TOOLING_LOG) driven by read-only scripts in the approved temp dir
(`%TEMP%\opencode\a11y-phase3b-*.mjs`); all evidence written to this folder. axe scans ran
exactly as prescribed (`site/tools/axe-check.mjs`, wcag2a / wcag2aa / wcag22aa tags).

## 1. Automated axe scans - baseline intact

| Route | Violations | Exit code | Evidence |
|---|---|---|---|
| /book | 0 (`[]`) | 0 | `axe-book.json` |
| /about | 0 (`[]`) | 0 | `axe-about.json` |
| /services | 0 (`[]`) | 0 | `axe-services.json` |

Phase 0-2 baseline was 0 violations on every route. **No new violation, no regression.**

## 2. Focus system (tokens.md S5.3) - PASS on all three routes

Served token values (computed from `:root`, all three routes): `--ring #282e3f`,
`--focus-on-ink #cf9455`, `--line-input #8a7f69`, `--brass #cf9455`, `--ink #282e3f` -
byte-identical to the token sheet.

Keyboard walk (Tab, one indicator per element, computed styles at focus):

- Every focusable on light surfaces paints exactly `2px solid rgb(40, 46, 63)`
  (ink on paper 12.53:1 / on sand 11.13:1), `outline-offset: 2px`, `box-shadow: none`,
  no pseudo-element outlines or shadows.
- Every focusable inside `.act-band` / `.bg-primary` (header top strip, nav, header CTA,
  menu button, footer, band CTAs) paints exactly `2px solid rgb(207, 148, 85)`
  (brass on ink 5.17:1) - verified SETTLED (`settle-reads.json`): skip link, nav links,
  header CTA, `Open menu` button, entry link, band primary, band quiet tel.
- No element ships two indicators. Two readings in the first pass looked like
  exceptions and were both resolved as non-issues:
  1. `Open menu` (header SheetTrigger) read `rgb(40,46,63)` in early walks - that is the
     ink->brass colour transition caught within ~5 ms of focus (mid-flight value
     `rgb(46,49,64)` captured once is exactly ~3% of the 120 ms interpolation). Settled
     read: brass. The tokens S5.3 ink-surface override reaches it.
  2. Header CTA carries a resting `shadow-sm` identical at rest and at focus - a resting
     elevation, not a focus-stacked ring (rest == focus verified). Not an a11y issue;
     logged as observation O-2 for the art-director (tokens S1 rule 6 says no shadows
     beyond the float).
- `site/components/ui/select.tsx` still carries `outline-hidden` on the trigger, but the
  globals.css guard rule restores the token outline - live paint verified: both select
  triggers focus with `2px solid rgb(40,46,63)`. No regression.
- New Stage B markup: `entryLink`/`quietLink` underline links on /about and /services all
  paint the single full-strength indicator (about `The work we handle`; services six deep
  links + FAQ quiet link). No `outline-none` / `focus-visible:ring` in any rebuilt route's
  markup (source grep; only the neutralized `select.tsx` base + CSS comments matched).

## 3. Per-route manual results

### /book - PASS (all Stage B specifics verified)

| Check | Result | Evidence |
|---|---|---|
| Act band removed, nothing lost | PASS - `.act-band` count 0; tel path retained (`Call the office` quiet link after submit) + `PREFER TO TALK FIRST?` card with `tel:`, `Monday - Saturday 10:00 AM - 7:00 PM`, `109, Indira Colony...`, `Sunday - Closed` | walk idx 25; `followup-checks.json` cardText |
| Mailto quiet link | PASS - real `<a href="mailto:plperiwal@yahoo.com">`, visible text = accessible name `Or send by email instead` (2.5.3 satisfied; topbar email link likewise name == text) | walk idx 24 |
| Field edges + type size | PASS - name/phone/email/date inputs + textarea: `border rgb(138,127,105)` (--line-input), `font-size 16px` (no iOS zoom) | fields[] |
| Select triggers 40px | PASS - both triggers 357x40 | selectTriggers[] |
| Submit target | PASS - `button[type=submit]` `Open WhatsApp with my request` 278x44 at 360px | targets360 |
| `?service=` preselect | PASS - `?service=GST Registration %26 Compliance` -> trigger text and native select value byte-identical to `services[].title`; `document.activeElement` stays `body` (no focus theft); next Tab starts at the skip link (no trap). Garbage value -> `Select a service` / empty value, no error state | deepValid / deepGarbage |
| Headings | PASS - one `h1` (`Book a consultation`); slip-head `Consultation request` is the `h2`; then footer `h2` + `h3`s | headings[] |
| Date input (native) | See observation O-3 | re-walk |

### /about - PASS

| Check | Result | Evidence |
|---|---|---|
| Founder plate | PASS - 300x375 rendered, `alt=""` decorative. As shipped it is NOT wrapped in a text link (the brief's "inside a text link" assumption is not how Stage B landed); a decorative image with no link is correct semantics and loses nothing - the founder name is carried by visible caption/entry text (`Parbhati Lal Sharma` h3 + captions), not colour-alone. See note O-4 | founderPlate |
| One honest stat tile | PASS - exactly one rendered leaf with `25+`: `Since 2001 - 25+ Years in Practice in Jaisalmer` (the only other regex hit is the RSC payload `<script>`, not rendered content) | statCount |
| Team names-only | PASS - `Associate` 0, `Executive` 0, `Senior Tax` 0 in rendered text; entries are name-only h3s: `Vikram Singh Soda`, `Bhawani`, `Hemraj` | roleWords |
| `.placeholder-mark` entries | PASS - exactly 2, both real `<p>` text (not colour-alone signalling): `[PLACEHOLDER - A LINE FROM THE PRINCIPAL HIMSELF, AWAITING OWNER]` and `[PLACEHOLDER - TEAM PHOTOS AND CONFIRMED ROLES, AWAITING OWNER]` | placeholderMarks |
| Headings | PASS - one `h1` (`Parbhati Lal Sharma has practised in Jaisalmer since 2001.`); h2 order `The practice` / `The principal` / `The team` -> h3 names under The team -> band h2 -> footer | headings[] |
| Band | PASS - label `The next step`, h2 sentence, canonical primary `Book a consultation on WhatsApp` with page-attributed prefill (`...via the website's about page.`), quiet `Call the office` | band |

### /services - PASS

| Check | Result | Evidence |
|---|---|---|
| Six numbered entries | PASS - six `.ruled-entry` rows in config order; markers are `span.rail-label` `01`..`06` - not headings, not inside headings, not aria-hidden: plain visible text read as "01" before each h3 (Home S05 precedent; not heading-like junk) | entries[].marker |
| Deep links | PASS - six `a[href="/book?service=<title>"]`; every param decodes byte-identical to its entry's h3 (`Income%20Tax%20%26%20ITR%20Filing` etc.); all six 254x48 at 360px | entries[].link / deepLinks / targets360 |
| "What to bring" line | PASS - only entry 01 carries it, reads naturally: `Form 16, PAN and your investment proofs are usually enough to start - you get a checklist for your case.` (Entry 06's `-- Payroll & Form 16` is its config bullet rendered verbatim, not an invented document list.) | whatToBring |
| FAQ quiet link | PASS - `Questions about documents, fees or notices -- the common questions` -> `/faq`, 320x58 at 360px | faqQuiet / targets360 |
| Headings | PASS - one `h1` (`Income tax, GST, audits, registration -- the work, in your words.`); h2 `The work we handle` -> six h3 titles -> band h2 -> footer | headings[] |
| Band | PASS - as /about with `...via the website's services page.` | band |

## 4. Cross-route checks

- **Landmarks + skip link: PASS x3.** `header`/`nav`/`main#main`/`footer` = 1 each on all
  routes. Skip link: first Tab stop, paints 2px ink when focused (171x38 visible,
  `focus:bg-paper`), Enter -> `location.hash #main`, page scrolls to main's top (97px,
  below the 97px sticky header), URL unchanged (same-document), and the NEXT Tab lands
  inside main content (book: `#name` field; about: `The work we handle` entry link;
  services: first deep link). No `data-scroll-locked` side effects. Verified per route
  with a clean-room sequence (`probe3.json` skipLogs).
- **Heading order: PASS x3** (exactly one `h1`; logical h2/h3 nesting; no skips).
- **Target sizes at 360px: PASS x3.** Brief-listed targets: band primary 320x44, band
  quiet tel 320x33, float 56x56 (fixed), submit 278x44, six service deep links 254x48 -
  all >= 24x24. Undersized text links (17px footer/nav links, 20px topbar + quiet tel/
  mailto links) all pass WCAG 2.5.8 via the **spacing exception**: a rigorous 24px-circle
  test against every other target found **zero intersections per route**
  (`followup-checks.json` circleTest). Header CTA is hidden at 360 (inside the closed
  sheet menu; 0x0, not a target).
- **Reduced motion (`prefers-reduced-motion: reduce`): PASS x3.** 0 running animations
  after load + scroll (book/about/services); float `animation-name: none`, transition
  `1e-05s`; the head `.reveal-in` collapses to `opacity 1` / `transform none` - content
  visible at rest, no hidden states (book ships no Reveal at all).
- **Reflow proxy at 320px: PASS x3.** `scrollWidth` = 320 = viewport on every route;
  widest element = `html` itself (widest content node < 320).

## 5. Findings

**F1..Fn: none.** No WCAG 2.2 AA failure was found on any of the three routes - axe 0 x3
and every manual check passed (two early-scan suspicions were investigated to ground truth
and resolved: the menu-button colour was a transition-timing artifact; the header CTA's
shadow is resting, not focus-stacked).

## 6. Observations (advisory, non-blocking - prescriptions only, no edits made)

| # | Observation | Criterion | Where | Prescription |
|---|---|---|---|---|
| O-1 | All six `/services` deep links share one accessible name (`Book a consultation -- the form opens with this service chosen.`) while pointing to six different `?service=` values. Passes AA 2.4.4 (the entry's `h3` is the programmatically associated context); fails only AAA 2.4.9. | 2.4.9 (AAA) | `site/app/services/page.tsx` entry link rows | Optional: `aria-label="Book a consultation -- the form opens with {title} chosen."` per link, or prefix the visible text with the title. |
| O-2 | Header CTA carries a resting `shadow-sm` (identical at rest and focus). Tokens S1 rule 6 allows a shadow only under the float. Not an a11y defect. | tokens consistency | `site/components/site/header.tsx` L99 | Drop `shadow-sm` (+ `hover:shadow-md`) from the header CTA className; visual change is imperceptible on the ink strip. Art-director's call. |
| O-3 | Native `<input type="date">` (id `date`) exposes 4 Tab stops: the three internal segments each get the 2px ink outline (correct), but the calendar-picker icon segment gets no visible indicator (`outline 3px none`, `:focus-visible` false - UA shadow-DOM painting the author token layer cannot reach). axe-clean; author markup is correct. | 2.4.7 (UA internal) | booking form date field | If the studio wants belt-and-braces: replace the native date input with a select (the time field already is one) or a styled popover; otherwise accept UA rendering and note it in KNOWN_ISSUES. |
| O-4 | Founder plate ships as a plain decorative `img alt=""` (300x375), not inside a text link as the brief assumed. Semantically correct as shipped; nothing is lost. | 1.1.1 (informational) | `site/app/about/page.tsx` | No action needed; if a link is ever added, keep `alt=""` and let the visible caption text carry the name. |
| O-5 | Quiet text links (topbar tel/email, `/book` tel + mailto rows, footer/nav links) are 17-20px tall at 360px - passing 2.5.8 only via the spacing exception (verified, zero circle intersections). | 2.5.8 (AA, exempt) | header/footer/quiet rows | No fix required. If the studio wants literal >= 24px targets everywhere, add `inline-block` + padding (e.g. `py-0.5` to reach 24px line box) - a visual-spacing decision, not an a11y gate. |

## 7. Verdicts

- **/book - clean** (axe 0; focus, skip, targets, preselect, reduced motion, reflow all pass; no findings).
- **/about - clean** (axe 0; founder plate, single stat, name-only team, 2 real placeholder marks, headings, skip all pass; no findings).
- **/services - clean** (axe 0; six numbered entries, byte-exact deep links >= 48px targets, single what-to-bring line, headings, skip all pass; no findings).

Evidence in this folder: `axe-{book,about,services}.json`, `manual-checks.json`,
`followup-checks.json`, `probe3.json`, `settle-reads.json`, plus per-route screenshots
(`{route}-1280-full.png`, `{route}-360-full.png`, `{route}-focus-{skip,band|submit,float,menu}.png`).

---

# Stage C addendum — /faq + /contact (2026-11-16, round 2)

> a11y-checker, 16 Nov 2026. Same WCAG 2.2 AA target and environment as Stage B
> (dev server localhost:3000; read-only pass; same Playwright-script fallback
> because the browse-MCP execute realm remains broken).

## 0. Run note

Stage C collection ran once and died on the free-model quota AFTER writing
`manual-checks-stage-c.json` (tokens, landmarks, heading trees, full focus
walks, skip probes, partial settled reads, route specifics) plus the 1280-full
and focus screenshots. This addendum is built from that file plus one minimal
gap re-run (`stage-c-gap.json`) covering ONLY what run 1 missed: 360px target
sizes, the 2.5.8 circle test, 320px reflow, reduced motion, the two 360-full
screenshots, faq ld+json ground truth, contact hours/email detail, and one
missing settled focus read. Nothing already collected was re-run.

## 1. Automated axe scans

| Route | Violations | Exit code | Evidence |
|---|---|---|---|
| /faq | 0 (`[]`) | 0 | `axe-faq.json` |
| /contact | 0 (`[]`) | 0 | `axe-contact.json` |

No regression vs the 0-baseline (Phase 0-2 + Stage B). Both files verified as
literal `[]` (10 bytes) via text read.

## 2. Focus system (tokens.md S5.3) - PASS on both routes

Served tokens identical to Stage B on both routes: `--ring #282e3f`,
`--focus-on-ink #cf9455`, `--line-input #8a7f69`, `--brass #cf9455`,
`--ink #282e3f`.

Keyboard walk (35 stops on /faq, 36 on /contact, each incl. the dev-only
`nextjs-portal`, excluded from counts):

- Light surfaces (skip link; /faq head-ask + entry foot links; /contact desk
  tel / WhatsApp / maps / mailto links): exactly `2px solid rgb(40, 46, 63)`,
  `outline-offset: 2px`, `box-shadow: none`, no pseudo-element outlines or
  shadows.
- Ink surfaces (topbar, nav, header CTA, menu button, band primary + quiet tel,
  footer): exactly `2px solid rgb(207, 148, 85)`, offset 2px, shadow none.
- Header CTA carries the same resting `shadow-sm` as Stage B (observation O-2,
  unchanged).
- Settled reads (>= 150 ms): /faq - menu, band primary, band quiet tel all
  brass; head-ask link and fee entry link ink (`manual-checks-stage-c.json`
  settleReads). /contact - menu, band primary, band quiet tel all brass; the
  missing light-surface settle was covered by the gap re-run: desk tel link
  settled `2px solid rgb(40, 46, 63)`, offset 2px, shadow none,
  `:focus-visible` true (`stage-c-gap.json` deskTelSettled).
- Two run-1 settle labels on /contact were script-label quirks, not site
  issues: `entry-quiet` not-found (that class pattern does not exist on
  /contact) and `skip-settled` landing on the About nav link (brass - an
  incidental nav confirmation; the skip link itself is covered by the walk and
  the Stage B settled baseline of identical markup). /faq's `skip-settled`
  label likewise read the fee entry link (ink) - useful data, mislabeled.
- Unlike Stage B, no mid-flight transition readings occurred: every immediate
  walk read already matched the settled value, so no exception resolutions were
  needed this round.

## 3. Per-route manual results

### /faq - PASS

| Check | Result | Evidence |
|---|---|---|
| 7 answers always visible | PASS - seven `.ruled-entry` questions (`Which documents do I need?` .. `Do you handle GST registration?`); accordion residue 0 (`details` 0, `[aria-expanded]` 0, hidden-in-main 0) | entries[] / accordionResidue |
| Rail markers | PASS - `span.rail-label` `01`..`07`, plain visible text, not headings, not aria-hidden (services precedent) | entries[].marker |
| Fee answer + free sentence | PASS - entry 02 ships the exact sentence `The first consultation is free.` as a visible `<p>` | freeSentence |
| Foot links | PASS - exactly two in-entry links: fee `Book the free first consultation` -> `/book` (entry 02), notice `Send us the notice — start here` -> `/book` (entry 03); whole-page `/book` hrefs = 4 (header CTA + footer complete the set) | entries[].links / bookFootLinks |
| Head-ask prefill | PASS - `wa.me/919829771396?text=...I have a question.` (question form per the S0.1 prefill map); visible text == accessible name `A question that isn't here? Send it — a person replies.` (2.5.3) | waLinks[0] |
| Band | PASS - label `The next step`, h2 sentence, primary `Book a consultation on WhatsApp` -> `...via the website's faq page.` (booking + page attribution), quiet tel `Call the office · +91 98297 71396`; exactly one `.act-band` | band |
| Headings | PASS - one h1 (`Documents, fees, notices — the questions, answered plainly.`); h2 groups `The first questions` / `Working with us` / `For business clients`, each with its h3 questions; band h2; footer h2+h3 (known residual, unchanged) | headings[] |

### /contact - PASS

| Check | Result | Evidence |
|---|---|---|
| Desk slip structure | PASS - `.slip` head is the h2 `The office`; row labels are plain `<p>` (`Call the office`, `WhatsApp`, `Address`, `Hours`, `Email`) - not headings, no heading-junk; rows in spec order phone / WhatsApp / address+maps / hours / email last | slip / slipDetail.labels |
| Desk link names | PASS - accessible name == visible text on all four desk links (tel + WhatsApp both `+91 98297 71396`, `Open in Google Maps`, `plperiwal@yahoo.com`); no aria-label mismatches anywhere on the route (2.5.3) | slip.rows[1].links / walk idx 13-16 |
| WhatsApp desk prefill | PASS - `wa.me/919829771396?text=...I have a question.` (question form - the documented S0.1 exception for a contact-page message) | waLinks[0] |
| One map link | PASS - exactly one `maps.app.goo.gl` link page-wide | mapsLinks |
| Zero iframes | PASS - `<iframe>` count 0 (embed cut per spec S6) | iframes |
| Static hours | PASS - hours are plain text (`Monday – Saturday · 10:00 AM – 7:00 PM` / `Sunday · Closed`); zero `aria-live` / timer ancestors in the slip | slipDetail |
| Walk-in entry | PASS - `Before you come` body ships the walk-in paragraph as visible text; ships as h2 + paragraph, no h3s needed, no heading skip | walkInEntry / headings[] |
| Band | PASS - h2 `We reply on WhatsApp and fix a time — or just walk in.`, primary -> `...via the website's contact page.` (page attribution), quiet tel | band |

## 4. Cross-route checks

- **Landmarks + skip link: PASS x2.** `header` / `nav` / `main#main` /
  `footer` = 1 each on both routes. Skip probe: first Tab = skip link painting
  2px ink (171x38), Enter -> hash `#main`, scrollY 97 (below the 97px sticky
  header), URL unchanged, `data-scroll-locked` false, and the NEXT Tab lands in
  main content (faq: head-ask link; contact: desk tel link).
- **Heading order: PASS x2** (one h1 each; logical nesting; no skips; footer
  pattern = known residual, unchanged).
- **Target sizes at 360px: PASS x2.** Band primary 320x44, band quiet tel
  320x33, float 56x56 (fixed), faq head-ask 306x48 (wraps to two lines at 360 -
  literally >= 24px tall on mobile). Undersized text links (faq entry foot
  links 248/253x20; contact desk links 138/138/174/179x20; nav 28px; footer
  17px) all pass 2.5.8 via the spacing exception: the 24px-circle test against
  every other visible target found **zero intersections on both routes**
  (`stage-c-gap.json` circleTest - 18 small targets on /faq, 20 on /contact,
  incl. the 1x1-at-rest skip link whose focused size is 171x38). Note: the
  topbar strip is hidden at 360 where the test runs; its 16px links belong to
  the O-5 advisory family (wide-spacing layout, unchanged since Stage B).
- **Reduced motion: PASS x2.** 0 running animations after load + scroll; float
  `animation-name: none`, transition `1e-05s`; the head `.reveal-in` collapses
  to `opacity 1` / `transform none` on both routes (content visible at rest).
- **Reflow at 320px: PASS x2.** `scrollWidth` = 320 = viewport on both routes;
  widest element = `html` itself.

## 5. Findings

**F1..Fn: none.** No WCAG 2.2 AA failure on either route - axe 0 x2 and every
manual check passed. Nothing needed artifact-resolution this round (Stage B's
menu-button timing artifact did not recur; walk and settled reads agree
everywhere).

## 6. Observations (advisory, non-blocking - prescriptions only, no edits made)

| # | Observation | Criterion | Where | Prescription |
|---|---|---|---|---|
| O-6 | /faq ships no FAQPage structured data: served HTML contains zero `application/ld+json` scripts and no `FAQPage` string (`stage-c-gap.json` ldJson / faqPageStringInHtml; source grep confirms none in `site/app/faq/`). page-specs S5 requires FAQPage schema bound by the honesty rule. Not a WCAG failure (all content visible; axe clean) - a spec/SEO gap. | n/a (spec line 311) | `site/app/faq/page.tsx` | Add an `application/ld+json` FAQPage block listing exactly the 7 shipped Q&A pairs (same wording as the served h3 questions / answers); hand to perf-seo for Rich-Results validation. |
| O-7 | AAA-only duplicate accessible names: (a) /contact desk tel and desk WhatsApp links are both named `+91 98297 71396` (different schemes; the visible `WhatsApp` label `<p>` sits adjacent but is not programmatically associated with the link); (b) band primary and float share the name `Book a consultation on WhatsApp` on every rebuilt route (pre-existing since Stage B; band carries the page-attributed prefill, float generic). AA 2.4.4 passes via surrounding context; fails only AAA 2.4.9 (same family as O-1). | 2.4.9 (AAA) | `site/app/contact/page.tsx` desk rows; band + float components | Optional: `aria-label="WhatsApp · +91 98297 71396"` on the desk wa.me link (contains both visible strings, so 2.5.3 stays satisfied); leave band/float as-is or differentiate the float's aria-label. Art-director's call. |

## 7. Verdicts

- **/faq - clean** (axe 0; focus system settled-correct on both surface kinds;
  7 always-visible numbered answers; question-prefill ask link;
  page-attributed booking band; targets pass incl. spacing exception; reduced
  motion + reflow pass; no findings. O-6 hands the FAQPage schema to perf-seo).
- **/contact - clean** (axe 0; plain-`p` desk labels; question-prefill WhatsApp
  desk link per the documented exception; one maps link; zero iframes; static
  hours; walk-in entry; page-attributed band; targets + circle test pass; no
  findings).

Evidence in this folder, Stage C: run 1 - `axe-faq.json`, `axe-contact.json`,
`manual-checks-stage-c.json`, `faq-1280-full.png`, `contact-1280-full.png`,
`faq-focus-{skip,band,float,menu}.png`, `contact-focus-{skip,band,float,menu}.png`;
gap re-run - `stage-c-gap.json`, `faq-360-full.png`, `contact-360-full.png`
(both new), plus `faq-1280-full.png` / `contact-1280-full.png` re-taken by the
same method. Scripts (temp dir, read-only):
`%TEMP%\opencode\a11y-phase3c-manual.mjs` (run 1),
`%TEMP%\opencode\a11y-phase3c-gap.mjs` (gap re-run).
---

# Stage D addendum — /why-choose-us + /testimonials (2026-11-16, round 3)

> a11y-checker, 16 Nov 2026. Same WCAG 2.2 AA target and environment as
> Stages B and C (dev server localhost:3000; read-only pass; the same
> Playwright-script fallback because the browse-MCP execute realm remains
> broken).

## 0. Run note

Three runs fed this addendum; nothing already collected was re-collected.

1. axe ran first per route (`site/tools/axe-check.mjs`): both files landed
   before anything crashed (S1).
2. The manual collection script crashed on /testimonials: a decode helper was
   passed to `page.evaluate` as an ARGUMENT (Playwright cannot serialize
   functions - `Attempting to serialize unexpected value`). /why-choose-us
   data was already complete at that point. Patch = inline the decoder inside
   the evaluate callback (`stage-d-patch.cjs`); the re-run produced both
   routes complete in `stage-d-manual.json` (51 KB: tokens, landmarks,
   heading trees, route specifics, skip probes, settled reads, 360 targets +
   2.5.8 circle test, 320 reflow, reduced motion, all 12 screenshots).
3. The first walk was superseded: the skip probe ran BEFORE the walk, and
   Chrome's sequential-focus starting point survives `blur()`, so both walks
   began mid-page and the cycle detector tripped early (band tel and footer
   tel share a truncated name+href key). Re-run protocol (`stage-d-walk.json`):
   fresh load, walk FIRST from `document.body`, cycle = next stop repeats the
   first stop, key now includes WxH. Complete cycles: 35 stops on
   /why-choose-us, 36 on /testimonials (each incl. the dev-only
   `nextjs-portal`, excluded from counts; the loop ends when the wrap
   re-lands on the skip link, the first stop). The re-run's trailing
   `skipFocused` confirm-read landed on the topbar tel link (206x16, brass)
   for the same starting-point reason - not a data gap: the skip link's own
   focused geometry is walk idx 0 on both routes (171x38, ink).

Focus-group change since Stage C: `globals.css` retired `.hero-pattern` and
`.card-lift`; the ink-surface focus group is now exactly `.act-band`,
`.bg-primary`. Verified by source grep (no `.hero-pattern`/`.card-lift`
markup anywhere in `site/` - only a home e2e test asserting their absence);
both Stage D walks ran with the new group hard-coded.

## 1. Automated axe scans

| Route | Violations | Exit code | Evidence |
|---|---|---|---|
| /why-choose-us | 0 (`[]`) | 0 | `axe-why.json` |
| /testimonials | 0 (`[]`) | 0 | `axe-testimonials.json` |

No regression vs the 0-baseline (Phases 0-2 + Stages B-C). Both files
verified as literal `[]` (10 bytes) via text read.
## 2. Focus system (tokens.md S5.3) - PASS on both routes

Served tokens identical to Stages B-C on both routes: `--ring #282e3f`,
`--focus-on-ink #cf9455`, `--line-input #8a7f69`, `--brass #cf9455`,
`--ink #282e3f`.

Keyboard walk (35 stops on /why-choose-us, 36 on /testimonials, each incl.
the dev-only `nextjs-portal`, excluded from counts; `:focus-visible` true at
every non-dev stop):

- Light surfaces (skip link; the three check-links; the collection link and
  the three proof links): exactly `2px solid rgb(40, 46, 63)`,
  `outline-offset: 2px`, `box-shadow: none`, no pseudo-element outlines or
  shadows (all `pseudo` fields empty at every stop).
- Ink surfaces under the NEW group (topbar, nav, header CTA, menu button,
  band primary + quiet tel, footer): exactly `2px solid rgb(207, 148, 85)`,
  offset 2px, shadow none.
- Settled reads (>= 300 ms; screenshots in folder): on BOTH routes menu, band
  primary and band quiet tel settle brass; the two NEW Stage D link types
  settle full-strength ink - /why-choose-us check-link
  `Read the fee answer`, /testimonials collection link. `:focus-visible`
  true, offset 2px, shadow none everywhere (`settleReads`).
- ONE mid-flight artifact recurred (the Stage B S2 precedent): walk idx 12,
  the `Open menu` button, immediate read `rgb(40, 46, 63)` vs expected brass
  on BOTH routes - the ink->brass 120 ms outline transition caught at ~0%
  (Stage B caught the same button at ~3%, `rgb(46,49,64)`). Settled reads on
  both routes: brass. Not a failure. (Stage C's round simply never sampled
  inside that transition window; the window is real.)
- Walk shadows, 2 per route, both already on record: the header CTA resting
  `shadow-sm` (observation O-2, rest == focus, unchanged) and the float's
  `shadow-lg` elevation (tokens S1 rule 6 allows exactly this one shadow).
  No new shadows anywhere.
- Star probe on /testimonials: the single `[class*='star']` DOM hit is the
  header CTA `<a href="/book">` - the substring `star` inside its
  `has-data-[icon=inline-start]:pl-2` utility (live re-check:
  `stage-d-star.cjs`). No star-rating element exists: 0 rating aria-labels,
  0 star glyphs, 0 svg/canvas/img in main.
## 3. Per-route manual results

### /why-choose-us - PASS

| Check | Result | Evidence |
|---|---|---|
| Landmarks + band | PASS - `header`/`nav`/`main#main`/`footer` 1 each; exactly one `.act-band` | landmarks / actBandCount |
| Manifesto h1 | PASS - one h1, the verbatim spec candidate `Fees agreed before work begins. Deadlines kept. Your papers stay confidential.` (11 words, <= 20) | manifesto |
| Heading order | PASS - h1 -> h2 `The way of working` -> h3 x4 (Transparent Pricing / On-Time, Every Time / Complete Confidentiality / End-to-End Support) -> h2 `What this means for your case` -> h3 x2 (If you're salaried / If you run a business) -> band h2 `Hold us to all four — start with the first conversation.` -> footer h2+h3 (known sr-only residual, unchanged) | headings[] |
| Entry markers | PASS - four `span.rail-label` `01`..`04`, plain visible text, not headings, not inside headings, not aria-hidden (services/faq precedent); the two §02 entries carry `marker: null` and read naturally - no stray markers in the tree | entries[].marker |
| Check-links | PASS - exactly 3 `main a[href='/faq']`; accessible name == visible text (`Read the fee answer` / `Read the confidentiality answer` / `Read the notice answer`); each sits inside its entry under the entry h3 (2.4.4 context: Transparent Pricing / Complete Confidentiality / End-to-End Support); real `underline` decoration | checkLinks[] |
| On-time entry | PASS - `On-Time, Every Time` carries ZERO anchors - nothing link-like hides in it | onTimeEntry |
| Scope + wording guards | PASS - `main a[href='/about']` 0; rendered text contains none of `25+` / `Personal Attention` / `%` / best / leading / most trusted / 24/7; no stats strip; placeholder marks 0; `data-numeric` only on the 01-04 rail markers (typography convention) | aboutLinksInMain / wordingGuards / dataNumeric |
| Band | PASS - label `The next step`; primary decodes to `...book a consultation — via the website's why-choose-us page.` (booking + page attribution); quiet tel `Call the office · +91 98297 71396`; the float is the generic-prefill aria-label link (O-7b family, pre-existing) | band / waLinks |
| Skip link | PASS - first Tab = skip link (ink, 171x38 focused); Enter -> hash `#main`, scrollY 97 (below the sticky header), same-document URL, no `data-scroll-locked`; next Tab lands on `Read the fee answer` in main. Focus stays on the skip anchor after Enter (see O-8) | skipTab1 / skipEnter / skipAfterTab |
| Targets at 360 | PASS - band primary 320x44, band quiet tel 320x33, float 56x56 (fixed); check-links 165/253/189x20 pass 2.5.8 via the spacing exception (circle test below; O-5 family) | targets360 |
| 2.5.8 circle test | PASS - 19 small targets at 360px, ZERO intersections with every other visible target | circleTest |
| Reduced motion | PASS - 0 running animations after load + scroll; float `animation-name: none`, transition `1e-05s`; head `.reveal-in` collapses to `opacity 1` / `transform none` | reducedMotion |
| Reflow at 320 | PASS - `scrollWidth` 320 = viewport; widest node = `html` itself | reflow320 |
### /testimonials - PASS

| Check | Result | Evidence |
|---|---|---|
| Landmarks + band | PASS - landmarks 1 each; exactly one `.act-band` | landmarks / actBandCount |
| h1 + heading order | PASS - one h1 `Real client words — published with permission, and not before.`; h2 `Client words` / `The proof that exists today` / `The signed page` -> h3 `Parbhati Lal Sharma` -> band h2 `While this page waits, your questions get answered — ask us directly.` -> footer (residual unchanged) | headings[] |
| Placeholder mark | PASS - exactly 1 `.placeholder-mark`: a real visible `<p>`, `[PLACEHOLDER — AWAITING REAL TESTIMONIAL FROM OWNER]` - text carries the meaning, not colour alone; computed colour `rgb(133, 78, 36)` = `--brass-ink` (6.25:1 on paper, tokens S1) | placeholderMarks |
| No invented testimonials | PASS - guard names `Rajesh Verma` / `Sunita Malhotra` / `Amit Khanna` / `Priya Nair` absent from rendered text AND from the RSC/HTML payload | inventedNames |
| Honesty guards | PASS - rendered text contains no `sample` / `preview` / `coming soon` / `be among the first` / star words | honestyGuards |
| No stars, no carousel | PASS - 0 rating aria-labels, 0 star glyphs, 0 `svg`/`canvas`/`img` in main; 0 `aria-roledescription`, 0 carousel/slider classes (the single `[class*='star']` DOM hit = header CTA class substring, see S2) | stars / carousel |
| Collection link | PASS - accessible name == visible text (`If this office has handled your file and you'd be willing to be quoted, say so on WhatsApp — your permission decides what appears.`); decoded prefill `...I have a question.` = the QUESTION form (S0.1 prefill map); 319x104 at 360 (wraps, >= 24 tall) | collectionLink / targets360 |
| Record line | PASS - `p.rail-label` `Since 2001 · 25+ Years in Practice in Jaisalmer` with `data-numeric="true"` - the one honest stat, /about tile precedent; the sibling role line carries the same marker | recordLine |
| Proof links | PASS - exactly 3 in-main proof links: `The principal` -> /about, `How we work` -> /why-choose-us, `Straight answers` -> /faq; all names == visible text | proofLinks |
| Signed page | PASS - h3 `Parbhati Lal Sharma` + `p` role line `Principal Consultant · Jaisalmer · Since 2001`; `em` 0, `i` 0, `svg` 0, `canvas` 0, `img` 0 in main; `font-style: normal` - no italic impersonation, no drawn signature | signed |
| Band | PASS - primary decodes to `...book a consultation — via the website's testimonials page.` (page attribution); quiet tel; float aria-label link (O-7b family) | band / waLinks |
| Skip link | PASS - first Tab = skip (ink, 171x38 focused); Enter -> `#main`, scrollY 97, same-document URL; next Tab lands on the collection link in main | skipTab1 / skipEnter / skipAfterTab |
| Targets + circle at 360 | PASS - band 320x44 / 320x33, float 56x56, collection 319x104, proof links 105/109/135x20 (spacing exception, O-5 family); 19 small targets, ZERO circle intersections | targets360 / circleTest |
| Reduced motion + reflow | PASS - 0 running animations; float none / `1e-05s`; `.reveal-in` collapses; `scrollWidth` 320 = viewport | reducedMotion / reflow320 |
## 4. Cross-route checks

- **Landmarks + skip link: PASS x2.** Per-route detail above; both probes
  match the Stage B/C baseline exactly (hash `#main`, 97px scroll below the
  sticky header, same-document URL, next Tab inside main).
- **Heading order: PASS x2** (one h1 each; logical nesting; the footer
  sr-only h2 pattern is the known residual, unchanged).
- **Focus system: identical to the B/C baseline.** Settled values match every
  Stage B/C page; the ink group is now exactly `.act-band` + `.bg-primary`
  on both routes and no retired-class member paints anything; no double
  indicators anywhere.
- **O-7(b) band/float duplicate-name AAA family: present as shipped** on both
  routes - pre-existing cross-route; referenced here, not re-reported.
- **Float fixed-position non-issue** (documented Stage B): unchanged, not
  re-reported.
- **`skipEnter` reads `ae: "a"` on both Stage D routes** vs `body` in Stage
  C's runs - after Enter on the skip link, focus parks on the skip anchor
  itself; scroll and next-Tab behaviour verified correct either way. Logged
  as O-8, not a failure.
- **Dev `nextjs-portal`** appears at the end of both walks (dev-mode
  artifact, excluded from counts, as in B/C).

## 5. Findings

**F1..Fn: none.** No WCAG 2.2 AA failure on either route - axe 0 x2 and every
manual check passed. All three anomalies in the raw walk data were resolved
to ground truth: the `Open menu` immediate read = the Stage B ink->brass
transition-timing artifact (settled brass on both routes); the two shadows
per route = O-2's resting shadow + the tokens-allowed float elevation; the
single `[class*='star']` hit = a class-substring false positive on the
header CTA (`inline-start` utility).

## 6. Observations (advisory, non-blocking - prescriptions only, no edits made)

| # | Observation | Criterion | Where | Prescription |
|---|---|---|---|---|
| O-8 | After activating the skip link with Enter, focus remains on the skip anchor (`document.activeElement` = the `a`) on both Stage D routes, where Stage C's runs parked it on `body`. Scroll target, next-Tab destination and axe status are all clean either way. | n/a (informational) | skip link in `site/app/layout.tsx` (~L70) | No action required. If the studio wants deterministic focus parking, `.focus()` the `#main` container (add `tabindex="-1"`) inside the skip handler; no visual change. |
| O-9 | The /testimonials honesty placeholder renders in `--brass-ink` at 6.25:1 on paper - AA-passing with headroom, below the AAA 7:1 bar. Interim content by design (tokens S1 lists "placeholder markers" as the token's job). | 1.4.6 (AAA, informational) | testimonials placeholder `<p>` | No action while content is interim. If the studio ever targets AAA on this page, darken the placeholder ink one step. Art-director's call. |

## 7. Verdicts

- **/why-choose-us - clean** (axe 0; manifesto h1 verbatim; four numbered
  entries with plain-text markers; 3 named check-links with h3 context;
  on-time entry anchor-free; no stats strip; settled-correct focus on both
  surface kinds under the new ink group; targets + circle test pass; reduced
  motion + reflow pass; no findings).
- **/testimonials - clean** (axe 0; one real-text placeholder mark; no
  invented names; question-prefill collection link; `data-numeric` record
  line; named proof links; signed page free of italic and drawn signature;
  no stars or carousel; targets + circle test pass; reduced motion + reflow
  pass; no findings).

Evidence in this folder, Stage D: `axe-why.json`, `axe-testimonials.json`,
`stage-d-manual.json` (patched re-run - both routes complete),
`stage-d-walk.json` (fresh-load walk re-run), screenshots
`why-choose-us-{1280-full,360-full,focus-skip,focus-menu,focus-band,focus-check}.png`
and
`testimonials-{1280-full,360-full,focus-skip,focus-menu,focus-band,focus-collection}.png`.
Scripts (temp dir, read-only): `%TEMP%\opencode\a11y-phase3d-manual.mjs`
(run 1 + patch; built from `stage-d-p1..p4.tmp` via `stage-d-concat.cjs`,
patched by `stage-d-patch.cjs`), `%TEMP%\opencode\a11y-phase3d-walk.mjs`
(walk re-run), `%TEMP%\opencode\stage-d-star.cjs` (star-probe resolution).
