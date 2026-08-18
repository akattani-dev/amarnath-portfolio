import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { writing } from "@/content/site";
import { formatPostDateShort, formatReadingTime, listPosts } from "@/lib/blog";
import { cn } from "@/lib/utils";

/** Enough to establish a shelf; the rest live on /blog and on Medium. */
const COVERS_ON_HOME = 3;

/** Cycled across covers, keyed off the issue number rather than the shelf. */
const ISSUE_ACCENTS = [
  "text-brand",
  "text-brand-magenta",
  "text-brand-red",
] as const;

const issueNumber = (issue: number) => String(issue).padStart(2, "0");

type CoverProps = {
  issue: number;
  href: string;
  title: string;
  description: string;
  /** ISO, for `<time dateTime>`. */
  date: string;
  /** The category here, the host on Medium. */
  badge: string;
  /** Footer, opposite the date: reading time here, the publication on Medium. */
  meta?: string;
  /** Medium covers leave the site, and say so. */
  external?: boolean;
};

/**
 * The cover chrome, shared by both shelves. Only the wrapping element differs,
 * so `IssueCover` owns the link and this owns everything printed on it.
 */
function CoverBody({
  issue,
  title,
  description,
  date,
  badge,
  meta,
  external,
}: CoverProps) {
  const accent = ISSUE_ACCENTS[(issue - 1) % ISSUE_ACCENTS.length];

  return (
    <>
      <div className={cn("flex items-center justify-between gap-3", accent)}>
        <span className="font-display text-[0.7rem] tracking-[0.24em] uppercase">
          Issue #{issueNumber(issue)}
        </span>
        {external ? (
          <ArrowUpRight className="size-4" aria-hidden />
        ) : (
          <span aria-hidden className="plate-mark plate-mark-sm" />
        )}
      </div>

      <h3 className="chromatic mt-4 font-display text-lg leading-[1.25] tracking-tight text-foreground">
        {title}
        {external && (
          <span className="sr-only"> (opens on Medium in a new tab)</span>
        )}
      </h3>

      <p className="mt-2.5 line-clamp-3 text-sm leading-[1.6] text-mist-2">
        {description}
      </p>

      <div className="mt-4">
        <Badge
          variant="outline"
          className="h-auto rounded-none border-ink-line bg-ink-3/70 px-2 py-1 text-[0.7rem] font-normal whitespace-normal text-mist-2"
        >
          {badge}
        </Badge>
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-[0.7rem] text-mist-2">
        <time dateTime={date} className="shrink-0">
          {formatPostDateShort(date)}
        </time>
        {/* Medium exposes no reading time, so external covers close on the
            publication when they ran in one and on the date alone when not. */}
        {meta && <span className="min-w-0 truncate">{meta}</span>}
      </div>
    </>
  );
}

const COVER_CHROME =
  "misreg-frame misreg-frame-sm misreg-frame-hover group flex h-full flex-col bg-ink-2 p-5";

function IssueCover(props: CoverProps) {
  return (
    <li>
      {props.external ? (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={COVER_CHROME}
        >
          <CoverBody {...props} />
        </a>
      ) : (
        <Link href={props.href} className={COVER_CHROME}>
          <CoverBody {...props} />
        </Link>
      )}
    </li>
  );
}

/** Names a shelf, so the two issue runs below never read as one sequence. */
function ShelfHeading({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4">
      <h3 className="font-display text-[0.6875rem] tracking-[0.2em] text-mist-2 uppercase">
        {label}
      </h3>
      <span aria-hidden className="h-px flex-1 bg-ink-line" />
    </div>
  );
}

const SHELF = "mt-5 grid gap-7 sm:grid-cols-2 lg:grid-cols-3";
const SHELF_LINK = "mt-7 flex justify-end";

export async function Blog() {
  const posts = await listPosts();
  // Both `content/blog` posts are unpublished today, so this shelf renders
  // nothing and Medium carries the section on its own. Publishing them needs
  // no change here.
  const hasInternal = posts.length > 0;

  return (
    <section id="writing" className="scroll-mt-24">
      <FadeIn>
        <SectionHeading
          index="04"
          label="Blog"
          title="Writing on integration, tooling and agents"
        />
      </FadeIn>

      {hasInternal && (
        <FadeIn delay={0.08} className="mt-10">
          <ShelfHeading label="From this site" />

          <ul className={SHELF}>
            {posts.slice(0, COVERS_ON_HOME).map((post, index) => (
              // Newest post carries the highest number, the way a run of
              // issues actually reads.
              <IssueCover
                key={post.slug}
                issue={posts.length - index}
                href={`/blog/${post.slug}`}
                title={post.title}
                description={post.description}
                date={post.date}
                badge={post.category}
                meta={formatReadingTime(post.readingMinutes)}
              />
            ))}
          </ul>

          <div className={SHELF_LINK}>
            <Link href="/blog" className="comic-tab">
              All writing
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </FadeIn>
      )}

      <FadeIn
        delay={hasInternal ? 0.12 : 0.08}
        className={hasInternal ? "mt-14" : "mt-10"}
      >
        <ShelfHeading label="On Medium" />

        <ul className={SHELF}>
          {writing.posts.slice(0, COVERS_ON_HOME).map((post, index) => (
            // Numbered from Medium's own run, so the oldest post is #01 and
            // the newest carries the highest number. Only the newest print.
            <IssueCover
              key={post.href}
              issue={writing.posts.length - index}
              href={post.href}
              title={post.title}
              description={post.description}
              date={post.date}
              badge="Medium"
              meta={post.publication}
              external
            />
          ))}
        </ul>

        <div className={SHELF_LINK}>
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
      </FadeIn>
    </section>
  );
}
