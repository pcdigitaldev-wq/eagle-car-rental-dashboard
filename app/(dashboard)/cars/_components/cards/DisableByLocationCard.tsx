"use client";

import React from "react";
import {
  DisableCarsByLocation,
  useDisableByLocation,
} from "../../hooks/useDisableByLocation";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import SuperButton from "@/components/SuperButton";

type Props = { carsByLocation: DisableCarsByLocation; location: string };

const DisableByLocationCard = ({ carsByLocation, location }: Props) => {
  const { cars, setCarsFn, all, setAllFn,handleClick,pending } =
    useDisableByLocation(carsByLocation);
  return (
    <div className="flex flex-col gap-4 h-full " >
      <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer" onClick={setAllFn}>
        <Label className="capitalize font-[500] select-none text-xl" >{location}</Label>
        <Checkbox checked={all} className="" />
      </div>

      <div className="w-full flex flex-col gap-4 ">
        {cars?.map((car) => (
          <div key={car.id} className="flex items-center gap-3 justify-between p-2 rounded-md hover:bg-muted cursor-pointer" onClick={() => setCarsFn(car.id)}>
            <Label className="select-none cursor-pointer">{car.subTitle}</Label>
            <Checkbox
              checked={car.disabled}
             className="pointer-events-none"
            />
          </div>
        ))}
      </div>

      <SuperButton
        buttonType="loadingButton"
        title="Apply"
        loading={pending}
        clickHandler={handleClick}
        className="mt-auto select-none"
      />
    </div>
  );
};

export default DisableByLocationCard;
