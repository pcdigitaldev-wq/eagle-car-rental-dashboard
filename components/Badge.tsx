import { BOOKING_STATUS_CONST, BOOKING_STATUS_MAP, BOOKING_STATUS_MAP_CLASSNAME } from '@/lib/Types'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import React from 'react'

type Props = {status:typeof BOOKING_STATUS_CONST[number]
className?:string

}

const Badge = ({status,className}: Props) => {
  return (
    <span
    className={cn(
      "capitalize py-0.5 px-3 rounded-full text-[12px] font-[500] flex items-center w-fit",
      BOOKING_STATUS_MAP_CLASSNAME[status],className
    )}
  >
    {status === 'PAID' && <Check className="mr-1 h-3 w-3 text-green-700" />}
    {BOOKING_STATUS_MAP[status]}
  </span>
  )
}

export default Badge