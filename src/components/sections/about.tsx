import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { about } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * The skill wall is a regrouping of `about.certifications`, not a second copy
 * of the list: each track claims the certifications matching its pattern, and
 * the catch-all at the end means a new entry in site.ts lands on the wall
 * rather than disappearing. The patterns are mutually exclusive, so this order
 * is only the display order.
 */
const CERTIFICATION_TRACKS = [
  { label: "MuleSoft", claims: /^MuleSoft(?!.*Architect)/i },
  { label: "Architecture", claims: /^MuleSoft.*Architect/i },
  { label: "AI", claims: /\bAI\b/ },
  { label: "Cloud", claims: /Azure|AWS/i },
  { label: "API", claims: /^API\b/i },
  { label: "Other", claims: /./ },
] as const;

/** Cycled so no two adjacent tracks print the same plate colour. */
const TRACK_MARKS = [
  "text-brand",
  "text-brand-magenta",
  "text-brand-red",
  "text-sage",
] as const;

/**
 * Decorative, and `aria-hidden` because of it: every term is already in the
 * About copy, the focus chips, the project tags or the platform strip.
 */
const KEYWORDS = [
  "MuleSoft",
  "Salesforce",
  "SAP",
  "ServiceNow",
  "Azure",
  "AWS",
  "Kafka",
  "MCP",
  "A2A",
  "Agentic AI",
];

const BADGE =
  "h-auto justify-start rounded-none border-ink-line bg-ink-3/70 px-2 py-1 text-left text-[0.7rem] leading-snug font-normal whitespace-normal text-mist-2";

function certificationWall(certifications: readonly string[]) {
  return CERTIFICATION_TRACKS.map((track) => ({
    label: track.label,
    certifications: certifications.filter(
      (certification) =>
        CERTIFICATION_TRACKS.find((candidate) =>
          candidate.claims.test(certification)
        ) === track
    ),
  })).filter((track) => track.certifications.length > 0);
}

function SkillWall() {
  const tracks = certificationWall(about.certifications);

  return (
    <div className="misreg-frame relative bg-ink-2 p-6 [--misreg-x:5px] [--misreg-y:5px] lg:p-7">
      <div
        aria-hidden
        className="halftone halftone-cyan absolute inset-0 [--halftone-opacity:0.16]"
      />

      <div className="relative">
        <div className="flex items-baseline gap-3">
          <h3 className="font-display text-xs tracking-[0.28em] text-mist-2 uppercase">
            Certifications
          </h3>
          <span aria-hidden className="h-px flex-1 bg-ink-line" />
          <span className="font-display text-sm leading-none font-semibold text-brand tabular-nums">
            {String(about.certifications.length).padStart(2, "0")}
          </span>
        </div>

        <div className="mt-6 space-y-5">
          {tracks.map((track, index) => (
            <div key={track.label}>
              <div className="flex items-center gap-2">
                <span
                  aria-hidden
                  className={cn(
                    "plate-mark plate-mark-sm",
                    TRACK_MARKS[index % TRACK_MARKS.length]
                  )}
                />
                <h4 className="font-display text-[0.7rem] tracking-[0.22em] text-foreground/75 uppercase">
                  {track.label}
                </h4>
                <span aria-hidden className="h-px flex-1 bg-ink-line/70" />
              </div>

              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {track.certifications.map((certification) => (
                  <li key={certification}>
                    <Badge variant="outline" className={BADGE}>
                      {certification}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * A single clipped band rather than absolutely placed labels: it reads as the
 * same floating-keyword texture without ever landing on top of the copy.
 */
function KeywordBand() {
  return (
    <div
      aria-hidden
      className="pointer-events-none mb-8 hidden select-none overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)] sm:block"
    >
      <p className="display-outline flex w-max items-center gap-4 text-[clamp(1.4rem,3.4vw,2.4rem)] leading-none whitespace-nowrap opacity-30 [--outline-w:1px]">
        {KEYWORDS.map((keyword) => (
          <span key={keyword} className="flex items-center gap-4">
            {keyword}
            <span className="size-1 shrink-0 rotate-45 bg-brand/60" />
          </span>
        ))}
      </p>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="scroll-mt-24">
      <FadeIn>
        <SectionHeading index="01" label="About" title={about.title} />
      </FadeIn>

      <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-14">
        <FadeIn delay={0.06} className="max-w-[54ch]">
          <div className="relative pl-5">
            {/* Rail that starts on the accent and drops out of it. Kept out of
                the `space-y` list, whose margin would shorten it. */}
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 w-0.5 bg-gradient-to-b from-brand via-ink-line to-ink-line"
            />

            <div className="space-y-5">
              {about.paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className={cn(
                    "leading-[1.75] text-foreground/80",
                    index === 0 && "text-[1.0625rem] text-foreground/90"
                  )}
                >
                  {paragraph}
                </p>
              ))}

              <p className="leading-[1.75] text-foreground/80">
                {about.writingNote.prefix}
                <Link
                  href="/blog"
                  className="comic-slash font-medium text-brand"
                >
                  {about.writingNote.linkLabel}
                </Link>
                {about.writingNote.suffix}
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.12} className="self-start">
          <SkillWall />
        </FadeIn>
      </div>

      <FadeIn delay={0.16} className="mt-12">
        <KeywordBand />

        <div className="border-t border-ink-line pt-6">
          <div className="flex items-center gap-3">
            <h3 className="font-display text-xs tracking-[0.28em] text-mist-2 uppercase">
              Focus &amp; community
            </h3>
            <span
              aria-hidden
              className="h-px flex-1 bg-gradient-to-r from-ink-line to-transparent"
            />
          </div>

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {about.chips.map((chip) => (
              <li key={chip}>
                <Badge variant="outline" className={BADGE}>
                  {chip}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </FadeIn>
    </section>
  );
}
