import type { Metadata } from "next";
import Link from "next/link";
import { site, whyChooseUs } from "@/lib/site-config";
import { pageMetadata } from "@/lib/page-meta";
import { ActionBar } from "@/components/site/action-bar";

export const metadata: Metadata = pageMetadata({
  title: "How we work",
  description:
    "Fees agreed before work begins. Deadlines kept. Your papers stay confidential. Four things you can hold P.L. Sharma And Company to.",
  path: "/why-choose-us",
});

/* Page-aware wa.me deep link for the end-of-page band — same mechanics as
   Home's band (user-problem.md §2.3): the pre-filled message says which page
   sent the visitor (ground truth for the §6 measurement plan). */
const whatsappHref = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  `Hello ${site.name}, I would like to book a consultation — via the website's why-choose-us page.`
)}`;

/* The entry-link underline (tokens.md §4 signature interaction): a persistent
   hairline that warms to the text gold on hover. */
const entryLink =
  "underline decoration-line decoration-1 underline-offset-4 transition-[text-decoration-color] duration-[var(--motion-base)] ease-standard hover:decoration-brass-ink";

/* The four way-of-working entries (§3 inventory): config titles verbatim —
   the same four Home 02 carries, deliberately the same claims — with each
   config description tightened to one sentence. The check-link is honest
   pointing, not decoration: it goes to /faq only where a real answer exists.
   The on-time entry gets NO link (§2.4: a statement stands; a fake link is
   worse). No icons, no stats — 25+ Years and Personal Attention live on
   Home and /about; re-saying them here would triple-say them, and stats[]
   never renders on this page (§3 content source). */
const wayOfWorking = [
  {
    title: whyChooseUs[2].title,
    body: "Clear, agreed fees before work begins — no hidden charges, no surprises.",
    check: { label: "Read the fee answer", href: "/faq" },
  },
  {
    title: whyChooseUs[3].title,
    body: "Returns and filings are completed well before their due dates.",
    check: null,
  },
  {
    title: whyChooseUs[4].title,
    body: "Your financial data stays strictly between us — professional secrecy is the foundation of our practice.",
    check: { label: "Read the confidentiality answer", href: "/faq" },
  },
  {
    title: whyChooseUs[5].title,
    body: "From first consultation to notice handling — we stay with you through the whole process.",
    check: { label: "Read the notice answer", href: "/faq" },
  },
];

export default function WhyChooseUsPage() {
  return (
    <>
      {/* ============ PAGE HEAD — §0.1 ruled head; the h1 IS the manifesto
           statement (the page's one loud moment — no second giant statement
           repeats it, §3 fold item 2) ============ */}
      <section className="ledger-rail py-[var(--space-section)]">
        <p className="rail-label">WHY CHOOSE US</p>
        <div>
          <div>
            <h1>
              Fees agreed before work begins. Deadlines kept. Your papers
              stay confidential.
            </h1>
            <p className="text-lead text-ink-muted mt-3 measure">
              Four things you can hold us to.
            </p>
          </div>
        </div>
      </section>

      {/* ============ 01 · THE WAY OF WORKING — four numbered ruled
            entries in config order, which is also the fear order:
            fee → deadline → shame → notice (§3 inventory) ============ */}
      <section className="ledger-rail pb-[var(--space-section)]">
        <p className="rail-label rail-num">
          <span className="rail-num-figure" data-numeric>01</span>
          <span className="rail-num-rule" />
          <span className="rail-num-text">The way of working</span>
        </p>
        <div>
          <h2>The way of working</h2>
          <ul className="measure mt-8">
            {wayOfWorking.map((item, i) => (
              <li key={item.title} className="ruled-entry">
                <div className="flex gap-4">
                  <span className="rail-label pt-1" data-numeric>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>{item.title}</h3>
                    <p className="text-body text-ink-muted mt-2">{item.body}</p>
                    {item.check ? (
                      <p className="mt-3">
                        <Link href={item.check.href} className={entryLink}>
                          {item.check.label}
                        </Link>
                      </p>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ 02 · WHAT THIS MEANS FOR YOUR CASE — the four
            promises translated per audience; studio-written plain copy,
            no new facts, no links (the band does the ask) (§3 inventory) ============ */}
      <section className="ledger-rail pb-[var(--space-section)]">
        <p className="rail-label rail-num">
          <span className="rail-num-figure" data-numeric>02</span>
          <span className="rail-num-rule" />
          <span className="rail-num-text">What this means for your case</span>
        </p>
        <div>
          <h2>What this means for your case</h2>
          <ul className="measure mt-8">
            <li className="ruled-entry">
              <h3>If you&apos;re salaried</h3>
              <p className="text-body text-ink-muted mt-2">
                Your return filed before the deadline, the fee agreed first,
                your papers kept between us.
              </p>
            </li>
            <li className="ruled-entry">
              <h3>If you run a business</h3>
              <p className="text-body text-ink-muted mt-2">
                The GST calendar kept for you, credits claimed properly, and
                if a notice comes we handle it through to the end.
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* ============ THE ACT BAND — hold us to all four (§3 close): one
           sentence, canonical primary, quiet phone ============ */}
      <section className="act-band">
        <div className="ledger-rail py-[var(--space-section)]">
          <p className="rail-label text-brass">The next step</p>
          <div>
            <h2 className="max-w-[24ch]">
              Hold us to all four — start with the first conversation.
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
      <ActionBar />
    </>
  );
}
