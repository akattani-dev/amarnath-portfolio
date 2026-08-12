import {
  AGENT_INTEGRATION_FLOW,
  ArchitectureDiagram,
} from "@/components/architecture-diagram";
import { Disclosure } from "@/components/disclosure";
import { FadeIn } from "@/components/motion/fade-in";
import { ProjectPanel } from "@/components/project-panel";
import { SectionHeading } from "@/components/section-heading";
import { projects, type Project } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Pulled out of `projects` by title rather than by an ordering field, so
 * site.ts stays a plain content file. Everything else keeps its authored order.
 */
const FEATURED_TITLE = "TrailBrewer";

/** Panels on show before the overflow disclosure. */
const VISIBLE_PANELS = 4;

const PANEL_GRID = "grid gap-6 sm:grid-cols-2 sm:gap-7";

function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className="misreg-frame grain relative border-ink-line bg-ink-2 [--grain-opacity:0.12] [--misreg-x:7px] [--misreg-y:7px]">
      <div className="relative flex items-center justify-between gap-4 border-b-2 border-ink-line px-5 py-3 sm:px-7">
        <span className="comic-tab comic-tab-solid px-2.5 py-1 text-[0.6875rem]">
          Featured
        </span>
        {/* Printer's registration strip, echoed from the diagram below. */}
        <span aria-hidden className="flex gap-[3px]">
          <span className="size-1.5 bg-brand" />
          <span className="size-1.5 bg-brand-magenta" />
          <span className="size-1.5 bg-brand-red" />
        </span>
      </div>

      <div className="relative p-5 sm:p-7">
        {/* Title and copy split editorially; the diagram then runs the full
            width underneath, which is the only way five nodes stay in a row. */}
        <div className="grid gap-7 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-end lg:gap-12">
          <div>
            <h3 className="display-pop text-[clamp(2.5rem,8vw,4.25rem)] text-mist">
              {project.title}
            </h3>
            <span
              aria-hidden
              className="mt-6 block h-[3px] w-24 bg-gradient-to-r from-brand to-brand-magenta"
            />
          </div>

          <div>
            <p className="max-w-[52ch] text-[1.0625rem] leading-[1.6] text-foreground/85">
              {project.summary}
            </p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="border border-brand/35 px-2 py-1 font-mono text-[0.6875rem] leading-none tracking-[0.06em] text-brand uppercase"
                >
                  {tag}
                </li>
              ))}
            </ul>

            {project.href && (
              <a href={project.href} className="comic-tab mt-6">
                View project
              </a>
            )}
          </div>
        </div>

        <ArchitectureDiagram {...AGENT_INTEGRATION_FLOW} className="mt-9" />
      </div>
    </article>
  );
}

export function Work() {
  const featured = projects.find((project) => project.title === FEATURED_TITLE);
  const rest = featured
    ? projects.filter((project) => project !== featured)
    : projects;
  const shown = rest.slice(0, VISIBLE_PANELS);
  const overflow = rest.slice(VISIBLE_PANELS);

  return (
    <section id="work" className="scroll-mt-20">
      <FadeIn>
        <SectionHeading
          index="02"
          label="Work"
          title="Things I have built, mostly where integration meets agents"
        />
      </FadeIn>

      {featured && (
        <FadeIn delay={0.06} className="mt-9">
          <FeaturedProject project={featured} />
        </FadeIn>
      )}

      <FadeIn delay={0.1} className="mt-12">
        <ul className={PANEL_GRID}>
          {shown.map((project, index) => (
            <ProjectPanel key={project.title} project={project} index={index} />
          ))}
        </ul>
      </FadeIn>

      {overflow.length > 0 && (
        <Disclosure
          label="View all work"
          labelOpen="Show fewer"
          className="comic-tab mt-7 text-xs text-mist transition-all"
        >
          <ul className={cn(PANEL_GRID, "mt-7")}>
            {overflow.map((project, index) => (
              <ProjectPanel
                key={project.title}
                project={project}
                index={index + VISIBLE_PANELS}
              />
            ))}
          </ul>
        </Disclosure>
      )}
    </section>
  );
}
