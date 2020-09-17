import { inject, observer } from 'mobx-react'

import { Wrapper } from '.'

import { ConnectedComponent } from 'types'

const BackControl: ConnectedComponent = ({ placeState }) => {
  const { setViewType } = placeState

  const handleBack = () => {
    setViewType('swipe', true)
  }

  return <Wrapper onClick={handleBack} />
}

export default inject('placeState')(observer(BackControl))
