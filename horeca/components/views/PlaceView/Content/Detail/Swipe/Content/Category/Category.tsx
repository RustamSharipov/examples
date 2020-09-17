import { ReactNode, useState } from 'react'
import { inject, observer } from 'mobx-react'

import { WithTinderNavigation, PhotoPlaceholder } from 'components/shared'
import { Title, MenuItemDetail } from '.'

import { MenuCategory, MenuType } from 'types/menus'
import { ConnectedComponent } from 'types'

interface IProps {
  data: MenuCategory
  type?: MenuType
  renderExpandInfoControl?: () => ReactNode
  onItemChange?: (itemIndex: number) => void
}

const Category: ConnectedComponent<IProps> = ({
  data,
  type,
  placeState,
  renderExpandInfoControl,
  onItemChange,
}) => {
  const [activeItem, setActiveItem] = useState(0)
  const { isInfoExpanded } = placeState

  const { title } = data
  const items = type ? data.items.filter(item => item.type === type) : data.items

  const handleItemChange = (activeItem: number) => {
    setActiveItem(activeItem)
    onItemChange(activeItem)
  }

  const renderCategoryDetail = () => items[activeItem]
    ?
      <MenuItemDetail
        activeItem={activeItem}
        items={items}
        renderExpandInfoControl={renderExpandInfoControl}
      />
    : <PhotoPlaceholder />

  return (
    <WithTinderNavigation
      activeItem={activeItem}
      total={items.length}
      isDisabled={isInfoExpanded}
      onChange={handleItemChange}
    >
      <Title>
        {title}
      </Title>

      {renderCategoryDetail()}
    </WithTinderNavigation>
  )
}

export default inject('placeState')(observer(Category))
