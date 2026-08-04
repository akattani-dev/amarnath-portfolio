import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  formatPostDateShort,
  formatReadingTime,
  listPosts,
  type PostMeta,
} from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on agentic AI, enterprise integration, developer tooling, and the shape of technical work.",
  alternates: { canonical: "/blog" },
};

const VISIBLE_BADGES = 3;

function PostRow({ post }: { post: PostMeta }) {
  const labels = [post.category, ...post.tags];
  const shown = labels.slice(0, VISIBLE_BADGES);
  const overflow = labels.length - shown.length;

  return (
    <li>
      <Link
        href={`/blog/${post.slug}`}
        className="group flex flex-col gap-3 p-5 transition-colors duration-150 hover:bg-muted/60 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
      >
        <div className="min-w-0 flex-1">
          {/* Reserved heights keep row rhythm steady whether a title or excerpt
              runs to one line or two. */}
          <h2 className="min-h-[3rem] font-display text-lg leading-[1.35] tracking-tight text-foreground line-clamp-2 transition-colors duration-150 group-hover:text-brand">
            {post.title}
          </h2>
          <p className="mt-1 min-h-[2.75rem] text-sm leading-[1.55] text-muted-foreground line-clamp-2">
            {post.description}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {shown.map((label) => (
              <Badge
                key={label}
                variant="secondary"
                className="rounded-md px-2 py-0.5 text-[0.7rem] font-normal"
              >
                {label}
              </Badge>
            ))}
            {overflow > 0 && (
              <Badge
                variant="outline"
                className="rounded-md px-2 py-0.5 text-[0.7rem] font-normal text-muted-foreground"
              >
                +{overflow}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex shrink-0 flex-row gap-4 text-xs text-muted-foreground sm:w-32 sm:flex-col sm:items-end sm:gap-1.5 sm:pt-1">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-3.5" aria-hidden />
            <time dateTime={post.date}>{formatPostDateShort(post.date)}</time>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5" aria-hidden />
            {formatReadingTime(post.readingMinutes)}
          </span>
        </div>
      </Link>
    </li>
  );
}

export default async function BlogIndexPage() {
  const posts = await listPosts();

  return (
    <div className="mx-auto w-full max-w-[44rem] px-6 pt-28 pb-20 lg:pt-32 lg:pb-24">
      <header>
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-brand" />
          <span className="text-xs tracking-[0.22em] text-muted-foreground uppercase">
            Writing
          </span>
        </div>
        <h1 className="mt-4 font-display text-3xl leading-[1.1] tracking-[-0.02em] text-foreground text-balance sm:text-4xl">
          Notes from the line between integration and agents
        </h1>
        <p className="mt-4 leading-[1.7] text-muted-foreground">
          Short pieces on agentic AI, enterprise integration, developer tooling and
          how technical work is changing shape. Written in the open, versioned with
          the site.
        </p>
      </header>

      <div className="mt-10 overflow-hidden rounded-xl border border-border">
        {posts.length === 0 ? (
          <div className="p-8">
            <p className="font-display text-xl tracking-tight text-foreground">
              Writing soon
            </p>
            <p className="mt-2.5 leading-[1.7] text-muted-foreground">
              The first pieces are being drafted, and will appear here as they land.
            </p>
            <p className="mt-6 text-sm text-muted-foreground">
              In the meantime, take a look at{" "}
              <Link
                href="/#work"
                className="text-brand underline decoration-brand/35 underline-offset-4 transition-colors duration-150 hover:decoration-brand"
              >
                recent work
              </Link>{" "}
              or{" "}
              <Link
                href="/#contact"
                className="text-brand underline decoration-brand/35 underline-offset-4 transition-colors duration-150 hover:decoration-brand"
              >
                get in touch
              </Link>
              .
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {posts.map((post) => (
              <PostRow key={post.slug} post={post} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
