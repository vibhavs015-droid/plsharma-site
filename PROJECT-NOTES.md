# Tax Consultant Website — Project Notes

**Goal:** A professional website for a tax consultant (father's practice):
showcase services & experience, promote the practice, and let clients book
consultations online.

## Loaded Repositories (`repos/`)

| Repo | Stars | Purpose in this project |
|---|---|---|
| `calcom/cal.com` | ~36k | Open-source booking/scheduling engine (Calendly alternative). Powers the client booking feature. |
| `PaulleDemon/awesome-landing-pages` | 1.1k | Free HTML + Tailwind business templates. `src/law/lawfire` and `src/law/lawgroup` are professional-services layouts — strong starting point for the design. |
| `shadcn-ui/ui` | ~121k | Copy-paste professional UI components for the Next.js build. |

## Planned Stack (to confirm with user)

- **Next.js** (app router) + **Tailwind CSS** + **shadcn/ui** components
- Pages: Home / About / Services / Pricing / Contact / **Book Appointment**
- Booking options:
  1. Embed Cal.com (easiest, hosted or self-hosted from the cloned repo)
  2. Simple booking form + notification to the consultant
- Design direction: trustworthy, clean, professional (blues/neutrals), like the law templates
- Content to collect: services list, photo/bio, qualifications, testimonials, contact info, working hours

## Reference Previews

- LawFire template: https://law-fire.netlify.app/
- LawGroup template: https://lawgroup.netlify.app/

## Status

- [x] Repos loaded into `repos/` (all 3 confirmed: cal.com, awesome-landing-pages, shadcn-ui)
- [x] Requirements gathered (name, services, booking style, design, contact details)
- [x] Next.js 16 app scaffolded at `site/` (TypeScript, Tailwind v4, shadcn/ui Nova preset)
- [x] All 8 pages built: Home, About, Services, Why Choose Us, Testimonials, FAQ, Contact, Book
- [x] Booking form → opens WhatsApp with prefilled request (email fallback)
- [x] Floating WhatsApp button site-wide
- [x] Real contact details wired in (phone, email, address, hours, maps link)
- [x] Production build passes (all routes static)
- [x] Fonts upgraded: Playfair Display (headings) + Inter (body) via next/font
- [x] Scroll-reveal animations via `motion` (respects reduced-motion)
- [x] Father's photo added → public/images/father.jpg (source: father-src.jpg), wired on About page
- [x] Real names: Parbhati Lal Sharma (founder), Vikram Singh Soda, Bhawani, Hemraj
- [x] Design upgrade pass 1 (classy law-firm restyle):
      slate-navy #282E3F + warm gold #CF9455 palette, ivory background,
      navy header with gold active underlines, patterned hero with founder
      photo card + ornamental frame, stats band with dividers, numbered
      service cards with hover lift, gold-rule feature cards, serif
      testimonial quotes, eyebrow labels on all page banners, refined footer
- [x] Logo designed & wired (two rounds of hand-crafted options):
      Round 1: five concepts (ledger scales, monogram crest, pillar & ledger,
      P&L ligature, trust shield) × light/dark palettes.
      Round 2: six P&L-ligature variations (rounded, serif interlock, stacked,
      notary seal, diamond lozenge, minimal).
      User picked **06 Minimal Monogram** — stroke-built P&L ligature with
      gold rupee-coin dot in the bowl.
      Wired as: `components/site/logo-mark.tsx` (inline SVG, dual palette),
      header + footer marks, favicon `app/icon.svg` + `icon.png` 512 +
      `apple-icon.png` 180. Build passes, verified live.
      Tooling kept in `logos/` (contact sheets, per-option SVG/PNG in
      `logos/options/` + `logos/options2/`, glyph outlines + build scripts
      in `logos/tools/`) — regenerate anytime with node from `site/`.
- [x] Test & fix pass (full plan, executed beginner → advanced):
      1. Unit tests — `site/tests/booking.test.ts` (node --test), 5/5 pass:
         message builder, optional-field inclusion, wa.me URL encoding,
         multiline round-trip, emptyBooking reset.
      2. Production build regression — pass (14 static routes).
      3. HTTP integration — all 8 routes 200, exactly one h1 each, unique
         titles, no dead internal links, assets 200 (icon trio + father.jpg),
         logo + nav on every page, consistent wa.me/tel/mailto, phone digits
         everywhere; "undefined"/`{}` scan hits were script-payload false
         positives; visible PLACEHOLDER copy replaced with presentable
         interim text (team roles/bios, qualifications).
      4. Browser UI automation — home console clean; mobile sheet opens with
         9 links and navigates (Radix `data-scroll-locked` leftover is
         cosmetic; scroll verified); FAQ accordion 7 triggers single-mode
         open/close; booking flow end-to-end with stubbed window.open:
         empty submit blocked, 7 services + 3 slots selectable, exactly one
         popup, decoded WhatsApp URL contains every field, SENT card shown,
         reset clears form.
      5. Buttons/files — no unequal button pairs on any page; favicon trio
         + photos served 200.
      6. Alignment & typography audit (all 8 routes) — zero horizontal
         overflow; h1–h3 all Playfair Display; body Inter (form inputs 16px
         on mobile via Nova preset `text-base md:text-sm` — prevents iOS
         focus zoom); containers exactly 1152px; labels consistent 14px/500;
         only false-positive clips (sr-only spans, contained decorative
         bleed).
      Bugs found & fixed during the pass:
      - phone `pattern` crashed Chrome validation (v-flag regex) →
        escape-free `[0-9+ ()-]{8,16}`; double-submit → pending state +
        disabled submit; past dates → `min` set client-side (Cache
        Components forbids `new Date()` at prerender); no post-send path →
        SENT card + "Book another appointment" reset; About CTA used raw
        `<a>` → `Link`; visible placeholders → interim copy; contrast:
        `--gold-ink` darkened to `#854E24` (6.1:1 on muted) and WhatsApp
        green `#25D366` → `#0F8344` (4.8:1 with white) in float, contact
        tile and sent-card icon; footer `h3` columns broke heading order on
        h1-only pages → added sr-only `h2` "Site footer".
      Lighthouse after fixes: Home 100/100/100, Contact 100/100/100
      (Accessibility / Best Practices / SEO), zero failed audits.
      Note: Turbopack dev served stale CSS after editing globals.css until
      `.next` was deleted and dev restarted — if a token change "doesn't
      apply", clear the cache before doubting the edit.
- [x] Stats made truthful (Nov 2026): user confirmed ~25 years in practice →
      `establishedYear` 2001, stats band = 25+ Years / 2001 Serving Jaisalmer
      Since / 1:1 Personal Attention / 100% Confidential. Invented numbers
      (5,000+ returns, 1,200+ clients) removed — do not re-add without real data.
- [x] Qualifications section removed from About page for now (re-add when the
      father provides his real credentials).
- [x] Domain researched (13 Nov 2026, via official RDAP registry checks):
      plsharma.com / sharmatax.com / plsharma.in taken. Available:
      plsharmaco.in ($7.83/yr flat), plsharmaco.co.in ($5.80/yr),
      plsharmatax.com, plsharmaandco.com ($11.81/yr), plsharmaandcompany.in,
      sharmatax.in, plsharma.xyz (renewal trap $14). Recommended: buy
      **plsharmaco.in at Porkbun**. Full comparison + DNS records in
      `DEPLOYMENT.md`. Free real domains no longer exist (Freenom dead);
      free subdomains are preview-only, not for a business.
- [x] Deployment readiness:
      `lib/site-config.ts` gained `siteUrl` (env `NEXT_PUBLIC_SITE_URL`
      overrides, default https://plsharmaco.in); layout gained
      `metadataBase` + og:url + `viewport` themeColor; every page has a
      self-referencing `alternates.canonical`; new `app/robots.ts` +
      `app/sitemap.ts` (all 8 pages, no `new Date()` — Cache Components
      safe). Verified on the production build (served on :3001):
      robots.txt lists sitemap, sitemap.xml lists all pages, canonical +
      og:url + theme-color present in HTML. 16 static routes build clean.
      Step-by-step host + domain + DNS + post-launch checklist in
      `DEPLOYMENT.md`.
- [x] Hallmark design audit + two fix rounds (13 Nov 2026):
      Baseline: 108 FAIL / 78 REFLEX / 53 WARN over 8 routes ×3 viewports
      (findings in `site/.hallmark/before.txt`, screenshots in
      `site/.hallmark/before/`). Round 1: globals.css rewritten (dark-mode
      block deleted, warm-tinted neutrals, whatsapp token, named
      transitions, overflow-x clip, balance/pretty text-wrap); Reveal is
      now a pure server component (CSS-only load-time entrance, visible at
      rest, reduced-motion safe — also killed the hydration-mismatch
      warnings); all decorative "eyebrow" labels deleted sitewide
      (PageHero/SectionHeader lost the prop); emoji contact icons →
      lucide; nav underline scaleX; hero rewritten (h1 + one sentence +
      actions); hero fills the first screen on lg; photo-card gradient
      overlay removed; blur orb removed; home FAQ preview uses a
      first-sentence excerpt (clamped text painted under the next item).
      Round 2: Hallmark stamp added as line 1 of globals.css (genre
      editorial, theme custom navy-gold user-named, redesign: polish,
      answered F18/F19, waived 49b); `--input` darkened to
      oklch(0.65 0.016 258) (field edges 3.9:1); FAQ accordion questions
      shortened to fit one line at 320px (floor gate); sheet scrim solid
      bg-black/40 (no blur); ghost card numerals removed (failed
      contrast); sr-only h2 added on FAQ + Why-Choose-Us (heading order);
      hero paragraph trimmed to 11 words.
      Final: sloplint **0 FAIL / 0 WARN / 8 WAIVED / 18 ANSWERED / 33
      NOTE** (screenshots in `site/.hallmark/shots/`); unit tests 5/5;
      Lighthouse accessibility **1.0 on all 8 pages**. The 33 NOTEs are
      composition-level (word budgets per screen, 3-section pages,
      section-head scale, subpage hero height) — kept as-is under
      `redesign: polish`, needs the owner's call, listed in DEPLOYMENT/notes.
      Command for re-runs (dev or `next start` on :3000):
      `HALLMARK_PUPPETEER=C:\Users\ASUS\AppData\Local\Temp\opencode\hallmark-deps`
      `CHROME_PATH="C:\Program Files\Google\Chrome\Application\chrome.exe"`
      `node <skill>\sloplint.mjs <site> --genre editorial --render --url http://localhost:3000/<route>` ×8
- [x] Composition polish pass (13 Nov 2026, owner said "do what you think
      is best"): section heads scaled up (SectionHeader 34 → 44px; Our
      Story / Our Team / Common Questions matched; CTA statements 20 →
      30-36px; card + panel titles 18 → 20px) — the hierarchy now reads
      hero > section > item. About CTA rebuilt from a narrow text block
      into a full-width navy statement band (heading + free-first-call
      line + gold button) — clears the "thin section" note. Kept on
      purpose: word budgets (real information about the practice),
      3-section subpages (honest for a small firm, padding would be
      filler), small panel/CTA head sizes on book/faq/why/services where
      a 44px head would overwhelm the card. Final: sloplint 0 FAIL /
      0 WARN / 8 WAIVED / 18 ANSWERED / 30 NOTE; Lighthouse a11y 1.0 ×8;
      build clean.
- [x] GitHub repo created (13 Nov 2026): https://github.com/vibhavs015-droid/plsharma-site
      (private, account vibhavs015-droid via gh CLI keyring). Repo root = this
      folder (site/ + notes + docs + logos). Tag `v1.0` marks this baseline;
      main tracks origin. Excluded by .gitignore: node_modules, .next,
      .hallmark (regenerable), repos/ (third-party clones), .env*.
- [ ] Team photos: drop team-1.jpg (Vikram), team-2.jpg (Bhawani), team-3.jpg (Hemraj) into public/images/
- [ ] Replace interim content with real details: story details, testimonials, team roles/bios
- [ ] Buy domain (recommended: plsharmaco.in at Porkbun, ~₹700/yr) → deploy to Vercel + connect DNS per DEPLOYMENT.md
- [ ] Post-launch: Google Search Console + Google Business Profile (both free)
- [x] Multi-agent design studio set up (13–14 Nov 2026, OpenCode v2.1.4):
      7 subagents in `.opencode/agents/` (critic, ux-strategist, art-director,
      frontend-engineer, a11y-checker, qa-engineer, perf-seo) with scoped
      permissions (read-only reviewers enforced); Orchestrator rules in
      `AGENTS.md`; studio artifacts under `docs/design/` (SESSION_HANDOFF,
      STUDIO_CHARTER, PHASE_STATUS, DECISION_LOG, TOOLING_LOG, critic reviews);
      Playwright MCP server configured and connected; Playwright + axe-core +
      Lighthouse CI installed as devDependencies with chromium; axe scan of Home
      passes with zero violations. Critic smoke test returned a scored REJECT
      review (`docs/design/critic/smoke-test-2026-11-13.md`) — its required
      fixes (founder photo tone, invented testimonials, double card grid, stats
      band, spec drift, founder-card link) are the first backlog of the next
      phase. New sessions: read `docs/design/SESSION_HANDOFF.md` first and start
      OpenCode inside this folder.
- [x] Design-studio Phases 0–2 complete (13–15 Nov 2026, see
      `docs/design/IMPLEMENTATION_LOG.md`): Phase 0 baseline (critic APPROVE
      r2; `BASELINE_REPORT.md`); Phase 1 discovery + owner [GATE] passed (critic
      APPROVE r2; "Kept Ledger" direction approved, first-consultation-free
      confirmed, interim founder crop approved, header keeps 8 links); Phase 2
      Design System + Home (critic APPROVE r1, 15 Nov): tokens rebuilt in
      `site/app/globals.css` (sheet: `docs/design/phase-2/tokens.md`), Home
      rebuilt as the margin-rail ledger (§01–§05 + act band, one h1, one honest
      stat tile, placeholder-marked testimonials, canonical CTA wording), fonts
      Inter + Fraunces via next/font (woff2 781→357 KB), WhatsApp green
      AA-fixed to `#0B6E39`, focus indicator ≥3:1 everywhere, skip link added,
      honesty regression tests in the e2e suite. Verified: 35/35 tests, axe 0
      violations on `/` + `/book`, build exit 0, a11y 100 × 8 (LHCI), quiet-run
      perf 93 / TBT 34 ms (measurement caveat: KNOWN_ISSUES #17 — busy-machine
      Lighthouse TBT/LCP are upper bounds). Next: Phase 3 — remaining pages
      (`/about`, `/services`, `/why-choose-us`, `/testimonials`, `/faq`,
      `/contact`, `/book`) each per the PAGE COMPLETION RULE; carried backlog:
      #15 LCP image optimisation, `/book` slip rebuild, reduced-motion test, 2
      lint warnings, founder reshoot (#1a), real testimonials/team photos (owner
      data). No push/deploy without the owner.
- [x] Design-studio Phase 3 complete (15–17 Nov 2026): all 7 remaining routes
      (`/book`, `/about`, `/services`, `/faq`, `/contact`, `/why-choose-us`,
      `/testimonials`) built through the full pipeline, each with its own
      critic APPROVE round 1 (zero majors) — all 8 routes now carry one.
      Verified: 123/123 e2e + 5/5 unit against the production build, tsc 0,
      lint 0/0, axe 0 on every route, 40/40 screenshots at charter widths.
      Stage E closed KNOWN_ISSUES #15: the head-Reveal LCP deferral diagnosed
      (perf-seo: final LCP candidate ~420 ms past FCP on 7 routes; images and
      fonts exonerated) and fixed (heads unwrapped ×7; post-fix FCP→LCP gap
      +0 ms on all 8 routes; simulated confirmation = #17 quiet-machine
      re-measure). Dead code swept: page-hero, feature-icon, section-header,
      reveal components + `.reveal-in`/entrance-token CSS retired; lint
      0 errors / 0 warnings. Honesty rules enforced site-wide (invented
      testimonials never render — visible text AND RSC payload guarded; the
      one placeholder clearly marked; FAQPage JSON-LD byte-matches the served
      answers). Carried: #17 quiet-machine re-measure, FINAL_QA_REPORT.md,
      owner content (#1a reshoot, #2 testimonials, #3 team photos), push/
      deploy = owner [GATE].
