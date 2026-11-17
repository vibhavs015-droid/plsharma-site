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
