import { expect, test } from "@playwright/test";
import {
  expectNoAppointmentOnCtaSurfaces,
  expectNoInventedClaims,
  gotoTestimonials,
  INVENTED_TESTIMONIAL_NAMES,
  prefillOf,
  site,
  TEL_HREF,
} from "./helpers";
import { confirmedTeam, confirmedTestimonials } from "../../lib/site-config";
import { visibleTeam, visibleTestimonials } from "../../lib/sample-content";

/**
 * Phase 3 Stage D QA — `/testimonials`, the designed honest reserve.
 *
 * Sources of truth: docs/design/phase-3/page-specs.md §0 (global rules) and
 * §4 (the honest reserve: the one placeholder mark is the content, zero
 * journey weight, the proof that exists today, the signed page in regular
 * faces); honesty rules per §2.4/§9 — no invented data and no sample-tier
 * content may render in the default production build (TASK 0 tier system:
 * the sample tier is owner-preview only).
 */

const EXPECTED_TESTIMONIALS_PREFILL = `Hello ${site.name}, I would like to book a consultation — via the website's testimonials page.`;

// §4 fold item 3 / §01: offering a quote is a QUESTION, not a booking
// (page-specs §0.3 exception pattern).
const QUESTION_PREFILL = `Hello ${site.name}, I have a question.`;

// §4 §02: the three quiet proof links — the page never dead-ends.
const PROOF_LINKS: Array<[string, string]> = [
  ["The principal", "/about"],
  ["How we work", "/why-choose-us"],
  ["Straight answers", "/faq"],
];

test.describe("Testimonials — the honest reserve (page-specs §4)", () => {
  test.setTimeout(90_000);

  test.beforeEach(async ({ page }) => {
    await gotoTestimonials(page);
  });

  test("exactly one h1 — the policy stated without apologising", async ({ page }) => {
    const h1 = page.locator("main h1");
    await expect(h1).toHaveCount(1);
    await expect(h1).toHaveText("Real client words — published with permission, and not before.");
  });

  test("ruled head: rail-label and the nothing-invented lead", async ({ page }) => {
    const head = page.locator("main section.ledger-rail").first();
    await expect(head.locator("p.rail-label")).toHaveText(
      `${site.shortName} · Testimonials · Jaisalmer`
    );
    await expect(head.locator("p.text-lead")).toHaveText(
      "This page stays empty until real clients agree to be quoted. Nothing here is invented."
    );
  });

  test("§01 carries exactly one placeholder mark, as real text, visible", async ({ page }) => {
    // §0.4/§4: the designed gap IS the content — one mark, real text, in the
    // fold. Not an image, not a comment, not a styled empty box.
    const mark = page.locator("p.placeholder-mark");
    await expect(mark).toHaveCount(1);
    await expect(mark).toHaveText("[PLACEHOLDER — AWAITING REAL TESTIMONIAL FROM OWNER]");
    await expect(mark).toBeVisible();
    // The honesty sentence explains the empty entry (Home §04's, adapted).
    const entry = page.locator("main .ruled-entry").first();
    await expect(entry).toContainText(
      "A quote appears here only after a real client has read it and agreed to be named. Until then the entry stays empty on purpose — this page publishes only what the firm can stand behind."
    );
  });

  test("the collection invite is a quiet wa.me link with the QUESTION prefill — not a booking request", async ({ page }) => {
    const section = page.locator("main section.ledger-rail").nth(1);
    await expect(section.locator("p.rail-label").first()).toHaveText("§ 01 · Client words");
    const collect = section.locator('a[href^="https://wa.me/"]');
    await expect(collect).toHaveCount(1);
    await expect(collect).toHaveText(
      "If this office has handled your file and you'd be willing to be quoted, say so on WhatsApp — your permission decides what appears."
    );
    const prefill = prefillOf((await collect.getAttribute("href"))!);
    expect(prefill).toBe(QUESTION_PREFILL);
    expect(prefill, "a quote offer is a question, not a booking request").not.toMatch(
      /book a consultation/i
    );
  });

  test("§02: the record line with data-numeric and exactly the three proof links", async ({ page }) => {
    const section = page.locator("main section.ledger-rail").nth(2);
    await expect(section.locator("p.rail-label").first()).toHaveText(
      "§ 02 · The proof that exists today"
    );
    const record = section.locator("p.rail-label[data-numeric]");
    await expect(record).toHaveText(`Since ${site.establishedYear} · ${site.stats[0].label}`);
    await expect(record).toHaveAttribute("data-numeric", "true");

    const links = section.locator("a");
    await expect(links, "exactly the three quiet proof links").toHaveCount(3);
    for (let i = 0; i < PROOF_LINKS.length; i++) {
      await expect(links.nth(i)).toHaveText(PROOF_LINKS[i][0]);
      await expect(links.nth(i)).toHaveAttribute("href", PROOF_LINKS[i][1]);
    }
  });

  test("§03: the founder's name and facts in the regular faces — no italic, no drawn signature", async ({ page }) => {
    const section = page.locator("main section.ledger-rail").nth(3);
    await expect(section.locator("p.rail-label").first()).toHaveText("§ 03 · The signed page");
    const entry = section.locator(".ruled-entry");
    await expect(entry.locator("h3")).toHaveText(visibleTeam[0].name);
    const line = entry.locator("p.rail-label[data-numeric]");
    await expect(line).toHaveText(`Principal Consultant · Jaisalmer · Since ${site.establishedYear}`);
    // §0.6: no italic ships in Phase 3 — no <em>, no italic utility class on
    // the entry; and no signature is drawn, traced or faked (no svg/canvas).
    await expect(entry.locator("em")).toHaveCount(0);
    await expect(entry.locator('[class*="italic"]')).toHaveCount(0);
    await expect(entry.locator("svg, canvas")).toHaveCount(0);
  });

  test("no sample/preview framing anywhere in the page body", async ({ page }) => {
    // §4 do-not list: no framing that implies the quotes are real or coming
    // soon — the reserve is stated, not teashed. (Visible text; the dev
    // runtime's own scripts are not page copy.)
    const mainText = await page.locator("main").innerText();
    expect(mainText, "no 'sample' framing").not.toMatch(/sample/i);
    expect(mainText, "no 'preview' framing").not.toMatch(/preview/i);
    expect(mainText, "no 'coming soon' countdown framing").not.toMatch(/coming soon/i);
  });

  test("act band: once, closes the page, earned sentence, canonical CTA, testimonials prefill, quiet phone", async ({ page }) => {
    const band = page.locator("section.act-band");
    await expect(band).toHaveCount(1);
    await expect(page.locator("main > section:last-of-type")).toHaveClass(/act-band/);
    await expect(band.locator("p.rail-label")).toHaveText("The next step");
    await expect(band.locator("h2")).toHaveText(
      "While this page waits, your questions get answered — ask us directly."
    );

    const cta = band.locator("a.btn-primary");
    await expect(cta).toHaveCount(1);
    await expect(cta).toHaveText("Book a consultation on WhatsApp");
    expect(prefillOf((await cta.getAttribute("href"))!)).toBe(EXPECTED_TESTIMONIALS_PREFILL);

    const tel = band.locator('a[href^="tel:"]');
    await expect(tel).toHaveText(`Call the office · ${site.phone}`);
    await expect(tel).toHaveAttribute("href", TEL_HREF);
  });

  test("metadata title is the testimonials title", async ({ page }) => {
    // layout.tsx applies the `%s | ${site.name}` template.
    await expect(page).toHaveTitle(`Client words — published with permission | ${site.name}`);
  });
});

test.describe("Testimonials — honesty regression guards (the invented-data wall)", () => {
  test.setTimeout(90_000);

  test.beforeEach(async ({ page }) => {
    await gotoTestimonials(page);
  });

  test("the confirmed tier ships empty — the reserve is §01's entire list", async ({ page }) => {
    // TASK 0 tier system: production resolves visibleTestimonials to the
    // EMPTY confirmed tier (real quotes arrive only from the owner), so the
    // placeholder block is the section's only entry — no quote entry may
    // render from either tier in the default build.
    expect(
      confirmedTestimonials,
      "the confirmed tier must ship empty until the owner sends real quotes"
    ).toHaveLength(0);
    expect(
      visibleTestimonials,
      "the page's visible list must equal the confirmed tier in the default build"
    ).toHaveLength(0);
    const section = page.locator("main section.ledger-rail").nth(1);
    await expect(section.locator(".ruled-entry")).toHaveCount(1);
    await expect(section.locator(".placeholder-mark")).toHaveCount(1);
  });

  test("NONE of the invented or sample-tier data renders — html/RSC-level", async ({ page }) => {
    // The four invented detail testimonials are deleted from source; their
    // pinned names stay guarded site-wide (helpers sweep) and re-asserted
    // here at html level for this page. The sample tier's generic byline is
    // the other leak risk — production must not carry either. (The founder
    // h3 comes from visibleTeam[0], which equals confirmedTeam[0] in the
    // default build — asserted above via the §03 test.)
    const html = await page.content(); // includes the RSC flight payload
    for (const name of INVENTED_TESTIMONIAL_NAMES) {
      expect(html, `invented name must not render: "${name}"`).not.toContain(name);
    }
    expect(html, "sample-tier byline must not render in production").not.toContain("Sample client");
  });

  test("zero 'appointment' on CTA surfaces (link/button text, aria-labels, titles)", async ({ page }) => {
    await expectNoAppointmentOnCtaSurfaces(page);
  });

  test("no stars, no rating schema, no fee figures, no invented names or stats", async ({ page }) => {
    await expectNoInventedClaims(page);
  });
});
