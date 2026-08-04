import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { about } from "@/content/site";

export function About() {
  return (
    <section id="about" className="scroll-mt-16 border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <SectionHeading index="01" label="About" title={about.title} />
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-20">
          <Reveal className="space-y-6">
            {about.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="text-[1.05rem] leading-[1.75] text-foreground/85"
              >
                {paragraph}
              </p>
            ))}
            <p className="text-[1.05rem] leading-[1.75] text-foreground/85">
              {about.writingNote.prefix}
              <Link
                href="/blog"
                className="text-brand underline decoration-brand/35 underline-offset-4 transition-colors hover:decoration-brand"
              >
                {about.writingNote.linkLabel}
              </Link>
              {about.writingNote.suffix}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="divide-y divide-border border-y border-border">
              {about.lists.map((list) => (
                <div key={list.title} className="grid grid-cols-3 gap-4 py-5">
                  <dt className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                    {list.title}
                  </dt>
                  <dd className="col-span-2 space-y-1.5">
                    {list.items.map((entry) => (
                      <p key={entry} className="text-sm leading-snug text-foreground/85">
                        {entry}
                      </p>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
