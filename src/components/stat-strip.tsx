"use client";

import { useCallback, useRef } from "react";

import CountUp from "@/components/CountUp";
import { FadeIn } from "@/components/motion/fade-in";
import { usePrefersReducedMotion } from "@/components/motion/media-queries";
import { cn } from "@/lib/utils";

type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

/**
 * Resume-verified figures only. These live here rather than in site.ts because
 * they are presentation for this one strip, not shared content.
 */
const STATS: Stat[] = [
  { value: 9, suffix: "+", label: "Years in integration architecture" },
  { value: 8, label: "Certifications" },
  { value: 1, suffix: "st", label: "Of nine teams at the hackathon" },
];

const ACCENTS = [
  { rule: "bg-brand", suffix: "text-brand" },
  { rule: "bg-brand-magenta", suffix: "text-brand-magenta" },
  { rule: "bg-brand-red", suffix: "text-brand-red" },
] as const;

const IMPACT_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

function StatFigure({ stat, index }: { stat: Stat; index: number }) {
  const accent = ACCENTS[index % ACCENTS.length];
  const valueRef = useRef<HTMLSpanElement>(null);
  const ruleRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // The count landing is the only beat here: a single overshoot on the number
  // and a snap on its rule. No shake — scaling from the left edge keeps the
  // figure inside its column on any viewport.
  const handleImpact = useCallback(() => {
    if (prefersReducedMotion) return;

    valueRef.current?.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.06)", offset: 0.45 },
        { transform: "scale(1)" },
      ],
      { duration: 320, easing: IMPACT_EASING }
    );

    ruleRef.current?.animate(
      [{ transform: "scaleX(0.15)" }, { transform: "scaleX(1)" }],
      { duration: 280, easing: IMPACT_EASING }
    );
  }, [prefersReducedMotion]);

  return (
    <FadeIn
      delay={index * 0.08}
      className={cn(
        "flex flex-col-reverse gap-3",
        index > 0 && "sm:border-l sm:border-ink-line sm:pl-8"
      )}
    >
      <dt className="max-w-[24ch] text-[0.8125rem] leading-snug text-mist-2">
        {stat.label}
      </dt>
      <dd>
        <span
          ref={ruleRef}
          aria-hidden
          className={cn("mb-4 block h-0.5 w-10 origin-left", accent.rule)}
        />
        {/* tabular-nums keeps the row from reflowing as the digits tick. */}
        <span
          ref={valueRef}
          className="display-pop block origin-left text-[clamp(3rem,7.5vw,4.75rem)] text-foreground tabular-nums"
        >
          <CountUp to={stat.value} duration={1.6} onEnd={handleImpact} />
          {stat.suffix ? (
            <span className={accent.suffix}>{stat.suffix}</span>
          ) : null}
        </span>
      </dd>
    </FadeIn>
  );
}

export function StatStrip() {
  return (
    <section
      aria-labelledby="stat-strip-heading"
      className="relative isolate border-y-2 border-ink-line bg-ink-2"
    >
      <div
        aria-hidden
        className="halftone halftone-cyan absolute inset-0 -z-10 [--halftone-opacity:0.2] [--halftone-size:11px]"
      />

      <div className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-10 lg:py-16">
        <div className="flex items-center gap-3">
          <span aria-hidden className="plate-mark text-brand" />
          <h2
            id="stat-strip-heading"
            className="font-display text-xs tracking-[0.3em] text-mist-2 uppercase"
          >
            By the numbers
          </h2>
          <span
            aria-hidden
            className="h-px flex-1 bg-gradient-to-r from-ink-line to-transparent"
          />
        </div>

        {/* FadeIn is the per-item wrapper div itself: a dl allows one div around
            each dt/dd pair, not two. Reversing it visually keeps the number on
            top while the markup stays in the order the spec wants. */}
        <dl className="mt-9 grid gap-10 sm:grid-cols-3 sm:gap-0">
          {STATS.map((stat, index) => (
            <StatFigure key={stat.label} stat={stat} index={index} />
          ))}
        </dl>
      </div>
    </section>
  );
}
