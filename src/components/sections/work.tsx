import { FadeIn } from "@/components/motion/fade-in";
import { ProjectPanel } from "@/components/project-panel";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/content/site";

export function Work() {
  return (
    <section id="work" className="scroll-mt-20">
      <FadeIn>
        <SectionHeading
          index="02"
          label="Work"
          title="Things I have built, mostly where integration meets agents"
        />
      </FadeIn>

      <FadeIn delay={0.06} className="mt-10 lg:mt-12">
        {/* Two equal case panels stacked full width. The gap clears the
            misregistered plates, which spread to 7px on hover. */}
        <ul className="flex flex-col gap-12 lg:gap-16">
          {projects.map((project, index) => (
            <ProjectPanel key={project.title} project={project} index={index} />
          ))}
        </ul>
      </FadeIn>
    </section>
  );
}
