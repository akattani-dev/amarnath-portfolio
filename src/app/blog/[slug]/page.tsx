import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { mdxComponents } from "@/components/mdx-components";
import { Separator } from "@/components/ui/separator";
import { site, socials } from "@/content/site";
import { formatPostDate, getPost, listPosts, readingTime } from "@/lib/blog";

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

  return (
    <article className="mx-auto w-full max-w-2xl px-6 pt-32 pb-24 lg:pt-40 lg:pb-32">
      <Link
        href="/blog"
        className="text-sm text-muted-foreground transition-colors hover:text-brand"
      >
        ← All writing
      </Link>

      <header className="mt-10">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span className="h-3 w-px bg-border" />
          <span className="tracking-[0.1em] uppercase">{post.category}</span>
          <span className="h-3 w-px bg-border" />
          <span>{readingTime(post.content)}</span>
        </div>
        <h1 className="mt-5 font-display text-3xl leading-[1.12] tracking-[-0.02em] text-ink text-balance sm:text-[2.6rem]">
          {post.title}
        </h1>
        <p className="mt-5 text-lg leading-[1.7] text-muted-foreground">
          {post.description}
        </p>
      </header>

      <Separator className="my-10" />

      <div className="prose prose-ink max-w-none prose-headings:font-display prose-headings:tracking-tight prose-p:leading-[1.8] prose-li:leading-[1.8]">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>

      <footer className="mt-16 border-t border-border pt-8">
        <p className="text-sm text-muted-foreground">
          Written by {site.name}. Say hello on{" "}
          {socials.map((social, index) => (
            <span key={social.href}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-brand underline decoration-brand/35 underline-offset-4 transition-colors hover:decoration-brand"
              >
                {social.label}
              </a>
              {index < socials.length - 2 ? ", " : null}
              {index === socials.length - 2 ? " or " : null}
            </span>
          ))}
          .
        </p>
      </footer>
    </article>
  );
}
