import { z } from "zod"
 
export const blogSchema = z.object({
  slug: z.string().min(1,'Required').max(70),
  title:z.string().min(1,'Required').max(70),
  seoDescription:z.string().min(1,"Required").max(1000),
  featuredImage: z.string().min(1,'Required'),
  content:z.string().min(1,'Required'),
  categoryId:z.string().min(1,"Required")
})