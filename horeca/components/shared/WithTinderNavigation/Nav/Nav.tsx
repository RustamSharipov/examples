import { FC } from 'react'

import { Item, Wrapper } from '.'

interface IProps {
  activeItem: number
  total: number
}

const Nav: FC<IProps> = ({ activeItem, total }) => {
  const renderItems = () => Array(total).fill(null).map((item, index) => (
    <Item
      key={index}
      isActive={index === activeItem}
    />
  ))

  return (
    <Wrapper>
      {renderItems()}
    </Wrapper>
  )
}

export default Nav
