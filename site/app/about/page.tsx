import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Briefcase } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { site, team } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description: `About ${site.name} — our story, experience and team.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={`About ${site.name}`}
        subtitle="A practice built on trust, accuracy and personal attention."
      />

      {/* Story */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <h2 className="font-heading text-4xl font-bold tracking-tight text-primary sm:text-[2.75rem]">
              Our Story
            </h2>
            {/* PLACEHOLDER — replace with the real story */}
            <p>
              {site.name} was founded in {site.establishedYear} in Jaisalmer,
              Rajasthan with a simple belief: tax and compliance work should
              feel <strong className="font-medium text-ink">simple and safe</strong> for the people who depend on it.
              Over the years, the practice has grown from a one-man
              consultancy into a full-service firm, serving salaried
              individuals, shopkeepers, professionals, startups and
              established businesses across the region.
            </p>
            <p>
              We handle income tax returns, GST registration and compliance,
              tax audits, TDS, bookkeeping and business registration, but
              what clients remember us for is the <strong className="font-medium text-ink">personal attention</strong>:
              you always speak directly with the consultant handling your
              case, in plain language, with the fee agreed before any work
              begins.
            </p>
            <div className="flex gap-3 rounded-lg border bg-card p-4">
              <Briefcase className="size-5 shrink-0 text-primary" />
              <div>
                <p className="font-semibold text-primary">Local Experience</p>
                <p className="text-sm">
                  Deep familiarity with the businesses of Jaisalmer &amp;
                  western Rajasthan, from trade and hospitality to mining
                  and contracting.
                </p>
              </div>
            </div>
          </div>

          {/* Founder photo card */}
          <Card className="overflow-hidden border-[color:var(--accent)]/30 shadow-lg shadow-primary/10">
            <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
              <div className="relative size-44 overflow-hidden rounded-full border-4 border-card ring-2 ring-[color:var(--accent)]/60">
                <Image
                  src="/images/father.jpg"
                  alt={`${team[0].name}, Founder of ${site.name}`}
                  fill
                  sizes="176px"
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div>
                <h3 className="font-heading text-2xl font-bold text-primary">
                  {team[0].name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Founder & Principal Consultant
                </p>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {team[0].bio}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Team */}
      <section className="border-t bg-muted/50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-4xl font-bold tracking-tight text-primary sm:text-[2.75rem]">
              Our Team
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              A small, dedicated team, so every client always knows exactly
              who is handling their file.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <Card key={member.name} className="text-center">
                <CardContent className="flex flex-col items-center gap-3 p-6">
                  {/* PHOTO PLACEHOLDER — put team-N.jpg in public/images/ */}
                  {index === 0 ? (
                    // Founder — real photo already available
                    <div className="relative size-20 overflow-hidden rounded-full ring-2 ring-[color:var(--accent)]/50">
                      <Image
                        src="/images/father.jpg"
                        alt={`${member.name} at ${site.name}`}
                        fill
                        sizes="80px"
                        className="object-cover object-top"
                      />
                    </div>
                  ) : (
                    <Avatar className="size-20">
                      <AvatarFallback className="bg-secondary text-lg font-bold text-primary">
                        {member.name
                          .split(" ")
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <h3 className="text-xl font-semibold text-primary">{member.name}</h3>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="hero-pattern relative overflow-hidden rounded-xl bg-primary px-6 py-14 text-center text-primary-foreground sm:py-16">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-primary-foreground sm:text-[2.25rem]">
            Let&apos;s discuss your taxes
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/75 sm:text-base">
            The first phone consultation is free, and there is no obligation.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 h-12 rounded-full bg-[color:var(--accent)] px-8 text-base font-semibold text-accent-foreground shadow-lg shadow-black/20 transition-[background-color,box-shadow] hover:bg-[color:var(--accent)]/90 hover:shadow-xl"
          >
            <Link href="/book">Book an Appointment</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
