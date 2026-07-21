'use server'

import CustomError from "@/lib/CustomError"
import { DisableCarsByLocation } from "../hooks/useDisableByLocation"
import { auth } from "@/auth"
import { throwCustomError } from "@/lib/utils"
import prisma from "@/lib/prisma"


export const disableByLocation = async (cars:DisableCarsByLocation):Promise<{success:boolean,message:string}> =>{

    try {
        const session = await auth()
        if(!session) return throwCustomError('Unauthorized')

                // Perform batch update in Prisma
    await prisma.$transaction(
        cars?.map(car =>
          prisma.car.update({
            where: { id: car.id },
            data: { disabled: car.disabled }
          })
        )
      );
  
      return { success: true, message: "Updated successfully" };
        
    }catch (error) {
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