'use client'
import SuperButton from "@/components/SuperButton"
import { useModal } from "@/app/hooks/zustand"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { errorToast, log } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { toast } from "sonner"
import { Button } from "./ui/button"

type Props = {}

const DeleteModal = (props: Props) => {
    const {setClose, open,modalInputs} = useModal()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
 
    const isOpen = open && modalInputs?.modal === 'delete'
    if(!isOpen) return 

    const {function:fn} = modalInputs

    const deleteHandler = async()=>{
      setIsLoading(true)
            try {
                const res =  await fn()
                  if(!res.success){
                      errorToast(res.message)
                  }else{
                      toast.success(res.message)
                      setClose()
                      router.refresh()
                  }
              } catch (error) {
                  log({
                      type:'error',
                      messages:[error]
                  })
                  errorToast()
                } finally{
                  setIsLoading(false)
                }
    }


  return (
<Dialog open={isOpen} onOpenChange={()=>{
  if(isLoading) return
  setClose()
  }}>  
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your account data from our servers.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
    <SuperButton clickHandler={deleteHandler} variant="destructive" title="Delete" buttonType="loadingButton" loading={isLoading} />
   <Button variant={'secondary'} onClick={()=>setClose()}>Cancel</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default DeleteModal