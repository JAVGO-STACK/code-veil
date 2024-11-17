import fs from "fs";
import path from "path";
import { Blog } from "@/types/blog";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src/app/blog");

export async function getAllBlogs(): Promise<Blog[]> {
  return await traverseDir(BLOG_DIR);
}

async function traverseDir(dir: string, slugPrefix = ""): Promise<Blog[]> {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const blogs: Blog[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const subBlogs = await traverseDir(
        fullPath,
        path.join(slugPrefix, entry.name)
      );
      blogs.push(...subBlogs);
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      // 获取文件名（去除扩展名）
      const fileNameWithoutExt = entry.name.replace(/\.mdx$/, "");
      // 生成 slug，包含目录和文件名
      const slug = path
        .join(slugPrefix, fileNameWithoutExt)
        .replace(/\\/g, "/");

      // 读取文件内容
      const fileContents = fs.readFileSync(fullPath, "utf8");
      // 使用 gray-matter 提取元数据
      const { data: meta } = matter(fileContents);

      // 添加到博客列表
      blogs.push({
        slug,
        filePath: fullPath,
        ...meta,
      } as Blog);
    }
  }

  return blogs;
}
