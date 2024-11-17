import { getAllBlogs } from "@/lib/getAllBlogs";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { notFound } from "next/navigation";
import BlogPostPage from "@/components/custom/BlogPostPage"; // Client component
import BlogCategoryPage from "@/components/custom/BlogCategoryPage";
import fs from "fs";

export default async function Page({
  params,
}: {
  params: { slug: string[] };
}) {
  const allBlogs = await getAllBlogs();

  // Get the current slug
  const slug = params.slug ? params.slug.join("/") : "";

  // Find the blog that matches the slug
  const blog = allBlogs.find((b) => b.slug === slug);

  if (blog) {
    // Read and serialize MDX content
    const fileContents = fs.readFileSync(blog.filePath, "utf8");
    const { content, data: meta } = await import("gray-matter").then((m) =>
      m.default(fileContents)
    );
    const mdxSource = await serialize(content);

    // Render the blog post page
    return (
      <BlogPostPage blog={{ ...blog, ...meta }} mdxSource={mdxSource} />
    );
  } else {
    // Check if there are blogs under this category
    const categoryBlogs = allBlogs.filter((b) => b.slug.startsWith(`${slug}/`));

    if (categoryBlogs.length > 0) {
      // Render the category page
      return <BlogCategoryPage blogs={categoryBlogs} />;
    } else {
      // If blog not found, render 404 page
      notFound();
    }
  }
}
