"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { EASE } from "@/components/motion/easing";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  /** Distance travelled on the y axis, in pixels. */
  y?: number;
};

/**
 * Opacity 0 -> 1, y 12 -> 0.
 *
 * The entrance state ships in the SSR markup as an inline style, so the
 * `[data-motion-primitive]` rule in globals.css force-resets it when scripting
 * is unavailable or the visitor asked for reduced motion. Without that rule
 * this would hide content whenever the animation never runs.
 */
export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.6,
  y = 12,
}: FadeInProps) {
  return (
    <motion.div
      data-motion-primitive=""
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
