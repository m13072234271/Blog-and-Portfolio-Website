"use client";

import { createContext, useContext } from "react";

interface SeriesBlog {
  slug: string;
  title: string;
  seriesOrder: number;
}

interface SeriesInfo {
  hasSeries: boolean;
  seriesName: string;
  seriesArticles?: SeriesBlog[];
  currentSlug?: string;
}

const SeriesContext = createContext<SeriesInfo>({
  hasSeries: false,
  seriesName: "",
});

export function useSeries() {
  return useContext(SeriesContext);
}

export function SeriesProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: SeriesInfo;
}) {
  return (
    <SeriesContext.Provider value={value}>
      {children}
    </SeriesContext.Provider>
  );
}
