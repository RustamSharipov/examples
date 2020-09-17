import styled from 'styled-components'

export default styled.div`
  position: relative;
  width: 100%;

  .carousel-item {
    position: absolute;
    top: 0;
    left: 0;
  }

  .Carousel {
    width: 100%;
  }

  .carousel-initialized {
    overflow: hidden;
    position: relative;
  }

  .carousel-arrow.carousel-hidden {
    display: none;
  }

  .carousel-track {
    width: 100%;
    display: flex;
    position: relative;
    overflow: hidden;
  }

  .carousel-row {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Arrows */
  .carousel-prev.block,
  .carousel-next.block {
    opacity: 1;
  }

  .carousel-prev,
  .carousel-next {
    opacity: 0;
    font-size: 0;
    line-height: 0;
    width: 40px;
    height: 100%;
    border-radius: 100%;
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    cursor: pointer;

    color: transparent;
    border: none;
    outline: none;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    z-index: 4;
    background: none;
  }

  .carousel-prev:hover,
  .carousel-prev:focus,
  .carousel-next:hover,
  .carousel-next:focus {
    opacity: 1;
    color: transparent;
    outline: none;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  .carousel-prev:hover::before,
  .carousel-prev:focus::before,
  .carousel-next:hover::before,
  .carousel-next:focus::before {
    opacity: 1;
  }

  .carousel-prev.carousel-disabled::before,
  .carousel-next.carousel-disabled::before {
    opacity: .25;
  }

  .carousel-prev::before,
  .carousel-next::before {
    content: '';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    display: block;
    width: 20px;
    height: 20px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }

  .carousel-next.custom::before,
  .carousel-prev.custom::before {
    content: unset;
    background-image: unset;
  } 

  .carousel-prev {
    left: 0px;
  }

  [dir='rtl'] .carousel-prev {
    right: -25px;
    left: auto;
  }

  [dir='rtl'] .carousel-prev::before {
    content: '';
  }

  .carousel-next {
    right: 0px;
  }

  [dir='rtl'] .carousel-next {
    right: auto;
    left: -25px;
  }

  [dir='rtl'] .carousel-next::before {
    content: '';
  }

  /* Dots */
  .carousel-dots {
    display: block;
    width: 100%;
    padding: 0;
    margin-top: 1em;
    list-style: none;
    text-align: center;
  }

  .carousel-dots li {
    position: relative;

    display: inline-block;

    width: 20px;
    height: 20px;
    margin: 0 5px;
    padding: 0;

    cursor: pointer;
  }

  .carousel-dots li button {
    font-size: 0;
    line-height: 0;

    display: block;

    width: 20px;
    height: 20px;
    padding: 5px;

    cursor: pointer;

    color: transparent;
    border: 0;
    outline: none;
    background: transparent;
  }

  .carousel-dots li button:hover,
  .carousel-dots li button:focus {
    outline: none;
  }

  .carousel-dots li button:hover::before,
  .carousel-dots li button:focus::before {
    opacity: 1;
  }

  .carousel-dots li button::before {
    font-family: 'slick';
    font-size: 40px;
    line-height: 20px;

    position: absolute;
    top: 0;
    left: 0;

    width: 20px;
    height: 20px;

    content: '•';
    text-align: center;

    opacity: .25;
    color: black;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .carousel-dots li.carousel-dots-active button::before {
    opacity: .75;
    color: black;
  }

  .Carousel .carousel-initialized.scrolling .CustomArrow {
    display: none;
  }
`
