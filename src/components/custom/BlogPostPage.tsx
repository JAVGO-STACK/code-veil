"use client";

import { Blog } from "@/types/blog";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function BlogPostPage({
  blog,
  mdxSource,
}: {
  blog: Blog;
  mdxSource: MDXRemoteSerializeResult;
}) {
  return (
    <div className="prose mx-auto py-10">
      <Link
        href="/blog"
        className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-transform transform hover:-translate-y-1"
        aria-label="返回博客列表"
      >
        <FiArrowLeft size={20} />
      </Link>
      <h1 className="mt-4">{blog.title}</h1>
      <p className="text-gray-600">{blog.description}</p>
      <MDXRemote {...mdxSource} />
    </div>
  );
}
