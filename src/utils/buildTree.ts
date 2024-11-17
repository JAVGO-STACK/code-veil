import { Blog } from "@/types/blog";
import { TreeNode } from "@/types/treeNode";

export function buildTree(blogs: Blog[]): TreeNode[] {
  const tree: TreeNode[] = [];

  blogs.forEach((blog) => {
    const parts = blog.slug.split("/");
    let currentLevel: TreeNode[] = tree;

    parts.forEach((part, index) => {
      let existingPath = currentLevel.find((node) => node.name === part);

      if (!existingPath) {
        existingPath = {
          name: part,
          slug: parts.slice(0, index + 1).join("/"),
          children: [],
        };
        currentLevel.push(existingPath);
      }

      // 如果是文章的最后一部分，添加博客信息
      if (index === parts.length - 1) {
        existingPath.blog = blog;
        existingPath.title = blog.title;
      }

      currentLevel = existingPath.children;
    });
  });

  return tree;
}
