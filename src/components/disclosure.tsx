"use client";

import { useId, useState } from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

type DisclosureProps = {
  label: string;
  labelOpen: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Progressive reveal for content that is rendered on the server but collapsed
 * on first paint. The panel stays in the markup so it remains crawlable; the
 * `hidden` attribute keeps it out of the accessibility tree while collapsed.
 */
export function Disclosure({
  label,
  labelOpen,
  children,
  className,
}: DisclosureProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <>
      <div id={panelId} hidden={!open}>
        {children}
      </div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-150 hover:text-brand",
          className
        )}
      >
        {open ? labelOpen : label}
        <ArrowRight
          className={cn(
            "size-4 transition-transform duration-150",
            open ? "-rotate-90" : "group-hover:translate-x-0.5"
          )}
        />
      </button>
    </>
  );
}
