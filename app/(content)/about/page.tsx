export default async function AboutPage() {
  const Post = (await import("@/../content/about.mdx")).default;
  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      <h1 className="text-2xl font-bold text-white mb-6">关于</h1>
      <Post />
    </div>
  );
}
