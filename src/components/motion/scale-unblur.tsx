"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { EASE } from "@/components/motion/easing";

type ScaleUnblurProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  /** Starting blur radius, in pixels. */
  blur?: number;
  /** Starting scale. */
  scale?: number;
};

/**
 * Opacity 0 -> 1, scale 0.7 -> 1, blur 20px -> 0.
 *
 * Same SSR caveat as FadeIn: the reset lives in the `[data-motion-primitive]`
 * rule in globals.css.
 */
export function ScaleUnblur({
  children,
  className,
  delay = 0,
  duration = 0.9,
  blur = 20,
  scale = 0.7,
}: ScaleUnblurProps) {
  return (
    <motion.div
      data-motion-primitive=""
      className={className}
      initial={{ opacity: 0, scale, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
