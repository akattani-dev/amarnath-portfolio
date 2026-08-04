import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";

export const CATEGORIES = [
  "AI Agents & Automation",
  "Developer Productivity Tools",
  "Integration Architecture",
  "Career Growth in Tech",
  "Community & Public Speaking",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type Frontmatter = {
  title: string;
  description: string;
  /** ISO date string. */
  date: string;
  category: Category;
  published: boolean;
};

export type PostMeta = Frontmatter & {
  slug: string;
};

export type Post = PostMeta & {
  content: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function isCategory(value: unknown): value is Category {
  return CATEGORIES.includes(value as Category);
}

function parseFrontmatter(slug: string, data: Record<string, unknown>): Frontmatter {
  const { title, description, date, category, published } = data;

  if (typeof title !== "string" || title.length === 0) {
    throw new Error(`Post "${slug}" is missing a title.`);
  }
  if (typeof description !== "string" || description.length === 0) {
    throw new Error(`Post "${slug}" is missing a description.`);
  }
  if (typeof date !== "string" && !(date instanceof Date)) {
    throw new Error(`Post "${slug}" is missing an ISO date.`);
  }
  if (!isCategory(category)) {
    throw new Error(
      `Post "${slug}" has category "${String(category)}", which is not one of: ${CATEGORIES.join(", ")}.`
    );
  }

  return {
    title,
    description,
    date: date instanceof Date ? date.toISOString() : date,
    category,
    published: published !== false,
  };
}

async function readPostFiles(): Promise<string[]> {
  try {
    const entries = await fs.readdir(BLOG_DIR);
    return entries.filter((entry) => entry.endsWith(".mdx"));
  } catch {
    return [];
  }
}

export const getPost = cache(async (slug: string): Promise<Post | null> => {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  let raw: string;
  try {
    raw = await fs.readFile(filePath, "utf8");
  } catch {
    return null;
  }

  const { data, content } = matter(raw);
  return { slug, content, ...parseFrontmatter(slug, data) };
});

export const listPosts = cache(async (): Promise<PostMeta[]> => {
  const files = await readPostFiles();

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const post = await getPost(slug);
      if (!post) return null;

      return {
        slug: post.slug,
        title: post.title,
        description: post.description,
        date: post.date,
        category: post.category,
        published: post.published,
      } satisfies PostMeta;
    })
  );

  return posts
    .filter((post): post is PostMeta => post !== null && post.published)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
});

export function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

export function readingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}
