import { cn } from '@/lib/utils';
import React from 'react'

type Props = {
    title:string;
    description?:string
    className?:string
    titleClassName?:string
    descriptionClassName?:string
}

const NoResult = ({title,className,description,titleClassName,descriptionClassName}: Props) => {
  return (
    <div className={cn('w-full min-h-[200px] border rounded-md flex flex-col items-center justify-center  bg-slate-50',className)}>
        <p className={cn('text-sm',titleClassName)}>{title}</p>
        {description && <p className={cn('text-xs text-muted-foreground',descriptionClassName)}>{description}</p>}
    </div>
  )
}

export default NoResult