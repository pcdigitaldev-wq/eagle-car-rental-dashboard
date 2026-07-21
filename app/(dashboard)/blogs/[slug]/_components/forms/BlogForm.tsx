"use client";
import { Blog, BlogCategory } from "@prisma/client";
import React from "react";
import { useBlog } from "../../hooks/useBlog";
import { Form } from "@/components/ui/form";
import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField";
import EditorField from "@/components/EditorField";
import { useImageUpload } from "@/app/hooks/imageUpload";
import { SingleImageUploadField } from "@/components/SingleImageUploadField";
import SuperButton from "@/components/SuperButton";
import TextAreaField from "@/components/TextAreaField";

type Props = { blog: Blog | null; categories: BlogCategory[] };

const BlogForm = ({ blog, categories }: Props) => {
  const { form, onSubmit,pending } = useBlog(blog);
  const { file, setFile, uploadImage, ImagePlaceholder, isDisabled } =
    useImageUpload({
      form,
      fieldName: "featuredImage",
    });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <SelectField
          form={form}
          label="Blog Category"
          name="categoryId"
          placeholder="Choose Blog Category"
          inputStyles="capitalize"
          optionStyles="capitalize"
          values={categories}
          renderItem={(value) => ({ label: value.title, value: value.id })}
        />
        <InputField
          form={form}
          label="BLog Slug"
          name="slug"
          placeholder="Enter Blog Slug"
        />
        <InputField
          form={form}
          label="BLog Title"
          name="title"
          placeholder="Enter Blog Title"
        />

        <TextAreaField
          form={form}
          label="SEO Description"
          name="seoDescription"
          placeholder="Enter SEO Description"
        />

        <SingleImageUploadField
          form={form}
          name="featuredImage"
          file={file}
          setFile={(file: File | undefined) => setFile(file)}
          uploadImage={uploadImage}
          isDisabled={isDisabled}
          ImagePlaceholder={<ImagePlaceholder />}
        />
       

        <EditorField
          editorStyles="min-h-[150px]"
          form={form}
          label="Blog Content"
          name="content"
          placeholder="Write Blog Content"
        />
          <SuperButton
              variant="site"
              className="w-full"
              type="submit"
              buttonType="loadingButton"
              loading={pending}
              title={blog ? "Update" : "Create"}
            />
      </form>
    </Form>
  );
};

export default BlogForm;
