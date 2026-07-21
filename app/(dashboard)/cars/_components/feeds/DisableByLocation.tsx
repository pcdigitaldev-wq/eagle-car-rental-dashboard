import { LOCATIONS, LOCATIONS_MAP } from '@/lib/Types'
import React from 'react'
import DisableByLocationCard from '../cards/DisableByLocationCard'
import prisma from '@/lib/prisma'
import { $Enums } from '@prisma/client'

type Props = {}

const DisableByLocation = async (props: Props) => {
  const carsByLocation = await prisma.car.findMany({
    select:{
      id:true,
      disabled:true,
      location:true,
      subTitle:true
    }
  })

  const groupedCars = carsByLocation.reduce((acc, car) => {
    if (!acc[car.location]) {
      acc[car.location] = [];
    }
    acc[car.location].push(car);
    return acc;
  }, {} as Record<$Enums.Locations, typeof carsByLocation>);



  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-20 w-full mt-8'>
      
        {Object.entries(LOCATIONS_MAP).map(([location,locationMap])=><div className='flex gap-8 flex-col' key={location}>
 
    
            <DisableByLocationCard carsByLocation={groupedCars[location as $Enums.Locations]}  location={locationMap}/>
        </div>)}
    </div>
  )
}

export default DisableByLocation