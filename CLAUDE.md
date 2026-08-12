# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this is

Personal site and blog for Amarnath Kattani at akattani.com: a marketing/portfolio home page (Hero, About, Work, Experience, Contact) plus an MDX-in-repo blog at `/blog`. No CMS — blog posts are `.mdx` files that version alongside the code. Portfolio copy lives in one data file rather than being scattered across components.

## Commands

```bash
npm run dev      # start dev server (Turbopack, on by default in Next 16)
npm run build    # production build
npm start        # serve the production build
npm run lint     # eslint (flat config)
npx tsc --noEmit # typecheck
```

There is no test suite. Node.js 20.9+ is required (Next.js 16 minimum).

## Next.js 16: this is not the Next.js you know

This repo runs Next.js 16 with React 19.2. Before writing framework-touching code (data fetching, params/searchParams, image config, caching, routing files), check `node_modules/next/dist/docs/` — training data almost certainly predates these changes. Relevant to this codebase specifically:

- **Async Request APIs are mandatory, not transitional.** `params`, `searchParams`, `cookies()`, `headers()` are Promises with no sync fallback. See the pattern already used in `src/app/blog/[slug]/page.tsx` (`params: Promise<{ slug: string }>`, `await params`) and follow it for any new dynamic route.
- **Turbopack is the default** for both `next dev` and `next build` — no `--turbopack` flag needed, and a webpack config (there isn't one here) would need `--webpack` to opt back in.
- **`next lint` is gone.** Lint via the ESLint CLI (`npm run lint` / `npx eslint`), which is already how `package.json` is set up.
- **`middleware` → `proxy`.** If routing/edge logic is ever added, the file and export are named `proxy`, not `middleware`; there is no `edge` runtime for it.
- Full migration notes: `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`.

## Architecture

**Content is data, not markup.** `src/content/site.ts` holds every string on the home page — hero copy, about paragraphs, certifications, project cards, experience roles, education, contact info, nav, and social links — typed with exported interfaces (`Project`, `Role`, `Education`, etc.). Section components (`src/components/sections/*`) import from this file and render it; they hold no copy of their own. When asked to change site content, edit `site.ts`, not the components.

**Blog pipeline (`src/lib/blog.ts`):**

- Posts are `.mdx` files in `content/blog/`; the filename is the slug (`content/blog/foo.mdx` → `/blog/foo`).
- `CATEGORIES` is a fixed 5-value enum enforced at build time — an unrecognized `category` in frontmatter throws, as does a missing `title`/`description`/`date`. This is intentional: a malformed post must fail the build, not ship silently.
- `published: false` (frontmatter) excludes a post from `listPosts()`, the sitemap, and the index; it also 404s directly, since `dynamicParams = false` in `src/app/blog/[slug]/page.tsx` means only slugs from `generateStaticParams()` (which only includes published posts) are servable.
- `getPost`/`listPosts` are wrapped in React's `cache()` — per-request memoization, not cross-request.
- Rendering goes through `next-mdx-remote/rsc` with `remark-gfm`; custom MDX component overrides (link handling, syntax-highlighted code via `sugar-high`, zoomable images) live in `src/components/mdx-components.tsx`.

**The site is dark-only.** There is no theme toggle and no `next-themes`; `class="dark"` is pinned on `<html>` in `src/app/layout.tsx` purely so shadcn's own `dark:` rules keep matching. Don't reintroduce a light path.

**Styling is token-driven, not utility-scattered.** `src/app/globals.css` defines the whole palette as CSS custom properties in one `:root` block: a "canvas ramp" (`--ink`/`--ink-2`/`--ink-3`/`--ink-line`/`--mist`/`--mist-2`) that full-bleed sections paint onto, shadcn semantic aliases (`--background`, `--card`, `--muted`, `--border`, `--ring`…) derived from that ramp, and an "accent block" that is the *only* place a hue is introduced: `--brand` (cyan, primary interactive), `--brand-magenta`, `--brand-red` and `--sage`, each with a `-soft` companion. Don't hardcode colors in components; add or consume CSS variables instead.

**Comic utility classes carry the Spider-Verse language.** `globals.css` ships `.halftone`, `.grain`, `.dot-grid`, `.panel-cut`, `.panel-shadow`, `.misreg-frame`, `.rgb-offset`/`.chromatic`, `.display-pop`, `.display-outline`, `.comic-tab`, `.comic-slash`, `.portrait-frame` and `.project-card` — the comment block above them is the index, including the custom property each one is tuned through. They live in `@layer components`, so Tailwind utilities always win over them. Compose these rather than hand-rolling effects, and register any new hover/transition in the `prefers-reduced-motion` block at the bottom of the file.

**Motion is intentionally scoped to the home page.** `src/components/motion/` (`FadeIn`, `ScaleUnblur`) provides the only entrance/scroll-reveal primitives; blog post pages are static so reading isn't interrupted. Both primitives ship their entrance state as an inline style and rely on `[data-motion-primitive]` rules in `globals.css` to restore visibility under `prefers-reduced-motion: reduce` or `@media (scripting: none)` — any new motion primitive must follow the same fallback pattern or it will leave content invisible for those users/no-JS cases.

**shadcn/ui components** (`src/components/ui/`) are managed via `components.json` (style `radix-nova`, base color `neutral`, icon library `lucide`). Use the `shadcn` MCP server (configured in `.cursor/mcp.json`) or the `shadcn` CLI to add components rather than hand-rolling primitives — aliases are `@/components`, `@/components/ui`, `@/lib`, `@/hooks`.

## Editing content (see README.md for full detail)

- Portfolio copy: `src/content/site.ts`.
- New blog post: add `content/blog/<slug>.mdx` with frontmatter (`title`, `description`, `date`, `category` — one of the 5 in `src/lib/blog.ts`, `tags?`, `published?`). Posts are prerendered at build time; publishing is commit → push → Vercel deploy.
- Theme tokens: `src/app/globals.css`.
