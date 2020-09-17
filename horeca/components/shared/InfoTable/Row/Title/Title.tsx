import { FC, ReactNode } from 'react'

import { Arrow, Icon, Wrapper } from '.'

interface IProps {
  children: ReactNode
  icon?: ReactNode
  isExpandable?: boolean
  isExpanded?: boolean
  onClick?: () => void
}

const Row: FC<IProps> = ({ children, icon, isExpandable, isExpanded, onClick }) => {
  const handleClick = () => {
    if (isExpandable && onClick) {
      onClick()
    }
  }

  const renderArrow = () => {
    if (isExpandable) {
      return <Arrow isExpanded={isExpanded} />
    }
  }

  return (
    <Wrapper onClick={handleClick}>
      <Icon component={icon} />
      {children}
      {renderArrow()}
    </Wrapper>
  )
}

export default Row
