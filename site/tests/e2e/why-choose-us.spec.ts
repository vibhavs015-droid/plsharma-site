import { expect, test } from "@playwright/test";
import {
  expectNoAppointmentOnCtaSurfaces,
  expectNoInventedClaims,
  gotoWhyChooseUs,
  prefillOf,
  site,
  TEL_HREF,
} from "./helpers";
import { whyChooseUs } from "../../lib/site-config";

/**
 * Phase 3 Stage D QA — `/why-choose-us` on the Kept Ledger system.
 *
 * Sources of truth: docs/design/phase-3/page-specs.md §0 (global head/band
 * rules, §0.6 wording constants) and §3 (the /why-choose-us contract: the h1
 * IS the manifesto, four way-of-working entries from whyChooseUs[2..5] in
 * config order with check-links only where a real /faq answer exists, the
 * on-time entry stands link-free, §02 per-audience translation, no stats
 * strip, no re-said claims); honesty rules per §2.4/§9.
 *
 * Titles are byte-tracked to `site/lib/site-config.ts`; the tightened
 * one-sentence bodies and the check-link labels are the shipped §3 copy and
 * are pinned byte-wise so regressions in either direction get caught.
 */

const EXPECTED_WCU_PREFILL = `Hello ${site.name}, I would like to book a consultation — via the website's why-choose-us page.`;

// §3 inventory: entries 01/03/04 earn a check-link to a real /faq answer;
// entry 02 (on-time) stands with NO link — a fake link is worse (§2.4).
const CHECK_LINKS: Array<number | null> = [0, null, 2, 3];

test.describe("Why choose us — structure & content (page-specs §3)", () => {
  test.setTimeout(90_000);

  test.beforeEach(async ({ page }) => {
    await gotoWhyChooseUs(page);
  });

  test("exactly one h1 — and the h1 IS the manifesto statement", async ({ page }) => {
    const h1 = page.locator("main h1");
    await expect(h1).toHaveCount(1);
    await expect(h1).toHaveText(
      "Fees agreed before work begins. Deadlines kept. Your papers stay confidential."
    );
  });

  test("ruled head: rail-label and the hold-us-to lead", async ({ page }) => {
    const head = page.locator("main section.ledger-rail").first();
    await expect(head.locator("p.rail-label")).toHaveText(
      `${site.shortName} · Why choose us · Jaisalmer`
    );
    await expect(head.locator("p.text-lead")).toHaveText(
      "Four things you can hold us to — and where to check each."
    );
  });

  test("§01 carries the four way-of-working entries in config order, titles byte-verbatim", async ({ page }) => {
    const section = page.locator("main section.ledger-rail").nth(1);
    await expect(section.locator("p.rail-label").first()).toHaveText(
      "§ 01 · The way of working"
    );
    const entries = section.locator("li.ruled-entry");
    await expect(entries).toHaveCount(4);
    // whyChooseUs[2..5] — the same four Home §02 carries; never reordered.
    await expect(entries.locator("h3")).toHaveText(
      whyChooseUs.slice(2, 6).map((w) => w.title)
    );
    await expect(entries.locator("span.rail-label")).toHaveText(["01", "02", "03", "04"]);
  });

  test("each entry carries its tightened one-sentence statement", async ({ page }) => {
    // §3: the config description tightened to one sentence — studio copy, no
    // new facts. Pinned so neither drift direction escapes.
    const bodies = [
      "Clear, agreed-upon fees before work begins — no hidden charges, no surprises.",
      "Returns and filings are completed well before their due dates.",
      "Your financial data stays strictly between us — professional secrecy is the foundation of our practice.",
      "From first consultation to notice handling — we stay with you through the whole process.",
    ];
    const entries = page.locator("main section.ledger-rail").nth(1).locator("li.ruled-entry");
    for (let i = 0; i < 4; i++) {
      await expect(entries.nth(i), `entry 0${i + 1} statement verbatim`).toContainText(
        bodies[i]
      );
    }
  });

  test("check-links sit exactly on 01/03/04 with their labels; the on-time entry stands link-free", async ({ page }) => {
    const entries = page.locator("main section.ledger-rail").nth(1).locator("li.ruled-entry");
    const labels = ["Read the fee answer", "Read the confidentiality answer", "Read the notice answer"];
    let checked = 0;
    for (let i = 0; i < 4; i++) {
      const links = entries.nth(i).locator('a[href="/faq"]');
      if (CHECK_LINKS[i] === null) {
        // §2.4: a statement stands; a fake link is worse.
        await expect(entries.nth(i).locator("a"), `entry 0${i + 1} carries no link`).toHaveCount(0);
      } else {
        await expect(links, `entry 0${i + 1} carries its one check-link`).toHaveCount(1);
        await expect(links).toHaveText(labels[checked]);
        checked++;
      }
    }
    expect(checked, "exactly three check-links shipped (01/03/04)").toBe(3);
    // And they are the page's only /faq anchors in main (band primary is wa.me).
    await expect(page.locator('main a[href="/faq"]')).toHaveCount(3);
  });

  test("§02 translates the promises per audience — two unnumbered, link-free entries", async ({ page }) => {
    const section = page.locator("main section.ledger-rail").nth(2);
    await expect(section.locator("p.rail-label").first()).toHaveText(
      "§ 02 · What this means for your case"
    );
    const entries = section.locator("li.ruled-entry");
    await expect(entries).toHaveCount(2);
    await expect(entries.locator("h3")).toHaveText(["If you're salaried", "If you run a business"]);
    // Unnumbered: the translation rows carry no rail-marker numbers.
    await expect(entries.locator("span.rail-label")).toHaveCount(0);
    // No links in §02 — the band does the ask (§3 CTA map).
    await expect(entries.locator("a")).toHaveCount(0);
    await expect(entries.nth(0)).toContainText(
      "Your return filed before the deadline, the fee agreed first, your papers kept between us."
    );
    await expect(entries.nth(1)).toContainText(
      "The GST calendar kept for you, credits claimed properly, and if a notice comes we handle it through to the end."
    );
  });

  test("no stats strip and no re-said claims anywhere in the served page", async ({ page }) => {
    // §3 content source: stats[] never renders here; 25+ Years and Personal
    // Attention live on Home and /about — triple-saying is costume. Checked
    // against page.content() so the RSC payload is covered too.
    const html = await page.content();
    expect(html, "'25+ Years' must not appear on /why-choose-us").not.toContain("25+ Years");
    expect(html, "'Personal Attention' must not appear on /why-choose-us").not.toContain(
      "Personal Attention"
    );
  });

  test("zero 'free' hits — §0.6's three placements hold; the fourth is dead", async ({ page }) => {
    // §0.6: the free-first offer ships in exactly three places (Home fold,
    // /about §02, /faq fee answer). /why-choose-us must not re-say it.
    const html = await page.content();
    expect(html, "no 'free' anywhere on /why-choose-us (§0.6)").not.toMatch(/free/i);
  });

  test("act band: once, closes the page, earned sentence, canonical CTA, why-choose-us prefill, quiet phone", async ({ page }) => {
    const band = page.locator("section.act-band");
    await expect(band).toHaveCount(1);
    await expect(page.locator("main > section:last-of-type")).toHaveClass(/act-band/);
    await expect(band.locator("p.rail-label")).toHaveText("The next step");
    await expect(band.locator("h2")).toHaveText(
      "Hold us to all four — start with the first conversation."
    );

    const cta = band.locator("a.btn-primary");
    await expect(cta).toHaveCount(1);
    await expect(cta).toHaveText("Book a consultation on WhatsApp");
    expect(prefillOf((await cta.getAttribute("href"))!)).toBe(EXPECTED_WCU_PREFILL);

    const tel = band.locator('a[href^="tel:"]');
    await expect(tel).toHaveText(`Call the office · ${site.phone}`);
    await expect(tel).toHaveAttribute("href", TEL_HREF);
  });

  test("metadata title is the why-choose-us title", async ({ page }) => {
    // layout.tsx applies the `%s | ${site.name}` template.
    await expect(page).toHaveTitle(`How we work | ${site.name}`);
  });
});

test.describe("Why choose us — honesty regression guards", () => {
  test.setTimeout(90_000);

  test.beforeEach(async ({ page }) => {
    await gotoWhyChooseUs(page);
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
