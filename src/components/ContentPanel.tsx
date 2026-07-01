"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function ContentPanel() {
  const pathname = usePathname();
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState("");
  const headingsRef = useRef<Element[]>([]);
  const onScrollRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const container = document.querySelector("main");
      if (!container) return;

      if (onScrollRef.current) {
        container.removeEventListener("scroll", onScrollRef.current);
      }

      const headings = Array.from(container.querySelectorAll("h1, h2, h3"));
      const items: TocItem[] = [];
      headings.forEach((h) => {
        const id = h.id || h.textContent?.replace(/\s+/g, "-").toLowerCase() || "";
        if (!h.id) h.id = id;
        items.push({ id, text: h.textContent || "", level: parseInt(h.tagName[1]) });
      });
      setToc(items);
      headingsRef.current = headings;

      const onScroll = () => {
        const top = container.getBoundingClientRect().top + 40;
        let current = "";
        for (const h of headings) {
          if (h.getBoundingClientRect().top <= top) {
            current = h.id;
          }
        }
        setActiveId(current);
      };

      onScrollRef.current = onScroll;
      onScroll();
      container.addEventListener("scroll", onScroll, { passive: true });
    });
    return () => {
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  const jumpTo = useCallback((id: string) => {
    const target = document.getElementById(id);
    const container = document.querySelector("main");
    if (!target || !container) return;
    const targetTop =
      target.getBoundingClientRect().top +
      container.scrollTop -
      container.getBoundingClientRect().top;
    container.scrollTo({ top: targetTop - 24, behavior: "smooth" });
  }, []);

  if (toc.length === 0) {
    return (
      <div className="text-base text-white/50 px-2 py-6 text-center">
        暂无目录
      </div>
    );
  }

  return (
    <div className="pl-1">
      {toc.map((item) => (
        <button
          key={item.id}
          onClick={() => jumpTo(item.id)}
          className={`block text-base py-2 border-l-2 transition-all duration-200 truncate w-full text-left ${
            item.level === 1 ? "pl-3" : item.level === 2 ? "pl-5" : "pl-7"
          } ${
            activeId === item.id
              ? "text-white font-medium border-l-white/60"
              : "text-white/60 border-l-transparent hover:text-white/80 hover:border-l-white/20"
          }`}
        >
          {item.text}
        </button>
      ))}
    </div>
  );
}
