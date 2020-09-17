import { FC } from 'react'

import { Title, Wrapper } from '.'

import { MenuCategory } from 'types/menus'

interface IProps {
  data: MenuCategory
  isFirst?: boolean
}

const Item: FC<IProps> = ({ data, isFirst }) => {
  const { photoUri, title } = data

  return (
    <Wrapper
      isFirst={isFirst}
      imageSrc={photoUri?.url}
    >
      <Title>
        {title}
      </Title>
    </Wrapper>
  )
}

export default Item
