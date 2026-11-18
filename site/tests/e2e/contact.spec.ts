import { expect, test } from "@playwright/test";
import {
  expectNoAppointmentOnCtaSurfaces,
  expectNoInventedClaims,
  expectRailNum,
  gotoContact,
  prefillOf,
  site,
  TEL_HREF,
} from "./helpers";

/**
 * Phase 3 Stage C QA — `/contact` on the Kept Ledger system.
 *
 * Sources of truth: docs/design/phase-3/page-specs.md §0 (global head/band
 * rules) and §6 (the /contact contract: desk slip with rows in a fixed order,
 * the ONE map link, hours stated never widgeted, email quiet and last, the
 * walk-in entry, page-aware prefill); honesty rules per §2.4/§9.
 *
 * Every content assertion is made against `site/lib/site-config.ts` — the
 * address, hours, phone, email and maps link are byte-tracked to config, so
 * an engineer editing the config gets caught, not worked around.
 */

// §0.3 page-aware prefill for the band primary, /contact attribution.
const EXPECTED_CONTACT_PREFILL = `Hello ${site.name}, I would like to book a consultation — via the website's contact page.`;

// §0.3 exception (and §6 fold item 4): the desk card's WhatsApp row keeps the
// QUESTION prefill — a contact-page message is not always a booking.
const QUESTION_PREFILL = `Hello ${site.name}, I have a question.`;

test.describe("Contact — structure & content (page-specs §6)", () => {
  test.setTimeout(90_000);

  test.beforeEach(async ({ page }) => {
    await gotoContact(page);
  });

  test("exactly one h1 — the office sentence", async ({ page }) => {
    const h1 = page.locator("main h1");
    await expect(h1).toHaveCount(1);
    await expect(h1).toHaveText("One office in Jaisalmer — open six days a week.");
  });

  test("ruled head: rail-label, and the lead carries the essentials as searchable text", async ({ page }) => {
    const head = page.locator("main section.ledger-rail").first();
    await expect(head.locator("p.rail-label")).toHaveText(`${site.shortName} · Contact · Jaisalmer`);
    const lead = head.locator("p.text-lead");
    await expect(lead).toContainText("109, Indira Colony");
    // Hours in the lead render from config so the stated times can't drift.
    await expect(lead).toContainText(`${site.hours[0].days}, ${site.hours[0].time}`);
    await expect(lead).toContainText("WhatsApp and phone reach the same desk.");
  });

  test("no embedded map, no embedded form: zero <iframe>, zero form widgets in main", async ({ page }) => {
    // §6 do-not list: the map iframe is gone (one map link instead) and the
    // BookingForm that duplicated /book is gone (header/float/band are the
    // booking surface).
    await expect(page.locator("iframe")).toHaveCount(0);
    await expect(page.locator("main form")).toHaveCount(0);
    await expect(page.locator("main input, main textarea, main select")).toHaveCount(0);
  });

  test("zero BookingForm artifacts or retired wording anywhere in the served page", async ({ page }) => {
    // The retired slip head ("Consultation request") and submit ("Open
    // WhatsApp with my request") must not resurface; §9.2 wording ban too.
    const html = await page.content();
    expect(html, "retired BookingForm slip head").not.toMatch(/consultation request/i);
    expect(html, "retired BookingForm submit").not.toMatch(/open whatsapp with my request/i);
    expect(html, "retired CTA wording (§9.2)").not.toMatch(
      /book\s+an?\s+appointment|send booking request|get started/i
    );
  });

  test("the desk card is one .slip with the ruled head 'The office'", async ({ page }) => {
    const slip = page.locator(".slip");
    await expect(slip).toHaveCount(1);
    await expect(slip.locator(".slip-head h2")).toHaveText("The office");
  });

  test("desk rows render in the §6 order: call → WhatsApp → address(+maps) → hours → email", async ({ page }) => {
    const slip = page.locator(".slip");
    const rows = slip.locator("div.grid > div");
    await expect(rows).toHaveCount(5);
    // The row labels, in DOM order, ARE the desk order (§6 fold item 4).
    await expect(slip.locator("p.rail-label")).toHaveText([
      "Call the office",
      "WhatsApp",
      "Address",
      "Hours",
      "Email",
    ]);
  });

  test("the call row is the real office tel: link", async ({ page }) => {
    const call = page.locator(".slip div.grid > div").nth(0).locator('a[href^="tel:"]');
    await expect(call).toHaveCount(1);
    await expect(call).toHaveAttribute("href", TEL_HREF);
    await expect(call).toHaveText(site.phone);
    // O-7a: the tel row needs no aria-label — its visible text is its name.
    expect(await call.getAttribute("aria-label")).toBeNull();
  });

  test("the desk's WhatsApp row keeps the QUESTION prefill — not a booking request", async ({ page }) => {
    // §0.3 exception / §6: a contact-page message is not always a booking.
    const desk = page.locator(".slip div.grid > div").nth(1).locator('a[href^="https://wa.me/"]');
    await expect(desk).toHaveCount(1);
    await expect(desk).toHaveText(site.phone);
    // O-7a: the two desk links show the same visible number — the WhatsApp
    // row's aria-label must distinguish it, byte-equal to the shipped label.
    await expect(desk).toHaveAttribute("aria-label", `WhatsApp · ${site.phone}`);
    const prefill = prefillOf((await desk.getAttribute("href"))!);
    expect(prefill).toBe(QUESTION_PREFILL);
    expect(prefill, "the desk WhatsApp row is a question, not a booking request").not.toMatch(
      /book a consultation/i
    );
  });

  test("exactly one Google Maps link, in the Address row, byte-equal to config", async ({ page }) => {
    const maps = page.locator('a[href*="maps.app.goo.gl"]');
    await expect(maps, "one map link on the whole page").toHaveCount(1);
    await expect(maps).toHaveAttribute("href", site.mapsLink);
    await expect(maps).toHaveText("Open in Google Maps");
    // It lives in the Address desk row (the third row, per the order test).
    await expect(page.locator(".slip div.grid > div").nth(2).locator('a[href*="maps.app.goo.gl"]')).toHaveCount(1);
    // The address itself renders as text next to the link.
    await expect(page.locator(".slip div.grid > div").nth(2)).toContainText(site.address);
  });

  test("hours are stated from config, byte-equal, and never widgeted", async ({ page }) => {
    // §6: hours are stated, never widgeted — no live open/closed badge, no
    // links inside the Hours row.
    const hoursRow = page.locator(".slip div.grid > div").nth(3);
    const lines = await hoursRow.evaluate((row) =>
      Array.from(row.querySelectorAll("p"))
        .filter((p) => !p.classList.contains("rail-label"))
        .map((p) => (p.textContent ?? "").trim())
    );
    expect(lines, "hour lines byte-equal to site-config (label row excluded)").toEqual([
      `${site.hours[0].days} · ${site.hours[0].time}`,
      `${site.hours[1].days} · ${site.hours[1].time}`,
    ]);
    await expect(hoursRow.locator("a"), "no widget or link inside the Hours row").toHaveCount(0);
  });

  test("email is a quiet mailto: link, and it is the last desk row", async ({ page }) => {
    const email = page.locator(".slip div.grid > div").nth(4).locator('a[href^="mailto:"]');
    await expect(email).toHaveCount(1);
    await expect(email).toHaveAttribute("href", `mailto:${site.email}`);
    await expect(email).toHaveText(site.email);
  });

  test("§02 carries the walk-in entry under its rail-num label", async ({ page }) => {
    // B3: the "§ 02 · Before you come" string became the rail-num device —
    // located by its text part (served evidence: spec-evidence.json →
    // contact.railLabels).
    const label = page.locator("main p.rail-label.rail-num").filter({
      has: page.locator(".rail-num-text", { hasText: "Before you come" }),
    });
    await expectRailNum(label, "02", "Before you come");
    const entry = page.locator("main li.ruled-entry");
    await expect(entry).toHaveCount(1);
    await expect(entry).toContainText(
      "Walk in any working day — books and audit papers are easier across a desk. Routine matters (returns, GST filings, documents) often don't need a visit at all: they move over WhatsApp."
    );
  });

  test("act band: once, closes the page, earned sentence, canonical CTA, contact-attributed prefill, quiet phone", async ({ page }) => {
    const band = page.locator("section.act-band");
    await expect(band).toHaveCount(1);
    await expect(page.locator("main > section:last-of-type")).toHaveClass(/act-band/);
    await expect(band.locator("p.rail-label")).toHaveText("The next step");
    await expect(band.locator("h2")).toHaveText(
      "We reply on WhatsApp and fix a time — or just walk in."
    );

    const cta = band.locator("a.btn-primary");
    await expect(cta).toHaveCount(1);
    await expect(cta).toHaveText("Book a consultation on WhatsApp");
    expect(prefillOf((await cta.getAttribute("href"))!)).toBe(EXPECTED_CONTACT_PREFILL);

    const tel = band.locator('a[href^="tel:"]');
    await expect(tel).toHaveText(`Call the office · ${site.phone}`);
    await expect(tel).toHaveAttribute("href", TEL_HREF);
  });

  test("metadata title is the contact title", async ({ page }) => {
    // layout.tsx applies the `%s | ${site.name}` template.
    await expect(page).toHaveTitle(`Contact the office | ${site.name}`);
  });
});

test.describe("Contact — honesty regression guards", () => {
  test.setTimeout(90_000);

  test.beforeEach(async ({ page }) => {
    await gotoContact(page);
  });

  test("zero 'appointment' on CTA surfaces (link/button text, aria-labels, titles)", async ({ page }) => {
    await expectNoAppointmentOnCtaSurfaces(page);
  });

  test("no stars, no rating schema, no fee figures, no invented names or stats", async ({ page }) => {
    await expectNoInventedClaims(page);
  });
});
