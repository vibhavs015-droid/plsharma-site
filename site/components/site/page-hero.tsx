import { cn } from "@/lib/utils";

export function PageHero({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "hero-pattern relative overflow-hidden border-b border-white/10 bg-primary text-primary-foreground sm:flex sm:min-h-[60svh] sm:items-center",
        className
      )}
    >
      {/* gold hairline accent */}
      <div
        className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-transparent via-[color:var(--accent)] to-transparent"
        aria-hidden
      />
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:py-20">
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
