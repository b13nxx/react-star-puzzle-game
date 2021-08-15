import React from 'react'
import PlayStar from '../PlayStar/PlayStar'
import utils from '../../utils/utils'

export interface StarsDisplayProps {
  stars: number
}

export default function StarsDisplay ({
  stars
}: StarsDisplayProps): JSX.Element {
  return (
    <>
      {
        utils.range(1, stars).map((value: number) => (
          <PlayStar
            key={ value } />
        ))
      }
    </>
  )
}
