"use client";

import type { ComponentProps } from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/**
 * MDX images open full size in a lightbox. Post images are authored as
 * `![alt](src)` without intrinsic dimensions, so a plain `img` is used rather
 * than `next/image`.
 */
export function ZoomableImage({ src, alt = "", ...props }: ComponentProps<"img">) {
  if (!src) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="cursor-zoom-in transition-opacity duration-150 hover:opacity-90"
          {...props}
        />
      </DialogTrigger>
      <DialogContent className="max-w-[calc(100%-2rem)] bg-transparent p-0 ring-0 sm:max-w-5xl">
        <DialogTitle className="sr-only">{alt || "Image"}</DialogTitle>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="h-auto max-h-[85vh] w-full rounded-xl border border-border object-contain"
        />
      </DialogContent>
    </Dialog>
  );
}
