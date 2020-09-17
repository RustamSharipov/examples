import { inject, observer } from 'mobx-react'

import { AddToOrderControl, DrinksControl, OrderControl, Wrapper } from '.'

import { ConnectedComponent } from 'types'

const Footer: ConnectedComponent = ({ placeState }) => {
  const { isInfoExpanded } = placeState

  return (
    <Wrapper
      leftIcon={isInfoExpanded
        ? <AddToOrderControl />
        : <DrinksControl />
      }
      rightIcon={<OrderControl isExpanded={isInfoExpanded} />}
    />
  )
}

export default inject('placeState')(observer(Footer))
