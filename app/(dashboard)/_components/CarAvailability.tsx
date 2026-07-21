import prisma from '@/lib/prisma'
import React from 'react'
import ComboBoxField from './ComboboxField'
import AvailabilityComponent from './AvailabilityComponent'

type Props = {}

const CarAvailability =async (props: Props) => {

    const cars = await prisma.car.findMany({
        select:{
            id:true,
            subTitle:true,
            carType:{
                select:{
                    title:true
                }
            }
        }
         })

  return (
    <div>
          <h3 className="font-bold text-lg text-site-primary capitalize">
           Car Availability
          </h3>

          <div className='mt-[16px]'>
           <AvailabilityComponent cars={cars} />
          </div>

    </div>
  )
}

export default CarAvailability