"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { hero, site } from "@/content/site";

export function Hero() {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.09, delayChildren: 0.1 },
    },
  };

  const item = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 22 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
        },
      };

  return (
    <section className="grain relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink">
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

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-36 pb-20 lg:px-10 lg:pt-40 lg:pb-28"
      >
        <motion.div variants={item} className="flex items-center gap-3">
          <span className="h-px w-8 bg-brand-bright" />
          <span className="text-xs tracking-[0.22em] text-mist/60 uppercase">
            {hero.eyebrow}
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-6 font-display text-[clamp(2.7rem,8.5vw,6.75rem)] leading-[0.95] font-semibold tracking-[-0.03em] text-mist"
        >
          {site.name}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl font-display text-base tracking-tight text-brand-bright sm:text-lg"
        >
          {hero.headline}
        </motion.p>

        <motion.p
          variants={item}
          className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-mist/70"
        >
          {hero.supporting}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
          <Button
            asChild
            className="h-11 rounded-md bg-mist px-5 text-sm text-ink hover:bg-white"
          >
            <Link href={hero.ctas[0].href}>{hero.ctas[0].label}</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-11 rounded-md border-mist/25 bg-transparent px-5 text-sm text-mist hover:bg-white/10 hover:text-mist"
          >
            <Link href={hero.ctas[1].href}>{hero.ctas[1].label}</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="h-11 px-3 text-sm text-mist/70 hover:bg-transparent hover:text-brand-bright"
          >
            <Link href={hero.ctas[2].href}>{hero.ctas[2].label}</Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
