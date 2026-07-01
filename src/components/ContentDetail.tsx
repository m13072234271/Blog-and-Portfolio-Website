"use client";

import { useRouter } from "next/navigation";
import TagList from "@/components/TagList";

interface Props {
  title: string;
  date: string;
  tags: string[];
  children: React.ReactNode;
}

export default function ContentDetail({
  title,
  date,
  tags,
  children,
}: Props) {
  const router = useRouter();

  return (
    <article className="max-w-4xl mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold text-white mb-3">{title}</h1>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <time className="text-sm text-white/70">{date}</time>
        {tags && tags.length > 0 && (
          <>
            <span className="text-white/40">·</span>
            <TagList tags={tags} />
          </>
        )}
      </div>
      <hr className="mb-8 border-white/15" />
      {children}
      <hr className="my-8 border-white/15" />
      <div className="flex items-center gap-4 text-sm">
        <button
          onClick={() => router.back()}
          className="text-white/70 hover:text-white transition-colors"
        >
          ← 返回列表
        </button>
      </div>
    </article>
  );
}
