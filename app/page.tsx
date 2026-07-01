import PageStack from "@/components/PageStack";
import HomeContent from "./(content)/home/page";
import AboutContent from "./(content)/about/page";
import BlogsContent from "./(content)/blogs/page";
import WorksContent from "./(content)/works/page";

const pages = {
  home: <HomeContent />,
  about: <AboutContent />,
  blogs: <BlogsContent />,
  works: <WorksContent />,
};

export default function Root() {
  return <PageStack pages={pages} initialLayer="root" />;
}
