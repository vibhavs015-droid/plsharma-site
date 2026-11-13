# Deployment Guide — P.L. Sharma And Company

Everything below is **free** except the domain itself (~₹520–1,060 per year).
Total first-year cost: **about ₹600–1,100.**

---

## Step 1 — Buy the domain

Checked 13 Nov 2026 against the official `.in` / `.com` registries (RDAP).
`plsharma.com`, `sharmatax.com` and `plsharma.in` are **taken**. Available,
name-matching options:

| Domain | Price/yr (renews same) | Where | Verdict |
|---|---|---|---|
| **plsharmaco.in** | **$7.83 ≈ ₹700** | Porkbun (porkbun.com) | ⭐ Best pick — matches "P.L. Sharma & Co.", India TLD, flat price forever |
| plsharmaco.co.in | $5.80 ≈ ₹520 | Porkbun | Cheapest professional option, classic Indian business style |
| plsharmatax.com | $11.81 ≈ ₹1,060 | Porkbun | If you prefer .com (states what he does) |
| plsharmaandco.com | $11.81 ≈ ₹1,060 | Porkbun | .com, full firm-name contraction |
| plsharmaandcompany.in | $7.83 ≈ ₹700 | Porkbun | Long but exact |
| sharmatax.in | $7.83 ≈ ₹700 | Porkbun | Short, generic-tax brand |
| plsharma.xyz | $1.29 year 1, then $14.21 | Porkbun | ⚠️ Avoid — renewal trap |
| plsharmatax.site / .online | $1.96–2.57 year 1, then $19–29 | Porkbun | ⚠️ Avoid — renewal trap |

**Recommended:** buy **plsharmaco.in** at **Porkbun** — prices include all
fees, WHOIS privacy is free, no upsells. (Indian registrars like GoDaddy /
Hostinger run first-year ₹299 promos, but check the *renewal* price and the
upsells before choosing; Porkbun's flat rate is the honest number.)

Do **not** use a free subdomain (`plsharma.vercel.app` etc.) on business
cards or WhatsApp — fine for testing only. There is no longer any truly
free *real* domain (Freenom is dead).

After buying, one-line change in the site:
`site/lib/site-config.ts` → `siteUrl: "https://plsharmaco.in"` (or set the
`NEXT_PUBLIC_SITE_URL` env var on the host). The sitemap, robots.txt and
share previews all read from it.

---

## Step 2 — Deploy to Vercel (free hosting)

The site is a Next.js 16 static app — Vercel's free Hobby tier is made for it
(instant HTTPS, global CDN, no server to manage).

1. Create a GitHub account (free) and a new repository, e.g. `plsharma-site`.
2. Push the `site/` folder to it:
   ```powershell
   cd site
   git init
   git add -A
   git commit -m "P.L. Sharma And Company website"
   git branch -M main
   git remote add origin https://github.com/<username>/plsharma-site.git
   git push -u origin main
   ```
3. Go to **vercel.com** → sign in with GitHub (free) → **Add New… → Project**
   → import the repo → Framework preset: **Next.js** (auto-detected) → Deploy.
4. You get a free preview URL like `https://plsharma-site.vercel.app`.

Update the site later by editing content in `lib/site-config.ts` and pushing —
Vercel redeploys automatically.

---

## Step 3 — Connect the domain to Vercel

In Vercel: **Project → Settings → Domains → Add** → type `plsharmaco.in`.

Then at the registrar (Porkbun → Domain → DNS records):

| Type | Host | Value | Purpose |
|---|---|---|---|
| A | `@` (or blank) | `76.76.21.21` | root domain → Vercel |
| CNAME | `www` | `cname.vercel-dns.com` | www → site |

DNS takes from minutes to a few hours. HTTPS/SSL is issued automatically by
Vercel — nothing to configure. Vercel also redirects `www.` → root (or
either way you choose in the same screen).

---

## Step 4 — After go-live checklist

- [ ] Open `https://plsharmaco.in` — site loads, padlock shows.
- [ ] `https://plsharmaco.in/robots.txt` — lists the sitemap.
- [ ] `https://plsharmaco.in/sitemap.xml` — lists all 8 pages.
- [ ] Booking form → opens WhatsApp with the request (test from a phone).
- [ ] Google Search Console (free): add the domain, verify with the DNS TXT
      record Porkbun shows you, submit `sitemap.xml`. This is how Jaisalmer
      searchers actually find the site.
- [ ] Google Business Profile (free): create/claim "P.L. Sharma And Company",
      add the website URL, phone, hours — biggest local-SEO win for a consultant.
- [ ] Set `NEXT_PUBLIC_SITE_URL` (or `siteUrl`) if the domain differs from the
      default, so canonical links and share previews match.

---

## Alternative free hostings (same repo works)

- **Netlify** — free tier, import from GitHub, auto-detects Next.js.
- **Cloudflare Pages** — free tier, uses `@cloudflare/next-on-pages`.

Vercel is the least-friction choice for this stack; switch only if there's a
reason to.
