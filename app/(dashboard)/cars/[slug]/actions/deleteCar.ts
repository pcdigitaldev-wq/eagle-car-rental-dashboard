"use server"

import { auth } from "@/auth"
import CustomError from "@/lib/CustomError"
import prisma from "@/lib/prisma"
import {  throwCustomError } from "@/lib/utils"

export const deleteCar = async(id:string):Promise<{success:boolean,message:string}>=>{

    try {
const session = await auth()
if(!session) return throwCustomError('Unauthorized')
    if(!id) return throwCustomError('id is required')

        const bookingCount = await prisma.booking.count({
            where: { carId: id },
          });
      
          if (bookingCount > 0) {
            return {
              success: false,
              message: "Car cannot be deleted because it has active bookings.",
            };
          }

          
        const deletedItem = await prisma.car.delete({
            where:{
                id
            }
        })
        
        if(!deletedItem) return throwCustomError('Items does not exist')

            return {success:true,message:'Item deleted successfully'}
        
    } catch (error) {
        console.error("Delete Car Error::",error)
        if(error instanceof CustomError){
            return {
                success:false,
                message:error.message
            }
        }
        return {success:false,message:JSON.stringify(error)}
}
}