import { expect, test } from "@playwright/test";
import {
  expectRailNum,
  gotoHome,
  prefillOf,
  TEL_HREF,
  WA_HREF_PREFIX,
  site,
} from "./helpers";
import { confirmedTeam, confirmedTestimonials, faqs, services } from "../../lib/site-config";
import { showSampleContent } from "../../lib/content-mode";

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

  test("hero rail label is the bare HOME eyebrow — no identity facts, no 'Since 2001' (T14-A)", async ({ page }) => {
    // T14-A (owner order): the home eyebrow is literally "HOME" — the
    // firm name, tagline and place were removed from the page head.
    const label = page.locator("main p.rail-label").first();
    await expect(label).toHaveText("HOME");
    await expect(label, "no firm name in the eyebrow").not.toContainText(site.shortName);
    await expect(label, "no tagline in the eyebrow").not.toContainText(site.tagline);
    await expect(label, "no place in the eyebrow").not.toContainText("Jaisalmer");
    // T3/§3.4 census (B2): "· Since 2001" is retired from the hero rail —
    // the record band (§03) carries Home's one 2001 line instead. Served
    // evidence: spec-evidence.json → home.railLabels[0].
    await expect(label).not.toContainText(`Since ${site.establishedYear}`);
    await expect(page.locator("main")).not.toContainText("· Since 2001");
  });

  test("ledger sections render in order with the rail-num device (§8.5 mode-aware)", async ({ page }) => {
    // B3: the "§ 0N · Title" string labels became the rail-num device
    // (figure + rule + text, `data-numeric` on the figure). B2/§8 + T14-F1:
    // the Client words section renders iff the visible testimonial tier is
    // non-empty. T16: the owner's six confirmed quotes landed, so the
    // DEFAULT build now ships §04 too — five figures with Common questions
    // at 05. A build with an empty confirmed tier (and no preview flag)
    // still falls to the gapless four (§05 as 04); the preview branch keeps
    // its reserve-note furniture.
    const labels = page.locator("main p.rail-label.rail-num");
    // T14-F1/T16: the Common questions figure derives from the SAME
    // condition that gates §04 — never hard-code either figure, or the
    // rail skips a number again (the critic's F1 finding).
    const clientWordsVisible =
      showSampleContent || confirmedTestimonials.length > 0;
    const commonQuestionsFigure = clientWordsVisible ? "05" : "04";
    if (showSampleContent) {
      // Owner-preview branch: count + §04 signals pinned to what the T0
      // probe verified on the served preview build
      // (polish-evidence/sample-mode-probe.json); §04's figure/text pair
      // re-verified by the T14 one-off SHOW_SAMPLE_CONTENT=true run and
      // pinned here.
      await expect(labels).toHaveCount(5);
      await expectRailNum(labels.nth(0), "01", "Services");
      await expectRailNum(labels.nth(1), "02", "How we work");
      await expectRailNum(labels.nth(2), "03", "The record");
      await expectRailNum(labels.nth(3), "04", "Client words");
      const html = await page.content();
      expect(html, "preview §04 heading (probe-verified)").toContain("What clients say");
      // T14-F3: the bracket mark is gone from the preview block too —
      // absence pin (about.spec flip pattern); the plain note carries it.
      expect(html, "preview §04 carries no [PLACEHOLDER mark (T14-F3)").not.toContain(
        "[PLACEHOLDER"
      );
      await expect(
        page.locator("main .placeholder-mark"),
        "preview §04 ships zero bracket marks (T14-F3)"
      ).toHaveCount(0);
      expect(html, "preview §04 plain note carries the entry (T14-F3)").toContain(
        "Real client words will be published with the client"
      );
      expect(html, "preview §04 reserve link (probe-verified)").toContain(
        "How we handle client words"
      );
      await expectRailNum(labels.nth(4), commonQuestionsFigure, "Common questions");
    } else if (confirmedTestimonials.length > 0) {
      // T16 launch state: the confirmed tier is filled, so production
      // ships §04 with the permission note — not the preview reserve note.
      await expect(labels).toHaveCount(5);
      await expectRailNum(labels.nth(0), "01", "Services");
      await expectRailNum(labels.nth(1), "02", "How we work");
      await expectRailNum(labels.nth(2), "03", "The record");
      await expectRailNum(labels.nth(3), "04", "Client words");
      await expectRailNum(labels.nth(4), "05", "Common questions");
      const html = await page.content();
      expect(html, "§04 heading renders with the confirmed tier").toContain(
        "What clients say"
      );
      expect(html, "permission note ships instead of the reserve").toContain(
        "Shared with the client"
      );
      expect(html, "first confirmed quote renders").toContain("Rekha Bishnoi");
      expect(html, "no preview reserve copy in production").not.toContain(
        "stays empty on purpose"
      );
      await expect(
        page.locator("main .placeholder-mark"),
        "zero bracket marks (T14-F3)"
      ).toHaveCount(0);
    } else {
      await expect(labels).toHaveCount(4);
      await expectRailNum(labels.nth(0), "01", "Services");
      await expectRailNum(labels.nth(1), "02", "How we work");
      await expectRailNum(labels.nth(2), "03", "The record");
      await expectRailNum(labels.nth(3), commonQuestionsFigure, "Common questions");
      // §04 is ABSENT in production: no client-words heading, no reserve link.
      const html = await page.content();
      expect(html, "§04 heading must not render in production").not.toContain("What clients say");
      expect(html, "§04 reserve link must not render in production").not.toContain(
        "How we handle client words"
      );
    }
  });

  test("founder plate: dimensions + decorative alt, link still names the founder", async ({ page }) => {
    // The dead-end fix (critic required-fix): the whole plate is one link.
    const plate = page.locator('main a[href="/about"]');
    await expect(plate).toHaveCount(1);

    const img = plate.locator("img");
    await expect(img).toHaveCount(1);
    // The polished plate (T1/B2 asset rename) — never the raw father.jpg.
    await expect(img).toHaveAttribute("src", /founder-plate-polished\.webp$/);
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

    // T1/§1.3 caption move (B2): exactly two caption lines BELOW the image —
    // name + title; the "· Since 2001" row is retired from the plate (the
    // record band carries it). Served evidence: spec-evidence.json.
    const captions = plate.locator("p.rail-label");
    await expect(captions).toHaveCount(2);
    await expect(captions.nth(0)).toHaveText("Parbhati Lal Sharma");
    await expect(captions.nth(1)).toHaveText("Principal Consultant · Jaisalmer");
    await expect(plate).not.toContainText(`Since ${site.establishedYear}`);
    const captionsBelowImage = await plate.evaluate((link) => {
      const imgEl = link.querySelector("img");
      const cap = link.querySelector("p.rail-label");
      return (
        !!imgEl &&
        !!cap &&
        !!(imgEl.compareDocumentPosition(cap) & Node.DOCUMENT_POSITION_FOLLOWING)
      );
    });
    expect(captionsBelowImage, "captions sit below the image").toBe(true);
  });

  test("the record band renders the five owner-confirmed facts, in order, numeric only where confirmed", async ({ page }) => {
    // T2 (wording-spec §2, B2): the single stat tile became a five-item
    // band under h2 "The record"; `data-numeric` rides on the first three
    // (dates/times), never on the two plain statements. Served evidence:
    // spec-evidence.json → home.recordBandHtml.
    const band = page.locator("main section").filter({
      has: page.locator("h2", { hasText: "The record" }),
    });
    await expect(band).toHaveCount(1);
    const items = band.locator("li.ruled-entry");
    await expect(items).toHaveCount(5);
    await expect(items).toHaveText([
      "Since 2001",
      "25 years in practice",
      "Mon–Sat 10:00–7:00",
      "First consultation free",
      "Office in Jaisalmer",
    ]);
    const numeric = band.locator("li.ruled-entry p[data-numeric]");
    await expect(numeric).toHaveCount(3);
    await expect(numeric.nth(0)).toHaveText(`Since ${site.establishedYear}`);
    await expect(numeric.nth(1)).toHaveText("25 years in practice");
    await expect(numeric.nth(2)).toHaveText("Mon–Sat 10:00–7:00");
    await expect(band.locator("li.ruled-entry p:not([data-numeric])")).toHaveCount(2);

    // The old stat-tile h2 phrasing is retired from Home — it survives on
    // /about §01 only (§3.4 census).
    await expect(
      page.locator("main h2", { hasText: "25+ Years in Practice in Jaisalmer" })
    ).toHaveCount(0);

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

  test("testimonial area: §04 renders the confirmed quotes with zero bracket marks — and never invented names", async ({ page }) => {
    // T16: production §04 EXISTS (the owner's six launch quotes), so this
    // test no longer pins absence — it pins the honest shape: real quotes,
    // permission note, zero bracket marks, zero reserve framing, and none
    // of the pre-T16 invented data anywhere.
    const marks = page.locator("main .placeholder-mark");
    if (showSampleContent) {
      // Owner-preview (§8.5): Home §04 renders — but since T14-F3 it ships
      // the plain note + reserve link with ZERO bracket marks.
      await expect(marks, "preview §04 ships zero bracket marks (T14-F3)").toHaveCount(0);
      const html = await page.content();
      expect(html, "no [PLACEHOLDER string anywhere on / in preview (T14-F3)").not.toContain(
        "[PLACEHOLDER"
      );
      expect(html, "preview §04 plain note survives F3").toContain(
        "Real client words will be published with the client"
      );
      expect(html, "preview §04 reserve link survives F3").toContain(
        "How we handle client words"
      );
    } else {
      // T16 production: §04 renders the confirmed quotes + permission note;
      // the empty-tier reserve copy must not sit under real quotes, and
      // zero reserve marks ship either way.
      await expect(marks, "production Home carries no reserve marks").toHaveCount(0);
      const html = await page.content();
      expect(html, "no [PLACEHOLDER string anywhere on / (T14-F3)").not.toContain(
        "[PLACEHOLDER"
      );
      expect(html, "§04 heading renders in production (T16)").toContain("What clients say");
      expect(html, "permission note ships in production (T16)").toContain(
        "Shared with the client"
      );
      expect(html, "no empty-tier reserve copy under real quotes").not.toContain(
        "stays empty on purpose"
      );
      const mainText = await page.locator("main").innerText();
      // innerText applies text-transform: the rail-label bylines render
      // CAPS, so compare case-insensitively (T17: this pin arrived
      // mid-round from the T16 qa lane and had never run green).
      const haystack = mainText.toLowerCase();
      for (const t of confirmedTestimonials) {
        expect(haystack, `§04 renders ${t.name}'s quote`).toContain(
          t.name.toLowerCase()
        );
      }
    }

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
    // The quotes render as plain ruled entries (li > p) — no blockquote
    // markup ships on Home in any mode.
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
    // B4: the sticky action bar's WhatsApp anchor shares this accessible
    // name — scope to the FLOAT element (its own whatsapp-float class).
    const float = page.locator(
      'a.whatsapp-float[aria-label="Book a consultation on WhatsApp"]'
    );
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
    // And it is the page's closing section (the ActionBar <nav> follows it
    // inside <main>, so :last-of-type — not :last-child).
    await expect(page.locator("main > section:last-of-type")).toHaveClass(/act-band/);
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

    // T14-G rule: every anchor whose visible text displays the phone number
    // is a tel: dial link (the WhatsApp rows elsewhere show the number only
    // behind an aria-label distinguishing them — not on this page).
    const anchors = await page.locator("a").evaluateAll((els) =>
      els.map((el) => ({
        text: el.textContent ?? "",
        href: el.getAttribute("href") ?? "",
      }))
    );
    const displayingPhone = anchors.filter((a) => a.text.includes(site.phone));
    expect(displayingPhone.length, "the page displays the phone at least in header/hero/footer/band").toBeGreaterThanOrEqual(4);
    for (const a of displayingPhone) {
      expect(a.href, `anchor "${a.text.trim().slice(0, 40)}" showing the phone must dial tel:`).toMatch(/^tel:/);
    }
  });
});

test.describe("Home — accessibility smoke", () => {
  test.setTimeout(90_000);

  test.beforeEach(async ({ page }) => {
    await gotoHome(page);
  });

  test("landmarks present: header, nav, main, footer", async ({ page }) => {
    await expect(page.locator("header")).toHaveCount(1);
    // A2/B4: the sticky action bar ships a second nav landmark — scope the
    // header nav, pin the bar, and keep the total explicit (was 1 pre-polish).
    await expect(page.locator("header nav")).toHaveCount(1);
    await expect(page.locator("nav.sticky-action-bar")).toHaveCount(1);
    await expect(page.locator("nav")).toHaveCount(2);
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

test.describe("Home — polish pass pins (wording-spec §1/§2/§3, B2/B3)", () => {
  test.setTimeout(90_000);

  test.beforeEach(async ({ page }) => {
    await gotoHome(page);
  });

  test("the hero bio is the single owner paragraph (§1.2), fact-locked", async ({ page }) => {
    // T1: the two pre-polish lines ("You speak to the principal himself…"
    // + a second free-first line) were REPLACED by one paragraph whose name
    // segment renders from config. Served evidence: default-build-evidence
    // → pages[0].heroBio + spec-evidence.json.
    const bio = page.locator("main p", {
      hasText: "has run his tax practice in Jaisalmer since 2001",
    });
    await expect(bio).toHaveCount(1);
    await expect(bio).toContainText(confirmedTeam[0].name);
    await expect(bio).toContainText(
      "He handles each case himself, agrees the fee before work begins, and keeps your papers confidential."
    );
    // §0.6: the free-first sentence lives INSIDE the bio on Home — exactly
    // once in main (the band says "First consultation free", different words).
    await expect(bio).toContainText("The first consultation is free.");
    const occurrences = (await page.locator("main").innerText()).match(
      /The first consultation is free\./g
    )?.length;
    expect(occurrences, "the canonical free-first sentence appears once on Home").toBe(1);

    const html = await page.content();
    expect(html, "retired bio line 1 must not survive").not.toContain(
      "You speak to the principal himself, not a call centre."
    );
  });

  test("the header nav lists the seven visible destinations — Testimonials included (T16)", async ({ page }) => {
    // visibleNavLinks (site-config): Testimonials joins the nav the moment
    // the confirmed tier is non-empty (the honesty wall). T16: the owner's
    // launch quotes filled it, so the nav now carries seven links —
    // Testimonials between "Why Choose Us" and "FAQ" (navLinks order).
    const links = page.locator("header nav a");
    await expect(links).toHaveText([
      "Home",
      "About",
      "Services",
      "Why Choose Us",
      "Testimonials",
      "FAQ",
      "Contact",
    ]);
    await expect(links.filter({ hasText: "Testimonials" })).toHaveCount(1);
  });

  test("the footer quick links mirror the nav — Testimonials + Privacy included (B3/T16)", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(
      footer.getByRole("link", { name: "Testimonials" }),
      "Testimonials link ships in the footer once quotes exist (T16)"
    ).toHaveCount(1);
    // The nine quick links: the seven nav destinations + Book + Privacy.
    // Matched by exact accessible name (a bare a[href="/services"] locator
    // hits the six service-title links too — see the count pin below).
    for (const [href, label] of [
      ["/", "Home"],
      ["/about", "About"],
      ["/services", "Services"],
      ["/why-choose-us", "Why Choose Us"],
      ["/testimonials", "Testimonials"],
      ["/faq", "FAQ"],
      ["/contact", "Contact"],
      ["/book", "Book a consultation"],
      ["/privacy", "Privacy"],
    ] as const) {
      const link = footer.getByRole("link", { name: label, exact: true });
      await expect(link, `footer quick link: ${label}`).toHaveCount(1);
      await expect(link, `footer quick link href: ${label}`).toHaveAttribute(
        "href",
        href
      );
    }
  });

  test("the footer carries the six service titles, hours rows, clean blurb and descriptor (B3)", async ({ page }) => {
    const footer = page.locator("footer");
    // Blurb: the "Trusted" adjective is retired (§3.6 wording sweep).
    await expect(footer).toContainText(
      "Tax consultancy serving individuals and businesses in Jaisalmer."
    );
    await expect(footer).not.toContainText("Trusted");
    // Six service titles + the Quick links "Services" item = 7 /services anchors.
    await expect(footer.locator('a[href="/services"]')).toHaveCount(7);
    for (const s of services) {
      await expect(footer, `service title: ${s.title}`).toContainText(s.title);
    }
    // Hours rows, stated from config rendering (§3.4).
    await expect(footer).toContainText("Monday – Saturday · 10:00 AM – 7:00 PM");
    await expect(footer).toContainText("Sunday · Closed");
    // Bottom descriptor — the non-CA variant ships (practitionerIsCa=false).
    await expect(footer).toContainText(
      "Income Tax, GST, Tax Planning and Business Registration"
    );
    // §3.4 census: no "since 2001" survives in the footer blurb area.
    await expect(footer).not.toContainText("serving individuals and businesses since 2001");
    // T14-G: the footer address opens Google Maps, byte-equal to config.
    const footerMap = footer.locator('a[href*="maps.app.goo.gl"]');
    await expect(footerMap).toHaveCount(1);
    await expect(footerMap).toHaveAttribute("href", site.mapsLink);
    await expect(footerMap).toContainText("109, Indira Colony");
  });
});
