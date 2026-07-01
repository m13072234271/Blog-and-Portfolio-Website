"use client";

import { useState, useEffect } from "react";
import TagBar from "@/components/TagBar";
import BlogCard from "@/components/BlogCard";
import WorkCard from "@/components/WorkCard";
import { restoreScrollPos } from "@/lib/scroll";
import type { BlogMeta, WorkMeta } from "@/lib/types";

interface BaseProps {
  tags: { tag: string; count: number }[];
  title: string;
  emptyText: string;
}

interface BlogProps extends BaseProps {
  type: "blog";
  items: BlogMeta[];
}

interface WorkProps extends BaseProps {
  type: "work";
  items: WorkMeta[];
}

type Props = BlogProps | WorkProps;

export default function ContentList(props: Props) {
  const { items, tags, title, emptyText, type } = props;
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => { restoreScrollPos(); }, []);

  const filtered = activeTag
    ? items.filter((item: any) => item.tags?.includes(activeTag))
    : items;

  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      <h1 className="text-2xl font-bold text-white mb-6 tracking-tight">
        {title}
      </h1>
      <div className="mb-6">
        <TagBar tags={tags} activeTag={activeTag} onChange={setActiveTag} />
      </div>
      {type === "blog" ? (
        <div className="space-y-3">
          {filtered.map((item, i) => (
            <BlogCard key={i} item={item} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((item, i) => (
            <WorkCard key={i} item={item} />
          ))}
        </div>
      )}
      {filtered.length === 0 && (
        <p className="text-sm text-white/50 text-center py-16">{emptyText}</p>
      )}
    </div>
  );
}
