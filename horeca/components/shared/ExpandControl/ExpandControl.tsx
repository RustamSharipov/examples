import { FC } from 'react'

import { ArrowIcon, InfoIcon, Wrapper } from '.'

interface IProps {
  className?: string
  isExpanded: boolean
  onClick: (event) => void
}

const ExpandControl: FC<IProps> = ({ className, isExpanded, onClick }) => {
  const handleClick = (event) => {
    onClick(event)
  }

  const renderIcon = () => isExpanded
    ? <ArrowIcon />
    : <InfoIcon />

  return (
    <Wrapper
      className={className}
      onClick={handleClick}
    >
      {renderIcon()}
    </Wrapper>
  )
}

export default ExpandControl
