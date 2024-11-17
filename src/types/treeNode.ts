import { Blog } from "@/types/blog";

export interface TreeNode {
  name: string;
  slug: string;
  children: TreeNode[];
  blog?: Blog;
  title?: string;
}
