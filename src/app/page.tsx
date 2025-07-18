import { getAllPosts } from "@/lib/blog";

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Test Blog</h1>
      {posts.map((post) => (
        <article key={post.slug} className="border-b pb-6">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-gray-600">{post.description}</p>
          <p className="text-sm text-gray-500">
            {post.date} • {post.readingTime}
          </p>
        </article>
      ))}
    </main>
  );
}
