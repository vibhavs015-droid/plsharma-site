# Brand personality — P.L. Sharma & Co.

> PROPOSAL — pending owner [GATE] approval (Phase 1)

Companion to `vibe-board.md` (The Kept Ledger). This file governs writing and behaviour; the vibe board governs materials.

---

## 1. Archetype

**The Sage, in the keeping of the Caregiver.** The Sage explains plainly and does not perform cleverness; the Caregiver is the reason the explanation exists — someone is responsible for this file, and it is not a queue.

**Deliberately not:** the Ruler (institutional grandeur — crests, marble, "we are the leading firm"), the Jester (startup friendliness — "Hey there!"), the Magician (transformation promises — "maximise your refund"). The practice's real product is *fewer surprises*, and only Sage + Caregiver can say that honestly.

**In one human sentence:** *the senior accountant who tells you the truth in the first two minutes and remembers your father's file.*

---

## 2. Trait sliders

| Axis | Position | Reason |
|---|---|---|
| Formal ↔ **Warm** | **60 / 100** (just past centre, warm) | Formal enough to be entrusted with money and a deadline; warm enough that a shop owner will actually dial the number. The founder's name is over the door — distance would be a lie. |
| Institutional ↔ **Personal** | **85 / 100** (personal) | The one claim a faceless competitor cannot copy. Every device that can carry a human mark does. |
| Technical ↔ **Plain** | **65 / 100** (plain) | Half the audience is a salaried individual. Plain sentence first, then the real term: "your income tax return (ITR-1)". Never the reverse. |
| Expansive ↔ **Concise** | **80 / 100** (concise) | People arrive from WhatsApp with one specific problem and no patience. Length is not authority; precision is. |
| Loud ↔ **Quiet** | **70 / 100** (quiet) | Trust is built by restraint. Personality lives in the type, the margin and one brass line — plus exactly three deliberate loud moments (§5). |

---

## 3. Voice and tone

Four principles. Every line of copy on all eight pages must be defensible against them.

### 3.1 Say the plain thing first
| Do | Don't |
|---|---|
| "Your ITR, filed correctly, before the deadline." | "Comprehensive end-to-end tax optimisation solutions." |
| "GST returns, filed monthly. We tell you what's due and when." | "Unlock seamless compliance across your business journey." |
| "Bring your Form 16 and PAN. That's usually enough to start." | "Our streamlined onboarding leverages your documentation." |

### 3.2 One principal, by name
| Do | Don't |
|---|---|
| "You speak to the person who does the work." | "Our dedicated team of experts is available 24/7." |
| "Parbhati Lal Sharma has practised in Jaisalmer since 2001." | "A legacy of excellence spanning decades." |
| "Ask for Parbhati Lal Sharma. He'll tell you if we can help." | "Contact our friendly customer support department." |

### 3.3 Never assert what we cannot show
| Do | Don't |
|---|---|
| "Client words — we're collecting these with permission." | Four invented names with five gold stars. |
| "This section is reserved for clients who agree to be quoted." | "Trusted by 1,200+ happy clients." |
| "25 years in practice" (owner-confirmed) — and nothing else numerical. | "India's leading tax consultancy." / "100% success rate." |

No credentials, memberships, qualifications or awards may appear until the owner supplies them. No statistic may appear that the owner has not confirmed. Placeholders stay visible: `[PLACEHOLDER — awaiting real testimonial from owner]`.

### 3.4 Name the next step
| Do | Don't |
|---|---|
| "Send your documents on WhatsApp. We'll reply with what's needed." | "Get in touch to learn more." |
| "Call the office, 10am–7pm, Monday to Saturday." | "We're always here for you." |
| "Book a consultation — it takes about a minute." | "Start your journey with us today." |

**Mechanics:** second person; contractions allowed ("we'll", "you're") but never in a legal or deadline statement; active voice; sentence case; no exclamation marks anywhere; no emoji; no "solutions", "empower", "seamless", "journey", "unlock", "leverage", "cutting-edge"; Indian English (organisation, programme, lakh, crore, GST, ITR, PAN, Aadhaar, assessment year) with the technical term given once in plain form before it is used as shorthand.

---

## 4. How the personality manifests visually (checkable)

1. Every page opens with a § number in the margin (`§ 01`…`§ 08`), a display headline in Fraunces 400, and one sentence — no eyebrow labels, no badge row.
2. Body text is `#282E3F` on `#FAF6EC` (12.53:1) or `#57534A` on paper (7.10:1). No text pair ships unmeasured.
3. Zero cards with shadows. Structure is 1px rules and entries; radii are 2px on controls, 0 on panels.
4. Brass appears at most three times per viewport at ≥768px; never as body text on light (2.43:1).
5. Exactly one WhatsApp action is visible per viewport, plus the static 56px float. No pulse, no bounce, no badge.
6. Buttons are 2px radius, sentence case, verb-first, and follow the canonical wording table in `user-problem.md` §2.3 — primary CTA "Book a consultation on WhatsApp" (band, float name), header button "Book a consultation" → `/book`, `/book` submit "Open WhatsApp with my request", phone "Call the office". Never "Get started", "Learn more", "Submit", "Book an Appointment", "Send Booking Request".
7. Every claim on the site is one of three things: owner-confirmed fact, plain description of a service, or a visibly marked placeholder. There is no fourth category.
8. No star icon and no rating token exists in the design system (vibe board §7).
9. Portraits are square-cornered 4:5 plates with a 12.5px tracked caption; no circles, no arches, no duotone.
10. Figures — years, dates, § numbers — are tabular and right-aligned in their column.
11. Empty, error, loading and sent states use ink/muted and plain language, never a colour-only signal.
12. Reduced-motion users lose animation but keep every state change; keyboard focus is a 2px ink ring on paper and 2px brass ring on navy (12.53:1 / 5.17:1 against their backgrounds).

---

## 5. Memorable moments (three, no more)

### M1 — The Consultation Slip (`/book`)
The form is presented as a paper slip on `--sand`: three fields, a ruled edge, and **the exact WhatsApp message previewed live underneath in the same type**, before the button is pressed. The button reads "Open WhatsApp with my request" — the canonical `/book` submit wording defined in `user-problem.md` §2.3 — and the user can see precisely what will be sent.
*Why:* WhatsApp-first conversion usually ends in a leap of faith. Showing the message removes the last hesitation ("what happens if I press this?") and is a trust gesture, not a gimmick. It also makes the primary action honest about being a handoff to WhatsApp, not a booking calendar we do not have. Directly serves the site goal.

### M2 — The Margin Rail (site-wide, strongest on `/` and `/about`)
A 180–220px left margin carrying § numbers, dates, and one short italic note per page (Fraunces italic) — on `/about`, that note is the founder's line.
*Why:* it is the visual proof of "kept records", it gives every page a recognisable silhouette, and it is the structural answer to the critic's "twelve same-shaped boxes": content is ruled, sequenced and annotated instead of stacked in cards. Mobile collapses it to an inline marker so the identity survives at 360px without stealing width.

### M3 — The Signed Page (footer, echoed on `/testimonials`)
A hairline rule, then the principal's name and "Principal Consultant · Jaisalmer · since 2001". When the owner supplies a signature scan, the name is set over it at small size.
*Why:* a signature is accountability made visible — the exact thing a template competitor cannot fabricate, and the shortest possible argument for "your file is not in a queue". Until the scan exists, the name is set in Fraunces italic: **a signature is never drawn, traced or faked.**

---

## 6. Consistency across the eight pages

Same voice, same rail, same rules; each page gets one distinct job and one distinct compositional move.

| Page | Personality job | Carries it with | Forbidden here |
|---|---|---|---|
| `/` | Answer "can I trust them?" in one screen | § 01, display headline, founder plate, one brass word, navy act-band | Stats band of non-evidence, star rows, card fields |
| `/about` | Make the firm a person, not a brand | The long entry: margin notes, italic founder line, dated ledger entries from 2001, team plates | Icon-tile grid, invented milestones, credentials |
| `/services` | Let a visitor find their own problem in 10 seconds | Ruled service entries, each with "what to bring" and a direct WhatsApp line | 3-up icon cards, "solutions", pricing we don't have |
| `/why-choose-us` | State the difference without boasting | One large Fraunces manifesto statement + 4 ruled statements, no icons | Badge walls, awards, superlatives |
| `/testimonials` | Show proof, honestly | The client-words ledger: quoted entries with permission status, visible placeholders | Stars, invented names, carousel, avatars |
| `/faq` | Remove the last fear, in the user's words | Numbered § entries with hairline dividers, first sentence as the excerpt | Accordion-as-decoration, legal tone |
| `/contact` | Prove someone is reachable | The desk card: address, hours, phone, one map link, WhatsApp | Contact form that duplicates `/book`, stock office photo |
| `/book` | Make the first step small | The Consultation Slip: 3 fields, live message preview | Multi-step wizard, calendar we don't operate, "Get started" |

Cross-page constants: identical rail widths, identical § numbering sequence, one brass word per headline maximum, one navy act-band per page, and the same placeholder treatment everywhere. A user who lands on `/services` from a WhatsApp forward and then opens `/about` must recognise the same firm in under a second.

---

## 7. What would betray this personality

- A single invented number, name, rating, credential or testimonial — the whole position collapses at once.
- A hero that shouts louder than the founder's own manner.
- Copy that says "solutions" where a person would say "tax return".
- A card grid where an entry would do.
- Decorative Rajasthan, decorative law, or decorative patriotism.
- A gold accent used to decorate rather than to mark something.
- A booking flow that hides what will happen after the click.

If any of these appear in review, it is a personality defect, not a styling preference — send it back.
