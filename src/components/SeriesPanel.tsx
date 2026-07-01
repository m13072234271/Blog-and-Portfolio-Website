"use client";

import Link from "next/link";
import { useSeries } from "@/contexts/series";

export default function SeriesPanel() {
  const { seriesName, seriesArticles, currentSlug } = useSeries();

  return (
    <div>
       <div className="text-sm uppercase tracking-wider text-white/50 mb-3 px-1">
        系列文章
      </div>
      <div className="text-base font-semibold text-white/90 mb-3 px-1">
        {seriesName}
      </div>
      {seriesArticles && seriesArticles.length > 0 ? (
        <div className="space-y-0.5">
          {seriesArticles.map((blog, idx) => {
            const isActive = blog.slug === currentSlug;
            return (
              <Link
                key={blog.slug}
                href={`/blogs/${blog.slug}`}
                className={`block text-base py-2 px-2 rounded-lg border-l-[3px] transition-all duration-200 ${
                  isActive
                    ? "bg-white/15 text-white font-medium border-l-white/60"
                    : "text-white/60 hover:text-white/85 hover:bg-white/5 border-l-transparent"
                }`}
              >
                <span className="text-white/40 text-sm mr-1.5">
                  {idx + 1}.
                </span>
                {blog.title}
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-base text-white/50 px-1">暂无系列文章</p>
      )}
    </div>
  );
}
