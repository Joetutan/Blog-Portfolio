import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Post = {
  slug: string;
  title: string;
  date: string;
  author: string;
  content: string;
};

const POSTS_DIR = path.join(process.cwd(), "src", "content", "blog");

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(POSTS_DIR);

  return files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const filePath = path.join(POSTS_DIR, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");

    const { data, content } = matter(fileContent);

    return {
      slug,
      title: data.title,
      date: data.date,
      author: data.author || "Unknown",
      content,
    };
  });
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title,
    date: data.date,
    author: data.author || "Unknown",
    content,
  };
}
