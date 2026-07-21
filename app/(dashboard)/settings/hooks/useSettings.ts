"use client"
 
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
 
import { Settings } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { errorToast } from "@/lib/utils"
import { updateSettings } from "../actions/updateSettings"
import { toast } from "sonner"
import { settingsSchema } from "../schemas"

export const useSettings = (settings:Settings | null)=>{
    const zodSettingsSchema =settingsSchema(!!settings)
    const router = useRouter()
    const [pending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof zodSettingsSchema>>({
        resolver: zodResolver(zodSettingsSchema),
        defaultValues: {
            companyName:settings?.companyName ?? 'Eagle Car Rental',
            email:settings?.email ?? '',
            oldPassword:'',
            password: '',
            phoneNumber:settings?.phoneNumber ?? '',
            whatsAppNumber:settings?.whatsAppNumber ?? ''
        },
      })
     
      // 2. Define a submit handler.
     async function onSubmit(values: z.infer<typeof zodSettingsSchema>) {
         startTransition(async()=>{
          
           try {  
            const res = await updateSettings(values)

            if(!res.success){
              errorToast(res.message)
            }else{
              toast.success(res.message)
              router.refresh()
              form.setValue('password','')
              form.setValue('oldPassword','')
            }
            
           } catch (error) {
            errorToast()
           }
         })
    
      }


      return {
        onSubmit, form, pending
      }
}