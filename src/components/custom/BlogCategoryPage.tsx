import dynamic from 'next/dynamic';
import { Blog } from "@/types/blog";

const Blogs = dynamic(() => import("@/components/Blogs").then(module => module.Blogs), {
  loading: () => <div>Loading...</div>,
});

export default function BlogCategoryPage({ blogs }: { blogs: Blog[] }) {
  return (
    <div>
      <Blogs blogs={blogs} />
    </div>
  );
}
