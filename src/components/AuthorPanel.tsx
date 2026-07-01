"use client";

import { usePathname, useRouter } from "next/navigation";
import { Code, MessageCircle, Mail } from "lucide-react";
import { NAV_LINKS, SITE } from "@/config/site";
import { usePageStack, PATH_TO_PAGE } from "@/contexts/page-stack";

export default function AuthorPanel() {
  const pathname = usePathname();
  const router = useRouter();
  const pageStack = usePageStack();

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center pt-2 pb-4">
        <div className="w-24 h-24 rounded-full bg-white/15 flex items-center justify-center mb-3 ring-2 ring-white/15">
          <span className="text-3xl font-bold text-white/80">
            {SITE.name.charAt(0)}
          </span>
        </div>
        <span className="text-lg font-semibold text-white tracking-wide">
          {SITE.name}
        </span>
      </div>

      <div className="border-t border-white/15 mx-4" />

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV_LINKS.map((link) => {
          const isActive = pageStack
            ? pageStack.activeContentPage === PATH_TO_PAGE[link.href]
            : pathname.startsWith(link.href);

          return (
            <button
              key={link.href}
              onClick={() => {
                if (pageStack) {
                  pageStack.navigateTo(link.href);
                } else {
                  router.push(link.href);
                }
              }}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-base transition-all duration-200 border-l-[3px] ${
                isActive
                  ? "bg-white/15 text-white font-medium border-l-white/60"
                  : "text-white/60 hover:text-white/85 hover:bg-white/5 border-l-transparent"
              }`}
            >
              {link.label}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-white/15 mx-4" />

      <div className="flex justify-center gap-4 py-5">
        <a href={SITE.social.github} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg text-white/50 hover:text-white/80 hover:bg-white/10 transition-all duration-200">
          <Code size={22} />
        </a>
        <a href={SITE.social.twitter} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg text-white/50 hover:text-white/80 hover:bg-white/10 transition-all duration-200">
          <MessageCircle size={22} />
        </a>
        <a href={`mailto:${SITE.social.email}`} className="p-2.5 rounded-lg text-white/50 hover:text-white/80 hover:bg-white/10 transition-all duration-200">
          <Mail size={22} />
        </a>
      </div>
    </div>
  );
}
