import { Component } from 'react'

import Slider from './Slider'
import { Wrapper } from '.'

class Carousel extends Component {
  slickNext = () => this.innerSlider.slickNext()

  slickPrev = () => this.innerSlider.slickPrev()

  slickPlay = () => this.innerSlider.autoPlayInit()

  slickPause = () => this.innerSlider.handleAutoplayPause()

  slickGoTo = (n) => this.innerSlider.slickSet(n)

  render() {
    const { children } = this.props

    return (
      <Wrapper>
        <Slider
          {...this.props}
          ref={(slider) => {
            this.innerSlider = slider
          }}
        >
          {children}
        </Slider>
      </Wrapper>
    )
  }
}

export default Carousel
