import { FC } from 'react'

import { Photo, PhotoPlaceholder } from 'components/shared'
import { Item, Wrapper } from '.'

import { MediaUri } from 'types'

interface IProps {
  activeItem: number
  photoUris: MediaUri[]
  onChange?: (activeItem: number) => void
}

const PhotosSet: FC<IProps> = ({ activeItem, photoUris, onChange }) => {
  const renderPhotos = () => {
    if (!photoUris || photoUris.length === 0) {
      return <PhotoPlaceholder />
    }

    return photoUris.map((item, index) => (
      <Item
        key={index}
        isActive={index === activeItem}
      >
        {item
          ? <Photo src={item.url} />
          : <PhotoPlaceholder />
        }
      </Item>
    ))
  }

  const handleChange = (activeItem: number) => {
    if (onChange) onChange(activeItem)
  }

  return (
    <Wrapper
      activeItem={activeItem}
      total={photoUris.length}
      onChange={handleChange}
    >
      {renderPhotos()}
    </Wrapper>
  )
}

export default PhotosSet
