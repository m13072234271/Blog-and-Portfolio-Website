import { getBlogs, getWorks } from "@/lib/content";
import BlogCard from "@/components/BlogCard";
import WorkCard from "@/components/WorkCard";
import ScrollRestorer from "@/components/ScrollRestorer";

export default function Home() {
  const blogs = getBlogs().slice(0, 3);
  const works = getWorks().slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      <ScrollRestorer />
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-white/90 mb-4 tracking-wide">
          最新文章
        </h2>
        <div className="space-y-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.slug} item={blog} />
          ))}
        </div>
        {blogs.length === 0 && (
          <p className="text-sm text-white/50 text-center py-8">暂无文章</p>
        )}
      </section>

      <section className="pb-8">
        <h2 className="text-lg font-semibold text-white/90 mb-4 tracking-wide">
          精选作品
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {works.map((work) => (
            <WorkCard key={work.slug} item={work} />
          ))}
        </div>
        {works.length === 0 && (
          <p className="text-sm text-white/50 text-center py-8">暂无作品</p>
        )}
      </section>
    </div>
  );
}
