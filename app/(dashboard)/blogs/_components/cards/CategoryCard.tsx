'use client'
import SuperButton from '@/components/SuperButton'
import { BlogCategory } from '@prisma/client'
import { Delete, Edit, Trash } from 'lucide-react'
import React from 'react'
import { deleteCategory } from '../../actions/deleteCategory'

type Props = {
    category:BlogCategory
}

const CategoryCard = ({category}: Props) => {
  return (
    <div className='border rounded-md flex items-center  flex-col p-2 gap-2 w-fit'>
        {<p className='capitalize text-sm font-semibold'>{category.title}</p>}
        <div className='flex items-center gap-1'>
        <SuperButton variant='site'  buttonType='modalButton' modalInputs={{modal:'category',data:category}} Icon={<Edit className='icon'/>} />
        <SuperButton variant='destructive'  buttonType='modalButton' modalInputs={{modal:'delete',function:()=>deleteCategory(category.id)}} Icon={<Trash className='icon'/>} />
        </div>
     
    </div>
  )
}

export default CategoryCard