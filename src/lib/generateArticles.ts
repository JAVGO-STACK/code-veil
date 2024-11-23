import fs from "fs";
import path from "path";
import { Article } from "@/types/article";
import matter from "gray-matter";

// 指定博客目录
const BLOG_DIR = path.join(process.cwd(), "src/app/blog");

// 导出获取所有博客的函数
export async function getAllArticles(): Promise<Article[]> {
    return await traverseDir(BLOG_DIR);
}

// 递归遍历目录，获取所有博客文章
async function traverseDir(dir: string, slugPrefix = ""): Promise<Article[]> {
    // 读取目录内容
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    // 博客列表
    const articles: Article[] = [];

    // 遍历目录内容
    for (const entry of entries) {
        // 获取完整路径
        const fullPath = path.join(dir, entry.name);

        // 如果是目录，则递归遍历
        if (entry.isDirectory()) {
            const subBlogs = await traverseDir(
                fullPath,
                path.join(slugPrefix, entry.name)
            );
            articles.push(...subBlogs);
        } else if (entry.isFile() && entry.name.endsWith(".mdx")) { // 如果是 MDX 文件
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
            articles.push({
                id: slug,
                title: meta.title || "无标题",
                slug,
                filePath: fullPath,
            } as Article);
        }
    }

    return articles;
}