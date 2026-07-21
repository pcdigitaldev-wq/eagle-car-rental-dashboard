import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

type Props = {src:string,alt:string,className?:string,imgClassName?:string,aspect:'square' | 'video'}

const ImageComponent = ({alt,aspect,src,className,imgClassName}: Props) => {
  return (
    <div className={cn('relative ',aspect==="square" ? "aspect-square" : "aspect-video",className)}>
        <Image  src={src} alt='alt' className={cn('object-cover',imgClassName)} fill unoptimized/>
    </div>
  )
}

export default ImageComponent