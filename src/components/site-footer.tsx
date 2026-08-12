import type { CSSProperties } from "react";
import Link from "next/link";

import { nav, site, socials } from "@/content/site";

const COLUMN_HEADING =
  "font-display text-[0.62rem] tracking-[0.26em] text-mist-2/70 uppercase";
const COLUMN_LINK =
  "comic-slash inline-block text-sm text-mist-2 transition-colors duration-150 hover:text-mist";

export function SiteFooter() {
  return (
    <footer
      className="halftone halftone-cyan grain relative isolate overflow-hidden border-t border-ink-line bg-ink text-mist-2"
      style={
        {
          "--halftone-opacity": "0.1",
          "--halftone-size": "10px",
          "--grain-opacity": "0.16",
        } as CSSProperties
      }
    >
      {/* Plate edge, mirroring the one under the header. */}
      <span
        aria-hidden
        className="plate-edge plate-edge-reverse absolute inset-x-0 top-0 opacity-50"
      />

      {/* Oversized hollow wordmark, cropped by the footer — cover-page energy
          without another asset. */}
      <span
        aria-hidden
        className="display-outline pointer-events-none absolute -bottom-[0.3em] left-1/2 -z-10 -translate-x-1/2 text-[clamp(4rem,15vw,11rem)] leading-none whitespace-nowrap"
        style={
          {
            "--outline-w": "1px",
            "--outline-c": "color-mix(in oklab, var(--mist), transparent 92%)",
          } as CSSProperties
        }
      >
        {site.name}
      </span>

      <div className="mx-auto w-full max-w-6xl px-6 py-12 lg:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-lg tracking-[0.12em] text-mist uppercase">
              {site.name}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-mist-2">{site.role}</p>
            <a
              href={`mailto:${site.email}`}
              className="comic-slash mt-4 inline-block font-display text-sm tracking-[0.08em] text-brand transition-colors duration-150 hover:text-brand-bright"
            >
              {site.email}
            </a>
          </div>

          <div className="flex gap-12">
            <div>
              <p className={COLUMN_HEADING}>Site</p>
              <ul className="mt-4 space-y-2">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={COLUMN_LINK}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className={COLUMN_HEADING}>Elsewhere</p>
              <ul className="mt-4 space-y-2">
                {socials.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={COLUMN_LINK}
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-ink-line pt-5 text-[0.7rem] tracking-[0.14em] text-mist-2/60 uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="flex items-center gap-2">
            <span aria-hidden className="size-1.5 rotate-45 bg-brand-magenta" />
            {site.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
