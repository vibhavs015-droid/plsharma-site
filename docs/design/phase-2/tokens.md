# Phase 2 — token sheet (The Kept Ledger)

> **Status:** approved direction, implemented in the token layer. Phase 1 critic APPROVE
> (round 2) + owner [GATE]. **Owner:** art-director. **File of record:**
> `site/app/globals.css`. **Components:** not touched by this sheet — the specs below are
> for the frontend engineer's rebuild.
>
> **Companions:** `docs/design/discovery/vibe-board.md` (materials, §3 palette, §4 type,
> §5 grid, §6 motion, §7 imagery) · `brand-personality.md` (voice, button wording, M1–M3) ·
> `user-problem.md` (§2.3 CTA surfaces, §5.2 slip, §5.3 placeholder convention).
>
> **Contrast ground truth:** `site/tools/contrast-check.mjs` →
> `docs/design/discovery/contrast-evidence.json`. Every pair quoted here is in that file.
> Nothing in this system ships an unmeasured text/background pair.

---

## 1. Palette

| Token | Hex | Job | Measured (WCAG 2.2) |
|---|---|---|---|
| `--paper` | `#FAF6EC` | Default page ground. ~85% of every page. | — |
| `--sand` | `#F1E8D9` | The one alternate surface: the consultation slip's ground, muted bands, popovers. Never a whole page. | ink **11.13** · ink-muted **6.31** · brass-ink 5.55 · line-input 3.25 |
| `--ink` | `#282E3F` | All primary text, full-strength rules, the act surface. | on paper **12.53** · paper on ink **12.53** |
| `--ink-muted` | `#57534A` | Secondary text, captions, rail labels, placeholders, disabled text. | on paper **7.10** · on sand **6.31** |
| `--line` | `#D9CFBE` | Decorative hairlines only. **Never** a control boundary. | 1.43 — decorative by design, exempt |
| `--line-input` | `#8A7F69` | Field and control boundaries (WCAG 1.4.11 → 3:1). | paper **3.66** ✓ · sand **3.25** ✓ |
| `--brass` | `#CF9455` | **Mark, never message.** Rules that change state, § markers, fills behind ink text. | on ink **5.17** · on paper **2.43 → non-text only** |
| `--brass-ink` | `#854E24` | The *text* gold: links, accent words on light, placeholder markers. | paper **6.25** · sand **5.55** |
| `--error` | `#B3261E` | Validation text and borders. | paper **6.06** · sand 5.38 · white on it **6.54** |
| `--whatsapp` | `#0B6E39` | WhatsApp fills with white text, and WhatsApp text links. Replaces `#0F8344` (**4.47:1 — failed AA**, KNOWN_ISSUES #16). | paper **5.89** · sand **5.23** · white on it **6.36** |

**Rules that keep three hexes from becoming fifteen**

1. **Paper = read. Sand = a second voice. Ink = act. Brass = mark.**
2. Brass never carries text on paper or sand. Brass **fills** carry ink text only (5.17). Brass
   **text** is allowed on ink (5.17) and nowhere else.
3. Max **3 brass marks per viewport** at ≥768px.
4. `--line` is decoration; anything a user must see to operate a control uses `--line-input`.
5. Disabled = `--sand` + `--ink-muted` (6.31). **Never** `opacity` on text — it produces an
   unmeasured pair.
6. No gradients, no glow, no shadows. The only shadow in the system is the one under the
   floating WhatsApp button, and it comes from the component's `shadow-lg`, not a token.

### 1.1 Var-by-var mapping (old → new)

Every existing name is preserved so all 8 routes and every shadcn component keep rendering
before the rebuild. Only values changed.

| Var | Was | Now | Why |
|---|---|---|---|
| `--background` | `oklch(.985 .005 85)` | `var(--paper)` `#FAF6EC` | pigmented sandstone-ivory; kills phone glare, seats the gold |
| `--foreground` | `oklch(.24 .03 258)` | `var(--ink)` `#282E3F` | 12.53:1, was 12.5-ish; now exact and traceable |
| `--card` | `oklch(.995 .004 85)` | `var(--paper)` | cards are retired; no tonal layer above paper |
| `--card-foreground` | `oklch(.24 .03 258)` | `var(--ink)` | — |
| `--popover` | `oklch(.995 .004 85)` | `var(--sand)` | menus read as a slip laid on the page; measured ink 11.13 |
| `--popover-foreground` | `oklch(.24 .03 258)` | `var(--ink)` | — |
| `--primary` | `oklch(.33 .032 262)` | `var(--ink)` `#282E3F` | **kept hue**, exact hex; header/footer/act band |
| `--primary-foreground` | `oklch(.98 .004 85)` | `var(--paper)` | 12.53:1 |
| `--secondary` | `oklch(.94 .014 258)` | `var(--sand)` | the blue-grey neutral was the template fingerprint |
| `--secondary-foreground` | `oklch(.3 .03 262)` | `var(--ink)` | 11.13:1 on sand |
| `--muted` | `oklch(.95 .012 258)` | `var(--sand)` | muted bands become sand bands |
| `--muted-foreground` | `oklch(.52 .028 262)` | `var(--ink-muted)` `#57534A` | 7.10 paper / 6.31 sand |
| `--accent` | `oklch(.71 .115 68)` | `var(--brass)` `#CF9455` | hue kept, job narrowed: mark + fill, never text on light |
| `--accent-foreground` | `oklch(.24 .03 258)` | `var(--ink)` | brass fill + ink text = **5.17:1** — the only text colour a brass fill may carry |
| `--gold-ink` | `oklch(.48 .093 55)` | `var(--brass-ink)` `#854E24` | legacy name kept; this is the *text* gold (6.25) |
| `--whatsapp` | `#0F8344` | `#0B6E39` | KNOWN_ISSUES #16: 4.47 → 5.89 |
| `--destructive` | `oklch(.577 .245 27.325)` | `var(--error)` `#B3261E` | 6.06 paper |
| `--input` | `oklch(.65 .016 258)` | `var(--line-input)` `#8A7F69` | 3.66 paper / 3.25 sand — passes the 3:1 control rule |
| `--border` | `oklch(.91 .014 258)` | `var(--line)` `#D9CFBE` | decorative hairlines |
| `--ring` | `oklch(.6 .105 62)` (gold) | `var(--ink)` | the gold family measures **2.43:1 on paper** (evidence row `brass/paper`) — under the 3:1 UI threshold; ink is **12.53** |
| `--chart-1…5` | greys | ink · brass-ink · whatsapp · ink-muted · line | unused; mapped so any accidental use stays in-palette |
| `--radius` | `0.625rem` | `2px` | paper and rules are square |
| `--sidebar*` (8 vars) | greys / oklch | paper · ink · sand · line · ink | unused; re-pointed for completeness |
| `--hero-glow`, `--hero-line` | oklch washes | **removed** | gradients and textures are out of the direction |
| `--shadow-card`, `--shadow-card-lift` | shadows | **removed** | no card shadows; the float's shadow is the only one |

---

## 2. Typography

**Families.** Display = **Fraunces**, variable **`wght` + `opsz` only, normal style**. Text =
**Inter** (variable, 400/500/600). Nothing else. Playfair Display is retired
(wedding-invitation hairlines); Geist Mono was loaded and unused — removed.

**The var contract (globals.css already consumes these; the engineer supplies them):**

```
--font-sans     → Inter        (next/font, variable: "--font-sans")
--font-display  → Fraunces     (next/font, variable: "--font-display")
--font-heading  → var(--font-display, var(--font-sans))   ← already defined
```

**Exact load (next/font/google; Fraunces axes confirmed in this Next version's font data):**

```ts
import { Fraunces, Inter } from "next/font/google";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"], display: "swap" });

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
  axes: ["opsz"],   // wght is implicit; opsz is the only opt-in axis we render
});                 // `style` is left to its default: normal only
```

then `className={`${inter.variable} ${fraunces.variable}`}` on `<html>` (already wired in
`layout.tsx`). Both faces are SIL OFL — no licence risk.

**Why two axes and no italic (payload, measured 2026-11-15).** Fraunces' Google variable file
carries four axes plus a separate italic master, and every byte of every master ships in the
file. `SOFT` (0–100, default 0) and `WONK` (0–1, default 0) were pinned to their own defaults in
`globals.css`, so the pin rendered nothing while the masters cost payload; italic was reserved
for a founder aside that has never shipped. Preloaded weight on `/`, read from the built font
files before the change (`-s.p.` = preload) and from the production build after it:

| Preload, latin | before | after |
|---|---|---|
| Fraunces normal, `wght`+`opsz`+`SOFT`+`WONK` | **120.8 kB** (120 800 B) | **67.4 kB** (67 388 B), `wght`+`opsz` |
| Fraunces italic, the same four axes | **149.5 kB** (149 512 B) | gone — zero italic `@font-face` blocks |
| Inter variable (unchanged file) | **48.4 kB** (48 432 B) | **48.4 kB** (48 432 B) |
| **preloaded total** | **318.7 kB** | **115.8 kB (−63 %)** |

Sizes are kB (1000 B); the earlier brief quoted the same three files in KiB (118.0 / 146.0 /
47.3). Total woff2 shipped: **781 KB in 13 files → 357 KB in 10** — the remainder are
latin-ext/lazy subsets requested per unicode-range, never preloaded.

**Re-add conditions.** `italic` returns only when a real italic ships that is not a CSS skew:
add `style: ["normal", "italic"]` then, and expect ~150 kB preloaded for latin — prefer a
separate `@font-face` requested only on the route that needs it. `SOFT`/`WONK` return only with
a state that renders a non-default value, i.e. together with a token and a measured use; a
`font-variation-settings` line on its own is a no-op once the axes are gone (browsers ignore
axes the file does not carry).

**Emphasis is weight and colour, not italic.** `app/about/page.tsx` L36 and L45 hold the only
`<em>` in the codebase (legacy route, pre-rebuild); with the italic face gone they fall back to
the browser's synthesised oblique. Replace them with the house emphasis —
`<strong className="font-medium text-ink">` — when that route is rebuilt. Body copy carries no
italic anywhere.

**Scale** (`@theme` tokens; `text-display`, `text-section`, `text-entry`, `text-lead`,
`text-body`, `text-meta`, `text-label` are generated utilities that carry size + leading +
tracking + weight):

| Utility | Family / weight | Size | Leading | Tracking | Use |
|---|---|---|---|---|---|
| `text-display` | Fraunces 400 | clamp 32 → 56px | 1.05 | −0.025em | `h1` only (set in base too). Capped at 56 from 64 on 17 Nov (A1): the sentence h1s on /faq and /why-choose-us ran 4–5 lines; two or three at ≥1024 now, and the phone floor drops 40 → 32 |
| `text-section` | Fraunces 400 | clamp 30 → 36px | 1.12 | −0.02em | `h2` |
| `text-entry` | Fraunces 500 | clamp 20 → 22px | 1.25 | −0.01em | `h3`, entry titles |
| `text-lead` | Inter 400 | clamp 18 → 20px | 1.6 | 0 | the one sentence under a headline |
| `text-body` | Inter 400 | 17px (base `body` is this) | 1.65 | 0 | running text — never 16 on mobile |
| `text-meta` | Inter 400 | 14px | 1.45 | 0 | captions, helper text |
| `text-label` | Inter 500 | 12.5px | 1.2 | +0.09em | rail labels, plate captions (uppercase via `.rail-label`) |

**Optical rules.** `font-optical-sizing: auto` is applied to `h1–h4` and the shadcn slot
headings in `@layer base` — one place, not per component; with `opsz` in the file it tracks the
rendered size across 9–144. No `font-variation-settings` is declared: the file's own defaults
(`SOFT` 0, `WONK` 0) are the only values it can render, so pinning them was dead CSS (removed).
Sentence case everywhere except 12.5px labels. `tabular-nums` on any
year, date, § number or amount (`time`, `[data-numeric]`, `.rail-label`). Body measure
62–68ch via `.measure`. No all-caps headlines, no letter-spaced body, no drop caps, no
italic headings — emphasis is weight and colour, not italic (see above).

---

## 3. Space, radii, containers

- **Base unit 4px** — Tailwind's default spacing scale *is* this scale (1=4, 2=8, 3=12,
  4=16, 6=24, 8=32, 12=48, 16=64, 24=96, 32=128). No arbitrary values.
- `--container-page: 72.5rem` (1160) → `max-w-page`.
- `--gutter: clamp(1.25rem, 3vw, 4rem)` → 20 / 40 / 64 page padding.
- `--space-section: clamp(3.5rem, 2rem + 5vw, 6rem)` → 56 mobile, ~70 tablet, 96 desktop.
- `--space-entry: clamp(1.5rem, 2.4vw, 2rem)` → 24 / 32 between entries.
- `--rail: 180px` at ≥1024, `--rail-wide: 220px` at ≥1280. Below 1024 the rail collapses to
  one inline marker above the entry.
- `--measure: 66ch`.
- **Radii:** `--radius: 2px`; `sm/md/lg` = 2px, `xl` 3, `2xl` 4, `3xl` 5, `4xl` 6 (pinned so
  nothing can climb back to 10px). Panels and plates are `rounded-none`. `rounded-full` is
  legal only on the 56px WhatsApp float.

**Chrome geometry (added 17 Nov, polish A1).** Four device-chrome tokens and one measured
height, all in `@theme`/`:root`:

| Token | Value | Why |
|---|---|---|
| `--header-h` | `4.25rem` (68px); `6.0625rem` (97px) at ≥48rem | Measured from `header.tsx`: 40px logo + 2×14px padding = 68; the `md` contact strip (28px + 1px rule) adds 29. Feeds `scroll-padding-top` so anchored headings, the skip link and linked form fields clear the sticky bar |
| `--safe-top` / `--safe-bottom` / `--safe-left` / `--safe-right` | `env(safe-area-inset-*, 0px)` | One name per inset so no rule repeats a raw `env()`. All resolve to 0 today — they start doing work the moment B4 ships `viewport-fit=cover` |

`html` carries `scroll-padding-top: calc(var(--header-h) + var(--safe-top) + 1.25rem)`; fields
carry `scroll-margin-block-end: calc(5rem + var(--safe-bottom))` so a focused input never lands
under the float. `body > header` pads `--safe-top` and both header and footer pad
`--safe-left`/`--safe-right`, while `.ledger-rail` uses `max(var(--gutter), var(--safe-*))` —
so the ink bleeds edge to edge but no word sits under a landscape notch. The element selectors
need no markup change: layout.tsx renders `<header>` and `<footer>` as body's direct children.

---

## 4. Motion

| Token | Value | Used for |
|---|---|---|
| `--motion-fast` | 120ms | focus/hover colour on text, border, icon |
| `--motion-base` | 220ms | **the signature:** a hairline warms `--line` → `--brass` on hover/focus-within |
| `--ease-standard` | `cubic-bezier(0.2,0,0,1)` | colour and border state |

**Two tokens deleted (17 Nov, Orchestrator-sanctioned).** `--motion-enter` (420ms) and
`--ease-entrance` (`cubic-bezier(0.22,0.61,0.36,1)`) existed only for `.reveal-in`, which retired
with the Stage E head-Reveal unwrap; grep confirmed zero consumers in `globals.css`, every `.tsx`
and the test tree. "Declared but dead" contradicts the ledger-honesty direction, so both are gone
from `globals.css` rather than left standing. Git history keeps the values, and they return the
moment a real entrance ships — with the usage that justifies them, never in advance of it.

No parallax, scroll-jacking, counters, reveal-on-scroll repetition, hover lift, pulsing CTA,
cursor effects. **The WhatsApp float is static** — no pulse, bounce or badge (the component
currently scales on hover; that is inside the engineer's rebuild scope, not a token).
`prefers-reduced-motion: reduce` collapses every duration to 0.01ms and kills transforms;
colour and state changes still complete instantly, so users never lose feedback.

---

## 5. Utilities the rebuild consumes

### 5.1 New primitives

| Class | What it is | Rules the engineer must not break |
|---|---|---|
| `.ledger-rail` | Container + margin rail in one grid. 180px rail at ≥64rem, 220px at ≥80rem, single column (marker above content) below. Carries `max-w-page`, `--gutter` padding. | Content goes in the second grid cell. One rail per page section. |
| `.rail-label` | The 12.5px tracked uppercase marker (Inter 500, tabular, `text-wrap: balance`), declared as `:where(.rail-label)` — zero specificity, so any `text-*` utility on the marker wins the colour and the rail picks its surface token; the default stays `--ink-muted` (7.10) for markers that name no colour. Shipped markers: `text-brass-ink` on paper (6.25) and `text-brass` on ink (5.17). Used for section numerals, dates, plate captions. **The `§ NN · Title` form retires in B3** — numbered markers become `01 — Services` via `.rail-num` (below). | Never below 12px; never `--brass` on paper; a marker on an ink surface must carry `text-brass` or `text-paper` (the muted default is a paper value — 1.77:1 on ink). |
| `.ruled-entry` | The card replacement: 1px `--line` top rule, 0 radius, transparent, `--space-entry` padding, brass hairline on hover/focus-within, closing rule on `:last-child`. | No shadow, no background fill, no radius. Each entry owns exactly one heading. |
| `.act-band` | Ink surface, paper text, 1px brass top rule, 0 radius. One per page, at the end. | Contains the one primary CTA + one quiet phone link. Do not stack two bands. |
| `.placeholder-mark` | Dashed `--line` underline + `--brass-ink` 12.5px uppercase marker for pending content. Convention: `[PLACEHOLDER — awaiting real testimonial from owner]`. | Brass-ink 6.25 paper / 5.55 sand. The dashed rule is decoration; the text carries the meaning. Never invent a name or a star. |
| `.slip` | The consultation slip: paper on sand, 1px `--line` border, 2px ink top rule, 0 radius, responsive padding, no shadow. | Fields inside keep `border-line-input` (3.66 paper). |
| `.slip-head` | Ruled head row inside `.slip`, baseline-aligned, closing hairline. **Title-only by shipped decision** (Orchestrator, DECISION_LOG 15 Nov): no slip number. | No `No.` slot — an invented number on a web form is fiction, and a ruled blank reads as a broken field. If a flow ever needs an office-assigned reference it arrives after confirmation, from the firm, as real data. |
| `.btn-primary` | 44px min height, 2px radius, Inter 500 15px, no shadow. **On paper: ink fill + paper text (12.53). Inside `.act-band`: brass fill + ink text (5.17).** Hover adds a 2px brass/ink underline and never changes the fill. Focus = the shared 2px `--ring` outline (see §5.3), never an underline. Disabled: sand fill + ink-muted text (6.31). | Never brass fill on paper (2.43 boundary). Never paper text on brass (2.42). Never opacity-disabled. Never a second focus cue. |
| `.btn-quiet` | The secondary path (phone, mailto, "prefer to talk first"): inherits colour, 1px underline → 2px on hover, brass-ink (paper) / brass (ink) underline; focus = the shared outline. | Never given a fill; never given equal visual weight to `.btn-primary`. |
| `.measure` | `max-width: 66ch`. | For body copy inside wide columns. |
| `.rail-num` + `.rail-num-figure` / `.rail-num-rule` / `.rail-num-text` | **The section numeral (A1, T5):** the owner's `01 / Services` with the slash replaced by a 20px brass hairline. Flex row, no wrap; figure in `--ink` (12.53 paper, `--paper` 12.53 on ink via `.act-band`), rule = 1px `--brass` (the mark), words wrap inside their own column. Markup is real text — no `::before`/`attr()`, so the number is announced and indexed. | Use `.rail-num` **together with** `.rail-label` (the type comes from the label); never on an unnumbered marker; never add a literal `/`; keep the figure two digits and `data-numeric`. Contract: `docs/design/polish/a1-notes.md` §1. |
| `.ruled-entry:has(> p:only-child)` | One-fact entries (Home §03's five record lines, /about §02's three promises) drop to 16px block padding — the same rule at ledger density instead of a 360px stack of air. | Only fires on an entry whose **only** child is a `<p>`; entries with a heading or a wrapper keep `--space-entry`. |
| `.phone-number` | `white-space: nowrap`. | Wrap the digits in it; the surrounding label still wraps. |
| `.sample-tag` | Owner-preview stamp: brass ground, `--ink` text (5.17), 1px ink edge (so the boundary is 12.53, not brass-on-paper 2.43), 12.5px/500 uppercase, 2px radius, wraps rather than clips. | Preview-only (`showSampleContent`); never in production HTML. Never recolour to paper on brass (2.42). |
| `.sample-banner` | Preview strip above the header: brass ground, ink text (5.17), ink bottom rule, centred 12.5px/600 uppercase, `--safe-top` padding built in. Scrolls away with the page; the sticky header then carries its own safe-area padding. | Preview-only. It is a studio stamp, never site chrome — do not reuse the brass ground for a real announcement. |

**First shipped `.slip` instance (precedent for reuse):** the `/book` consultation slip, rebuilt
15 Nov — a paper slip on the sand band, 2px ink top rule, a `.slip-head` ruled title row reading
"Consultation request", fields edged in `border-line-input`, and the margin rail beside it
carrying the three steps as `.rail-label`. The `/contact` desk card (page-specs) starts from that
precedent, not from a new composition.

CTA wording is fixed by `user-problem.md` §2.3: header "Book a consultation" → `/book`;
band/float "Book a consultation on WhatsApp"; `/book` submit "Open WhatsApp with my request";
phone "Call the office". Retire "Book an Appointment", "Send Booking Request", "Get started".

### 5.2 Legacy aliases (kept — the other 7 routes still render; retirements noted inline)

| Class | Now | Retire when |
|---|---|---|
| `.hero-pattern`, `.card-lift` | **Retired 2026-11-16.** Both rules and the `.hero-pattern` member of the ink-surface focus group are gone from `globals.css`. PageHero (the flat ink hero ground) and feature-icon (the inert card transition) were their last consumers; the Stage D rebuilds of `/why-choose-us` and `/testimonials` deleted those components, leaving zero source consumers. | done — rebuilt routes use `.act-band` for ink ground and `.ruled-entry` for entries; the `tests/e2e/home.spec.ts` guard still asserts no `hero-pattern` markup ships |
| `.gold-link` | `--brass-ink` text, currentColor underline, `--ink` on hover (6.25 → 12.53). | links adopt `text-brass-ink underline` inline |
| `.reveal-in` | **Retired 2026-11-17.** The rule, `@keyframes reveal-in` and the reduced-motion `animation: none` member are gone from `globals.css`. Its last consumers were the seven head `<Reveal>` wrappers, removed by the Stage E LCP fix; below-fold staggering never shipped in Phase 3, so nothing else used it. `--reveal-y` (component-set, never declared in CSS) died with the keyframes — zero consumers. | done — no entrance primitive; content ships visible and the reduced-motion block carries only the universal duration collapse. `--motion-enter` / `--ease-entrance` went with it (§4, deleted 17 Nov) |

---

### 5.3 Focus — one indicator, always measurable

```
@layer base {
  * { @apply border-border outline-ring; }          /* was outline-ring/50 → 2.88:1 */
  :focus-visible { outline: 2px solid var(--ring); outline-offset: 2px; }
}
@layer utilities {
  /* one indicator per control: the ring channel is closed here so a stray
     `focus-visible:ring-2` on a CTA cannot stack a second ring outside it */
  .btn-primary:focus-visible,
  .btn-quiet:focus-visible {
    outline: 2px solid var(--ring); outline-offset: 2px; box-shadow: none;
  }
  /* must stay last in the layer — same specificity as the rule above */
  .act-band :focus-visible,
  .bg-primary :focus-visible { outline-color: var(--focus-on-ink); }
}
```

| Indicator | Value | Measured against its surface |
|---|---|---|
| Light surfaces (base fallback, CTA set) | `--ring` = `--ink` `#282E3F`, 2px, offset 2px | **12.53:1 on paper** · **11.13:1 on sand** |
| Ink surfaces (`.act-band`, `.bg-primary`) | `--focus-on-ink` = `--brass` `#CF9455`, 2px, offset 2px | **5.17:1 on ink** |
| What this replaced | `--ring` at 50% alpha over paper (`#919296`) | **2.88:1 — failed 3:1** (2.79:1 on sand) |

Rules: outline only (no border, no padding, no layout shift); `outline-offset: 2px` so it never
hugs the glyphs or the filled edge; `.btn-primary`/`.btn-quiet` carry the same outline at
higher specificity so it survives a `<Button>`'s `outline-none`, and they close the ring channel
with `box-shadow: none` — a `focus-visible:ring-2` also paints through `box-shadow` at the same
0,2,0 specificity, so without that line a CTA that authors a ring would show the outline *and* a
second ring 2px outside it; focus never stacks a second cue on the same element (the CTA
underline is hover-only from now on); `.ruled-entry`'s
`focus-within` hairline is a container state, not an outline — the focused element inside it
still gets the one outline. Reduced motion is unaffected (outlines do not animate).

**Residual, owned by the engineer — the shadcn controls.** They opt out of the token outline
with `outline-none` and paint their own `focus-visible:ring-3 ring-ring/50`, which is 2.88:1 on
paper: under 3:1. The token layer leaves that opt-out alone on purpose (an `!important` outline
would defeat the opt-out mechanism and double every future custom focus style), so this is a
component change, and it must land before these controls ship:

| File | Ships with | Prescribed change |
|---|---|---|
| `button.tsx`, `input.tsx`, `textarea.tsx`, `select.tsx`, `accordion.tsx` | `outline-none` + `focus-visible:ring-3 ring-ring/50` | delete both from the focus string — the token outline becomes the indicator |
| `badge.tsx` | `focus-visible:ring-[3px] ring-ring/50`, no `outline-none` | delete the ring; imported nowhere, so nothing ships doubled today |

Until that lands, the only indicator on a focused form control is a 2.88:1 ring. Home is
already clean: its CTA anchors carry a full-strength `ring-ring`, and the token layer both
supplies the outline and silences the redundant ring (rule above), so exactly one indicator
paints.

---

## 6. Dark mode

**None.** The design is a paper book: light only. The `@custom-variant dark` line is kept
because shadcn components ship `dark:` classes that must keep resolving, but **no `.dark`
token block exists** and `color-scheme: light` is pinned in `:root` so native inputs, scrollbars
and form controls never flip to a dark UA theme. Any `dark:` class in the codebase is inert
(nothing ever adds `.dark` to `<html>`). Adding a dark theme later means authoring a second
palette and re-measuring every pair — it is not a token flip.

---

## 7. Imagery — founder plate, interim grade

**Reshoot brief stays as written** (vibe-board §7): seated at the desk, window daylight,
plain sandstone-plaster or navy wall, plain shirt, hands and one closed file, 50mm, 4:5 and
1:1, no flash, no sunglasses. Until it arrives the existing `father.jpg` (1000×1334) is used
**graded and cropped**, never re-endorsed.

### 7.1 Crop (exact, in source pixels)

```
sharp("father.jpg").extract({ left: 258, top: 150, width: 360, height: 450 })
```

- 360×450 = exact **4:5**. `top: 150` leaves ~45px above the crown; `bottom: 600` sits
  **above the raised hand** (the fist begins at y≈600); the face centre (x≈445) sits on the
  crop centre (438). No arch, no circle, no frame, square corners.
- What the crop keeps: head, neck and shoulder line, shade-net background. What it removes:
  the raised hand, the sunglasses' frame context, the brocade kurta (only the collar survives
  at the bottom edge — a side benefit: the loudest garment in the frame is gone).
- Output 600×750 (lanczos3, ×1.67 from the native 360×450) as AVIF + WebP. Render at
  **`max-w-[300px]`** (`width={300} height={375}`, `sizes="(min-width:1024px) 300px, 40vw"`).
  The crop is only 360px wide natively, so a small plate is the honest size — the caption
  and the name do the trust work, not the pixels.

### 7.2 Grade (exact; sharp channel matrix, sRGB)

```
sharp(src)
  .extract({ left: 258, top: 150, width: 360, height: 450 })
  .recomb([
    [1.42, 0.01, 0.00],
    [0.04, 0.82, 0.02],
    [0.04, 0.02, 0.96],
  ])
  .modulate({ saturation: 0.55, brightness: 1.06 })
  .resize(600, 750, { kernel: "lanczos3" })
```

The matrix lifts red, trims green and leaves blue alone — the cyan/green cast is a
green-and-blue lift, so it is undone at the channel level, not with a tint overlay.
Desaturation (0.55) then stops the brocade and the shade-net from shouting.

Measured before/after, **patch coordinates are plate-local** (so anyone can reproduce them
on the 360×450 crop):

| Patch (plate x,y,w,h) | Raw | Graded | Verdict |
|---|---|---|---|
| cheek `112,285,80,45` | `88,92,71` · G/R 1.05 | `119,92,88` · G/R **0.77** · B/R 0.74 | neutral, warm |
| forehead `120,140,90,50` | `64,79,62` · G/R 1.23 | `90,76,73` · G/R **0.84** · B/R 0.81 | no green |
| neck `150,360,60,40` | `84,86,62` · G/R 1.02 | `112,85,79` · G/R **0.76** · B/R 0.71 | matches face |
| shade-net background `25,20,90,70` | `119,230,224` · B/R 1.88 | `196,210,224` · B/R **1.14** | cool daylight, not teal |

**Acceptance test (objective — rerun the patch means on the graded crop):** cheek and neck
G/R ≤ 0.85, forehead G/R ≤ 0.88, background B/R ≤ 1.20. If any fails, the plate is not
usable: move it to `/about` at ≤200px and run the home hero **type-only**. A hero with no
portrait is more trustworthy than a party photo in a suit-shaped frame.

**No overlay or CSS filter is approved as a substitute.** An `--ink`/`--sand` overlay cannot
remove a hue cast, and no `filter` chain reproduces the matrix without dragging the skin
pink. The plate must be pre-processed (sharp is already a dependency — this is a build-time
asset step, not a runtime filter).

**Read the photograph honestly before it ships.** The grade fixes the colour; it cannot fix
the sunglasses. The plate is therefore a *small* plate beside type, never a full-bleed hero,
and it stays logged as KNOWN_ISSUES #1(a) until the reshoot arrives.

**Plate captions** are `.rail-label`: "Parbhati Lal Sharma", "Principal Consultant · Jaisalmer",
and for the founder only "Since 2001". No rating, no credential, no invented role.

---

## 8. Verification

```
cd site
node tools/contrast-check.mjs > ../docs/design/discovery/contrast-evidence.json
```

Re-run after the rewrite: **19 pairs, every value reproduces** (whatsapp/paper 5.89,
whatsapp/sand 5.23, brass/ink 5.17, ink/brass 5.17, error/paper 6.06, ink-muted/paper 7.10,
brass-ink/paper 6.25, white/whatsapp 6.36, white/error 6.54, ink/paper 12.53, ink/sand 11.13).
The three rows below 4.5 are **not text pairs** and pass at their applicable threshold:
`line-input/paper` 3.66 and `line-input/sand` 3.25 (controls need 3:1), `line/paper` 1.43
(decorative hairline), plus the deliberately-retained `#0F8344` defect row (4.47, must fail —
it is the evidence for KNOWN_ISSUES #16).

**Focus indicators (§5.3), measured after the fix:** `--ring` `#282E3F` = **12.53:1** on
paper and **11.13:1** on sand; `--focus-on-ink` `#CF9455` = **5.17:1** on ink. The pair it
replaced — 50% `--ink` over paper (`#919296`) — measures **2.88:1** (2.79:1 on sand) and is
gone from the token layer.

**Focus cascade, checked in the compiled CSS** (real Tailwind 4.3.3, all candidates including
`focus-visible:ring-2`, `focus-visible:ring-ring`, `focus-visible:outline-none`): the ring
utility lands at byte 5 498, `focus-visible:outline-none` at 6 320, the CTA outline rule at
15 586 and the ink-surface override last at 16 344. Equal specificity everywhere, so source
order decides: the outline wins over `outline-none`, `box-shadow: none` wins over the ring's
`box-shadow`, and `outline-color` on ink surfaces wins over the CTA shorthand's colour. One
indicator, deterministically. The evidence file re-runs identical after the change (19 pairs,
`deep-equal: true`).

**Encoding note:** the committed evidence file was UTF-16LE (a PowerShell `>` redirect) and
could not be parsed by any JSON tool. It is regenerated here as UTF-8 with **byte-identical
values** (`deep-equal: true` against the previous file). Use a `>` redirect from a POSIX
shell, or `| Set-Content -Encoding Ascii` on PowerShell, when regenerating.

Also verified, without running the app: the stylesheet parses clean (lightningcss) and
**compiles with the project's own Tailwind 4.3.3** — every token above resolves, `@apply` in
`@layer base` resolves, and the generated utilities are correct (`text-display` →
clamp + 1.05 + −0.025em + 400; `rounded-xl` → 3px; `max-w-page` → 72.5rem; `ease-standard` →
`cubic-bezier(0.2,0,0,1)`; `bg-paper` → `var(--paper)`).

---

## 9. What the engineer must know (gotchas)

1. **`text-accent` on light is now a defect.** It is brass `#CF9455` (2.43:1). Old components
   use `text-[color:var(--accent)]` for headings on navy (fine, 5.17) and on paper (none
   today — keep it that way). Accent *text* on light is `text-brass-ink`.
2. **Focus is a solid outline now (§5.3).** The old `outline-ring/50` default measured
   **2.88:1** on paper; `:focus-visible` now ships `2px solid var(--ring)` at 2px offset
   (**12.53** paper / **11.13** sand) and `var(--focus-on-ink)` inside `.act-band`
   and `.bg-primary` (**5.17** on ink). Do not re-introduce an alpha focus
   colour, and do not add a second cue to `.btn-primary`/`.btn-quiet` — they already carry
   the outline. Components that opt out with `outline-none` (`button`, `input`, `textarea`,
   `select`, `accordion`) still paint `ring-ring/50` at 2.88:1 — the fix is to delete their
   `outline-none` **and** the ring from the focus string, never to raise the alpha (see §5.3
   residual for the file table).
3. **`Button variant="outline"` uses `border-border`** (1.43:1) — fine for a decorative
   frame, fatal as a control boundary. Outline buttons/inputs need `border-line-input`.
4. **`--border` is `--line`.** Do not "fix" it to `line-input` globally: every divider on the
   site would go dark.
5. **`--card` is now the same value as `--background`.** Existing `bg-card` cards lose their
   tonal separation and will read as flat ruled boxes (radius 2px, `--line` border) until
   they are converted to `.ruled-entry`. That is intended, not a regression to paper over
   with a new grey.
6. **`--popover` is sand.** Any menu that stacks on sand needs `border-line-input` to stay
   legible as an edge.
7. **Icon tiles** (`bg-secondary text-primary`) are now sand-on-paper (1.13:1). They are
   nearly invisible by design — icons are being retired in favour of the numbered rail.
8. **Radius:** `rounded-full` survives only on the WhatsApp float. `rounded-t-[999px]`
   (the old founder arch in `page.tsx`) is an arch — it must go, with the plate.
9. **`<Reveal y={24}>` still passes 24**; `.reveal-in` clamps it to 8px. Pass `y={8}` (or
   omit) when the component is rewritten, so the CSS clamp isn't load-bearing.
   *(Superseded 17 Nov: the wrapper and the clamp are both gone — see §5.2. Kept as the record of
   why the 8px cap existed.)*
10. **Body is 17px** (`--text-body`). Form fields must be ≥16px or iOS zooms the page — keep
    the slip's inputs at `text-body`/`text-base`, not `text-sm`.
11. **Fonts:** if `--font-display` is missing (Fraunces not loaded), headings fall back to
    Inter silently. Check the loaded `<html>` class after wiring; a silent fallback is the
    one failure this contract cannot report.
12. **Alpha-modified brand colours are unmeasured composites.** `bg-accent/90`,
    `border-accent/50`, `ring-accent/60` (all present in today's components) blend with
    whatever is underneath and are not in the evidence file. Use solid tokens; if a state
    needs a tint, it comes back to the art-director for measurement.
13. **Never add a colour to a component.** If a state needs a colour that is not in §1, it
    comes back to the art-director for measurement, not into a class name.

### 9.1 Scan boundary — only site source is compiled

```css
/* in globals.css, after the three @imports; base = this file */
@source not "../../repos";
@source not "../../docs";
@source not "../../.opencode";
@source not "../../logos";
```

Tailwind v4's automatic detection walks up to the git root, and markdown, JSON, SVG and CSS
are all valid sources. So four non-site directories were feeding the compiler: prose in
`docs/**`, the a11y evidence snapshot `docs/design/a11y/phase-2-2026-11-15/served-home.css`
(a copy of a previous compile), agent prompts full of class examples in `.opencode/agents/*.md`,
and the logo assets in `logos/`. Each one re-seeds dead utilities on every build — a doc
quoting a selector is enough to compile it.

**Correction of record:** the leaked `data-[size=default]:h-8` rule came from
`docs/design/PHASE_STATUS.md` (the brief quoting the class), not from `repos/`. `repos/` is
git-ignored, so the automatic scan never reached it; its directive is a guard only.

Measured with the real compiler (tailwindcss 4.3.3 + oxide scanner, auto root = git root):

| Source set | files scanned | candidates | CSS |
|---|---|---|---|
| no exclusions | 147 | 4 710 | 93 468 B |
| shipped boundary | 63 | 2 498 | **87 011 B** (−6 457 B, −6.9 %) |

Per directory, forced positive vs. negated: `docs/` 25 files, `logos/` 51, `.opencode/` 8 — all
to zero; `repos/` 14 520, already excluded by `.gitignore`.

Survivors, checked in the compiled output (measurement of 15 Nov, **before** the 16 Nov retirement
of `.hero-pattern`, which has since left the sheet; everything else below is unchanged):
`.ledger-rail`, `.hero-pattern`, `.slip`,
`.ruled-entry`, `.placeholder-mark`, `focus:bg-paper` (the skip link), `data-[size=default]:h-10`
(select), `transition-[color,background-color,border-color]` (header) and `outline-color:
var(--ring)` from the base `@apply outline-ring`. Gone: `data-[size=default]:h-8`, bare
`.bg-paper` and `.text-display` — phantoms that never had a site source.

Studio rule: a class name written anywhere inside the scan is a class name. Design docs may
quote CSS only if they stay outside it.
