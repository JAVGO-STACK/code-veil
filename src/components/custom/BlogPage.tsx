"use client";

import { Container } from "@/components/Container";
import React, { useState, useMemo, Suspense, lazy } from "react";
import { buildTree } from "@/utils/buildTree";
import { Blog } from "@/types/blog";

const Blogs = lazy(() =>
  import("@/components/Blogs").then((module) => ({ default: module.Blogs }))
);
const SidebarMenu = lazy(() =>
  import("@/components/custom/SidebarMenu").then((module) => ({
    default: module.SidebarMenu,
  }))
);

const MemoizedSidebarMenu = React.memo(SidebarMenu);
const MemoizedBlogs = React.memo(Blogs);

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
        {/* Fixed Sidebar */}
        <Suspense fallback={<div>Loading Sidebar...</div>}>
          <div className="w-auto max-w-xs sticky top-0 left-0 h-full overflow-y-auto border rounded-lg border-gray-200 bg-white dark:bg-neutral-800 shadow-lg p-4">
            <MemoizedSidebarMenu
              treeData={treeData}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
        </Suspense>
        {/* Article List */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <Suspense fallback={<div>Loading Blogs...</div>}>
            <div className="px-4 md:px-8 lg:px-16">
              <MemoizedBlogs blogs={filteredBlogs} />
            </div>
          </Suspense>
        </div>
      </div>
    </Container>
  );
}
