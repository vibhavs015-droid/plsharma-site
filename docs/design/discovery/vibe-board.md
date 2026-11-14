# Vibe board — P.L. Sharma & Co.

> PROPOSAL — pending owner [GATE] approval (Phase 1)

**Art Director:** art-director · 14 Nov 2026 · inputs: `STUDIO_CHARTER.md`, `PROJECT-NOTES.md`, `site/app/globals.css`, `docs/design/critic/smoke-test-2026-11-13.md`, Phase 1 owner answers.

**Direction in one sentence:** *A well-kept account book — warm paper, dark ink, one brass rule, and a signature at the bottom.*

Working name: **The Kept Ledger.** The metaphor is a promise, not a costume: a firm that keeps your records keeps your trust. It shows up as structure (a numbered margin, ruled entries, no cards) — never as props (no paper stains, no rubber stamps, no ribbons).

---

## 1. Who this is for (the constraint everything obeys)

Individuals and small-business owners in and around Jaisalmer, most arriving on a mid-range Android phone from a WhatsApp forward or a phone call, often while standing in a shop or an office. They are handing over money, documents and a compliance deadline. They are not evaluating "design"; they are answering one question: **are these people careful with my papers?** The vibe must read *careful, reachable, and unlikely to make a mistake* — before a single word of copy is read. Half the audience is a salaried individual; half is a GST-registered business. Neither is impressed by startup flash, and both read "corporate" as "expensive and impersonal".

---

## 2. Emotional tone — the exact words

| The feeling | What it means in design terms | What it is not |
|---|---|---|
| **Kept** | Records are held; someone is answerable. Structure is visible and stable. | Not "sleek", not futuristic. |
| **Composed** | Deep margins, unhurried leading, few elements per screen, nothing competing. | Not empty, not sparse-to-the-point-of-uncertainty. |
| **Plain-spoken** | Sentence-case, verb-first labels; real terms next to plain ones. | Not bureaucratic, not legalese. |
| **Warm, not chummy** | The warm ground, the founder's name, one brass line. Warmth is a material, not a voice. | Not jokey, not emoji, not "Hey there!" |
| **Locally rooted, not folkloric** | A Jaisalmer address and a 2001 date carry the place. Nothing decorative does. | Not arches, camels, jali patterns, mirrorwork. |

The one-line test for any element: *would a 25-year principal with his name over the door be comfortable being shown this?* If it is louder than he is, it goes.

---

## 3. Palette

### 3.1 Verdict on the current tokens (candidate, honestly judged)

| Current | Value | Verdict | Reason |
|---|---|---|---|
| `--primary` slate-navy | `#282E3F` | **KEEP** | 12.53:1 on paper. It is the only colour doing "institution" without costume, and the owner picked it. It is not what makes the site look templated. |
| `--accent` warm gold | `#CF9455` | **KEEP, narrow its job** | 2.43:1 on paper — it can never carry text on light, yet it is currently used near text. On navy it is 5.17:1 and legitimate. Keep the hue, forbid it as body text and as the sole boundary of any control. |
| `--gold-ink` | `#854E24` | **KEEP, promote** | 6.25:1 on paper, 5.55:1 on sand. This, not `#CF9455`, is the *text* gold. Consolidate: two golds total (mark + text), no drift. |
| Ivory ground | ≈`#FCFAF7` | **REFINE → `#FAF6EC`** | The current ground is software-white. A pigmented sandstone-ivory removes phone glare, ties to Jaisalmer without a motif, and makes the gold sit rather than float. |
| Cool greys (`--muted`, `--secondary`, `--border`, hue 258) | ≈`#EFEFF3` | **REPLACE → warm `#F1E8D9`** | *This is the main fix.* Every neutral is currently a blue-grey — the default shadcn fingerprint, and it fights the gold. Warm neutrals are the single change that stops the page reading "template". |
| `--whatsapp` | `#0F8344` | **REPLACE → `#0B6E39`** | Measured defect: `#0F8344` text on paper is **4.47:1 — fails 4.5**. The darker green is 5.89:1 on paper / 6.36:1 with white text. |
| `--input` | oklch 0.65 | **KEEP the 3:1 principle, re-express** | New `#8A7F69` = 3.66:1 on paper, 3.25:1 on sand. |
| `--radius` 10px | — | **REPLACE → 2px** | 10px cards read as software. Paper and rules are square. |

**Net verdict: keep the two hues, replace every neutral, geometrically de-soften the system.** The identity problem was never the navy and gold — it was blue-grey surfaces, 10px radii, card shadows and Playfair, which together are the international default of "premium services". Fix those and the owner's theme becomes recognisably *his firm's*, not a theme.

### 3.2 Proposed palette (all pairs measured)

Ratios computed from WCAG 2.2 relative luminance (sRGB), **reproducible from the
committed verifier** `site/tools/contrast-check.mjs` (dependency-free; same
formula axe-core/Lighthouse use) — its live output is committed as
`docs/design/discovery/contrast-evidence.json` and matches every figure below.
Control pair `#000000`/`#FFFFFF` = **21.00**.

| Token | Hex | Job | Measured |
|---|---|---|---|
| `--ink` | `#282E3F` | All primary text, rules at full strength, the "act" surface | 12.53:1 on paper · 11.13:1 on sand · paper on ink 12.53:1 |
| `--paper` | `#FAF6EC` | Default page ground | — |
| `--sand` | `#F1E8D9` | The one alternate surface: quoted entries, margin panels, the slip | ink 11.13:1 · muted 6.31:1 |
| `--brass` | `#CF9455` | **Mark, never message:** the one accent word, hairlines that carry meaning, button fill on navy | on ink 5.17:1 · on paper **2.43:1 → non-text only** |
| `--brass-ink` | `#854E24` | Accent *text* on paper/sand, links, placeholder markers | 6.25:1 paper · 5.55:1 sand |
| `--ink-muted` | `#57534A` | Secondary text, captions, placeholders, disabled | 7.10:1 paper · 6.31:1 sand |
| `--line` | `#D9CFBE` | Decorative hairlines only (never a control boundary) | 1.43:1 — decorative by design |
| `--line-input` | `#8A7F69` | Field and control boundaries (WCAG 1.4.11) | 3.66:1 paper · 3.25:1 sand |
| `--error` | `#B3261E` | Validation text/borders | 6.06:1 paper · 5.38:1 sand · white on it 6.54:1 |
| `--whatsapp` | `#0B6E39` | WhatsApp fills with white text, and WhatsApp text links | 5.89:1 paper · 5.23:1 sand · white on it 6.36:1 |

**Colour has jobs, not moods — the rule that keeps three hexes from becoming fifteen:**

- **Paper = read.** Default. ~85% of the site.
- **Sand = a second voice.** Only for a quoted entry, the margin panel, or the consultation slip. Never for a whole page.
- **Ink (navy) = act.** Every page ends in one navy band carrying the WhatsApp action. Navy is the conversion surface, not the wallpaper.
- **Brass = mark.** Max **3 brass marks per viewport** at ≥768px; one word in a headline, a § number, a rule that changes state. Never body text on light. No gold fills behind text except navy text on brass (5.17:1).
- No gradients, no glow, no shadows. Exactly one shadow survives, under the floating WhatsApp button, because it must separate from content.

### 3.3 Text/background pairs that ship (measured, no exceptions)

`ink/paper 12.53` · `ink/sand 11.13` · `ink-muted/paper 7.10` · `ink-muted/sand 6.31` · `brass-ink/paper 6.25` · `brass-ink/sand 5.55` · `paper/ink 12.53` · `brass/ink 5.17` · `ink/brass 5.17` · `error/paper 6.06` · `error/sand 5.38` · `whatsapp/paper 5.89` · `whatsapp/sand 5.23` · `white/whatsapp 6.36` · `white/error 6.54`. Anything not on this list is not text.

---

## 4. Typography

**Display: Fraunces. Text: Inter.** One display voice, one working voice, nothing else.

**What it should feel like:** a book that has been read, not a brochure that has been printed. Fraunces is a bookish soft-serif with real character in the `a`, `g` and figures — warm, hand-set, and unmistakably *not* the high-contrast didone that every premium-services template uses. Inter stays because body type is not where identity lives, and because its tall x-height and tabular figures are the right tool for an audience reading on a phone in daylight.

**What we retire:** Playfair Display. Its razor-thin hairlines are the most-used "luxury" display face on the web and read as wedding invitation / law-firm template; it also disappears at small sizes on Android. Geist Mono is loaded in `layout.tsx` and effectively unused — remove it (one less voice, less weight).

**The italic is a separate voice:** Fraunces italic is reserved for exactly one job — the marginal, personal aside (a founder line, a short quoted entry). Never for headings, never for emphasis inside body copy.

| Role | Family / weight | Size (clamp) | Leading | Tracking |
|---|---|---|---|---|
| Display (h1) | Fraunces 400, opsz auto, WONK 0, SOFT 0 | 40 → 64px | 1.05 | -0.025em |
| Section head (h2) | Fraunces 400 | 30 → 36px | 1.12 | -0.02em |
| Entry title (h3) | Fraunces 500 | 20 → 22px | 1.25 | -0.01em |
| Lead paragraph | Inter 400 | 18 → 20px | 1.6 | 0 |
| Body | Inter 400 | 17px (never 16 on mobile — iOS zoom, and this audience reads) | 1.65 | 0 |
| Meta / caption | Inter 400 | 14px | 1.45 | 0 |
| Rail label / marker | Inter 500, uppercase | 12.5px | 1.2 | +0.09em |

Rules: sentence case everywhere except the 12.5px rail labels; `font-variant-numeric: tabular-nums` wherever years, dates or figures appear (2001, deadlines, § numbers); body measure 62–68ch, display measure ≤ 20 words; no all-caps headlines; no letter-spaced body text; no drop caps.

---

## 5. Space and grid

**Temperament: ruled, not boxed.** Structure comes from 1px lines and generous margins, not from containers.

- Base unit **4px**. Scale: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128. No arbitrary values.
- Container **1160px**, 12 columns, 24px gutter, page padding 20 / 40 / 64.
- **The margin rail** (the signature): 180px at ≥1024, 220px at ≥1280, carrying § numbers, dates and short notes; below 1024 it collapses to a single inline marker above the entry. Body column is the remaining 8–9 columns. Asymmetry is deliberate and constant — every page has a lighter left edge and a heavier right.
- Section rhythm: 96 / 72 / 56 (desktop / tablet / mobile). Between entries inside a section: 32 / 24.
- Vertical rules are allowed; boxes are not. Cards are replaced by **entries**: a rule, a title, a body, optional margin note, 0px radius.
- Radii: **2px** on buttons and inputs, **0** on panels and plates, full only on the 56px circular WhatsApp button. If a 10px radius appears anywhere, the direction has failed.

---

## 6. Motion

Purpose only: *orient, confirm, or reveal that something is real.* Nothing moves to look alive.

| Duration | Easing | Used for |
|---|---|---|
| 120ms | `cubic-bezier(0.2,0,0,1)` | focus/hover colour on text, border, icon |
| 220ms | `cubic-bezier(0.2,0,0,1)` | **the signature interaction:** a hairline warms from `--line` to `--brass` when its entry is hovered or focused; nav underline `scaleX(0→1)` |
| 420ms | `cubic-bezier(0.22,0.61,0.36,1)` | one-time entrance on first paint: opacity 0→1, `translateY(8px)`, never replayed on scroll |

- Max travel **8px**. No parallax, no scroll-jacking, no counters, no reveal-on-scroll repetition, no hover lift, no pulsing CTA, no cursor effects.
- Content is visible in the HTML at rest; animation is an enhancement that starts from a visible state.
- `prefers-reduced-motion: reduce` → all durations 0.01ms, no transforms; colour and state changes remain instantaneous and complete (never removed, or users lose feedback).
- The WhatsApp float is static. It is the primary action; it must not beg.

---

## 7. Imagery

Only what exists or is promised: **founder photo (exists), 3 team photos (promised), testimonials as words (promised)**, logo (exists). Everything else is type, rules and space. **No stock photography, ever** — and no borrowed "office" imagery to fill a gap.

**The photography idea — the desk, not the showroom.** Real people at the place where the work happens, in daylight, with paper on it. Square-cornered 4:5 plates, one per person, one hairline rule beneath, caption above it in 12.5px tracked uppercase: name, role, and — for the founder only — "Since 2001". No arch, no ornamental frame, no gradient overlay, no duotone, no circular avatars.

**Founder photo — directive.** The current `father.jpg` is a festive snapshot (sunglasses, brocade kurta, green shade-net, heavy cyan cast) sitting in the highest-trust slot on the site. It must not be re-endorsed. Reshoot brief to the owner: seated at the desk, window daylight, plain sandstone-plaster or navy wall, plain shirt, hands and one closed file in frame, 50mm, shot at 4:5 and 1:1, no flash, no sunglasses. **Interim until that exists:** crop above the raised hand, grade the green/cyan cast to neutral, keep the caption (it is true), and log it as a known issue. If the grade cannot be neutralised, the photo moves to `/about` at small size and the home hero runs type-only — a hero with no portrait is more trustworthy than a party photo in a suit-shaped frame.

**Placeholders are designed, not hidden.** A promised-but-missing item renders as an *entry* with a dashed `--line` rule and a visible marker: `[PLACEHOLDER — awaiting real testimonial from owner]` in `--brass-ink` 12.5px. No invented names, no invented quotes, **no star rows at all** (no rating token and no star icon exists in this system — a rating nobody gave is a lie in gold). Team: three plates with the same dashed marker. This is a feature: it proves the firm shows only what it can stand behind.

---

## 8. Materiality and texture

Allowed, in this order, and only if it earns its weight:

1. **The hairline.** The primary material. 1px `--line`, full-strength `--ink` where it separates acts.
2. **The ruled entry.** Content aligned to a shared left rule and a baseline; numbers right-aligned and tabular, like a ledger column.
3. **One grain.** Optional single ≤1KB inline noise at ≤2.5% on `--paper` only, to stop banding on large flat fields. Nothing else.
4. **The firm's own mark.** If the owner supplies a scan of his actual signature and (optionally) the firm's real rubber stamp, each may appear **once** on the site. Real artefacts, used sparingly.

**Rejected as kitsch:** faux paper stains, torn edges, wax seals, ribbons, "APPROVED" stamps sprinkled as decoration, jali/perforated-screen patterns, camel/fort/haveli silhouettes, Devanagari used as ornament, ink splatter, marble, gold foil, crests.

---

## 9. What this vibe must never drift into

| Drift | Tell |
|---|---|
| Startup flash | gradients, glass, glow, neon, purple-blue, 3D blobs, animated cursors, "AI-powered" |
| Stock-photo corporate | handshakes, pointing at laptops, skylines through windows, team circles, "meeting" smiles |
| Cluttered template | card everywhere, icon-in-rounded-tile, 3-up feature row, logo carousel, testimonial slider, "Get started" |
| Luxe-law cliché | crest, laurel, scales of justice, marble, gold foil, Latin motto, "EST. MMIV" |
| Wedding-invitation serif | Playfair, script accents, gold-foil headings, centred everything |
| Bureaucratic India | khaki files, red tape, stamp pads, government-desk imagery |
| Tourist Rajasthan | arches, jali, camels, mirrorwork, saturated tie-dye, "royal" language |
| Bureaucratic-software | dashboard KPI cards, charts, progress rings, "solutions", "empower" |
| Fake-data theatre | invented client counts, star ratings, credentials badges, logos of clients we don't have |
| Over-restraint | a page so quiet it reads as unfinished or out of business — warmth needs at least one human mark per screen |

---

## 10. Requests to the owner (assets, not approvals)

1. **Reshoot the founder portrait** (brief above) — highest-impact single asset on the site.
2. **Three team photos**, same brief, 4:5, daylight, neutral wall.
3. **A signature scan** — black ink on plain white paper, phone photo is fine.
4. **Real testimonials, with permission to publish**, and whether names/initials/firm names may be shown.
5. Optional: one photo of the actual desk or the closed ledger (no client documents visible).

Until 1–4 arrive, the design must remain honest with visible placeholders. Nothing in this direction requires inventing a fact.
