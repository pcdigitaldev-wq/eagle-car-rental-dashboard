"use client";

import React from "react";
import ComboBoxField from "./ComboboxField";
import { useDailyRevenue } from "@/app/hooks/useDailyRevenue";
import DateField from "./DataField";
import PopOverField from "./PopoverField";
import { Loader } from "lucide-react";
import SuperButton from "@/components/SuperButton";
import { cn } from "@/lib/utils";
import { formatInTimeZone } from "date-fns-tz";
import { Skeleton } from "@/components/ui/skeleton";
import CarAvailabilityResult from "./CarAvailabilityResult";

type Props = {
  cars: { id: string; subTitle: string; carType: { title: string } }[];
};

const AvailabilityComponent = ({ cars }: Props) => {
  const refactoredCars = cars.map((car) => ({
    value: car.id,
    label: `${car.carType.title} - ${car.subTitle}`,
  }));

  const {
    availabilityQuery,
    carId,
    endDate,
    endTime,
    hours,
    setCarIdFn,
    setEndDateFn,
    setEndTimeFn,
    setStartDateFn,
    setStartTimeFn,
    startDate,
    startTime,
    fetchFn,
  } = useDailyRevenue();

  const { data, error, isPending } = availabilityQuery;
  const success = data?.success;
  const isAvailable = success ? data.available : undefined;
  const dates = success && data.available === false ? data.dates : undefined;
  const message = success ? data.message : "";

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="flex flex-col gap-2">
          <ComboBoxField
            items={refactoredCars}
            placeholder="Choose a car"
            stateLabel="Choose Car"
            value={carId}
            setValue={(value: string) => {
              setCarIdFn(value);
            }}
            push={false}
            param=""
          />

          <div className="flex flex-col gap-2">
            <DateField
              placeholder="Choose Start Date"
              setValue={(value: string) => setStartDateFn(value)}
              value={startDate}
              stateLabel="Start Date"
            />
            <PopOverField
              items={hours}
              setValue={(val: string) => setStartTimeFn(val)}
              value={startTime}
              placeholder="Start Time"
              stateLabel="Start Time"
            />
          </div>
        </div>

       
          <div className="flex flex-col gap-2">
            <DateField
              placeholder="Choose End Date"
              setValue={(value: string) => setEndDateFn(value)}
              value={endDate}
              stateLabel="End Date"
            />
            <PopOverField
              items={hours}
              setValue={(val: string) => setEndTimeFn(val)}
              value={endTime}
              placeholder="End Time"
              stateLabel="End Time"
            />
            <SuperButton
            className="mt-auto"
              title="Check Car"
              loading={isPending}
              buttonType="loadingButton"
              clickHandler={fetchFn}
            />
         
        </div>
      </div>
      <CarAvailabilityResult
      dates={dates}
      error={error}
      isAvailable={isAvailable}
      isPending={isPending}
      message={message}
      success={success}
      />
    </div>
  );
};

export default AvailabilityComponent;
