import React from 'react';
import PropTypes from 'prop-types';
import SliderCarousel from 'infinite-react-carousel';
import styled from 'styled-components';

import { Product } from 'components';

import { products } from 'data';

const breakpoints = {
  0: 1,
  768: 3,
};

const Wrapper = styled(SliderCarousel)`
  position: relative;
  width: calc(100% + 8rem);
  user-select: none;

  .carousel-item {
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  @media (min-width: 768px) {
    width: 100vw;

    .carousel-item {
      height: 44rem;
      cursor: pointer;
      opacity: 0.5;
      transition: opacity 0.25s;
    }

    .carousel-item.active {
      opacity: 1;

      img {
        width: 38rem;
        height: 38rem;
        transition:
          width 0.25s,
          height 0.25s;
      }
    }
  }

  @media (min-width: 1200px) {
    .carousel-item {
      height: 62rem;

      img {
        width: 48rem;
        height: 48rem;
      }
    }
    .carousel-item.active {
      img {
        width: 56rem;
        height: 56rem;
      }
    }
  }
`;

class Slider extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    modification: PropTypes.string.isRequired,
    onChange: PropTypes.func,
  };

  state = {
    slide: 0,
    slidesToShow: null,
  };

  slider = React.createRef();

  componentDidMount() {
    this.handleViewportChange();
    window.addEventListener('resize', this.handleViewportChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleViewportChange);
  }

  get products() {
    return window.innerWidth >= 768
      ? [
        ...products.getList(),
        ...products.getList(),
      ]
      : products.getList();
  }

  get slidesToShow() {
    return window.innerWidth >= 768
      ? breakpoints[768]
      : breakpoints[0];
  }

  get hasDots() {
    return window.innerWidth < 768;
  }

  getProductBySliderIndex(index) {
    let productIndex = index > products.length - 1
      ? index - products.length
      : index;

    return products[productIndex];
  }

  handleSlideChange = (index) => {
    const { onChange } = this.props;

    this.setState({ slide: index });
    const product = this.getProductBySliderIndex(index);

    onChange(product.codeName);
  }

  handleSlideClick = (index) => {
    this.slider.current.slickGoTo(index);
  }

  handleViewportChange = () => {
    this.setState({
      slidesToShow: window.innerWidth >= 768 ? breakpoints[768] : breakpoints[0],
    });
  }

  render() {
    const { className, modification } = this.props;
    const { slide, slidesToShow } = this.state;
    const settings = {
      arrows: false,
      arrowsBlock: false,
      centerMode: slidesToShow > 1,
      dots: this.hasDots,
      infinite: true,
      initialSlide: slide,
      slidesToShow: this.slidesToShow,
      afterChange: this.handleSlideChange,
    };

    if (!slidesToShow) {
      return null;
    }
    
    return (
      <Wrapper
        className={className}
        ref={this.slider}
        { ...settings }
      >
        {this.products.map(({ codeName }, index) => (
          <Product
            key={index}
            model={codeName}
            modification={modification}
            onClick={() => this.handleSlideClick(index)}
          />
        ))}
      </Wrapper>
    );
  }
};

export default Slider;
