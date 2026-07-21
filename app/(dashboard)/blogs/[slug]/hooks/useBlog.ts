'use client'
import { Blog } from "@prisma/client";
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { blogSchema } from "../schemas";
import { z } from "zod";
import { updateBlog } from "../actions/updateBlog";
import { createBlog } from "../actions/createBlog";
import { errorToast, log } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
 
export const useBlog = (blog:Blog | null)=>{

  const router = useRouter()
  const [pending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof blogSchema>>({
        resolver: zodResolver(blogSchema),
        defaultValues: {
          title:blog?.title ?? '',
          content:blog?.content ?? '',
          categoryId:blog?.categoryId ?? '',
          slug:blog?.slug ??'',
          featuredImage:blog?.featuredImage ??'',
          seoDescription:blog?.seoDescription ?? ''
        },
      })

      const blogSlug = form.watch('slug')
      useEffect(()=>{
        const newValue = blogSlug.replace(' ','-')
        form.setValue('slug',newValue)
      },[blogSlug,form])

     async function onSubmit(values: z.infer<typeof blogSchema>) {
      startTransition(async()=>{
        let res
        try {
          if(blog){
            res = await updateBlog(values,blog.id)
          }else{
            res = await createBlog(values)
          }
    
          if(!res.success){
            errorToast(res.message)
          }else{
            toast.success(res.message)
            router.push('/blogs')
            router.refresh()
          }
          
        } catch (error) {
            log({
              type:'error',
              messages:[error]
            })
        }
       
      })
      }


      return {form, onSubmit,pending}

}