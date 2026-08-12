import { ExperienceTimeline } from "@/components/experience-timeline";
import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/section-heading";
import { education, experience } from "@/content/site";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20">
      <FadeIn>
        <SectionHeading index="03" label="Experience" title="Where I have worked" />
      </FadeIn>

      <FadeIn delay={0.08} className="mt-10">
        <ExperienceTimeline roles={experience} />
      </FadeIn>

      <FadeIn delay={0.12} className="mt-16">
        <div className="flex items-center gap-4">
          <h3 className="font-display text-[0.6875rem] tracking-[0.2em] text-mist-2 uppercase">
            Education
          </h3>
          <span aria-hidden className="h-px flex-1 bg-ink-line" />
        </div>

        <ul className="mt-5 grid gap-4 sm:grid-cols-3">
          {education.map((entry) => (
            <li
              key={entry.credential}
              className="relative border-2 border-ink-line bg-ink-2 p-4"
            >
              {/* Sage: the quiet plate, so education reads as context rather
                  than as another cyan data node. */}
              <span aria-hidden className="absolute inset-x-0 top-0 h-[2px] bg-sage" />
              <p className="font-display text-[0.9375rem] leading-tight tracking-tight text-mist">
                {entry.institution}
              </p>
              <p className="mt-2 text-[0.8125rem] leading-5 text-foreground/75">
                {entry.credential}
              </p>
              {entry.period && (
                <p className="mt-3 font-mono text-[0.625rem] text-mist-2">{entry.period}</p>
              )}
            </li>
          ))}
        </ul>
      </FadeIn>
    </section>
  );
}
