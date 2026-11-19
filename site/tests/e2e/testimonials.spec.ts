import { expect, test } from "@playwright/test";
import {
  expectNoAppointmentOnCtaSurfaces,
  expectNoInventedClaims,
  expectRailNum,
  gotoTestimonials,
  INVENTED_TESTIMONIAL_NAMES,
  prefillOf,
  site,
  TEL_HREF,
} from "./helpers";
import { confirmedTestimonials } from "../../lib/site-config";
import { visibleTestimonials } from "../../lib/sample-content";

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

// §02's three quiet proof links ("The principal" / "How we work" / "Straight
// answers") shipped on the pre-§8 page and left with it — see the lean-page
// test below (wording-spec §8 amendment).

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

  test("ruled head: bare TESTIMONIALS eyebrow and the nothing-invented lead (T14-A)", async ({ page }) => {
    const head = page.locator("main section.ledger-rail").first();
    const label = head.locator("p.rail-label");
    await expect(label).toHaveText("TESTIMONIALS");
    await expect(label, "no firm name in the eyebrow").not.toContainText(
      site.shortName
    );
    await expect(label, "no place in the eyebrow").not.toContainText("Jaisalmer");
    await expect(head.locator("p.text-lead")).toHaveText(
      "This page stays empty until real clients agree to be quoted. Nothing here is invented."
    );
  });

  test("§01 empty state ships NO bracket mark — the plain honesty note is the content, visible (T14-F3)", async ({ page }) => {
    // T14-F3 (owner taste, same rule as T14-B on /about): the
    // [PLACEHOLDER — …] bracket mark is gone; the designed gap is now the
    // plain visitor-language note itself — real text, in the fold. Not an
    // image, not a comment, not a styled empty box, and no bracket marks.
    const marks = page.locator("main .placeholder-mark");
    await expect(marks, "zero placeholder marks on /testimonials").toHaveCount(0);
    const html = await page.content(); // includes the RSC flight payload
    expect(html, "no [PLACEHOLDER string anywhere on /testimonials").not.toContain(
      "[PLACEHOLDER"
    );
    // The honesty sentence explains the empty entry (Home §04's, adapted) —
    // still real, visible text.
    const entry = page.locator("main .ruled-entry").first();
    await expect(entry).toContainText(
      "A quote appears here only after a real client has read it and agreed to be named. Until then the entry stays empty on purpose — this page publishes only what the firm can stand behind."
    );
    await expect(entry).toBeVisible();
  });

  test("the collection invite is a quiet wa.me link with the QUESTION prefill — not a booking request", async ({ page }) => {
    const section = page.locator("main section.ledger-rail").nth(1);
    // B3: §01's "§ 01 · Client words" string became the rail-num device.
    await expectRailNum(section.locator("p.rail-label.rail-num"), "01", "Client words");
    const collect = section.locator('a[href^="https://wa.me/"]');
    await expect(collect).toHaveCount(1);
    // §7 lockstep 3 (B2): the invite was shortened; the prefill below is
    // unchanged — a quote offer stays a QUESTION, never a booking request.
    await expect(collect).toHaveText(
      "A quote to share? Send it — your permission decides what appears."
    );
    const prefill = prefillOf((await collect.getAttribute("href"))!);
    expect(prefill).toBe(QUESTION_PREFILL);
    expect(prefill, "a quote offer is a question, not a booking request").not.toMatch(
      /book a consultation/i
    );
  });

  test("the page ships LEAN (§8): no §02 record/proof band, no §03 founder band", async ({ page }) => {
    // wording-spec §8 amendment (B2): §02 (record line + three proof links)
    // and §03 (founder band with the signed-page facts) were removed from
    // the client-facing page. The section budget is now exactly: head +
    // §01 + act band. Served evidence: spec-evidence.json → testimonials.main.
    await expect(page.locator("main section.ledger-rail")).toHaveCount(2);

    const html = await page.content(); // includes the RSC flight payload
    for (const retired of ["The proof that exists today", "The signed page"]) {
      expect(html, `retired §02/§03 copy must not render: "${retired}"`).not.toContain(
        retired
      );
    }
    // §03's founder facts are gone from this page (the founder renders on
    // /about); the §02 record line went with it.
    await expect(page.locator("main h3")).toHaveCount(0);
    await expect(page.locator("main")).not.toContainText(`Since ${site.establishedYear}`);
    // The three quiet proof links are gone with §02 — no wayfinding anchors
    // left in main besides the wa.me/tel CTAs.
    await expect(page.locator('main a[href="/why-choose-us"]')).toHaveCount(0);
    await expect(page.locator('main a[href="/about"]')).toHaveCount(0);
    await expect(page.locator('main a[href="/faq"]')).toHaveCount(0);

    // §0.6 guards travel with the deleted section: no italic ever ships, and
    // no signature is drawn — scoped to the page's sections (the band's
    // anchors and the float icon live outside this set).
    const sections = page.locator("main section");
    await expect(sections.locator("em")).toHaveCount(0);
    await expect(sections.locator('[class*="italic"]')).toHaveCount(0);
    await expect(sections.locator("svg, canvas")).toHaveCount(0);
  });

  test("noindex while the confirmed tier is empty — the page half of Item 0", async ({ page }) => {
    // The page sets its OWN page-level robots (overriding the layout's
    // site-wide "noindex, nofollow"): "noindex" alone today, auto-flipping
    // to indexable the moment confirmedTestimonials gains a real quote —
    // the sitemap agrees (seo-head.spec.ts asserts that other half).
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex");
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

  test("the confirmed tier ships empty — the plain-note reserve is §01's entire list (T14-F3)", async ({ page }) => {
    // TASK 0 tier system: production resolves visibleTestimonials to the
    // EMPTY confirmed tier (real quotes arrive only from the owner), so the
    // plain-note reserve entry is the section's only entry — no quote entry
    // may render from either tier in the default build, and since T14-F3
    // zero bracket marks ship either.
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
    await expect(
      section.locator(".placeholder-mark"),
      "zero bracket marks on the reserve entry (T14-F3)"
    ).toHaveCount(0);
    // The visitor-language honesty note IS the reserve: present in the one entry.
    await expect(section.locator(".ruled-entry")).toContainText(
      "A quote appears here only after a real client has read it and agreed to be named"
    );
    const html = await page.content(); // includes the RSC flight payload
    expect(html, "no [PLACEHOLDER string anywhere on /testimonials").not.toContain(
      "[PLACEHOLDER"
    );
  });

  test("NONE of the invented or sample-tier data renders — html/RSC-level", async ({ page }) => {
    // The four invented detail testimonials are deleted from source; their
    // pinned names stay guarded site-wide (helpers sweep) and re-asserted
    // here at html level for this page. The sample tier's generic byline is
    // the other leak risk — production must not carry either. (The founder
    // renders on /about only — the lean §8 page carries no h3 at all, which
    // the lean-page test above asserts.)
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
