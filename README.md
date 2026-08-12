# akattani.com

Personal site and blog for Amarnath Kattani — Senior Technical Consultant,
Integration Architect, Agentic AI.

Portfolio home (Hero, About, Work, Experience, Contact) plus an MDX-in-repo blog
at `/blog`. No CMS: posts are `.mdx` files that version alongside the code.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript, Turbopack) |
| Styling | Tailwind CSS v4 + `@tailwindcss/typography` |
| Components | shadcn/ui — Button, Sheet, Badge, Separator |
| Motion | Framer Motion (home page only) |
| Content | `next-mdx-remote/rsc` + `gray-matter` |
| Hosting | Vercel |

## Running locally

Requires Node.js 20.9+.

```bash
npm install
npm run dev
```

The dev server prints its URL (http://localhost:3000 unless the port is taken).

```bash
npm run build   # production build
npm start       # serve the production build
npx eslint .    # lint
npx tsc --noEmit # typecheck
```

## Editing content

**Portfolio copy** — everything on the home page lives in
[`src/content/site.ts`](src/content/site.ts): hero text, about paragraphs and
lists, projects, roles, education, contact details and social links. Change the
data, not the components.

**Theme** — ink/teal tokens, fonts and `prose` styles are in
[`src/app/globals.css`](src/app/globals.css). Brand colours are the `--ink*`,
`--mist*` and `--brand*` custom properties; shadcn's tokens are mapped onto them
so components stay on-palette.

## Writing a blog post

Add a file to [`content/blog/`](content/blog/). The filename becomes the URL:
`content/blog/my-post.mdx` → `/blog/my-post`.

```mdx
---
title: "Post title"
description: "One or two sentences used on the index page and for SEO."
date: "2026-08-04"
category: "AI Agents & Automation"
published: true
---

Body copy in Markdown / MDX.
```

`category` must be one of the five values in
[`src/lib/blog.ts`](src/lib/blog.ts):

- AI Agents & Automation
- Developer Productivity Tools
- Integration Architecture
- Career Growth in Tech
- Community & Public Speaking

The build fails loudly on a missing title, description, date, or an unrecognised
category — so a malformed post cannot ship silently. Set `published: false` to
keep a draft in the repo but out of the index, the sitemap and the build.

Posts are prerendered at build time, so publishing is: commit, push, Vercel
deploys.

## Project layout

```
content/blog/           # MDX posts
src/app/                # routes: /, /blog, /blog/[slug], sitemap, robots
src/components/         # header, footer, sections/, motion/, ui/ (shadcn)
src/content/site.ts     # all portfolio copy
src/lib/blog.ts         # listPosts / getPost + frontmatter validation
public/images/           # hero-spiderverse.jpg (hero portrait)
public/logos/            # company marks used by the experience timeline
```

## Notes

- Motion is deliberately limited to the home page (hero entrance and section
  reveals). Post pages stay static so reading is not interrupted.
- `prefers-reduced-motion` is respected, and reveals fall back to visible when
  scripting is unavailable.
