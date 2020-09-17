import { inject, observer } from 'mobx-react'

import { Home, List, Order, Swipe, Tile } from '.'

import { ConnectedComponent } from 'types'

const Detail: ConnectedComponent = ({ placeState }) => {
  const {
    place,
    viewType,
  } = placeState

  if (!place) return null

  switch (viewType) {
    case 'tile':
      return <Tile />

    case 'list':
      return <List />

    case 'swipe':
    case 'drinks':
      return <Swipe />

    case 'order':
      return <Order />

    default:
      return <Home />
  }
}

export default inject('placeState')(observer(Detail))
