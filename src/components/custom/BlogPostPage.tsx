"use client";

import { useEffect, useState } from "react";
import { Blog } from "@/types/blog";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { components } from "@/components/MDXComponents";
import clsx from "clsx";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface BlogPostPageProps {
  blog: Blog;
  mdxSource: MDXRemoteSerializeResult;
  headings: Heading[];
}

export default function BlogPostPage({
  blog,
  mdxSource,
  headings,
}: BlogPostPageProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      let current = null;
      for (const heading of headings) {
        const element = document.getElementById(heading.id);
        if (element && element.offsetTop <= scrollPosition) {
          current = heading.id;
        }
      }
      setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headings]);

  const getIndentClass = (level: number) => {
    switch (level) {
      case 2:
        return "ml-4";
      case 3:
        return "ml-8";
      case 4:
        return "ml-12";
      case 5:
        return "ml-16";
      default:
        return "ml-0";
    }
  };

  return (
    <div className="relative w-full">
      <Link
        href="/blog"
        className="fixed top-20 left-25 flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-transform transform hover:-translate-y-1 z-50"
        aria-label="返回博客列表"
      >
        <FiArrowLeft size={20} />
      </Link>
      <div className="flex w-full mx-auto py-10 px-4 md:px-8 lg:px-16">
        <div className="prose flex-1 max-w-none">
          <h1 className="mt-4">{blog.title}</h1>
          <p className="text-gray-600">{blog.description}</p>
          <MDXRemote {...mdxSource} components={components} />
        </div>
        {/* 侧边目录组件 */}
        <div className="hidden lg:block fixed top-1/5 right-5 transform -translate-y-1/2 z-40">
          <div className="relative">
            <div className="flex flex-col items-center space-y-2 cursor-pointer p-2 group">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className={clsx(
                    "w-5 h-1 rounded-full transition-colors duration-300",
                    index === 0
                      ? "bg-black dark:bg-white"
                      : "bg-gray-400 dark:bg-gray-400"
                  )}
                />
              ))}
              <div
                className={clsx(
                  "absolute top-0 right-full bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-xl max-w-xs w-64 max-h-[80vh] overflow-y-auto transition-all duration-300 ease-in-out",
                  "opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none group-hover:pointer-events-auto",
                  "scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thumb-rounded"
                )}
              >
                <h2 className="text-lg font-bold mb-4 text-center">目录</h2>
                <ul className="space-y-2">
                  {headings.map((heading) => (
                    <li
                      key={heading.id}
                      className={clsx(
                        getIndentClass(heading.level),
                        "hover:bg-gray-200 dark:hover:bg-neutral-700 rounded transition"
                      )}
                    >
                      <a
                        href={`#${heading.id}`}
                        className={clsx(
                          "block text-gray-600 dark:text-neutral-300 pl-2 hover:text-black",
                          activeId === heading.id &&
                            "font-semibold text-blue-600 dark:text-blue-400"
                        )}
                        aria-current={
                          activeId === heading.id ? "page" : undefined
                        }
                      >
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* 结束侧边目录组件 */}
      </div>
    </div>
  );
}