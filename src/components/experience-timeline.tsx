"use client";

import { useRef, type CSSProperties } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

import { usePrefersReducedMotion } from "@/components/motion/media-queries";
import type { Role } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Rail geometry. The node tile is 44px, so its centre — and therefore the
 * 2px rail — sits at 21px. Every offset below is derived from those two.
 */
const NODE_SIZE = "size-11";
const RAIL_X = "left-[21px]";
const ROW_INDENT = "pl-16 sm:pl-[4.5rem]";

function initial(name: string) {
  return name.trim().charAt(0).toUpperCase();
}

/**
 * A bundled mark on a light plate, falling back to a brand-filled square when
 * there is no local asset. The plate does all the contrast work: the marks are
 * third-party artwork used exactly as supplied — Deloitte's is near-black
 * wordmark type that would vanish straight onto the canvas — so none of them
 * is recoloured, inverted or cropped. What carries the comic language is the
 * substrate around the logo, not the logo.
 */
function CompanyMark({ company, mark, brand }: Pick<Role, "company" | "mark" | "brand">) {
  if (mark) {
    return (
      <span
        className={cn(
          NODE_SIZE,
          "misreg-frame misreg-frame-sm flex items-center justify-center bg-mist"
        )}
        // The down-right plate takes the company's own hue; the up-left one
        // stays cyan, so a node still reads as something threaded on the rail.
        style={brand ? ({ "--misreg-1": brand } as CSSProperties) : undefined}
      >
        {/* 32px inside the plate's 40px content box. The sources each ship a
            wide transparent margin of their own, so a smaller box leaves the
            marks floating rather than sitting in their tile. */}
        <Image
          src={`/logos/${mark}`}
          alt=""
          width={32}
          height={32}
          className="size-8 object-contain"
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden
      className={cn(
        NODE_SIZE,
        "flex items-center justify-center border-2 font-display text-lg",
        brand ? "text-white" : "border-mist bg-mist text-ink"
      )}
      style={brand ? { backgroundColor: brand, borderColor: brand } : undefined}
    >
      {initial(company)}
    </span>
  );
}

type TimelineRowProps = {
  role: Role;
  index: number;
  total: number;
  /** Rail progress, 0 → 1 across the whole list. */
  progress: MotionValue<number>;
  reducedMotion: boolean;
  last: boolean;
};

function TimelineRow({
  role,
  index,
  total,
  progress,
  reducedMotion,
  last,
}: TimelineRowProps) {
  // The node sits near the top of its row, so it lights a beat before the rail
  // has finished crossing it.
  const reached = (index + 0.3) / total;
  const lit = useTransform(progress, [Math.max(reached - 0.12, 0), reached], [0, 1]);

  return (
    <li className={cn("relative", ROW_INDENT, !last && "pb-10 sm:pb-12")}>
      <span className="absolute top-0 left-0 block">
        <CompanyMark company={role.company} mark={role.mark} brand={role.brand} />
        {/* Reuses the [data-motion-primitive] contract from globals.css: with no
            scripting, or under reduced motion, every node reads as reached.

            The 5px inset is the plate offset (3px, from .misreg-frame-sm) plus
            this ring's own 2px border, so the ring closes around the outside of
            the misregistered plates instead of being drawn across them. */}
        <motion.span
          aria-hidden
          data-motion-primitive=""
          style={{ opacity: reducedMotion ? 1 : lit }}
          className="pointer-events-none absolute -inset-[5px] border-2 border-brand shadow-[0_0_18px_-4px_var(--brand)]"
        />
      </span>

      <div className="pt-0.5">
        <div className="flex items-baseline gap-2.5">
          <span className="font-mono text-[0.6875rem] text-brand">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-display text-lg leading-none tracking-[0.03em] text-mist uppercase">
            {role.company}
          </h3>
        </div>
        <p className="mt-2 text-[0.9375rem] leading-6 text-foreground/80">{role.title}</p>
        <p className="mt-3 inline-block border border-ink-line px-2 py-[3px] font-mono text-[0.625rem] tracking-[0.06em] text-mist-2 uppercase">
          {role.period}
        </p>
      </div>
    </li>
  );
}

/**
 * The roles as a vertical comic rail: company plates threaded onto a line that
 * fills with cyan as the section scrolls past, each node ringing on as the
 * progress reaches it.
 *
 * Nothing here is load-bearing for reading the content — under reduced motion
 * the rail renders full and every node is lit, which is also what the no-JS
 * fallback in globals.css produces.
 */
export function ExperienceTimeline({ roles }: { roles: Role[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 80%", "end 65%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.35,
  });

  return (
    <div ref={railRef} className="relative">
      <span
        aria-hidden
        className={cn("absolute top-5 bottom-0 w-[2px] bg-ink-line", RAIL_X)}
      />
      <motion.span
        aria-hidden
        data-motion-primitive=""
        style={{ scaleY: reducedMotion ? 1 : progress }}
        className={cn(
          "absolute top-5 bottom-0 w-[2px] origin-top bg-brand shadow-[0_0_14px_-1px_var(--brand)]",
          RAIL_X
        )}
      />
      {/* Terminal plate, so the rail resolves instead of just stopping. */}
      <span
        aria-hidden
        className="absolute bottom-0 left-[22px] size-2.5 -translate-x-1/2 translate-y-1/2 rotate-45 border-2 border-ink-line bg-ink"
      />

      <ol className="relative">
        {roles.map((role, index) => (
          <TimelineRow
            key={role.company}
            role={role}
            index={index}
            total={roles.length}
            progress={progress}
            reducedMotion={reducedMotion}
            last={index === roles.length - 1}
          />
        ))}
      </ol>
    </div>
  );
}
