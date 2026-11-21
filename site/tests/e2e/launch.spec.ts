import { expect, test } from "@playwright/test";
import { siteUrl } from "../../lib/content-mode";

/**
 * T16 production-launch pins (owner request, 20 Nov 2026).
 *
 * Two owner-ordered launch facts that are NOT covered by the per-page
 * specs and must hold on EVERY route of the default (flag-unset) build:
 *
 * 1. The footer credit "Developed by Vibhav Sharma" — the footer's last
 *    element, on every route (the footer is layout-wide, so one loop
 *    proves all nine pages at once).
 * 2. The old preview host `plsharma-site-preview` must appear NOWHERE:
 *    the site was renamed to `plsharmaandcompany.netlify.app`
 *    (lib/content-mode.ts `siteUrl` is the single source), so neither a
 *    rendered HTML/RSC string nor a sitemap <loc> may carry the old host.
 *
 * The `.sample-tag` / `.sample-banner` structural sweep for all nine
 * routes already lives in sample-content.spec.ts (TASK 0 leak guard) —
 * deliberately not duplicated here.
 */

const ROUTES = [
  "/",
  "/about",
  "/services",
  "/book",
  "/faq",
  "/contact",
  "/why-choose-us",
  "/testimonials",
  "/privacy",
];

// The retired preview site's host (T16: site renamed on Netlify).
const OLD_HOST = "plsharma-site-preview";

test.describe("T16 launch — footer credit on every route", () => {
  test.setTimeout(90_000);

  for (const route of ROUTES) {
    test(`${route} carries the footer credit "Developed by Vibhav Sharma"`, async ({
      page,
    }) => {
      const res = await page.goto(route, { waitUntil: "load" });
      expect(res?.status(), `${route} must return 200`).toBe(200);
      const footer = page.locator("footer");
      await expect(
        footer.getByText("Developed by Vibhav Sharma", { exact: true }),
        `footer credit on ${route}`
      ).toHaveCount(1);
      // Quiet colophon: plain text, not a link (T16 owner order — at the
      // bottom of the footer where the quick links end).
      const credit = footer.getByText("Developed by Vibhav Sharma", {
        exact: true,
      });
      await expect(credit).toBeVisible();
      const tag = await credit.evaluate((el) => el.tagName.toLowerCase());
      expect(tag, "the credit is plain text, not a link").toBe("p");
    });
  }
});

test.describe("T16 launch — old preview host retired everywhere", () => {
  test.setTimeout(90_000);

  for (const route of ROUTES) {
    test(`${route} rendered HTML + RSC payload carries no ${OLD_HOST} string`, async ({
      page,
    }) => {
      const res = await page.goto(route, { waitUntil: "load" });
      expect(res?.status(), `${route} must return 200`).toBe(200);
      const html = await page.content(); // includes the RSC flight payload
      expect(
        html,
        `"${OLD_HOST}" must not appear on ${route} — the site moved to ${siteUrl}`
      ).not.toContain(OLD_HOST);
      // Sanity: the canonical/og URLs now name the official host.
      const ogUrl = await page
        .locator('meta[property="og:url"]')
        .getAttribute("content");
      expect(ogUrl, `${route} og:url sits on the official host`).toMatch(
        new RegExp(`^${siteUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`)
      );
    });
  }

  test("sitemap.xml carries no old-host loc — every loc sits on siteUrl", async ({
    page,
  }) => {
    const res = await page.request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(
      body,
      `"${OLD_HOST}" must not appear in the sitemap — the site moved to ${siteUrl}`
    ).not.toContain(OLD_HOST);
    const locs = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    expect(locs.length, "nine routes ship at launch (T16)").toBe(9);
    for (const loc of locs) {
      expect(loc, `sitemap loc on the official host: ${loc}`).toMatch(
        new RegExp(`^${siteUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`)
      );
    }
  });
});

test.describe("T16 launch — quote list key fix (fact 5)", () => {
  test.setTimeout(90_000);

  test("/testimonials renders the quote lists with no React duplicate-key warning", async ({
    page,
  }) => {
    // T16 fix: the quote lists (Home §04 + /testimonials §01) keyed items
    // by `t.area` — three Jaisalmer clients collided — now keyed by
    // `t.name`. React keys are not readable from the DOM, so the only
    // observable surface is the browser console: React logs a warning when
    // a list renders duplicate keys. Listener attaches BEFORE navigation so
    // hydration-time warnings are caught too.
    const keyWarnings: string[] = [];
    page.on("console", (msg) => {
      if (/duplicate.*key|key.*duplicate/i.test(msg.text())) {
        keyWarnings.push(msg.text());
      }
    });
    await page.goto("/testimonials", { waitUntil: "load" });
    await page.locator("main h1").waitFor({ state: "attached" });
    // And the list itself: six distinct bylines (the six names are unique —
    // the property the key now uses).
    const bylines = await page
      .locator("main section.ledger-rail .ruled-entry p.rail-label")
      .allTextContents();
    expect(bylines, "six bylines render").toHaveLength(6);
    expect(new Set(bylines).size, "every byline is distinct").toBe(6);
    expect(keyWarnings, "no React duplicate-key warning on /testimonials").toEqual([]);
  });
});
