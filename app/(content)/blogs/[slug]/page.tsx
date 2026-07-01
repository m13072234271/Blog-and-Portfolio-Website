import { getBlogBySlug, getBlogs } from "@/lib/content";
import { notFound } from "next/navigation";
import ContentDetail from "@/components/ContentDetail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getBlogs().map((b) => ({ slug: b.slug }));
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) notFound();

  let Post;
  try {
    Post = (await import(`@/../content/blogs/${slug}.mdx`)).default;
  } catch {
    notFound();
  }

  return (
    <ContentDetail
      title={blog.title}
      date={blog.date}
      tags={blog.tags}
    >
      <Post />
    </ContentDetail>
  );
}
