import { Blog, BlogCategory, CarType } from '@prisma/client'
import { create } from 'zustand'

type ModalStore = {
  open: boolean
  modalInputs:ModalInputs | null
  setOpen:(data:ModalInputs)=>void
  setClose:()=>void
}

export type ModalInputs = 
{
modal:'category',
data?:BlogCategory
}  |{
  modal:'carType',
  data?:CarType
  }  |{
  modal:'delete',
  function:()=>Promise<{success:boolean,message:string}>
}

export const useModal = create<ModalStore>()((set) => ({
open:false,
modalInputs:null,
setOpen:(modalInputs:ModalInputs)=>set((state)=>({open:true,modalInputs})),
setClose:()=>set((state)=>({open:false,modalInputs:null})),
}))