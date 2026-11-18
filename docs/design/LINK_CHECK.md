# LINK_CHECK.md — the BEFORE audit (polish pass)

**Date:** 17 Nov 2026 · **Branch:** `polish-pass` · **Author:** qa-engineer (TASK 8)
**Raw machine evidence:** `docs/design/polish-evidence/link-check-before.json` — every claim below traces to a status code or a copied string in that file.

**Headline, plainly:** on the local production build, **0 broken links** — all 204 GET-checked anchors, all 48 `<link>`-tag targets, both images, `/sitemap.xml` and `/robots.txt` returned 200. Contact-link formats are all correct. The findings are **metadata and policy issues** (sitemap host, indexing, Open Graph), all routed to TASK 9 — plus one state change on the deployed preview (now 200, not 401) that needs an owner decision.

---

## Method

1. Deleted `site/.next` (it held a Netlify-runtime-processed build) and ran `npm run build` from `site/`.
   - First attempt: build worker exited `3221225725` (`0xC00000FD` STATUS_STACK_OVERFLOW) — a known transient Next-build-worker crash on Windows, not a product failure. Retry: **exit 0**, 16/16 static pages generated.
2. Served it with `npx next start -p 3000` (production runtime — hashed font classes `MMaAbG_variable`, per-page title template in effect).
3. Crawled with a Node 24 script (`%TEMP%\opencode\link-crawl.mjs`): regex-extracted every `<a href>`, `<link href>`, `<img src>` + srcset, og:/robots meta, `<title>`, JSON-LD script types per page; GET-tested every internal + external anchor, internal `<link>` target, image, srcset entry and og:image; format-validated `tel:` / `wa.me` / `mailto:` without following them; then probed `/this-page-does-not-exist`, `/sitemap.xml`, `/robots.txt` and the deployed preview.
4. Limitation, stated honestly: the crawler does not execute JS (fine here — the site is fully static; served HTML *is* the product), and `<link rel=canonical>` targets (`https://plsharmaco.in/...`) were **not** GET-tested because that host is not owned (see sitemap section for the equivalent evidence).

## Local build (BEFORE) — summary

All 8 pages returned **200**. Counts per page:

| Page | Anchors | GET-checked | tel | mailto | wa.me | fragment | link tags | imgs | Non-200s |
|---|---|---|---|---|---|---|---|---|---|
| `/` | 43 | 33 | 4 | 2 | 3 | 1 | 7 | 1 | **0** |
| `/about` | 31 | 23 | 3 | 2 | 2 | 1 | 7 | 1 | **0** |
| `/services` | 37 | 29 | 3 | 2 | 2 | 1 | 7 | 0 | **0** |
| `/book` | 30 | 22 | 3 | 3 | 1 | 1 | 7 | 0 | **0** |
| `/faq` | 33 | 24 | 3 | 2 | 3 | 1 | 7 | 0 | **0** |
| `/contact` | 34 | 23 | 4 | 3 | 3 | 1 | 7 | 0 | **0** |
| `/why-choose-us` | 33 | 25 | 3 | 2 | 2 | 1 | 7 | 0 | **0** |
| `/testimonials` | 34 | 25 | 3 | 2 | 3 | 1 | 7 | 0 | **0** |
| **Total** | **275** | **204** | 26 | 18 | 19 | 8 | 48 | 2 | **0** |

### Broken links — EMPTY

| Page | Kind | href | Status |
|---|---|---|---|
| — | — | — | none. Every GET-checked link returned 200. |

(275 − 204 = 71 anchors are `tel:`/`mailto:`/`wa.me`/`#main` by design — format-validated below, not GET-tested. The single external anchor is the maps link, GET-tested with its redirect followed.)

## sitemap.xml

- `GET /sitemap.xml` → **200**, `content-type: application/xml`.
- 8 `<loc>` entries; route set exactly matches the 8 shipped pages (`missingRoutes: []`, `extraPaths: []`); per-URL priorities present as authored in `site/app/sitemap.ts`.
- **Host on every `<loc>`: `https://plsharmaco.in`** — e.g. `<loc>https://plsharmaco.in/about</loc>`.
- GET of each loc: **all 8 fail with `fetch failed`** (DNS) — the domain is not owned/parked yet. This is the TASK 9 SITE_URL evidence: the sitemap points engines at a domain the firm does not control.

## robots.txt

- `GET /robots.txt` → **200**, `content-type: text/plain`. Body, verbatim:

```
User-Agent: *
Allow: /

Sitemap: https://plsharmaco.in/sitemap.xml
```

- **Issue:** full indexing is allowed while the site is an unlaunched preview, and no `X-Robots-Tag` header exists anywhere (local pages: header absent on all 8; preview: header absent; `site/netlify.toml` has no `[[headers]]` section). TASK 9 adds ALLOW_INDEXING gating + the header.

## Canonical / OG table (per page)

| Page | `<title>` | canonical | og:url | og:title | og:description | og:image |
|---|---|---|---|---|---|---|
| `/` | P.L. Sharma And Company — Tax Consultants & Financial Advisors | `https://plsharmaco.in` | `https://plsharmaco.in` | default | default | absent |
| `/about` | About the practice \| P.L. Sharma And Company | `…/about` | `https://plsharmaco.in` | default | default | absent |
| `/services` | Services \| P.L. Sharma And Company | `…/services` | `https://plsharmaco.in` | default | default | absent |
| `/book` | Book a consultation \| P.L. Sharma And Company | `…/book` | `https://plsharmaco.in` | default | default | absent |
| `/faq` | FAQ \| P.L. Sharma And Company | `…/faq` | `https://plsharmaco.in` | default | default | absent |
| `/contact` | Contact \| P.L. Sharma And Company | `…/contact` | `https://plsharmaco.in` | default | default | absent |
| `/why-choose-us` | How we work \| P.L. Sharma And Company | `…/why-choose-us` | `https://plsharmaco.in` | default | default | absent |
| `/testimonials` | Client words — published with permission \| P.L. Sharma And Company | `…/testimonials` | `https://plsharmaco.in` | default | default | absent |

- `<title>`: **already per-page and correct** — no issue.
- canonical: **already per-page** — no issue.
- og:url: identical (`https://plsharmaco.in`) on all 8 — **issue → TASK 9** (shared layout value; should be page URL).
- og:title: identical layout default on all 8 — **issue → TASK 9**.
- og:description: identical layout default on all 8 — **issue → TASK 9**.
- og:image: absent on all 8 — **issue → TASK 9** (no social-card image ships).
- meta name="robots": absent on all 8 (consistent with the robots.txt finding — the noindex-until-launch decision is unimplemented → TASK 9).
- JSON-LD: only `/faq` carries a script (`FAQPage`), as designed; the other 7 pages have none.

## wa.me / tel / mailto formats (no follow — shape validation)

26 `tel:` + 19 `wa.me` + 18 `mailto:` anchors across the 8 pages. Every one validated:

| Shape | Occurrences | Expected | Verdict |
|---|---|---|---|
| `tel:+919829771396` | 26 | exact config match | **all exact** — digits/`+` only |
| `https://wa.me/919829771396?text=…` | 19 | `wa.me/919829771396` + encoded `?text=` | **all correct** — number matches; prefills decode cleanly, e.g. `Hello P.L. Sharma And Company, I would like to book a consultation — via the website's testimonials page.` (page-attributed), and `Hello P.L. Sharma And Company, I have a question.` (question CTA on /faq, /contact, /testimonials) |
| `mailto:plperiwal@yahoo.com` (bare) | 17 | exact config match | **all exact** |
| `mailto:plperiwal@yahoo.com?subject=…&body=…` | 1 | recipient match + params | /book's form fallback — decodes to `subject=Consultation Request (Website)` and a `Name:\nPhone:\nService:\nPreferred Date/Time:\nNote:` body template. Recipient exact; richer shape is **intentional**, not an issue. |

The one external anchor: `/contact` → `https://maps.app.goo.gl/Ap3EUniM15RsW7oCA` → **200**, redirect resolves to `https://www.google.com/maps/place/Indira+Colony,+Jaisalmer,+Rajasthan+345001/@26.9147386,…` — a real Google Maps place in Jaisalmer. No issue.

## Favicon / icons / manifest

| Target | Linked on | GET | Verdict |
|---|---|---|---|
| `/favicon.ico` (rel=icon, image/x-icon) | all 8 | **200** | present |
| `/icon.png` (rel=icon, image/png) | all 8 | **200** | present |
| `/icon.svg` (rel=icon) | all 8 | **200** | present |
| `/apple-icon.png` (rel=apple-touch-icon) | all 8 | **200** | present |

**Icons are NOT missing.** Manifest: **no `manifest` link is emitted** (absent, not broken) — noted for TASK 9/12 as an optional addition; low priority. Images: the founder plate (`.webp`, width 300 / height 375, `fetchpriority=high`) is the only `<img>` on `/` and `/about`, both GET **200**; **0 srcset entries** site-wide.

## 404 behaviour (`/this-page-does-not-exist`)

- HTTP status: **404** (correct).
- Body contains `"This page could not be found"` (Next's default copy) **and** the brand name, the skip link ("Skip to main content"), the footer chrome ("Quick links") and our hashed stylesheet (`MMaAbG_variable`).
- Characterization: **the default Next 404 copy rendered inside the branded root layout** — not an unbranded standalone page. Links on it work (same header/footer chrome). Optional owner-polish item: a custom `not-found.tsx` in the ledger voice; not a TASK 9 blocker.

## Deployed preview — evidence + root cause

`GET https://plsharma-site-preview.netlify.app/{/, /faq, /sitemap.xml}`:

| URL | Status | Login Redirect? | x-robots-tag |
|---|---|---|---|
| `/` | **200** | no | absent |
| `/faq` | **200** | no | absent |
| `/sitemap.xml` | **200** (application/xml) | no | absent |

**This contradicts the brief's expected 401 + "Login Redirect".** Evidence of what actually served (copied from the response body, saved in the JSON): our real HTML — `<html lang="en" class="MMaAbG_variable KIiAAa_variable h-full antialiased">` — with a Netlify-injected comment: `<!-- This site is hosted on Netlify. Anyone can build and deploy a site like this one for free: … Netlify hosting facts for this site: static/SSR served via Netlify Edge. -->`. The preview `/sitemap.xml` serves the same 8-loc XML with the `plsharmaco.in` host.

Root-cause story (updated to the observed state):

1. **"Site not found"** (owner screenshot) = the production alias before the 17 Nov production deploy landed — Netlify shows Site-not-found for a site with no prod deploy. Explained by that earlier state; superseded by the deploy.
2. **401 + Login Redirect** (engineer's twice-verified evidence) = Netlify's private-by-default for CLI-created sites (`sso_login_context: "all"`; the public API ignores `sso_login`/`sso_login_context` — flipping it is dashboard-only, owner action, recorded in OWNER_CHECKLIST.md). I did not observe that state this pass; I record it as prior evidence, honestly attributed.
3. **Now: 200, publicly reachable.** The SSO gate is no longer in effect (state change beyond this pass's control). Consequence: an unlaunched site is publicly crawlable while robots.txt allows full indexing — this raises the urgency of TASK 9 (ALLOW_INDEXING / X-Robots-Tag) and of the owner's SSO/publish decision.

`site/netlify.toml` review: `[build] command = "npm run build"`, `publish = ".next"`, `@netlify/plugin-nextjs` plugin — correct for the Next runtime; no `[[redirects]]` section (fine for this fully-static site — the server handler routes everything); **no `[[headers]]` section** — the missing X-Robots-Tag is TASK 9's addition.

## Issue list for the engineer

| # | Where | What | Fixed by |
|---|---|---|---|
| 1 | `site/app/sitemap.ts` / `site/app/layout.tsx` (SITE_URL default) | All 8 sitemap `<loc>` URLs use `https://plsharmaco.in` — unowned domain; every loc fails DNS resolution | **TASK 9** (SITE_URL env) |
| 2 | `site/app/robots.txt` source | robots.txt allows full indexing (`Allow: /`) while the site is an unlaunched preview | **TASK 9** (ALLOW_INDEXING) |
| 3 | `site/netlify.toml` | No `[[headers]]` section — no `X-Robots-Tag` header on any page (local or preview) | **TASK 9** (X-Robots-Tag header) |
| 4 | `site/app/layout.tsx` og config | `og:url` identical (`https://plsharmaco.in`) on all 8 pages — should be the page URL | **TASK 9** (per-page OG) |
| 5 | `site/app/layout.tsx` og config | `og:title` identical layout default on all 8 pages | **TASK 9** (per-page OG) |
| 6 | `site/app/layout.tsx` og config | `og:description` identical layout default on all 8 pages | **TASK 9** (per-page OG) |
| 7 | site-wide | `og:image` absent on all 8 pages — no social card | **TASK 9** |
| 8 | Deployed preview | Preview publicly reachable (200) — owner decides: re-enable SSO gate in dashboard, and/or accept public preview | **Owner** (dashboard SSO) + **TASK 9** urgency |
| 9 | 404 page | Default Next 404 copy inside branded chrome — fine functionally; custom `not-found.tsx` is optional polish | Owner polish pass (optional) |
| 10 | site-wide | No web manifest link (absent, not broken) | TASK 9/12 (optional) |

Not issues (recorded so nobody re-investigates): all icons present and 200; titles and canonicals already per-page; all 275 anchors format-correct; maps link resolves; `/book`'s parameterized mailto is by design; the transient build-worker crash (`0xC00000FD`) did not reproduce on retry.

---

# LINK_CHECK.md — the AFTER audit (polish pass)

**Date:** 17 Nov 2026 · **Branch:** `polish-pass` @ `78bdb6c` · **Author:** qa-engineer (TASK 8 after-half)
**Raw machine evidence:** `docs/design/polish-evidence/link-check-after.json` — every claim below traces to a status code or a copied string in that file.

**Headline, plainly:** on the local production build (polish-pass default build — no rebuild this window), **0 broken links**: all 224 GET-checked anchors, all 63 internal `<link>` targets, both images, `/sitemap.xml` and `/robots.txt` returned 200. Before's **10 issues → 2**, both owner/deploy-pending (SITE_URL host; X-Robots-Tag runtime). Broken-link count before → after: **0 → 0**. Ten failures were recorded against the **deployed preview host** instead — that build still runs pre-polish code (new evidence category `deployedLag`, listed below).

## Method

1. Same crawler, adapted: `%TEMP%\opencode\link-crawl-after.mjs` — extraction, format validators and GET logic mirror `link-crawl.mjs` (before) exactly. Two documented deltas:
   - ROUTES = **9** shipped pages (`/privacy` added by the polish pass); sitemap expectation = **8** (`SITEMAP_ROUTES` = all except `/testimonials` — Item 0 while the confirmed tier is empty).
   - Failures on the deployed preview host route to **`deployedLag`**, never `broken` — `broken` stays "local build link health", exactly as in the before run.
2. No build step: `.next` was already the fresh default build (BUILD_ID written after `78bdb6c`; brief forbade a rebuild). Served with `npx next start -p 3000`.
3. Same limitation as before: no JS execution (fully static site — served HTML *is* the product); only internal `<link>` targets are GET-tested, canonical/OG absolute targets recorded only (methodology unchanged).

## Local build (AFTER) — summary

All 9 pages returned **200**. Counts per page:

| Page | Anchors | GET-checked | tel | mailto | wa.me | fragment | link tags | imgs | Non-200s (local) |
|---|---|---|---|---|---|---|---|---|---|
| `/` | 45 | 33 | 5 | 2 | 4 | 1 | 8 | 1 | **0** |
| `/about` | 33 | 23 | 4 | 2 | 3 | 1 | 8 | 1 | **0** |
| `/services` | 39 | 29 | 4 | 2 | 3 | 1 | 8 | 0 | **0** |
| `/book` | 30 | 22 | 3 | 3 | 1 | 1 | 8 | 0 | **0** |
| `/faq` | 35 | 24 | 4 | 2 | 4 | 1 | 8 | 0 | **0** |
| `/contact` | 36 | 23 | 5 | 3 | 4 | 1 | 8 | 0 | **0** |
| `/why-choose-us` | 35 | 25 | 4 | 2 | 3 | 1 | 8 | 0 | **0** |
| `/testimonials` | 33 | 22 | 4 | 2 | 4 | 1 | 8 | 0 | **0** |
| `/privacy` | 35 | 23 | 5 | 4 | 2 | 1 | 8 | 0 | **0** |
| **Total** | **321** | **224** | 38 | 22 | 28 | 9 | 72 | 2 | **0** |

- Every anchor accounted for: 321 = 224 GET-checked + 38 tel + 22 mailto + 28 wa.me + 9 fragment.
- Link tags: 72 recorded (8/page — the manifest `<link>` is new), **63 GET-tested** (the 9 canonicals point at the absolute siteUrl host and are excluded by the same rule as the before run).
- The JSON's raw per-page `non200` reads 1 on all nine pages — every one is the og:image URL in `deployedLag` below, **not** a local target; local non-200 = 0 everywhere.
- Anchor growth vs before (275 → 321) tracks the polish: the new `/privacy` page, the sticky bar (+2 on each bar route), the footer's new `Privacy` link, minus the retired nav `Testimonials` link and the three deleted §02 proof links on `/testimonials`.

### Broken links — EMPTY (local build)

| Page | Kind | href | Status |
|---|---|---|---|
| — | — | — | none. Every localhost GET-checked link returned 200. |

### deployedLag — 10 failures, all on the deployed preview (pre-polish build)

| Where | Kind | URL | Status | Root cause |
|---|---|---|---|---|
| all 9 pages | og:image | `https://plsharma-site-preview.netlify.app/images/og-default.png` | 404 | asset added by the polish pass; deployed build predates it. Local file: **200** (pinned by `seo-head.spec.ts`) |
| sitemap loc | sitemap-loc | `https://plsharma-site-preview.netlify.app/privacy` | 404 | route added by the polish pass; deployed build has no `/privacy` |

Every one clears on the owner's redeploy. Evidence: `deployedLag[]` in the JSON; `preview[].servesPolishBuild=false` on all three probed routes.

## Before → after: the 10 before-issues

| # | Before issue | After status |
|---|---|---|
| 1 | sitemap host `plsharmaco.in` — unowned, all 8 locs DNS-fail | **Changed:** local sitemap now serves 8 locs on `https://plsharma-site-preview.netlify.app` (owned; 7×200 + the `/privacy` lag-404 above). **Still open for launch:** the preview host stands in until the owner sets `SITE_URL` — and the DEPLOYED preview's own sitemap still serves the old `plsharmaco.in` XML including `/testimonials` (pre-T9 deploy; evidence `preview[2].bodySnippet`) |
| 2 | robots.txt allows full indexing (`Allow: /`) | **FIXED** — local body verbatim below: disallow-all, no sitemap line |
| 3 | `netlify.toml` had no `[[headers]]` — no X-Robots-Tag anywhere | **Config added** (`X-Robots-Tag = "noindex, nofollow"` under `[[headers]]`), **runtime still absent** on every local page (`xRobotsTagHeader: "(absent)"` ×9) and on the deployed preview — see the verbatim caveat in the preview section |
| 4 | og:url identical on all 8 pages | **FIXED** — 9 distinct og:urls, each == that page's canonical (`pages[].ogUrl` / `canonical`) |
| 5 | og:title identical layout default on all 8 | **FIXED** — og:title == `<title>` on all 9, titles per-page (JSON + `seo-head.spec.ts` 9/9 pass) |
| 6 | og:description identical on all 8 | **FIXED** — 9 distinct values; og:description == meta description on all 9 (JSON) |
| 7 | og:image absent site-wide | **SHIPPED locally** — one site-wide `…/images/og-default.png`, local GET 200 (`seo-head.spec.ts`). Resolves on the preview host only after redeploy (see deployedLag) |
| 8 | Deployed preview publicly reachable (200), owner SSO/publish decision | **Unchanged** — 200, no login redirect (re-probed this pass). Owner decision still open |
| 9 | 404 = Next default copy inside branded chrome | **FIXED** — custom branded 404 (markers below) |
| 10 | No web manifest link | **FIXED** — `link[rel=manifest]` → `/manifest.webmanifest` on all 9 pages; local GET 200, identity JSON pinned by `seo-head.spec.ts` |

**Remaining issues: 2** (JSON `issues[]`): (a) sitemap host = preview host, pending owner `SITE_URL`; (b) the X-Robots-Tag runtime caveat.

## sitemap.xml (AFTER)

- `GET /sitemap.xml` → **200**, `content-type: application/xml`.
- **8 `<loc>` entries**; route set exactly the 8 fixed routes: `missingRoutes: []`, `extraPaths: []`, and **`omittedWhileConfirmedTierEmpty: ["/testimonials"]`** — Item 0's sitemap half, live.
- Host on every `<loc>`: `https://plsharma-site-preview.netlify.app` (before: `plsharmaco.in`).
- GET of each loc: **7×200** (routes the deployed build already has) + `/privacy` → **404** (deployed-lag, above).

## robots.txt (AFTER)

- `GET /robots.txt` → **200**, `content-type: text/plain`. Body, verbatim:

```
User-Agent: *
Disallow: /

```

- Before: `Allow: /` plus a `Sitemap:` line. TASK 9's default gating is in effect locally — every page head carries `noindex, nofollow` site-wide, with `/testimonials` overriding to exact `noindex` (its own flag; both halves of Item 0 pinned by `seo-head.spec.ts` / `testimonials.spec.ts`).

## Canonical / OG / heads (AFTER — 9 pages)

| Page | `<title>` | og:url == canonical | robots | manifest | action bar |
|---|---|---|---|---|---|
| `/` | P.L. Sharma And Company — Tax Consultants & Financial Advisors (layout default) | `…/` | noindex, nofollow | yes | yes |
| `/about` | About the practice \| P.L. Sharma And Company | `…/about` | noindex, nofollow | yes | yes |
| `/services` | Services \| P.L. Sharma And Company | `…/services` | noindex, nofollow | yes | yes |
| `/book` | Book a consultation \| P.L. Sharma And Company | `…/book` | noindex, nofollow | yes | **no** (by design — the form is the action surface) |
| `/faq` | Common questions — documents, fees, notices \| P.L. Sharma And Company | `…/faq` | noindex, nofollow | yes | yes |
| `/contact` | Contact the office \| P.L. Sharma And Company | `…/contact` | noindex, nofollow | yes | yes |
| `/why-choose-us` | How we work \| P.L. Sharma And Company | `…/why-choose-us` | noindex, nofollow | yes | yes |
| `/testimonials` | Client words — published with permission \| P.L. Sharma And Company | `…/testimonials` | **noindex** (page's own flag) | yes | yes |
| `/privacy` | Privacy \| P.L. Sharma And Company | `…/privacy` | noindex, nofollow | yes | yes |

- og:image: one site-wide value on all 9. Viewport: one uniform value on all 9 — `width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content`.
- JSON-LD: `/` → `ProfessionalService` (parses clean), `/faq` → `FAQPage`; the other 7 pages none (as designed).
- Before, for contrast: identical og trio on all 8 pages, no og:image, no robots meta, no manifest link.

## wa.me / tel / mailto formats (AFTER — no follow, shape validation)

38 `tel:` + 28 `wa.me` + 22 `mailto:` anchors across the 9 pages. Every one validated:

| Shape | Occurrences | Verdict |
|---|---|---|
| `tel:+919829771396` | 38 | **all exact** config match — digits/`+` only |
| `https://wa.me/919829771396?text=…` | 28 | **all correct** — number matches; prefills decode cleanly: bar prefills are the unattributed `Hello P.L. Sharma And Company, I would like to book a consultation.`, in-page bands stay page-attributed (e.g. `…via the website's home page.`) |
| `mailto:plperiwal@yahoo.com` (bare) | 21 | **all exact** |
| `mailto:plperiwal@yahoo.com?subject=…&body=…` | 1 | /book form fallback — recipient exact, richer shape **by design** (same known item as the before run; the JSON's single format-failure line is this one, `matchesConfig:false` under exact-href compare) |

External anchor: `/contact` → maps link, **200** (unchanged).

## Favicon / icons / manifest (AFTER)

Icons unchanged — same four targets as the before run, all present and GET **200**. **Manifest now ships**: `link[rel=manifest]` on all 9 pages → `/manifest.webmanifest` **200** locally (name / short_name / both icon sizes pinned by `seo-head.spec.ts`). Images: the founder plate is now `founder-plate-polished.webp` on `/` and `/about`, both GET **200**; **0 srcset** entries site-wide; og:image as above.

## 404 behaviour (AFTER — `/this-page-does-not-exist`)

- HTTP status: **404** (unchanged).
- Characterization: **"custom branded 404 — shipped h1/marker present, Next default copy absent, wrapped in the root layout chrome"** (before: "Next default 404 copy rendered inside the branded root layout").
- Markers: `hasNextDefaultCopy: false` · `hasShippedH1: true` (`That page isn't here.`) · `hasPlainMarker: true` (`P.L. Sharma & Co. · 404 · Jaisalmer` — tested on decoded, comment-stripped HTML because React splits it as `Co.<!-- --> · 404`) · brand / skip link / footer chrome / stylesheet all true · `hasAutoNoindex: true` · `quickExitCount: 5` · `<title>` = layout default.

## Deployed preview (AFTER re-probe)

| URL | Status | Login redirect | Serves polish build? | x-robots-tag |
|---|---|---|---|---|
| `/` | **200** | no | **no** (`sticky-action-bar` / `rail-num` absent) | absent |
| `/faq` | **200** | no | **no** | absent |
| `/sitemap.xml` | **200** (application/xml — still the old `plsharmaco.in` XML including `/testimonials`) | no | **no** | absent |

Caveat, verbatim: the deployed preview still runs the PRE-polish build, so `X-Robots-Tag` runtime verification on the deployed host pends the owner's redeploy (header verified in `netlify.toml` config only).

## POST-REDEPLOY VERIFICATION (18 Nov 2026, superseding the caveat above)

The owner ordered the v3 redeploy; two deploys landed (`6afd8c31` polish build, then `6afd92b1` after the header fix below). Live re-probe of `https://plsharma-site-preview.netlify.app`:

- **`X-Robots-Tag: noindex, nofollow` present on all four surface types:** `/` (HTML 200), `/privacy` (HTML 200), `/robots.txt` (static 200), `/does-not-exist-xyz` (404). The `netlify.toml` `[[headers]]` block was verified structurally correct but **not applied by the Netlify Next runtime** — the header now ships from `next.config.ts` `headers()` (commit `a142e4a`), gated on the same `ALLOW_INDEXING` switch as the meta and robots.txt so the launch flip removes all three together. Host-agnostic: also applies if the site moves to Vercel.
- **deployedLag cleared:** home serves the polish build (`rail-num`, record band, branded `og:image`, no `/testimonials` nav anchor, no sample banner); `/privacy` 200 with the shipped h1; `robots.txt` = `User-Agent: * / Disallow: /`; sitemap = 8 locs on the preview host, no `/testimonials`.
- **Branded 404 live:** status 404 · h1 `That page isn't here.` · default `This page could not be found.` absent · all 5 quick links present · auto-noindex meta present.
- **Remaining issues: 1** (JSON `issues[]`): sitemap/canonical host = preview host, pending owner `SITE_URL` at launch. Issue (b) — the X-Robots-Tag caveat — is resolved.

## Not issues (recorded so nobody re-investigates)

- Local broken links: **0** before and **0** after — the polish pass introduced none.
- All localhost link targets 200; every format shape valid (one by-design parameterized mailto).
- Item 0 is live on both halves: `/testimonials` carries exact `noindex` and is omitted from the sitemap while `confirmedTestimonials` is empty.
- The 10 deployedLag failures are deploy-order facts, not code defects — each clears on the owner's redeploy, which also resolves issue #1's deployed half and the X-Robots-Tag caveat.
