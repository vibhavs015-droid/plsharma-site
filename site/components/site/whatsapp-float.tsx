import { site } from "@/lib/site-config";

/**
 * Floating WhatsApp button (bottom-right, all pages).
 * Opens a WhatsApp chat with a friendly pre-filled message.
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
      aria-label="Chat with us on WhatsApp"
      className="fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-full bg-whatsapp px-4 py-3 text-sm font-semibold text-white shadow-lg motion-safe:transition-transform motion-safe:hover:scale-105 motion-safe:active:scale-95"
    >
      {/* Official WhatsApp glyph */}
      <svg viewBox="0 0 32 32" className="size-5 fill-current" aria-hidden="true">
        <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.2 1.7 6L4 29l8.2-1.6c1.2.6 2.5.9 3.8.9 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.8c-1.2 0-2.4-.3-3.4-.8l-.6-.3-4.4.9.9-4.3-.3-.6c-.7-1.2-1-2.5-1-3.8 0-4.9 4-8.9 8.9-8.9s8.9 4 8.9 8.9-4.1 8.9-9 8.9zm4.9-6.6c-.3-.1-1.7-.8-1.9-.9-.2-.1-.4-.1-.6.1-.2.3-.6.9-.8 1.1-.2.2-.3.2-.6.1-1.6-.8-2.6-1.4-3.7-3.2-.3-.5.3-.5.8-1.4.1-.2 0-.4 0-.5 0-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2 0 1.3.9 2.5 1 2.7.1.2 1.9 2.9 4.6 4.1 1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.2-.3-.2-.4-.3z" />
      </svg>
      WhatsApp
    </a>
  );
}
