import { site } from "@/lib/site-config";

/**
 * Floating WhatsApp button (bottom-right, all pages).
 * Opens a WhatsApp chat with a friendly pre-filled message.
 *
 * Static by design (user-problem.md §2.3): the primary action must not
 * pulse, bounce, or beg. Mark only — the accessible name carries the
 * wording. `rounded-full` is legal here and nowhere else in the system
 * (docs/design/phase-2/tokens.md §3); the drop shadow is the one shadow
 * the design allows (vibe board §3.2).
 *
 * `.whatsapp-float` on the anchor (TASK 12.4) is the art-director's A2
 * styling hook: the CSS still targets body > a[href^="https://wa.me"]
 * and keeps working; the selector swap happens in the art pass, not here.
 */
export function WhatsAppFloat() {
  const message = encodeURIComponent(
    `Hello ${site.name}, I would like to book a consultation.`
  );

  return (
    <a
      href={`https://wa.me/${site.whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book a consultation on WhatsApp"
      className="fixed right-4 bottom-4 z-50 flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg whatsapp-float"
    >
      {/* Official WhatsApp glyph */}
      <svg viewBox="0 0 32 32" className="size-6 fill-current" aria-hidden="true">
        <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.2 1.7 6L4 29l8.2-1.6c1.2.6 2.5.9 3.8.9 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.8c-1.2 0-2.4-.3-3.4-.8l-.6-.3-4.4.9.9-4.3-.3-.6c-.7-1.2-1-2.5-1-3.8 0-4.9 4-8.9 8.9-8.9s8.9 4 8.9 8.9-4.1 8.9-9 8.9zm4.9-6.6c-.3-.1-1.7-.8-1.9-.9-.2-.1-.4-.1-.6.1-.2.3-.6.9-.8 1.1-.2.2-.3.2-.6.1-1.6-.8-2.6-1.4-3.7-3.2-.3-.5.3-.5.8-1.4.1-.2 0-.4 0-.5 0-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2 0 1.3.9 2.5 1 2.7.1.2 1.9 2.9 4.6 4.1 1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.2-.3-.2-.4-.3z" />
      </svg>
    </a>
  );
}
