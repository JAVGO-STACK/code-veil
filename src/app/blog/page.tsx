import { getAllBlogs } from "@/lib/getAllBlogs";
import BlogPage from "@/components/custom/BlogPage";

export default async function Page() {
  const blogs = await getAllBlogs();
  return <BlogPage blogs={blogs} />;
}
