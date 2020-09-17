import { inject,observer } from 'mobx-react'

import { MenuItem } from 'components/shared'
import { Wrapper } from '.'

import { ConnectedComponent } from 'types'

const Summary: ConnectedComponent = ({ placeState }) => {
  const { menuItems } = placeState

  if (!menuItems) return null

  const renderMenuItems = () => menuItems.map((item, index) => (
    <MenuItem
      key={index}
      data={item}
    />
  ))

  return (
    <Wrapper>
      {renderMenuItems()}
    </Wrapper>
  )
}

export default inject('placeState')(observer(Summary))
