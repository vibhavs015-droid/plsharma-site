import { expect, test } from "@playwright/test";
import {
  gotoHome,
  prefillOf,
  TEL_HREF,
  WA_HREF_PREFIX,
  site,
} from "./helpers";
import { faqs } from "../../lib/site-config";

/**
 * Phase 2 QA — Home (`/`) on the Kept Ledger design system.
 *
 * Sources of truth:
 * - STUDIO_CHARTER.md (page-completion rule)
 * - docs/design/discovery/user-problem.md §2.3 (CTA wording table), §2.4 (prohibitions), §5.1 (Home spec)
 * - docs/design/phase-2/tokens.md (primitives: .act-band, .placeholder-mark, .btn-primary, .rail-label)
 *
 * Every honesty check is a REGRESSION GUARD for the critic's Phase-1/2 REJECT
 * items: nothing invented may come back onto this page.
 */

test.describe("Home — structure & content", () => {
  test.setTimeout(90_000);

  test.beforeEach(async ({ page }) => {
    await gotoHome(page);
  });

  test("exactly one h1, and it is the plain-spoken hero sentence", async ({ page }) => {
    const h1 = page.locator("main h1");
    await expect(h1).toHaveCount(1);
    // user-problem.md §5.1: the sentence must name ITR-tax and GST, personal
    // handling, and the place — in one breath.
    await expect(h1).toContainText("Income tax and GST");
    await expect(h1).toContainText("handled personally");
    await expect(h1).toContainText("Jaisalmer");
  });

  test("hero rail label carries the four owner-confirmed identity facts", async ({ page }) => {
    const label = page.locator("main p.rail-label").first();
    await expect(label).toContainText(site.shortName); // P.L. Sharma & Co.
    await expect(label).toContainText(site.tagline); // Tax Consultants & Financial Advisors
    await expect(label).toContainText("Jaisalmer");
    await expect(label).toContainText(`Since ${site.establishedYear}`); // since 2001
  });

  test("the five ledger sections render in order §01–§05", async ({ page }) => {
    const markers = page.locator("main p.rail-label").filter({ hasText: /^§ 0\d/ });
    await expect(markers).toHaveCount(5);
    await expect(markers).toHaveText([
      "§ 01 · Services",
      "§ 02 · How we work",
      "§ 03 · The record",
      "§ 04 · Client words",
      "§ 05 · Common questions",
    ]);
  });

  test("founder plate: dimensions + decorative alt, link still names the founder", async ({ page }) => {
    // The dead-end fix (critic required-fix): the whole plate is one link.
    const plate = page.locator('main a[href="/about"]');
    await expect(plate).toHaveCount(1);

    const img = plate.locator("img");
    await expect(img).toHaveCount(1);
    // The interim graded crop, not the raw father.jpg.
    await expect(img).toHaveAttribute("src", /founder-plate\.webp$/);
    // Dimensions shipped with the asset (charter page-completion rule).
    await expect(img).toHaveAttribute("width", "300");
    await expect(img).toHaveAttribute("height", "375");
    // Stage E P3: the plate is the LCP candidate — it must be fetched first.
    await expect(img).toHaveAttribute("fetchpriority", "high");
    // a11y finding F5: inside a text link the image is decorative — alt=""
    // (WCAG 1.1.1), because the link's accessible name must come from the
    // visible captions, not be doubled by the alt.
    await expect(img).toHaveAttribute("alt", "");
    // The link-name guarantee survives: assistive tech still hears the
    // founder's name from the captions inside the link (WCAG 2.4.4 link
    // purpose). Playwright computes the accessible name, so this asserts the
    // real semantics, not the raw text.
    await expect(
      page.getByRole("link", { name: /Parbhati Lal Sharma/ })
    ).toHaveCount(1);
  });

  test("the one owner-confirmed stat tile renders — and no other numeric stat tiles", async ({ page }) => {
    // §03 record line: the single tile the owner confirmed (Phase 1 critic fix).
    const recordEntry = page
      .locator("main h2")
      .filter({ hasText: "25+ Years in Practice in Jaisalmer" });
    await expect(recordEntry).toHaveCount(1);
    await expect(recordEntry).toContainText(`Since ${site.establishedYear}`);

    // Exactly one numeric marker on the page: the record line itself.
    await expect(page.locator("main [data-numeric]")).toHaveCount(1);
    await expect(page.locator("main [data-numeric]")).toContainText(`Since ${site.establishedYear}`);

    // The tiles the critic rejected must never come back (§2.4: no fake counts).
    const mainText = await page.locator("main").innerText();
    expect(mainText).not.toMatch(/100%/);
    expect(mainText).not.toMatch(/1:1/);
    expect(mainText).not.toMatch(/5000\+|happy clients|trusted by/i);
  });

  test("FAQ preview links to /faq", async ({ page }) => {
    // The three research-path questions (documents, fees, notices)…
    const questionLinks = page.locator('main h3 a[href="/faq"]');
    await expect(questionLinks).toHaveCount(3);
    await expect(questionLinks).toHaveText([faqs[1].question, faqs[2].question, faqs[4].question]);
    // …and the full-list link.
    const all = page.getByRole("link", { name: "All common questions", exact: true });
    await expect(all).toHaveCount(1);
    await expect(all).toHaveAttribute("href", "/faq");
  });
});

test.describe("Home — honesty regression guards (critic REJECT items)", () => {
  test.setTimeout(90_000);

  test.beforeEach(async ({ page }) => {
    await gotoHome(page);
  });

  test("no star-rating markup or ★ glyphs anywhere on /", async ({ page }) => {
    // Raw content() includes the RSC flight payload, so this also covers data
    // Next would hydrate with — stricter than the visible DOM alone.
    const html = await page.content();
    expect(html).not.toMatch(/[★☆]/);
    expect(html).not.toMatch(/aggregateRating|ratingValue|bestRating|reviewCount/i);
    const starNodes = await page.evaluate(() => {
      // Token-boundary match: catches "lucide-star", "star-half", "star"…
      // but NOT the Tailwind "inline-start" substring (star followed by "t").
      const starClass = (cls: string) =>
        cls.split(/\s+/).some((token) => /star(?!t)/i.test(token));
      return Array.from(document.querySelectorAll("body *")).filter(
        (el) =>
          starClass(el.getAttribute("class") ?? "") ||
          /\bstar\b/i.test(el.getAttribute("aria-label") ?? "")
      ).length;
    });
    expect(starNodes).toBe(0);
  });

  test("testimonial area renders only placeholder-marked entries — no invented names or quotes", async ({ page }) => {
    const marks = page.locator("main .placeholder-mark");
    await expect(marks).toHaveCount(1);
    // tokens.md §5.1 convention: dashed marker + explicit awaiting-real text.
    await expect(marks).toContainText("PLACEHOLDER");
    await expect(marks).toContainText(/awaiting real testimonial/i);

    // Nothing from the placeholder testimonials in site-config may leak onto /.
    const inventedNames = ["Rajesh Verma", "Sunita Malhotra", "Amit Khanna", "Priya Nair"];
    const inventedQuoteFragments = [
      "never once worried",
      "registered my company",
      "scrutiny notice and was very stressed",
      "explains everything patiently",
    ];
    const mainText = await page.locator("main").innerText();
    for (const fragment of [...inventedNames, ...inventedQuoteFragments]) {
      expect(mainText, `invented content must not appear on /: "${fragment}"`).not.toContain(
        fragment
      );
    }
    // And no quotation-markup shell for a quote that does not exist.
    await expect(page.locator("main blockquote")).toHaveCount(0);
  });

  test("no 'Book Appointment' wording anywhere on /", async ({ page }) => {
    const html = await page.content();
    expect(html).not.toMatch(/book\s+an?\s+appointment/i);
    // Accessible names and titles are wording too.
    const hiddenWording = await page.evaluate(() =>
      Array.from(document.querySelectorAll("[aria-label], [title]"))
        .map((el) => `${el.getAttribute("aria-label") ?? ""} ${el.getAttribute("title") ?? ""}`)
        .join(" | ")
    );
    expect(hiddenWording).not.toMatch(/appointment/i);
  });

  test("no father.jpg asset referenced on /", async ({ page }) => {
    const html = await page.content();
    expect(html).not.toContain("father.jpg");
    await expect(page.locator('img[src*="father.jpg"]')).toHaveCount(0);
  });

  test("no arch radius, no hero-pattern markup, no bg-card on /", async ({ page }) => {
    const html = await page.content();
    // tokens.md §9.8: the founder arch must go, with the plate.
    expect(html).not.toContain("rounded-t-[999px]");
    expect(html).not.toContain("999px");
    // Stage E/E1 ground truth (16 Nov): the .hero-pattern and .card-lift
    // rules are fully retired from globals.css — zero hits in the shipped
    // CSS. The assertion stays: no retired-pattern class may reappear on /.
    expect(html).not.toContain("hero-pattern");
    // Cards are retired: no tonal layer above paper on Home.
    expect(html).not.toContain("bg-card");
  });
});

test.describe("Home — CTA wording per surface (user-problem.md §2.3)", () => {
  test.setTimeout(90_000);

  test.beforeEach(async ({ page }) => {
    await gotoHome(page);
  });

  test("header button: 'Book a consultation' → /book", async ({ page }) => {
    const headerCta = page.locator('header a[href="/book"]');
    // The mobile-sheet copy renders only when the sheet is open; one instance at rest.
    await expect(headerCta).toHaveCount(1);
    await expect(headerCta).toHaveText("Book a consultation");
    await expect(headerCta).toBeVisible();
  });

  test("hero primary CTA: 'Book a consultation on WhatsApp' with a prefilled wa.me deep link", async ({ page }) => {
    const hero = page.locator("main section.ledger-rail").first();
    const cta = hero.locator("a.btn-primary");
    await expect(cta).toHaveCount(1);
    await expect(cta).toHaveText("Book a consultation on WhatsApp");

    const msg = prefillOf((await cta.getAttribute("href"))!);
    expect(msg).toMatch(/book a consultation/i);
  });

  test("WhatsApp float: icon-only, accessible name 'Book a consultation on WhatsApp', wa.me deep link", async ({ page }) => {
    const float = page.locator('a[aria-label="Book a consultation on WhatsApp"]');
    await expect(float).toHaveCount(1);
    await expect(float).toHaveAttribute("href", new RegExp(`^${WA_HREF_PREFIX.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`));
    // Icon-only: the wording lives in the accessible name, not in visible text.
    expect((await float.textContent())?.trim()).toBe("");
    await expect(float.locator("svg")).toHaveCount(1);
  });

  test("footer quick link: 'Book a consultation' → /book", async ({ page }) => {
    const footerLink = page.locator('footer a[href="/book"]');
    await expect(footerLink).toHaveCount(1);
    await expect(footerLink).toHaveText("Book a consultation");
  });

  test("act-band primary CTA: 'Book a consultation on WhatsApp' with a prefilled wa.me deep link", async ({ page }) => {
    const band = page.locator("section.act-band");
    const cta = band.locator("a.btn-primary");
    await expect(cta).toHaveCount(1);
    await expect(cta).toHaveText("Book a consultation on WhatsApp");

    const msg = prefillOf((await cta.getAttribute("href"))!);
    expect(msg).toMatch(/book a consultation/i);
  });

  test("the end-of-page act band is present exactly once", async ({ page }) => {
    await expect(page.locator("section.act-band")).toHaveCount(1);
    // And it is the page's closing section.
    await expect(page.locator("main > section:last-child")).toHaveClass(/act-band/);
  });

  test("phone links read 'Call the office' with the configured tel: number", async ({ page }) => {
    const heroTel = page.locator("main section.ledger-rail").first().locator('a[href^="tel:"]');
    await expect(heroTel).toHaveCount(1);
    await expect(heroTel).toHaveText(`Call the office · ${site.phone}`);
    await expect(heroTel).toHaveAttribute("href", TEL_HREF);

    const bandTel = page.locator("section.act-band").locator('a[href^="tel:"]');
    await expect(bandTel).toHaveCount(1);
    await expect(bandTel).toHaveText(`Call the office · ${site.phone}`);
    await expect(bandTel).toHaveAttribute("href", TEL_HREF);

    // Every tel: link on the page dials the real office number from site-config.
    const allTelHrefs = await page
      .locator('a[href^="tel:"]')
      .evaluateAll((els) => els.map((el) => el.getAttribute("href")));
    expect(allTelHrefs.length).toBeGreaterThanOrEqual(4); // header strip, hero, footer, act band
    for (const href of allTelHrefs) expect(href).toBe(TEL_HREF);
  });
});

test.describe("Home — accessibility smoke", () => {
  test.setTimeout(90_000);

  test.beforeEach(async ({ page }) => {
    await gotoHome(page);
  });

  test("landmarks present: header, nav, main, footer", async ({ page }) => {
    await expect(page.locator("header")).toHaveCount(1);
    await expect(page.locator("nav")).toHaveCount(1);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("footer")).toHaveCount(1);
    // O-8 (Stage E): main is the skip-link's target — focusable without
    // entering the tab order (site-wide via layout.tsx; asserted here as the
    // suite's global smoke).
    await expect(page.locator("main")).toHaveAttribute("tabindex", "-1");
  });

  test("every image has an alt attribute (empty allowed for decorative images)", async ({ page }) => {
    // WCAG 1.1.1 requires the attribute to exist; alt="" is the deliberate,
    // correct choice for a decorative image (a11y finding F5: founder plate
    // inside a text link). Only a MISSING attribute fails here.
    const imgs = page.locator("img");
    const missing = await imgs.evaluateAll((list) =>
      list.filter((img) => !img.hasAttribute("alt")).length
    );
    expect(missing).toBe(0);
    await expect(imgs.first()).toHaveAttribute("alt");
  });

  test("keyboard traversal is in DOM order and reaches the hero WhatsApp CTA", async ({ page }) => {
    const seen: number[] = [];
    let heroCtaReached = false;
    for (let i = 0; i < 16; i++) {
      await page.keyboard.press("Tab");
      const info = await page.evaluate(() => {
        const focusables = Array.from(
          document.querySelectorAll(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        const active = document.activeElement;
        return {
          index: focusables.indexOf(active as Element),
          isHeroCta:
            active instanceof HTMLAnchorElement &&
            active.className.includes("btn-primary") &&
            active.href.startsWith("https://wa.me/"),
        };
      });
      if (info.index >= 0) seen.push(info.index);
      if (info.isHeroCta) {
        heroCtaReached = true;
        break;
      }
    }
    expect(
      seen.every((v, i) => i === 0 || v > seen[i - 1]),
      `focus must move in DOM order, saw indices ${seen.join(" → ")}`
    ).toBe(true);
    expect(
      heroCtaReached,
      "the hero WhatsApp CTA must be keyboard-reachable within the first few tabs"
    ).toBe(true);
  });
});
