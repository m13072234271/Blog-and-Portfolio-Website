"use client";

interface Props {
  tags: { tag: string; count?: number }[];
  activeTag: string | null;
  onChange: (tag: string | null) => void;
}

export default function TagBar({ tags, activeTag, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange(null)}
        className={`text-xs px-3 py-1.5 rounded-full transition-all duration-200 ${
          activeTag === null
            ? "bg-white/20 text-white shadow-sm"
            : "bg-white/10 text-white/60 hover:bg-white/15 hover:text-white/80"
          }`}
      >
        全部
      </button>
      {tags.map(({ tag }) => (
        <button
          key={tag}
          onClick={() => onChange(activeTag === tag ? null : tag)}
          className={`text-xs px-3 py-1.5 rounded-full transition-all duration-200 ${
            activeTag === tag
              ? "bg-white/25 text-white shadow-sm"
              : "bg-white/10 text-white/60 hover:bg-white/15 hover:text-white/80"
          }`}
        >
          #{tag}
        </button>
      ))}
    </div>
  );
}
