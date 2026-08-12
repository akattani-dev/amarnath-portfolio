"use client";

import { useSyncExternalStore } from "react";

const COARSE_POINTER_QUERY = "(pointer: coarse)";
const FINE_POINTER_QUERY = "(pointer: fine)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const subscribeToMedia = (query: string) => (onChange: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};

// Hoisted so the subscription identity is stable across renders, otherwise
// React tears down and re-establishes the listener on every pass.
const subscribeToCoarsePointer = subscribeToMedia(COARSE_POINTER_QUERY);
const subscribeToFinePointer = subscribeToMedia(FINE_POINTER_QUERY);
const subscribeToReducedMotion = subscribeToMedia(REDUCED_MOTION_QUERY);

const getCoarsePointerSnapshot = () =>
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0 ||
  window.matchMedia(COARSE_POINTER_QUERY).matches;

const getFinePointerSnapshot = () =>
  window.matchMedia(FINE_POINTER_QUERY).matches;

const getReducedMotionSnapshot = () =>
  window.matchMedia(REDUCED_MOTION_QUERY).matches;

// Both queries read as "off" during prerender, so the server markup is the
// pointer-and-motion-capable variant and the client corrects it on hydration.
const getServerSnapshot = () => false;

/**
 * `useSyncExternalStore` rather than a `useEffect` + `setState` pair: the same
 * value is available on the first client render, there is no cascading render,
 * and prerendering has an explicit answer instead of touching `window`.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot
  );
}

/** True for touch and pen input, where there is no hover to drive an effect. */
export function useCoarsePointer(): boolean {
  return useSyncExternalStore(
    subscribeToCoarsePointer,
    getCoarsePointerSnapshot,
    getServerSnapshot
  );
}

/**
 * True when the *primary* pointer is a mouse or trackpad. Deliberately not
 * `!useCoarsePointer()`: a laptop with a touchscreen reports touch support and
 * a fine primary pointer at the same time, and it should still get the cursor.
 */
export function useFinePointer(): boolean {
  return useSyncExternalStore(
    subscribeToFinePointer,
    getFinePointerSnapshot,
    getServerSnapshot
  );
}
