import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const Wrapper = styled(LazyLoadImage)``;

const Image = ({ className, src, width, height, alt }) => (
  <Wrapper
    className={className}
    src={src}
    width={width}
    height={height}
    effect="opacity"
    alt={alt}
  />
);

Image.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  alt: PropTypes.string,
};

export default Image;
