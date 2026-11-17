import { site } from "@/lib/site-config";

/**
 * ============================================================
 *  STICKY BOTTOM ACTION BAR (TASK 12.5 — markup half)
 * ============================================================
 *  Two actions that follow the visitor on phones: Call and
 *  WhatsApp. Rendered as the LAST element in every page's flow
 *  except /book — there the form and the keyboard are the action
 *  surface, and the bar would fight them for the same bottom
 *  edge (owner decision: hidden on /book).
 *
 *  MARKUP ONLY by design: `.sticky-action-bar` has no CSS yet.
 *  The art-director styles it in the next art pass and must also
 *  (A1 §2 handoff):
 *    - reserve a `--bar-h` token and pad the body/footer so the
 *      bar never covers content — the footer's 80px clearance
 *      below 1296px must not double-count the bar,
 *    - add the safe-area bottom inset (var(--safe-bottom)),
 *    - make it phones-only (hidden at desktop widths),
 *    - move the WhatsApp float above the bar —
 *      bottom: calc(var(--bar-h) + 1rem) — via the float's
 *      `.whatsapp-float` hook (TASK 12.4).
 *
 *  Anchor contract: visible text "Call" / "WhatsApp". The phone
 *  number lives in the aria-label only — the span.phone-number
 *  system applies to RENDERED numbers, so there is no span here;
 *  A2 can add one if the bar ever shows the number. The WhatsApp
 *  prefill is the float's exact UNATTRIBUTED message (same words,
 *  so bar and float open the same conversation — page-aware
 *  prefills stay on the end-of-page bands). Same number source as
 *  every other surface: site.phone / site.phoneHref /
 *  site.whatsappNumber — nothing hard-coded (TASK 12.8).
 * ============================================================
 */
const whatsappHref = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  `Hello ${site.name}, I would like to book a consultation.`
)}`;

export function ActionBar() {
  return (
    <nav className="sticky-action-bar" aria-label="Quick actions">
      <a
        href={`tel:${site.phoneHref}`}
        aria-label={`Call the office · ${site.phone}`}
      >
        Call
      </a>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book a consultation on WhatsApp"
      >
        WhatsApp
      </a>
    </nav>
  );
}
