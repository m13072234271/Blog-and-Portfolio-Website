"use client";

import { useSeries } from "@/contexts/series";

type Mode = "author" | "content" | "series";

interface Props {
  mode: Mode;
  onChange: (mode: Mode) => void;
}

export default function SwitchBar({ mode, onChange }: Props) {
  const { hasSeries } = useSeries();

  const tabs: { key: Mode; label: string }[] = [
    { key: "author", label: "作者" },
    { key: "content", label: "目录" },
    ...(hasSeries ? [{ key: "series" as Mode, label: "系列" }] : []),
  ];

  return (
    <div className="flex rounded-lg bg-white/10 p-0.5">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`flex-1 text-sm py-2 rounded-md transition-all duration-200 ${
            mode === tab.key
              ? "bg-white/20 text-white font-medium shadow-sm"
              : "text-white/55 hover:text-white/80"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
