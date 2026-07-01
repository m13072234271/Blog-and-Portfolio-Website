"use client";

import { usePathname } from "next/navigation";
import PageStack from "@/components/PageStack";
import { SeriesProvider } from "@/contexts/series";
import type { ContentPage } from "@/contexts/page-stack";

interface SeriesBlog {
  slug: string;
  title: string;
  seriesOrder: number;
}

interface SeriesData {
  seriesName: string;
  blogs: SeriesBlog[];
}

interface Props {
  pages: Record<ContentPage, React.ReactNode>;
  seriesMap: Record<string, SeriesData>;
  children: React.ReactNode;
}

function extractSlug(pathname: string): string | null {
  const match = pathname.match(/^\/blogs\/(.+)/);
  return match ? match[1] : null;
}

export default function ContentLayoutClient({ pages, seriesMap, children }: Props) {
  const pathname = usePathname();
  const slug = extractSlug(pathname);
  const seriesData = slug ? seriesMap[slug] : undefined;

  return (
    <SeriesProvider
      value={{
        hasSeries: !!seriesData,
        seriesName: seriesData?.seriesName ?? "",
        seriesArticles: seriesData?.blogs ?? [],
        currentSlug: slug ?? undefined,
      }}
    >
      <PageStack key={pathname} pages={pages} initialLayer="content">
        {children}
      </PageStack>
    </SeriesProvider>
  );
}
