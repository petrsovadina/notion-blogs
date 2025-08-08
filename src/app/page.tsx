import { getPostsFromCache } from "@/lib/notion";
import BlogSection from "@/components/blog-section";
import HeroSection from "@/components/hero-section-new";

export default function Home() {
  const posts = getPostsFromCache();

  return (
    <div>
      <HeroSection totalPosts={posts.length} />
      <div id="latest-posts">
        <BlogSection posts={posts} />
      </div>
    </div>
  );
}
