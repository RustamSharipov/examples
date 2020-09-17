import { FC } from 'react'

import { Icon, Wrapper } from '.'

interface IProps {
  className?: string
  onClick: () => void
}

const ExpandControl: FC<IProps> = ({ className, onClick }) => {
  const handleClick = () => {
    onClick()
  }

  return (
    <Wrapper
      className={className}
      onClick={handleClick}
    >
      <Icon />
    </Wrapper>
  )
}

export default ExpandControl
