"use client";

import { useState } from "react";

import LogoLoop, { type LogoItem } from "@/components/LogoLoop";

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
 * Grey rather than brand colour: one value has to clear 3:1 against both the
 * white and the near-black canvas, and #6b7280 is the token already used for
 * muted text in the light theme.
 */
const MARK_COLOR = "6b7280";

function PlatformMark({ platform }: { platform: Platform }) {
  const [markFailed, setMarkFailed] = useState(false);
  const showMark = Boolean(platform.slug) && !markFailed;

  return (
    // The font size is pinned because LogoLoop sets each item to
    // `--logoloop-logoHeight`, which would otherwise render this at 20px.
    <span className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/[0.025] px-4 py-2 text-[0.8125rem] leading-none font-medium tracking-tight whitespace-nowrap text-foreground/70">
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
  );
}

const LOGOS: LogoItem[] = PLATFORMS.map((platform) => ({
  node: <PlatformMark platform={platform} />,
  ariaLabel: platform.name,
}));

export function PlatformStrip() {
  return (
    // Deliberately unnamed: LogoLoop renders its own labelled region, and
    // naming this too would nest two region landmarks.
    <section className="border-y border-border py-9">
      <LogoLoop
        logos={LOGOS}
        speed={38}
        direction="left"
        logoHeight={20}
        gap={20}
        pauseOnHover
        fadeOut
        // The component's own auto colour is #0b0b0b in dark, which would seam
        // against this canvas at #030712.
        fadeOutColor="var(--background)"
        ariaLabel="Platforms I work with"
      />
    </section>
  );
}
