'use client';

import { useInView, useMotionValue, useSpring } from 'motion/react';
import { useCallback, useEffect, useRef } from 'react';

import { usePrefersReducedMotion } from '@/components/motion/media-queries';

interface CountUpProps {
  to: number;
  from?: number;
  direction?: 'up' | 'down';
  delay?: number;
  duration?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  onStart?: () => void;
  onEnd?: () => void;
}

export default function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  separator = '',
  onStart,
  onEnd
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === 'down' ? to : from);

  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);

  const springValue = useSpring(motionValue, {
    damping,
    stiffness
  });

  const isInView = useInView(ref, { once: true, margin: '0px' });

  const prefersReducedMotion = usePrefersReducedMotion();

  const getDecimalPlaces = (num: number): number => {
    const str = num.toString();
    if (str.includes('.')) {
      const decimals = str.split('.')[1];
      if (parseInt(decimals) !== 0) {
        return decimals.length;
      }
    }
    return 0;
  };

  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  const formatValue = useCallback(
    (latest: number) => {
      const hasDecimals = maxDecimals > 0;

      const options: Intl.NumberFormatOptions = {
        useGrouping: !!separator,
        minimumFractionDigits: hasDecimals ? maxDecimals : 0,
        maximumFractionDigits: hasDecimals ? maxDecimals : 0
      };

      const formattedNumber = Intl.NumberFormat('en-US', options).format(latest);

      return separator ? formattedNumber.replace(/,/g, separator) : formattedNumber;
    },
    [maxDecimals, separator]
  );

  const finalValue = formatValue(direction === 'down' ? from : to);

  // Reduced motion never animates, so pin the number to its final state. This
  // also repairs a part-counted value if the preference flips mid-flight.
  useEffect(() => {
    if (!prefersReducedMotion) return;
    if (ref.current) ref.current.textContent = finalValue;
  }, [prefersReducedMotion, finalValue]);

  useEffect(() => {
    if (prefersReducedMotion || !isInView || !startWhen) return;

    onStart?.();

    // The start value is written here rather than on mount so the server
    // markup can carry the final number. Anything that never scrolls into view
    // — or renders without JS — then reads correctly instead of showing zero.
    if (ref.current) {
      ref.current.textContent = formatValue(direction === 'down' ? to : from);
    }

    const timeoutId = setTimeout(() => {
      motionValue.set(direction === 'down' ? from : to);
    }, delay * 1000);

    const durationTimeoutId = setTimeout(
      () => {
        onEnd?.();
      },
      delay * 1000 + duration * 1000
    );

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(durationTimeoutId);
    };
  }, [
    isInView,
    startWhen,
    prefersReducedMotion,
    motionValue,
    direction,
    from,
    to,
    delay,
    onStart,
    onEnd,
    duration,
    formatValue
  ]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const unsubscribe = springValue.on('change', (latest: number) => {
      if (ref.current) {
        ref.current.textContent = formatValue(latest);
      }
    });

    return () => unsubscribe();
  }, [springValue, formatValue, prefersReducedMotion]);

  // The visible span's text is mutated outside React, so it is hidden from
  // assistive tech and the settled value is exposed once, alongside it.
  return (
    <>
      <span className={className} ref={ref} aria-hidden="true">
        {finalValue}
      </span>
      <span className="sr-only">{finalValue}</span>
    </>
  );
}
