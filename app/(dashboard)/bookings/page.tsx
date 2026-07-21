import React, { Suspense } from "react";
import Heading from "../_components/Heading";
import { wait } from "@/lib/utils";

import { Skeleton } from "@/components/ui/skeleton";
import BookingsFeed from "./_components/feeds/BookingsFeed";
import Search from "@/components/Search";
import { $Enums } from "@prisma/client";
import { BOOKING_STATUS_CONST, BOOKING_STATUS_MAP } from "@/lib/Types";

type Props = {
  searchParams: Promise<{
    page: string | undefined;
    q: string | undefined;
    status: $Enums.BookingStatus | undefined;
  }>;
};

const BookingsPage = async ({ searchParams }: Props) => {
  let pageNumber = (await searchParams).page;
  const q = (await searchParams).q;
  const status = (await searchParams).status;

  if (
    !pageNumber ||
    isNaN(Number(pageNumber)) ||
    Number(pageNumber) < 1 ||
    !Number.isInteger(Number(pageNumber))
  ) {
    console.warn("Invalid page param::", pageNumber);
    pageNumber = "1";
  }

  const values = Object.keys(BOOKING_STATUS_MAP).map((key) => ({
    key: BOOKING_STATUS_MAP[key as (typeof BOOKING_STATUS_CONST)[number]],
    value: key as (typeof BOOKING_STATUS_CONST)[number],
  }));
  return (
    <div>
      <div className="flex justify-between w-full items-start">
        <Heading title="Bookings" />
        <div className="flex items-center gap-4">
          <Search
            inputType={"input"}
            searchParam="q"
            label="Search for Booking"
            placeholder="BookingID, Name or Email"
            inputClassName="placeholder:text-[12px]"
          />
          <Search
            inputType={"select"}
            searchParam="status"
            label="Filter By Status"
            placeholder="Filter Bookings By Status"
            inputClassName="placeholder:text-[12px]"
            className="ml-auto"
            values={values}
            renderItem={async (item) => {
              "use server";
              return { label: item.key, value: item.value };
            }}
          />
        </div>
      </div>

      {/* booking feed */}
      <div className="mt-12">
        <Suspense
          key={pageNumber}
          fallback={<Skeleton className="h-[600px] w-full mt-2" />}
        >
          <BookingsFeed q={q} page={pageNumber} status={status} />
        </Suspense>
      </div>
    </div>
  );
};

export default BookingsPage;
