import { inject, observer } from 'mobx-react'

import { Icon, Wrapper } from '.'

import { ConnectedComponent } from 'types'

interface IProps {
  isExpanded: boolean
}

const OrderControl: ConnectedComponent<IProps> = ({ isExpanded, placeState }) => {
  const { menuItems, setViewType } = placeState

  const isDisabled = !menuItems || menuItems?.length === 0

  const handleOrderOpen = () => {
    if (!isDisabled) {
      setViewType('order', true)
    }
  }

  return null

  return (
    <Wrapper
      count={menuItems.length}
      isExpanded={isExpanded}
      isDisabled={isDisabled}
      onClick={handleOrderOpen}
    >
      <Icon />
    </Wrapper>
  )
}

export default inject('placeState')(observer(OrderControl))
