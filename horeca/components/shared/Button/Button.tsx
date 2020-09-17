import { FC, ReactNode } from 'react'

import { Wrapper } from '.'

interface IProps {
  className?: string
  children: ReactNode
  onClick?: () => void
}

const ExpandControl: FC<IProps> = ({ className, children, onClick }) => {
  const handleClick = () => {
    onClick()
  }

  return (
    <Wrapper
      className={className}
      onClick={handleClick}
    >
      {children}
    </Wrapper>
  )
}

export default ExpandControl
