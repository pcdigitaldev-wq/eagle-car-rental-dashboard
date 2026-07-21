"use client";

import ImageComponent from "@/components/ImageComponent";
import SuperButton from "@/components/SuperButton";
import { CarCardWithCarType } from "@/lib/Types";

import { Car } from "@prisma/client";
import { Edit, Trash } from "lucide-react";
import React from "react";
import { deleteCar } from "../../[slug]/actions/deleteCar";

type Props = {
  car: CarCardWithCarType;
};

const CarCard = ({ car }: Props) => {
  return (
    <div className="rounded-[12.48px] border overflow-hidden w-full">
      <ImageComponent aspect="video" src={car.image} alt="car-image" />
      <div className="py-[15px] px-[12px] flex flex-col w-full gap-[10.58px]">
        <h3 className="text-[13px] font-[600] text-black/80 capitalize">{car.subTitle}</h3>
        <div className="flex items-center justify-between gap-3">
          <SuperButton
          className="rounded-full text-[11px] capitalize   flex-1 h-[29px] items-center leading-[13.31px]"
            buttonType="linkButton"
            title="Update Car"
            Icon={<Edit className="icon" />}
            href={`/cars/${car.slug}`}
          />
          <SuperButton
          buttonType="modalButton"
          className="h-[29px] w-[45px] rounded-full"
          modalInputs={{modal:'delete',function:()=>deleteCar(car.id)}}
          Icon={<Trash className="icon" />}
          variant="destructive"
          />
        </div>
      </div>
    </div>
  );
};

export default CarCard;
