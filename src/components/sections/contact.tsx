import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { contact, socials } from "@/content/site";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-16">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal>
          <SectionHeading index="04" label="Contact" title="Let's talk" />
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-20">
          <Reveal>
            <p className="max-w-xl text-[1.05rem] leading-[1.75] text-foreground/85">
              {contact.lead}
            </p>
            <Button
              asChild
              className="mt-8 h-11 rounded-md bg-ink px-5 text-sm text-mist hover:bg-ink-2"
            >
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </Button>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="border-t border-border">
              {socials.map((social) => (
                <li key={social.href} className="border-b border-border">
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center justify-between gap-4 py-4 transition-colors hover:text-brand"
                  >
                    <span className="font-display text-lg tracking-tight text-ink transition-colors group-hover:text-brand">
                      {social.label}
                    </span>
                    <span className="flex items-center gap-2 text-sm text-muted-foreground transition-colors group-hover:text-brand">
                      {social.handle}
                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
