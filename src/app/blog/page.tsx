import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Blog</h1>

      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.slug} className="border-b pb-4">
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-semibold text-blue-600 hover:underline">
                {post.title}
              </h2>
            </Link>
            <p className="text-sm text-gray-500">
              {post.date} • {post.author}
            </p>
            <p className="mt-2 text-gray-700">
              {post.content.split(" ").slice(0, 30).join(" ")}...
            </p>
            <Link
              href={`/blog/${post.slug}`}
              className="text-blue-500 hover:underline text-sm inline-block mt-2"
            >
              Read more →
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
