import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ArrowRight, CalendarDays, Clock } from "lucide-react";

import { mdxComponents } from "@/components/mdx-components";
import { Badge } from "@/components/ui/badge";
import { site, socials } from "@/content/site";
import {
  formatPostDate,
  formatPostDateShort,
  formatReadingTime,
  getPost,
  listPosts,
} from "@/lib/blog";

export const dynamicParams = false;

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await listPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${site.url}/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [site.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post || !post.published) {
    notFound();
  }

  const labels = [post.category, ...post.tags];

  return (
    <article className="mx-auto w-full max-w-[44rem] px-6 pt-28 pb-20 lg:pt-32 lg:pb-24">
      <Link
        href="/blog"
        className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-150 hover:text-brand"
      >
        <ArrowLeft className="size-4 transition-transform duration-150 group-hover:-translate-x-0.5" />
        All writing
      </Link>

      <header className="mt-8">
        <h1 className="font-display text-3xl leading-[1.12] tracking-[-0.02em] text-foreground text-balance sm:text-[2.4rem]">
          {post.title}
        </h1>

        <p className="mt-4 text-lg leading-[1.6] text-muted-foreground">
          {post.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-border py-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-3.5" aria-hidden />
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5" aria-hidden />
            {formatReadingTime(post.readingMinutes)}
          </span>
          <span className="ml-auto flex flex-wrap gap-1.5">
            {labels.map((label) => (
              <Badge
                key={label}
                variant="secondary"
                className="rounded-md px-2 py-0.5 text-[0.7rem] font-normal"
              >
                {label}
              </Badge>
            ))}
          </span>
        </div>
      </header>

      <div className="prose prose-lg prose-ink mt-10 max-w-none prose-headings:font-display prose-headings:tracking-tight prose-p:text-[1.125rem] prose-p:leading-8 prose-li:text-[1.125rem] prose-li:leading-8">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      <footer className="mt-14 border-t border-border pt-6">
        <p className="text-sm text-muted-foreground">
          Written by {site.name}. Say hello on{" "}
          {socials.map((social, index) => (
            <span key={social.href}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-brand underline decoration-brand/35 underline-offset-4 transition-colors duration-150 hover:decoration-brand"
              >
                {social.label}
              </a>
              {index < socials.length - 2 ? ", " : null}
              {index === socials.length - 2 ? " or " : null}
            </span>
          ))}
          .
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>Published {formatPostDateShort(post.date)}</span>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 transition-colors duration-150 hover:text-brand"
          >
            More posts
            <ArrowRight className="size-4 transition-transform duration-150 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </footer>
    </article>
  );
}
