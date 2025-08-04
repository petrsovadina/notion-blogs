import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Post } from "@/lib/notion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface BlogSectionProps {
  posts: Post[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto flex flex-col gap-14">
        <div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center gap-8">
          <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular">
            Latest articles
          </h4>
        </div>
        
        {/* Featured post section */}
        {featuredPost && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
            <Link href={`/posts/${featuredPost.slug}`} className="flex flex-col gap-4 hover:opacity-75 cursor-pointer md:col-span-2">
              <div className="bg-muted rounded-md aspect-video relative overflow-hidden">
                {featuredPost.coverImage ? (
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-muted"></div>
                )}
              </div>
              <div className="flex flex-row gap-4 items-center">
                {featuredPost.category && (
                  <Badge>{featuredPost.category}</Badge>
                )}
                <p className="flex flex-row gap-2 text-sm items-center">
                  <span className="text-muted-foreground">By</span>
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>
                      {featuredPost.author ? featuredPost.author.charAt(0).toUpperCase() : 'A'}
                    </AvatarFallback>
                  </Avatar>
                  <span>{featuredPost.author || 'Anonymous'}</span>
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="max-w-3xl text-4xl tracking-tight">
                  {featuredPost.title}
                </h3>
                <p className="max-w-3xl text-muted-foreground text-base">
                  {featuredPost.description}
                </p>
              </div>
            </Link>
          </div>
        )}
        
        {/* Remaining posts grid */}
        {remainingPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingPosts.map((post) => (
              <Link key={post.id} href={`/posts/${post.slug}`} className="flex flex-col gap-4 hover:opacity-75 cursor-pointer">
                <div className="bg-muted rounded-md aspect-video relative overflow-hidden">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-muted"></div>
                  )}
                </div>
                <div className="flex flex-row gap-4 items-center">
                  {post.category && (
                    <Badge>{post.category}</Badge>
                  )}
                  <p className="flex flex-row gap-2 text-sm items-center">
                    <span className="text-muted-foreground">By</span>
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>
                        {post.author ? post.author.charAt(0).toUpperCase() : 'A'}
                      </AvatarFallback>
                    </Avatar>
                    <span>{post.author || 'Anonymous'}</span>
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="max-w-3xl text-2xl tracking-tight">
                    {post.title}
                  </h3>
                  <p className="max-w-3xl text-muted-foreground text-base">
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}