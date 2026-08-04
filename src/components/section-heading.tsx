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
      <h2 className="mt-4 font-display text-3xl leading-[1.1] tracking-tight text-ink text-balance sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}
