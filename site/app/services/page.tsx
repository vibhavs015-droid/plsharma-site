import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { FeatureIcon } from "@/components/site/feature-icon";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { site, services } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Income tax filing, GST registration & compliance, audits, business registration, tax planning, TDS and bookkeeping — by P.L. Sharma And Company, Jaisalmer.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="Comprehensive tax & compliance services for individuals and businesses, all under one roof."
      />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={(i % 2) * 0.08}>
              <Card className="card-lift group relative h-full border-t-2 border-t-transparent hover:border-t-[color:var(--accent)]">
              <CardHeader>
                <div className="mb-3 flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-lg bg-secondary text-primary transition-colors group-hover:bg-[color:var(--accent)] group-hover:text-accent-foreground">
                    <FeatureIcon name={service.icon} className="size-5.5" />
                  </span>
                </div>
                <CardTitle className="text-xl text-primary">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[color:var(--gold-ink)]" />
                      {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            </Reveal>
          ))}
        </div>

        {/* Note + CTA */}
        <div className="mt-12 rounded-xl border bg-muted/50 p-8 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-primary">
            Not sure which service you need?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            Book a consultation: we&apos;ll understand your situation and
            tell you exactly what is required, with the fee confirmed upfront.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-11 px-7">
              <Link href="/book">
                Book an Appointment
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-11 px-7">
              <a href={`tel:${site.phoneHref}`}>Call {site.phone}</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
