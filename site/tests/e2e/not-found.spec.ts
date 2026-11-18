import { expect, test } from "@playwright/test";

/**
 * B5 — the branded 404 (wording-spec §8 amendment, TASK 8 part 2).
 *
 * Every pin verified against the served default build:
 * spec-evidence.json → notFound, default-build-evidence.json → extras.notFound.
 * The 404 renders inside the ROOT layout (header, footer, skip link and the
 * WhatsApp float wrap it; it lands inside <main id="main">), answers with
 * status 404, carries Next's auto-injected noindex, and has NO metadata
 * export so the layout's default <title> survives.
 */

const UNKNOWN = "/this-page-does-not-exist";
const LAYOUT_TITLE = "P.L. Sharma And Company — Tax Consultants & Financial Advisors";

test.describe("404 — unknown URL (B5)", () => {
  test.setTimeout(90_000);

  test("unknown URL answers status 404 with the shipped h1", async ({ page }) => {
    const res = await page.goto(UNKNOWN, { waitUntil: "load" });
    expect(res?.status(), "unknown URL must answer 404").toBe(404);
    const h1 = page.locator("main h1");
    await expect(h1).toHaveCount(1);
    // The RENDERED text — Next escapes the apostrophe in the source file.
    await expect(h1).toHaveText("That page isn't here.");
  });

  test("identity marker is a PLAIN rail-label — a 404 is not a numbered section", async ({
    page,
  }) => {
    await page.goto(UNKNOWN, { waitUntil: "load" });
    const marker = page.locator("main p.rail-label");
    await expect(marker).toHaveCount(1);
    await expect(marker).toHaveText("P.L. Sharma & Co. · 404 · Jaisalmer");
    await expect(marker, "no rail-num device on the 404 marker").not.toHaveClass(
      /rail-num/
    );
  });

  test("Next's default 404 copy is gone", async ({ page }) => {
    await page.goto(UNKNOWN, { waitUntil: "load" });
    const html = await page.content(); // DOM + RSC payload
    expect(html, "default Next.js 404 copy must not render").not.toContain(
      "This page could not be found"
    );
  });

  test("the five quick exits render in main and each resolves 200", async ({ page }) => {
    await page.goto(UNKNOWN, { waitUntil: "load" });
    const links = page.locator("main a");
    await expect(links).toHaveCount(5);
    // Order verified in served HTML: spec-evidence.json → notFound.mainQuickLinks.
    await expect(links).toHaveText([
      "Book a consultation",
      "Home",
      "Services",
      "FAQ",
      "Contact",
    ]);
    const hrefs = await links.evaluateAll((els) =>
      els.map((el) => el.getAttribute("href"))
    );
    expect(hrefs).toEqual(["/book", "/", "/services", "/faq", "/contact"]);
    for (const href of hrefs) {
      const res = await page.request.get(href!);
      expect(res.status(), `${href} (quick exit) must resolve 200`).toBe(200);
    }
  });

  test("chrome wraps the 404: header, footer, skip link, WhatsApp float", async ({
    page,
  }) => {
    await page.goto(UNKNOWN, { waitUntil: "load" });
    await expect(page.locator("header")).toHaveCount(1);
    await expect(page.locator("footer")).toHaveCount(1);
    await expect(page.getByRole("link", { name: "Skip to main content" })).toHaveCount(1);
    // DOM presence is enough — phones-first CSS may hide the float at some
    // viewport widths, and the bar (absent here) would carry the same name.
    await expect(
      page.locator('a[aria-label="Book a consultation on WhatsApp"]')
    ).toHaveCount(1);
  });

  test("auto noindex, layout-default title, h1 inside the main landmark", async ({
    page,
  }) => {
    await page.goto(UNKNOWN, { waitUntil: "load" });
    // Next auto-injects <meta name="robots" content="noindex"> for every 404
    // (the not-found.tsx decision: no metadata export on purpose) — the
    // layout's site-wide "noindex, nofollow" ALSO ships, so the page carries
    // two robots metas (served: strict-mode evidence). Pin the auto-injected
    // EXACT noindex; the layout half is pinned in seo-head.spec.ts.
    await expect(
      page.locator('meta[name="robots"][content="noindex"]')
    ).toHaveCount(1);
    // No export → the layout's default title survives.
    await expect(page).toHaveTitle(LAYOUT_TITLE);
    await expect(page.locator("main h1")).toHaveCount(1);
  });
});
