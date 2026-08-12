"use client";

import { useEffect, useRef } from "react";

import {
  useFinePointer,
  usePrefersReducedMotion,
} from "@/components/motion/media-queries";

/**
 * What counts as a target. Deliberately the same set the browser would hand a
 * focus ring to, so the ring never locks onto something that cannot be used.
 */
const INTERACTIVE_SELECTOR = [
  "a[href]",
  "button",
  "summary",
  "input",
  "select",
  "textarea",
  '[role="button"]',
  '[role="link"]',
  '[role="option"]',
  '[contenteditable="true"]',
  '[tabindex]:not([tabindex="-1"])',
].join(",");

/**
 * A cyan dot that opens into a comic targeting reticle over anything
 * clickable.
 *
 * Nothing about it is load-bearing: it renders only for a fine primary pointer
 * with motion allowed, so touch, coarse-pointer and reduced-motion visitors
 * never see it, and every layer is `pointer-events: none` so it can't sit
 * between a click and its target.
 *
 * Position is written straight to `style.transform` on an animation frame —
 * no React state, so tracking the pointer never costs a render, and no layout
 * is read on the way.
 */
export function CursorReticle() {
  const ref = useRef<HTMLDivElement>(null);
  const finePointer = useFinePointer();
  const reducedMotion = usePrefersReducedMotion();
  const enabled = finePointer && !reducedMotion;

  useEffect(() => {
    const node = ref.current;
    if (!enabled || !node) return;

    let x = 0;
    let y = 0;
    let frame = 0;

    const paint = () => {
      frame = 0;
      node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      // The reticle starts hidden so it is never parked at the top-left
      // corner before the pointer has been anywhere.
      node.dataset.visible = "true";
      if (!frame) frame = requestAnimationFrame(paint);
    };

    // `pointerover` bubbles from whatever is under the pointer, so entering
    // and leaving a control are the same event — no per-move `closest()`.
    const onOver = (event: PointerEvent) => {
      const { target } = event;
      node.dataset.target =
        target instanceof Element && target.closest(INTERACTIVE_SELECTOR)
          ? "true"
          : "false";
    };

    const hide = () => {
      node.dataset.visible = "false";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("blur", hide);
    document.addEventListener("pointerleave", hide);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("blur", hide);
      document.removeEventListener("pointerleave", hide);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={ref} aria-hidden className="reticle" data-visible="false">
      <span className="reticle__ring" />
      <span className="reticle__ticks" />
      <span className="reticle__dot" />
    </div>
  );
}
