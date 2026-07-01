"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Image } from "lucide-react";
import { NAV_LINKS } from "@/config/site";
import { usePageStack } from "@/contexts/page-stack";
import BackgroundMenu from "./BackgroundMenu";
import SearchResults from "./SearchResults";

export default function Navbar() {
  const router = useRouter();
  const pageStack = usePageStack();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onWheel(e: WheelEvent) {
      const target = e.target as HTMLElement;
      if (target.closest("[data-floating-panel]")) return;
      if (document.activeElement === inputRef.current) {
        setQuery("");
        inputRef.current?.blur();
      }
    }
    document.addEventListener("wheel", onWheel, { passive: true });
    return () => document.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <>
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-6 py-4 rounded-full backdrop-blur-xl bg-black/30 shadow-md">
        {NAV_LINKS.map((link) => (
          <button
            key={link.href}
            onClick={() => {
              if (pageStack) {
                pageStack.navigateTo(link.href);
              } else {
                router.push(link.href);
              }
            }}
            className="px-5 py-2.5 text-base font-medium text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
          >
            {link.label}
          </button>
        ))}

        <span className="w-px h-6 bg-white/15 mx-1" />

        <div className="flex items-center gap-2 px-3">
          <Search size={18} className="text-white/60" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSearchOpen(true);
            }}
            onFocus={() => {
              if (query.trim()) setSearchOpen(true);
            }}
            placeholder="搜索"
            className="w-36 text-base bg-transparent outline-none text-white/80 placeholder:text-white/40"
          />
        </div>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="p-2 rounded-full text-white/60 hover:text-white/80 hover:bg-white/10 transition-all duration-200"
        >
          <Image size={20} />
        </button>
      </nav>

      {searchOpen && (
        <SearchResults
          query={query}
          onClose={() => setSearchOpen(false)}
          onClear={() => {
            setSearchOpen(false);
            setQuery("");
            inputRef.current?.blur();
          }}
        />
      )}

      <BackgroundMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
