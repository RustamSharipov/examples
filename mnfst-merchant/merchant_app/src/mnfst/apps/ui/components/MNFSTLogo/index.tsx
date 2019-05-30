import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

interface IMNFSTLogo {
  className?: string | null;
  height?: string | number;
  width?: string | number;
}

const MNFSTLogo: React.SFC<IMNFSTLogo> = ({ className, width, height }) => {
  return (
    <svg
      viewBox="0 0 128 32"
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      className={classNames(
        styles.logo,
        className,
      )}>
      {/* tslint:disable:max-line-length */}
      <path d="M 106.117 2.875 L 106.117 8.91 L 113.759 8.91 L 113.759 29.404 L 120.609 29.404 L 120.609 8.91 L 128.203 8.91 L 128.203 2.875 Z"/>
      <path d="M 23.431 2.85 L 20.875 2.85 L 15.464 18.897 L 9.459 2.85 L 7.028 2.85 L 6.481 2.85 L 0.203 2.85 L 0.203 29.355 L 7.028 29.355 L 7.028 14.252 L 7.151 14.252 L 11.816 26.549 L 18.691 26.549 L 23.331 14.252 L 23.431 14.252 L 23.431 29.355 L 30.279 29.355 L 30.279 2.85 L 23.976 2.85 Z"/>
      <path d="M 52.267 17.928 L 52.043 17.928 L 42.117 2.875 L 42.117 2.85 L 35.293 2.85 L 35.293 29.404 L 42.117 29.404 L 42.117 14.5 L 42.341 14.5 L 52.267 29.404 L 52.267 29.355 L 59.091 29.355 L 59.091 2.85 L 52.267 2.85 Z"/>
      <path d="M 91.823 10.401 C 91.823 9.358 92.568 8.662 94.528 8.662 C 96.538 8.662 99.019 9.681 100.831 10.973 L 103.933 5.333 C 102.072 3.817 98.448 2.402 94.577 2.402 C 89.044 2.402 84.949 5.632 84.949 10.525 C 84.949 19.021 97.356 18.822 97.356 22.325 C 97.356 23.12 96.637 23.79 95.048 23.79 C 92.344 23.79 89.465 22.101 87.728 20.586 L 83.932 25.853 C 86.612 28.561 90.681 29.902 94.403 29.902 C 100.782 29.902 104.255 26.151 104.255 21.828 C 104.255 13.307 91.823 14.202 91.823 10.401 Z"/>
      <path d="M 64.179 29.355 L 71.027 29.355 L 71.027 19.94 L 80.68 19.94 L 80.68 13.904 L 71.027 13.904 L 71.027 8.886 L 82.467 8.886 L 82.467 2.85 L 64.179 2.85 Z"/>
      {/* tslint:enable:max-line-length */}
    </svg>
  );
};

MNFSTLogo.defaultProps = {
  width: 128,
  height: 32,
};

export default MNFSTLogo;
