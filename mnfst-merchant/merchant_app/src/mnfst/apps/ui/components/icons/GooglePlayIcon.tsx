import React from 'react';

interface IGooglePlayIconProps {
  className?: string;
  size?: number | string;
}

const GooglePlayIcon: React.SFC<IGooglePlayIconProps> = ({ className, size }) => {
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      {/* tslint:disable:max-line-length */}
      <path d="M 13.873 11.988 C 13.575 12.301 13.4 12.787 13.4 13.419 L 13.4 35.917 C 13.4 36.548 13.575 37.033 13.873 37.347 L 13.944 37.418 L 26.551 24.818 L 26.551 24.517 L 13.944 11.915 L 13.873 11.988 Z M 28.382 24.517 L 28.382 24.818 L 32.583 29.021 L 32.678 28.967 L 37.657 26.135 C 39.077 25.331 39.077 24.006 37.657 23.2 L 32.68 20.371 L 32.586 20.316 L 28.382 24.517 Z M 14.786 38.263 C 15.254 38.76 16.028 38.821 16.901 38.325 L 31.763 29.88 L 27.467 25.584 L 14.789 38.263 Z M 14.786 11.073 L 27.465 23.751 L 31.763 19.453 L 16.901 11.009 C 16.558 10.798 16.165 10.68 15.761 10.668 C 15.394 10.658 15.039 10.805 14.786 11.073" />
      {/* tslint:enable:max-line-length */}
    </svg>
  );
};

GooglePlayIcon.defaultProps = {
  size: 48,
};

export default GooglePlayIcon;
