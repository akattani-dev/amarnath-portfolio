"use client";

import { useState } from "react";

import LogoLoop, { type LogoItem } from "@/components/LogoLoop";
import { cn } from "@/lib/utils";

type Platform = {
  name: string;
  /**
   * Simple Icons slug. Most enterprise vendors have had their marks pulled
   * from Simple Icons over trademark, so this is absent far more often than
   * not and the wordmark carries the item on its own.
   */
  slug?: string;
};

const PLATFORMS: Platform[] = [
  { name: "MuleSoft" },
  { name: "Salesforce" },
  { name: "Anypoint Platform" },
  { name: "AWS" },
  { name: "Azure" },
  { name: "Kafka", slug: "apachekafka" },
];

/**
 * The muted-text token. A mark has to hold up against the near-black canvas
 * and against the chip's own dark fill, and this is the value the rest of the
 * secondary type on the page already uses.
 */
const MARK_COLOR = "98a1af";

/**
 * `.comic-tab` sets its hover colour through a custom property, which the
 * `text-mist-2` utility below outranks — so each accent spells the hover
 * colour out as a utility of its own.
 */
const ACCENTS = [
  "hover:text-brand",
  "comic-tab-magenta hover:text-brand-magenta",
] as const;

function PlatformMark({
  platform,
  accent,
}: {
  platform: Platform;
  accent: string;
}) {
  const [markFailed, setMarkFailed] = useState(false);
  const showMark = Boolean(platform.slug) && !markFailed;

  return (
    // The padded wrapper is load-bearing: LogoLoop's track is overflow-x-hidden,
    // which resolves the block axis to `auto`, so an offset plate hanging past
    // the chip would be clipped (and could raise a scrollbar) without it.
    <span className="inline-flex p-1">
      <span
        className={cn(
          "comic-tab border-ink-line bg-ink-2 px-3.5 py-2.5 text-[0.72rem] whitespace-nowrap text-mist-2 [--tab-x:3px] [--tab-y:3px]",
          accent
        )}
      >
        {showMark && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`https://cdn.simpleicons.org/${platform.slug}/${MARK_COLOR}`}
            alt=""
            width={16}
            height={16}
            loading="lazy"
            decoding="async"
            draggable={false}
            onError={() => setMarkFailed(true)}
            className="size-4 shrink-0"
          />
        )}
        {platform.name}
      </span>
    </span>
  );
}

const LOGOS: LogoItem[] = PLATFORMS.map((platform, index) => ({
  node: (
    <PlatformMark
      platform={platform}
      accent={ACCENTS[index % ACCENTS.length]}
    />
  ),
  ariaLabel: platform.name,
}));

export function PlatformStrip() {
  return (
    // Deliberately unnamed: LogoLoop renders its own labelled region, and
    // naming this too would nest two region landmarks. No top border either —
    // the stat strip above closes itself with one.
    <section className="border-b border-ink-line bg-ink py-8">
      <LogoLoop
        logos={LOGOS}
        speed={34}
        direction="left"
        logoHeight={20}
        // Wide enough that a chip's offset plate never touches the next chip.
        gap={28}
        pauseOnHover
        fadeOut
        fadeOutColor="var(--ink)"
        ariaLabel="Platforms I work with"
      />
    </section>
  );
}
