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
  const allBlogs = await getAllBlogs();
  const slug = params.slug ? params.slug.join("/") : "";
  const blog = allBlogs.find((b) => b.slug === slug);

  if (blog) {
    const fileContents = fs.readFileSync(blog.filePath, "utf8");
    const { content, data: meta } = await import("gray-matter").then((m) =>
      m.default(fileContents)
    );

    const headings: { id: string; text: string; level: number }[] = [];

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

    return (
      <BlogPostPage
        blog={{ ...blog, ...meta }}
        mdxSource={mdxSource}
        headings={headings}
      />
    );
  } else {
    const categoryBlogs = allBlogs.filter((b) => b.slug.startsWith(`${slug}/`));

    if (categoryBlogs.length > 0) {
      return <BlogCategoryPage blogs={categoryBlogs} />;
    } else {
      notFound();
    }
  }
}
