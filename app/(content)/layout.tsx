import { getBlogs } from "@/lib/content";
import ContentLayoutClient from "@/components/ContentLayoutClient";
import HomeContent from "./home/page";
import AboutContent from "./about/page";
import BlogsContent from "./blogs/page";
import WorksContent from "./works/page";

const pages = {
  home: <HomeContent />,
  about: <AboutContent />,
  blogs: <BlogsContent />,
  works: <WorksContent />,
};

function buildSeriesMap() {
  const blogs = getBlogs();
  const map: Record<
    string,
    { seriesName: string; blogs: { slug: string; title: string; seriesOrder: number }[] }
  > = {};

  for (const blog of blogs) {
    if (!blog.series) continue;
    if (map[blog.slug]) continue;

    const seriesBlogs = blogs
      .filter((b) => b.series === blog.series)
      .sort((a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0))
      .map((b) => ({
        slug: b.slug,
        title: b.title,
        seriesOrder: b.seriesOrder || 0,
      }));

    for (const sb of seriesBlogs) {
      map[sb.slug] = {
        seriesName: blog.series!,
        blogs: seriesBlogs,
      };
    }
  }

  return map;
}

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const seriesMap = buildSeriesMap();

  return (
    <ContentLayoutClient pages={pages} seriesMap={seriesMap}>
      {children}
    </ContentLayoutClient>
  );
}
