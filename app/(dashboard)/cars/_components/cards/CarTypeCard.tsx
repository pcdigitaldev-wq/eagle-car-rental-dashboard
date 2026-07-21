'use client'
import SuperButton from '@/components/SuperButton'
import { BlogCategory, CarType } from '@prisma/client'
import { Delete, Edit, Trash } from 'lucide-react'
import React from 'react'
import { deleteCarType } from '../../actions/deleteCarType'
 

type Props = {
    carType:CarType
}

const CarTypeCard = ({carType}: Props) => {
  return (
    <div className='border rounded-md flex items-center  flex-col p-2 gap-2 w-fit'>
        {<p className='capitalize text-sm font-semibold'>{carType.title}</p>}
        <div className='flex items-center gap-1'>
        <SuperButton className='w-12 h-6' variant='site'  buttonType='modalButton' modalInputs={{modal:'carType',data:carType}} Icon={<Edit className='icon'/>} />
        <SuperButton className='w-12 h-6' variant='destructive'  buttonType='modalButton' modalInputs={{modal:'delete',function:()=>deleteCarType(carType.id)}} Icon={<Trash className='icon'/>} />
        </div>
     
    </div>
  )
}

export default CarTypeCard