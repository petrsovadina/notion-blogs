import { getPostsFromCache } from "@/lib/notion";
import BlogSection from "@/components/blog-section";

export default function Home() {
  const posts = getPostsFromCache();

  return (
    <div>
      <BlogSection posts={posts} />
    </div>
  );
}
