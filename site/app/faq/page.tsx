import type { Metadata } from "next";
import Link from "next/link";
import { faqs, site } from "@/lib/site-config";
import { pageMetadata } from "@/lib/page-meta";

export const metadata: Metadata = pageMetadata({
  title: "Common questions — documents, fees, notices",
  description:
    "The questions people ask before their first message — which documents to bring, how fees work, what to do about a tax notice, online consultations and GST registration — answered plainly by P.L. Sharma And Company, Jaisalmer.",
  path: "/faq",
});

/* Page-aware wa.me deep links (user-problem.md §6 measurement ground truth):
 * the band primary carries the booking prefill with this page's name; the
 * head's ask-us link keeps the question prefill — a contact message is not
 * always a booking (page-specs §0.3, §5). */
const whatsappHref = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  `Hello ${site.name}, I would like to book a consultation — via the website's faq page.`
)}`;
const questionHref = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  `Hello ${site.name}, I have a question.`
)}`;

/* The entry-link underline (tokens.md §4 signature interaction): a persistent
   hairline that warms to the text gold on hover. */
const entryLink =
  "underline decoration-line decoration-1 underline-offset-4 transition-[text-decoration-color] duration-[var(--motion-base)] ease-standard hover:decoration-brass-ink";

/* Owner-confirmed fact (§0.6 — one of exactly three placements on the site).
   Single source: the fee entry renders it as the answer's final line and the
   FAQPage payload appends it to the fee answer, so page render and schema
   cannot drift (a11y O-6: the payload matches exactly what users see). */
const FREE_FIRST_CONSULTATION = "The first consultation is free.";

/* FAQPage structured data (page-specs §5, closes a11y O-6). Built with
   JSON.stringify over the same faqs[] config the page renders, so the
   payload can only ever carry the seven shipped answers — byte-identical,
   never invented, nothing added (§5 do-not list binds schema too).
   Exception (O-6 refinement): the fee answer's served block ends with the
   owner-confirmed free-first line, so the payload appends it — joined with
   a newline, the plain-text paragraph break the page renders. Order
   follows config; order carries no meaning in mainEntity and mapping
   straight over faqs[] keeps the builder drift-free. */
const faqJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq, i) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text:
        i === 2
          ? `${faq.answer}\n${FREE_FIRST_CONSULTATION}`
          : faq.answer,
    },
  })),
});

/* One FAQ answer, always visible (page-specs §5 — no accordion; hiding the
   fee answer behind a click is the opposite of this page's job). The number
   runs 01–07 continuously across the three sections; the rail label and the
   entry marker are different devices (§0.2). `foot` carries the earned quiet
   links — entries 02 and 03 only (§5 CTA map). */
function FaqEntry({
  number,
  question,
  answer,
  foot,
}: {
  number: number;
  question: string;
  answer?: string;
  foot?: React.ReactNode;
}) {
  return (
    <li className="ruled-entry">
      <div className="flex gap-4">
        <span className="rail-label pt-1" data-numeric>
          {String(number).padStart(2, "0")}
        </span>
        <div>
          <h3>{question}</h3>
          {answer ? (
            <p className="text-body text-ink-muted mt-2">{answer}</p>
          ) : null}
          {foot}
        </div>
      </div>
    </li>
  );
}

export default function FaqPage() {
  /* Owner-confirmed fact (§0.6): the fee answer gains the canonical
     free-first sentence as its final line — rendered from the single
     shared constant, the same source the schema payload uses. */
  const feeBody = (
    <>
      <p className="text-body text-ink-muted mt-2">{faqs[2].answer}</p>
      <p className="text-body mt-2">{FREE_FIRST_CONSULTATION}</p>
      <p className="mt-3">
        <Link href="/book" className={entryLink}>
          Book the free first consultation
        </Link>
      </p>
    </>
  );

  const noticeFoot = (
    <p className="mt-3">
      <Link href="/book" className={entryLink}>
        Send us the notice — start here
      </Link>
    </p>
  );

  return (
    <>
      {/* ============ PAGE HEAD — §0.1 ruled head; the lead plus the ask-us
           line with the question prefill (§5 fold items 1–3) ============ */}
      <section className="ledger-rail py-[var(--space-section)]">
        <p className="rail-label">{site.shortName} · FAQ · Jaisalmer</p>
        <div>
          <div>
            <h1>Documents, fees, notices — the questions, answered plainly.</h1>
            <p className="text-lead text-ink-muted mt-3 measure">
              The things people ask before their first message — answered the
              way we&apos;d answer across the desk.
            </p>
            <p className="text-body mt-4">
              <a href={questionHref} className={entryLink} target="_blank" rel="noopener noreferrer">
                Something else on your mind? Send it — a person replies.
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ============ 01 · THE FIRST QUESTIONS — the decisive trio first,
            owner copy verbatim, reordered per §4.2 (§5 inventory) ============ */}
      <section className="ledger-rail pb-[var(--space-section)]">
        <p className="rail-label rail-num">
          <span className="rail-num-figure" data-numeric>01</span>
          <span className="rail-num-rule" />
          <span className="rail-num-text">The first questions</span>
        </p>
        <div>
          <h2>The first questions</h2>
          <ul className="measure mt-8">
            <FaqEntry number={1} question={faqs[1].question} answer={faqs[1].answer} />
            <FaqEntry number={2} question={faqs[2].question} foot={feeBody} />
            <FaqEntry number={3} question={faqs[4].question} answer={faqs[4].answer} foot={noticeFoot} />
          </ul>
        </div>
      </section>

      {/* ============ 02 · WORKING WITH US (§5 inventory) ============ */}
      <section className="ledger-rail pb-[var(--space-section)]">
        <p className="rail-label rail-num">
          <span className="rail-num-figure" data-numeric>02</span>
          <span className="rail-num-rule" />
          <span className="rail-num-text">Working with us</span>
        </p>
        <div>
          <h2>Working with us</h2>
          <ul className="measure mt-8">
            <FaqEntry number={4} question={faqs[3].question} answer={faqs[3].answer} />
            <FaqEntry number={5} question={faqs[0].question} answer={faqs[0].answer} />
            <FaqEntry number={6} question={faqs[6].question} answer={faqs[6].answer} />
          </ul>
        </div>
      </section>

      {/* ============ 03 · FOR BUSINESS CLIENTS (§5 inventory) ============ */}
      <section className="ledger-rail pb-[var(--space-section)]">
        <p className="rail-label rail-num">
          <span className="rail-num-figure" data-numeric>03</span>
          <span className="rail-num-rule" />
          <span className="rail-num-text">For business clients</span>
        </p>
        <div>
          <h2>For business clients</h2>
          <ul className="measure mt-8">
            <FaqEntry number={7} question={faqs[5].question} answer={faqs[5].answer} />
          </ul>
        </div>
      </section>

      {/* ============ THE ACT BAND — the earned ask (§5 close): one sentence,
           canonical primary, quiet phone ============ */}
      <section className="act-band">
        <div className="ledger-rail py-[var(--space-section)]">
          <p className="rail-label text-brass">The next step</p>
          <div>
            <h2 className="max-w-[24ch]">
              A question we haven&apos;t answered? Send it — a person replies.
            </h2>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Book a consultation on WhatsApp
              </a>
              <a href={`tel:${site.phoneHref}`} className="btn-quiet">
                Call the office ·{" "}
                <span className="phone-number">{site.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQPage JSON-LD (a11y O-6) — invisible, generated above
           from the rendered config; exactly one ld+json script per page ============ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd }}
      />
    </>
  );
}
