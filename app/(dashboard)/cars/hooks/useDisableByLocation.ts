import { errorToast } from "@/lib/utils";
import { useEffect, useState, useTransition } from "react";
import { disableByLocation } from "../actions/disableByLocation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type DisableCarsByLocation = { id: string; disabled: boolean ,subTitle:string}[];
export const useDisableByLocation = (carsByLocation: DisableCarsByLocation) => {
  const [cars, setCars] = useState(carsByLocation);
  const [all, setAll] = useState(carsByLocation?.every(car=>car.disabled))
 

  const setCarsFn = (id: string) => {
    console.log("pressed",id)
     const allCars = cars
     const refactoredCars:DisableCarsByLocation = allCars.map(car=>{
        if(car.id===id){
            console.log('done')
            return ({id:car.id,disabled:!car.disabled,subTitle:car.subTitle})}
            else{ 
                console.log('other')
                return car}
     })

     setCars(refactoredCars)
  };

  const setAllFn = ()=>{
    console.log(all)
    const refactoredCars:DisableCarsByLocation = cars?.map(car=>({...car,disabled:!all}))
    setCars(refactoredCars)
    
  }

  useEffect(()=>{
setAll(cars?.every(car=>car.disabled))

  },[cars])

const router = useRouter()
const [pending, startTransition] = useTransition()
  const handleClick = async()=>{
    startTransition(async()=>{
      try {
         
        const res = await disableByLocation(cars)
        if(!res.success){
          toast.error(res.message)
        }else{
          router.refresh()
          toast.success(res.message)
        }
      } catch (error) {
        console.log(error)
        errorToast()
        
      }finally{
     
      }
    })
   
  }

  return {cars,setCarsFn,all,setAllFn,handleClick,pending}
};
