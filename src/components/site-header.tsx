"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { nav, site, socials } from "@/content/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const overHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-colors duration-300",
        overHero
          ? "bg-transparent"
          : "border-b border-border/70 bg-mist/85 backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 lg:px-10">
        <Link
          href="/"
          className={cn(
            "font-display text-base tracking-tight transition-colors",
            overHero
              ? "text-mist hover:text-brand-bright"
              : "text-ink hover:text-brand"
          )}
        >
          {site.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm transition-colors",
                overHero
                  ? "text-mist/75 hover:text-mist"
                  : "text-muted-foreground hover:text-ink"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label="Open menu"
            className={cn(
              "inline-flex size-9 items-center justify-center rounded-md transition-colors md:hidden",
              overHero
                ? "text-mist hover:bg-white/10"
                : "text-ink hover:bg-mist-2"
            )}
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="right" className="bg-mist">
            <SheetHeader>
              <SheetTitle className="font-display text-ink">{site.name}</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {nav.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    className="border-b border-border/60 py-3 font-display text-lg text-ink transition-colors hover:text-brand"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
            <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 p-4 text-sm text-muted-foreground">
              {socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition-colors hover:text-brand"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
