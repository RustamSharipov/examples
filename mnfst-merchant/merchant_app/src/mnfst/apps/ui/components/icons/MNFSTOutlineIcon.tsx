import React from 'react';

interface IMNFSTOutlineIconProps {
  className?: string;
  size?: number | string;
}

const MNFSTOutlineIcon: React.SFC<IMNFSTOutlineIconProps> = ({ className, size }) => {
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      fill="#000000"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      {/* tslint:disable:max-line-length */}
      <path d="M 34.24 14.96 L 34.24 33.04 L 29.6 33.04 L 29.6 22.72 L 29.52 22.72 L 26.32 31.12 L 21.68 31.12 L 18.48 22.72 L 18.4 22.72 L 18.4 33.04 L 13.76 33.04 L 13.76 14.96 L 20.08 14.96 L 24.16 25.92 L 27.84 14.96 Z M 4.48 24 C 4.48 34.8 13.2 43.52 24 43.52 C 34.8 43.52 43.52 34.8 43.52 24 C 43.52 13.2 34.8 4.48 24 4.48 C 13.2 4.48 4.48 13.2 4.48 24 Z M 24 0 C 37.28 0 48 10.72 48 24 C 48 37.28 37.28 48 24 48 C 10.72 48 0 37.28 0 24 C 0 10.72 10.72 0 24 0 Z" />
      {/* tslint:enable:max-line-length */}
    </svg>
  );
};

MNFSTOutlineIcon.defaultProps = {
  size: 48,
};

export default MNFSTOutlineIcon;
