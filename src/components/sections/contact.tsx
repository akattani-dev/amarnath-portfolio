import { ArrowUpRight } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { contact, socials } from "@/content/site";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20">
      <SectionHeading index="04" label="Contact" title="Let's talk" />

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-14">
        <div>
          <p className="max-w-[34ch] leading-[1.7] text-foreground/85">{contact.lead}</p>
          <Button
            asChild
            className="mt-6 h-11 rounded-md px-5 text-sm transition-colors duration-150"
          >
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </Button>
        </div>

        <ul className="border-t border-border self-start">
          {socials.map((social) => (
            <li key={social.href} className="border-b border-border">
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center justify-between gap-4 py-3"
              >
                <span className="font-display text-base tracking-tight text-foreground transition-colors duration-150 group-hover:text-brand">
                  {social.label}
                </span>
                <span className="flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-150 group-hover:text-brand">
                  {social.handle}
                  <ArrowUpRight className="size-4" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
