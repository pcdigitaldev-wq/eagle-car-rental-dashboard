'use client'

import { BlogCategory } from "@prisma/client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { errorToast, log } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { createCategory } from "../actions/createCategory"
import { updateCategory } from "../actions/updateCategory"
import { categorySchema } from "../schemas"
import { useModal } from "@/app/hooks/zustand"
import { useEffect } from "react"
 


export const useCategory = ()=>{
    const {setClose,modalInputs} = useModal()
    const router = useRouter()
   const category  = modalInputs?.modal === 'category' ? modalInputs.data : null
    const form = useForm<z.infer<typeof categorySchema>>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
          title:category?.title ?? '',
        },
      })

      //reset form 
      useEffect(() => {
      
          form.reset({
            title: category?.title ?? '',
          });
       
         
      }, [category, form]);

    async  function onSubmit(values: z.infer<typeof categorySchema>) {
        let res
        try {           
            if(!category){ 
                res = await  createCategory(values)
            }else{
                res = await updateCategory({data:values,id:category.id})
            }

            if(!res.success){
            
                errorToast(res.message)
            }else{
                setClose()
                router.refresh()
                toast.success(res.message)
            }
            log({messages:[JSON.stringify(res)]})
            
        } catch (error) {
            errorToast()
            log({messages:[error],type:'error'})
        }
    
      }

    return {form, onSubmit}
}