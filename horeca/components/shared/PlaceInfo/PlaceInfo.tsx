import { observer, inject } from 'mobx-react'

import { Content, Control, Description, Distance, Title, Wrapper } from '.'

import { ConnectedComponent } from 'types'
import { Place } from 'types/places'

import helpers from 'helpers'

interface IProps {
  data: Place
  isExpanded: boolean
  onCollapse: () => void
  onExpand: () => void
}

const PlaceInfo: ConnectedComponent<IProps> = ({ data, isExpanded, onCollapse, onExpand, rootState }) => {
  const { userPosition } = rootState
  const { shortDescription, name, lat, lng } = data

  const distance = helpers.distanceBetweenEarthCoordinates([lat, lng], userPosition)

  const handleExpandToggle = () => {
    if (isExpanded) {
      onCollapse()
    }

    else {
      onExpand()
    }
  }

  return (
    <Wrapper>
      <Content>
        <Title>
          {name}
        </Title>

        <Description>
          {shortDescription}
        </Description>

        {distance &&
          <Distance units={distance[1]}>
            {distance[0]}
          </Distance>
        }
      </Content>

      <Control
        isExpanded={isExpanded}
        onClick={handleExpandToggle}
      />
    </Wrapper>
  )
}

export default inject('rootState')(observer(PlaceInfo))
