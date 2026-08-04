import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/content/site";

export function Work() {
  return (
    <section id="work" className="scroll-mt-16 border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <SectionHeading
            index="02"
            label="Work"
            title="Things I have built, mostly where integration meets agents"
          />
        </Reveal>

        <ul className="mt-14 border-t border-border">
          {projects.map((project, index) => (
            <Reveal
              as="li"
              key={project.title}
              delay={Math.min(index, 3) * 0.05}
              className="group border-b border-border"
            >
              <article className="grid gap-3 py-9 lg:grid-cols-[minmax(0,5rem)_minmax(0,1fr)] lg:gap-12">
                <span className="font-mono text-xs text-brand lg:pt-1.5">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3 className="font-display text-xl tracking-tight text-ink transition-colors group-hover:text-brand sm:text-2xl">
                    {project.title}
                  </h3>
                  <p className="mt-3 max-w-2xl leading-[1.7] text-foreground/80">
                    {project.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="rounded-full border-border bg-transparent px-3 py-1 text-[0.7rem] font-normal tracking-wide text-muted-foreground"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
