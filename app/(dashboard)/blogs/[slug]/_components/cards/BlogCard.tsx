"use client";
import ImageComponent from "@/components/ImageComponent";
import SuperButton from "@/components/SuperButton";
import { Blog } from "@prisma/client";
import { Delete, Edit, Trash } from "lucide-react";
import {format} from 'date-fns'
import React from "react";
import { deleteBlog } from "../../actions/deleteBlog";

type Props = { blog: Blog };

const BlogCard = ({ blog }: Props) => {
  return (
    <article className="p-2 border rounded-md flex flex-col gap-2">
      <ImageComponent
        src={blog.featuredImage}
        alt={"blog-image"}
        aspect="video"
        className="rounded-md overflow-hidden"
      />
      <h2 className="capitalize font-semibold font-lg line-clamp-1">{blog.title}</h2>
      <p className="line-clamp-3 first-letter:capitalize text-muted-foreground text-xs">{blog.seoDescription}</p>
      <p className="text-right text-xs font-semibold text-muted-foreground mt-auto">{format(new Date(blog.createdAt),'MMMM d, yyyy, hh:mm a')}</p>
      <div className="flex gap-2 mt-auto">
        <SuperButton
          className="flex-1"
          buttonType="linkButton"
          href={`blogs/${blog.slug}`}
          title="Update"
          Icon={<Edit className="icon" />}
        />
        <SuperButton
          className="flex-1"
          title="Delete"
          variant="destructive"
          buttonType="modalButton"
          modalInputs={{ modal: "delete", function: () => deleteBlog(blog.id) }}
          Icon={<Trash className="icon" />}
        />
      </div>
    </article>
  );
};

export default BlogCard;
