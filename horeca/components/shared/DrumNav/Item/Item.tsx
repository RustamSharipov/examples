import { ReactNode } from 'react'

import { Content, Wrapper } from '.'

interface IProps<T> {
  className?: string
  children: ReactNode
  id: number
  isActive?: boolean
  onClick: (id: number) => void
}

function Item<T>({ className, children, id, isActive = false, onClick }: IProps<T>) {
  const handleClick = () => onClick(id)

  return (
    <Wrapper
      className={className}
      isActive={isActive}
      onClick={handleClick}
    >
      <Content>
        {children}
      </Content>
    </Wrapper>
  )
}

export default Item
