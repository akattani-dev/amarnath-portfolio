import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import {
  CATEGORIES,
  formatPostDateShort,
  formatReadingTime,
  listPosts,
  type PostMeta,
} from "@/lib/blog";
import { cn } from "@/lib/utils";

/** Enough to establish the shelf; the rest live on /blog. */
const COVERS_ON_HOME = 3;

/** Cycled across covers. `bg-current` picks the same hue up for the rule. */
const ISSUE_ACCENTS = [
  "text-brand",
  "text-brand-magenta",
  "text-brand-red",
] as const;

const issueNumber = (issue: number) => String(issue).padStart(2, "0");

function IssueCover({ post, issue }: { post: PostMeta; issue: number }) {
  const accent = ISSUE_ACCENTS[(issue - 1) % ISSUE_ACCENTS.length];

  return (
    <li>
      <Link
        href={`/blog/${post.slug}`}
        className="misreg-frame misreg-frame-sm misreg-frame-hover group flex h-full flex-col bg-ink-2 p-5"
      >
        <div className={cn("flex items-center justify-between gap-3", accent)}>
          <span className="font-display text-[0.7rem] tracking-[0.24em] uppercase">
            Issue #{issueNumber(issue)}
          </span>
          <span aria-hidden className="plate-mark plate-mark-sm" />
        </div>

        <h3 className="chromatic mt-4 font-display text-lg leading-[1.25] tracking-tight text-foreground">
          {post.title}
        </h3>

        <p className="mt-2.5 line-clamp-3 text-sm leading-[1.6] text-mist-2">
          {post.description}
        </p>

        <div className="mt-4">
          <Badge
            variant="outline"
            className="h-auto rounded-none border-ink-line bg-ink-3/70 px-2 py-1 text-[0.7rem] font-normal whitespace-normal text-mist-2"
          >
            {post.category}
          </Badge>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-[0.7rem] text-mist-2">
          <time dateTime={post.date}>{formatPostDateShort(post.date)}</time>
          <span>{formatReadingTime(post.readingMinutes)}</span>
        </div>
      </Link>
    </li>
  );
}

/**
 * What actually renders today — both posts in `content/blog` are unpublished,
 * so `listPosts()` returns nothing. The copy is the same pair of lines the
 * /blog index shows in the same state, and the contents list is the real
 * `CATEGORIES` enum rather than an invented roadmap.
 */
function EmptyIssue() {
  return (
    <div className="misreg-frame relative bg-ink-2 p-7 [--misreg-x:6px] [--misreg-y:6px] sm:p-10 lg:p-12">
      <div
        aria-hidden
        className="halftone halftone-magenta absolute inset-0 [--halftone-opacity:0.18]"
      />

      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
        <div>
          <span className="comic-tab comic-tab-magenta pointer-events-none text-[0.7rem] text-mist-2">
            Issue #01 — in progress
          </span>

          <h3 className="display-pop mt-7 text-[clamp(2.25rem,5.5vw,3.5rem)] text-foreground">
            Writing soon
          </h3>

          <p className="mt-5 max-w-[46ch] leading-[1.75] text-mist-2">
            The first pieces are being drafted, and will appear here as they
            land.
          </p>

          <Link href="/blog" className="comic-tab comic-tab-solid mt-8">
            Visit the blog
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <div className="border-t border-ink-line pt-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-14">
          <h3 className="font-display text-xs tracking-[0.28em] text-mist-2 uppercase">
            Categories
          </h3>

          <ol className="mt-4">
            {CATEGORIES.map((category, index) => (
              <li
                key={category}
                className="flex items-baseline gap-3 border-b border-ink-line/70 py-2.5 last:border-b-0"
              >
                <span className="font-display text-[0.7rem] text-brand tabular-nums">
                  {issueNumber(index + 1)}
                </span>
                <span className="font-display text-sm leading-snug tracking-[0.04em] text-foreground/80 uppercase">
                  {category}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export async function Blog() {
  const posts = await listPosts();

  return (
    <section id="writing" className="scroll-mt-24">
      <FadeIn>
        <SectionHeading
          index="04"
          label="Blog"
          title="Notes from the line between integration and agents"
        />
      </FadeIn>

      <FadeIn delay={0.08} className="mt-10">
        {posts.length === 0 ? (
          <EmptyIssue />
        ) : (
          <>
            <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {posts.slice(0, COVERS_ON_HOME).map((post, index) => (
                // Newest post carries the highest number, the way a run of
                // issues actually reads.
                <IssueCover
                  key={post.slug}
                  post={post}
                  issue={posts.length - index}
                />
              ))}
            </ul>

            <div className="mt-9 flex justify-end">
              <Link href="/blog" className="comic-tab">
                All writing
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </>
        )}
      </FadeIn>
    </section>
  );
}
