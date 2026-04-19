import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "content/blog");

export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  categoryColor: string;
  emoji: string;
  readTime: string;
  author: string;
  authorRole: string;
  coverImage?: string;
};

export type Post = PostMeta & {
  content: string;
};

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((f) => f.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const { text } = readingTime(content);
      return {
        slug,
        title: data.title || "",
        excerpt: data.excerpt || "",
        date: data.date || "",
        category: data.category || "",
        categoryColor: data.categoryColor || "#a78bfa",
        emoji: data.emoji || "📝",
        readTime: text,
        author: data.author || "Optisutar Team",
        authorRole: data.authorRole || "Digital Marketing",
        coverImage: data.coverImage || "",
      } as PostMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const { text } = readingTime(content);
  return {
    slug,
    title: data.title || "",
    excerpt: data.excerpt || "",
    date: data.date || "",
    category: data.category || "",
    categoryColor: data.categoryColor || "#a78bfa",
    emoji: data.emoji || "📝",
    readTime: text,
    author: data.author || "Optisutar Team",
    authorRole: data.authorRole || "Digital Marketing",
    coverImage: data.coverImage || "",
    content,
  };
}