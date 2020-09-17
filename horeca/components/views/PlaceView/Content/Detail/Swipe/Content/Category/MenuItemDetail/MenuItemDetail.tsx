import { FC, ReactNode } from 'react'

import { PhotosSet } from 'components/shared'
import { DetailedInfo, Info, Main, Wrapper } from '.'

import { MenuItem } from 'types/menus'

interface IProps {
  activeItem: number
  items: MenuItem[]
  renderExpandInfoControl?: () => ReactNode
}

const MenuItemDetail: FC<IProps> = ({ activeItem, items, renderExpandInfoControl }) => {
  const photoUris = items.map(item => item.photoUri)
  
  return (
    <Wrapper>
      <Main>
        <PhotosSet
          activeItem={activeItem}
          photoUris={photoUris}
        />

        <Info
          data={items[activeItem]}
          renderExpandInfoControl={renderExpandInfoControl}
        />
      </Main>

      <DetailedInfo data={items[activeItem]} />
    </Wrapper>
  )
}

export default MenuItemDetail
