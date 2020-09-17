import { inject, observer } from 'mobx-react'

import { Icon, Wrapper } from '.'

import { ConnectedComponent } from 'types'

const AddToOrderControl: ConnectedComponent = ({ placeState }) => {
  const { addOrderItem } = placeState

  const handleOrderItemAdd = () => {
    addOrderItem()
  }

  return null

  return (
    <Wrapper
      isExpanded
      onClick={handleOrderItemAdd}
    >
      <Icon />
    </Wrapper>
  )
}

export default inject('placeState')(observer(AddToOrderControl))
