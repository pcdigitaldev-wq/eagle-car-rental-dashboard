import React from 'react'
import LognForm from './_components/LognForm'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'


type Props = {}

const page = async(props: Props) => {
  const session = await auth()
  if(session) redirect('/')
  return (
    <div className='w-full h-full grid place-content-center'>
      <LognForm />
    </div>
  )
}

export default page