"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { searchContent, type SearchResult } from "@/lib/search";

interface Props {
  query: string;
  onClose: () => void;
  onClear: () => void;
}

export default function SearchResults({ query, onClose, onClear }: Props) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const hasQuery = !!query.trim();

  useEffect(() => {
    if (hasQuery) {
      setVisible(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setShow(true)));
    } else {
      setShow(false);
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [hasQuery]);

  useEffect(() => {
    if (!hasQuery) {
      setResults([]);
      return;
    }
    setLoading(true);
    const timer = setTimeout(async () => {
      const r = await searchContent(query);
      setResults(r);
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [query, hasQuery]);

  useEffect(() => {
    if (!show) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    function onWheel(e: WheelEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClear();
      }
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("wheel", onWheel);
    };
  }, [show, onClose]);

  if (!visible && !hasQuery) return null;

  return (
    <div
      ref={ref}
      data-floating-panel
      className={`fixed z-40 left-1/2 -translate-x-1/2 rounded-2xl backdrop-blur-xl bg-black/30 border border-white/10 shadow-2xl overflow-hidden transition-all duration-300 ${
        show ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-2 pointer-events-none"
      }`}
      style={{ top: 124, width: 480, maxHeight: 400 }}
    >
      <div className="overflow-y-auto p-2 [&::-webkit-scrollbar]:hidden" style={{ maxHeight: 396, scrollbarWidth: "none" }}>
        {loading && (
          <div className="px-4 py-6 text-sm text-white/40 text-center">
            搜索中...
          </div>
        )}
        {!loading && results.length === 0 && (
          <div className="px-4 py-6 text-sm text-white/40 text-center">
            无结果
          </div>
        )}
        {!loading &&
          results.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              onClick={onClear}
              className="block px-4 py-3 hover:bg-white/5 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-2 text-xs text-white/35 mb-0.5">
                <span className={r.type === "blog" ? "text-sky-300/70" : "text-emerald-300/70"}>
                  {r.type === "blog" ? "博客" : "作品"}
                </span>
              </div>
              <div className="text-sm text-white/80">{r.title}</div>
              {r.excerpt && (
                <div className="text-xs text-white/40 mt-0.5 line-clamp-1">
                  {r.excerpt}
                </div>
              )}
            </Link>
          ))}
      </div>
    </div>
  );
}
