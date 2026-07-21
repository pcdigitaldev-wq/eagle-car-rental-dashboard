import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type Props = {
    fullScreen?:boolean
    type?:'logo' | 'loader'
}

const LoadingPage = ({fullScreen,type = 'loader'}: Props) => {
  if(type === 'logo')
 { return (
    <div className={cn('grid place-content-center w-full h-full bg-white',fullScreen && ' fixed top-0 left-0')}>
        <div  className='bg-site-primary p-8 rounded-lg animate-pulse'>
            <div className='relative aspect-video w-[150px]'>
                <Image alt='loading-logo' src={'/Logo.png'} fill className='object-contain' />
            </div>
        </div>
    </div>
  )}else{
    return (
      <div className={cn('grid place-content-center w-full h-full bg-white')}>
    
    <div className='flex flex-col gap-2 items-center text-site-primary'>
      <span className=''>Loading...</span>
      <Loader2 className='w-[50px] h-[50px] animate-spin' />
    </div>
  </div>
    )
  }
}

export default LoadingPage