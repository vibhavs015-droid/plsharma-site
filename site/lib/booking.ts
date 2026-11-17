/**
 * Pure booking-request helpers — no framework imports so they can be
 * unit-tested directly with `node --test`.
 */

export interface BookingFields {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  date?: string;
  slot?: string;
  message?: string;
}

/** Empty form state; also reused as the reset target. */
export const emptyBooking: Required<BookingFields> = {
  name: "",
  phone: "",
  email: "",
  service: "",
  date: "",
  slot: "",
  message: "",
};

/** Build the WhatsApp message body for a booking request. */
export function buildBookingMessage(f: BookingFields, firmName: string): string {
  const lines = [
    `*Consultation Request*`,
    `— via ${firmName} website`,
    ``,
    `Name: ${f.name}`,
    `Phone: ${f.phone}`,
  ];
  if (f.email) lines.push(`Email: ${f.email}`);
  if (f.service) lines.push(`Service: ${f.service}`);
  if (f.date) lines.push(`Preferred Date: ${f.date}`);
  if (f.slot) lines.push(`Preferred Time: ${f.slot}`);
  if (f.message) lines.push(`Note: ${f.message}`);
  return lines.join("\n");
}

/** Build the full wa.me deep link with the message URL-encoded. */
export function buildWhatsAppUrl(
  f: BookingFields,
  firmName: string,
  whatsappNumber: string
): string {
  const text = encodeURIComponent(buildBookingMessage(f, firmName));
  return `https://wa.me/${whatsappNumber}?text=${text}`;
}
