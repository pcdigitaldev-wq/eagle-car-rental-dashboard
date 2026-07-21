'use server'

import { z } from "zod"
import { blogSchema } from "../schemas"
import { auth } from "@/auth"
import { throwCustomError } from "@/lib/utils"
import CustomError from "@/lib/CustomError"
import prisma from "@/lib/prisma"

export const updateBlog = async(data: z.infer<typeof blogSchema>,blogId:string):Promise<{success:boolean,message:string}>=>{

    try {
        const session = await auth()
        if(!session) return throwCustomError('Unauthorized')
            if(!blogId) return throwCustomError("ID Is Required")
            const validData = blogSchema.safeParse(data)
            if(!validData.success) return throwCustomError('Invalid Inputs')

                const slugExists = await prisma.blog.findUnique({
                    where:{
                        slug:validData.data?.slug,
                        NOT:{
                            id:blogId
                        }
                    }
                })

                if(slugExists) return  throwCustomError('Blog Slug Already Exists')

                    await prisma.blog.update({
                        where:{
                            id:blogId
                        },
                        data:{
                            ...validData.data
                        }
                    })

                    return {message:'Blog Updated Successfully',success:true}
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