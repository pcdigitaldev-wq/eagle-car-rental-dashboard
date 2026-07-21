'use client'

import { BlogCategory } from "@prisma/client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { errorToast, log } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { useModal } from "@/app/hooks/zustand"
import { useEffect } from "react"
import { carTypeSchema } from "../schemas"
import { createCarType } from "../actions/createCarType"
import { updateCarType } from "../actions/updateCarType"
 


export const useCarType = ()=>{
    const {setClose,modalInputs} = useModal()
    const router = useRouter()
   const carType  = modalInputs?.modal === 'carType' ? modalInputs.data : null
    const form = useForm<z.infer<typeof carTypeSchema>>({
        resolver: zodResolver(carTypeSchema),
        defaultValues: {
          title:carType?.title ?? '',
        },
      })

      //reset form 
      useEffect(() => {
      
          form.reset({
            title: carType?.title ?? '',
          });
       
         
      }, [carType, form]);

    async  function onSubmit(values: z.infer<typeof carTypeSchema>) {
        let res
        try {           
            if(!carType){ 
                res = await  createCarType(values)
            }else{
                res = await updateCarType({data:values,id:carType.id})
            }

            if(!res.success){
            
                errorToast(res.message)
            }else{
                setClose()
                router.refresh()
                toast.success(res.message)
            }
            log({messages:[JSON.stringify(res)],shouldLog:false})
            
        } catch (error) {
            errorToast()
            log({messages:[error],type:'error'})
        }
    
      }

    return {form, onSubmit}
}