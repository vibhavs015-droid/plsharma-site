import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/site/reveal";
import { site, services, whyChooseUs, faqs, team } from "@/lib/site-config";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/** First sentence of an FAQ answer, for the home-page preview list. */
function firstSentence(text: string): string {
  const m = /(.+?[.!?])(?=\s+[A-Z"']|$)/.exec(text);
  return m ? m[1] : text;
}

/* Page-aware wa.me deep link — same mechanics as the WhatsApp float, but the
   pre-filled message says which page sent the visitor (ground truth for the
   measurement plan in user-problem.md §6). */
const whatsappHref = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  `Hello ${site.name}, I would like to book a consultation — via the website's home page.`
)}`;

/* Way-of-working proof, exactly the claims already on the site: fees agreed
   before work begins, on-time discipline, confidentiality, end-to-end notice
   handling. (Personal Attention is the hero proof line; 25+ Years is the
   record line — restating either here would triple-say them.) */
const wayOfWorking = whyChooseUs.slice(2);

/* The three questions the research path turns on (user-problem.md §4.2):
   documents, fees, notices. */
const faqPreview = [faqs[1], faqs[2], faqs[4]];

const founder = team[0];

/* Entry headings are the links (deep links to /book?service= arrive with the
   /services phase). A persistent hairline underline that warms to the text
   gold on hover — the signature interaction from tokens.md §4. */
const entryLink =
  "underline decoration-line decoration-1 underline-offset-4 transition-[text-decoration-color] duration-[var(--motion-base)] ease-standard hover:decoration-brass-ink";

export default function HomePage() {
  return (
    <>
      {/* ============ HERO — the ruled opening: identity in the margin rail,
           one plain sentence, the one action, the principal's plate ============ */}
      <section className="ledger-rail py-[var(--space-section)]">
        <p className="rail-label">
          {site.shortName} · {site.tagline} · Jaisalmer ·{" "}
          <span className="text-brass-ink">
            Since {site.establishedYear}
          </span>
        </p>
        <Reveal y={8}>
          <div>
            <h1>
              Income tax and GST, handled personally — for individuals and
              businesses in Jaisalmer.
            </h1>

            <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-8">
              <div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Book a consultation on WhatsApp
                  </a>
                  <a
                    href={`tel:${site.phoneHref}`}
                    className="btn-quiet"
                  >
                    Call the office · {site.phone}
                  </a>
                </div>
                <p className="mt-6 text-body text-ink-muted">
                  You speak to the principal himself, not a call centre.
                </p>
                <p className="mt-1 text-meta text-ink-muted">
                  The first consultation is free.
                </p>
              </div>

              {/* Founder plate: 4:5, square corners, caption above, hairline
                  beneath. Interim graded crop (tools/process-founder-photo.mjs,
                  acceptance-tested per tokens.md §7.2); reshoot pending
                  (KNOWN_ISSUES #1a). The plate links to /about. */}
              <Link
                href="/about"
                className="w-fit max-w-[300px] shrink-0"
              >
                <p className="rail-label">{founder.name}</p>
                <p className="rail-label mt-1">
                  Principal Consultant · Jaisalmer · Since {site.establishedYear}
                </p>
                <Image
                  src="/images/founder-plate.webp"
                  alt=""
                  width={300}
                  height={375}
                  sizes="(min-width: 1024px) 300px, 40vw"
                  priority
                  unoptimized
                  className="mt-3 block h-auto w-full"
                />
                <span aria-hidden className="mt-3 block h-px w-full bg-line" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============ § 01 · SERVICES — the recognition layer ============ */}
      <section className="ledger-rail pb-[var(--space-section)]">
        <p className="rail-label">§ 01 · Services</p>
        <div>
          <h2>What we handle</h2>
          <p className="text-lead text-ink-muted mt-3 measure">
            The work people bring to this office, in the words they use for it.
          </p>
          <ul className="measure mt-8">
            {services.map((service) => (
              <li key={service.title} className="ruled-entry">
                <h3>
                  <Link href="/services" className={entryLink}>
                    {service.title}
                  </Link>
                </h3>
                <p className="text-body text-ink-muted mt-2">
                  {service.description}
                </p>
                <ul className="mt-3 space-y-1">
                  {service.points.map((point) => (
                    <li key={point} className="text-meta text-ink-muted">
                      — {point}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ § 02 · HOW WE WORK — way-of-working proof ============ */}
      <section className="ledger-rail pb-[var(--space-section)]">
        <p className="rail-label">§ 02 · How we work</p>
        <div>
          <h2>A way of working</h2>
          <p className="text-lead text-ink-muted mt-3 measure">
            Four things you can hold us to.
          </p>
          <ul className="measure mt-8">
            {wayOfWorking.map((item) => (
              <li key={item.title} className="ruled-entry">
                <h3>{item.title}</h3>
                <p className="text-body text-ink-muted mt-2">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ § 03 · THE RECORD — the one honest stat, as a ledger line ============ */}
      <section className="ledger-rail pb-[var(--space-section)]">
        <p className="rail-label">§ 03 · The record</p>
        <div className="ruled-entry">
          <h2>
            <span data-numeric>Since 2001</span> — 25+ Years in Practice in
            Jaisalmer
          </h2>
        </div>
      </section>

      {/* ============ § 04 · CLIENT WORDS — pending content, marked not faked ============ */}
      <section className="ledger-rail pb-[var(--space-section)]">
        <p className="rail-label">§ 04 · Client words</p>
        <div>
          <h2>What clients say</h2>
          <div className="ruled-entry measure mt-8">
            <p className="placeholder-mark">
              [PLACEHOLDER — awaiting real testimonial from owner]
            </p>
            <p className="text-body text-ink-muted mt-4">
              Real client words will be published here, with the client&apos;s
              permission, once they arrive. Until then this entry stays empty on
              purpose — we show only what we can stand behind.
            </p>
          </div>
        </div>
      </section>

      {/* ============ § 05 · COMMON QUESTIONS ============ */}
      <section className="ledger-rail pb-[var(--space-section)]">
        <p className="rail-label">§ 05 · Common questions</p>
        <div>
          <h2>Common questions</h2>
          <ul className="measure mt-8">
            {faqPreview.map((faq, i) => (
              <li key={faq.question} className="ruled-entry">
                <div className="flex gap-4">
                  <span className="rail-label pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>
                      <Link href="/faq" className={entryLink}>
                        {faq.question}
                      </Link>
                    </h3>
                    <p className="text-meta text-ink-muted mt-2">
                      {firstSentence(faq.answer)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Link href="/faq" className="btn-quiet mt-8">
            All common questions
          </Link>
        </div>
      </section>

      {/* ============ THE ACT BAND — one sentence, one action, the quiet phone ============ */}
      <section className="act-band">
        <div className="ledger-rail py-[var(--space-section)]">
          <p className="rail-label text-brass">
            The next step
          </p>
          <div>
            <h2 className="max-w-[24ch]">
              Tell us what you need — we reply on WhatsApp and fix a time.
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
              <a
                href={`tel:${site.phoneHref}`}
                className="btn-quiet"
              >
                Call the office · {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
