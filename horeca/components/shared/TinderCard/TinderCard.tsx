import { FC, ReactNode, useCallback, CSSProperties } from 'react'

import { MovementDirection, Coordinates } from 'types'

import {
  getSwipeDirections, animateOut, animateBack, touchCoordinatesFromEvent, mouseCoordinatesFromEvent,
  dragableTouchmove, calcSpeed, animateBackSlide,
} from './utils'

interface IProps {
  className?: string
  children: ReactNode
  isDisabled?: boolean
  snapBackDuration?: number
  swipeThreshold?: number
  onSwipe?: (direction: MovementDirection) => void
  onCardLeftScreen?: () => void
}

const settings = {
  bouncePower: 0.2,
  maxTilt: 5,
  snapBackDuration: 300,
  swipeThreshold: 300, // px/s
}

let swipeAlreadyReleased = false

const TinderCard: FC<IProps> = ({
  className,
  children,
  isDisabled = false,
  snapBackDuration = settings.snapBackDuration,
  swipeThreshold = settings.swipeThreshold,
  onSwipe,
  onCardLeftScreen,
}) => {
  const handleSwipeReleased = async(
    element: HTMLElement,
    speed: Coordinates,
    startCoordinates: Coordinates,
    endCoordinates: Coordinates,
    callback: () => void,
  ) => {
    if (swipeAlreadyReleased) return

    swipeAlreadyReleased = true

    if (endCoordinates.x !== 0) {
      const diff = {
        x: endCoordinates.x - startCoordinates.x,
        y: endCoordinates.y - startCoordinates.y,
      }

      // Swipe forward
      if (startCoordinates.x > endCoordinates.x) {
        if (element.nextSibling) {
          const isXTransition = Math.abs(diff.x) > swipeThreshold
          const isYTransition = Math.abs(diff.y) > swipeThreshold

          if (isXTransition) {
            await animateOut(element, speed)

            element.style.display = 'none'
            endCoordinates.x = 0
            endCoordinates.y = 0

            if (onSwipe) onSwipe('right')
            if (onCardLeftScreen) onCardLeftScreen()
          }

          else {
            if (isYTransition) {
              if (onSwipe) onSwipe(getSwipeDirections(diff)[1])
            }

            animateBack(element, snapBackDuration, settings.bouncePower)
          }
        }
      }

      // Swipe backward
      else {
        if (element.previousSibling && endCoordinates.x - startCoordinates.x > swipeThreshold) {
          animateBackSlide(element.previousSibling as HTMLElement)
          if (onSwipe) onSwipe('left')
        }

        animateBack(element, snapBackDuration, settings.bouncePower)
      }

      callback()
    }

    else {
      animateBack(element, snapBackDuration, settings.bouncePower)
    }
  }

  const handleSwipeStart = () => {
    swipeAlreadyReleased = false
  }

  const ref = useCallback((element) => {
    if (!element) return

    let offset = {
      x: null,
      y: null,
    }

    let speed = {
      x: 0,
      y: 0,
    }

    const startCoordinates: Coordinates = {
      x: 0,
      y: 0,
    }

    const endCoordinates: Coordinates = {
      x: 0,
      y: 0,
    }

    let lastLocation = {
      x: 0,
      y: 0,
      time: new Date().getTime(),
    }

    let isMouseClicked = false

    const clearRangeCoordinates= () => {
      startCoordinates.x = 0
      startCoordinates.y = 0
      endCoordinates.x = 0
      endCoordinates.y = 0
    }

    element.addEventListener(('touchstart'), (event) => {
      handleSwipeStart()

      const { clientX, clientY } = event.touches[0]
  
      startCoordinates.x = clientX
      startCoordinates.y = clientY

      offset = {
        x: -touchCoordinatesFromEvent(event).x,
        y: -touchCoordinatesFromEvent(event).y,
      }
    })

    element.addEventListener(('mousedown'), (event) => {
      isMouseClicked = true
      handleSwipeStart()

      offset = {
        x: -mouseCoordinatesFromEvent(event).x,
        y: -mouseCoordinatesFromEvent(event).y,
      }
    })

    element.addEventListener(('touchmove'), (event) => {
      event.preventDefault()

      const coordinates = touchCoordinatesFromEvent(event)
      endCoordinates.x = coordinates.x
      endCoordinates.y = coordinates.y

      if (startCoordinates.x > coordinates.x && element.nextSibling) {
        const newLocation = dragableTouchmove(
          coordinates,
          element,
          offset,
          lastLocation,
          settings.maxTilt,
        )
          
        speed = calcSpeed(lastLocation, newLocation)
        lastLocation = newLocation
      }
    })

    element.addEventListener(('mousemove'), (event) => {
      event.preventDefault()

      if (isMouseClicked) {
        const coordinates = mouseCoordinatesFromEvent(event)
        endCoordinates.x = coordinates.x
        endCoordinates.y = coordinates.y

        if (startCoordinates.x > coordinates.x && element.nextSibling) {
          const newLocation = dragableTouchmove(
            coordinates,
            element,
            offset,
            lastLocation,
            settings.maxTilt,
          )

          speed = calcSpeed(lastLocation, newLocation)
          lastLocation = newLocation
        }
      }
    })

    element.addEventListener(('touchend'), () => {
      handleSwipeReleased(element, speed, startCoordinates, endCoordinates, clearRangeCoordinates)
    })

    element.addEventListener(('mouseup'), () => {
      if (isMouseClicked) {
        isMouseClicked = false
        handleSwipeReleased(element, speed, startCoordinates, endCoordinates, clearRangeCoordinates)
      }
    })

    element.addEventListener(('mouseleave'), (event) => {
      if (isMouseClicked) {
        event.preventDefault()
        isMouseClicked = false
        handleSwipeReleased(element, speed, startCoordinates, endCoordinates, clearRangeCoordinates)
      }
    })
  }, [])

  return (
    <div
      ref={ref}
      className={className}
    >
      {children}
    </div>
  )
}

export default TinderCard
