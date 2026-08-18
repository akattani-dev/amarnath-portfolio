import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { writing } from "@/content/site";
import {
  formatPostDateShort,
  formatReadingTime,
  listPosts,
  type PostMeta,
} from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing on enterprise integration, developer tooling and agentic AI, plus the MuleSoft back catalogue on Medium.",
  alternates: { canonical: "/blog" },
};

const VISIBLE_BADGES = 3;

const LABEL_BADGE =
  "h-auto rounded-none border-ink-line bg-ink-3/70 px-2 py-1 text-[0.7rem] font-normal whitespace-normal text-mist-2";

const INLINE_LINK =
  "text-brand underline decoration-brand/35 underline-offset-4 transition-colors duration-150 hover:decoration-brand";

function PostRow({ post }: { post: PostMeta }) {
  const labels = [post.category, ...post.tags];
  const shown = labels.slice(0, VISIBLE_BADGES);
  const overflow = labels.length - shown.length;

  return (
    <li>
      <Link
        href={`/blog/${post.slug}`}
        className="group flex flex-col gap-3 p-5 transition-colors duration-150 hover:bg-ink-3/50 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
      >
        <div className="min-w-0 flex-1">
          {/* Reserved heights keep row rhythm steady whether a title or excerpt
              runs to one line or two. */}
          <h3 className="chromatic min-h-[3rem] font-display text-lg leading-[1.35] tracking-tight text-foreground line-clamp-2">
            {post.title}
          </h3>
          <p className="mt-1 min-h-[2.75rem] text-sm leading-[1.55] text-mist-2 line-clamp-2">
            {post.description}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {shown.map((label) => (
              <Badge key={label} variant="outline" className={LABEL_BADGE}>
                {label}
              </Badge>
            ))}
            {overflow > 0 && (
              <Badge variant="outline" className={LABEL_BADGE}>
                +{overflow}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex shrink-0 flex-row gap-4 text-xs text-mist-2 sm:w-32 sm:flex-col sm:items-end sm:gap-1.5 sm:pt-1">
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

/**
 * What renders today — both posts in `content/blog` are unpublished. It leads
 * with Medium rather than apologising, so the index is not a dead end.
 */
function EmptyState() {
  return (
    <div className="misreg-frame relative bg-ink-2 p-7 sm:p-9">
      <div
        aria-hidden
        className="halftone halftone-magenta absolute inset-0 [--halftone-opacity:0.16]"
      />

      <div className="relative">
        <h3 className="display-pop text-[clamp(1.6rem,4vw,2.25rem)] text-foreground">
          Writing soon
        </h3>

        <p className="mt-5 leading-[1.75] text-mist-2">
          The first pieces are being drafted, and will appear here as they land.
          Until then, {writing.posts.length} earlier posts on DataWeave,
          CloudHub deployments, API design and the Anypoint tooling are on
          Medium.
        </p>

        <a
          href={writing.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="comic-tab comic-tab-solid mt-8"
        >
          Read on Medium
          <ArrowUpRight className="size-4" aria-hidden />
        </a>

        <p className="mt-8 text-sm text-mist-2">
          Or take a look at{" "}
          <Link href="/#work" className={INLINE_LINK}>
            recent work
          </Link>{" "}
          and{" "}
          <Link href="/#contact" className={INLINE_LINK}>
            get in touch
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default async function BlogIndexPage() {
  const posts = await listPosts();

  return (
    // Matches the header and footer container, so the heading starts on the
    // same left edge as the logo above it.
    <div className="mx-auto w-full max-w-6xl px-6 pt-28 pb-20 lg:px-10 lg:pt-32 lg:pb-24">
      <SectionHeading
        as="h1"
        index="04"
        label="Writing"
        title="Writing on integration, tooling and agents"
      />

      {/* The shell is the chrome's width; the copy below keeps its own
          reading measure inside it. */}
      <p className="mt-6 max-w-[44rem] leading-[1.7] text-mist-2">
        Short pieces on enterprise integration, developer tooling and how
        technical work is changing shape under agents. Posts here are written in
        the open and versioned with the site.
      </p>

      <div className="mt-10 max-w-[44rem]">
        {posts.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <ul className="misreg-frame divide-y divide-ink-line bg-ink-2">
              {posts.map((post) => (
                <PostRow key={post.slug} post={post} />
              ))}
            </ul>

            {/* Carries the Medium link once the empty state, which holds the
                only other one, stops rendering. */}
            <div className="mt-7 flex justify-end">
              <a
                href={writing.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="comic-tab comic-tab-magenta"
              >
                All {writing.posts.length} on Medium
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
