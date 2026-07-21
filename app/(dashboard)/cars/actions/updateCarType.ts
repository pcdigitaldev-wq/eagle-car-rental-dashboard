"use server";

import { auth } from "@/auth";
import CustomError  from "@/lib/CustomError";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { throwCustomError } from "@/lib/utils";
import { carTypeSchema } from "../schemas";

export const updateCarType = async ({data,id}:{data: z.infer<typeof carTypeSchema>,id:string}):Promise<{success:boolean,message:string}> => {
  try {
    const session = await auth();
    if (!session) return throwCustomError("Unauthorized");

    if(!id)return throwCustomError('ID Is Required')

    const validData = carTypeSchema.safeParse(data);
    if (!validData.success)return   throwCustomError("Invalid Inputs");

    await prisma.carType.update({
      where:{
        id
      },
        data:{...validData.data}
    })

    return {success:true,message:"Car Type Updated Successfully"}

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
