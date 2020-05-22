import React from 'react';
import PropTypes from 'prop-types';
import SliderCarousel from 'infinite-react-carousel';
import styled, { css } from 'styled-components';

import arrowIconImage from './assets/arrowIcon.svg';

import { Item } from '.';

const breakpoints = {
  0: 5,
  // 375: 5,
  768: 3,
};

const Wrapper = styled(SliderCarousel)`
  ${({ theme }) => css`
    position: relative;
    width: 100%;
    height: 7.5rem;
    margin: 0.25rem 0;
    padding: 0.5rem;
    background: ${theme.colors.passive.primary};
    border-radius: 1.5rem;
    overflow: hidden;
    user-select: none;

    ::before {
      content: "";
      position: absolute;
      top: 0.375rem;
      left: 50%;
      transform: translateX(-50%);
      width: 6.5rem;
      height: 6.5rem;
      background: ${theme.colors.passive.light};
      border: 1px solid ${theme.colors.passive.secondary};
      border-radius: 1.5rem;
      cursor: pointer;
      font-size: 2.5rem;
      line-height: 6.5rem;
    }

    .carousel-track {
      position: relative;
      justify-content: center;
      left: -1px;
      width: calc(100% + 2px);
      overflow: hidden;

      ::before,
      ::after {
        content: "";
        position: absolute;
        z-index: 2;
        width: 7rem;
        height: 100%;
        pointer-events: none;
      }

      ::before {
        left: 0;
        background: linear-gradient(to right, ${theme.colors.passive.primary} 0%, rgba(255, 255, 255, 0) 100%);
      }

      ::after {
        right: 0;
        background: linear-gradient(to left, ${theme.colors.passive.primary} 0%, rgba(255, 255, 255, 0) 100%);
      }
    }

    .carousel-arrow::before {
      background-image: url("${arrowIconImage}");
    }

    .carousel-arrow.carousel-next::before {
      transform: rotate(180deg);
    }

    @media (max-width: 767px) {
      .carousel-initialized {
        position: relative;
        left: -50px;
        width: calc(100% + 100px);
      }
    }

    .carousel-row {
      display: flex;
      justify-content: center;
    }
  `}
`;

class DrumSelect extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    size: PropTypes.string,
    onChange: PropTypes.func,
    items: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.number,
      value: PropTypes.number,
    })),
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  };

  constructor(props) {
    super(props);

    const index = props.items.map(({ value }) => value).indexOf(props.value);

    this.state = {
      slide: index === -1 ? 0 : index,
      slidesToShow: null,
    };
  }

  slider = React.createRef();

  componentDidMount() {
    this.handleViewportChange();
    window.addEventListener('resize', this.handleViewportChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleViewportChange);
  }

  get slidesToShow() {
    return window.innerWidth >= 768
      ? breakpoints[768]
      : breakpoints[0];
  }

  handleSlideChange = (slide) => {
    const { items, onChange } = this.props;
    const { value } = items.filter((item, index) => index === slide)[0];

    this.setState({ slide });
    onChange(value);
  }

  handleSlideClick = (index) => {
    this.slider.current.slickGoTo(index);
  }

  handleViewportChange = () => {
    this.setState({
      slidesToShow: this.slidesToShow,
    });
  }

  render() {
    const { className, items } = this.props;
    const { slide, slidesToShow } = this.state;
    const settings = {
      arrows: window.innerWidth >= 768,
      arrowsBlock: window.innerWidth >= 768,
      centerMode: true,
      infinite: false,
      dots: false,
      duration: 100,
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
        {items.map(({ label, value }, index) => (
          <Item
            key={index}
            onClick={() => this.handleSlideClick(index)}
            label={label}
            value={value}
          />
        ))}
      </Wrapper>
    );
  }
};

export default DrumSelect;
