import { Disclosure } from "@/components/disclosure";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { projects, type Project } from "@/content/site";

const FEATURED_COUNT = 4;

function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <li className="group border-b border-border">
      <article className="grid gap-2 py-6 lg:grid-cols-[minmax(0,4.5rem)_minmax(0,1fr)] lg:gap-10">
        <div className="flex items-baseline gap-3 lg:flex-col lg:gap-1 lg:pt-1">
          <span className="font-mono text-xs text-brand">
            {String(index + 1).padStart(2, "0")}
          </span>
          {project.period && (
            <span className="text-xs tracking-[0.12em] text-muted-foreground uppercase">
              {project.period}
            </span>
          )}
        </div>

        <div>
          <h3 className="font-display text-lg tracking-tight text-foreground transition-colors duration-150 group-hover:text-brand sm:text-xl">
            {project.title}
          </h3>
          <p className="mt-2 max-w-3xl text-[0.95rem] leading-[1.6] text-foreground/80">
            {project.summary}
          </p>
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="rounded-md px-2 py-0.5 text-[0.7rem] font-normal text-muted-foreground"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </article>
    </li>
  );
}

export function Work() {
  const featured = projects.slice(0, FEATURED_COUNT);
  const rest = projects.slice(FEATURED_COUNT);

  return (
    <section id="work" className="scroll-mt-20">
      <SectionHeading
        index="02"
        label="Work"
        title="Things I have built, mostly where integration meets agents"
      />

      <ul className="mt-8 border-t border-border">
        {featured.map((project, index) => (
          <ProjectRow key={project.title} project={project} index={index} />
        ))}
      </ul>

      {rest.length > 0 && (
        <Disclosure label="View all work" labelOpen="Show fewer" className="mt-5">
          <ul>
            {rest.map((project, index) => (
              <ProjectRow
                key={project.title}
                project={project}
                index={index + FEATURED_COUNT}
              />
            ))}
          </ul>
        </Disclosure>
      )}
    </section>
  );
}
