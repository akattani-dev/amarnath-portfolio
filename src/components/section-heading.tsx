import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: string;
  className?: string;
};

export function SectionHeading({
  index,
  label,
  title,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-brand">{index}</span>
        <span className="text-xs tracking-[0.22em] text-muted-foreground uppercase">
          {label}
        </span>
      </div>
      <h2 className="mt-3 font-display text-[1.75rem] leading-[1.15] tracking-tight text-foreground text-balance sm:text-[2rem]">
        {title}
      </h2>
    </div>
  );
}
