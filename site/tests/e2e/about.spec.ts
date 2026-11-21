import { expect, test } from "@playwright/test";
import {
  expectNoAppointmentOnCtaSurfaces,
  expectNoInventedClaims,
  expectRailNum,
  gotoAbout,
  prefillOf,
  TEL_HREF,
  site,
} from "./helpers";
import { confirmedTeam } from "../../lib/site-config";
import { practitionerIsCa } from "../../lib/content-mode";
import { founderBioAbout } from "../../lib/founder-bio";
import { sampleTeam, principalQuote } from "../../lib/sample-content";

/**
 * Phase 3 Stage B QA — `/about` on the Kept Ledger system.
 * Sources of truth: docs/design/phase-3/page-specs.md §0 (shared head, §
 * numbering, CTA surfaces, prefill shape, placeholder convention) and §1
 * (/about contract); honesty rules per §2.4/§9.
 */

// §0.3 page-aware prefill, /about attribution, built from config not hard-coded.
const EXPECTED_ABOUT_PREFILL = `Hello ${site.name}, I would like to book a consultation — via the website's about page.`;

test.describe("About — structure & content (page-specs §1)", () => {
  test.setTimeout(90_000);

  test.beforeEach(async ({ page }) => {
    await gotoAbout(page);
  });

  test("exactly one h1 — person, place and years", async ({ page }) => {
    const h1 = page.locator("main h1");
    await expect(h1).toHaveCount(1);
    await expect(h1).toHaveText("Parbhati Lal Sharma has practised in Jaisalmer since 2001.");
  });

  test("ruled head: bare ABOUT eyebrow + h1 in the opening ledger rail (T14-A)", async ({ page }) => {
    // T14-A (owner order): the page-head eyebrow is the BARE page name —
    // no firm name, no place, no tagline.
    const head = page.locator("main section.ledger-rail").first();
    const label = head.locator("p.rail-label").first();
    await expect(label).toHaveText("ABOUT");
    await expect(label, "no firm name in the eyebrow").not.toContainText(
      site.shortName
    );
    await expect(label, "no place in the eyebrow").not.toContainText("Jaisalmer");
    await expect(label, "no tagline in the eyebrow").not.toContainText(site.tagline);
    await expect(head.locator("h1")).toHaveCount(1);
  });

  test("hero lead renders the shared founder bio WITHOUT the free sentence (T14-C, §0.6 three placements)", async ({ page }) => {
    // The /about hero lead is the SAME source as Home's hero paragraph
    // (lib/founder-bio.ts), minus the final free-consultation sentence —
    // /about §02 owns that line.
    const head = page.locator("main section.ledger-rail").first();
    const lead = head.locator("p.text-lead");
    await expect(lead).toHaveCount(1);
    await expect(lead).toHaveText(founderBioAbout);
    await expect(
      lead,
      "the hero must not carry the free sentence — §02 owns it"
    ).not.toContainText("The first consultation is free.");
  });

  test("§ numbering restarts: 01 practice, 02 principal, 03 team (rail-num device)", async ({ page }) => {
    // B3: the "§ 0N · Title" string labels became the rail-num device —
    // figure, hairline rule and text, `data-numeric` on the figure.
    // Served evidence: spec-evidence.json → about.railLabels.
    const labels = page.locator("main p.rail-label.rail-num");
    await expect(labels).toHaveCount(3);
    await expectRailNum(labels.nth(0), "01", "The practice");
    await expectRailNum(labels.nth(1), "02", "The principal");
    await expectRailNum(labels.nth(2), "03", "The team");
  });

  test("fold plate: decorative alt + dimensions, not a link, captions carry the facts", async ({ page }) => {
    const img = page.locator('main img[src*="founder-plate"]');
    await expect(img).toHaveCount(1);
    // Same decorative-in-link pattern as Home — but here it is not a link at all:
    // /about IS the plate's target page.
    await expect(img).toHaveAttribute("alt", "");
    // The polished plate (T1/B2 asset rename) — never the raw father.jpg.
    await expect(img).toHaveAttribute("src", /founder-plate-polished\.webp$/);
    await expect(img).toHaveAttribute("width", "300");
    await expect(img).toHaveAttribute("height", "375");
    // Stage E P3: same LCP priority as the Home plate.
    await expect(img).toHaveAttribute("fetchpriority", "high");
    const isLinked = await img.evaluate((el) => el.closest("a") !== null);
    expect(isLinked, "the /about plate must not be a link").toBe(false);
    const plate = page.locator("main figure").filter({
      has: page.locator('img[src*="founder-plate"]'), // relative to the figure
    });
    await expect(plate).toContainText(confirmedTeam[0].name);
    await expect(plate).toContainText("Principal Consultant · Jaisalmer");
    // T1/§1.3 caption move (B2): exactly two caption rows BELOW the image —
    // the "Since 2001" row is deleted (the h1 and the §01 record line carry
    // the fact). Served evidence: spec-evidence.json → about.plateFigure.
    const captions = plate.locator("p.rail-label");
    await expect(captions).toHaveCount(2);
    await expect(captions.nth(0)).toHaveText("Parbhati Lal Sharma");
    await expect(captions.nth(1)).toHaveText("Principal Consultant · Jaisalmer");
    await expect(plate).not.toContainText(`Since ${site.establishedYear}`);
    const captionsBelowImage = await plate.evaluate((fig) => {
      const imgEl = fig.querySelector("img");
      const cap = fig.querySelector("p.rail-label");
      return (
        !!imgEl &&
        !!cap &&
        !!(imgEl.compareDocumentPosition(cap) & Node.DOCUMENT_POSITION_FOLLOWING)
      );
    });
    expect(captionsBelowImage, "captions sit below the image").toBe(true);
  });

  test("the one honest stat renders as the §01 record line — nowhere else", async ({ page }) => {
    // B3: the rail-num figures ALSO carry `data-numeric`, so the old
    // page-wide count of 1 is now 4 = 3 figures + this line. Scope to the
    // PLAIN data-numeric rail-label: exactly one — the record line.
    // Served evidence: about.dataNumericCount = 4.
    const recordLine = page.locator("main p.rail-label[data-numeric]");
    await expect(recordLine).toHaveCount(1);
    await expect(recordLine).toHaveText(
      `Since ${site.establishedYear} · ${site.stats[0].label}`
    );
    await expect(page.locator("main [data-numeric]")).toHaveCount(4);
  });

  test("the §01 story renders the variant matching the practitioner's CA flag (T6)", async ({ page }) => {
    // The story sentence is CA-gated: "audits" drops out until the owner
    // sets PRACTITIONER_IS_CA. Served (flag unset = false):
    // spec-evidence.json → about.section01.
    const section = page.locator("main section.ledger-rail").filter({
      has: page.locator("h2", { hasText: "The practice" }),
    });
    await expect(section).toHaveCount(1);
    const NON_CA =
      "The work is the everyday work of a tax office: income tax returns and notices, GST registration and returns, business registrations, tax planning, TDS and bookkeeping.";
    const CA =
      "The work is the everyday work of a tax office: income tax returns and notices, GST registration and returns, audits, business registrations, tax planning, TDS and bookkeeping.";
    if (practitionerIsCa) {
      await expect(section).toContainText(CA);
    } else {
      await expect(section).toContainText(NON_CA);
      await expect(section, "non-CA build must not name audits").not.toContainText("audits,");
    }
  });

  test("the canonical free-first sentence ships in §02 — exactly once on the page", async ({ page }) => {
    // §0.6: exactly three placements site-wide; /about §02 is one of them.
    // T14-C: the hero must NOT carry it (pinned separately above), so the
    // page total is exactly one.
    await expect(page.locator("main")).toContainText("The first consultation is free.");
    const occurrences = (await page.locator("main").innerText()).match(
      /The first consultation is free\./g
    )?.length;
    expect(occurrences, "'The first consultation is free.' appears exactly once on /about").toBe(1);
  });

  test("§02 principal quote renders in the default build — centred full-width, untagged (T16/T15b)", async ({ page }) => {
    // T16: principalQuote.confirmed is set, so the owner-approved line
    // ships in the default (flag-unset) build — the block is no longer a
    // preview-only/empty gap. T15b: it spans the full page width and is
    // centred; the SAMPLE badges are retired from every page (T16), so no
    // tag may sit inside or beside it.
    expect(principalQuote.confirmed, "the owner-approved confirmed line (T16)").toBeTruthy();
    const block = page.locator("main div.col-span-full");
    await expect(block, "the one full-width quote block").toHaveCount(1);
    await expect(block, "centred full-width (T15b)").toHaveClass(/text-center/);
    await expect(block, "cross-axis centred (T15b)").toHaveClass(/items-center/);
    await expect(block.locator("p.text-body")).toHaveText(
      `“${principalQuote.confirmed}”`
    );
    await expect(
      block.locator(".sample-tag"),
      "no sample tag inside the confirmed quote (T16)"
    ).toHaveCount(0);
  });

  test("the team renders the confirmed tier — founder entry + ONE support line, no bare name rows", async ({ page }) => {
    // TASK 0 tier system + T14-E (owner order): the confirmed tier is the
    // founder (name + role) plus the three owner-confirmed associate names.
    // T17 F1 (critic): the three bare-name rows (unfilled-data look) fold
    // into ONE honest entry — names kept, "office support team" descriptor
    // added, no invented roles. sampleTeam is empty, so preview and
    // production cannot duplicate them; nothing sample-tagged may render
    // on /about in ANY tier.
    expect(confirmedTeam, "owner-confirmed team is the founder + 3 associates").toHaveLength(4);
    // The founder keeps their own entry + name heading.
    const names = page.locator("main h3");
    await expect(names, "only the founder keeps a name heading").toHaveCount(1);
    await expect(names).toHaveText(confirmedTeam[0].name);
    await expect(page.locator("main")).toContainText(confirmedTeam[0].role);
    // The associates ship as exactly one ruled entry carrying every name.
    const support = page.locator("main .ruled-entry", {
      hasText: "the office support team",
    });
    await expect(support, "one support entry (T17 F1)").toHaveCount(1);
    for (const member of confirmedTeam.slice(1)) {
      await expect(support, `associate kept: ${member.name}`).toContainText(
        member.name
      );
    }
    // T14-E: zero SAMPLE tags on /about — the names are confirmed content.
    await expect(page.locator(".sample-tag")).toHaveCount(0);
    const body = await page.content();
    expect(body, "no SAMPLE tag text on /about").not.toContain("SAMPLE");
    const html = body; // includes the RSC flight payload
    for (const sample of sampleTeam) {
      expect(
        html,
        `sample associate must not render in production: "${sample.name}"`
      ).not.toContain(sample.name);
      expect(
        html,
        `sample associate role must not render in production: "${sample.role}"`
      ).not.toContain(sample.role);
    }
  });

  test("no placeholder marks ship on /about — both removed by owner order (T14-B)", async ({ page }) => {
    // §0.4 flipped: the two [PLACEHOLDER — …] marks the page used to carry
    // are gone by owner order (T14-B). The pin now asserts ABSENCE — the
    // page is complete, not pending.
    const marks = page.locator("main .placeholder-mark");
    await expect(marks, "zero placeholder marks on /about").toHaveCount(0);
    const html = await page.content(); // includes the RSC flight payload
    expect(html, "no [PLACEHOLDER string anywhere on /about").not.toContain(
      "[PLACEHOLDER"
    );
  });

  test("act band: once, canonical CTA, page-aware prefill, quiet phone", async ({ page }) => {
    const band = page.locator("section.act-band");
    await expect(band).toHaveCount(1);
    await expect(page.locator("main > section:last-of-type")).toHaveClass(/act-band/);
    await expect(band.locator("h2")).toHaveText(
      "Ask him directly — send your name and what you need on WhatsApp."
    );

    const cta = band.locator("a.btn-primary");
    await expect(cta).toHaveCount(1);
    await expect(cta).toHaveText("Book a consultation on WhatsApp");
    // §0.3: the decoded prefill is the full page-aware sentence, byte-exact.
    expect(prefillOf((await cta.getAttribute("href"))!)).toBe(EXPECTED_ABOUT_PREFILL);

    const tel = band.locator('a[href^="tel:"]');
    await expect(tel).toHaveText(`Call the office · ${site.phone}`);
    await expect(tel).toHaveAttribute("href", TEL_HREF);
  });
});

test.describe("About — honesty regression guards", () => {
  test.setTimeout(90_000);

  test.beforeEach(async ({ page }) => {
    await gotoAbout(page);
  });

  test("zero 'Book an Appointment' anywhere in the served page", async ({ page }) => {
    // Raw content() includes the RSC flight payload — stricter than the DOM.
    const html = await page.content();
    expect(html).not.toMatch(/book\s+an?\s+appointment/i);
  });

  test("zero 'appointment' on CTA surfaces (link/button text, aria-labels, titles)", async ({ page }) => {
    await expectNoAppointmentOnCtaSurfaces(page);
  });

  test("no stars, no rating schema, no fee figures, no invented names or stats", async ({ page }) => {
    await expectNoInventedClaims(page);
  });
});
