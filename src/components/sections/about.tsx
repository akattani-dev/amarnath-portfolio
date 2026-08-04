import Link from "next/link";

import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { about } from "@/content/site";

const VISIBLE_CERTIFICATIONS = 4;

const CHIP = "rounded-md px-2 py-0.5 text-[0.7rem] font-normal text-muted-foreground";

export function About() {
  const shown = about.certifications.slice(0, VISIBLE_CERTIFICATIONS);
  const overflow = about.certifications.slice(VISIBLE_CERTIFICATIONS);

  return (
    <section id="about" className="scroll-mt-20">
      <SectionHeading index="01" label="About" title={about.title} />

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-14">
        <div className="max-w-[46ch] space-y-4">
          {about.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="leading-[1.7] text-foreground/85"
            >
              {paragraph}
            </p>
          ))}
          <p className="leading-[1.7] text-foreground/85">
            {about.writingNote.prefix}
            <Link
              href="/blog"
              className="text-brand underline decoration-brand/35 underline-offset-4 transition-colors duration-150 hover:decoration-brand"
            >
              {about.writingNote.linkLabel}
            </Link>
            {about.writingNote.suffix}
          </p>
        </div>

        <div className="space-y-5 self-start">
          <div>
            <h3 className="text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase">
              Certifications
            </h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {shown.map((certification) => (
                <Badge key={certification} variant="outline" className={CHIP}>
                  {certification}
                </Badge>
              ))}
              {overflow.length > 0 && (
                <>
                  <Badge
                    aria-hidden
                    variant="outline"
                    title={overflow.join(" · ")}
                    className={`${CHIP} border-dashed`}
                  >
                    +{overflow.length}
                  </Badge>
                  {/* The counter is the visual treatment; the names still ship in the markup. */}
                  <span className="sr-only">{overflow.join(", ")}</span>
                </>
              )}
            </div>
          </div>

          <Separator />

          <div className="flex flex-wrap gap-1.5">
            {about.chips.map((chip) => (
              <Badge key={chip} variant="outline" className={CHIP}>
                {chip}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
