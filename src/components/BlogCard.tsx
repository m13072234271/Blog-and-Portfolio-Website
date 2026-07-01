"use client";

import Link from "next/link";
import TagList from "@/components/TagList";
import { saveScrollPos } from "@/lib/scroll";
import type { BlogMeta } from "@/lib/types";

interface BlogCardProps {
  item: BlogMeta;
}

export default function BlogCard({ item }: BlogCardProps) {
  return (
    <Link
      href={`/blogs/${item.slug}`}
      onClick={saveScrollPos}
      className="block p-5 rounded-xl border border-white/15 hover:border-white/30 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 backdrop-blur-md bg-white/10 transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-semibold text-white/90 leading-snug">
          {item.title}
        </h3>
        <time className="text-xs text-white/60 whitespace-nowrap mt-0.5">
          {item.date}
        </time>
      </div>
      {item.excerpt && (
        <p className="text-sm text-white/70 mt-2 line-clamp-2 leading-relaxed">
          {item.excerpt}
        </p>
      )}
      {item.tags && item.tags.length > 0 && (
        <div className="mt-3">
          <TagList tags={item.tags} />
        </div>
      )}
    </Link>
  );
}
