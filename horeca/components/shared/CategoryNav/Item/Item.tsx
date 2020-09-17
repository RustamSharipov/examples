import { Wrapper } from '.'

import { NavItem } from 'types'

interface IProps<T> {
  className?: string
  data: NavItem<T>
  isActive?: boolean
  onClick: (value: NavItem<T>) => void
}

function Item<T>({ className, data, isActive = false, onClick }: IProps<T>) {
  const handleClick = () => onClick(data)

  return (
    <Wrapper
      className={className}
      isActive={isActive}
      onClick={handleClick}
    >
      {data.label}
    </Wrapper>
  )
}

export default Item
