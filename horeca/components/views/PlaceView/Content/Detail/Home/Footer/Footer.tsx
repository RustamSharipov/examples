import { inject, observer } from 'mobx-react'

import { HomeControl, Wrapper } from '.'

import { ConnectedComponent } from 'types'

const Footer: ConnectedComponent = ({ placeState }) => {
  const { isInfoExpanded } = placeState

  if (isInfoExpanded) return null

  return <Wrapper leftIcon={<HomeControl />} />
}

export default inject('placeState')(observer(Footer))
