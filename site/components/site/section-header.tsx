import { cn } from "@/lib/utils";
import { Reveal } from "@/components/site/reveal";

/**
 * Section heading: serif title + optional description. Centered by
 * default, left-aligned variant available.
 */
export function SectionHeader({
  title,
  description,
  align = "center",
  className,
}: {
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "mb-10",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      <h2
        className={cn(
          "font-heading text-4xl font-bold tracking-tight text-primary sm:text-[2.75rem]",
          align === "left" && "text-left"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
