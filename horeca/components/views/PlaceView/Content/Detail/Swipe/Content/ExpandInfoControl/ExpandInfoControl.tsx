import { inject, observer } from 'mobx-react'

import { Wrapper } from '.'

import { ConnectedComponent } from 'types'

const ExpandInfoControl: ConnectedComponent = ({ placeState }) => {
  const { isInfoExpanded, collapseInfo, expandInfo } = placeState

  const handleToggle = (event) => {
    if (isInfoExpanded) {
      collapseInfo()
    }

    else {
      expandInfo()
    }

    event.stopPropagation()
  }

  return (
    <Wrapper
      isExpanded={isInfoExpanded}
      onClick={handleToggle}
    />
  )
}

export default inject('placeState')(observer(ExpandInfoControl))
