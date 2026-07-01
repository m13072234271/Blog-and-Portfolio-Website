"use client";

import Link from "next/link";
import TagList from "@/components/TagList";
import { saveScrollPos } from "@/lib/scroll";
import type { WorkMeta } from "@/lib/types";

interface WorkCardProps {
  item: WorkMeta;
}

export default function WorkCard({ item }: WorkCardProps) {
  const work = item;
  return (
    <Link
      href={`/works/${work.slug}`}
      onClick={saveScrollPos}
      className="block rounded-xl border border-white/15 hover:border-white/30 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 backdrop-blur-md bg-white/10 overflow-hidden transition-all duration-300"
    >
      <div className="aspect-video bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center text-4xl">
        <span className="opacity-50">&#x1f4e6;</span>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-white/90">
          {work.title}
        </h3>
        {work.excerpt && (
          <p className="text-xs text-white/70 mt-1.5 line-clamp-2 leading-relaxed">
            {work.excerpt}
          </p>
        )}
        {work.tags && work.tags.length > 0 && (
          <div className="mt-2.5">
            <TagList tags={work.tags} />
          </div>
        )}
      </div>
    </Link>
  );
}
