import { inject, observer } from 'mobx-react'

import { ConnectedComponent } from 'types'

import { Item, Wrapper } from '.'

const CategoriesGrid: ConnectedComponent = ({ placeState }) => {
  const { place } = placeState

  const renderMenu = () => {
    return place.menu.map((item, index) => (
      <Item
        key={item.id}
        data={item}
        isFirst={index === 0}
      />
    ))
  }

  return (
    <Wrapper>
      {renderMenu()}
    </Wrapper>
  )
}

export default inject('placeState')(observer(CategoriesGrid))
