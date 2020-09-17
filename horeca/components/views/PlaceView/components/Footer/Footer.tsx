import { FC, ReactNode } from 'react'

import { Wrapper } from '.'

interface IProps {
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

const Footer: FC<IProps> = ({ leftIcon, rightIcon }) => {
  const renderLeftIcon = () => {
    if (!leftIcon) return null
    return leftIcon
  }

  const renderRightIcon = () => {
    if (!rightIcon) return null
    return rightIcon
  }

  return (
    <Wrapper>
      {renderLeftIcon()}
      {renderRightIcon()}
    </Wrapper>
  )
}

export default Footer
