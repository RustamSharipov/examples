import { ReactNode, FC, useState } from 'react'

import { Wrapper } from '.'

import { MovementDirection } from 'types'

import { getTouchCoords } from 'utils/dom'

interface IProps {
  children: ReactNode
  isDisabled?: boolean
  onDirectionChange?: (movementDirection: MovementDirection) => void
  onMove?: (x: number) => void
}

const SwipingContainer: FC<IProps> = ({ children, isDisabled = false, onDirectionChange, onMove }) => {
  const [swipeXStart, setSwipeXStart] = useState(0)
  const [swipeXEnd, setSwipeXEnd] = useState(0)

  const handleTouchStart = (event) => {
    if (!isDisabled) {
      document.body.style.overflow = 'hidden'

      const [x] = getTouchCoords(event)
      setSwipeXStart(x)
    }
  }

  const handleTouchEnd = () => {
    if (!isDisabled) {
      document.body.style.overflow = null
  
      let movementDirection: MovementDirection
  
      if (swipeXStart < swipeXEnd) {
        movementDirection = 'left'
      }
  
      if (swipeXStart > swipeXEnd) {
        movementDirection = 'right'
      }
  
      if (onDirectionChange) onDirectionChange(movementDirection)
      setSwipeXEnd(0)
    }
  }

  const handleTouchMove = (event) => {
    if (!isDisabled) {
      const [x] = getTouchCoords(event)
      
      setSwipeXEnd(x)
  
      if (onMove) onMove(x)
    }
  }

  return (
    <Wrapper
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </Wrapper>
  )
}

export default SwipingContainer
