import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Separator } from "@/components/ui/separator";
import { education, experience } from "@/content/site";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-16 border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <SectionHeading index="03" label="Experience" title="Where I have worked" />
        </Reveal>

        <ol className="mt-14 border-t border-border">
          {experience.map((role, index) => (
            <Reveal
              as="li"
              key={role.company}
              delay={index * 0.05}
              className="border-b border-border"
            >
              <div className="grid gap-4 py-9 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-12">
                <div className="space-y-1">
                  <p className="text-sm text-ink">{role.period}</p>
                  <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                    {role.location}
                  </p>
                </div>

                <div>
                  <h3 className="font-display text-xl tracking-tight text-ink sm:text-2xl">
                    {role.company}
                  </h3>
                  <p className="mt-1 text-sm text-brand">{role.title}</p>
                  <ul className="mt-4 space-y-2">
                    {role.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="relative max-w-2xl pl-5 leading-[1.7] text-foreground/80 before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-2.5 before:bg-border"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.1} className="mt-16">
          <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">
            Education
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-0">
            {education.map((entry, index) => (
              <div key={entry.institution} className="flex items-center">
                <div>
                  <p className="text-ink">{entry.institution}</p>
                  <p className="text-sm text-muted-foreground">{entry.credential}</p>
                </div>
                {index < education.length - 1 && (
                  <Separator
                    orientation="vertical"
                    className="mx-8 hidden !h-10 sm:block"
                  />
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
