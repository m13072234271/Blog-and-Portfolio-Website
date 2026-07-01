import { getBlogs, getTags } from "@/lib/content";
import ContentList from "@/components/ContentList";

export default function BlogsListPage() {
  const blogs = getBlogs();
  const tags = getTags(blogs);

  return (
    <ContentList
      type="blog"
      items={blogs}
      tags={tags}
      title="博客"
      emptyText="暂无文章"
    />
  );
}
