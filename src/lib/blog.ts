import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type BlogPost = {
    slug: string;
    title: string;
    description: string;
    date: string;
    author: string;
    tags: string[];
    coverImage: string;
    readingTime: string;
    content: string;
}

const blogDir = path.join(process.cwd(), "content/blog");

export function getAllPosts(): BlogPost[] {
    const files = fs.readdirSync(blogDir);

    return files.map((filename) => {
        const slug = filename.replace(/\.md$/, "");
        const filePath = path.join(blogDir, filename);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContent);

            return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        author: data.author,
        tags: data.tags,
        coverImage: data.coverImage,
        readingTime: data.readingTime,
        content,
        };
    });
}