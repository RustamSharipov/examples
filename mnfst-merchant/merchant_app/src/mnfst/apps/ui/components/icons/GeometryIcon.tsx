import React from 'react';

interface IGeometryIconProps {
  className?: string;
  size?: number | string;
}

const GeometryIcon: React.SFC<IGeometryIconProps> = ({ className, size }) => {
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      {/* tslint:disable:max-line-length */}
      <path d="M 16 18 C 16 10.268 22.268 4 30 4 C 37.732 4 44 10.268 44 18 C 44 25.732 37.732 32 30 32 L 30 40.003 C 30 42.211 28.206 44 26.003 44 L 7.997 44 C 5.789 44 4 42.206 4 40.003 L 4 21.997 C 4 19.789 5.794 18 7.997 18 L 16 18 Z M 20 18 L 26.003 18 C 28.211 18 30 19.794 30 21.997 L 30 28 C 35.523 28 40 23.523 40 18 C 40 12.477 35.523 8 30 8 C 24.477 8 20 12.477 20 18 Z M 8 40 C 8 40 26 40 26 40 C 26 40 26 22 26 22 C 26 22 8 22 8 22 C 8 22 8 40 8 40 Z" />
      {/* tslint:enable:max-line-length */}
    </svg>
  );
};

GeometryIcon.defaultProps = {
  size: 48,
};

export default GeometryIcon;
