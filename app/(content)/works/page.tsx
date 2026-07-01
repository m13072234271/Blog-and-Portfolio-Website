import { getWorks, getTags } from "@/lib/content";
import ContentList from "@/components/ContentList";

export default function WorksListPage() {
  const works = getWorks();
  const tags = getTags(works);

  return (
    <ContentList
      type="work"
      items={works}
      tags={tags}
      title="作品"
      emptyText="暂无作品"
    />
  );
}
