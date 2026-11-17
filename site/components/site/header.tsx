"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Mail, Menu, Phone } from "lucide-react";
import { LogoMark } from "@/components/site/logo-mark";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { site, visibleNavLinks } from "@/lib/site-config";
import { cn } from "@/lib/utils";

function Logo({ onDark = true }: { onDark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <LogoMark onDark={onDark} className="size-10 shrink-0" />
      <span className="leading-tight">
        <span
          className={cn(
            "block font-heading text-sm font-bold tracking-wide sm:text-[15px]",
            onDark ? "text-white" : "text-primary"
          )}
        >
          {site.name}
        </span>
        <span
          className={cn(
            "block text-[11px] font-medium",
            onDark ? "text-white/60" : "text-muted-foreground"
          )}
        >
          {site.tagline}
        </span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-md shadow-primary/20">
      {/* Top contact strip */}
      <div className="hidden border-b border-white/10 md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-1.5 text-xs text-white/70">
          <p className="tracking-wide">{site.address}</p>
          <div className="flex items-center gap-5">
            <a
              href={`tel:${site.phoneHref}`}
              className="flex items-center gap-1.5 transition-[color,background-color,border-color] hover:text-[color:var(--accent)]"
            >
              <Phone className="size-3.5" aria-hidden />
              Call the office ·{" "}
              <span className="phone-number">{site.phone}</span>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-1.5 transition-[color,background-color,border-color] hover:text-[color:var(--accent)]"
            >
              <Mail className="size-3.5" aria-hidden />
              {site.email}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {visibleNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative py-1 text-sm font-medium tracking-wide transition-[color,background-color,border-color] whitespace-nowrap",
                pathname === link.href
                  ? "text-[color:var(--accent)] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-[color:var(--accent)]"
                  : "text-white/75 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[color:var(--accent)] after:transition-transform hover:text-white hover:after:scale-x-100"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            className="hidden h-10 rounded-full bg-[color:var(--accent)] px-6 text-sm font-semibold text-accent-foreground shadow-sm transition-[background-color,box-shadow] hover:bg-[color:var(--accent)]/90 hover:shadow-md sm:inline-flex"
          >
            <Link href="/book">Book a consultation</Link>
          </Button>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="size-10 border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Menu className="size-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 border-white/10 bg-primary text-primary-foreground"
            >
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {visibleNavLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "rounded-md px-3 py-2.5 text-sm font-medium transition-[color,background-color,border-color]",
                        pathname === link.href
                          ? "bg-white/10 text-[color:var(--accent)]"
                          : "text-white/75 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link href="/book" className="mt-3">
                    <Button className="h-11 w-full rounded-full bg-[color:var(--accent)] text-base font-semibold text-accent-foreground">
                      Book a consultation
                    </Button>
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
