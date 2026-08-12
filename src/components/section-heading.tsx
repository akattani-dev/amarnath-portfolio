import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: string;
  className?: string;
};

/**
 * Panel chrome shared by every home section: an `01 / ABOUT` marker rail, a
 * ghost numeral behind it, and the title as a misregistered display plate.
 * The prop shape is fixed — About, Work, Experience, Blog and Contact all
 * render through this one component.
 */
export function SectionHeading({
  index,
  label,
  title,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("relative max-w-3xl", className)}>
      {/* Positioned, so the marker rail and title below it need `relative` of
          their own to paint on top. */}
      <span
        aria-hidden
        className="display-outline pointer-events-none absolute -top-2 right-0 hidden text-[4.5rem] leading-none opacity-20 select-none [--outline-w:2px] lg:block"
      >
        {index}
      </span>

      <div className="relative flex items-center gap-3">
        <span className="font-display text-sm leading-none font-semibold tracking-[0.16em] text-brand">
          {index}
        </span>
        <span aria-hidden className="plate-mark text-brand-magenta" />
        <span className="font-display text-xs leading-none tracking-[0.3em] text-mist-2 uppercase">
          {label}
        </span>
        <span
          aria-hidden
          className="h-px min-w-6 flex-1 bg-gradient-to-r from-ink-line to-transparent"
        />
      </div>

      <h2 className="display-pop relative mt-4 text-[clamp(1.7rem,3.4vw,2.6rem)] leading-[0.95] text-balance text-foreground [--pop-x:0.03em] [--pop-y:0.024em]">
        {title}
      </h2>
    </div>
  );
}
