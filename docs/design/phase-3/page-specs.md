# Phase 3 — per-route page specs (The Kept Ledger)

> **Status:** spec of record for the six non-`/book` routes, plus the gaps §5.2 leaves open on `/book`.
> **Author:** ux-strategist · 15 Nov 2026. **Consumer:** the frontend-engineer rebuilds each route against this file; the critic reviews each route against it.
> **Inputs:** `STUDIO_CHARTER.md` (PAGE COMPLETION RULE, anti-generic rules) · `user-problem.md` §2–§5 (CTA table, prohibitions, journeys, availability) · `vibe-board.md` + `brand-personality.md` · `phase-2/tokens.md` (the primitives that actually ship) · `critic/phase-2-home-2026-11-15.md` (the consistency bar) · `site/lib/site-config.ts` + current `site/app/*/page.tsx` · `KNOWN_ISSUES.md` #15/#13/#1a/#2.
> **Boundary:** this file fixes **structure, priority and content sources only**. Visual treatment is tokens.md's lane. Every assumption is marked **ASSUMPTION** inline; blockers are consolidated in §10. `/book`'s §5.2 spec is not repeated — see §7 for gaps only.

---

## 0. Constants every rebuilt route inherits

### 0.1 The page head — `PageHero` retires

Every route opens with the same ruled head Home ships (`page.tsx` L47–59), inside one `.ledger-rail`:

1. `.rail-label` head line: `{site.shortName} · <page name> · Jaisalmer` — constant shape on all routes (a visitor crossing from `/services` to `/about` recognises the firm in under a second, brand-personality §6).
2. One `h1` — the page's one job stated as a plain sentence (per-route contracts below). Never a label-style "About Us". Exactly one `h1` per document.
3. One `text-lead` sentence under the `h1`.

**ASSUMPTION:** the generalised Home head is the approved page-head device for sub-pages; it replaces `PageHero` on every rebuilt route. `PageHero` is deleted when its last consumer (`/book`, Stage A) is rebuilt — no dead component.

### 0.2 Margin rail + § numbering

- Each content section is one `.ledger-rail` with a `.rail-label` of the form `§ 01 · <name>`; content in the second grid cell; body copy `.measure`.
- § numbering **restarts at `§ 01` on every page** (Home precedent). **ASSUMPTION:** per-page restart, not site-wide continuous numbering.
- Entry-level numbers (01, 02, …) render as small rail markers inside entries where specified — Home §05's FAQ-preview rows are the precedent; the section label and the entry markers are different devices and may both read "01" without confusion.
- Below 1024px the rail collapses to the inline marker — existing primitive behaviour, nothing extra to build.

### 0.3 CTA surfaces (user-problem §2.3 — unchanged everywhere)

- **Header** (all pages): "Book a consultation" → `/book`. **Float**: static, accessible name "Book a consultation on WhatsApp". Both already ship site-wide; nothing per-route changes them.
- **One fill CTA per viewport: the header's.** Body copy carries quiet links only (`.btn-quiet`, or the entry-link underline Home uses). The page's one in-content fill button is the end-of-page `.act-band` primary. No page ever stacks two fill buttons in one viewport.
- **The act band closes every route** (exception: `/book`, see §7): one `.act-band` at the page end containing the rail-label "The next step" (`text-brass` on ink), one `h2` sentence (`max-w-[24ch]`, per-route wording below), `.btn-primary` "Book a consultation on WhatsApp" (page-aware `wa.me` link), `.btn-quiet` "Call the office · {site.phone}" (`tel:`). One band per page, never two, never stacked on the float.
- **Page-aware `wa.me` prefill** (measurement ground truth, user-problem §6): every page's booking WhatsApp links carry `Hello {site.name}, I would like to book a consultation — via the website's <page> page.` — Home's existing pattern, extended per route. **ASSUMPTION:** the owner accepts page attribution inside the prefill (already live on Home).
- Exception: `/contact`'s desk-card WhatsApp row keeps a *question* prefill ("…I have a question.") — a contact-page message is not always a booking.
- **Email stays a quiet text link everywhere**, never a fill button (§2.3 demotion).

### 0.4 Pending content — the `.placeholder-mark` convention

Only §5.3-pending items render as marks. Everything else is an owner-confirmed fact or a plain service description — there is no fourth category (brand-personality §4.7). Marks are designed gaps; **max one mark per page**, except where a whole section is pending (then one section-level mark, never one per row). Exact strings per route below.

### 0.5 Motion

One `<Reveal y={8}>` around the page head block only (Home precedent). **All section-level `Reveal` staggering dies** — the current pages' `(i % 3) * 0.06` delays are reveal-on-scroll repetition, forbidden by tokens.md §4. Content visible in HTML at rest.

### 0.6 Wording constants

- "The first consultation is free." — owner-confirmed (Phase 1 gate); the canonical sentence. It ships in exactly three places: Home fold (done), `/about` §02, `/faq` fee answer. An offer repeated on every page is costume.
- `tabular-nums` (`data-numeric`) on years, dates, § numbers; sentence case; Indian English; no exclamation marks; no "solutions / empower / seamless / journey / unlock / leverage".
- **Fraunces italic does not exist in the shipped system** (tokens.md §2 — italic master removed for payload). Where brand-personality M2/M3 say "italic" (founder aside, signed page), render in the regular faces. No italic ships in Phase 3.

---

## 1. `/about` — Believe

**One job:** make the firm a person — the principal is real, 25 years in Jaisalmer, answers personally.
**Journey:** the trust-spine page. Journey A step 2 ("is he real?" after Home) and Journey B step 3 ("won't vanish when a notice comes", after `/why-choose-us`).
**The click it must earn:** → `/book` (Journey A's convinced step). Secondary earned click: → `/services` ("do they do my case?").

### Fold contract (mobile 360–430px, first ~2 screens) — priority order, nothing else beside them

1. Rail-label head line (§0.1).
2. `h1` naming person + place + years. Required content: founder name, Jaisalmer, since 2001. Candidate: **"Parbhati Lal Sharma has practised in Jaisalmer since 2001."**
3. One lead sentence: what dealing with him is like — "You speak to the principal himself — the person who does the work." (Home's proof line, restated on the page that proves it.)
4. The founder plate in the fold's lower half: 4:5 square-cornered plate, caption rows name / "Principal Consultant · Jaisalmer" / "Since 2001" (`.rail-label`). Uses the processed `founder-plate.webp` asset (tokens.md §7) — **never raw `father.jpg`**, no arch, no circle. **ASSUMPTION:** the owner-approved interim crop extends from the Home hero to the `/about` plate; reshoot #1a replaces both when it arrives.
5. The record line — `Since 2001 · 25+ Years in Practice in Jaisalmer` — as §01's first entry, at the fold's edge on 360px.

Deliberately below the fold: the story copy, the team, the band.

### Ledger section inventory

- **Head** (unnumbered): rail + `h1` + lead (§0.1).
- **§01 · The practice** — one `.ruled-entry`: the record line (the one honest stat, same words as Home §03 — one fact repeated in two places is consistency; **no other number may join it anywhere**) + 2–3 sentences of confirmed story only (see content source). One entry. No icon, no timeline.
- **§02 · The principal** — founder plate (if composition places it here rather than in the fold, the fold contract still holds) + the personal-handling copy: the first conversation is about understanding your case · the fee is agreed before work begins · "The first consultation is free." Margin-rail note: one `.placeholder-mark` — `[PLACEHOLDER — A LINE FROM THE PRINCIPAL HIMSELF, AWAITING OWNER]`. This is the page's single designed gap (M2's founder aside, honest until supplied).
- **§03 · The team** — four entries: founder (name + "Founder & Principal Consultant"); **Vikram Singh Soda, Bhawani, Hemraj as name-only rows** — no roles, no bios, no photo plates; one section-level `.placeholder-mark`: `[PLACEHOLDER — TEAM PHOTOS AND CONFIRMED ROLES, AWAITING OWNER]`.
- **Act-band close:** sentence "Ask him directly — send your name and what you need on WhatsApp." + canonical primary + quiet phone.

### Content source of truth

| Content | Source | Renders as |
|---|---|---|
| Founder name, role, since 2001, 25+ years | `site`, `team[0]`, `stats[0]` | facts |
| Founder photo | processed `founder-plate.webp` (tokens.md §7) | fact — interim asset, #1a |
| Practice-scope sentence | derived from `services[].title` only | plain description |
| "You speak to the principal himself" | `whyChooseUs[1]` + owner gate | fact |
| Fee agreed upfront + free first consultation | §2.4-verified + owner gate | facts |
| Story beyond "founded 2001 in Jaisalmer, still here" | **NOT AVAILABLE** (PROJECT-NOTES pending) | omitted — a short true entry, **no mark, no invented milestones**. Decision: a short true entry beats a marked stub on the belief page. |
| Team names | `team[1..3].name` | facts |
| Team roles / bios | provisional interim copy (config comments) | **not rendered** — name-only + section mark (§5.3 allows name-only) |
| Team photos | pending (KNOWN_ISSUES #3) | not rendered (section mark covers) |
| Founder's own line (margin note) | pending | `.placeholder-mark` |

### CTA surface map

- Band (above) — the page's one act surface.
- Quiet links, exactly two page-wide: §01 foot → `/services` (label "The work we handle" — the entry-link underline pattern), feeding Journey A's A→S step. §02/§03 carry no links; the band does the ask.
- Header + float unchanged.

### Per-page do-not list

- No qualifications, degrees, memberships, badges — none exist (§2.4.3). Years + role + face only.
- No invented milestones or timeline rows ("2005 — first office" etc.).
- No stock faces; no avatar circles; **no initials-tiles standing in for people** — the current `AvatarFallback` initials die with this rebuild.
- No embellished story. The current interim copy ("grown from a one-man consultancy into a full-service firm") overstates — write only confirmed facts.
- No fee figures; the fee content is the process promise plus the owner-confirmed free-first sentence, nothing else.
- No second founder-photo treatment (arch, circle, duotone, `rounded-t-[999px]` — already forbidden by tokens).

### Open questions

- **Owner:** are the associates' roles (Senior Tax Associate / GST & Compliance Associate / Accounts & Bookkeeping Executive) confirmed facts? Until answered, name-only ships (decision above). Not a build blocker.
- **Owner (asset, not blocker):** founder reshoot #1a; signature scan (M3) would let §02 close with the real mark.
- **ASSUMPTION (inline):** interim plate approved for `/about`; §01 carries no placeholder mark; the founder-line margin note ships as a mark.

---

## 2. `/services` — Match

**One job:** the visitor finds their exact case, in their own vocabulary, in 10 seconds.
**Journey:** Journey A step 2 (ITR · capital gains · **NOTICES**) and Journey B step 1 (GST · GSTR · ITC · 44AB · TDS). Recognition is the trust trigger for the business audience.
**The click it must earn:** → `/book?service=<name>` (ready visitor, §2.3 deep links) or → `/faq` (question holder).

### Fold contract (mobile 360–430px, first ~2 screens) — priority order

1. Rail-label head line (§0.1).
2. `h1` naming both jobs plainly. Required content: income tax (plain form), GST, and the "your words" recognition frame. Candidate: **"Income tax, GST, audits, registration — the work, in your words."**
3. One lead sentence that names the deep-link mechanic honestly (§3.4): "Six kinds of work people bring to this office. Each entry opens the booking form with that service already chosen."
4. Entry 01 — *Income Tax & ITR Filing* — begins in the fold; its title and the opening of its description visible at 360px, the full entry within the first two screens. Entry 02 — *GST Registration & Compliance* — starts within the first two screens. **Both audiences must recognise their case without hunting.**

Deliberately below the fold: entries 03–06, the quiet FAQ link, the band.

### Ledger section inventory

- **Head** (unnumbered).
- **§01 · Services** — six numbered `.ruled-entry` rows, in `site-config` order (unchanged; individual-first then business, which is also the audience order). Each entry:
  1. rail-marker number (01–06, Home §05 pattern),
  2. `h3` = the exact `services[].title` (this string is also the deep-link value and the `/book` Select option — byte-identical, see §7.2),
  3. description from config, **verbatim** (it is already plain),
  4. the three `points[]` as the "—" list (Home's pattern),
  5. one quiet link row: "Book a consultation — the form opens with this service chosen." → `/book?service=<title>`,
  6. one exception carries "what to bring": entry 01 adds one `text-meta` line drawn from the FAQ documents answer — "Form 16, PAN and your investment proofs are usually enough to start — you get a checklist for your case." **No other entry invents a document list.**
- No second content section. The current "Not sure which service you need?" panel is deleted; its job moves into the band sentence.
- **Act-band close:** sentence "Not sure which service is yours? Send one line — we'll tell you honestly." + canonical primary + quiet phone. (Deep links are the ready path; the band is the not-sure path.)

### Content source of truth

- `services[]` verbatim — titles, descriptions, points. Owner content; do not editorialise, do not reorder, do not add or remove services.
- `faqs[1]` excerpt for entry 01's "what to bring" line only.
- **Placeholder content: none.** `/services` has zero pending content — with `/contact` it is one of the two fully-real pages on the site.

### CTA surface map

- Six deep links per §2.3 (`/book?service=<title>`), one per entry.
- One quiet link after the list, before the band: "Questions about documents, fees or notices — the common questions" → `/faq` (honours §4.1's earned S→F click without clutter).
- Band + header + float (§0.3).

### Per-page do-not list

- No fee figures, no "starting from ₹X" (§2.4.4) — the fee answer lives on `/faq`, in process words only.
- No invented counts per service ("500+ registrations filed").
- No icon tiles (icons are retired; the numbered rail replaces them).
- No deadline-burning urgency ("GST date tomorrow!") — fake urgency §2.4.2.
- No client-name drops (no permission exists).
- No "solutions", no reordering for marketing, no invented seventh service.

### Open questions

- None blocking. **ASSUMPTION (inline):** descriptions render verbatim; deep-link param value = exact service title; the entry-copy constraints above are studio decisions the critic reviews.

---

## 3. `/why-choose-us` — Reassure

**One job:** state the way of working, not adjectives — four things you can hold us to.
**Journey:** Journey B step 2, between `/services` and `/about` ("yeh sab naam se hi unke kaam ka lagta hai"). This is the burned-before buyer's page.
**The click it must earn:** → `/book`.

### Fold contract (mobile 360–430px, first ~2 screens) — priority order

1. Rail-label head line (§0.1).
2. `h1` **is the manifesto statement** — the page's one loud moment (brand-personality §6: one large statement + four ruled statements; the h1 *is* that statement, so no second giant statement repeats it). Required content: fee-agreed-upfront plus at least one more promise, ≤20 words. Candidate: **"Fees agreed before work begins. Deadlines kept. Your papers stay confidential."**
3. One lead sentence: "Four things you can hold us to — and where to check each."
4. Entry 01 — *Transparent pricing* — begins in the fold: title + one-sentence statement + its check-link.

Deliberately below the fold: entries 02–04, §02, the band.

### Ledger section inventory

- **Head** (manifesto `h1`).
- **§01 · The way of working** — four numbered `.ruled-entry` rows in config order, which is also the fear order (fee → deadline → shame → notice):
  1. Transparent pricing → check-link → `/faq` (the fee answer),
  2. On-time, every time → **no link** (a statement stands; a fake link is worse),
  3. Complete confidentiality → check-link → `/faq` (the confidentiality answer),
  4. End-to-end support → check-link → `/faq` (the notice answer).
  Each row: `h3` title (config), the config description tightened to one sentence, one quiet check-link where a real page answers it.
- **§02 · What this means for your case** — two short `.ruled-entry` rows, one per audience, translating the four promises into their case (plain description only, no new facts): salaried — "Your return filed before the deadline, the fee agreed first, your papers kept between us." · business — "The GST calendar kept for you, credits claimed properly, and if a notice comes we handle it through to the end."
- **Act-band close:** sentence "Hold us to all four — start with the first conversation." + canonical primary + quiet phone.

### Content source of truth

- `whyChooseUs[2..5]` — the same four Home §02 carries. **Deliberately the same claims**: the page adds the check-links and the per-audience translation; it must not re-add `25+ Years of Experience` or `Personal Attention` (they live on Home and `/about`; triple-saying is costume) and must **not render the current numbers strip** (`stats[]` — Home §03 owns the one stat).
- §02 rows: studio-written plain description (§3.1 allows); no new specifics beyond confirmed claims.

### CTA surface map

- Band (above). Three quiet check-links inside §01 (to `/faq`). Header + float unchanged. No link to `/about` needed — Journey B crosses there next; nav and footer already carry it.

### Per-page do-not list

- No superlatives ("best", "leading", "most trusted").
- No badge/award wall, no icon tiles.
- No invented percentages ("98% on time"), no counts of any kind.
- No comparison table against other consultants (no named competitor, no permission).
- No fee numbers; no "24/7" (untrue — hours are 10–7; the float reaches WhatsApp, not an on-call promise).
- No stat band; no second manifesto statement.

### Open questions

- None blocking. **ASSUMPTION (inline):** §02's translation copy is studio-written plain description; the critic reviews its restraint at round 1.

---

## 4. `/testimonials` — the honest reserve

**One job (today):** show how this firm handles proof — honestly empty, visibly designed.
**Journey weight:** **zero** (§4.1) until real quotes arrive. The header keeps the link (owner gate decision). No deep CTA is earned from this page — but it must never dead-end.
**The click it must earn:** none. Quiet links to the proof that exists.

### Fold contract (mobile 360–430px, first ~2 screens) — priority order

1. Rail-label head line (§0.1).
2. `h1` stating the policy without apologising. Required content: real words, permission, nothing invented. Candidate: **"Real client words — published with permission, and not before."**
3. One lead sentence: "This page stays empty until real clients agree to be quoted. Nothing here is invented."
4. The one `.placeholder-mark` entry, visible in the fold — the designed gap **is** the content.

Deliberately below the fold: §02, §03, the band.

### Ledger section inventory

- **Head** (unnumbered).
- **§01 · Client words** — one `.ruled-entry`: the mark `[PLACEHOLDER — AWAITING REAL TESTIMONIAL FROM OWNER]` + an honest explanatory sentence (Home §04's, adapted here, not duplicated verbatim) + the collection line: "If this office has handled your file and you'd be willing to be quoted, say so on WhatsApp — your permission decides what appears." (quiet `wa.me` link with the question prefill — gives the page a live function instead of emptiness).
- **§02 · The proof that exists today** — one short `.ruled-entry`: the record line (Since 2001 · 25+ years) + three quiet links: "The principal" → `/about` · "How we work" → `/why-choose-us` · "Straight answers" → `/faq`.
- **§03 · The signed page** (M3): a hairline, then the principal's name + "Principal Consultant · Jaisalmer · since 2001" — set in the regular faces (no italic ships, §0.6). Signature scan pending → name only; a signature is never drawn, traced or faked.
- **Act-band close:** sentence "While this page waits, your questions get answered — ask us directly." + canonical primary + quiet phone.

### Content source of truth

- `testimonials[]` in `site-config` is **invented sample data — it must not render**. The four names (Rajesh Verma, Sunita Malhotra, Amit Khanna, Priya Nair) must not appear in the page's rendered HTML or RSC payload (qa guard, §9). The engineer leaves the config array untouched (it is the owner's editing surface) but the page renders nothing from it.
- Everything on the page is placeholder + policy copy + `team[0]`/`site` facts for §02–§03.
- The current page's developer-note paragraph ("These are sample testimonials for preview…") is retired — the honesty is designed, not a code comment.

### CTA surface map

- Band (above). One quiet `wa.me` question link in §01. Three quiet proof links in §02. Header + float unchanged. **No booking deep links beyond the band** — the page carries no journey weight.

### Per-page do-not list

- No stars, no ratings — no star icon and no rating token exists in the system (§2.4.1; the current page's `Array.from({length: 5})` star rows die with this rebuild).
- No invented quotes, names, roles, avatars.
- No carousel, no slider.
- No fake counts ("be among the first"), no coming-soon countdown.
- No stock faces; no "sample/preview" framing that implies the quotes are real.

### Open questions

- **Owner (not blocker):** when real quotes arrive — initials vs full names vs firm names, and how permission is recorded. **ASSUMPTION (inline):** the page ships placeholder-only regardless of that answer.

---

## 5. `/faq` — remove the last objection

**One job:** answer documents, fees, notices — the questions standing between the visitor and the message.
**Journey:** the decisive moment (§4.2): `/faq` → `/book`. Both audiences. The fee answer converts fee-fear into a process promise; the notice answer converts shame into "don't panic, don't ignore it".
**The click it must earn:** → `/book` — via those two answers, not via buttons shouting.

### Fold contract (mobile 360–430px, first ~2 screens) — priority order

1. Rail-label head line (§0.1).
2. `h1` naming the trio. Required content: documents, fees, notices. Candidate: **"Documents, fees, notices — the questions, answered plainly."**
3. One lead sentence plus the ask-us line: "The things people ask before their first message — answered the way we'd answer across the desk." + quiet `wa.me` question link: "A question that isn't here? Send it — a person replies."
4. Entry 01 (documents) begins in the fold.

Deliberately below the fold: entries 02–07, the band.

### Ledger section inventory

- **Head** (unnumbered).
- **§01 · The first questions** — entries 01 *Which documents do I need?* (`faqs[1]`), 02 *What are your fees?* (`faqs[2]`), 03 *I got a tax notice. What now?* (`faqs[4]`) — **the decisive trio first**, reordered per §4.2.
- **§02 · Working with us** — 04 *Can consultations happen online?* (`faqs[3]`), 05 *How do I book a consultation?* (`faqs[0]`), 06 *Is my information confidential?* (`faqs[6]`).
- **§03 · For business clients** — 07 *Do you handle GST registration?* (`faqs[5]`).
- **Rendering: no accordion.** All seven answers always visible, each a numbered `.ruled-entry` (number in the rail marker, `h3` question, body answer). Accordion-as-decoration is forbidden, and hiding the fee answer behind a click is the exact opposite of this page's job. The current `Accordion` usage is retired with the page.
- **Act-band close:** sentence "A question we haven't answered? Send it — a person replies." + canonical primary + quiet phone.

### Content source of truth

- `faqs[]` **verbatim** — owner copy, already §2.4-compliant (the fee answer is process-only, no figures). Reordering is presentational.
- One appended sentence, owner-confirmed: the fee answer gains "The first consultation is free." as its final line — the strongest conversion copy the firm owns, sitting on the research path (§4.2).
- **Placeholder content: none.** All seven answers are real.

### CTA surface map

- Quiet links, sparse and earned: 02 fee answer foot → `/book` (carrying the offer sentence); 03 notice answer foot → `/book` (the notice answer's action is "bring or send it" — the slip is that act). No other answer carries a link.
- Band + header + float (§0.3). One quiet `wa.me` question link in the head (above).

### Per-page do-not list

- No legal tone ("pursuant", "herein", "the undersigned").
- No accordion; no collapsed answers.
- No invented answers — a question we can't answer truthfully doesn't ship.
- No fee figures inside any answer (§2.4.4).
- No fake deadlines or countdowns.
- **FAQPage structured data must carry only answers that ship on the page** — the honesty rule binds schema too (flag to perf-seo).
- No star/helpfulness widgets, no "was this helpful?" prompts.

### Open questions

- None blocking. **ASSUMPTION (inline):** answers render verbatim; trio-first order; the fee answer carries the appended owner-confirmed offer sentence.

---

## 6. `/contact` — Arrive

**One job:** prove someone is reachable — where, when, how.
**Journey:** terminal page for the walk-in and tel paths (§3); Journey A's "I'll carry the file in" branch.
**The click it must earn:** walk-in (maps link) or `tel:` — stated, never sold (§3). The band keeps the page's gravity on the primary, per §3's no-dead-end rule.

### Fold contract (mobile 360–430px, first ~2 screens) — priority order

1. Rail-label head line (§0.1).
2. `h1`: **"One office in Jaisalmer — open six days a week."**
3. One lead sentence carrying the essentials **as text** (searchable, no image): "109, Indira Colony · Monday to Saturday, 10:00 AM – 7:00 PM · WhatsApp and phone reach the same desk."
4. The desk card in the fold — the `.slip` primitive reused for the desk (sand ground, ruled head "The office"), rows in this order: phone (`tel:`, "Call the office") · WhatsApp (`wa.me`, question prefill, "WhatsApp · {phone}") · address + "Open in Google Maps" quiet link (the **one map link**) · hours (Mon–Sat 10–7 · Sunday closed) · email as quiet text, last.

Deliberately below the fold: §02, the band.

### Ledger section inventory

- **Head** (unnumbered).
- **§01 · The office** — the desk slip (fold position above).
- **§02 · Before you come** — one short `.ruled-entry`, sourced from the FAQ online answer: "Walk in any working day — books and audit papers are easier across a desk. Routine matters (returns, GST filings, documents) often don't need a visit at all: they move over WhatsApp." Hours are **stated, never widgeted** — no live open/closed badge.
- **Act-band close:** sentence "We reply on WhatsApp and fix a time — or just walk in." + canonical primary + quiet phone.

### Content source of truth

- `site.address`, `site.hours`, `site.phone` / `site.phoneHref`, `site.whatsappNumber`, `site.email`, `site.mapsLink`, `site.mapsQuery` — all owner-confirmed.
- **Placeholder content: none.** Fully-real page (with `/services`).

### CTA surface map

- Band (above). Desk-slip rows carry `tel:`, `wa.me` (question prefill) and the maps link; email is quiet text. Header + float unchanged.

### Per-page do-not list

- **No embedded contact/booking form** — brand-personality §6 forbids a form on `/contact` that duplicates `/book`; the current page's `<BookingForm />` is removed. Booking stays one tap away via header, float and band (§2.1 still holds).
- **No stock office photo** — type, rules and the slip carry the page.
- **No embedded Google-map iframe** — decision: the maps link opens the real map in the visitor's own app with directions; an iframe adds third-party weight and visual noise to a trust page, and brand-personality fixes "one map link". (Owner-visible decision, logged.)
- No live open-now badge; no invented status logic.
- No newsletter capture, no auto-opening chat (§2.4.5).
- Email never rendered as a fill button.

### Open questions

- None blocking. **ASSUMPTION (inline):** the iframe cut and the booking-form removal are accepted (both defensible from the approved brand-personality §6 and §2.3); the desk WhatsApp row keeps the question prefill.

---

## 7. `/book` — only what §5.2 leaves open

§5.2 owns and is not repeated: the honest next-step line, the two-required-field slip in the first viewport, the three steps as margin notes, the slip device, submit wording "Open WhatsApp with my request", the SENT line "Request noted — we will confirm your slot on WhatsApp.", the placeholder convention. Gaps:

1. **Act-surface resolution:** `/book` ships **no `.act-band`**. The slip is the page's one act surface; the §2.3 "every page ends in a band" row applies to the seven non-book routes. No second fill CTA may compete with the submit. **ASSUMPTION:** the owner accepts this as the /book reading of §2.3 (log in DECISION_LOG).
2. **Deep-link mechanics:** `?service=<value>` must byte-match the Select values — exact `services[].title` strings, plus the legal value `Other / Not sure yet`. Unknown or garbage values fall back to no selection, never an error state.
3. **"Prefer to talk first?" card stays** (§3's home of the tel path): quiet block with tel + hours + address; never a fill button; may reuse the desk-slip pattern from `/contact` §01.
4. **Metadata retires the wording:** title no longer "Book an Appointment" (candidate: "Book a consultation — {site.shortName}"); description keeps the phone + hours facts.
5. **SENT-state reset label retires "Book another appointment" → "Send another request";** the call-fallback line stays.
6. **Mailto fallback = quiet text link** under the submit ("Or send by email instead"), never an equal button (§2.3 demotion).
7. **Validation:** no colour-only errors; error text carries words; `--error` token; fields ≥16px (tokens gotcha #10).
8. **`PageHero` retires here** — `/book` is its last consumer; delete the component once this route is rebuilt.

---

## 8. Build order

| Stage | Routes | Why these together |
|---|---|---|
| **A (in flight)** | `/book` slip rebuild | Unblocks the `?service=` deep links every `/services` entry needs (§7.2). |
| **B** | `/about` + `/services` | One engineer pass: shared head convention, numbered `.ruled-entry` lists, entry-link underline, founder-plate reuse, per-page `wa.me` consts. Also the journey-critical pair — the trust spine and the recognition layer. |
| **C** | `/faq` + `/contact` | Shares the numbered-entries pattern (`/faq`) and the slip device (`/contact`'s desk card reuses `/book`'s `.slip`); removes the accordion, the embedded booking form and the map iframe legacy on those routes. |
| **D** | `/why-choose-us` + `/testimonials` | Both are statement pages, smallest scope. Kills the last star-row code and **both #13 lint warnings** (the unused `site` imports sit on exactly these two files). |
| **E** | #15 LCP / image work | Cross-cutting, **after B** (plate sizing lands there); perf-seo re-measures with the #17 noise caveat. |

Each route gets its own critic review and the §9 checklist before the stage closes.

---

## 9. Verification checklist (inherited from Home)

Every rebuilt route must pass all of these before its critic round:

1. **One `h1` per route** — extend the existing HTTP h1 test to all 8 routes.
2. **CTA wording guards** — no "Book an Appointment", "Send Booking Request", "Get started", "Book Appointment" in any rebuilt route's rendered HTML or RSC payload; header/band/float wording canonical (§2.3 table).
3. **Honesty guards extended per route** — no star markup; no rating words; **the four invented testimonial names (Rajesh Verma, Sunita Malhotra, Amit Khanna, Priya Nair) absent from every route's payload**; no fee figures (no ₹ + digits); no credential claims; `.placeholder-mark` present exactly where §5.3-pending content lives (`/testimonials` §01; `/about` §02 note + §03 team note).
4. **Screenshots** — full-page at 360 / 768 / 1024 / 1440 / 1920 per route → `docs/design/screenshots/phase-3/<route>-<width>.png` (Home's convention).
5. **axe 0 per route**; focus contract intact (12.53:1 ink on paper / 5.17:1 brass on ink surfaces); reduced-motion: entrance suppressed, every state change still completes.
6. **LHCI per route** — a11y 100, CLS 0, SEO/BP 100; perf reported per the #17 caveat (upper bounds on this machine).
7. **Metadata** — unique title / description / self-canonical per route; `/book` title retires "Book an Appointment".
8. **All states per charter** — hover/focus/active on every link and button; `/book` error/disabled/sent; overflow 0 at 360px (float × content).
9. **Deep links** — `/services` → `/book?service=<title>` lands with the correct preselect (e2e once Stages A+B land); `Other / Not sure yet` param works; garbage param fails soft.

---

## 10. Consolidated owner questions (blockers only — none block a build start)

1. **Associates' roles:** are "Senior Tax Associate" (Vikram Singh Soda), "GST & Compliance Associate" (Bhawani) and "Accounts & Bookkeeping Executive" (Hemraj) confirmed facts, or interim? Default until answered: **name-only entries on `/about` §03** with the section-level placeholder mark.
2. **Asset requests already in flight (not blockers):** founder reshoot #1a · team photos · signature scan · real testimonials + the naming/permission convention for when they arrive.
3. **Owner-visible decisions to log (no answer needed to proceed):** `/contact` loses its embedded booking form and map iframe (brand-personality §6 + §2.3); `/book` carries no act band (the slip is the act surface); page-attribution inside the `wa.me` prefill; § numbering restarts per page; `/about` §01 ships as a short true entry with no placeholder mark.

