import { useRef, useState } from 'react'

import { CarouselSlider } from 'components/shared'
import { Item, Wrapper } from '.'

import { NavItem } from 'types'

interface IProps<T> {
  className?: string
  items: NavItem<T>[]
  onSelect: (value: T) => void
  initialSlide?: number
}

function DrumNav<T = string>({ className, items, initialSlide = 0, onSelect }: IProps<T>) {
  const [activeItem, setActiveItem] = useState(initialSlide)
  const ref = useRef() as any

  let navItems = [...items]

  if (items.length === 1) {
    navItems = [
      ...items,
      ...items,
      ...items,
      ...items,
    ]
  }

  else if (items.length < 4) {
    navItems = [
      ...items,
      ...items,
    ]
  }

  const handleItemChange = (activeItem: number) => {
    setActiveItem(activeItem)
    onSelect(navItems[activeItem].name)
  }

  const handleItemClick = (activeItem: number) => {
    if (ref?.current) {
      ref.current.slickGoTo(activeItem)
    }
  }

  const renderItems = () => navItems.map((item, index) => (
    <Item
      key={index}
      isActive={index === activeItem}
      id={index}
      onClick={handleItemClick}
    >
      {item.label}
    </Item>
  ))

  const settings = {
    arrows: false,
    arrowsBlock: false,
    centerMode: true,
    centerPadding: 0,
    dots: false,
    duration: 100,
    infinite: true,
    initialSlide: initialSlide,
    slidesToShow: 3,
    wheel: true,
    afterChange: handleItemChange,
  }

  return (
    <Wrapper className={className}>
      <CarouselSlider
        ref={ref}
        { ...settings }
      >
        {renderItems()}
      </CarouselSlider>
    </Wrapper>
  )
}

export default DrumNav
