"use server";

import { auth } from "@/auth";
import CustomError from "@/lib/CustomError";
import { z } from "zod";
 
import prisma from "@/lib/prisma";
import { carTypeSchema } from "../schemas";
import { throwCustomError } from "@/lib/utils";

export const createCarType = async (data: z.infer<typeof carTypeSchema>):Promise<{success:boolean,message:string}> => {
  try {
    const session = await auth();
    if (!session) return  throwCustomError("Unauthorized");
    if (!(carTypeSchema instanceof z.ZodObject)) {
      throw new Error("carTypeSchema is not a valid zod schema");
    }
    const validData = carTypeSchema.safeParse(data);
    if (!validData.success) return throwCustomError("Invalid Inputs");

    await prisma.carType.create({
        data:{...validData.data}
    })

    return {success:true,message:"Car Type Created Successfully"}

  } catch (error) {
    console.error(error)
    if(error instanceof CustomError){
        return {
            success:false,
            message:error.message
        }
    }
    return {success:false,message:'Internal Server Error'}
  }
};
