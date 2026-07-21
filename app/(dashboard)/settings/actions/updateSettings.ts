"use server";

import { z } from "zod";
import { settingsSchema } from "../schemas";
import CustomError from "@/lib/CustomError";
import { auth } from "@/auth";
import { throwCustomError } from "@/lib/utils";
import prisma from "@/lib/prisma";

export const updateSettings = async (
  settings: unknown
): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session) return throwCustomError("Unauthorized");



    const existSettings =  await prisma.settings.findUnique({
      where:{
          id:'settings'
      }})

      const zodSettingsSchema = settingsSchema(!!existSettings)

      const validData = zodSettingsSchema.safeParse(settings);
      if (!validData.success) return throwCustomError("Input Error");
  
      const {oldPassword, ...rest} = validData.data

      if(existSettings && rest.password){
        if(oldPassword !==existSettings.password) return throwCustomError('Old Password Is Not Correct')
      }

      const {password, ...remainingData} = rest
    await prisma.settings.upsert({
        where:{
            id:'settings'
        },
        create:{
           ...remainingData,
          password:password!
        },
        update:{
          ...remainingData,
          ...(password && {password})

        }

    })

    return {success:true,message:'Settings Successfully Updated'}
  } catch (error) {
    console.error(error);
    if (error instanceof CustomError) {
      return {
        success: false,
        message: error.message,
      };
    }
    return { success: false, message: "Internal Server Error" };
  }
};
