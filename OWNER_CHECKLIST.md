# OWNER_CHECKLIST — P.L. Sharma & Co. website

Everything only the owner can supply, confirm or decide. Updated by the studio
as items surface; the site must not launch with an unchecked launch-critical
item. Created 17 Nov 2026 (polish pass).

## Content only the owner can supply

- [ ] **Founder photo reshoot** — no sunglasses, plain background (added by
      polish TASK 1). The current photo is the interim graded crop; a polished
      variant tone down the colour halo but a real reshoot is still wanted.
- [x] **Real testimonials** — RESOLVED 20 Nov (T16): the owner ordered six
      named quotes (mixed Hinglish/English) into production on launch day and
      accepts them as his own launch content (DECISION_LOG); the page states
      "published with the client's permission" per his order. If any named
      client has NOT actually agreed, say so and that quote is swapped or
      removed — the copy is owner-owned.
- [ ] **Team photos** — team-1.jpg (Vikram), team-2.jpg (Bhawani), team-3.jpg
      (Hemraj) → `site/public/images/` (carried from PROJECT-NOTES).
- [ ] **Team roles confirmation** — Vikram Singh Soda / Bhawani / Hemraj: no
      roles render anywhere yet (the SAMPLE roles left with the preview tier,
      T16). Either send the real role titles, or say the word and the studio
      folds the three names into one honest line ("the office support team") —
      the critic's t14 F2 fallback; re-checked in the T17 review.
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
- [ ] **One honest fee figure** (critic t14 F4, P2) — the site quotes no
      rupee figures anywhere. Send ONE real starting figure for the commonest
      case (salary ITR "from ₹X") and it ships in FAQ Q02 + /services entry
      01. No number will be invented.
- [ ] **Domain** — OPTIONAL now: the site launched 20 Nov on
      `https://plsharmaandcompany.netlify.app` with indexing already ON
      (owner decision, T16). When you want a real .com/.in, buy it (Porkbun
      recommended, ~₹700/yr) and tell the studio — attaching it and
      repointing the URLs takes minutes.
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
- [x] **Preview hosting** — RESOLVED 17 Nov; superseded 20 Nov (T16): that
      same Netlify site was renamed and became the PRODUCTION host
      (`https://plsharmaandcompany.netlify.app`). The old preview URL is dead
      (404) — swap any links you shared with it.

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

- [x] **Launch env vars** — `ALLOW_INDEXING=true` SET 20 Nov (T16, owner
      decision): the noindex meta, robots disallow-all and X-Robots-Tag are
      all removed on the live host. `SITE_URL` is no longer an env var — the
      host lives in `site/lib/content-mode.ts` (`siteUrl`), update it when a
      real domain is attached. REMAINING: `PRACTITIONER_IS_CA=true` ONLY if
      the CA confirmation above is yes.
- [ ] **Quiet-machine Lighthouse re-measure** (KNOWN_ISSUES #17) — perf ≥ 90
      and LCP < 2.5 s confirmed off this machine.
- [x] **Deploy/publish [GATE]** — CLEARED 20 Nov: the owner officially
      launched on Netlify himself ("officially launching it… in netlify do
      necessary setting to optimize") — supersedes the Vercel-per-
      DEPLOYMENT.md path (DECISION_LOG, 20 Nov).
