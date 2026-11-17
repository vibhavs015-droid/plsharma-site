# OWNER_CHECKLIST — P.L. Sharma & Co. website

Everything only the owner can supply, confirm or decide. Updated by the studio
as items surface; the site must not launch with an unchecked launch-critical
item. Created 17 Nov 2026 (polish pass).

## Content only the owner can supply

- [ ] **Founder photo reshoot** — no sunglasses, plain background (added by
      polish TASK 1). The current photo is the interim graded crop; a polished
      variant tone down the colour halo but a real reshoot is still wanted.
- [ ] **Real testimonials** with each client's written permission (polish
      TASK 7: /testimonials stays noindex + honest note until real ones exist).
- [ ] **Team photos** — team-1.jpg (Vikram), team-2.jpg (Bhawani), team-3.jpg
      (Hemraj) → `site/public/images/` (carried from PROJECT-NOTES).
- [ ] **Team roles confirmation** — Vikram Singh Soda / Bhawani / Hemraj: the
      polish pass shows SAMPLE roles behind the preview flag; confirm (or
      correct) the real role titles before they render in production.
- [ ] **Qualification confirmation (polish TASK 6)** — is the practitioner a
      Chartered Accountant?
      - If NOT a CA: the site ships with "Audit Support & Record Review"
        wording (no "Tax audit (44AB)", no "Statutory audit", no "audits" in
        meta descriptions or the footer tagline) — already the default.
      - If CA: set `PRACTITIONER_IS_CA=true` to restore the original audit
        wording, AND check ICAI advertising guidelines before launch.
- [ ] **"Financial Advisors" wording** — confirm the firm may use
      "Financial Advisors" in the tagline (part of the same qualification
      question).
- [ ] **Domain** — buy plsharmaco.in (Porkbun recommended, ~₹700/yr; see
      DEPLOYMENT.md), then set `SITE_URL`/`NEXT_PUBLIC_SITE_URL` and allow
      indexing (`ALLOW_INDEXING=true`).
- [ ] **Domain email** — switch the Yahoo address (`plperiwal@yahoo.com`) to a
      domain email once the domain is live (polish TASK 11 keeps Yahoo for
      now; update `site-config.ts` → `email`, and the privacy page contact
      line).

## Reviews and confirmations

- [ ] **Professional review of /privacy** (polish TASK 10) — have a
      professional review the privacy page before launch.
- [ ] **Real-phone test list (polish TASK 12)** — run once on a real Android
      and a real iPhone: booking form end-to-end on WhatsApp; header/footers
      inside safe areas (notch/home-bar); floating button never covers fields;
      sticky bottom bar (Call + WhatsApp) never covers content and is absent
      on /book; keyboard does not hide the submit button; tel: and wa.me links
      open the right apps.
- [ ] **Preview hosting** — the Netlify preview `plsharma-site-preview`
      currently requires a Netlify login to view (site created via CLI is
      private by default; the API cannot change it). Either flip it to Public
      in the dashboard (Project → Site configuration → Access control) or say
      the word to drop the preview site.

## Launch gates (charter)

- [ ] **Quiet-machine Lighthouse re-measure** (KNOWN_ISSUES #17) — perf ≥ 90
      and LCP < 2.5 s confirmed off this machine.
- [ ] **Deploy/publish [GATE]** — production hosting (Vercel per
      DEPLOYMENT.md) only on the owner's say-so.
