# Polish pass A1 — art-direction notes

Author: art-director · 17 Nov 2026 · branch `polish-pass` (base `bcbc05a` + batch B2)
Lane touched: `site/app/globals.css`, `docs/design/phase-2/tokens.md`, this file.
Nothing here needs a build: the CSS was checked with the real Tailwind compiler and the
lightningcss parser, not with a browser (no servers/builds this batch).

---

## 1. B3 markup contract — the section numeral (T5)

**Replace, site-wide, on section rail labels only:**

```tsx
{/* before */}
<p className="rail-label">§ 01 · Services</p>

{/* after */}
<p className="rail-label rail-num">
  <span className="rail-num-figure" data-numeric>01</span>
  <span className="rail-num-rule" />
  <span className="rail-num-text">Services</span>
</p>
```

Rules for the swap:

1. **Class list is `rail-label rail-num`.** `.rail-label` keeps the type (12.5px / 500 / tracked /
   uppercase); `.rail-num` only lays out the three parts. Do not use `.rail-num` alone.
2. **Three children, in that order, every time.** The figure, an empty `<span class="rail-num-rule" />`
   (the brass hairline — it replaces the `/`, so no literal slash, no `·`, no `§`), then the words.
   The rule span is empty and has no `aria-hidden`: there is nothing to announce.
3. **Two digits.** `01`…`09`, `10`… — pad with `padStart(2, "0")` as the pages already do.
4. **Keep `data-numeric` on the figure.** `.rail-num-figure` already sets `tabular-nums`; the
   attribute keeps the page's convention that a figure is a figure (Home §03, /about §01 already do
   this).
5. **Wording loses the § and the `·`.** `The record`, not `§ 03 · The record`. Sentence case in the
   source: the uppercase you see is `text-transform` from `.rail-label`, one declaration for the
   whole rail.
6. **Only numbered sections.** These stay plain `.rail-label`:
   - the hero identity markers (`P.L. Sharma & Co. · About · Jaisalmer`),
   - the act band's `The next step` (it is the close, not a section — it keeps `text-brass`),
   - plate captions and entry numerals (`01` inside a `.ruled-entry` row: those are already
     number-first furniture and keep their current markup).

What the screen reader gets: `01 Services`. What a summariser gets: a number, a rule, a name — the
two-level system intact (tiny rail furniture above, content `h2` below).

**Decision — the rail stays uppercase.** The owner's written pattern is `01 / Services`; rendered,
it reads `01 — SERVICES`. That is the rail's established voice (every marker on every approved page
is uppercase, 13px-ish, tracked) and changing it would restyle ten markers on Home alone without a
screenshot pass. If the owner wants the literal mixed case, it is **one** declaration —
remove `text-transform: uppercase` from `:where(.rail-label)` — and the numeral system does not
change. Ask before doing it.

---

## 2. B4 notes — markup and meta that CSS cannot supply

| # | Change | Why / exact shape |
|---|---|---|
| 1 | `export const viewport`: add `viewportFit: "cover"` | Nothing in §3 of tokens.md does anything until the layout opts into the full-bleed viewport. Without it every `env(safe-area-inset-*)` is 0 and the design is simply unchanged — the CSS is safe either way. |
| 2 | Keep `themeColor: "#282E3F"` | It matches the sticky ink header. In preview mode the brass `.sample-banner` sits above the header, so the browser chrome reads ink while the first strip is brass — acceptable, preview-only; do **not** change theme-color to brass. |
| 3 | Candidate: `interactiveWidget: "resizes-content"` | Wanted so the Android keyboard resizes the layout instead of overlaying the slip's submit button. **Verify against the bundled Next docs first** (`node_modules/next/dist/docs/` → viewport / generate-viewport); if this Next version does not expose `interactiveWidget` in the `Viewport` type, drop it — it is a progressive enhancement, not a requirement. |
| 4 | `<body className="… min-h-dvh">` | `layout.tsx` uses `flex min-h-full flex-col` on `<body>` with `h-full` on `<html>`. The gradient `100%` chain is correct but does not track the mobile URL bar; `min-h-dvh` does. No CSS in `globals.css` uses `100vh` (verified — zero hits), so this is the only dvh change needed. Keep `h-full` on `<html>`. |
| 5 | Add `className="whatsapp-float"` to the float anchor | The CSS currently hooks `body > a[href^="https://wa.me"]` (the only body-level wa.me link). A class is more honest to read and survives a URL change. When it lands, swap the selector in `globals.css` — the declarations stay identical. |
| 6 | Skip link: `focus:top-4` → keep, but note `top-4` is inside the safe area | On a notched phone in landscape the skip link can land under the notch. If B4 touches it, `focus:top-[max(1rem,var(--safe-top))]` is the honest value. Cosmetic; not a blocker. |
| 7 | Sticky bottom action bar (not this batch) | When B4 renders it: `<body>` needs `padding-bottom` equal to the bar's height, the float must move above the bar (`bottom: calc(var(--bar-h) + 1rem)`), and the bar must not double up with the float's 80px footer clearance. Reserve `--bar-h` as a token then — A2 can style it in one pass. |
| 8 | `x-icon` / menu sizes | Nothing to change: the sheet close button and header buttons are raised to 44×44 by CSS (`[data-slot="sheet-close"]`, `[data-slot="sheet-content"] [data-slot="button"]`, `body > header [data-slot="button"]`). If the sheet's close resolves `data-slot="button"` instead of `sheet-close`, the second selector still catches it. |
| 9 | Sample banner + safe area | The banner carries `--safe-top` itself, so in preview mode on a notched phone the header also pads its own `--safe-top` — you see one extra ink band above the header at scroll-top. Deliberate: the header must be correct **after** the banner scrolls away, and `:has()` cannot detect scroll position. Preview-only, and 0px without a notch. |

---

## 3. Decisions and why

1. **Display cap 56px, floor 32px.** `/faq` and `/why-choose-us` h1s are one long sentence each;
   at 64px they set in four to five lines at 1024–1280. At 56 they set in three, and the Home h1
   keeps its editorial scale. The clamp keeps the same vw slope, so the ramp still crosses the
   whole tablet range instead of snapping.
2. **`--header-h` is arithmetic, not measurement.** 40px logo + 2×14px padding = 68 (phones);
   + 28px contact strip + 1px rule = 97 (≥48rem). `scroll-padding-top` adds 20px of air, so a ±2px
   font-metric error is invisible. Re-measure with a browser during T13 and correct the token, not
   the calc.
3. **`body > header` / `body > footer`, not new classes.** The safe-area padding needs zero markup
   change, and layout.tsx guarantees both are body's direct children. If a future page authors a
   `<header>` inside an article, it is not a body child — no false positives.
4. **Float at `z-40`.** It was `z-50`, the same layer as the sticky header and every sheet: a
   dialog opening over the float could lose the paint order. The float only ever floats over page
   content; the skip link is `z-60`.
5. **Footer clearance below 1296px (80.999rem).** The float's footprint is 72px from the right
   edge; the page container only provides that much outer margin above ~1296px viewport width.
   Below it the footer reserves the column with 80px of bottom padding instead of the button moving
   (a moving float is a worse sin than a quiet band at the very end of the page).
6. **One-fact entries at 16px padding.** Home §03 and /about §02 are five and three single lines;
   full entry padding turned them into 360px of air for 85px of text. Same rules, same hover, ledger
   density. Scoped with `:has(> p:only-child)` so entries with a heading are untouched.
7. **Sample chrome is brass, not red.** The palette has no alert colour and inventing one would
   break the one-voice rule. Brass ground + ink text (5.17) + an ink hairline edge (12.53 as a
   boundary) reads as a stamp in the brand's own ink, and cannot be mistaken for a real CTA because
   the CTA language (`.btn-primary`) is ink-filled with paper text.
8. **Touch floors only under `pointer: coarse`.** The editorial rhythm is part of the brand; a mouse
   does not need 44px of padding around a quiet phone link. Coarse pointers get 44 everywhere the
   brief names: `.btn-quiet`, header buttons, footer links, sheet links, sheet close.
9. **The narrow rail already stacked (T4c).** `.ledger-rail` is single-column below 64rem
   (`row-gap: 0.75rem`), so every marker sits above its heading with 12px between them; the only
   change needed was `text-wrap: balance` on `.rail-label`, so a two-word label in the 180px rail
   breaks 4+3 instead of 5+2. No breakpoint moved — moving one would restack every approved page's
   rail for a problem that only exists inside 64–80rem with a long label.

---

## 4. What I could not check without a browser

- **Header height** — arithmetic (§3.2). `scroll-padding-top` has slack; the T13 screenshot pass
  should confirm a heading lands ~20px below the bar.
- **Float vs body text mid-page.** The footer clearance and the field `scroll-margin` are fixable in
  CSS; a fixed 56px circle over a 375px column can still sit on the right edge of a paragraph at
  some scroll positions. A hard guarantee needs the B4 sticky bar or a reserved right gutter on
  phones — both markup decisions, not CSS ones.
- **`:has()`** — Baseline 2023 (Chrome 105, Safari 15.4, Firefox 121). On anything older, single-fact
  entries simply keep the roomier padding: a graceful, invisible fallback.
- **`.sample-tag` wrapping.** The shipped string (`SAMPLE — not real, replace before launch`) is
  ~37 characters; uppercase 12.5px with tracking is ~300px, so on a phone it will wrap to 2–3 lines
  beside a name. It is preview-only furniture and deliberately loud; if the critic finds it noisy,
  shorten the string in the component rather than shrinking the type below 12px.
- **Footer height on phones** — the coarse-pointer 44px floors add roughly 8 × 12px to the footer's
  link lists. Correct for thumbs; unchecked visually.
- **`@media (max-width: 80.999rem)`** is compiled by lightningcss to range syntax
  (`width <= 80.999rem`) for the project's browser targets; if the target list ever includes Safari
  < 16.4, lightningcss would not downlevel it and the footer clearance would not apply there.

---

## 5. Verification done

- `lightningcss` parse: OK (15 040 B before the doc edits; no errors).
- Tailwind compiler: `--header-h` theme value precedes the `@media (min-width: 48rem)` override in the
  emitted cascade; `.rail-num-figure` follows `:where(.rail-label)`; the coarse-pointer block sits
  after `.btn-quiet`; `body > a[href^="https://wa.me"]` outranks `.bottom-4` / `.z-50`.
- No new transitions or animations: reduced-motion block untouched (verified in the compiled output).
- No 100vh anywhere in `site/` (grep) — one dvh gap, in markup (§2.4).
- Contrast pairs used by the new chrome are existing measured pairs: ink/brass 5.17, ink/paper
  12.53, paper/ink 12.53. No new colour was introduced, so `tools/contrast-check.mjs` stays
  deep-equal (19 pairs).
