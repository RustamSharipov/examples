import sleep from 'p-sleep'

import { MovementDirection, Coordinates } from 'types'
import { CardLocation } from './types'

const translationString = (x: number, y: number) => `translate(${x}px, ${y}px)`
const rotationString = (rotate: number) => `rotate(${rotate}deg)`

export const getElementSize = (element) => {
  const elementStyles = window.getComputedStyle(element)
  const widthString = elementStyles.getPropertyValue('width')
  const width = Number(widthString.split('px')[0])
  const heightString = elementStyles.getPropertyValue('height')
  const height = Number(heightString.split('px')[0])

  return { x: width, y: height }
}

export const pythagoras = (x: number, y: number) => Math.sqrt(x ** 2 + y ** 2)

export const animateOut = async(element: HTMLElement, speed: Coordinates) => {
  const startPos = getTranslate(element)
  const bodySize = getElementSize(document.body)
  const diagonal = pythagoras(bodySize.x, bodySize.y)

  const velocity = pythagoras(speed.x, speed.y)
  const time = diagonal / velocity
  const multiplier = diagonal / velocity

  const translateString = translationString(
    speed.x * multiplier + startPos.x,
    -speed.y * multiplier + startPos.y,
  )

  const rotateString = rotationString(getRotation(element))

  element.style.transition = `ease-out ${time <= 1 ? time : 1}s`
  element.style.transform = [translateString, rotateString].join(' ')

  await sleep(time * 1000)
}

export const animateBack = (element: HTMLElement, snapBackDuration: number, bouncePower: number) => {
  element.style.transition = snapBackDuration + 'ms'
  const startingPoint = getTranslate(element)
  const translation = translationString(
    startingPoint.x * -bouncePower,
    startingPoint.y * -bouncePower,
  )
  const rotation = rotationString(getRotation(element) * -bouncePower)
  element.style.transform = [translation, rotation].join(' ')

  setTimeout(() => {
    element.style.transform = 'none'
  }, snapBackDuration * 0.75)

  setTimeout(() => {
    element.style.transition = null
  }, snapBackDuration)
}

export const animateBackSlide = (element: HTMLElement) => {
  const width = window.innerWidth
  element.style.transform = `translateX(${-width}px)`
  element.style.transition = null
  element.style.display = null

  const start = Date.now()

  const timer = setInterval(function() {
    const timePassed = Date.now() - start

    if (-width + timePassed >= 0) {
      clearInterval(timer)
      element.style.transform = null
      return
    }

    element.style.transform = `translateX(${-width + timePassed}px)`
  }, 10)
}

export const getSwipeDirections = (diff: Coordinates) => {
  const directions = ['', '']

  if (diff.x >= 0) {
    directions[0] = 'left'
  }

  if (diff.x < 0) {
    directions[0] = 'right'
  }

  if (diff.y >= 0) {
    directions[1] = 'down'
  }

  if (diff.y < 0) {
    directions[1] = 'up'
  }

  return directions as [MovementDirection, MovementDirection]
}

export const calcSpeed = (oldLocation: CardLocation, newLocation: CardLocation) => {
  const dx = newLocation.x - oldLocation.x
  const dy = oldLocation.y - newLocation.y
  const dt = (newLocation.time - oldLocation.time) / 1000

  return {
    x: dx / dt,
    y: dy / dt,
  }
}

export const getTranslate = (element: HTMLElement) => {
  const style = window.getComputedStyle(element)
  const matrix = new WebKitCSSMatrix(style.webkitTransform)

  return {
    x: matrix.m41,
    y: matrix.m42,
  }
}

export const getRotation = (element: HTMLElement) => {
  const style = window.getComputedStyle(element)
  const matrix = new WebKitCSSMatrix(style.webkitTransform)

  return -Math.asin(matrix.m21) / (2 * Math.PI) * 360
}

export const dragableTouchmove = (
  coordinates: Coordinates,
  element: HTMLElement,
  offset: Coordinates,
  lastLocation: CardLocation,
  maxTilt: number,
) => {
  const position = {
    x: coordinates.x + offset.x,
    y: coordinates.y + offset.y,
  }

  const newLocation = {
    x: position.x,
    y: position.y,
    time: new Date().getTime(),
  }

  const translation = translationString(position.x, position.y)
  const rotateValue = calcSpeed(lastLocation, newLocation).x / 1000
  const rotation = rotationString(rotateValue * maxTilt)

  element.style.transform = [translation + rotation].join(' ')

  return newLocation
}

export const touchCoordinatesFromEvent = (event) => {
  const touchLocation = event.targetTouches[0]

  return {
    x: touchLocation.clientX,
    y: touchLocation.clientY,
  }
}

export const mouseCoordinatesFromEvent = (event) => ({
  x: event.clientX,
  y: event.clientY,
})
