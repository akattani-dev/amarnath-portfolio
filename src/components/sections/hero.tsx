import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

import { HeroGhostDiagram } from "@/components/hero-ghost-diagram";
import { hero, site } from "@/content/site";
import { cn } from "@/lib/utils";

const PORTRAIT_SIZES = "(min-width: 1024px) 430px, (min-width: 640px) 380px, 78vw";

/**
 * Decorative print marks around the portrait — the stack, not a nav.
 *
 * The narrow-viewport ones hide with `max-*:hidden` rather than
 * `hidden sm:inline-flex`. Two reasons, both load-bearing: `cn()` runs
 * tailwind-merge, which drops the base `inline-flex` as soon as a bare `hidden`
 * follows it, and a label whose `display` is `none` in the base cascade only
 * gains its box once a media query matches — which is enough to leave its
 * entrance animation unstarted and the label stranded at `opacity: 0`. Keeping
 * `inline-flex` unconditional and subtracting it below a breakpoint avoids both.
 */
const FLOATING_LABELS = [
  { text: "MCP", position: "top-[13%] -left-2 rotate-[-4deg]", tone: "brand", delay: 300 },
  {
    text: "A2A",
    position: "top-[30%] -right-2 rotate-[3deg] max-sm:hidden",
    tone: "magenta",
    delay: 340,
  },
  {
    text: "API",
    position: "bottom-[30%] -left-2 rotate-[2deg] max-sm:hidden",
    tone: "sage",
    delay: 380,
  },
  { text: "EVENTS", position: "bottom-[15%] -right-3 rotate-[-3deg]", tone: "brand", delay: 420 },
  { text: "AGENTS", position: "-bottom-3 left-[9%] rotate-[-2deg]", tone: "magenta", delay: 460 },
  {
    text: "INTEGRATION",
    position: "-top-3 right-[7%] rotate-[2deg] max-lg:hidden",
    tone: "brand",
    delay: 500,
  },
] as const;

const LABEL_TONES = {
  brand: "border-brand/45 text-brand",
  magenta: "border-brand-magenta/45 text-brand-magenta",
  sage: "border-sage/60 text-sage",
} as const;

/** Cyan lead, then the supporting plates. */
const CTA_TONES = ["comic-tab-solid", "comic-tab-magenta", ""] as const;

export function Hero() {
  const nameLines = site.name.split(" ");
  const roleParts = hero.headline.split("·").map((part) => part.trim());

  return (
    <section
      className="halftone halftone-cyan relative isolate overflow-hidden bg-ink"
      style={
        {
          "--halftone-opacity": "0.15",
          "--halftone-size": "11px",
          "--halftone-dot": "1.5px",
          "--halftone-mask":
            "radial-gradient(ellipse 60% 65% at 74% 44%, #000 8%, transparent 72%)",
        } as CSSProperties
      }
    >
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 pt-28 pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,430px)] lg:gap-16 lg:px-10 lg:pt-36 lg:pb-24">
        <div>
          <p className="hero-rise flex items-center gap-3 text-[0.7rem] tracking-[0.3em] text-mist-2 uppercase">
            <span aria-hidden className="size-2 bg-brand" />
            {hero.eyebrow}
          </p>

          <h1 className="mt-6">
            {nameLines.map((line, index) => (
              <span
                key={line}
                className={cn(
                  "hero-rise block text-[clamp(3rem,10vw,6.25rem)]",
                  index % 2 === 0
                    ? "display-pop text-mist"
                    : "display-outline leading-[0.88] tracking-[0.005em]"
                )}
                style={
                  {
                    "--rise-delay": `${60 + index * 70}ms`,
                    ...(index % 2 === 1 && {
                      "--outline-w": "2px",
                      "--outline-c": "color-mix(in oklab, var(--mist), transparent 32%)",
                    }),
                  } as CSSProperties
                }
              >
                {/* The name is split across block spans, so the accessible
                    name would run the words together without this separator.
                    A trailing space collapses at the end of a line box, so it
                    costs nothing visually. */}
                {index < nameLines.length - 1 ? `${line} ` : line}
              </span>
            ))}
          </h1>

          <ul
            className="hero-rise mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 border-l-2 border-brand pl-4"
            style={{ "--rise-delay": "200ms" } as CSSProperties}
          >
            {roleParts.map((part, index) => (
              <li
                key={part}
                className="flex items-center gap-3 font-display text-[0.78rem] tracking-[0.17em] text-mist uppercase"
              >
                {index > 0 && (
                  <span
                    aria-hidden
                    className={cn(
                      "size-1.5 rotate-45",
                      index % 2 === 1 ? "bg-brand-magenta" : "bg-brand"
                    )}
                  />
                )}
                {part}
              </li>
            ))}
          </ul>

          <p
            className="hero-rise mt-6 max-w-[40ch] text-[1.02rem] leading-relaxed text-mist-2"
            style={{ "--rise-delay": "250ms" } as CSSProperties}
          >
            {hero.supporting}
          </p>

          <div
            className="hero-rise mt-9 flex flex-wrap items-center gap-4"
            style={{ "--rise-delay": "300ms" } as CSSProperties}
          >
            {hero.ctas.map((cta, index) => (
              <Link key={cta.href} href={cta.href} className={cn("comic-tab", CTA_TONES[index])}>
                {cta.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[430px] lg:mr-0 lg:ml-auto">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-10 -z-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 40%, color-mix(in oklab, var(--sage), transparent 74%), transparent 62%)",
            }}
          />

          <HeroGhostDiagram className="pointer-events-none absolute top-1/2 left-1/2 -z-10 w-[150%] max-w-none -translate-x-1/2 -translate-y-1/2 text-brand/25" />

          <div
            className="misreg-frame hero-plate relative overflow-hidden"
            style={
              {
                "--misreg-x": "9px",
                "--misreg-y": "9px",
                "--misreg-bg": "var(--ink-2)",
                "--rise-delay": "140ms",
              } as CSSProperties
            }
          >
            <Image
              src="/images/hero-spiderverse.jpg"
              alt={`Illustrated portrait of ${site.name}`}
              width={1024}
              height={1024}
              preload
              sizes={PORTRAIT_SIZES}
              className="block w-full"
            />
          </div>

          <div aria-hidden className="pointer-events-none absolute inset-0">
            {FLOATING_LABELS.map((label) => (
              <span
                key={label.text}
                className={cn(
                  "hero-fade absolute inline-flex border bg-ink/85 px-2 py-1 font-display text-[0.6rem] tracking-[0.22em] uppercase",
                  LABEL_TONES[label.tone],
                  label.position
                )}
                style={{ "--rise-delay": `${label.delay}ms` } as CSSProperties}
              >
                {label.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
