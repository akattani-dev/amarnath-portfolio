import CountUp from "@/components/CountUp";
import { FadeIn } from "@/components/motion/fade-in";

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

export function StatStrip() {
  return (
    <section
      aria-labelledby="stat-strip-heading"
      className="mx-auto w-full max-w-6xl px-6 py-14 lg:px-10 lg:py-16"
    >
      <h2 id="stat-strip-heading" className="sr-only">
        By the numbers
      </h2>

      {/* FadeIn is the per-item wrapper div itself: a dl allows one div around
          each dt/dd pair, not two. Reversing it visually keeps the number on
          top while the markup stays in the order the spec wants. */}
      <dl className="grid gap-9 sm:grid-cols-3 sm:gap-6">
        {STATS.map((stat, index) => (
          <FadeIn
            key={stat.label}
            delay={index * 0.08}
            className="flex flex-col-reverse gap-2"
          >
            <dt className="max-w-[24ch] text-[0.8125rem] leading-snug text-muted-foreground">
              {stat.label}
            </dt>
            {/* tabular-nums keeps the row from reflowing as the digits tick. */}
            <dd className="font-display text-[2.75rem] leading-none font-semibold tracking-[-0.03em] text-foreground tabular-nums">
              <CountUp to={stat.value} duration={1.6} />
              {stat.suffix ? (
                <span className="text-brand">{stat.suffix}</span>
              ) : null}
            </dd>
          </FadeIn>
        ))}
      </dl>
    </section>
  );
}
