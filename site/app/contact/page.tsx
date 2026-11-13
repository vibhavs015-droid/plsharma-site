import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { BookingForm } from "@/components/site/booking-form";
import { Card, CardContent } from "@/components/ui/card";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact & Location",
  description:
    "Visit us at 109, Indira Colony, Jaisalmer, Rajasthan 345001. Call +91 98297 71396 or email plperiwal@yahoo.com. Open Mon–Sat, 10 AM – 7 PM.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Call, WhatsApp, email or visit, whichever is easiest for you."
      />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          {/* Contact details */}
          <div className="space-y-4">
            <Card>
              <CardContent className="grid gap-5 p-6">
                <a
                  href={`tel:${site.phoneHref}`}
                  className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-muted"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                    <Phone className="size-5" />
                  </span>
                  <span>
                    <span className="block text-xs text-muted-foreground">Call us</span>
                    <span className="font-semibold text-primary">{site.phone}</span>
                  </span>
                </a>

                <a
                  href={`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
                    `Hello ${site.shortName}, I have a question.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-muted"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-whatsapp/10 text-whatsapp">
                    <svg viewBox="0 0 32 32" className="size-5 fill-current" aria-hidden="true">
                      <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.2 1.7 6L4 29l8.2-1.6c1.2.6 2.5.9 3.8.9 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.8c-1.2 0-2.4-.3-3.4-.8l-.6-.3-4.4.9.9-4.3-.3-.6c-.7-1.2-1-2.5-1-3.8 0-4.9 4-8.9 8.9-8.9s8.9 4 8.9 8.9-4.1 8.9-9 8.9zm4.9-6.6c-.3-.1-1.7-.8-1.9-.9-.2-.1-.4-.1-.6.1-.2.3-.6.9-.8 1.1-.2.2-.3.2-.6.1-1.6-.8-2.6-1.4-3.7-3.2-.3-.5.3-.5.8-1.4.1-.2 0-.4 0-.5 0-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2 0 1.3.9 2.5 1 2.7.1.2 1.9 2.9 4.6 4.1 1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.2-.3-.2-.4-.3z" />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-xs text-muted-foreground">WhatsApp</span>
                    <span className="font-semibold text-primary">{site.phone}</span>
                  </span>
                </a>

                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-muted"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                    <Mail className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-muted-foreground">Email</span>
                    <span className="block truncate font-semibold text-primary">
                      {site.email}
                    </span>
                  </span>
                </a>

                <div className="flex items-center gap-4 rounded-lg p-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                    <Clock className="size-5" />
                  </span>
                  <span>
                    <span className="block text-xs text-muted-foreground">Working hours</span>
                    <span className="font-semibold text-primary">
                      Mon to Sat, 10:00 AM to 7:00 PM
                    </span>
                  </span>
                </div>

                <div className="flex items-start gap-4 rounded-lg p-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                    <MapPin className="size-5" />
                  </span>
                  <span>
                    <span className="block text-xs text-muted-foreground">Office</span>
                    <span className="font-semibold text-primary">{site.address}</span>
                    <a
                      href={site.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-sm font-medium text-primary underline underline-offset-4"
                    >
                      Open in Google Maps
                    </a>
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <Card className="overflow-hidden">
              <iframe
                title={`Map of ${site.name}`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  site.mapsQuery
                )}&z=15&output=embed`}
                className="h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Card>
          </div>

          {/* Booking form */}
          <BookingForm />
        </div>
      </section>
    </>
  );
}
