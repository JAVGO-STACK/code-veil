import { Blogs } from "@/components/Blogs";
import { Blog } from "@/types/blog";

export default function BlogCategoryPage({ blogs }: { blogs: Blog[] }) {
  return (
    <div>
      <Blogs blogs={blogs} />
    </div>
  );
}
