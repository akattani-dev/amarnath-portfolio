import type { CSSProperties } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

export type LogoPlateProps = {
  /** Company, institution or organisation. Only read for the fallback initial. */
  name: string;
  /**
   * Local mark filename *with* its extension, under /public/logos, resolved to
   * /logos/{mark}. Simple Icons dropped most enterprise marks used here over
   * trademark, so this reads bundled assets rather than a CDN — and the
   * extension lives in the value because those assets arrive in whatever
   * format the owner publishes. No mark means no bundled file exists, and the
   * brand-filled initial square is rendered instead.
   */
  mark?: string;
  /**
   * Brand hex. Colours the misregistered plate behind the mark, and fills the
   * initial-square fallback. Omit it and the plate keeps the default cyan and
   * magenta, which is what the education plates want.
   */
  brand?: string;
  /** Carries the plate size, which is the caller's to set. */
  className?: string;
};

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
 *
 * No hooks and no client boundary, so the server-rendered education and
 * volunteering blocks can use it as readily as the timeline can.
 */
export function LogoPlate({ name, mark, brand, className }: LogoPlateProps) {
  if (mark) {
    return (
      <span
        className={cn(
          "misreg-frame misreg-frame-sm flex items-center justify-center bg-mist",
          className
        )}
        // The down-right plate takes the owner's own hue; the up-left one stays
        // cyan, so every plate still reads as part of one system.
        style={brand ? ({ "--misreg-1": brand } as CSSProperties) : undefined}
      >
        {/* Four fifths of the plate's content box, so the mark tracks whatever
            size the caller set. The sources each ship a wide transparent
            margin of their own, so a smaller share leaves the marks floating
            rather than sitting in their tile. */}
        <Image
          src={`/logos/${mark}`}
          alt=""
          width={32}
          height={32}
          className="h-4/5 w-4/5 object-contain"
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden
      className={cn(
        "flex items-center justify-center border-2 font-display text-lg",
        brand ? "text-white" : "border-mist bg-mist text-ink",
        className
      )}
      style={brand ? { backgroundColor: brand, borderColor: brand } : undefined}
    >
      {initial(name)}
    </span>
  );
}
