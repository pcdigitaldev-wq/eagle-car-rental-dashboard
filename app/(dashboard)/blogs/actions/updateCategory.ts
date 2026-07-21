"use server";

import { auth } from "@/auth";
import CustomError  from "@/lib/CustomError";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { throwCustomError } from "@/lib/utils";
import { categorySchema } from "../schemas";

export const updateCategory = async ({data,id}:{data: z.infer<typeof categorySchema>,id:string}):Promise<{success:boolean,message:string}> => {
  try {
    const session = await auth();
    if (!session) return throwCustomError("Unauthorized");

    if(!id)return throwCustomError('ID Is Required')

    const validData = categorySchema.safeParse(data);
    if (!validData.success)return   throwCustomError("Invalid Inputs");

    await prisma.blogCategory.update({
      where:{
        id
      },
        data:{...validData.data}
    })

    return {success:true,message:"Category Updated Successfully"}

  } catch (error) {
    if(error instanceof CustomError){
        return {
            success:false,
            message:error.message
        }
    }
    return {success:false,message:'Internal Server Error'}
  }
};
