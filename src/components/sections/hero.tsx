import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { hero, site } from "@/content/site";

export function Hero() {
  return (
    <section className="grain relative isolate flex min-h-[78svh] flex-col justify-end overflow-hidden bg-ink">
      <div className="absolute inset-x-0 top-0 h-[64%] [mask-image:linear-gradient(to_bottom,black_52%,transparent_97%)] md:inset-y-0 md:left-[30%] md:h-auto md:[mask-image:linear-gradient(to_right,transparent_2%,black_50%)]">
        <Image
          src="/images/hero.jpg"
          alt={`Illustrated portrait of ${site.name}`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_16%] opacity-90 md:object-[50%_28%]"
        />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,var(--ink)_38%,color-mix(in_oklab,var(--ink),transparent_14%)_62%,color-mix(in_oklab,var(--ink),transparent_52%)_100%)] md:bg-[linear-gradient(to_right,var(--ink)_30%,color-mix(in_oklab,var(--ink),transparent_12%)_54%,color-mix(in_oklab,var(--ink),transparent_62%)_100%)]"
      />

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(to_top,var(--ink)_18%,transparent)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-32 pb-14 lg:px-10 lg:pt-36 lg:pb-20">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-brand-bright" />
          <span className="text-xs tracking-[0.22em] text-mist/60 uppercase">
            {hero.eyebrow}
          </span>
        </div>

        <h1 className="mt-5 font-display text-[clamp(2.6rem,7.5vw,5.75rem)] leading-[0.95] font-semibold tracking-[-0.03em] text-mist">
          {site.name}
        </h1>

        <p className="mt-5 max-w-xl font-display text-base tracking-tight text-brand-bright sm:text-lg">
          {hero.headline}
        </p>

        <p className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-mist/70">
          {hero.supporting}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button
            asChild
            className="h-11 rounded-md bg-mist px-5 text-sm text-ink transition-colors duration-150 hover:bg-white"
          >
            <Link href={hero.ctas[0].href}>{hero.ctas[0].label}</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-11 rounded-md border-mist/25 bg-transparent px-5 text-sm text-mist transition-colors duration-150 hover:bg-white/10 hover:text-mist"
          >
            <Link href={hero.ctas[1].href}>{hero.ctas[1].label}</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="h-11 px-3 text-sm text-mist/70 transition-colors duration-150 hover:bg-transparent hover:text-brand-bright"
          >
            <Link href={hero.ctas[2].href}>{hero.ctas[2].label}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
