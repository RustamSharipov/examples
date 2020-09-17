import { useState } from 'react'
import { inject, observer } from 'mobx-react'

import { ConnectedComponent } from 'types'

import { PhotosSet } from 'components/shared'
import { Wrapper } from '.'

const Info: ConnectedComponent = ({ placeState }) => {
  const [activeItem, setActiveItem] = useState(0)
  const { place } = placeState

  const handleChange = (index: number) => {
    setActiveItem(index)
  }
  
  return (
    <Wrapper>
      <PhotosSet
        activeItem={activeItem}
        photoUris={place.photoUris}
        onChange={handleChange}
      />
    </Wrapper>
  )
}

export default inject('placeState')(observer(Info))
