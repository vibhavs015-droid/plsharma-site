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
- [x] **Preview hosting** — RESOLVED 17 Nov: `https://plsharma-site-preview.netlify.app` is now publicly reachable (the qa crawl confirms 200s; the earlier CLI-created-site login wall is gone). Say the word if you'd rather drop the preview site instead of keeping it.

## Wording sign-offs flagged by the ux spec (17 Nov — owner copy touched)

- [ ] **Bio one-word change** — the owner's paragraph rendered with "the everyday
      **questions** of Indian tax" → "**work**" (a return to file is not a question;
      "work" is the site's house word). If you prefer your verbatim wording, say so
      and the bio ships with "questions".
- [ ] **`site.description`** — "a trusted tax consultancy" → "a tax consultancy in
      Jaisalmer" (drops the self-claim, adds the honest place modifier).
- [ ] **whyChooseUs descriptions tightened** — "agreed-upon" → "agreed";
      "Strict deadlines discipline — returns and filings are completed well before
      due dates." → "Returns and filings are completed well before their due dates."
- [ ] **/testimonials meta description (lean page)** — `Real client words —
      published with permission, and not before. Nothing is invented: P.L. Sharma
      And Company has practised in Jaisalmer since 2001.` (follows from removing
      the page's record band under TASK 7; the h1 is unchanged).

## Launch gates (charter)

- [ ] **Launch env vars** (polish TASKS 6/9; set at deploy time on the real
      host): `SITE_URL=https://plsharmaco.in` · `ALLOW_INDEXING=true` ·
      `PRACTITIONER_IS_CA=true` ONLY if the CA confirmation above is yes.
      Until then every build ships noindex + disallow-all robots + the
      X-Robots-Tag header (the Netlify preview keeps its header permanently).
- [ ] **Quiet-machine Lighthouse re-measure** (KNOWN_ISSUES #17) — perf ≥ 90
      and LCP < 2.5 s confirmed off this machine.
- [ ] **Deploy/publish [GATE]** — production hosting (Vercel per
      DEPLOYMENT.md) only on the owner's say-so.
