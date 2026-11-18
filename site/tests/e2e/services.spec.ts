import { expect, test } from "@playwright/test";
import {
  expectNoAppointmentOnCtaSurfaces,
  expectNoInventedClaims,
  gotoServices,
  prefillOf,
  TEL_HREF,
  site,
} from "./helpers";
import { services } from "../../lib/site-config";
import { practitionerIsCa } from "../../lib/content-mode";

/**
 * Phase 3 Stage B QA — `/services` on the Kept Ledger system.
 * Sources of truth: docs/design/phase-3/page-specs.md §0 and §2 (/services
 * contract, §7.2 byte-match rule); honesty rules per §2.4/§9.
 *
 * Every content assertion is made against `site/lib/site-config.ts` — the
 * titles, deep-link values and copy are byte-matched to config, never
 * hard-coded, so an engineer editing the config gets caught, not worked
 * around.
 */

// §0.3 page-aware prefill, /services attribution, built from config.
const EXPECTED_SERVICES_PREFILL = `Hello ${site.name}, I would like to book a consultation — via the website's services page.`;

test.describe("Services — structure & content (page-specs §2)", () => {
  test.setTimeout(90_000);

  test.beforeEach(async ({ page }) => {
    await gotoServices(page);
  });

  test("exactly one h1 — the recognition frame", async ({ page }) => {
    const h1 = page.locator("main h1");
    await expect(h1).toHaveCount(1);
    // T6 CA gate (served, flag unset = false): the non-CA variant names the
    // "audit support" service card instead of the retired "audits" line.
    await expect(h1).toHaveText(
      practitionerIsCa
        ? "Income tax, GST, audits, registration — the work, in your words."
        : "Income tax, GST, audit support, registration — the work, in your words."
    );
  });

  test("ruled head: rail-label + h1 in the opening ledger rail", async ({ page }) => {
    const head = page.locator("main section.ledger-rail").first();
    await expect(head.locator("p.rail-label").first()).toHaveText(
      `${site.shortName} · Services · Jaisalmer`
    );
    await expect(head.locator("h1")).toHaveCount(1);
  });

  test("six numbered entries render in site-config order", async ({ page }) => {
    const entries = page.locator("main li.ruled-entry");
    await expect(entries).toHaveCount(6);
    // §2: owner content, config order, do not reorder.
    await expect(entries.locator("h3")).toHaveText(services.map((s) => s.title));
    await expect(entries.locator("span.rail-label")).toHaveText(
      services.map((_, i) => String(i + 1).padStart(2, "0"))
    );
  });

  test("entry content renders verbatim from config (descriptions and points)", async ({ page }) => {
    const entries = page.locator("main li.ruled-entry");
    await expect(entries).toHaveCount(6);
    for (let i = 0; i < services.length; i++) {
      const entry = entries.nth(i);
      await expect(entry).toContainText(services[i].description);
      for (const point of services[i].points) {
        await expect(entry).toContainText(`— ${point}`);
      }
    }
  });

  test("every entry deep-links /book?service=<title>, byte-matched to config", async ({ page }) => {
    const entries = page.locator("main li.ruled-entry");
    await expect(entries).toHaveCount(6);
    for (let i = 0; i < services.length; i++) {
      const link = entries.nth(i).locator('a[href^="/book?service="]');
      // §7.2: the param value must byte-match the /book Select values — the
      // exact services[].title strings.
      await expect(link, `entry ${i + 1} (${services[i].title}) carries its deep link`).toHaveCount(1);
      await expect(link).toHaveAttribute("href", `/book?service=${encodeURIComponent(services[i].title)}`);
      await expect(link).toHaveText("Book a consultation — the form opens with this service chosen.");
    }
  });

  test("each entry deep link has a distinct accessible name (a11y observation O-1)", async ({ page }) => {
    // O-1 (a11y Stage B audit): the six deep links share one visible label, so
    // their accessible names must be made distinct — the aria-label carries
    // the exact service title, byte-matched to config.
    const entries = page.locator("main li.ruled-entry");
    await expect(entries).toHaveCount(6);
    for (let i = 0; i < services.length; i++) {
      await expect(entries.nth(i).locator('a[href^="/book?service="]')).toHaveAttribute(
        "aria-label",
        `Book a consultation — the form opens with ${services[i].title} chosen.`
      );
    }
  });

  test("entry 01 alone carries the what-to-bring line", async ({ page }) => {
    // §2 inventory item 6: one exception, drawn from the FAQ documents answer;
    // no other entry invents a document list.
    const entries = page.locator("main li.ruled-entry");
    await expect(entries.first()).toContainText(
      "Form 16, PAN and your investment proofs are usually enough to start — you get a checklist for your case."
    );
    const occurrences = (await page.locator("main").innerText()).match(
      /Form 16, PAN and your investment proofs/g
    )?.length;
    expect(occurrences, "the what-to-bring line appears exactly once").toBe(1);
  });

  test("the earned /faq click sits after the list, before the band", async ({ page }) => {
    const faqLink = page.locator('main a[href="/faq"]');
    await expect(faqLink).toHaveCount(1);
    // §7 lockstep 6 (B3): the quiet link was shortened.
    await expect(faqLink).toHaveText("Documents, fees, notices — the common questions");
  });

  test("act band: once, the not-sure path, canonical CTA, page-aware prefill", async ({ page }) => {
    const band = page.locator("section.act-band");
    await expect(band).toHaveCount(1);
    // The ActionBar <nav> follows the band inside <main> (B4) — the band is
    // the last SECTION, not the last child.
    await expect(page.locator("main > section:last-of-type")).toHaveClass(/act-band/);
    // The "not sure" affordance lives in the band sentence (§2 close); the
    // old "Not sure which service you need?" panel is deleted.
    await expect(band.locator("h2")).toHaveText(
      "Not sure which service is yours? Send one line — we'll tell you honestly."
    );
    await expect(page.locator("main")).not.toContainText("Not sure which service you need");

    const cta = band.locator("a.btn-primary");
    await expect(cta).toHaveCount(1);
    await expect(cta).toHaveText("Book a consultation on WhatsApp");
    expect(prefillOf((await cta.getAttribute("href"))!)).toBe(EXPECTED_SERVICES_PREFILL);

    const tel = band.locator('a[href^="tel:"]');
    await expect(tel).toHaveText(`Call the office · ${site.phone}`);
    await expect(tel).toHaveAttribute("href", TEL_HREF);
  });
});

test.describe("Services — honesty regression guards", () => {
  test.setTimeout(90_000);

  test.beforeEach(async ({ page }) => {
    await gotoServices(page);
  });

  test("zero retired wording anywhere in the served page", async ({ page }) => {
    // §9.2: no "Book an Appointment", "Send Booking Request", "Get started"
    // in any rebuilt route's rendered HTML or RSC payload.
    const html = await page.content();
    expect(html).not.toMatch(/book\s+an?\s+appointment/i);
    expect(html).not.toMatch(/send booking request|get started/i);
  });

  test("zero 'appointment' on CTA surfaces (link/button text, aria-labels, titles)", async ({ page }) => {
    await expectNoAppointmentOnCtaSurfaces(page);
  });

  test("no stars, no rating schema, no fee figures, no invented names or stats", async ({ page }) => {
    await expectNoInventedClaims(page);
  });
});
