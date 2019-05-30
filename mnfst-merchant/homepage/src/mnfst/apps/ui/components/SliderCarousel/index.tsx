import React from 'react';
import classNames from 'classnames';
import Swiper from 'swiper';
import deepEqual from 'deep-equal';

interface ISliderCarouselProps {
  className?: string;
  children: React.ReactNode;
  options?: any;
  assignSliderInstance?: (object) => void;
  paginationClassName?: string;
}

export default class SliderCarousel extends React.Component<ISliderCarouselProps> {
  public static defaultOptions = {
    slidesPerView: 6,
    centeredSlides: true,
    loop: true,
    simulateTouch: true,
    touchReleaseOnEdges: true,
    slideToClickedSlide: true,
  };
  public sliderCarouselContainerNode: HTMLDivElement;
  public sliderInstance;

  public componentDidMount() {
    if (!this.sliderCarouselContainerNode || !this.props.children) { return; }

    const { options = {}, assignSliderInstance } = this.props;
    this.sliderInstance = new Swiper(this.sliderCarouselContainerNode, {
      ...SliderCarousel.defaultOptions,
      loopedSlides: options.loop ? React.Children.count(this.props.children) : 0,
      ...options,
    });
    if (assignSliderInstance) {
      assignSliderInstance(this.sliderInstance);
    }
  }

  public shouldComponentUpdate(nextProps) {
    if (!deepEqual(nextProps.options, this.props.options)) { return true; }
    return false;
  }

  public componentWillUnmount() {
    this.sliderInstance.detachEvents();
    this.sliderInstance.destroy(true, true);
  }

  public render() {
    const { children, className, paginationClassName } = this.props;

    return (
      <div ref={this.handleRef} className={classNames('swiper-container', className)}>
        <div className="swiper-wrapper">
          {React.Children.map(children, child => (
            <div className="swiper-slide">
              {child}
            </div>
          ))}
        </div>
        <div className={classNames('swiper-pagination', paginationClassName)} />
      </div>
    );
  }

  private handleRef = (node: HTMLDivElement) => {
    this.sliderCarouselContainerNode = node;
  }
}
