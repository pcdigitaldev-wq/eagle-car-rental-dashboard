import { wait } from "@/lib/utils";
import React, { Suspense } from "react";
import Heading from "../_components/Heading";
import CategoriesFeed from "./_components/feeds/CategoriesFeed";
import BlogsFeed from "./_components/feeds/BlogsFeed";
import { Skeleton } from "@/components/ui/skeleton";
import ModalButton from "../../../components/SuperButton";

import SuperButton from "../../../components/SuperButton";
import { Plus, PlusCircle } from "lucide-react";

type Props = {};

export const revalidate = 0

const BlogsPage = async (props: Props) => {
  return (
    <div>
      <Heading title="Blogs" />

      {/* categories feed */}
      <div className="mt-[80px]">
        <div className="flex items-center gap-8 justify-between">
          <Heading title="Categories" className="text-md" />
          <SuperButton
            variant="siteSecondary"
            buttonType="modalButton"
            title="Category"
            Icon={<Plus className="icon" />}
            className="siteSecondary"
            modalInputs={{ modal: "category", data: undefined }}
          />
        </div>
        <Suspense
          fallback={
            <Skeleton className="h-[200px] w-full mt-2 " />
          }
        >
          <CategoriesFeed />
        </Suspense>
      </div>

      {/* blogs feed*/}
      <div className="mt-[80px]">
        <div className="flex items-center gap-8 justify-between">
          <Heading title="Blogs" className="text-md" />
          <SuperButton
            variant="siteSecondary"
            buttonType="linkButton"
            title="Blog"
            href="/blogs/new"
            Icon={<Plus className="icon" />}
            className="siteSecondary"
          />
        </div>
        <div className="mt-2">
          <Suspense
            fallback={
              <Skeleton className="h-[200px] w-full mt-2 " />
            }
          >
            <BlogsFeed />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
