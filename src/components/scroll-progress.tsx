"use client";

import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "@/components/motion/media-queries";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    let frame = 0;

    // Scroll fires far more often than the compositor paints, so the read and
    // the state write are both parked on the next frame.
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        const max = scrollHeight - clientHeight;
        setProgress(max > 0 ? scrollTop / max : 0);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // A bar that jumps on every scroll tick is still distracting with the easing
  // stripped out, so reduced motion hides it outright.
  if (prefersReducedMotion) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]"
    >
      {/* scaleX rather than width: the bar composites instead of relaying out
          the fixed strip on every frame. */}
      <div
        className="h-full origin-left bg-gradient-to-r from-brand to-brand-magenta transition-transform duration-150 ease-linear will-change-transform"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
