"use client";

import { Fragment, useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { FileDown, Menu, Search } from "lucide-react";

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
import type { PostMeta } from "@/lib/blog";

// cmdk's JS only loads once the palette is actually opened, not on every
// page load.
const CommandPalette = dynamic(() =>
  import("@/components/command-palette").then((mod) => mod.CommandPalette)
);

const MONOGRAM = site.name
  .split(" ")
  .map((word) => word[0])
  .join("");

/** Compact plates: the full 3px offset is too heavy inside a 64px bar. */
const CHIP_OFFSET = { "--tab-x": "2px", "--tab-y": "2px" } as CSSProperties;

/** Hash links point back into the home page, so only routes can be current. */
const isRoute = (href: string) => !href.includes("#");

export function SiteHeader({ posts }: { posts: PostMeta[] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  // Stays true once set, so the palette (and its close animation) stays
  // mounted after first use instead of unmounting mid-close.
  const [paletteLoaded, setPaletteLoaded] = useState(false);

  // Above the fold there is no bar, no plate edge and no blur, so the hero's
  // halftone field runs uninterrupted to the top of the viewport.
  const overHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openPalette = () => {
    setPaletteLoaded(true);
    setPaletteOpen(true);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setPaletteOpen((value) => {
          if (!value) setPaletteLoaded(true);
          return !value;
        });
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const currentHref = (href: string) =>
    isRoute(href) && (pathname === href || pathname.startsWith(`${href}/`))
      ? "page"
      : undefined;

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-colors duration-200",
        overHero ? "bg-transparent" : "bg-ink/85 backdrop-blur-md"
      )}
    >
      {/* The bar's bottom edge is a misregistered plate rather than a border. */}
      <span
        aria-hidden
        className={cn(
          "plate-edge absolute inset-x-0 bottom-0 transition-opacity duration-200",
          overHero ? "opacity-0" : "opacity-60"
        )}
      />

      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6 lg:px-10">
        <Link
          href="/"
          aria-label={`${site.name} — home`}
          className="group flex items-center gap-3"
        >
          <span
            aria-hidden
            className="inline-flex size-8 items-center justify-center border-2 border-brand font-display text-sm font-semibold tracking-[0.06em] text-brand transition-colors duration-150 group-hover:border-brand-magenta group-hover:text-brand-magenta"
          >
            {MONOGRAM}
          </span>
          <span className="chromatic hidden font-display text-[0.82rem] tracking-[0.18em] text-mist uppercase lg:inline">
            {site.name}
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <nav aria-label="Primary" className="hidden items-center md:flex">
            {nav.map((item, index) => (
              <Fragment key={item.href}>
                {index > 0 && (
                  <span
                    aria-hidden
                    className="mx-2 hidden w-5 border-t border-dotted border-mist-2/40 lg:block"
                  />
                )}
                <Link
                  href={item.href}
                  aria-current={currentHref(item.href)}
                  className="comic-slash px-2 py-1 font-display text-[0.76rem] tracking-[0.15em] text-mist-2 uppercase transition-colors duration-150 hover:text-mist aria-[current=page]:text-brand"
                >
                  {item.label}
                </Link>
              </Fragment>
            ))}
          </nav>

          <button
            type="button"
            aria-label="Open command palette"
            onClick={openPalette}
            style={CHIP_OFFSET}
            className="comic-tab ml-2 hidden gap-1.5 px-2.5 py-1.5 text-mist-2 sm:inline-flex"
          >
            <Search className="size-3.5" />
            {/* Oswald has no ⌘ glyph, so the shortcut stays on the body face. */}
            <kbd className="font-sans text-[0.72rem] tracking-[0.04em]">⌘K</kbd>
          </button>

          <a
            href={site.resumeUrl}
            download
            aria-label="Download résumé"
            style={CHIP_OFFSET}
            className="comic-tab comic-tab-magenta size-9 p-0 text-mist-2"
          >
            <FileDown className="size-[1.05rem]" />
          </a>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Open menu"
              style={CHIP_OFFSET}
              className="comic-tab size-9 p-0 text-mist md:hidden"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="gap-0 border-l-2 border-ink-line bg-ink p-0"
            >
              <SheetHeader className="border-b-2 border-ink-line px-5 py-4 pr-14">
                <SheetTitle className="font-display text-[0.78rem] tracking-[0.2em] text-mist uppercase">
                  {site.name}
                </SheetTitle>
              </SheetHeader>

              <nav aria-label="Mobile" className="flex flex-col px-5">
                {nav.map((item, index) => {
                  const current = currentHref(item.href);

                  return (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={current}
                        className="group flex items-baseline gap-4 border-b border-ink-line/70 py-4 focus-visible:outline-offset-2"
                      >
                        <span
                          aria-hidden
                          className="font-display text-[0.62rem] tracking-[0.22em] text-brand"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "comic-slash font-display text-xl tracking-[0.05em] uppercase transition-colors duration-150",
                            current ? "text-brand" : "text-mist"
                          )}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>

              <div className="mt-auto flex flex-wrap gap-2 p-5">
                {socials.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    style={CHIP_OFFSET}
                    className="comic-tab px-2.5 py-1.5 text-[0.7rem] text-mist-2"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {paletteLoaded && (
        <CommandPalette posts={posts} open={paletteOpen} onOpenChange={setPaletteOpen} />
      )}
    </header>
  );
}
