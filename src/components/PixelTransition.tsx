"use client";

import { gsap } from "gsap";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import {
  useCoarsePointer,
  usePrefersReducedMotion,
} from "@/components/motion/media-queries";
import { cn } from "@/lib/utils";

interface PixelTransitionProps {
  firstContent: React.ReactNode | string;
  secondContent: React.ReactNode | string;
  gridSize?: number;
  pixelColor?: string;
  animationStepDuration?: number;
  once?: boolean;
  className?: string;
  style?: CSSProperties;
  aspectRatio?: string;
  /**
   * Adds a keyboard tab stop so the swap is reachable without a pointer. Off by
   * default: when both layers carry the same image the stop announces nothing.
   */
  focusable?: boolean;
}

const PixelTransition: React.FC<PixelTransitionProps> = ({
  firstContent,
  secondContent,
  gridSize = 7,
  pixelColor = "currentColor",
  animationStepDuration = 0.3,
  once = false,
  aspectRatio = "100%",
  className = "",
  style = {},
  focusable = false,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pixelGridRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef<HTMLDivElement | null>(null);
  const delayedCallRef = useRef<gsap.core.Tween | null>(null);

  const [isActive, setIsActive] = useState<boolean>(false);

  // Both of these read `window`, which the original did during render — a hard
  // crash here, because a client component is still prerendered on the server.
  const isTouchDevice = useCoarsePointer();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const pixelGridEl = pixelGridRef.current;
    if (!pixelGridEl) return;

    pixelGridEl.replaceChildren();

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixelated-image-card__pixel");
        pixel.classList.add("absolute", "hidden");
        pixel.style.backgroundColor = pixelColor;

        const size = 100 / gridSize;
        pixel.style.width = `${size}%`;
        pixel.style.height = `${size}%`;
        pixel.style.left = `${col * size}%`;
        pixel.style.top = `${row * size}%`;

        pixelGridEl.appendChild(pixel);
      }
    }
  }, [gridSize, pixelColor]);

  const animatePixels = useCallback(
    (activate: boolean): void => {
      setIsActive(activate);

      const pixelGridEl = pixelGridRef.current;
      const activeEl = activeRef.current;
      if (!pixelGridEl || !activeEl) return;

      // Reduced motion: swap layers outright rather than dissolving them.
      if (prefersReducedMotion) {
        activeEl.style.display = activate ? "block" : "none";
        activeEl.style.pointerEvents = activate ? "none" : "";
        return;
      }

      const pixels = pixelGridEl.querySelectorAll<HTMLDivElement>(
        ".pixelated-image-card__pixel"
      );
      if (!pixels.length) return;

      gsap.killTweensOf(pixels);
      delayedCallRef.current?.kill();

      gsap.set(pixels, { display: "none" });

      const totalPixels = pixels.length;
      const staggerDuration = animationStepDuration / totalPixels;

      gsap.to(pixels, {
        display: "block",
        duration: 0,
        stagger: {
          each: staggerDuration,
          from: "random",
        },
      });

      delayedCallRef.current = gsap.delayedCall(animationStepDuration, () => {
        activeEl.style.display = activate ? "block" : "none";
        activeEl.style.pointerEvents = activate ? "none" : "";
      });

      gsap.to(pixels, {
        display: "none",
        duration: 0,
        delay: animationStepDuration,
        stagger: {
          each: staggerDuration,
          from: "random",
        },
      });
    },
    [animationStepDuration, prefersReducedMotion]
  );

  useEffect(() => {
    const pixelGridEl = pixelGridRef.current;
    return () => {
      delayedCallRef.current?.kill();
      if (pixelGridEl) gsap.killTweensOf(pixelGridEl.children);
    };
  }, []);

  const handleEnter = (): void => {
    if (!isActive) animatePixels(true);
  };
  const handleLeave = (): void => {
    if (isActive && !once) animatePixels(false);
  };
  const handleClick = (): void => {
    if (!isActive) animatePixels(true);
    else if (!once) animatePixels(false);
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative max-w-full overflow-hidden", className)}
      style={style}
      onMouseEnter={!isTouchDevice ? handleEnter : undefined}
      onMouseLeave={!isTouchDevice ? handleLeave : undefined}
      onClick={isTouchDevice ? handleClick : undefined}
      onFocus={focusable && !isTouchDevice ? handleEnter : undefined}
      onBlur={focusable && !isTouchDevice ? handleLeave : undefined}
      tabIndex={focusable ? 0 : undefined}
    >
      <div style={{ paddingTop: aspectRatio }} />

      <div className="absolute inset-0 h-full w-full" aria-hidden={isActive}>
        {firstContent}
      </div>

      <div
        ref={activeRef}
        className="absolute inset-0 z-[2] h-full w-full"
        style={{ display: "none" }}
        aria-hidden={!isActive}
      >
        {secondContent}
      </div>

      <div
        ref={pixelGridRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[3] h-full w-full"
      />
    </div>
  );
};

export default PixelTransition;
