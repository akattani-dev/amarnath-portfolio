import { ArrowUpRight } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/section-heading";
import { contact, socials } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Email first, then the socials in their authored order. Nothing here is
 * content of its own — every row is a link that already existed, restated as
 * one uniform control instead of a button plus a list.
 */
const CHANNELS = [
  { label: "Email", value: contact.email, href: `mailto:${contact.email}`, external: false },
  ...socials.map((social) => ({
    label: social.label,
    value: social.handle,
    href: social.href,
    external: true,
  })),
];

/** Cyan leads, because email is the one control that matters most. */
const CHANNEL_ACCENTS = [
  "text-brand",
  "text-brand-magenta",
  "text-sage",
  "text-brand-red",
] as const;

function Channel({
  channel,
  index,
}: {
  channel: (typeof CHANNELS)[number];
  index: number;
}) {
  const accent = CHANNEL_ACCENTS[index % CHANNEL_ACCENTS.length];

  return (
    <li>
      <a
        href={channel.href}
        {...(channel.external
          ? { target: "_blank", rel: "noreferrer noopener" }
          : {})}
        className="group flex flex-col gap-1.5 border-b border-ink-line py-4 focus-visible:outline-offset-2 sm:flex-row sm:items-center sm:gap-6 sm:py-5"
      >
        <span className="flex items-center gap-3">
          <span
            aria-hidden
            className={cn("font-display text-[0.7rem] tabular-nums", accent)}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span aria-hidden className={cn("plate-mark", accent)} />
          <span className="chromatic font-display text-[clamp(1.15rem,2.8vw,1.7rem)] leading-none tracking-[0.05em] text-mist uppercase">
            {channel.label}
          </span>
        </span>

        <span aria-hidden className="hidden h-px flex-1 bg-ink-line sm:block" />

        {/* Indented on mobile so the value hangs under the label rather than
            under the marker rail. */}
        <span className="flex items-center gap-2 pl-[2.1rem] text-[0.8125rem] text-mist-2 transition-colors duration-150 group-hover:text-mist sm:pl-0 sm:text-sm">
          {channel.value}
          <ArrowUpRight className={cn("size-4 shrink-0", accent)} aria-hidden />
        </span>
      </a>
    </li>
  );
}

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20">
      <FadeIn>
        <SectionHeading index="06" label="Contact" title="Let's build something" />
      </FadeIn>

      <FadeIn delay={0.08} className="mt-10">
        <div className="misreg-frame misreg-frame-lg relative bg-ink-2 p-7 sm:p-9 lg:p-12">
          <div
            aria-hidden
            className="halftone halftone-magenta absolute inset-0 [--halftone-opacity:0.16]"
          />

          {/* Speech-bubble tail: a rotated square carrying only the two edges
              that continue the panel border, filled with the panel colour so
              it knocks a notch out of the bottom rule. */}
          <span
            aria-hidden
            className="absolute -bottom-[9px] left-9 size-4 rotate-45 border-r-2 border-b-2 border-ink-line bg-ink-2"
          />

          <div className="relative">
            <p className="max-w-[46ch] text-[1.0625rem] leading-[1.75] text-foreground/85">
              {contact.lead}
            </p>

            <ul className="mt-9 border-t border-ink-line">
              {CHANNELS.map((channel, index) => (
                <Channel key={channel.href} channel={channel} index={index} />
              ))}
            </ul>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
