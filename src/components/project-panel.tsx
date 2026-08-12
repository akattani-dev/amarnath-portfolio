"use client";

import type { PointerEvent } from "react";

import {
  useCoarsePointer,
  usePrefersReducedMotion,
} from "@/components/motion/media-queries";
import type { Project } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * One custom property drives the whole panel — accent edge, label, the
 * misregistered plate, the halftone and the hover border all read
 * `--pp-accent`. Red lands once in a seven-panel wall, which is as sparing as
 * the token asks for.
 */
const ACCENTS = [
  // The second plate defaults to cyan, so the cyan panel swaps it for magenta
  // rather than printing the same colour twice.
  "[--pp-accent:var(--brand)] [--misreg-2:var(--brand-magenta)]",
  "[--pp-accent:var(--brand-magenta)]",
  "[--pp-accent:var(--sage)]",
  "[--pp-accent:var(--brand-red)]",
] as const;

/** Degrees of tilt at the far corner. Past ~5° the copy starts to swim. */
const MAX_TILT = 3.5;

type ProjectPanelProps = {
  project: Project;
  /** Zero-based; drives both the PROJECT 0n label and the accent cycle. */
  index: number;
};

/**
 * A project as a printed plate: thick accent edge, misregistered borders, and
 * a halftone field that develops under the cursor.
 *
 * The tilt is written straight to `style.transform` on pointer move — no state,
 * so hovering never costs a React render — and is skipped for coarse pointers
 * and reduced motion, where the class-based lift takes over instead.
 */
export function ProjectPanel({ project, index }: ProjectPanelProps) {
  const reducedMotion = usePrefersReducedMotion();
  const coarsePointer = useCoarsePointer();
  const tiltable = !reducedMotion && !coarsePointer;

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const panel = event.currentTarget;
    if (!tiltable) {
      panel.style.transform = "";
      return;
    }

    const bounds = panel.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    panel.style.transform = `perspective(900px) rotateX(${(-y * MAX_TILT).toFixed(2)}deg) rotateY(${(x * MAX_TILT).toFixed(2)}deg) translate3d(-2px, -2px, 0)`;
  }

  /** Hands the panel back to `.misreg-frame-hover`, which owns the resting lift. */
  function handlePointerLeave(event: PointerEvent<HTMLElement>) {
    event.currentTarget.style.transform = "";
  }

  return (
    <li>
      <article
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={cn(
          // `isolate` is what lets the halftone sit on -z-10: it keeps the
          // negative layer above the panel's own background instead of
          // dropping it behind the page.
          // `group` is what wires the halftone and the title to the panel's
          // own hover — both effects are shared classes from globals.css, and
          // that is the hook they listen on.
          "misreg-frame misreg-frame-sm misreg-frame-hover group relative isolate flex h-full flex-col border-ink-line bg-ink-2 p-5 [--misreg-1:var(--pp-accent)] hover:border-[var(--pp-accent)] focus-within:border-[var(--pp-accent)]",
          ACCENTS[index % ACCENTS.length]
        )}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-[var(--pp-accent)]"
        />
        <span
          aria-hidden
          className="halftone halftone-reveal pointer-events-none absolute inset-0 -z-10 [--halftone-color:var(--pp-accent)] [--halftone-opacity:0.34]"
        />

        <div className="flex items-baseline justify-between gap-3">
          <span className="font-display text-[0.6875rem] leading-none tracking-[0.16em] text-[var(--pp-accent)] uppercase">
            Project {String(index + 1).padStart(2, "0")}
          </span>
          {project.period && (
            <span className="font-mono text-[0.625rem] text-mist-2">{project.period}</span>
          )}
        </div>

        <h3 className="chromatic mt-3.5 font-display text-[1.0625rem] leading-[1.25] tracking-tight text-mist [--rgb-x:0.03em]">
          {project.href ? (
            // Stretched hit area: the whole panel becomes the link without
            // wrapping the summary and tags in an anchor.
            <a href={project.href} className="after:absolute after:inset-0">
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h3>

        <p className="mt-2.5 text-[0.875rem] leading-[1.6] text-foreground/75">
          {project.summary}
        </p>

        <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="border border-ink-line px-1.5 py-[3px] font-mono text-[0.625rem] leading-none tracking-[0.06em] text-mist-2 uppercase"
            >
              {tag}
            </li>
          ))}
        </ul>
      </article>
    </li>
  );
}
