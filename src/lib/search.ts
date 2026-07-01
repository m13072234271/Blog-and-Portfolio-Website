"use server";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface SearchResult {
  title: string;
  excerpt: string;
  href: string;
  type: "blog" | "work";
}

const CONTENT_DIR = path.join(process.cwd(), "content");

function searchDir(
  dir: string,
  type: "blog" | "work",
  query: string
): SearchResult[] {
  const fullPath = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(fullPath)) return [];

  const q = query.toLowerCase();
  const results: SearchResult[] = [];

  for (const f of fs.readdirSync(fullPath)) {
    if (!f.endsWith(".mdx")) continue;
    const raw = fs.readFileSync(path.join(fullPath, f), "utf-8");
    const { data, content } = matter(raw);
    const slug = f.replace(/\.mdx$/, "");

    const title = (data.title as string) || "";
    const excerpt = (data.excerpt as string) || "";
    const tags = (data.tags as string[]) || [];

    const searchText = [title, excerpt, ...tags, content].join(" ").toLowerCase();
    if (searchText.includes(q)) {
      results.push({
        title,
        excerpt: excerpt || "",
        href: `/${dir}/${slug}`,
        type,
      });
    }
  }

  return results;
}

export async function searchContent(query: string): Promise<SearchResult[]> {
  if (!query || query.trim().length === 0) return [];

  const q = query.trim();

  const blogs = searchDir("blogs", "blog", q);
  const works = searchDir("works", "work", q);

  return [...blogs, ...works].slice(0, 8);
}
