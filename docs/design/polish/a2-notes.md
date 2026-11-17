# Polish pass A2 — art-direction notes

Author: art-director · 17 Nov 2026 · branch `polish-pass` (base `7ccbf75` + B4)
Lane touched: `site/app/globals.css`, `docs/design/phase-2/tokens.md`, this file.
No component code, no git, no server. Verified with the real Tailwind compiler,
lightningcss and `tools/contrast-check.mjs` (read-only), not with a browser.

---

## 1. The action bar — final geometry

| Item | Value | Why |
|---|---|---|
| Breakpoint | **below 48rem** (`max-width: 47.999rem`); `display: none` at ≥48rem | 48rem is the header's own `md`: there the contact strip makes the phone number persistent in the header, so the bar's **Call** has a home. Below it the header carries only the logo and the `/book` CTA, and Call + WhatsApp are the page's only persistent actions. One boundary for the whole chrome layer, not a second invention. |
| Position | `fixed; inset-inline: 0; bottom: 0; z-index: 40` | `40`, not `50`: the sticky header, the sheet and every dialog stay on top. The bar never occludes them. |
| Height | **61px** = `--bar-h: 3.8125rem` = 44px anchor + 2×8px padding + 1px top rule | `--safe-bottom` is added *outside* `--bar-h`, as extra bottom padding, so the paper ground reaches the home indicator while the token and the reserve still agree to the pixel. |
| Ground | paper, no radius, no shadow, `border-top: 1px solid --line-input` (3.66:1) | The bar is chrome laid over the page, not a second act band. The top rule is the boundary; tone contrast alone (paper on paper) would not read as an edge. |
| Layout | `grid-template-columns: 1fr 1fr; gap: 0.5rem;` padding `0.5rem` block / `max(0.75rem, --safe-left|right)` inline | Two equal thumbs; 12px inset is tighter than the 20px page gutter on purpose — a tool bar needs the width for its actions. |
| Anchors | `min-height: 2.75rem`, 15px/500 Inter, 2px radius, full cell width | 44px at **every** pointer, not only coarse: the bar exists only below 48rem, where a thumb is the input even on a narrow desktop window. |
| Call | quiet: `1px --line-input` border (3.66), `--ink` text (12.53), hover 2px `--brass-ink` underline (6.25) | Stated, not sold — the same grammar as `.btn-quiet`, given a boundary because it is a full-width control. |
| WhatsApp | solid: `--ink` fill, `--paper` text (12.53), hover 2px `--brass` underline (5.17) | The page's one solid, in the site's paper-on-ink grammar. **Brass fill is not used:** the act band owns the one brass rectangle per page; a permanent brass bar at the bottom of every screen would outrank the page's own ask. |

**Bottom reserves — three bands, never summed.** The footer carries them (body padding would
expose paper under the ink footer):

| Width band | Footer `padding-bottom` | Covers |
|---|---|---|
| < 48rem with the bar | `calc(var(--bar-h) + 1rem + var(--safe-bottom))` = 77 + safe | bar 61 + 16 air |
| < 81rem without the bar (`/book`, and 48–80.999rem) | `calc(5rem + var(--safe-bottom))` = 80 + safe | float 56 + 16 inset + 8 air |
| ≥ 81rem | base `--safe-bottom` only | the container's outer margin absorbs the float |

`body:has(.sticky-action-bar) > footer` (0,1,2) out-ranks the flat `body > footer` band (0,0,2),
so the bar's band replaces the float's — it never adds to it. `/book` has no bar, keeps the
float, and stays on the float band. The bar is deliberately shorter than the float band (77 < 80),
so even if both rules ever applied the content would still clear.

**What the bar must never do** (recorded in tokens.md §5.1): no brass fill, no shadow, no icons,
no classes on the anchors, no render on `/book`, no z-index above 50, no moving the 48rem
boundary without re-checking `--header-h` and both reserves.

---

## 2. The float — swap, and one deliberate deviation

**Swapped.** `body > a[href^="https://wa.me"]` → `a.whatsapp-float`. Element + class (0,1,1)
because the component still ships `.bottom-4` / `.z-50` / `.flex`; that wins on specificity
without `!important` and without touching component code. When B5 strips those utilities the
`a` can go. Declarations unchanged: 16px + `--safe-*` insets, `z-index: 40`.

**Deviation from the brief's default (offset above the bar): the float is retired where the
bar renders.** Below 48rem on the 8 bar pages, `body:has(.sticky-action-bar) a.whatsapp-float`
is `display: none`. The bar already carries WhatsApp **with the same unattributed prefill** —
a 56px circle 16px above a bar with that same action is the same destination twice on a 375px
screen, which the studio's one-voice rule forbids. Above 48rem nothing changes (float at the A1
inset), and `/book` keeps its float at every width because it has no bar and the form's send
button is the only other WhatsApp path.

If the owner prefers the brief's version, it is one declaration — replace the `display: none`
block with:

```css
@media (max-width: 47.999rem) {
  body:has(.sticky-action-bar) a.whatsapp-float {
    bottom: calc(var(--bar-h) + 1rem + var(--safe-bottom));
  }
}
```

No reserve changes are needed for that variant: the float would sit on the bar's 77px reserve,
inside it.

**Fallback if `:has()` is unsupported** (pre-Chrome 105 / Safari 15.4 / Firefox 121): the float
stays visible and its 16px inset puts it over the bar's right cell — both open the same
conversation, but it looks wrong. Baseline 2023 is inside the project's target range; the same
`display: none` could be written unconditionally below 48rem if that ever stops being true.

---

## 3. og:image font — verdict: ACCEPT Georgia

Georgia stays. Rationale:

1. **The card is read as a thumbnail.** `og-default.png` is 1200×630 but surfaces at roughly
   300–500px wide in WhatsApp, Slack, X and LinkedIn. At that size the difference between Georgia
   and Fraunces is invisible; what carries the brand is the ink ground, ivory type, brass rule and
   mark — none of which changes.
2. **Same register, not a different one.** Georgia is a transitional serif with old-style figures;
   the ledger voice survives. B3's render was inspected and reads clean; it is not a default
   sans or a didone.
3. **The alternative is build machinery for a thumbnail.** librsvg resolves families through
   fontconfig only — it ignores `@font-face` inside an SVG and cannot see next/font's hashed
   `woff2`. Installing Fraunces machine-wide was declined, correctly.

**If the owner later wants exact Fraunces** (B5 option, engineer's lane — documented, not done):

1. Copy the variable TTF from the Google Fonts repository at a pinned commit —
   `ofl/fraunces/Fraunces[SOFT,WONK,opsz,wght].ttf` — into `site/assets/fonts/`, and
   `site/assets/fonts/OFL.txt` beside it (SIL OFL 1.1 requires the licence to travel with the
   font; the file is redistributable).
2. Add `site/og/og-default.html`: the card at exactly 1200×630 CSS px with
   `@font-face { font-family: "Fraunces"; src: url("../assets/fonts/Fraunces[SOFT,WONK,opsz,wght].ttf") format("truetype"); font-weight: 100 900; font-optical-sizing: auto; }`,
   `font-variation-settings: "SOFT" 0, "WONK" 0;` (the site's pinned values), `opsz` ≈ 144 (display
   cut), `wght` 400, tracking −0.025em, ink `#282E3F` / paper `#FAF6EC` / brass `#CF9455`.
3. Add `site/scripts/og-card.mjs`: Playwright (already a dev dependency), `page.setViewportSize({ width: 1200, height: 630 })`, open the HTML, wait for `document.fonts.ready`, screenshot to
   `public/images/og-default.png` at scale 1.
4. Commit the PNG. The script runs on demand, not in the build — no network at build time and no
   fontconfig change on any machine.

The Georgia PNG remains the committed artifact either way.

---

## 4. Carried for the owner / A3

1. **Rail case.** The rail stays uppercase (`01 — SERVICES`). The owner's literal `01 / Services`
   is one declaration away — remove `text-transform: uppercase` from `:where(.rail-label)` — but
   it restyles every marker on every page; ask first. (Carried from A1.)
2. **`/book` float on phones.** The float is kept there, so it can sit over the right edge of the
   full-width submit when the button is in the bottom 80px of the viewport. Focused fields are
   safe (`scroll-margin-block-end: 5rem`), and the form's own button is the WhatsApp path, so the
   clean fix is to hide the float on that page below 48rem — a product decision, not a CSS gap.
   T13 should confirm whether it actually bites.
3. **Landscape phones.** The bar costs 61px of a 375px-tall landscape viewport. It follows from
   "phones-only" taken literally; if the owner finds it heavy we hide it under
   `(max-height: 26rem)` rather than moving the width boundary.
4. **Sample chrome is preview-only.** The brass `.sample-banner` above the header plus the header's
   own `--safe-top` doubles the notch band in preview mode on notched phones (logged in A1 §2.9).
   Production has no banner, so no change.
5. **One existing E2E assertion now counts two `<nav>`s.** `tests/e2e/home.spec.ts:287` expects
   `page.locator("nav")` to have count 1; the bar adds a second (`aria-label="Quick actions"`).
   The DOM has both at every width (the bar is `display: none` above 48rem, the header nav is
   `hidden lg:flex`), so only one is ever in the accessibility tree — but the locator counts nodes.
   QA should scope it (`header nav` or `nav[aria-label="Quick actions"]`); tests are the
   qa-engineer's lane, not this pass's. Nothing else in the suite is affected: the bar adds a fifth
   `tel:` link (the `≥ 4` assertion still passes) and no new headings or images.

---

## 5. Final CSS review — checklist

Re-read `globals.css` end to end (tokens → base → primitives → A1 → A2 → focus-on-ink →
reduced-motion).

| # | Check | Result |
|---|---|---|
| 1 | lightningcss parse, no errors | **PASS** — 17 161 B |
| 2 | Bar base `display: none` precedes the media block; nothing else sets `display` on the nav | **PASS** |
| 3 | `a.whatsapp-float` sits after the generated `.bottom-4` / `.z-50` utilities and out-ranks them (0,1,1) | **PASS** |
| 4 | Footer reserves: three bands, `:has` override after the flat band, no `calc()` sums | **PASS** |
| 5 | `tools/contrast-check.mjs` deep-equal to `contrast-evidence.json` | **PASS** — 19 pairs |
| 6 | Every new pair is an existing measured pair (ink/paper 12.53, paper/ink 12.53, ink/brass 5.17, brass-ink/paper 6.25, line-input/paper 3.66) | **PASS** |
| 7 | No `!important` outside the reduced-motion block; no new transition or animation (the bar is static; hover is an instant rule) | **PASS** — reduced-motion block untouched |
| 8 | z-index ladder: content < bar/float 40 < header/sheet 50 < skip link 60 | **PASS** |
| 9 | Touch floors: bar anchors 44 at every pointer (not only coarse); the coarse block still covers `.btn-quiet`, header, footer, sheet | **PASS** |
| 10 | `--bar-h` emitted in `:root` and used by the reserve; no dead token added | **PASS** — 1 declaration, 1 consumer |
| 11 | The focus-on-ink group still closes the utilities layer; no selector added after it | **PASS** |
| 12 | No `100vh` / `h-screen` reintroduced; the bar uses viewport-fixed, not viewport units | **PASS** |
| 13 | Accessible names contain the visible labels ("Call the office · number" ⊃ "Call"; "Book a consultation on WhatsApp" ⊃ "WhatsApp") — WCAG 2.5.3 | **PASS** |
| 14 | The bar's fixed positioning is not captured by an ancestor: no `transform`/`filter`/`contain` on `main` or `.ledger-rail` | **PASS** (source read) |
| 15 | Rail-num, sample chrome, density, phone-number rules untouched by this batch | **PASS** |

**Could not verify without a browser (T13):**

- Bar height on iOS Safari with a real inset (token says 61 + inset; tokens.md §3).
- The footer's last line clearing the bar by 16px at full scroll on all 8 bar pages.
- Label fit at 320px (`WhatsApp` ≈ 78px in a ~144px cell — arithmetic says yes).
- The exact 48rem handover: at 767px bar on / footer 77; at 768px bar off / footer 80; float
  reappears at the A1 inset.
- `/book` float vs the full-width submit (§4.2).
- Landscape phone weight (§4.3).
