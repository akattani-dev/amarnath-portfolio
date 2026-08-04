import Link from "next/link";

import { SectionHeading } from "@/components/section-heading";
import { about } from "@/content/site";

export function About() {
  return (
    <section id="about" className="scroll-mt-20">
      <SectionHeading index="01" label="About" title={about.title} />

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-14">
        <div className="space-y-4">
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

        <dl className="divide-y divide-border border-y border-border self-start">
          {about.lists.map((list) => (
            <div key={list.title} className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-4 py-3.5">
              <dt className="pt-px text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase">
                {list.title}
              </dt>
              <dd className="space-y-1">
                {list.items.map((entry) => (
                  <p
                    key={entry}
                    className="text-[0.8125rem] leading-[1.45] text-foreground/85"
                  >
                    {entry}
                  </p>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
