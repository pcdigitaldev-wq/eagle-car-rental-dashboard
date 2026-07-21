"use client";
import SuperButton from "@/components/SuperButton";
import { LOCATIONS, LOCATIONS_CONST, LOCATIONS_MAP } from "@/lib/Types";
import React from "react";
 
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
 

type Props = {};

const CarsByLocation = (props: Props) => {
  const searchParams = useSearchParams();
  const chosenLocation = searchParams.get("pickUpLocation")  
  return (
 
      <div>
        <div className="mt-[52px] flex items-center justify-center gap-[16px] flex-wrap">
               <SuperButton
  
              buttonType="pushButton"
              href={`/cars`}
              title={'All'}
              variant="site"
              className={cn(
                "rounded-full capitalize bg-transparent text-black hover:bg-site-primary hover:text-white",
                !chosenLocation  && "bg-site-primary text-white"
              )}
            />
          {LOCATIONS_CONST.map((location,index) => (
            <SuperButton
            key={`location-button-${index}`}
              buttonType="pushButton"
              href={`/cars?pickUpLocation=${location}`}
              title={LOCATIONS_MAP[location]}
              variant="site"
              className={cn(
                "rounded-full capitalize bg-transparent text-black hover:bg-site-primary hover:text-white",
                chosenLocation === location && "bg-site-primary text-white"
              )}
            />
          ))}
        </div>
      </div>
 
  );
};

export default CarsByLocation;
