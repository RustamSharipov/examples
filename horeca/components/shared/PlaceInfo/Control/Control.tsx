import { FC } from 'react'

import { ArrowIcon, InfoIcon, Wrapper } from '.'

interface IProps {
  isExpanded: boolean
  onClick: () => void
}

const Control: FC<IProps> = ({ isExpanded, onClick }) => {
  const handleClick = () => {
    onClick()
  }

  const renderIcon = () => isExpanded
    ? <ArrowIcon />
    : <InfoIcon />

  return (
    <Wrapper onClick={handleClick}>
      {renderIcon()}
    </Wrapper>
  )
}

export default Control
