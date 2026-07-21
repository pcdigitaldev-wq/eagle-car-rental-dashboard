import prisma from "@/lib/prisma";
import React from "react";
import Heading from "../../_components/Heading";
import { notFound } from "next/navigation";
import BlogForm from "./_components/forms/BlogForm";
import NoResult from "@/components/NoResult";
import SuperButton from "@/components/SuperButton";
import { ChevronLeft } from "lucide-react";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const BlogPage = async ({ params }: Props) => {
  const { slug } = await params;
  const blogRes = prisma.blog.findUnique({
    where: {
      slug: slug,
    },
  });

  const categoriesRes = prisma.blogCategory.findMany();

  const [blog, categories] = await Promise.all([blogRes, categoriesRes]);

  if (!blog && slug !== "new") return notFound();

  const title = blog ? `Update ${blog.title}` : "Create New blog";

  if (!categories.length) {
    return (
      <div>
        <NoResult
          title="No Categories"
          description="Please Create Categories First"
        />
        <SuperButton
          className="mt-2"
          buttonType="linkButton"
          href={"/blogs"}
          title="Back"
          Icon={<ChevronLeft className="icon" />}
        />
      </div>
    );
  }
  return (
    <div>
      <Heading title={title} />
      {/* blog form */}
      <div className="mt-2">
        <BlogForm blog={blog} categories={categories} />
      </div>
    </div>
  );
};

export default BlogPage;
