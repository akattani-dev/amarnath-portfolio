"use client";

import { useId, useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { education, experience, type Role } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Deliberately fractional: the third row is clipped through its middle so the
 * list reads as continuing rather than ending. Role rows are a fixed
 * `--row-h` tall, which is what makes the half land exactly on a half.
 */
const COLLAPSED_COUNT = 2.5;

/** Two stacked text lines on narrow screens, one on `sm` and up. */
const ROW_HEIGHT_CLASS = "[--row-h:6.5rem] sm:[--row-h:5rem]";

function initial(name: string) {
  return name.trim().charAt(0).toUpperCase();
}

/**
 * A Simple Icons mark on a white tile, falling back to a brand-filled initial
 * square when there is no slug or the CDN does not answer. The tile stays
 * white in both themes on purpose — the marks are brand-coloured and need a
 * light substrate to survive dark mode.
 */
function CompanyMark({ company, slug, brand }: Pick<Role, "company" | "slug" | "brand">) {
  const [unavailable, setUnavailable] = useState(false);

  if (slug && !unavailable) {
    return (
      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-border bg-white">
        {/* Raw img: next/image on this host would need a remotePatterns entry. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://cdn.simpleicons.org/${slug}${brand ? `/${brand.slice(1)}` : ""}`}
          alt=""
          width={24}
          height={24}
          loading="lazy"
          decoding="async"
          className="size-6"
          onError={() => setUnavailable(true)}
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden
      className={cn(
        "flex size-12 shrink-0 items-center justify-center rounded-xl font-display text-lg",
        brand ? "text-white" : "bg-foreground text-background"
      )}
      style={brand ? { backgroundColor: brand } : undefined}
    >
      {initial(company)}
    </span>
  );
}

/** The inverse of a company mark: bordered, transparent, muted. */
function InstitutionMark({ institution }: { institution: string }) {
  return (
    <span
      aria-hidden
      className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-border font-display text-lg text-muted-foreground"
    >
      {initial(institution)}
    </span>
  );
}

type RowProps = {
  mark: ReactNode;
  primary: string;
  secondary: string;
  meta?: string;
  /** Locks the row to `--row-h` so the collapsed list can be clipped mid-row. */
  fixed?: boolean;
};

function Row({ mark, primary, secondary, meta, fixed = false }: RowProps) {
  return (
    <li>
      <div
        className={cn(
          "flex items-center gap-4 overflow-hidden border-b border-border",
          fixed ? "h-[var(--row-h)]" : "min-h-20 py-4"
        )}
      >
        {mark}
        <div className="min-w-0">
          <h3
            className={cn(
              "font-display text-base leading-6 tracking-tight text-foreground",
              fixed && "truncate"
            )}
          >
            {primary}
          </h3>
          <p className="text-sm leading-5 text-muted-foreground">
            <span className="block sm:inline">{secondary}</span>
            {meta && (
              <>
                <span aria-hidden className="hidden px-1.5 text-foreground/30 sm:inline">
                  •
                </span>
                <span className="block sm:inline">{meta}</span>
              </>
            )}
          </p>
        </div>
      </div>
    </li>
  );
}

export function Experience() {
  const [expanded, setExpanded] = useState(false);
  const rolesId = useId();

  const collapsible = experience.length > COLLAPSED_COUNT;
  const clipped = collapsible && !expanded;

  return (
    <section id="experience" className="scroll-mt-20">
      <SectionHeading index="03" label="Experience" title="Where I have worked" />

      <Tabs defaultValue="roles" className="mt-8 gap-5">
        <TabsList variant="line" className="h-8 border-b border-border">
          <TabsTrigger value="roles" className="px-3">
            Roles
          </TabsTrigger>
          <TabsTrigger value="education" className="px-3">
            Education
          </TabsTrigger>
        </TabsList>

        <TabsContent value="roles">
          <div className={cn("relative", ROW_HEIGHT_CLASS)}>
            <ol
              id={rolesId}
              className="overflow-hidden transition-[max-height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
              style={{
                maxHeight: `calc(var(--row-h) * ${clipped ? COLLAPSED_COUNT : experience.length})`,
              }}
            >
              {experience.map((role) => (
                <Row
                  key={role.company}
                  fixed
                  mark={
                    <CompanyMark
                      company={role.company}
                      slug={role.slug}
                      brand={role.brand}
                    />
                  }
                  primary={role.company}
                  secondary={role.title}
                  meta={role.period}
                />
              ))}
            </ol>

            {collapsible && (
              <div
                aria-hidden
                className={cn(
                  // The falloff has to fade the half-row, not erase it: the mask
                  // tapers the blur, the gradient only reaches full background
                  // at the very bottom edge.
                  "pointer-events-none absolute inset-x-0 bottom-0 h-[calc(var(--row-h)*0.8)] bg-gradient-to-t from-background/95 via-background/55 to-background/0 backdrop-blur-[2px] transition-opacity duration-300 [mask-image:linear-gradient(to_top,black_30%,transparent)] motion-reduce:transition-none",
                  !clipped && "opacity-0"
                )}
              />
            )}
          </div>

          {collapsible && (
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={rolesId}
              onClick={() => setExpanded((value) => !value)}
              className="group mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-150 hover:text-brand"
            >
              {expanded ? "Show less" : "Show more"}
              <ArrowRight
                className={cn(
                  "size-4 transition-transform duration-150",
                  expanded ? "-rotate-90" : "group-hover:translate-x-0.5"
                )}
              />
            </button>
          )}
        </TabsContent>

        <TabsContent value="education">
          <ol>
            {education.map((entry) => (
              <Row
                key={entry.credential}
                mark={<InstitutionMark institution={entry.institution} />}
                primary={entry.institution}
                secondary={entry.credential}
                meta={entry.period}
              />
            ))}
          </ol>
        </TabsContent>
      </Tabs>
    </section>
  );
}
