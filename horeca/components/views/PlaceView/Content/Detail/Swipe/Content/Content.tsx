import { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'

import { TinderSwipe } from 'components/shared'
import { BackControl, Category, ExpandInfoControl, Wrapper } from '.'

import { ConnectedComponent, MovementDirection } from 'types'

const Content: ConnectedComponent = ({ placeState }) => {
  const [menuCategoryIndex, setMenuCategoryIndex] = useState(0)
  const [menuItemIndex, setMenuItemIndex] = useState(0)

  const { place, menuType, isInfoExpanded, setCurrentMenuItem, addOrderItem } = placeState
  const placeMenu = place.menu.filter(item => item.type === menuType)

  const handleMenuItemChange = (index: number) => {
    setMenuItemIndex(index)
  }

  const handleSwipe = (direction: MovementDirection, categoryIndex: number) => {
    setMenuCategoryIndex(categoryIndex)

    if (direction === 'up') {
      addOrderItem()
    }
  }

  const renderMenuCategories = () => placeMenu.map(item => (
    <Category
      key={item.id}
      data={item}
      renderExpandInfoControl={() => <ExpandInfoControl />}
      onItemChange={handleMenuItemChange}
    />
  ))

  useEffect(() => {
    const menuItem = placeMenu[0].items[0]
    setCurrentMenuItem(menuItem)
  }, [])

  useEffect(() => {
    const menuItem = placeMenu[menuCategoryIndex].items[menuItemIndex]
    setCurrentMenuItem(menuItem)
  }, [menuCategoryIndex, menuItemIndex])

  return (
    <Wrapper>
      <BackControl />

      <TinderSwipe
        key={menuType}
        isDisabled={isInfoExpanded}
        items={renderMenuCategories()}
        onSwipe={handleSwipe}
      />
    </Wrapper>
  )
}

export default inject('placeState')(observer(Content))
