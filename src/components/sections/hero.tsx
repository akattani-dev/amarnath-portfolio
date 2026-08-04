import Image from "next/image";
import Link from "next/link";

import PixelTransition from "@/components/PixelTransition";
import { FadeIn } from "@/components/motion/fade-in";
import { ScaleUnblur } from "@/components/motion/scale-unblur";
import { Button } from "@/components/ui/button";
import { hero, site } from "@/content/site";
import { cn } from "@/lib/utils";

const PORTRAIT_SIZES = "(min-width: 1024px) 420px, (min-width: 640px) 360px, 80vw";

function Portrait({ grayscale = false }: { grayscale?: boolean }) {
  return (
    <Image
      src="/images/hero.jpg"
      alt={`Portrait of ${site.name}`}
      fill
      // Both layers resolve to one optimised URL, so the colour copy is a cache
      // hit and the swap has nothing to wait for.
      {...(grayscale ? { priority: true } : { loading: "eager" as const })}
      sizes={PORTRAIT_SIZES}
      className={cn("object-cover object-[50%_18%]", grayscale && "grayscale")}
    />
  );
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="dot-grid pointer-events-none absolute inset-0 -z-10"
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pt-28 pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-16 lg:px-10 lg:pt-36 lg:pb-24">
        <FadeIn>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-brand" />
            <span className="text-xs tracking-[0.22em] text-muted-foreground uppercase">
              {hero.eyebrow}
            </span>
          </div>

          <h1 className="mt-5 max-w-[16ch] font-display text-[clamp(2.4rem,6.2vw,4.25rem)] leading-[0.98] font-semibold tracking-[-0.03em] text-balance text-foreground">
            {site.name}
          </h1>

          <p className="mt-5 max-w-[30ch] font-display text-base tracking-tight text-balance text-brand sm:text-lg">
            {hero.headline}
          </p>

          <p className="mt-4 max-w-[34ch] text-[0.98rem] leading-relaxed text-foreground/65">
            {hero.supporting}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild className="h-11 rounded-md px-5">
              <Link href={hero.ctas[0].href}>{hero.ctas[0].label}</Link>
            </Button>
            <Button asChild variant="outline" className="h-11 rounded-md px-5">
              <Link href={hero.ctas[1].href}>{hero.ctas[1].label}</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="h-11 rounded-md px-3 text-muted-foreground hover:text-brand"
            >
              <Link href={hero.ctas[2].href}>{hero.ctas[2].label}</Link>
            </Button>
          </div>
        </FadeIn>

        <ScaleUnblur
          delay={0.1}
          className="mx-auto w-full max-w-[420px] lg:mr-0 lg:ml-auto"
        >
          <div className="portrait-frame w-full rounded-4xl border border-foreground/10 p-1.5">
            <div className="overflow-hidden rounded-[1.6rem]">
              <PixelTransition
                className="w-full rounded-[1.6rem]"
                aspectRatio="100%"
                gridSize={9}
                animationStepDuration={0.35}
                // A raw token so the dissolve inverts with the theme.
                pixelColor="var(--foreground)"
                firstContent={<Portrait grayscale />}
                secondContent={<Portrait />}
              />
            </div>
          </div>
        </ScaleUnblur>
      </div>
    </section>
  );
}
