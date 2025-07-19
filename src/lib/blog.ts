import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Post = {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  readingTime: string;
};

const POSTS_DIR = path.join(process.cwd(), "src", "content", "blog");

function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(POSTS_DIR);

  return files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const filePath = path.join(POSTS_DIR, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");

    const { data, content } = matter(fileContent);

    const excerpt = data.excerpt || content.split(" ").slice(0, 30).join(" ") + "...";

    return {
      slug,
      title: data.title,
      date: data.date,
      author: data.author || "Unknown",
      excerpt,
      content,
      readingTime: calculateReadingTime(content),
    };
  });
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const excerpt = data.excerpt || content.split(" ").slice(0, 30).join(" ") + "...";

  return {
    slug,
    title: data.title,
    date: data.date,
    author: data.author || "Unknown",
    excerpt,
    content,
    readingTime: calculateReadingTime(content),
  };
}
