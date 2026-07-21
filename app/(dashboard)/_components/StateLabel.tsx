import React from 'react'

type Props = {
    stateLabel:string
}

const StateLabel = ({stateLabel}: Props) => {
  return (
    <p className="text-muted-foreground capitalize text-sm">{stateLabel}</p>
  )
}

export default StateLabel