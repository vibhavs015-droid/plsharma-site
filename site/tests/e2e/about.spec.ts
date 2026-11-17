import { expect, test } from "@playwright/test";
import {
  expectNoAppointmentOnCtaSurfaces,
  expectNoInventedClaims,
  gotoAbout,
  prefillOf,
  TEL_HREF,
  site,
} from "./helpers";
import { team } from "../../lib/site-config";

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

  test("§ numbering restarts: 01 practice, 02 principal, 03 team", async ({ page }) => {
    const markers = page.locator("main p.rail-label").filter({ hasText: /^§ 0\d/ });
    await expect(markers).toHaveCount(3);
    await expect(markers).toHaveText([
      "§ 01 · The practice",
      "§ 02 · The principal",
      "§ 03 · The team",
    ]);
  });

  test("fold plate: decorative alt + dimensions, not a link, captions carry the facts", async ({ page }) => {
    const img = page.locator('main img[src*="founder-plate"]');
    await expect(img).toHaveCount(1);
    // Same decorative-in-link pattern as Home — but here it is not a link at all:
    // /about IS the plate's target page.
    await expect(img).toHaveAttribute("alt", "");
    await expect(img).toHaveAttribute("src", /founder-plate\.webp$/);
    await expect(img).toHaveAttribute("width", "300");
    await expect(img).toHaveAttribute("height", "375");
    // Stage E P3: same LCP priority as the Home plate.
    await expect(img).toHaveAttribute("fetchpriority", "high");
    const isLinked = await img.evaluate((el) => el.closest("a") !== null);
    expect(isLinked, "the /about plate must not be a link").toBe(false);
    const plate = page.locator("main figure").filter({
      has: page.locator('img[src*="founder-plate"]'), // relative to the figure
    });
    await expect(plate).toContainText(team[0].name);
    await expect(plate).toContainText("Principal Consultant · Jaisalmer");
    await expect(plate).toContainText(`Since ${site.establishedYear}`);
  });

  test("the one honest stat renders as the §01 record line — nowhere else", async ({ page }) => {
    const numeric = page.locator("main [data-numeric]");
    await expect(numeric).toHaveCount(1);
    await expect(numeric).toContainText(`Since ${site.establishedYear} · ${site.stats[0].label}`);
  });

  test("the canonical free-first sentence ships in §02", async ({ page }) => {
    // §0.6: exactly three placements site-wide; /about §02 is one of them.
    await expect(page.locator("main")).toContainText("The first consultation is free.");
  });

  test("the team renders names only — provisional roles stay unrendered", async ({ page }) => {
    const names = page.locator("main h3");
    await expect(names).toHaveCount(4);
    await expect(names).toHaveText([team[0].name, team[1].name, team[2].name, team[3].name]);
    // The founder's confirmed role shows; the associates' provisional roles do not.
    await expect(page.locator("main")).toContainText(team[0].role);
    const mainText = await page.locator("main").innerText();
    for (const provisionalRole of [team[1].role, team[2].role, team[3].role]) {
      expect(mainText, `provisional role must stay unrendered: "${provisionalRole}"`).not.toContain(
        provisionalRole
      );
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
    await expect(page.locator("main > section:last-child")).toHaveClass(/act-band/);
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
