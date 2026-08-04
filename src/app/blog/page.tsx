import type { Metadata } from "next";
import Link from "next/link";

import { CATEGORIES, formatPostDate, listPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on agentic AI, enterprise integration, developer tooling, and the shape of technical work.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndexPage() {
  const posts = await listPosts();

  return (
    <div className="mx-auto w-full max-w-4xl px-6 pt-36 pb-24 lg:px-10 lg:pt-44 lg:pb-32">
      <header className="max-w-2xl">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-brand" />
          <span className="text-xs tracking-[0.22em] text-muted-foreground uppercase">
            Writing
          </span>
        </div>
        <h1 className="mt-6 font-display text-4xl leading-[1.05] tracking-[-0.02em] text-ink text-balance sm:text-5xl">
          Notes from the line between integration and agents
        </h1>
        <p className="mt-5 text-[1.05rem] leading-[1.75] text-foreground/80">
          Short pieces on agentic AI, enterprise integration, developer tooling and
          how technical work is changing shape. Written in the open, versioned with
          the site.
        </p>
      </header>

      <div className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-y border-border py-4">
        {CATEGORIES.map((category) => (
          <span key={category} className="text-xs text-muted-foreground">
            {category}
          </span>
        ))}
      </div>

      {posts.length === 0 ? (
        <p className="mt-16 text-muted-foreground">
          No posts published yet — first one is on the way.
        </p>
      ) : (
        <ul className="mt-4">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-border">
              <Link href={`/blog/${post.slug}`} className="group block py-8">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  <span className="h-3 w-px bg-border" />
                  <span className="tracking-[0.1em] uppercase">{post.category}</span>
                </div>
                <h2 className="mt-3 font-display text-2xl leading-tight tracking-tight text-ink transition-colors group-hover:text-brand">
                  {post.title}
                </h2>
                <p className="mt-2.5 max-w-2xl leading-[1.7] text-foreground/75">
                  {post.description}
                </p>
                <span className="mt-4 inline-block text-sm text-brand opacity-0 transition-opacity group-hover:opacity-100">
                  Read →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
