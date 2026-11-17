import { expect, test } from "@playwright/test";
import { expectNoInventedClaims, gotoBook, TEL_HREF, site } from "./helpers";

/**
 * Phase 3 Stage A QA — `/book` as the Kept Ledger consultation slip.
 *
 * Sources of truth: user-problem.md §5.2 (the slip), §2.3 (CTA surfaces),
 * §2.4 (prohibitions); docs/design/phase-2/tokens.md (.slip, .act-band,
 * .rail-label, .ruled-entry). The honesty guards here are the same
 * regression rules Home got — nothing invented, nothing "appointment".
 */

test.describe("Book page — structure & content (§5.2)", () => {
  test.setTimeout(90_000);

  test.beforeEach(async ({ page }) => {
    await gotoBook(page);
  });

  test("exactly one h1, and it is 'Book a consultation'", async ({ page }) => {
    const h1 = page.locator("main h1");
    await expect(h1).toHaveCount(1);
    await expect(h1).toHaveText("Book a consultation");
  });

  test("the honest next-step line is present verbatim", async ({ page }) => {
    // §5.2 item 1: pre-answers the form's only surprise, before the form.
    const line = page.locator("main h1 + p");
    await expect(line).toHaveCount(1);
    await expect(line).toHaveText(
      "Fill in two details — WhatsApp opens with your request ready. We reply and confirm a time; nothing is booked automatically."
    );
  });

  test("the three-step rail label is present", async ({ page }) => {
    const steps = page
      .locator("main p.rail-label")
      .filter({ hasText: "1 your name" });
    await expect(steps).toHaveCount(1);
    await expect(steps).toHaveText("1 your name · 2 when suits you · 3 send on WhatsApp");
  });

  test("the form is the slip: .slip with a ruled head and the form inside", async ({ page }) => {
    const slip = page.locator("main .slip");
    await expect(slip).toHaveCount(1);
    await expect(slip.locator(".slip-head h2")).toHaveText("Consultation request");
    await expect(slip.locator("form")).toHaveCount(1);
  });

  test("the slip is the act surface: no end-of-page act band, closes on the talk-first entries", async ({ page }) => {
    // DECISION_LOG 15 Nov deviation (page-specs §7.1): /book ships NO .act-band
    // — the slip is the page's one act surface; no second fill CTA may compete
    // with the submit.
    await expect(page.locator("section.act-band")).toHaveCount(0);
    // The page closes with the "Prefer to talk first?" ruled entries instead,
    // and the tel path stays real (§3: stated, never sold).
    const lastSection = page.locator("main > section:last-child");
    await expect(lastSection).toContainText("Prefer to talk first?");
    const lastTel = lastSection.locator('a[href^="tel:"]');
    await expect(lastTel).toHaveCount(1);
    await expect(lastTel).toHaveAttribute("href", TEL_HREF);
    await expect(lastSection.locator("li.ruled-entry")).toHaveCount(4);
  });

  test("the page title metadata contains 'Book a consultation'", async ({ page }) => {
    await expect(page).toHaveTitle(/Book a consultation/);
  });

  test("'Prefer to talk first?' keeps its content, re-set as ruled entries", async ({ page }) => {
    // §3: the secondary paths are stated, never sold — phone, hours, address.
    const talkSection = page.locator("main section").filter({
      has: page.locator("p.rail-label", { hasText: "Prefer to talk first?" }),
    });
    await expect(talkSection).toHaveCount(1);

    const entries = talkSection.locator("li.ruled-entry");
    await expect(entries).toHaveCount(4); // phone + 2 hour lines + address
    await expect(entries.first()).toContainText(`Call the office · ${site.phone}`);
    await expect(entries.first().locator("a")).toHaveAttribute("href", TEL_HREF);
    await expect(talkSection).toContainText(`${site.hours[0].days} · ${site.hours[0].time}`);
    await expect(talkSection).toContainText(`${site.hours[1].days} · ${site.hours[1].time}`);
    await expect(talkSection).toContainText(site.address);
  });
});

test.describe("Book page — honesty regression guards (critic REJECT rules)", () => {
  test.setTimeout(90_000);

  test.beforeEach(async ({ page }) => {
    await gotoBook(page);
  });

  test("zero 'appointment' wording anywhere on /book (text, aria-labels, titles)", async ({ page }) => {
    // Raw content() includes the RSC flight payload and href bodies — stricter
    // than the visible DOM alone. The §2.3 retire rule bans the WORD itself.
    const html = await page.content();
    expect(html).not.toMatch(/appointment/i);
    const hiddenWording = await page.evaluate(() =>
      Array.from(document.querySelectorAll("[aria-label], [title]"))
        .map((el) => `${el.getAttribute("aria-label") ?? ""} ${el.getAttribute("title") ?? ""}`)
        .join(" | ")
    );
    expect(hiddenWording).not.toMatch(/appointment/i);
  });

  test("no invented claims: no ratings, no placeholder-testimonial names, no invented stats", async ({ page }) => {
    // Unified onto the shared sweep (Stage E): the invented-data guard now
    // checks visible text AND the served HTML incl. the RSC flight payload —
    // the same bar every other route runs — and adds the invented-role and
    // fee-figure checks. Strict superset of the former inline checks.
    await expectNoInventedClaims(page);
  });
});
