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
import { sampleTeam } from "../../lib/sample-content";

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

  test("ruled head: rail-label + h1 in the opening ledger rail", async ({ page }) => {
    const head = page.locator("main section.ledger-rail").first();
    await expect(head.locator("p.rail-label").first()).toHaveText(
      `${site.shortName} · About · Jaisalmer`
    );
    await expect(head.locator("h1")).toHaveCount(1);
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

  test("the canonical free-first sentence ships in §02", async ({ page }) => {
    // §0.6: exactly three placements site-wide; /about §02 is one of them.
    await expect(page.locator("main")).toContainText("The first consultation is free.");
  });

  test("the team renders the confirmed tier — the founder only; associates stay preview-only", async ({ page }) => {
    // TASK 0 tier system: a default production build resolves visibleTeam
    // to the confirmed tier — the founder, whose confirmed role renders;
    // the three sample associates (sample-content.ts) are owner-preview
    // only and must leak nowhere, roles included.
    const names = page.locator("main h3");
    await expect(names).toHaveCount(confirmedTeam.length);
    await expect(names).toHaveText(confirmedTeam.map((member) => member.name));
    await expect(page.locator("main")).toContainText(confirmedTeam[0].role);
    const html = await page.content(); // includes the RSC flight payload
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

  test("placeholder marks ship exactly where content is pending (§0.4)", async ({ page }) => {
    const marks = page.locator("main .placeholder-mark");
    await expect(marks).toHaveCount(2);
    await expect(marks.nth(0)).toHaveText(
      "[PLACEHOLDER — A LINE FROM THE PRINCIPAL HIMSELF, AWAITING OWNER]"
    );
    await expect(marks.nth(1)).toHaveText(
      "[PLACEHOLDER — TEAM PHOTOS AND CONFIRMED ROLES, AWAITING OWNER]"
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
