import { getAllBlogs } from "@/lib/getAllBlogs";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { notFound } from "next/navigation";
import BlogPostPage from "@/components/custom/BlogPostPage";
import BlogCategoryPage from "@/components/custom/BlogCategoryPage";
import fs from "fs";
import rehypeSlug from "rehype-slug";
import rehypeExtractHeadings from "@/utils/rehypeExtractHeadings";

export default async function Page({
  params,
}: {
  params: { slug: string[] };
}) {
  const allBlogs = await getAllBlogs();

  // 获取当前的 slug
  const slug = params.slug ? params.slug.join("/") : "";

  // 查找与 slug 匹配的文章
  const blog = allBlogs.find((b) => b.slug === slug);

  // 如果找到文章，则继续处理
  if (blog) {
    // 读取 MDX 文件
    const fileContents = fs.readFileSync(blog.filePath, "utf8");
    const { content, data: meta } = await import("gray-matter").then((m) =>
      m.default(fileContents)
    );

    // 用于存储提取的标题信息
    const headings: { id: string; text: string; level: number }[] = [];

    // 使用 rehype 插件提取标题
    const mdxSource = await serialize(content, {
      mdxOptions: {
        rehypePlugins: [
          rehypeSlug,
          [rehypeExtractHeadings, { headings }],
        ],
      },
    });

    // 渲染博客页面
    return (
      <BlogPostPage
        blog={{ ...blog, ...meta }}
        mdxSource={mdxSource}
        headings={headings}
      />
    );
  } else {
    // 检查是否是目录
    const categoryBlogs = allBlogs.filter((b) => b.slug.startsWith(`${slug}/`));

    // 如果有文章，则继续处理
    if (categoryBlogs.length > 0) {
      return <BlogCategoryPage blogs={categoryBlogs} />;
    } else {
      // 如果找不到文章，则返回 404
      notFound();
    }
  }
}
