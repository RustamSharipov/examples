import { Item, Wrapper } from '.'

import { NavItem } from 'types'

interface IProps<T> {
  className?: string
  items: NavItem<T>[]
  value: T
  onSelect: (value: T) => void
}

function CategoryNav<T = string>({ className, items, onSelect, value }: IProps<T>) {
  const handleNav = (value: NavItem<T>) => {
    if (!value.isDisabled) onSelect(value.name)
  }

  const renderItems = () => items.map(item => (
    <Item
      key={String(item.name)}
      isActive={String(item.name) === String(value)}
      data={item}
      onClick={handleNav}
    />
  ))

  return (
    <Wrapper className={className}>
      {renderItems()}
    </Wrapper>
  )
}

export default CategoryNav
