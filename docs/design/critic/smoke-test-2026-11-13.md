# Critic review — Home page (`tax-consultant-website/site/app/page.tsx`)

**Reviewed:** `site/app/page.tsx` (311 lines), with context from `app/globals.css`, `lib/site-config.ts`, `components/site/{section-header,feature-icon,reveal}.tsx`, `components/ui/button.tsx`, `app/layout.tsx`, and rendered screenshots `site/.hallmark/shots/localhost-3000-{1440x900,1440-full,375}.png` plus `public/images/father.jpg`. Code-only review cross-checked against renders. Date of review: 2026-11-14. (Filename date 2026-11-13 per the tasking note that requested this review.)

## Findings

1. **Founder "portrait" is a party snapshot wearing a title.** — `page.tsx:92–120`, `public/images/father.jpg`, hero right column. The single most prominent image on the site — an arch-framed card captioned "Parbhati Lal Sharma, Founder & Principal Consultant" — is a casual festive photo: sunglasses, blue-gold brocade kurta, hand raised to the collar, shot against a green shade-net with a heavy turquoise cast. It is authentic (a real photo of the real person, not stock — to its credit), but it is tonally and chromatically wrong for this slot: the green/cyan cast fights the navy-and-gold palette on every viewport, and sunglasses-plus-festive-wear reads as a wedding album, not a 25-year principal consultant, at the exact pixel where the page promises "Trusted." The ornamental frame and name plate are well-made; the photograph inside them undoes them. **Severity: major.**

2. **Invented, name-bearing testimonials decorated with hand-coded 5-star rows.** — `page.tsx:223–248` + `lib/site-config.ts:137–163`. Every testimonial is marked `⚠️ PLACEHOLDER` in source, yet each card asserts a uniform five gold stars (`page.tsx:233–240` — an `Array.from({length: 5})` decoration, not data) and presents four plausible-sounding names ("Rajesh Verma, Business Owner"…) as real clients of a real, deployable firm. A rating nobody gave plus people who may not exist, on the page of a business whose brand promise is honesty and confidentiality, is the least trustworthy element on the site. This is precisely the template filler I exist to flag — worse here because it *looks* like verified social proof. **Severity: major.**

3. **The middle third of the page is twelve same-shaped boxes.** — `page.tsx:146–172` (Services) and `page.tsx:194–213` (Why Choose Us). Two consecutive 3×2 card grids with an identical silhouette — icon tile top-left, bold serif-ish title, small grey paragraph — the same `gap-6`, the same centered `SectionHeader`, the same `(i % 3) * 0.07` stagger. One is white-on-ivory with a hover top-border; the other is white-on-muted with a gold left rule. That dressing difference is not enough: there is no compositional event between the grids (no pull-quote, no founder line, no break in rhythm), so the page reads hero → long field of cards → grid band → long field of cards. This is the repeated-identical-card-row pattern the charter distrusts, surviving via discipline rather than composition. **Severity: major.**

4. **Same-level specs drift between the two grids.** — `page.tsx:156,152` vs `page.tsx:206,203`. Service card titles are `text-xl` (20px serif); why-choose item titles are a bare `h3` (16px). Icon tiles are `size-11 rounded-lg` in Services and `size-10 rounded-md` in Why Choose Us. Two elements with the same hierarchical job, rendered at two different sizes and two different tile specs on one page. Neither is wrong alone; the pair is. **Severity: minor.**

5. **Stats band is half real, half costume.** — `page.tsx:125–138` + `site-config.ts:45–50`. "25+ Years" and "2001 Serving Jaisalmer Since" are the same fact stated twice; "1:1 Personal Attention on Every Case" and "100% Confidential & Secure" are service promises typeset as metrics. A band that borrows the visual authority of evidence should contain evidence. Also: the `divide-x` grid has no horizontal padding, so on the 2-col mobile layout the divider set lands a rule at the grid's right edge and labels run close to the screen edge (visible in the 375 render). **Severity: minor.**

6. **The signature gold word is the most generic word available.** — `page.tsx:48–51`. The stated signature ("the gold word in the navy hero") is applied to "Experts" — an agency-boilerplate word that arguably contradicts the brand's actual differentiator (one principal, personally). The device is right; the word is the weakest possible pick. **Severity: minor.**

7. **The founder card is a dead end.** — `page.tsx:92–120`. The site's strongest, most distinctive asset — the real principal — links nowhere, and no home-page path leads to the founder's story (`/about`). **Severity: minor.**

8. **Assorted small stuff.** — Testimonial section description "A few words from the clients we work with." (`page.tsx:221`) is filler copy. The fixed WhatsApp float overlaps the founder photo card at the mobile fold (375 render). `lg:min-h-[calc(100svh-6rem)]` (`page.tsx:45`) hard-codes a 6rem header assumption that will silently break if the header height changes. `text-[color:var(--accent)]` is written out ~10 times where the mapped `text-accent` utility exists — verbose authoring, identical result. **Severity: minor.**

**What is genuinely good and should not be regressed in the fix round:** the hero fold discipline at lg (headline → one sentence → actions → proof points, no dead space); the arch + offset gold frame device; truthful-stats policy (no invented client counts); the numbered gold FAQ numerals with first-sentence excerpts (`firstSentence` handles the "80C, 80D etc.)" trap correctly); Reveal shipping content visible at rest, CSS-only, reduced-motion-safe; correct heading order h1→h2→h3; documented contrast pairs (`--gold-ink`, `--input`); zero client JS on this page (all server components).

## Scores (1–5)

| Axis | Score | Reason in one line |
|---|---|---|
| Originality | **3.5** | Arch portrait, gold-word signature, numbered FAQ list are real moves; the skeleton is still grid-after-grid template-shaped. |
| Hierarchy | **3** | Hero and final section are well-graded; the middle is one long uniform card field and the stats band dilutes its own authority. |
| Consistency | **4** | Pill buttons, radius scale, spacing rhythm, type roles are tight; same-level drift (finding 4) and two gold check treatments are the nits. |
| Usability | **4** | Clear primary action twice, tel link, skimmable sections, decent mobile stacking; float collision and dead-end photo card hold it back. |
| Accessibility | **4.5** | Headings, alt text, aria-hidden decorations, reduced-motion, contrast pairs all handled properly; the silent star rows are the only nit. |
| Performance | **4.5** | Full server render, one `priority` image with proper `sizes`; can't verify the source photo's weight from here; Geist Mono loaded in layout for near-zero use (layout-level, not this file). |
| Brand fit | **3** | Navy/gold/serif/founder-forward/confidential is all present — then the hero photo's party tone and the fake stars sit directly on the brand's "trustworthy" axis. |

## Verdict: **REJECT**

Three majors. The engineering and token discipline are excellent; the page is currently let down by its two most emotionally-loaded assets (the founder photo and the testimonials) and by mid-page monotony. Fix round required.

### Required fixes

- [ ] **Founder photo:** replace the festive snapshot with a neutral-background professional portrait of the principal (no sunglasses), colour-graded to sit inside navy/gold. Until such a photo exists, either neutralise the green cast and crop much tighter as an interim, or take the "Founder & Principal Consultant" caption off — request the real portrait from the owner before launch.
- [ ] **Testimonials:** delete the hard-coded 5-star rows (or render stars only from a real `rating` field). Before deployment: replace the four invented quotes with real client words (with permission) or visually mark them as illustrative examples. Never present invented names as clients on the live site.
- [ ] **Break the double grid:** re-compose Why Choose Us as a differentiated block — e.g. a two-column editorial list with the gold rules and larger statements, or interleave a founder pull-quote — so there is one non-grid compositional event between the two card fields.
- [ ] **Match same-level specs:** give the why-choose `h3` the card-title scale (`text-xl`) and unify the icon tile (`size-11 rounded-lg`), or downsize both grids' titles deliberately and document why.
- [ ] **Stats band:** merge "25+" and "2001" into one tile; stop typesetting promises ("1:1", "100%") as metrics — three real tiles or plain statements instead. Add horizontal padding to the stats grid on mobile and fix the stray right-edge divider.
- [ ] **Route the founder card:** link the photo card (or its caption) to `/about`.

### Optional suggestions

- Gold-light a more specific word than "Experts" — "Trusted" or "Handled" carries the brand; the device deserves a better word.
- Replace "A few words from the clients we work with." with a sentence that asks something of the reader.
- If real rated testimonials ever arrive, keep stars but give the row a text alternative (e.g. `aria-label="Rated 5 of 5"`) or `aria-hidden` + visible rating text.
- Extract the header-height constant (`6rem`) into a token or measure it, so the hero fold doesn't silently break.
