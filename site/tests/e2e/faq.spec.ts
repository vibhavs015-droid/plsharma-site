import { expect, test } from "@playwright/test";
import {
  expectNoAppointmentOnCtaSurfaces,
  expectNoInventedClaims,
  gotoFaq,
  prefillOf,
  site,
  TEL_HREF,
} from "./helpers";
import { faqs } from "../../lib/site-config";

/**
 * Phase 3 Stage C QA — `/faq` on the Kept Ledger system.
 *
 * Sources of truth: docs/design/phase-3/page-specs.md §0 (global head/band
 * rules) and §5 (the /faq contract: decisive trio first, NO accordion, all
 * seven answers always visible, two earned /book links, page-aware prefill);
 * honesty rules per §2.4/§9.
 *
 * Every content assertion is made against `site/lib/site-config.ts` — the
 * questions and answers are byte-tracked to config, never hard-coded, so an
 * engineer editing the config gets caught, not worked around.
 */

// §5 inventory: the rendered entry order maps to these faqs[] indexes —
// the decisive trio (documents, fees, notice) first, then working-with-us,
// then the business question. Reordering is presentational; this array is
// the only place the mapping lives.
const PAGE_ORDER = [1, 2, 4, 3, 0, 6, 5];

// §0.3 page-aware prefill for the band primary, /faq attribution.
const EXPECTED_FAQ_PREFILL = `Hello ${site.name}, I would like to book a consultation — via the website's faq page.`;

// §5 fold item 3: the head's ask-us link keeps the QUESTION prefill — an faq
// message is not always a booking (page-specs §0.3 exception pattern).
const QUESTION_PREFILL = `Hello ${site.name}, I have a question.`;

test.describe("FAQ — structure & content (page-specs §5)", () => {
  test.setTimeout(90_000);

  test.beforeEach(async ({ page }) => {
    await gotoFaq(page);
  });

  test("exactly one h1 — the trio sentence", async ({ page }) => {
    const h1 = page.locator("main h1");
    await expect(h1).toHaveCount(1);
    await expect(h1).toHaveText("Documents, fees, notices — the questions, answered plainly.");
  });

  test("ruled head: rail-label, lead, and the quiet ask line with the QUESTION prefill", async ({ page }) => {
    const head = page.locator("main section.ledger-rail").first();
    await expect(head.locator("p.rail-label")).toHaveText(`${site.shortName} · FAQ · Jaisalmer`);
    await expect(head.locator("p.text-lead")).toHaveText(
      "The things people ask before their first message — answered the way we'd answer across the desk."
    );

    // §5 fold item 3: the ask link is a wa.me link carrying the question
    // prefill — NOT a booking-request prefill.
    const ask = head.locator('a[href^="https://wa.me/"]');
    await expect(ask).toHaveCount(1);
    // §7 lockstep 7 (B3): the ask line was rewritten; the QUESTION prefill
    // below it is unchanged — an ask is still not always a booking.
    await expect(ask).toHaveText("Something else on your mind? Send it — a person replies.");
    const prefill = prefillOf((await ask.getAttribute("href"))!);
    expect(prefill).toBe(QUESTION_PREFILL);
    expect(prefill, "the head ask link is a question, not a booking request").not.toMatch(
      /book a consultation/i
    );
  });

  test("no accordion device: zero <details>, zero JS toggles inside main", async ({ page }) => {
    // §5 rendering rule: accordion-as-decoration is forbidden and hiding the
    // fee answer behind a click is the opposite of this page's job. The page
    // carries no interactive toggle anywhere in its content (the header's
    // mobile-menu button sits outside <main>).
    await expect(page.locator("details")).toHaveCount(0);
    await expect(page.locator("main button")).toHaveCount(0);
    await expect(page.locator("main [role='button']")).toHaveCount(0);
    await expect(page.locator("main [aria-expanded]")).toHaveCount(0);
  });

  test("all seven answers are visible without any interaction", async ({ page }) => {
    const entries = page.locator("main li.ruled-entry");
    await expect(entries).toHaveCount(7);
    for (let pos = 0; pos < PAGE_ORDER.length; pos++) {
      const faq = faqs[PAGE_ORDER[pos]];
      const entry = entries.nth(pos);
      await expect(entry, `entry ${pos + 1} (${faq.question}) is visible`).toBeVisible();
      const answer = entry.locator("p", { hasText: faq.answer });
      await expect(answer, `answer to entry ${pos + 1} renders once, unfolded`).toHaveCount(1);
      await expect(answer).toBeVisible();
    }
  });

  test("entries render in §5 order — decisive trio first — with continuous numbering 01–07", async ({ page }) => {
    const entries = page.locator("main li.ruled-entry");
    await expect(entries).toHaveCount(7);
    // Questions in rendered order (trio = faqs[1], faqs[2], faqs[4] first).
    await expect(entries.locator("h3")).toHaveText(PAGE_ORDER.map((i) => faqs[i].question));
    // Entry numbers run 01–07 continuously across the three sections (§0.2:
    // the § label and the entry marker are different devices).
    await expect(entries.locator("span.rail-label")).toHaveText(
      PAGE_ORDER.map((_, n) => String(n + 1).padStart(2, "0"))
    );
  });

  test("§ sections group the entries 3 / 3 / 1 under their rail-num labels", async ({ page }) => {
    const sections = page.locator("main section.ledger-rail");
    await expect(sections).toHaveCount(4); // head + §01 + §02 + §03
    // The head keeps its plain identity rail-label; the three § labels ship
    // the B3 rail-num device (figure + rule + text, `data-numeric` on each
    // figure). Served evidence: spec-evidence.json → faq.railLabels.
    await expect(sections.nth(0).locator("p.rail-label")).toHaveText(
      `${site.shortName} · FAQ · Jaisalmer`
    );
    const figs = page.locator("main p.rail-label.rail-num .rail-num-figure");
    await expect(figs).toHaveCount(3);
    await expect(figs.nth(0)).toHaveText("01");
    await expect(figs.nth(1)).toHaveText("02");
    await expect(figs.nth(2)).toHaveText("03");
    for (let i = 0; i < 3; i++) {
      await expect(figs.nth(i)).toHaveAttribute("data-numeric", "true");
    }
    await expect(
      page.locator("main p.rail-label.rail-num .rail-num-text")
    ).toHaveText(["The first questions", "Working with us", "For business clients"]);
    await expect(sections.nth(1).locator("li.ruled-entry")).toHaveCount(3);
    await expect(sections.nth(2).locator("li.ruled-entry")).toHaveCount(3);
    await expect(sections.nth(3).locator("li.ruled-entry")).toHaveCount(1);
  });

  test("every faqs[] question AND answer is present, verbatim from config", async ({ page }) => {
    const main = page.locator("main");
    for (let i = 0; i < faqs.length; i++) {
      await expect(main, `faqs[${i}] question present: "${faqs[i].question}"`).toContainText(
        faqs[i].question
      );
      await expect(main, `faqs[${i}] answer present verbatim`).toContainText(faqs[i].answer);
    }
  });

  test("the fee answer ends with the owner-confirmed free-first sentence, then its /book link", async ({ page }) => {
    // §0.6/§5: the fee answer gains "The first consultation is free." as its
    // final line, and its foot carries the earned /book link — sentence first,
    // link after it, in DOM order. (The config string is passed as the
    // evaluate `arg`: locator.evaluate does not inline closure variables.)
    const feeAnswer = faqs[2].answer;
    const feeEntry = page.locator("main li.ruled-entry").nth(1);
    const verdict = await feeEntry.evaluate(
      (el, feeAnswer) => {
        const ps = Array.from(el.querySelectorAll("p"));
        const answerP = ps.find((p) => (p.textContent ?? "") === feeAnswer);
        const freeP = ps.find((p) => (p.textContent ?? "") === "The first consultation is free.");
        const bookA = el.querySelector('a[href="/book"]');
        if (!answerP) return "config fee answer paragraph not found";
        if (!freeP) return "'The first consultation is free.' paragraph not found";
        if (!bookA) return "/book foot link not found";
        const follows = (a: Node, b: Node) =>
          (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
        if (!follows(answerP, freeP)) return "free sentence does not come after the config answer";
        if (!follows(freeP, bookA)) return "the /book link does not come after the free sentence";
        return "ok";
      },
      feeAnswer
    );
    expect(verdict, "fee entry: answer → free sentence → /book link, in order").toBe("ok");

    // §0.6: the canonical sentence ships in exactly three places site-wide —
    // exactly once on this page.
    const occurrences = (await page.locator("main").innerText()).match(
      /The first consultation is free\./g
    )?.length;
    expect(occurrences, "'The first consultation is free.' appears exactly once on /faq").toBe(1);
  });

  test("exactly two entries carry a /book link — fee and notice — and no other entry carries any link", async ({ page }) => {
    // §5 CTA map: quiet links, sparse and earned — 02 fee foot and 03 notice
    // foot only.
    const entries = page.locator("main li.ruled-entry");
    await expect(entries).toHaveCount(7);
    for (const pos of [1, 2]) {
      const link = entries.nth(pos).locator('a[href="/book"]');
      await expect(link, `entry ${pos + 1} carries its earned /book link`).toHaveCount(1);
    }
    for (const pos of [0, 3, 4, 5, 6]) {
      await expect(
        entries.nth(pos).locator("a"),
        `entry ${pos + 1} carries no link`
      ).toHaveCount(0);
    }
    // And they are the page's only /book anchors in main — the band primary
    // is the wa.me deep link, not a competing /book link.
    await expect(page.locator('main a[href="/book"]')).toHaveCount(2);
  });

  test("act band: once, closes the page, earned sentence, canonical CTA, faq-attributed prefill, quiet phone", async ({ page }) => {
    const band = page.locator("section.act-band");
    await expect(band).toHaveCount(1);
    await expect(page.locator("main > section:last-of-type")).toHaveClass(/act-band/);
    await expect(band.locator("p.rail-label")).toHaveText("The next step");
    await expect(band.locator("h2")).toHaveText(
      "A question we haven't answered? Send it — a person replies."
    );

    const cta = band.locator("a.btn-primary");
    await expect(cta).toHaveCount(1);
    await expect(cta).toHaveText("Book a consultation on WhatsApp");
    expect(prefillOf((await cta.getAttribute("href"))!)).toBe(EXPECTED_FAQ_PREFILL);

    const tel = band.locator('a[href^="tel:"]');
    await expect(tel).toHaveText(`Call the office · ${site.phone}`);
    await expect(tel).toHaveAttribute("href", TEL_HREF);
  });

  test("metadata title is the faq title", async ({ page }) => {
    // layout.tsx applies the `%s | ${site.name}` template.
    await expect(page).toHaveTitle(`Common questions — documents, fees, notices | ${site.name}`);
  });
});

test.describe("FAQ — honesty regression guards", () => {
  test.setTimeout(90_000);

  test.beforeEach(async ({ page }) => {
    await gotoFaq(page);
  });

  test("zero retired wording anywhere in the served page", async ({ page }) => {
    // §9.2: no "Book an Appointment", "Send Booking Request", "Get started"
    // in any rebuilt route's rendered HTML or RSC payload.
    const html = await page.content();
    expect(html).not.toMatch(/book\s+an?\s+appointment/i);
    expect(html).not.toMatch(/send booking request|get started/i);
    // Stage C config guard: the FAQ booking answer's retired line "…confirm
    // your appointment slot" was replaced by "…confirm your slot on
    // WhatsApp." — the plain word has no business anywhere on this page.
    expect(html).not.toMatch(/appointment/i);
  });

  test("FAQPage JSON-LD: exactly one script carrying exactly the seven shipped answers (O-6)", async ({ page }) => {
    // §5 do-not list binds schema too: the payload matches exactly what users
    // see — byte-tracked to the same config the page renders, with the fee
    // answer carrying the free-first line as its final line (joined with a
    // newline, the paragraph break the page renders). Located as an element,
    // so RSC flight-payload string copies are ignored.
    const scripts = page.locator('script[type="application/ld+json"]');
    await expect(scripts).toHaveCount(1);
    const raw = await scripts.first().textContent();
    expect(raw, "ld+json payload is non-empty").toBeTruthy();
    const payload = JSON.parse(raw!) as {
      "@context": string;
      "@type": string;
      mainEntity: Array<{ name: string; acceptedAnswer: { text: string } }>;
    };
    expect(payload["@context"]).toBe("https://schema.org");
    expect(payload["@type"]).toBe("FAQPage");
    expect(payload.mainEntity, "one Question per shipped answer").toHaveLength(faqs.length);
    for (let i = 0; i < faqs.length; i++) {
      expect(payload.mainEntity[i].name, `Question ${i + 1} name byte-equal config`).toBe(
        faqs[i].question
      );
      const expectedText =
        i === 2 ? `${faqs[i].answer}\nThe first consultation is free.` : faqs[i].answer;
      expect(
        payload.mainEntity[i].acceptedAnswer.text,
        `Answer ${i + 1} text byte-equal config${i === 2 ? " + free-first line" : ""}`
      ).toBe(expectedText);
    }
    // And the schema cannot re-introduce what the page retired.
    expect(raw!, "no retired wording in the schema payload").not.toMatch(/appointment/i);
  });

  test("zero 'appointment' on CTA surfaces (link/button text, aria-labels, titles)", async ({ page }) => {
    await expectNoAppointmentOnCtaSurfaces(page);
  });

  test("no stars, no rating schema, no fee figures, no invented names or stats", async ({ page }) => {
    await expectNoInventedClaims(page);
  });
});
