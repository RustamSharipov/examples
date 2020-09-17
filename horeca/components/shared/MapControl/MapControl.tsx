import { FC } from 'react'

import { Wrapper } from '.'

interface IProps {
  onClick: () => void
}

const PlaceMarker: FC<IProps> = ({ onClick }) => {
  const handleClick = () => {
    onClick()
  }

  return (
    <Wrapper onClick={handleClick} />
  )
}

export default PlaceMarker
