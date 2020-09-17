import { inject, observer } from 'mobx-react'

import { ConnectedComponent } from 'types'

import { Wrapper } from '.'

const Main: ConnectedComponent = ({ children, placeState }) => {
  const { isInfoExpanded } = placeState

  return (
    <Wrapper isCollapsed={isInfoExpanded}>
      {children}
    </Wrapper>
  )
}

export default inject('placeState')(observer(Main))
