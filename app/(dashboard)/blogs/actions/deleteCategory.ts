"use server"

import { auth } from "@/auth"
import CustomError from "@/lib/CustomError"
import prisma from "@/lib/prisma"
import { throwCustomError } from "@/lib/utils"

export const deleteCategory = async(id:string):Promise<{success:boolean,message:string}>=>{

    try {
const session = await auth()
if(!session) return throwCustomError('Unauthorized')
    if(!id) return throwCustomError('id is required')

        const relatedBlogsCount = await prisma.blog.count({
            where: {
              categoryId: id,
            },
          });
      
          if (relatedBlogsCount > 0) {
          return throwCustomError(`Unable To Delete - You have ${relatedBlogsCount} blog${relatedBlogsCount > 1 ? 's' : ''} Related To This Category`)
          }

        const deletedItem = await prisma.blogCategory.delete({
            where:{
                id
            }
        })

        if(!deletedItem) return throwCustomError('Items does not exist')

            return {success:true,message:'Item deleted successfully'}
        
    } catch (error) {
        if(error instanceof CustomError){
            return {
                success:false,
                message:error.message
            }
        }
        return {success:false,message:'Internal Server Error'}
}
}