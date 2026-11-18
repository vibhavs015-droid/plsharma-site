import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site, services, whyChooseUs, faqs, yearsInPractice, hoursCompact, confirmedTeam } from "@/lib/site-config";
import { visibleTeam, visibleTestimonials } from "@/lib/sample-content";
import { showSampleContent, siteUrl } from "@/lib/content-mode";
import { pageMetadata } from "@/lib/page-meta";
import { ActionBar } from "@/components/site/action-bar";
import { SampleTag } from "@/components/site/sample-tag";

export const metadata: Metadata = pageMetadata({
  // No title: the layout's default title must survive the template here.
  description: site.description,
  path: "/",
});

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

const founder = visibleTeam[0];

/* Entry headings are the links (deep links to /book?service= arrive with the
   /services phase). A persistent hairline underline that warms to the text
   gold on hover — the signature interaction from tokens.md §4. */
const entryLink =
  "underline decoration-line decoration-1 underline-offset-4 transition-[text-decoration-color] duration-[var(--motion-base)] ease-standard hover:decoration-brass-ink";

/* ProfessionalService structured data (T9.5) — server-side, CONFIRMED data
   only: the firm's name and contact coordinates, the principal as a Person,
   the served area and the founding year. NO ratings, no aggregateRating,
   no logo — nothing the site does not already state. Same pattern as /faq's
   FAQPage payload: a module-level stringify the page renders once, quoting
   config values so schema and page cannot drift. The address parts are
   split from site.address (each part verbatim in that config string) and
   openingHours is the schema.org form of site.hours[0] ("Monday – Saturday
   · 10:00 AM – 7:00 PM") — kept in sync like hoursCompact. */
const professionalServiceJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: siteUrl,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "109, Indira Colony",
    addressLocality: "Jaisalmer",
    addressRegion: "Rajasthan",
    postalCode: "345001",
    addressCountry: "IN",
  },
  openingHours: "Mo-Sa 10:00-19:00",
  founder: {
    "@type": "Person",
    name: confirmedTeam[0].name,
  },
  areaServed: "Jaisalmer",
  foundingDate: String(site.establishedYear),
});

export default function HomePage() {
  return (
    <>
      {/* ============ HERO — the ruled opening: identity in the margin rail,
           one plain sentence, the one action, the principal's plate ============ */}
      <section className="ledger-rail py-[var(--space-section)]">
        <p className="rail-label">HOME</p>
        <div>
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
                    Call the office ·{" "}
                    <span className="phone-number">{site.phone}</span>
                  </a>
                </div>
                <p className="text-body text-ink-muted mt-6">
                  {founder.name} has run his tax practice in Jaisalmer since
                  2001. Individuals and businesses come to him with the
                  everyday work of Indian tax: a return to file, a GST
                  registration, a notice that needs a reply. He handles each
                  case himself, agrees the fee before work begins, and keeps
                  your papers confidential. The first consultation is free.
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
                <Image
                  src="/images/founder-plate-polished.webp"
                  alt=""
                  width={300}
                  height={375}
                  sizes="(min-width: 1024px) 300px, 40vw"
                  priority
                  fetchPriority="high"
                  unoptimized
                  className="block h-auto w-full"
                />
                <p className="rail-label mt-3">{founder.name}</p>
                <p className="rail-label mt-1">
                  Principal Consultant · Jaisalmer
                </p>
                <span aria-hidden className="mt-3 block h-px w-full bg-line" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 01 · SERVICES — the recognition layer ============ */}
      <section className="ledger-rail pb-[var(--space-section)]">
        <p className="rail-label rail-num">
          <span className="rail-num-figure" data-numeric>01</span>
          <span className="rail-num-rule" />
          <span className="rail-num-text">Services</span>
        </p>
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

      {/* ============ 02 · HOW WE WORK — way-of-working proof ============ */}
      <section className="ledger-rail pb-[var(--space-section)]">
        <p className="rail-label rail-num">
          <span className="rail-num-figure" data-numeric>02</span>
          <span className="rail-num-rule" />
          <span className="rail-num-text">How we work</span>
        </p>
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

      {/* ============ 03 · THE RECORD — five owner-backed facts, the
            census's Home 2001 line (spec §2.2). Numbers computed from config
            (yearsInPractice), hours from the display constant — never
            hard-coded; no periods, sentence case. ============ */}
      <section className="ledger-rail pb-[var(--space-section)]">
        <p className="rail-label rail-num">
          <span className="rail-num-figure" data-numeric>03</span>
          <span className="rail-num-rule" />
          <span className="rail-num-text">The record</span>
        </p>
        <div>
          <h2>The record</h2>
          <ul className="measure mt-8">
            <li className="ruled-entry">
              <p className="text-body" data-numeric>Since 2001</p>
            </li>
            <li className="ruled-entry">
              <p className="text-body" data-numeric>
                {yearsInPractice} years in practice
              </p>
            </li>
            <li className="ruled-entry">
              <p className="text-body" data-numeric>{hoursCompact}</p>
            </li>
            <li className="ruled-entry">
              <p className="text-body">First consultation free</p>
            </li>
            <li className="ruled-entry">
              <p className="text-body">Office in Jaisalmer</p>
            </li>
          </ul>
        </div>
      </section>

      {/* ============ 04 · CLIENT WORDS — gated on the visible tier
            (spec §5.2 as amended by T7): production shows NOTHING here while
            the confirmed tier is empty; preview shows the tagged samples
            with the reserve furniture. When real quotes exist the quotes
            render with the permission note — no tags, no reserve. ============ */}
      {visibleTestimonials.length > 0 ? (
        <section className="ledger-rail pb-[var(--space-section)]">
          <p className="rail-label rail-num">
            <span className="rail-num-figure" data-numeric>04</span>
            <span className="rail-num-rule" />
            <span className="rail-num-text">Client words</span>
          </p>
          <div>
            <h2>What clients say</h2>
            {showSampleContent ? (
              <div className="ruled-entry measure mt-8">
                <p className="placeholder-mark">
                  [PLACEHOLDER — awaiting real testimonial from owner]
                </p>
                <p className="text-body text-ink-muted mt-4">
                  Real client words will be published with the client&apos;s
                  permission — until then this entry stays empty on purpose.
                </p>
                <p className="mt-4">
                  <Link href="/testimonials" className={entryLink}>
                    How we handle client words
                  </Link>
                </p>
              </div>
            ) : (
              <p className="text-body text-ink-muted mt-4">
                Shared with the client&apos;s permission.
              </p>
            )}
            <ul className="measure mt-8">
              {visibleTestimonials.map((t) => (
                <li key={t.area} className="ruled-entry">
                  <p className="text-body">“{t.quote}”</p>
                  <p className="rail-label mt-2">
                    {t.name} · {t.area}{" "}
                    {showSampleContent ? <SampleTag /> : null}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* ============ 05 · COMMON QUESTIONS ============ */}
      <section className="ledger-rail pb-[var(--space-section)]">
        <p className="rail-label rail-num">
          <span className="rail-num-figure" data-numeric>05</span>
          <span className="rail-num-rule" />
          <span className="rail-num-text">Common questions</span>
        </p>
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
                Call the office ·{" "}
                <span className="phone-number">{site.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ProfessionalService JSON-LD (T9.5) — invisible,
           generated above from confirmed config; exactly one ld+json script
           per page, same pattern as /faq's FAQPage payload ============ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: professionalServiceJsonLd }}
      />
      <ActionBar />
    </>
  );
}
