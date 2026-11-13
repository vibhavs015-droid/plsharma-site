import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { BookingForm } from "@/components/site/booking-form";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Book a tax consultation with P.L. Sharma And Company — send a booking request via WhatsApp, or call +91 98297 71396. Open Mon–Sat, 10 AM – 7 PM.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <>
      <PageHero
        title="Book an Appointment"
        subtitle="Tell us what you need and when suits you, and we'll confirm your slot."
      />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <BookingForm />

          <div className="space-y-4">
            {/* How it works */}
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-bold text-primary">
                  How booking works
                </h2>
                <ol className="space-y-4">
                  {[
                    "Fill the form and press Send: WhatsApp opens with your request ready.",
                    "Press Send in WhatsApp and it reaches us instantly.",
                    "We reply and confirm your exact appointment slot.",
                  ].map((step, i) => (
                    <li key={step} className="flex gap-3">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                        {i + 1}
                      </span>
                      <p className="pt-0.5 text-sm text-muted-foreground">{step}</p>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {/* Quick contact */}
            <Card>
              <CardContent className="grid gap-4 p-6">
                <h2 className="text-xl font-bold text-primary">
                  Prefer to talk first?
                </h2>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="flex items-center gap-3 text-sm font-semibold text-primary hover:underline"
                >
                  <Phone className="size-4" /> {site.phone}
                </a>
                <p className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Clock className="size-4 shrink-0" /> Mon to Sat, 10:00 AM to 7:00 PM
                </p>
                <p className="flex items-start gap-3 text-sm text-muted-foreground">
                  <MapPin className="mt-0.5 size-4 shrink-0" /> {site.address}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
