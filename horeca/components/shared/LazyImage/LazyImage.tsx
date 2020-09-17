import { FC, useState, useEffect, ReactElement } from 'react'

import { ErrorImage, Wrapper } from '.'

interface IProps {
  className?: string
  src: string
  width?: number
  height?: number
  alt?: string
  onLoad?: () => void
  renderError?: () => ReactElement
}

const LazyImage: FC<IProps> = ({ className, alt, width, height, src, onLoad, renderError }) => {
  const [isDisplay, setDisplay] = useState(false)
  const [hasError, setError] = useState(false)

  useEffect(() => {
    const image = new Image()
    image.src = src

    image.onload = () => {
      setDisplay(true)
      if (onLoad) onLoad()
    }

    image.onerror = () => {
      setError(true)
    }

    return () => {
      image.onload = undefined
      image.onerror = undefined
    }
  }, [])

  if (hasError) {
    if (!!renderError) {
      return renderError()
    }

    return (
      <ErrorImage
        width={width}
        height={height}
      />
    )
  }

  return (
    <Wrapper
      className={className}
      isDisplay={isDisplay}
      alt={alt}
      width={width}
      height={height}
      src={src}
    />
  )
}

export default LazyImage
