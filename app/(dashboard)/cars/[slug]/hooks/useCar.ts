"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  carSchema,
  extraOptionsSchema,
  ExtraOptionsType,
  PricingType,
} from "../schemas";
import { Car } from "@prisma/client";
import { errorToast, log } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { updateCar } from "../actions/updateCar";
import { createCar } from "../actions/createCar";
import { toast } from "sonner";

export const useCar = (car: Car | null, extraOptions: ExtraOptionsType[]) => {
  console.log("EXTRA_OPTIONS",extraOptions)
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof carSchema>>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      slug: car?.slug ?? "",
      carTypeId: car?.carTypeId ?? "",
      subTitle: car?.subTitle ?? "",
      location: car?.location ?? "LAS_VEGAS",
      seats: String(car?.seats ?? ""),
      availableCars:String(car?.availableCars ?? ''),
      
      fuel: car?.fuel ?? "DIESEL",
      image: car?.image ?? "",
      pricing: (car?.pricing as unknown as PricingType) ?? {
        hour: "",
        days: Array(6).fill(""),
      week:"",
      month:""
      },
      extraOptions: extraOptions,
      kmIncluded: `${car?.kmIncluded ?? ""}`,
      minimumRentalHours: `${car?.minimumRentalHours ?? ""}`,
      deposit: `${car?.deposit ?? ""}`,
      disabled: car?.disabled ?? false,
    },
  });

  const carSlug = form.watch('slug')
  useEffect(()=>{
    const newValue = carSlug.replace(' ','-')
    form.setValue('slug',newValue)
  },[carSlug,form])

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof carSchema>) {
    startTransition(async () => {

      try {
        let res;
        if (car) {
          res = await updateCar({data:values,id:car.id})
        } else {
          res = await createCar(values)
        }
        if(!res.success){
          errorToast(res.message)
        }else{
          toast.success(res.message)
          router.push('/cars')
        }
      } catch (error) {
        errorToast()
        console.error("car create error",error)
      }
  
    });

    log({
      messages: ["Car Values", values],
      shouldLog: true,
    });
  }

  return { form, onSubmit, pending };
};
