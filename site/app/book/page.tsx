import type { Metadata } from "next";
import { BookingForm } from "@/components/site/booking-form";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Book a consultation",
  description:
    "Send a consultation request to P.L. Sharma And Company — fill in two details and WhatsApp opens with your request ready. We reply and confirm a time. Or call +91 98297 71396; the office is open Monday – Saturday, 10:00 AM – 7:00 PM.",
  alternates: { canonical: "/book" },
};

/* Quiet phone link (§3 — stated, never sold): the hairline underline the page
   entries use, warming to brass-ink on hover. */
const entryLink =
  "underline decoration-line decoration-1 underline-offset-4 transition-[text-decoration-color] duration-[var(--motion-base)] ease-standard hover:decoration-brass-ink";

export default function BookPage() {
  return (
    <>
      {/* ============ PAGE HEAD — identity rail, one plain h1, the honest
           next-step line verbatim (user-problem.md §5.2 item 1) ============ */}
      <section className="ledger-rail pt-[var(--space-section)] pb-[var(--space-entry)]">
        <p className="rail-label">
          {site.shortName} · Book · Jaisalmer
        </p>
        <div>
          <h1>Book a consultation</h1>
          <p className="text-body text-ink-muted mt-3 measure">
            Fill in two details — WhatsApp opens with your request ready. We
            reply and confirm a time; nothing is booked automatically.
          </p>
        </div>
      </section>

      {/* ============ THE CONSULTATION SLIP — sand ground, the three steps
           as margin notes in the rail (they stack above the form at 360),
           the form itself as the ruled slip (§5.2 items 2–5) ============ */}
      <section className="border-y border-line bg-sand">
        <div className="ledger-rail pt-[var(--space-entry)] pb-[var(--space-section)]">
          <p className="rail-label">
            1 your name · 2 when suits you · 3 send on WhatsApp
          </p>
          <div>
            <BookingForm />
          </div>
        </div>
      </section>

      {/* ============ SECONDARY PATHS — stated, never sold (§3): the phone
           card's content kept, re-set as ruled entries on paper ============ */}
      <section className="ledger-rail py-[var(--space-section)]">
        <p className="rail-label">Prefer to talk first?</p>
        <div>
          <ul className="measure">
            <li className="ruled-entry">
              <p className="text-body">
                <a href={`tel:${site.phoneHref}`} className={entryLink}>
                  Call the office ·{" "}
                  <span className="phone-number">{site.phone}</span>
                </a>
              </p>
            </li>
            {site.hours.map((h) => (
              <li key={h.days} className="ruled-entry">
                <p className="text-body text-ink-muted">
                  {h.days} · {h.time}
                </p>
              </li>
            ))}
            <li className="ruled-entry">
              <p className="text-body text-ink-muted">{site.address}</p>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
