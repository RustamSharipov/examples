import { inject, observer } from 'mobx-react'

import { Wrapper } from '.'

import { ConnectedComponent } from 'types'

const BackControl: ConnectedComponent = ({ placeState }) => {
  const { menuType, setViewType, setMenuType, isInfoExpanded, collapseInfo } = placeState

  const handleBack = () => {
    if (isInfoExpanded) {
      collapseInfo()
    }

    else {
      setMenuType('food')
      setViewType('swipe', true)
    }
  }

  if (menuType !== 'drink') return null

  return <Wrapper onClick={handleBack} />
}

export default inject('placeState')(observer(BackControl))
