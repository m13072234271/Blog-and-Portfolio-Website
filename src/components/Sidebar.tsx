"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import AuthorPanel from "./AuthorPanel";
import ContentPanel from "./ContentPanel";
import SeriesPanel from "./SeriesPanel";
import SwitchBar from "./SwitchBar";
import { usePageStack } from "@/contexts/page-stack";

type Mode = "author" | "content" | "series";

export default function Sidebar() {
  const pathname = usePathname();
  const pageStack = usePageStack();
  const isDetail = pageStack
    ? pageStack.showChildren
    : /^\/(blogs|works)\/.+/.test(pathname);
  const [mode, setMode] = useState<Mode>("content");

  return (
    <aside className="w-80 flex-shrink-0 flex flex-col rounded-2xl backdrop-blur-xl bg-black/30 shadow-md overflow-hidden">
      <div className={`px-4 pt-4 flex-shrink-0 ${isDetail ? "" : "invisible"}`}>
        <SwitchBar mode={mode} onChange={setMode} />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {!isDetail && <AuthorPanel />}
        {isDetail && mode === "author" && <AuthorPanel />}
        {isDetail && mode === "content" && <ContentPanel />}
        {isDetail && mode === "series" && <SeriesPanel />}
      </div>
    </aside>
  );
}
