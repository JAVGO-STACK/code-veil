import { getAllBlogs } from "@/lib/getAllBlogs";
import { serialize } from "next-mdx-remote/serialize";
import { notFound } from "next/navigation";
import BlogPostPage from "@/components/custom/BlogPostPage";
import BlogCategoryPage from "@/components/custom/BlogCategoryPage";
import fs from "fs";
import rehypeSlug from "rehype-slug";
import rehypeExtractHeadings from "@/utils/rehypeExtractHeadings";
import rehypePrismPlus from "rehype-prism-plus";
import remarkGfm from "remark-gfm";

export default async function Page({
  params,
}: {
  params: { slug: string[] };
}) {
  // 获取所有博客文章
  const allBlogs = await getAllBlogs();
  const { slug } = await params;

  // 对 slug 数组中的每个元素进行解码
  const decodedSlugArray = slug.map((segment) =>
    decodeURIComponent(segment)
  );
  // 拼接解码后的 slug
  const blogSlug = decodedSlugArray.join("/");

  // 查找与当前路由匹配的博客文章
  const blog = allBlogs.find((b) => b.slug === blogSlug);

  if (blog) {
    // 读取博客文章的内容
    const fileContents = fs.readFileSync(blog.filePath, "utf8");
    // 使用 gray-matter 解析文章的元数据和内容
    const { content, data: meta } = await import("gray-matter").then((m) =>
      m.default(fileContents)
    );

    const headings: { id: string; text: string; level: number }[] = [];

    // 序列化 MDX 内容
    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [
          remarkGfm,
        ],
        rehypePlugins: [
          rehypeSlug,
          [rehypeExtractHeadings, { headings }],
          [rehypePrismPlus, { ignoreMissing: true }],
        ],
        format: "mdx",
      },
    });

    // 渲染博客文章页面
    return (
      <BlogPostPage
        blog={{ ...blog, ...meta }}
        mdxSource={mdxSource}
        headings={headings}
      />
    );
  } else {
    // 如果不是文章，则尝试作为分类处理
    const categoryBlogs = allBlogs.filter((b) => b.slug.startsWith(`${slug}/`));

    if (categoryBlogs.length > 0) {
      // 渲染博客分类页面
      return <BlogCategoryPage blogs={categoryBlogs} />;
    } else {
      // 页面未找到
      notFound();
    }
  }
}
