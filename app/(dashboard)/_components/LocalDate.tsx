'use client'

import { format } from 'date-fns'
import React from 'react'

type Props = {
    date:Date

}

const LocalDate = ({date}: Props) => {
  return (
    <span>{format(date, "MMM, dd yyyy - HH:mm")}</span>
  )
}

export default LocalDate