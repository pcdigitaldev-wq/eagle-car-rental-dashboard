"use server";

import { z } from "zod";
import { carSchema } from "../schemas";
import { auth } from "@/auth";
import { throwCustomError } from "@/lib/utils";
import CustomError from "@/lib/CustomError";
import prisma from "@/lib/prisma";

export const createCar = async (data: z.infer<typeof carSchema>):Promise<{success:boolean,message:string}> => {
  try {
    const session = await auth();
    if (!session) return throwCustomError("Unauthorized");

    const validData = carSchema.safeParse(data);
    if (!validData.success) return throwCustomError("Input Error");

    const {extraOptions,seats,kmIncluded,deposit,minimumRentalHours, ...rest} = validData.data
    const slugExists = await prisma.car.findUnique({
        where:{
            slug:validData.data.slug
        }
    })
    if(slugExists) return throwCustomError('Slug Already Exists')

        console.log('BEFORE_CREATE *************',rest.pricing,extraOptions)

    await prisma.car.create({
        data:{
            ...rest,
            seats:Number(seats),
            kmIncluded:Number(kmIncluded),
            deposit:Number(deposit),
            availableCars:Number(rest.availableCars),    
            minimumRentalHours:Number(minimumRentalHours),
            disabled:false,
            extraOptions:{
                createMany: {
                    data:extraOptions.map(option=>({price:Number(option.price),title:option.title,daily:option.daily}))
                }
            },
             

        }
    })
    console.log('AFTER_CREATE *************')

    return {message:'Car Created Successfully',success:true}

  } catch (error) {
    console.error("create carr error::",error)
    if(error instanceof CustomError){
        return {
            success:false,
            message:error.message
        }
    }
    return {success:false,message:'Internal Server Error'}
  }
};
