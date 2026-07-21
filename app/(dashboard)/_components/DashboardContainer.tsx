import { cn } from '@/lib/utils'
import React, { PropsWithChildren } from 'react'

type Props = {
className?:string

} & PropsWithChildren

const DashboardContainer = ({children,className}: Props) => {
  return (
    <div className={cn('mt-12 rounded-md shadow-md p-10 border',className)}>
        {children}
    </div>
  )
}

export default DashboardContainer