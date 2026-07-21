"use server";

import CustomError from "@/lib/CustomError";
import prisma from "@/lib/prisma";
import { checkBookingAvailability, combineDateAndTimeToUTC, throwCustomError } from "@/lib/utils";

export const getAvailability = async (
  carId: string,
  startDate: string,
  startTime: string,
  endDate: string,
  endTime: string
): Promise<
  | { success: false; message: string }
  | {
      success: true;
      available: false;
      message: string;
      dates: { startDate: string; endDate: string }[];
    }
  | {
      success: true;
      available: true;
      message: string;
    }
> => {
  try {
    if (!carId) return throwCustomError("Car ID is required");

    if (!startDate || !startTime || !endDate || !endTime)
      return throwCustomError("Dates are required");

    const completeStartDate = combineDateAndTimeToUTC(startDate, startTime);
    const completeEndDate = combineDateAndTimeToUTC(endDate, endTime);

    const car = await prisma.car.findUnique({
      where: {
        id: carId,
      },
      include: {
        bookings: {
          where: {
            status: {
              in: ["PAID", "PENDING"],
            },
            startDate: { lte: completeEndDate },
            endDate: { gte: completeStartDate },
          },
          select: {
            startDate: true,
            endDate: true,
          },
        },
      },
    });

    if (!car) return throwCustomError("Car Does Not Exist");

    const isAvailable = checkBookingAvailability(car.bookings,completeStartDate,completeEndDate,car.availableCars)
    
    if (!isAvailable) {
      return {
        success: true,
        message: "Car Is Not Available",
        available: false,
        dates: car.bookings.map((booking) => ({
          startDate: booking.startDate.toISOString(),
          endDate: booking.endDate.toISOString(),
        })),
      };
    } else {
      return { success: true, available: true, message: "Car Is Available" };
    }
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
