import { FC } from 'react'

import { Photo, PhotoPlaceholder } from 'components/shared'
import { Info, Picture, Price, Title, Wrapper } from '.'

import { MenuItem } from 'types/menus'

interface IProps {
  data: MenuItem
}

const MenuItemDetails: FC<IProps> = ({ data }) => {
  const { photoUri, price, title } = data

  const renderPhoto = () => photoUri
    ? <Photo src={photoUri.url} />
    : <PhotoPlaceholder />

  return (
    <Wrapper>
      <Picture>
        {renderPhoto()}
      </Picture>

      <Info>
        <Title>
          {title}
        </Title>

        <Price>
          {price}
        </Price>
      </Info>
    </Wrapper>
  )
}

export default MenuItemDetails
