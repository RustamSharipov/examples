import { FC, useRef, MutableRefObject, ReactNode } from 'react'

import { Nav, Wrapper } from '.'

interface IProps {
  children: ReactNode
  activeItem?: number
  total: number
  isDisabled?: boolean
  onChange: (activeItem: number) => void
}

const WithTinderNavigation: FC<IProps> = ({ children, activeItem, isDisabled = false, total = 0, onChange }) => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>

  const handleContainerClick = (event) => {
    if (!isDisabled) {
      const { clientWidth } = ref.current
      const { pageX } = event
      let index = activeItem
  
      if (pageX <= clientWidth / 2) {
        index -= 1
  
        if (index < 0) index = 0
      }
  
      else {
        index += 1
  
        if (index > total - 1) index = total - 1
      }

      onChange(index)
    }
  }

  const renderNav = () => {
    if (total > 1) {
      return (
        <Nav
          activeItem={activeItem}
          total={total}
        />
      )
    }
  }

  return (
    <Wrapper
      ref={ref}
      onClick={handleContainerClick}
    >
      {renderNav()}
      {children}
    </Wrapper>
  )
}

export default WithTinderNavigation
