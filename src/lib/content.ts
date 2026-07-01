import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogMeta, WorkMeta, ContentMeta } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

function readMdxFiles(dir: string) {
  const fullPath = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(fullPath)) return [];
  return fs
    .readdirSync(fullPath)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(fullPath, f), "utf-8");
      const { data } = matter(raw);
      const slug = f.replace(/\.mdx$/, "");
      return { ...data, slug } as BlogMeta & WorkMeta & { slug: string };
    });
}

export function getBlogs(): BlogMeta[] {
  return readMdxFiles("blogs")
    .sort(
      (a, b) =>
        new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
    );
}

export function getWorks(): WorkMeta[] {
  return readMdxFiles("works")
    .sort(
      (a, b) =>
        new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
    );
}

export function getBlogBySlug(slug: string): BlogMeta | undefined {
  return getBlogs().find((b) => b.slug === slug);
}

export function getWorkBySlug(slug: string): WorkMeta | undefined {
  return getWorks().find((w) => w.slug === slug);
}

export function getBlogSeries(series: string): BlogMeta[] {
  return getBlogs()
    .filter((b) => b.series === series)
    .sort((a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0));
}

export function getTags(items: ContentMeta[]): { tag: string; count: number }[] {
  const tagMap = new Map<string, number>();
  for (const item of items) {
    for (const tag of item.tags || []) {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    }
  }
  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}
