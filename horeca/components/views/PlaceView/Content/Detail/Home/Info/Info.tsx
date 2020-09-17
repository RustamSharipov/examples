import { inject, observer } from 'mobx-react'

import { ConnectedComponent } from 'types'

import { PlaceInfo } from 'components/shared'
import { Wrapper } from '.'

const Info: ConnectedComponent = ({ placeState }) => {
  const {
    isInfoExpanded,
    place,
    collapseInfo,
    expandInfo,
  } = placeState

  const handleCollapse = () => {
    collapseInfo()
  }

  const handleExpand = () => {
    expandInfo()
  }

  return (
    <Wrapper isExpanded={isInfoExpanded}>
      <PlaceInfo
        data={place}
        isExpanded={isInfoExpanded}
        onCollapse={handleCollapse}
        onExpand={handleExpand}
      />
    </Wrapper>
  )
}

export default inject('placeState')(observer(Info))
