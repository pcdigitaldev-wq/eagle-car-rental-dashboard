 
import React from 'react'
import Heading from '../../_components/Heading'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import NoResult from '@/components/NoResult'
import SuperButton from '@/components/SuperButton'
import { ChevronLeft } from 'lucide-react'
import CarForm from './_components/forms/CarForm'

type Props = {
    params:Promise<{slug:string}>
}

const CarPage = async({params}: Props) => {
  const {slug} = await params
  const carTypesRes = prisma.carType.findMany()
    const carRes =  prisma.car.findUnique({
        where:{
            slug:slug,
            
        },
    })

    const extraOptionsRes = prisma.extraOptions.findMany({
      where:{
        car:{
          slug:slug
        }
      }
    })

    const [carTypes,car,extraOptions] = await  Promise.all([carTypesRes,carRes,extraOptionsRes])
    if(!car && slug !=='new') return notFound()
    const title = car ? `Update ${car.subTitle}` : 'Create New Car'

    if(!carTypes.length) return (
      <div>
      <NoResult
        title="No Car Types"
        description="Please Create Car Types First"
      />
      <SuperButton className="mt-2" buttonType="linkButton" href={"/cars"} title="Back" Icon={<ChevronLeft className="icon" />} />
    </div>
    )
  return (
    <div>
           <Heading title={title} />
            {/* car form */}
      <div className="mt-2">
        <CarForm car={car} carTypes={carTypes} extraOptions={extraOptions.map(item=>({title:item.title,price:String(item.price),id:item.id,daily:item.daily}))} />
      </div>
    </div>
  )
}

export default CarPage