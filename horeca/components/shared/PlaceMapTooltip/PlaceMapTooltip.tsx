import { FC } from 'react'

import LazyImage from 'components/shared/LazyImage'
import { Info, Wrapper } from '.'

import { ShortPlace } from 'types/places'

interface IProps {
  data: ShortPlace
  onClick: (data: ShortPlace) => void
}

const PlaceMapTooltip: FC<IProps> = ({ data, onClick }) => {
  const { photoUris, name } = data
  const imageSrc = photoUris[0]?.url

  const handleClick = () => {
    onClick(data)
  }

  return (
    <Wrapper onClick={handleClick} >
      {imageSrc &&
        <LazyImage
          src={imageSrc}
          width={32}
          height={32}
          alt={name}
        />
      }

      <Info>
        {name}
      </Info>
    </Wrapper>
  )
}

export default PlaceMapTooltip
