import Link from "next/link";

import { nav, site, socials } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="grain relative border-t border-ink-line/40 bg-ink text-mist/70">
      <div className="mx-auto w-full max-w-6xl px-6 py-10 lg:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-base text-mist">{site.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-mist/60">{site.role}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-3 inline-block text-sm text-brand-bright transition-colors duration-150 hover:text-mist"
            >
              {site.email}
            </a>
          </div>

          <div className="flex gap-12">
            <div>
              <p className="text-xs tracking-[0.18em] text-mist/40 uppercase">Site</p>
              <ul className="mt-3 space-y-1.5">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-mist/70 transition-colors duration-150 hover:text-brand-bright"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs tracking-[0.18em] text-mist/40 uppercase">
                Elsewhere
              </p>
              <ul className="mt-3 space-y-1.5">
                {socials.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-sm text-mist/70 transition-colors duration-150 hover:text-brand-bright"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-ink-line/50 pt-5 text-xs text-mist/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p>{site.location}</p>
        </div>
      </div>
    </footer>
  );
}
