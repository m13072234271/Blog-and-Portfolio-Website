import { getWorkBySlug, getWorks } from "@/lib/content";
import { notFound } from "next/navigation";
import ContentDetail from "@/components/ContentDetail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getWorks().map((w) => ({ slug: w.slug }));
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) notFound();

  let Post;
  try {
    Post = (await import(`@/../content/works/${slug}.mdx`)).default;
  } catch {
    notFound();
  }

  return (
    <ContentDetail
      title={work.title}
      date={work.date}
      tags={work.tags}
    >
      <Post />
    </ContentDetail>
  );
}
