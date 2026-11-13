import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { FeatureIcon } from "@/components/site/feature-icon";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { site, whyChooseUs, site as config } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Why Choose Us",
  description:
    "25+ years of experience, personal attention, transparent fees, on-time filing and complete confidentiality — why clients trust P.L. Sharma And Company.",
  alternates: { canonical: "/why-choose-us" },
};

export default function WhyChooseUsPage() {
  return (
    <>
      <PageHero
        title="Why Choose Us"
        subtitle="Six reasons clients have stayed with us for decades."
      />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="sr-only">Six reasons clients stay with us</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.06}>
              <div className="card-lift relative h-full rounded-lg border bg-card p-6 pl-7">
                <span
                  className="absolute top-5 bottom-5 left-0 w-[3px] rounded-full bg-[color:var(--accent)]"
                  aria-hidden
                />
                <span className="mb-4 flex size-11 items-center justify-center rounded-lg bg-secondary text-primary">
                  <FeatureIcon name={item.icon} className="size-5" />
                </span>
                <h3 className="text-xl font-semibold text-primary">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Numbers strip */}
        <div className="hero-pattern mt-14 grid grid-cols-2 gap-6 rounded-xl bg-primary p-9 text-center text-primary-foreground sm:grid-cols-4">
          {config.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.06}>
              <p className="font-heading text-3xl font-bold text-[color:var(--accent)] sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1.5 text-sm font-medium text-white/70 sm:text-[15px]">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 rounded-xl border bg-muted/50 p-8 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-primary">
            Experience the difference yourself.
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            Your first phone consultation is always free. Tell us what you
            need, we&apos;ll tell you honestly how we can help.
          </p>
          <Button asChild size="lg" className="mt-6 h-11 px-7">
            <Link href="/book">
              Book an Appointment
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
