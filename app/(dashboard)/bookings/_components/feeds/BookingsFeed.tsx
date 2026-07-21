import prisma from "@/lib/prisma";
import React from "react";
import BookingsTable from "../tables/BookingsTable";
import { TAKE_BOOKINGS } from "@/lib/Types";
import { $Enums, Prisma } from "@prisma/client";

type Props = {
  page: string;
  q: string | undefined;
  status:$Enums.BookingStatus | undefined
};

const BookingsFeed = async ({ page, q, status }: Props) => {
  const pageNumber = Number(page);

  const whereClause: Prisma.BookingWhereInput = {
    ...(q && {
      OR: [
        { bookingID: { contains: q } },
        { email: { contains: q } },
        { firstName: { contains: q } },
        { lastName: { contains: q } },
      ],
    }),
    ...(status && { status }), // Add status filter if provided
  };
  const bookingsRes = prisma.booking.findMany({
    where:Object.keys(whereClause).length > 0 ? whereClause : undefined,
    select: {
      bookingID: true,
      createdAt: true,
      firstName: true,
      lastName: true,
      email: true,
      status: true,
      totalAmount: true,
      startDate:true,
      endDate:true,
      payNow:true,
    },
    take: TAKE_BOOKINGS,
    skip: (pageNumber - 1) * TAKE_BOOKINGS,
    orderBy: {
      createdAt: "desc",
    },
  });

  const bookingsCountRes = prisma.booking.count({
    where:Object.keys(whereClause).length > 0 ? whereClause : undefined,
  });

  const [bookings, bookingsCount] = await Promise.all([
    bookingsRes,
    bookingsCountRes,
  ]);
  console.log("Page::", page);
  console.log("Bookings Count::", bookingsCount);
  return (
    <BookingsTable q={q} bookings={bookings} bookingsCount={bookingsCount} />
  );
};

export default BookingsFeed;
