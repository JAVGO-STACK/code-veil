"use client";

import { Container } from "@/components/Container";
import { Blogs } from "@/components/Blogs";
import { SidebarMenu } from "@/components/custom/SidebarMenu";
import { buildTree } from "@/utils/buildTree";
import { useState, useMemo } from "react";
import { Blog } from "@/types/blog";

export default function BlogPage({ blogs }: { blogs: Blog[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBlogs = useMemo(() => {
    if (!searchTerm) return blogs;
    return blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, blogs]);

  const treeData = useMemo(() => buildTree(blogs), [blogs]);

  return (
    <Container>
      <div className="flex">
        <div className="w-1/5 sticky top-0 left-0 h-screen overflow-y-auto border-r border-gray-200 bg-white dark:bg-neutral-800 rounded-r-lg shadow-lg p-4">
          <SidebarMenu
            treeData={treeData}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
        <div className="w-4/5 pl-80 px-4 md:px-8 lg:px-16">
          <Blogs blogs={filteredBlogs} />
        </div>
      </div>
    </Container>
  );
}
