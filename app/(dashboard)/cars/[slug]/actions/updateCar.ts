"use server";

import { z } from "zod";
import { carSchema } from "../schemas";
import { auth } from "@/auth";
import { throwCustomError } from "@/lib/utils";
import CustomError from "@/lib/CustomError";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const updateCar = async ({
  data,
  id,
}: {
  data: z.infer<typeof carSchema>;
  id: string;
}): Promise<{ success: boolean; message: string }> => {
  try {
    const session = await auth();
    if (!session) return throwCustomError("Unauthorized");
    if (!id) return throwCustomError("Car ID Is Required");
    const validData = carSchema.safeParse(data);
    if (!validData.success) return throwCustomError("Input Error");

    const {
      extraOptions,
      seats,
      kmIncluded,
      deposit,
      minimumRentalHours,
      ...rest
    } = validData.data;
    const slugExists = await prisma.car.findUnique({
      where: {
        slug: validData.data.slug,
        NOT:{id:id} 
      },
    });
    if (slugExists) return throwCustomError("Slug Already Exists");

    const existingCar = await prisma.car.findUnique({
      where: { id: id },
      include: { extraOptions: true },
    });

    if (!existingCar) {
     return throwCustomError("Car Not Found");
    }

    const incomingExtraOptions = extraOptions
    //define deleted extra options in incoming data - there ids don't exist and car extra options
    const extraOptionsToDelete = existingCar.extraOptions.filter(existingOption=>!incomingExtraOptions.some(incomingOption=>incomingOption.id === existingOption.id))
    //define extra options to be added or deleted
    const extraOptionsToUpsert: Prisma.ExtraOptionsUpsertArgs[] = incomingExtraOptions.map(
      (incomingOption) => ({
        where: { id: incomingOption.id || '' }, // Use a placeholder for non-existing IDs
        create: {
          title: incomingOption.title,
          price: Number(incomingOption.price),
          carId: id,
          daily:incomingOption.daily
        },
        update: {
          title: incomingOption.title,
          price: Number(incomingOption.price),
          daily:incomingOption.daily
        },
      })
    );

    //transaction contains array of operations - delete extra options - update car - upsert extra options
    await prisma.$transaction([
      prisma.extraOptions.deleteMany({
        where:{
          id:{
            in:extraOptionsToDelete.map(el=>el.id)
          }
        }
      }),

      prisma.car.update({
        where: {
          id,
        },
        data: {
          ...rest,
          seats: Number(seats),
          kmIncluded: Number(kmIncluded),
          deposit: Number(deposit),
          availableCars:Number(rest.availableCars),
      
          minimumRentalHours: Number(minimumRentalHours),
      
        },
      }),

      ...extraOptionsToUpsert.map(option=>
        prisma.extraOptions.upsert({
          where:option.where,
          create:option.create,
          update:option.update
        })
      )
    ])

    return { message: "Car Updated Successfully", success: true };

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
