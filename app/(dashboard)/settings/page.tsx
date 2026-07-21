import React from 'react'
import Heading from '../_components/Heading'
import { wait } from '@/lib/utils'
 
import prisma from '@/lib/prisma'
import SettingsForm from './_components/forms/SettingsForm'

type Props = {}


export const revalidate = 0
const SettingsPage =async (props: Props) => {

    const settings = await prisma.settings.findUnique({
      where:{
        id:"settings"
      }
    })

  return (
    <div>
       <Heading title="Settings" />
       <div className='mt-12'>
        <SettingsForm settings={settings}/>
       </div>
    </div>
  )
}

export default SettingsPage