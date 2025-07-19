import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Latest Posts</h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="border rounded-2xl p-6 shadow-sm hover:shadow-md transition bg-white dark:bg-gray-900"
          >
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-semibold text-blue-600 hover:underline mb-2">
                {post.title}
              </h2>
            </Link>
            <p className="text-sm text-gray-500 mb-1">
              {post.date} • {post.author} • {post.readingTime}
            </p>
            <p className="text-gray-700 dark:text-gray-300">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="inline-block mt-3 text-blue-500 hover:underline text-sm"
            >
              Read more →
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
