import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { formatInTimeZone } from "date-fns-tz";
import { AlarmCheck, AlertTriangle, Check, CircleX, OctagonAlertIcon } from "lucide-react";
import React from "react";

type Props = {
  isPending: boolean;
  error: Error | null;
  success: boolean | undefined;
  isAvailable: boolean | undefined;
  message: string;
  dates:
    | {
        startDate: string;
        endDate: string;
      }[]
    | undefined;
};

const CarAvailabilityResult = ({
  error,
  isPending,
  success,
  isAvailable,
  message,
  dates,
}: Props) => {

  const statusClassName = isAvailable
    ? "text-green-500 bg-green-100 border-green-500 border rounded-md p-4"
    : "text-yellow-500 bg-yellow-100 border-yellow-500 border rounded-md p-4";

  const StatusIcon = isAvailable ? (
    <Check className="text-green-500 w-12 h-12" />
  ) : (
    <AlertTriangle className="text-yellow-500 w-12 h-12" />
  );

  if (isPending)
    return (
      <div>
        <Skeleton className="rounded-md w-full min-h-[150px]  " />
      </div>
    );
  else if (error)
    return (
      <div>
        <p className="p-3 border-red-500 text-red-500 bg-red-50 rounded-md border flex items-center gap-3 justify-center">
          <CircleX className="text-red-500 w-12 h-12" />{error.message}
        </p>
      </div>
    );
  else if (success)
    return (
      <div className="w-full">
        <p className={cn("w-full flex items-center gap-1 justify-center", statusClassName)}>{StatusIcon}{message}</p>
        {dates?.length && (
          <div className="flex flex-col gap-3 mt-3">
            <p className="font-semibold capitalize">
              Found {dates.length}
              {` booking${dates.length > 1 ? "s" : ""} in this range`}
            </p>
            <div className="flex items-center gap-6 flex-wrap">
            {dates.map((date, index) => (
              <div key={index} className="text-xs flex flex-col gap-1 border rounded-md p-3 ">
               <span className="font-bold capitalize mb-2">booking {index + 1}</span>
                <span className="flex items-center gap-1">
                  <span className="text-xs font-semibold">Start Date: </span>

                  <span className="text-xs text-muted-foreground">
                    {formatInTimeZone(
                      new Date(date.startDate),
                      "UTC",
                      "MMM, dd yyyy - HH:mm"
                    )}
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-xs font-semibold">End Date: </span>

                  <span className="text-xs text-muted-foreground">
                    {formatInTimeZone(
                      new Date(date.endDate),
                      "UTC",
                      "MMM, dd yyyy - HH:mm"
                    )}
                  </span>
                </span>
              </div>
            ))}
            </div>
         
          </div>
        )}
      </div>
    );
};

export default CarAvailabilityResult;
