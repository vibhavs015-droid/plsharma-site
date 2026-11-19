# T14 persona audit — the skeptical local tax client

**Date:** 2026-11-18 · **Live:** https://plsharma-site-preview.netlify.app (deploy `6afde0b5`, branch `polish-pass`)
**Persona:** salaried Jaisalmer resident with TDS + a new GST business + a dread notice; files ITR yearly; skeptical of CA websites; impatient, ready to close the tab.

> **VERDICT: YES — this person would contact the office today.** Every path to a human works (phone, prefilled WhatsApp, prefilled email, maps, a walkable form), the fee-honesty and notice answers directly soothe the two things keeping him up, and nothing broken ever blocks the ask — the rough edges found below (an unfinished-looking testimonial placeholder, a nameless team, a section counter that skips 04) dent polish, not the decision to send that first message.

## How I walked it

All nine journeys on the live URL, 2026-11-18. `webfetch` for page content and raw HTML (programmatic checks of rail numerals, hrefs, meta, asset HEADs, the booking form's SSR + source in `site/components/site/booking-form.tsx`); the `browser` namespace was disconnected this round, so interactive-only behaviors (native validation popovers, menu, sticky bar pixels) were verified from markup/source instead of clicks — stated per finding. **Nothing was submitted on the booking form.**

## Findings

**P1 (broken / misleading / blocks contact): NONE.** No journey was blocked or lied to; every contact action behaved the way a normal person expects.

| ID | J | Severity | Surface (page + element) | What I saw | Why it's wrong for this persona | Fix direction |
|---|---|---|---|---|---|---|
| F1 | 1, 9 | **P2** | Home, section rail labels | Rails read `01 —— SERVICES`, `02`, `03 —— THE RECORD`, then **`05 —— COMMON QUESTIONS`**. No 04 exists — raw HTML confirms four rails only and the §04 note text is gone entirely. | A tax firm's site is fundamentally a numbers-and-precision business; a section counter that skips 04 looks like nobody proofread it. Exactly the "lol look at this" screenshot. | Renumber the Common questions rail 05 → 04 (one string + its test); confirm no other page keeps a stale numeral. |
| F2 | 4 | **P2** | `/about` §03 "The team" | Three bare names — **Vikram Singh Soda, Bhawani, Hemraj** — with no roles, no photos, nothing; only the principal carries a title ("Founder & Principal Consultant"). | Who are these people? Accountants? Staff? And it sits under a lead that says "You speak to the principal himself — the person who does the work" and a bio that says "He handles each case himself." The section actively contradicts the page's own promise while looking thin. | Until roles exist: fold the three names into one honest line ("the office support team") or add owner-supplied roles so each name says what they do. |
| F3 | 4 | **P2** | `/testimonials` §01, placeholder entry | `\[PLACEHOLDER — AWAITING REAL TESTIMONIAL FROM OWNER\]` in bracketed all-caps as the only content under "Client words." | To a visitor, "OWNER" is meaningless internal language — it reads like a CMS field leaked onto a live page ("is this site finished?"). The plain-language note underneath is genuinely good and honest; the bracket line above it breaks the same spell the note works to create. | Reword to plain visitor language (e.g. "No client quotes yet — this page stays empty until real clients agree to be named") — the honesty survives, the backstage talk goes. |
| F4 | 2 | **P2** | Fee journey, site-wide (`/faq` Q02, `/services`, Home) | Zero rupee figures anywhere. FAQ: "Fees depend on the complexity… Please contact us for a quote." Home teaser: "a simple salary return costs much less than a business audit." | This is my exact fear about CAs — vague about money — and the site confirms it: I wanted any number, any starting point, and got process instead. The upfront-fee promise is honest and helps, but "contact us for a quote" is the evasive shape I was braced for. | Owner supplies ONE honest figure or range for the commonest case (salary ITR "from ₹X") → publish in FAQ Q02 + `/services` entry 01; no invented numbers, just the owner's real one. |
| F5 | 4 | **P2** | `/about` + site-wide (KNOWN — owner pending) | The site never says **Chartered Accountant** or any qualification anywhere; the credential line is "Principal Consultant." | For a man handing over a notice and his books, "is this person even a CA?" is THE question. 25 years and honest tone are strong, but the profession's actual credential is absent while "consultant" is ambiguous. | Once the owner confirms the qualification (known pending), state it plainly under the principal's name on `/about` and in the bio — one line, no badges. |
| F6 | 4 | P3 | `/about` §01 + Home hero, founder plate photo | The founder photo is a casual outdoor snapshot — sunglasses, printed shirt — as the trust centerpiece. (KNOWN: reshoot pending.) | Informal for a trust-sensitive profession; my first thought was "is this the accountant or a holiday photo?" It undercuts the 25-years gravitas the copy builds. Filed as awareness, not a new ask. | Reshoot already pending — a plain, in-office headshot; everything else about the plate (caption, halo) is right. |
| F7 | 9 | P3 | Home | "The first consultation is free" appears **twice on one page** — hero bio, then the record band ("First consultation free"). | Repeating the same free offer twice in one scroll reads slightly infomercial while everything else is restrained. | Drop it from the record band (bio already carries it) or reword the band item to a different fact. |
| F8 | 1, 9 | P3 | Home §02 + `/why-choose-us` entry 02 | "**On-Time, Every Time** — Returns and filings are completed well before their due dates." | The one blanket absolute on the site. Skeptical shoppers side-eye "every time" from anyone — it's the sentence most likely to trigger "yeah, sure." | Keep the promise (it's a real value), just stop short of the absolute — e.g. "before the deadline, every filing." |
| F9 | 5, 9 | P3 | Footer / contact, every page | `plperiwal@yahoo.com` as the only email. | It works fine and I'd still email it — but on a site this considered, a 2000s yahoo address reads a few years out of date next to "since 2001." | Consider a domain-based address when ready; owner's real inbox, non-blocking. |
| F10 | 8 | P3 | `/this-page-does-not-exist` (404) | Body is excellent: `That page isn't here.` + "address may be out of date… typed wrong" + four working links, real 404 status. But `<title>` is the **site default** ("P.L. Sharma And Company — Tax Consultants & Financial Advisors"). | In my tab history this lost page looks like the homepage — minor, but it's the one place the title should name what happened. | Catch-all route + `generateMetadata` → "Page not found | …" (known from T13 round 1). |

## PREVIEW-ONLY (sample-content artifacts — vanish or change at launch)

1. **No sample testimonials rendered at all.** The brief expects `SAMPLE — not real` tagged samples in this preview; the live page shows only the raw placeholder (F3). Either the sample flag is off on this deploy or T14 removed them — as a user I saw an empty page, so I cannot judge the sample cards themselves; the tag name as described reads honest, and the placeholder string I *did* see ships to production too, which is why F3 sits in the main table.
2. **Netlify deploy comment** in `<head>` ("Anyone can build and deploy a site like this one for free: netlify.new…") — HTML comment, **not visible to any visitor**; checked and noted only for transparency. Not a finding.
3. **Indexing guard on** (`robots.txt` disallow-all, noindex) — per instructions, correct for an owner preview, not a finding.

## What genuinely worked (do not touch)

1. **First five seconds pass.** Who (P.L. Sharma, Jaisalmer, since 2001), what (income tax + GST for people and businesses), next (one gold WhatsApp button + a dialable phone). The hero bio is specific and human — fee agreed before work begins, papers confidential, free first consult — zero generated-marketing smell.
2. **Every contact action behaves exactly as a normal person expects:** phone renders `+91 98297 71396` as a proper `tel:` link; every WhatsApp link carries a pre-written intro so I never face a blank message box (and the page is even named in it); email opens with subject + structured body already filled; address opens Google Maps. Journey 5 was flawless.
3. **My three needs were one screen away:** ITR, GST registration, and the notice all appear on Home's first screenful of services; `/services` entries deep-link into the booking form with the service pre-selected (mechanism source-verified: client-side `?service=` read, config-legal values only, graceful degrade on garbage values).
4. **The notice answer is the best line on the site for me:** "Don't panic, and don't ignore it… we will read it, explain what it means in plain language, and prepare a proper response within the deadline" — my exact fear, answered like a human, with one tap to start. (Journey 3 fully passes.)
5. **The booking form earns trust before I type:** "Fill in two details — WhatsApp opens with your request ready… nothing is booked automatically", plain labels, asterisks only where required, phone pattern sane, "Or send by email instead" fallback, and "this site stores nothing" — which the Privacy page confirms literally (WhatsApp opens locally, nothing posts; no cookies, no analytics). Journey 6 stopped before submit, as instructed; field copy needed no interpretation.
6. **Privacy and FAQ read like a person, not a lawyer.** "One form collects your details — this site stores nothing." "Ask the office and it is done." Last-updated date present. Nothing robotic, nothing contradictory with the rest of the site (hours, phone and free-consult wording agree everywhere I cross-checked).
7. **Restraint where everyone else fakes it:** no stock faces, no invented quotes, no fake star ratings, no "100% guaranteed" anywhere. The record band (Since 2001 · 25 years · hours · free consult · office) is exactly how a ledger-branded firm should do proof.
8. **Consistency held site-wide:** same header, hours, phone and footer on all ten routes checked; titles per page correct (except the 404, F10); one gold CTA wording everywhere.

## Scores (optional this round)

| Axis | Score | Note |
|---|---|---|
| Originality | 4 | Ledger register reads as a real local firm, not a template — with F8 the lone overclaim. |
| Hierarchy | 4 | First screen answers who/what/next; Home's skipped 04 (F1) mars an otherwise ordered flow. |
| Consistency | 4 | Hours/phone/CTA wording agree site-wide; free-consult doubles on Home (F7). |
| Usability | 4.5 | All contact paths textbook; service→form prefill designed around real intent. |
| Accessibility | 4.5 | axe 20/20 evidence stands; interactive states unverifiable this round (browser disconnected). |
| Performance | 4 | Assets light (og 34 KB, hero 103 KB); not measured live this round — local LHCI was 100. |
| Brand fit | 4.5 | Kept Ledger intact — placeholder-bracket language (F3) and yahoo address (F9) are the only register breaks. |

---
*Persona audit by the critic, T14 item I, round 1. Findings F1–F5 are the owner-relay list (P2); F6–F10 optional polish. Nothing outside `docs/design/critic/` was modified.*
