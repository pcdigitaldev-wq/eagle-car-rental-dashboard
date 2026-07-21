'use server'

import { z } from "zod"
import { blogSchema } from "../schemas"
import { auth } from "@/auth"
import { throwCustomError } from "@/lib/utils"
import CustomError from "@/lib/CustomError"
import prisma from "@/lib/prisma"

export const createBlog = async(data: z.infer<typeof blogSchema>):Promise<{success:boolean,message:string}>=>{

    try {
        const session = await auth()
        if(!session) return throwCustomError('Unauthorized')

            const validData = blogSchema.safeParse(data)
            if(!validData.success) return throwCustomError('Invalid Inputs')

                const slugExist = await prisma.blog.findUnique({
                    where:{
                        slug:validData.data?.slug
                    }
                })

                if(slugExist) return  throwCustomError('Blog Slug Already Exists')

                    await prisma.blog.create({
                        data:{
                            ...validData.data
                        }
                    })

                    return {message:'Blog Created Successfully',success:true}
    } catch (error) {
        {
            console.error(error)
            if(error instanceof CustomError){
                return {
                    success:false,
                    message:error.message
                }
            }
            return {success:false,message:'Internal Server Error'}
          }
    }
  

}