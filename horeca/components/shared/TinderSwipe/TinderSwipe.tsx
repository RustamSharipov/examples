import { FC, ReactChild } from 'react'

import { Item, Wrapper } from '.'

import { MovementDirection } from 'types'

interface IProps {
  items: ReactChild[]
  isDisabled?: boolean
  onSwipe?: (direction: MovementDirection, index?: number) => void
}

const TinderSwipe: FC<IProps> = ({ items, isDisabled = false, onSwipe }) => {
  const handleSwipe = (direction: MovementDirection, index: number) => {
    if (onSwipe) onSwipe(direction, index)
  }

  const handleTouchStart = () => {
    if (!isDisabled) {
      document.body.style.overflow = 'hidden'
    }
  }

  const handleTouchEnd = () => {
    if (!isDisabled) {
      document.body.style.overflow = null
    }
  }

  const renderItems = () => items.map((item, index) => (
    <Item
      key={index}
      isDisabled={isDisabled}
      onSwipe={direction => handleSwipe(direction, index)}
      swipeThreshold={80}
      zIndex={items.length - index}
    >
      {item}
    </Item>
  ))

  return (
    <Wrapper
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {renderItems()}
    </Wrapper>
  )
}

export default TinderSwipe
