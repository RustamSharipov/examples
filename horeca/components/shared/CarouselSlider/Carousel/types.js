const autoplayProps = {
  autoplaySpeed: 3000,
}

const defaultProps = {
  accessibility: true, //
  adaptiveHeight: false, //
  afterChange: null, //
  appendDots: (dots) => <ul style={{ display: 'block' }}>{dots}</ul>, //
  arrows: true, //
  autoplay: false, //
  autoplaySpeed: 3000, //
  beforeChange: null, //
  centerMode: false, //
  arrowsScroll: 1, //
  centerPadding: 50, //
  className: '', //
  customPaging: (i) => <button type="button">{i + 1}</button>, //
  dots: false, //
  dotsClass: 'carousel-dots', //
  dotsScroll: 1, //
  draggable: true,
  edgeFriction: 0.35,
  fade: false,
  focusOnSelect: false,
  initialSlide: false, //
  lazyLoad: null,
  nextArrow: null, //
  onEdge: null,
  onInit: null, //
  onLazyLoadError: null,
  onReInit: null, //
  pauseOnDotsHover: false,
  pauseOnFocus: false,
  pauseOnHover: true, //
  prevArrow: null, //
  responsive: null,
  rows: 1, //
  rtl: false,
  slide: 'div',
  slidesPerRow: 1, //
  slidesToShow: 1, //
  swipe: true, //
  swipeToSlide: false,
  vertical: false,

  duration: 200, //
  shift: 0, //
  gutter: 0, //
  fullWidth: false, //
  arrowsBlock: true, //
  autoplayScroll: 1, //
  onResize: () => undefined, //
  onSwipe: () => undefined, //
  wheel: false,
  wheelScroll: 1,
  virtualList: false,
  overScan: 2,
}

const dotsDefaultProps = {
  slideCount: 0,
  dotsScroll: 1,
  slidesToShow: 1,
  infinite: true,
  currentSlide: 0,
  clickHandler: () => undefined,
  onMouseEnter: () => undefined,
  onMouseOver: () => undefined,
  onMouseLeave: () => undefined,
  customPaging: (i) => <button type="button">{i + 1}</button>,
  appendDots: (dots) => <ul style={{ display: 'block' }}>{dots}</ul>,
  dotsClass: '',
}

const arrowsDefaultProps = {
  arrows: true,
  arrowsScroll: 1,
  // currentSlide,
  clickHandler: () => undefined,
  // slideCount,
  type: 'prev',
  arrowsBlock: true,
  prevArrow: null,
  nextArrow: null,
}

export {
  defaultProps,
  autoplayProps,
  dotsDefaultProps,
  arrowsDefaultProps,
}
