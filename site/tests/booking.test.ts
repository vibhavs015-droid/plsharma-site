/**
 * Unit tests for the pure booking-request builders.
 * Run: node --test tests/
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  buildBookingMessage,
  buildWhatsAppUrl,
  emptyBooking,
} from "../lib/booking.ts";

const FIRM = "P.L. Sharma And Company";
const NUMBER = "919829771396";

test("message always contains header, firm, name and phone", () => {
  const msg = buildBookingMessage({ name: "Ramesh Kumar", phone: "+91 98297 71396" }, FIRM);
  assert.match(msg, /\*New Appointment Request\*/);
  assert.match(msg, /via P\.L\. Sharma And Company website/);
  assert.match(msg, /Name: Ramesh Kumar/);
  assert.match(msg, /Phone: \+91 98297 71396/);
});

test("optional fields included only when present", () => {
  const minimal = buildBookingMessage({ name: "A", phone: "B" }, FIRM);
  assert.doesNotMatch(minimal, /Email:/);
  assert.doesNotMatch(minimal, /Service:/);
  assert.doesNotMatch(minimal, /Preferred Date:/);
  assert.doesNotMatch(minimal, /Preferred Time:/);
  assert.doesNotMatch(minimal, /Note:/);

  const full = buildBookingMessage(
    {
      name: "A",
      phone: "B",
      email: "a@b.com",
      service: "GST Registration",
      date: "2026-11-15",
      slot: "Morning (10:00 AM – 1:00 PM)",
      message: "Need help urgently",
    },
    FIRM
  );
  assert.match(full, /Email: a@b\.com/);
  assert.match(full, /Service: GST Registration/);
  assert.match(full, /Preferred Date: 2026-11-15/);
  assert.match(full, /Preferred Time: Morning \(10:00 AM – 1:00 PM\)/);
  assert.match(full, /Note: Need help urgently/);
});

test("whatsapp url targets the right number and encodes the message", () => {
  const url = buildWhatsAppUrl({ name: "A & B", phone: "98765 43210" }, FIRM, NUMBER);
  assert.ok(url.startsWith(`https://wa.me/${NUMBER}?text=`), url);
  const text = decodeURIComponent(url.split("?text=")[1]!);
  assert.match(text, /Name: A & B/);
  assert.match(text, /Phone: 98765 43210/);
});

test("multiline message stays multiline after round-trip", () => {
  const url = buildWhatsAppUrl(
    { name: "A", phone: "B", email: "x", service: "y", date: "z", slot: "s", message: "m" },
    FIRM,
    NUMBER
  );
  const text = decodeURIComponent(url.split("?text=")[1]!);
  assert.match(text, /Note: m$/);
  assert.ok((text.match(/\n/g) || []).length >= 5, "expected several line breaks");
});

test("emptyBooking resets every field to empty string", () => {
  for (const value of Object.values(emptyBooking)) {
    assert.equal(value, "");
  }
});
