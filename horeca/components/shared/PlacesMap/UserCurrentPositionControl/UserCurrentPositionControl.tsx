import { FC } from 'react'

import { Icon, Wrapper } from '.'

interface IProps {
  onClick?: () => void
}

const UserCurrentPositionControl: FC<IProps> = ({ onClick }) => {
  const handleClick = () => {
    if (onClick) onClick()
  }

  return (
    <Wrapper onClick={handleClick}>
      <Icon />
    </Wrapper>
  )
}

export default UserCurrentPositionControl
