# Wording spec — polish pass (Tasks 1, 2, 3, 7, 11)

> **Status:** implementation spec of record for the wording polish pass. **Author:** ux-strategist · 17 Nov 2026.
> **Consumer:** the frontend-engineer implements every row **1:1** — exact strings, no rewording, no "improvements" beyond this file. The critic reviews against this file.
> **Branch:** `polish-pass`. Source verified against `site/` at time of writing (line refs given per row).
> **HARD RULE (binds every row):** no invented qualifications, awards, statistics, client counts, memberships, or years beyond 2001. If a proposed string would assert a fact not already on the site or in owner config, it must not ship.
> **Tests:** many pinned strings live in `site/tests/e2e/*.spec.ts`. Every row marked 🔒 in the Note column requires a lockstep test edit by the qa-engineer (full list in §7).

**Canonical CTA table (unchanged — enforced in §6):**
header link `Book a consultation` → `/book` · band primary `Book a consultation on WhatsApp` · `/book` submit `Open WhatsApp with my request` · phone links `Call the office · {number}` · question-prefill exceptions on `/faq` (head ask link) and `/contact` (desk WhatsApp), prefill `I have a question.`

**Names rule (enforced in §3.5):** formal **"P.L. Sharma And Company"** in meta titles/descriptions, header/footer identity, footer copyright, WhatsApp prefills, booking message, any JSON-LD. Short **"P.L. Sharma & Co."** in page-head rail-labels only.

---

## 1 · T1 — Hero bio (owner paragraph, facts locked)

### 1.1 Fact lock-list — these fragments are frozen, from the owner's paragraph

1. "in Jaisalmer since 2001"
2. "a return to file, a GST registration, a notice that needs a reply"
3. "He handles each case himself"
4. "agrees the fee before work begins"
5. "keeps your papers confidential"
6. "The first consultation is free."
7. Named person: "Parbhati Lal Sharma"

### 1.2 Final bio copy

| Page/Component | Current string (verbatim) | Proposed string | Task # | Note |
|---|---|---|---|---|
| `/` hero, left column under the CTA pair (`site/app/page.tsx` L78–83) | `You speak to the principal himself, not a call centre.` **and** `The first consultation is free.` (two `<p>` elements) | `Parbhati Lal Sharma has run his tax practice in Jaisalmer since 2001. Individuals and businesses come to him with the everyday work of Indian tax: a return to file, a GST registration, a notice that needs a reply. He handles each case himself, agrees the fee before work begins, and keeps your papers confidential. The first consultation is free.` | 1 | One paragraph replaces both lines. **Single deviation from owner text:** "questions" → "work" (a return to file is not a question; "work" is the site's house word, cf. Home §01 lead) — flag for owner sign-off, revert cell is the owner's verbatim otherwise. The removed `The first consultation is free.` survives **inside** the bio, so Home keeps the sentence exactly once and §0.6's three-placement rule holds (Home fold / `/about` §02 / `/faq` fee answer). Engineer: render the name segment from `team[0].name` (string renders identically); `alt=""` plate unchanged. |

### 1.3 Caption move — founder name + title BELOW the photo

Current placement is **above** the photo on both plates. Verified in source.

| Page/Component | Current string (verbatim, rendered) | Proposed string | Task # | Note |
|---|---|---|---|---|
| `/` founder plate (`page.tsx` L94–97, rendered via `{founder.name}`) | `Parbhati Lal Sharma` then `Principal Consultant · Jaisalmer · Since 2001` — both **above** the `<Image>` | Same two lines, **below** the image, second line trimmed to `Principal Consultant · Jaisalmer` | 1 + 3 | New plate order: image → name line → title line → hairline. "· Since 2001" is dropped here (§3.4 census: the T2 band becomes Home's one 2001 line). Name stays inside the `<Link href="/about">`, so the accessible name still contains "Parbhati Lal Sharma" (home.spec L82–84 keeps passing). |
| `/about` founder plate (`about/page.tsx` L54–56) | Three rows **above** the image: `Parbhati Lal Sharma` / `Principal Consultant · Jaisalmer` / `Since 2001` | Two rows **below** the image: `Parbhati Lal Sharma` / `Principal Consultant · Jaisalmer` | 1 + 3 | Same move for consistency; the `Since 2001` row is deleted (the h1 and the §01 record line carry the fact; §3.4 census). Figure keeps `alt=""` and the hairline closes the plate. |

---

## 2 · T2 — "The record" fact band (Home §03)

### 2.1 The band being replaced (found: Home §03, `page.tsx` L169–178)

| Page/Component | Current string (verbatim, rendered) | Proposed | Task # | Note |
|---|---|---|---|---|
| `/` §03 (`page.tsx` L173–176) | `Since 2001 — 25+ Years in Practice in Jaisalmer` (single `h2` line) | Replaced by the five-item band below | 2 | This is the owner's "single-line band". The rail-label `§ 03 · The record` (L171) is unchanged. |

### 2.2 New band — these five items ONLY, in this order

1. `Since 2001`
2. `{site.copyrightYear - site.establishedYear} years in practice` — renders `25 years in practice` today
3. `Mon–Sat 10:00–7:00`
4. `First consultation free`
5. `Office in Jaisalmer`

| Page/Component | Current string | Proposed string | Task # | Note |
|---|---|---|---|---|
| `/` §03 heading | *(no separate h2 — the stat line was the h2)* | `The record` (h2) | 2 | Restores the section-heading pattern every other section uses (rail `§ 03 · The record` + h2 `The record`, like `/about`'s `§ 01 · The practice` + `The practice`). Structure, not a new fact. |
| `/` §03 items | — | The five strings above as the section's content, no periods, sentence case | 2 | 🔒 `home.spec.ts` L87–104 ("the one owner-confirmed stat tile") must be rewritten for five items. |

**Engineer notes (binding):**
- **N is computed, never hard-coded:** `site.copyrightYear - site.establishedYear` (= 25 today). `new Date()` at prerender is forbidden in this Next version's Cache Components (same constraint already handled in `booking-form.tsx` via `useSyncExternalStore`), so derive from `copyrightYear`, which `site-config.ts` L20 says is updated each January. Recommended: add `export const yearsInPractice = site.copyrightYear - site.establishedYear;` to `site-config.ts` after `site` and use it in the band.
- **Hours display string is final: `Mon–Sat 10:00–7:00`** — an abbreviation of `site.hours[0]` ("Monday – Saturday" / "10:00 AM – 7:00 PM"). Ship it as a constant with a `// keep in sync with site.hours[0]` comment; `/contact` and `/book` keep rendering config verbatim. Do not string-munge config at render time.
- **`First consultation free`** is the noun-form fact, not the canonical sentence — the §0.6 sentence count is unchanged (bio on Home, `/about` §02, `/faq` fee answer).
- `stats[0]` ("Since 2001" / "25+ Years in Practice in Jaisalmer") stays untouched in config — the "+" form is evergreen-true and still renders on `/about` §01 and `/testimonials` §02.
- Apply `data-numeric` to the numeric items (`Since 2001`, the years item, the hours item); exact set is engineer/art's call — the "exactly one numeric marker" assertion dies with the test rewrite.

---

## 3 · T3 — Wording replacements

### 3.1 Renames

| Page/Component | Current string (verbatim) | Proposed string | Task # | Note |
|---|---|---|---|---|
| `/testimonials` §02 rail-label (`testimonials/page.tsx` L91) | `§ 02 · The proof that exists today` | `§ 02 · Our record` | 3 | 🔒 `testimonials.spec.ts` L90. |
| `/testimonials` §02 h2 (L93) | `The proof that exists today` | `Our record` | 3 | Same rename, heading level. |
| `/testimonials` §03 rail-label (L125) | `§ 03 · The signed page` | `§ 03 · Meet the principal` | 3 | 🔒 `testimonials.spec.ts` L106. |
| `/testimonials` §03 h2 (L127) | `The signed page` | `Meet the principal` | 3 | Says what the visitor does; drops the signature fiction (no scan exists — nothing signed is claimed). |
| `/testimonials` meta description (L8) | `…nothing is invented. The proof that exists today: P.L. Sharma And Company has practised in Jaisalmer since 2001.` | `…nothing is invented. Our record: P.L. Sharma And Company has practised in Jaisalmer since 2001.` | 3 | Third occurrence of the old phrase — meta must follow the rename. |

### 3.2 Deletion — every occurrence of "and where to check each" (all 3 located)

| Page/Component | Current string (verbatim) | Proposed string | Task # | Note |
|---|---|---|---|---|
| `/why-choose-us` lead (`why-choose-us/page.tsx` L71–73) | `Four things you can hold us to — and where to check each.` | `Four things you can hold us to.` | 3 | The three check-links under entries 01/03/04 are self-evident; the clause promised what the page already does. 🔒 `why-choose-us.spec.ts` L54. |
| `/why-choose-us` meta description (L8) | `Fees agreed before work begins. Deadlines kept. Your papers stay confidential. Four things you can hold P.L. Sharma And Company to — and where to check each.` | `Fees agreed before work begins. Deadlines kept. Your papers stay confidential. Four things you can hold P.L. Sharma And Company to.` | 3 | Same deletion, meta copy. |
| `site/tests/e2e/why-choose-us.spec.ts` L54 | pins the old lead string | pin the new lead string | 3 | qa-engineer lockstep (§7). |

### 3.3 One-line descriptions for the three `/testimonials` §02 proof links

Labels unchanged (`The principal` / `How we work` / `Straight answers`; hrefs unchanged). Each gains one `text-meta` line beneath it, Home §05's preview pattern.

| Page/Component | Current string | Proposed string | Task # | Note |
|---|---|---|---|---|
| `/testimonials` §02, link → `/about` | *(no description)* | `Who does the work, and how the practice began.` | 3 | New line, no year (the record line directly above carries 2001 — one per page). |
| `/testimonials` §02, link → `/why-choose-us` | *(no description)* | `Four things you can hold us to.` | 3 | Deliberately the target page's own (post-T3) lead — the description is what that page says. |
| `/testimonials` §02, link → `/faq` | *(no description)* | `Documents, fees, notices — answered plainly.` | 3 | Echoes the `/faq` h1's trio. |

### 3.4 "Since 2001" census — every occurrence, and which survives (rule: at most one per page)

| # | Where | Verbatim (rendered) | Verdict | Task # | Note |
|---|---|---|---|---|---|
| 1 | `site-config.ts` L47 `stats[0].value` | `Since 2001` | **keep** | — | Config source; renders via the two record lines. |
| 2 | `/` hero rail-label (L50) | `… Jaisalmer · Since 2001` | **remove** `· Since 2001` → `P.L. Sharma & Co. · Tax Consultants & Financial Advisors · Jaisalmer` | 3 | 🔒 `home.spec.ts` L45 (drops the `Since` assertion). The T2 band becomes Home's one 2001 line. |
| 3 | `/` plate caption (L96) | `Principal Consultant · Jaisalmer · Since 2001` | **remove** `· Since 2001` | 3 | Folds into the T1 caption move (§1.3). |
| 4 | `/` §03 band (L174) | `Since 2001 — 25+ Years in Practice in Jaisalmer` | **replaced** by T2 band; band item 1 `Since 2001` = Home's **survivor** | 2 | See §2. |
| 5 | `/about` caption row (L56) | `Since 2001` | **remove** the row | 3 | Folds into the T1 caption move (§1.3). |
| 6 | `/about` §01 record line (L84–86) | `Since 2001 · 25+ Years in Practice in Jaisalmer` | **survives** — `/about`'s one | — | Fold-contract item 5 (page-specs §1). |
| 7 | `/about` h1 (L39) | `Parbhati Lal Sharma has practised in Jaisalmer since 2001.` | **keep** | — | Narrative sentence, not a fact line; required content per page-specs §1. Documented exception to the one-per-page rule. |
| 8 | `/testimonials` §02 record line (L95–97) | `Since 2001 · 25+ Years in Practice in Jaisalmer` | **survives** — `/testimonials`'s one | — | 🔒 pinned at `testimonials.spec.ts` L93 — unchanged, test stays green. |
| 9 | `/testimonials` §03 role line (L130–132) | `Principal Consultant · Jaisalmer · Since 2001` | **remove** `· Since 2001` → `Principal Consultant · Jaisalmer` | 3 | 🔒 `testimonials.spec.ts` L110. |
| 10 | Footer blurb (`footer.tsx` L20–24) | `…serving individuals and businesses since 2001.` | **remove** (see §5.1) | 11 | Global chrome would double the fact on Home, `/about`, `/testimonials`. |
| 11 | Meta descriptions (`/about`, `/testimonials`) | `…since 2001.` | **keep** | — | Search text, never rendered as an on-page line. |

### 3.5 Names consistency sweep — which form where (no drift found in identity surfaces; one rejection)

| Surface | Current form | Verdict | Task # | Note |
|---|---|---|---|---|
| Meta titles (template `%s \| P.L. Sharma And Company`, `layout.tsx` L34–36) | formal | **keep** | — | Every route title renders `<page> \| P.L. Sharma And Company`. |
| `/book` meta title (`book/page.tsx` L6) | `Book a consultation` | **keep — REJECT critic F2** | — | F2 proposed `Book a consultation — {site.shortName}`; that would create a second title pattern and double the name with the template suffix. One pattern site-wide wins. Log in DECISION_LOG. |
| Meta descriptions (all routes, via `site.name`) | formal | **keep** | — | Includes `/book` L8 and `/faq` L8. |
| Header logo (`header.tsx` L31) + footer logo/copyright (`footer.tsx` L18, L105) | formal | **keep** | — | `© 2026 P.L. Sharma And Company.` stays. |
| Page-head rail-labels (all routes, via `site.shortName`) | short | **keep** | — | The sanctioned two-form system: formal = identity, short = running furniture. |
| WhatsApp prefills (per-page `whatsappHref`/`questionHref`) + booking message (`booking.ts` L31) | formal | **keep** | — | `Hello P.L. Sharma And Company, …` everywhere; do not shorten in messages. |
| JSON-LD (`/faq` FAQPage block) | no firm name present | **nothing to fix** | — | If an Organization block is ever added, formal name. |
| `/book` head rail-label (`book/page.tsx` L24) | `{shortName} · Book · Jaisalmer` | **already correct** | — | Critic book F1 is already fixed in source; no action. |

### 3.6 Jargon / repetition sweep — agent-speak and corporate filler out, brand voice stays

| Page/Component | Current string (verbatim) | Proposed string | Task # | Note |
|---|---|---|---|---|
| `/services` quiet link after the list (`services/page.tsx` L103–105) | `Questions about documents, fees or notices — the common questions` | `Documents, fees, notices — the common questions` | 3 | Kills the "Questions…questions" stutter; matches the `/faq` h1 trio. 🔒 `services.spec.ts` L113. |
| `/faq` head ask link (`faq/page.tsx` L131–133) | `A question that isn't here? Send it — a person replies.` | `Something else on your mind? Send it — a person replies.` | 3 | Repetition fix: the band sentence (`A question we haven't answered? Send it — a person replies.`) is 90% identical on the same page. Band stays as page-specs §5 wrote it; the smaller surface yields. Prefill stays `I have a question.` 🔒 faq head-link assertion. |
| `site-config.ts` L22 `site.description` | `P.L. Sharma And Company is a trusted tax consultancy offering income tax filing, GST compliance, audits and business registration services to individuals and businesses.` | `P.L. Sharma And Company is a tax consultancy in Jaisalmer offering income tax filing, GST compliance, audits and business registration services to individuals and businesses.` | 3 | Config edit (also feeds openGraph). "trusted" is a self-claim (costume, §2.4 family); "in Jaisalmer" is the honest local modifier. |
| `site-config.ts` L112 `whyChooseUs[2].description` | `Clear, agreed-upon fees before work begins. No hidden charges, no surprises.` | `Clear, agreed fees before work begins. No hidden charges, no surprises.` | 3 | Config edit — renders on Home §02 entry 01. "agreed-upon" is the one corporate filler word in an otherwise plain claim. Owner copy: flag for sign-off. |
| `site-config.ts` L117–118 `whyChooseUs[3].description` | `Strict deadlines discipline — returns and filings are completed well before due dates.` | `Returns and filings are completed well before their due dates.` | 3 | Config edit — renders on Home §02 entry 02. "Strict deadlines discipline" is broken agent-speak; the surviving sentence is exactly what `/why-choose-us` entry 02 already says (the two renderings become identical — intended). |
| `/why-choose-us` entry 01 body (`why-choose-us/page.tsx` L35) | `Clear, agreed-upon fees before work begins — no hidden charges, no surprises.` | `Clear, agreed fees before work begins — no hidden charges, no surprises.` | 3 | Local tighten, mirrors the config fix. 🔒 `why-choose-us.spec.ts` L76. |
| `/book` booking-form message label (`booking-form.tsx` L251–253) | `Briefly describe your requirement (optional)` | `What you need help with (optional)` | 3 | "requirement" is the one corporate word on the conversion surface. Label only; `htmlFor="message"` and the placeholder are untouched. |
| `/about` §01 story (`about/page.tsx` L87–93) | `The office opened in Jaisalmer in 2001 and has been here since. The work is the everyday work of a tax office: income tax returns and notices, GST registration and returns, audits, business registrations, tax planning, TDS and bookkeeping.` | `The work is the everyday work of a tax office: income tax returns and notices, GST registration and returns, audits, business registrations, tax planning, TDS and bookkeeping.` | 3 | Repetition fix: sentence 1 restated 2001 immediately under the record line and under an h1 that already says it. The work-list sentence carries the entry. |

**Reviewed and deliberately kept (brand voice / already plain — do not touch):** "recognition layer" and "ledger" appear only in code comments, never rendered — keep; `A way of working` + `Four things you can hold us to.` (Home §02 — an intentional preview echo of `/why-choose-us`, which become identical leads after §3.2 — accepted, log); `The next step` (every band); `answered the way we'd answer across the desk` (`/faq`); `reach the same desk` (`/contact`); `Nothing here is invented` family; `Send another request` and `Or send by email instead` (`/book`, §7-canon); `Open in Google Maps`; `Professional secrecy is the foundation of our practice` and `we stay with you through the whole process` (config `whyChooseUs[4]`/`[5]`); `Service Needed` and all other form labels; service titles/descriptions/points (owner-verbatim, page-specs §2).

---

## 4 · T7 — Testimonials copy (`/testimonials`, zero confirmed)

| Page/Component | Current string (verbatim) | Proposed string | Task # | Note |
|---|---|---|---|---|
| §01 placeholder mark (L67–69) | `[PLACEHOLDER — AWAITING REAL TESTIMONIAL FROM OWNER]` | *(unchanged)* | 7 | The designed gap stays the content. 🔒 pinned (`home.spec` L149–150 family, `testimonials.spec` L63) — untouched, tests stay green. |
| §01 note (L70–75) | `A quote appears here only after a real client has read it and agreed to be named. Until then the entry stays empty on purpose — this page publishes only what the firm can stand behind.` | *(unchanged — confirmed as final)* | 7 | Already ≤3 sentences, plain, honest. No edit. |
| §01 CTA (L76–81) | `If this office has handled your file and you'd be willing to be quoted, say so on WhatsApp — your permission decides what appears.` | `A quote to share? Send it — your permission decides what appears.` | 7 | The page's ONE in-content CTA, now CTA-shaped. Prefill **unchanged**: `Hello P.L. Sharma And Company, I have a question.` — this extends the question-prefill exception list to `/testimonials` (same logic as `/faq` + `/contact`: offering a quote is not a booking). Flag to Orchestrator to log the canon extension. 🔒 `testimonials.spec.ts` L77–84. |
| **Reserved — when real quotes exist:** page-level note under the quotes | — | `Shared with the client's permission.` | 7 | The mandated string, sentence-cased per §0.6. Ship nothing now; this is the standing note the rebuilt page uses when the owner's real quotes arrive. |
| **Reserved — when real quotes exist:** lead replacement | `This page stays empty until real clients agree to be quoted. Nothing here is invented.` | `Real client words, each shared with the client's permission.` | 7 | Only when quotes render; the h1 `Real client words — published with permission, and not before.` stays either way. |
| **Preview mode only — intro line for the sample list** | — | `Sample entries for preview only — not real client words.` | 7 | Renders **only** in preview/dev builds, never in production HTML — `testimonials.spec.ts` L118–126 forbids `/sample|preview/i` in the production body. The `testimonials[]` config array remains the owner's editing surface and still never renders on production (invented-data wall). |

---

## 5 · T11 — Footer + duplicates

### 5.1 Footer (`site/components/site/footer.tsx`)

| Page/Component | Current string (verbatim) | Proposed string | Task # | Note |
|---|---|---|---|---|
| Services column (L54) | `services.slice(0, 5)` — renders 5 of 6 titles | All 6, exactly as in config `services[]`, in config order: `Income Tax & ITR Filing` · `GST Registration & Compliance` · `Audit & Assurance` · `Business Registration & Licensing` · `Tax Planning & Advisory` · `TDS, Payroll & Bookkeeping` | 11 | Remove `.slice(0, 5)`; titles must byte-match config (they already do — the loop is correct, the slice is the only defect). All links → `/services`. |
| About blurb (L20–24) | `Trusted tax consultancy serving individuals and businesses since 2001. Accurate filing, honest advice, complete confidentiality.` | `Tax consultancy serving individuals and businesses in Jaisalmer. Accurate filing, honest advice, complete confidentiality.` | 11 | Drops the self-claim "Trusted" and the chrome "since 2001" (would double the fact on Home, `/about`, `/testimonials` — §3.4 row 10); adds the place. |
| Hours rows (L92–96) | `Mon to Sat: 10:00 AM to 7:00 PM` / `Sunday: Closed` (hard-coded) | Render from config: `Monday – Saturday · 10:00 AM – 7:00 PM` / `Sunday · Closed` | 11 | Ends the format drift with `/contact` + `/book` (which render `site.hours` verbatim). Same `{days} · {time}` composition those pages use. |
| Bottom descriptor (L107) | `Income Tax, GST, Audit and Business Registration` | *(unchanged)* | 11 | Reviewed: compact furniture line; not worth churn. |
| Copyright (L105) | `© 2026 P.L. Sharma And Company.` | *(unchanged)* | 11 | Formal name, correct. |

### 5.2 Duplicates across pages — keep/remove verdicts

| Duplicate | Where | Verdict | Task # | Note |
|---|---|---|---|---|
| Home §04 note ≈ `/testimonials` §01 note | `page.tsx` L189–193 vs `testimonials/page.tsx` L70–75 | **Home gets one sentence + a link; `/testimonials` keeps the full note** | 11 | Home: replace the two-sentence note with `Real client words will be published with the client's permission — until then this entry stays empty on purpose.` and add a quiet entry-link `How we handle client words` → `/testimonials` (the comparer's Home→proof path currently dead-ends). Mark + "§ 04 · Client words" + h2 `What clients say` unchanged. No test pins the Home note. |
| Hours stated twice on `/contact` | lead line (L57–60) + desk Hours rows (L116–122) | **keep both** | 11 | Summary (fold, searchable, omits Sunday) vs structured detail (config-sourced) is page anatomy, not costume. Desk rows already render from config. |
| Hours in `/book` meta description + "Prefer to talk first?" card | `book/page.tsx` L8 vs L62–68 | **keep both** | 11 | Meta is not rendered on-page; card is the one on-page statement. Both config-sourced. |
| Fee sentence `The first consultation is free.` | after T1: bio (Home fold) · `/about` §02 · `/faq` fee answer | **exactly 3 — compliant** | 1 | §0.6 rule holds post-polish; no action. |
| Fee-agreed promise family | `/why-choose-us` h1 + entry 01 · `/about` §02 · T1 bio (Home) | **keep** | — | One statement per page, each page's job; the h1→entry restatement on `/why-choose-us` is manifesto→detail by design. |
| Rail-label echo (`§ 01 · Services` + h2, etc.) — several sections use the identical rail/h2 string (e.g. `§ 05 · Common questions` / `Common questions`) | all routes | **keep** | — | The margin-rail echo is the system's section device (tiny furniture + content heading), consistent site-wide. Not a defect. |
| `Four things you can hold us to.` on Home §02 lead and `/why-choose-us` lead | two pages | **keep** | 3 | Intentional preview echo; after §3.2 they are identical — log once in DECISION_LOG. |
| Footer contact block ≈ `/contact` desk rows | global chrome | **keep** | — | Footer is navigation furniture; the desk is the page's answer. |

---

## 6 · CTA consistency audit — every CTA/link vs the canonical table

Result: **all canonical surfaces pass**; two deviations, both fixed below.

| Page | Surface | Current (verbatim) | Verdict | Fix (exact) | Task # |
|---|---|---|---|---|---|
| all | Header desktop + mobile-sheet button → `/book` | `Book a consultation` | ✅ canonical | — | — |
| all | Header strip `tel:` | `Call the office · {site.phone}` | ✅ | — | — |
| all | Header strip `mailto:` | `{site.email}` (quiet text) | ✅ | — | — |
| all | WhatsApp float | aria-label `Book a consultation on WhatsApp`, icon-only, unattributed prefill | ✅ | — | — |
| all | Footer quick link → `/book` | `Book a consultation` | ✅ | — | — |
| all | Footer `tel:` | `Call the office · {site.phone}` | ✅ | — | — |
| `/` | Hero primary (prefill `…home page.`) + band primary (same string) | `Book a consultation on WhatsApp` | ✅ | Two fill primaries on `/` is the shipped phase-2 Home precedent; wording canonical. | — |
| `/` | Hero + band quiet `tel:` | `Call the office · {site.phone}` | ✅ | — | — |
| `/` | §01 entry links ×6 → `/services` | `{service.title}` | ✅ | — | — |
| `/` | §05 FAQ links ×3 + `All common questions` → `/faq` | config questions / `All common questions` | ✅ | — | — |
| `/about` | Band primary/quiet; §01 link | canonical / `The work we handle` | ✅ | — | — |
| `/services` | Deep links ×6 → `/book?service=<title>` | `Book a consultation — the form opens with this service chosen.` | ✅ | Quiet entry-links reusing the canonical opening; `?service=` values byte-match `services[].title`. | — |
| `/services` | Band primary/quiet | canonical | ✅ | — | — |
| `/why-choose-us` | Check-links ×3 → `/faq` | `Read the fee answer` / `Read the confidentiality answer` / `Read the notice answer` | ✅ | Entry 02 correctly has none. | — |
| `/faq` | Head ask link | `A question that isn't here? Send it — a person replies.` (question prefill ✅ exception) | ✅ prefill / ✏️ wording | Text → `Something else on your mind? Send it — a person replies.` (§3.6 repetition fix); prefill unchanged. | 3 |
| `/faq` | Fee foot → `/book` | `Book the free first consultation` | ✅ | — | — |
| `/faq` | Notice foot → `/book` | `Send us the notice — start here` | ✅ | — | — |
| `/contact` | Desk `tel:` row | label `Call the office` + `{site.phone}` | ✅ | — | — |
| `/contact` | Desk WhatsApp row | `{site.phone}`, question prefill ✅ exception, aria `WhatsApp · {site.phone}` | ✅ | — | — |
| `/contact` | Maps link | `Open in Google Maps` | ✅ | — | — |
| `/testimonials` | §01 collection link | long sentence, question prefill | ✏️ deviation | Text → `A quote to share? Send it — your permission decides what appears.` (§4); prefill stays `I have a question.` — **extends the exception list to `/testimonials`; log it.** | 7 |
| `/testimonials` | §02 proof links ×3 | `The principal` / `How we work` / `Straight answers` | ✅ | + one-line descriptions (§3.3). | 3 |
| `/book` | Submit | `Open WhatsApp with my request` | ✅ | — | — |
| `/book` | SENT fallback `tel:` | `Call us directly at {site.phone}` | ❌ deviation | → `Call the office · {site.phone}` (canonical phone wording). Sentence reads `Didn't open? Call the office · {site.phone}`. 🔒 `booking-form.spec.ts` L79. | 6 |
| `/book` | SENT reset / mailto | `Send another request` / `Or send by email instead` | ✅ | — | — |
| `/book` | Act band | none shipped | ✅ | Sanctioned deviation (slip is the act surface). | — |

**Prefill map (do not touch):** per-page booking prefills `Hello {site.name}, I would like to book a consultation — via the website's <page> page.` on `/ · /about · /services · /faq · /contact · /why-choose-us · /testimonials`; float unattributed; question prefill `Hello {site.name}, I have a question.` on `/faq` head, `/contact` desk, `/testimonials` §01 (post-canonicalisation).

**Retired-wording sweep:** zero hits for `Book an Appointment` / `Book Appointment` / `Send Booking Request` / `Get started` / `appointment` in rendered copy or payloads (grep-verified; only negative test assertions contain them). Nothing to do.

---

## 7 · Test-lockstep list for the qa-engineer (changed strings pinned by tests)

1. `home.spec.ts` L45 — hero rail-label `Since` assertion → drop.
2. `home.spec.ts` L87–104 — one-stat-tile test → rewrite for the five-item band (§2).
3. `testimonials.spec.ts` L77–84 — collection-link text + prefill assertions → new text, prefill unchanged.
4. `testimonials.spec.ts` L90, L106, L110 — §02/§03 rail-labels, role line → new strings.
5. `why-choose-us.spec.ts` L54, L76 — lead, entry-01 body → new strings.
6. `services.spec.ts` L113 — quiet FAQ link → new string.
7. `faq.spec.ts` — head ask-link text assertion → new string (prefill assertion unchanged).
8. `booking-form.spec.ts` L79 — SENT `tel:` text → `Call the office · ${site.phone}`.
9. Sweep all e2e/unit specs for any other pinned string from this file before running the suite (grep-driven).

**Config edits flagged for owner sign-off (owner copy touched):** `site.description` (§3.6), `whyChooseUs[2].description`, `whyChooseUs[3].description` (§3.6), and the one-word bio change (§1.2).

---

## 8 · AMENDMENT (Orchestrator, 17 Nov) — T7 structure override

> The owner's TASK 7 keep-only list is implemented literally. The rows below amend this spec in place; §1–§7 stand except as amended here. The same rows are in the engineer's brief and logged in DECISION_LOG.

### 8.1 Removed on `/testimonials` — §02 and §03, production AND preview (only the sample list is preview-added)

| Spec row | Disposition | Note |
|---|---|---|
| §3.1 rows 1–4 (§02/§03 rail-label + h2 renames) | **MOOTED** | Both sections are removed entirely — there is nothing to rename. |
| §3.1 row 5 (meta rename) | **REPLACED** | By the new meta description in §8.2. |
| §3.3 (one-line descriptions for the three proof links) | **MOOTED** | The three proof links die with §02. |
| §3.4 rows 8–9 (record line survives / role line trims) | **MOOTED** | With §02/§03 gone, `/testimonials` renders no 2001 line on-page; the meta description carries the fact per census row 11's rule. |
| §4 rows | **STAND** | The §01 honesty reserve is the page: mark + note unchanged, CTA reworded with prefill unchanged. The reserved future strings and the preview-only sample line stand as written. |

### 8.2 Lean production page (`/testimonials`)

| Element | String / behavior | Task # | Note |
|---|---|---|---|
| Page head | rail-label `{site.shortName} · Testimonials · Jaisalmer` · h1 `Real client words — published with permission, and not before.` · lead `This page stays empty until real clients agree to be quoted. Nothing here is invented.` | 7 | Unchanged from current source. |
| §01 honesty reserve | `[PLACEHOLDER — AWAITING REAL TESTIMONIAL FROM OWNER]` + the §4 note (unchanged) + CTA `A quote to share? Send it — your permission decides what appears.` (prefill `Hello {site.name}, I have a question.`, unchanged) | 7 | The page's one CTA; §4's rows stand as written. |
| Metadata | add `robots: { index: false }`; description = `Real client words — published with permission, and not before. Nothing is invented: P.L. Sharma And Company has practised in Jaisalmer since 2001.` | 7 | New description replaces the §3.1 row-5 rename: mirrors the h1; carries the page's 2001 fact in meta only (census row 11's rule). Title stays `Client words — published with permission` (🔒 `testimonials.spec.ts` L149 unchanged). Keep the existing `alternates: { canonical: "/testimonials" }` export otherwise untouched. |
| Not named in any amendment row (act band, float, header, `§ 01` rail numbering) | — | — | Stand per §6/§0.3 (the lean enumeration names content sections, not constant surfaces); qa confirms against the built page. |

### 8.3 Home §04 — gated, not deleted from the spec

| Spec row | Disposition | Note |
|---|---|---|
| §5.2 row 1 (Home §04 note ≈ `/testimonials` §01 note) | **AMENDED** | Production: the whole §04 section is hidden — gated on `visibleTestimonials.length > 0` (no `§ 04 · Client words` rail marker, no h2 `What clients say`, no mark, no note in production HTML). Preview: the section renders with the §5.2 one-sentence note `Real client words will be published with the client's permission — until then this entry stays empty on purpose.` + the quiet link `How we handle client words` → `/testimonials`. |

### 8.4 Nav visibility

| Spec row | Disposition | Note |
|---|---|---|
| Header nav (`navLinks`) + footer quick-link list (renders `navLinks` today) | **AMENDED** | The `Testimonials` entry is hidden while `confirmedTestimonials.length === 0 && !showSampleContent`. Implementation: a new `visibleNavLinks` export in `site-config.ts`, derived from `navLinks`, consumed by header and footer; the export imports only the client-safe content-mode flag — `testimonials[]` sample data stays server-only and must never enter a client bundle. |

### 8.5 qa §7 impact

| Spec row | Disposition | Note |
|---|---|---|
| §7 items 3–4 | **SHRUNK** | `testimonials.spec.ts` L89–91, L106, L110 pins flip to ABSENCE assertions — the §02/§03 sections, their heading strings and the record/role lines must be absent from DOM and RSC payload in production AND preview; the §3.1 rename pins are deleted, not renamed. The §4 collection-CTA rows stand as written (text + prefill assertions); the L149 title pin is unchanged; qa adds a noindex assertion for the robots export. |
| `home.spec.ts` L48–58, L145–150 | **MODE-DEPENDENT** | Mechanical consequence of §8.3: in production the rail markers are 4 (§01/§02/§03/§05) and the Home placeholder-mark count is 0; in preview 5 markers + 1 mark. Assertions must read the content-mode flag. |

Amendment decided by the Orchestrator (DECISION_LOG 2026-11-17); rationale: owner instruction outranks ux retention; a Testimonials nav click must deliver testimonials or their honest absence.
