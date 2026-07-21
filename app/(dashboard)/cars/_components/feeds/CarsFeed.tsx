import prisma from "@/lib/prisma";
import React from "react";

import NoResult from "@/components/NoResult";
import CarCard from "../cards/CarCard";
import { LOCATIONS_CONST } from "@/lib/Types";

type Props = {
  carType: string | undefined;
  carTypeLabel:string | undefined
  location:(typeof LOCATIONS_CONST)[number] | undefined
};

const CarsFeed = async ({ carType, carTypeLabel,location }: Props) => {
  const cars = await prisma.car.findMany({
    where:{
      ...(carType &&{ carTypeId: carType } ),
      ...(location && {location})
    },
   
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      slug: true,
      image: true,
      subTitle: true,
      carType: {
        select: {
          title: true,
        },
      },
    },
  });

  return (
    <div>
      {!cars.length && (
        <div className="mt-2">
          <NoResult title="No Cars" description={!carType ?"Create Cars To Show Here" : `No Cars Found for "${carTypeLabel}" Type`} />
        </div>
      )}
      {!!cars.length && (
        <div className="min-h-[100px]  gap-[22px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-2">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarsFeed;
