import { inject, observer } from 'mobx-react'

import { Wrapper } from '.'

import { ConnectedComponent } from 'types'

const DrinksControl: ConnectedComponent = ({ placeState }) => {
  const { place, menuType, setMenuType, setViewType } = placeState

  const handleDrinksOpen = () => {
    setViewType('drinks', true)
    setMenuType('drink')
  }

  const isControlHidden = place.menu.filter(item => item.type === 'drink').length === 0 || menuType === 'drink'

  if (isControlHidden) return <span />

  return <Wrapper onClick={handleDrinksOpen} />
}

export default inject('placeState')(observer(DrinksControl))
