import { observer, inject } from 'mobx-react'

import { DetailViewSelect, Wrapper } from '.'

import { ConnectedComponent } from 'types'

const Footer: ConnectedComponent = ({ placeState }) => {
  const { isInfoExpanded, menuType, viewType } = placeState

  const isExpanded = !isInfoExpanded && menuType === 'food' && viewType !== 'order'

  return (
    <Wrapper isExpanded={isExpanded}>
      <DetailViewSelect />
    </Wrapper>
  )
}

export default inject('placeState')(observer(Footer))
