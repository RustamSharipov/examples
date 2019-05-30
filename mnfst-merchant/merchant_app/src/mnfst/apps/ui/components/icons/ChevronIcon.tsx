import React from 'react';

interface IChevronIconProps {
  className?: string;
  size?: number | string;
  direction: string;
}

const ChevronIcon: React.SFC<IChevronIconProps> = ({ className, size, direction }) => {
  {/* tslint:disable:max-line-length */}
  const d = 'M 11.188 15.671 L 6.356 10.668 C 5.983 10.295 5.983 9.689 6.356 9.315 C 6.729 8.942 7.336 8.942 7.708 9.315 L 11.863 13.655 L 16.066 9.384 C 16.441 9.01 17.046 9.01 17.421 9.384 C 17.794 9.757 17.794 10.363 17.421 10.736 L 12.541 15.671 C 12.166 16.045 11.561 16.045 11.188 15.671 Z';
  {/* tslint:enable:max-line-length */}
  let transform;

  if (direction === 'top') {
    transform = 'matrix(-1, 0, 0, -1, 23.777, 24.98675)';
  }
  if (direction === 'left') {
    transform = 'matrix(0, 1, -1, 0, 24.381874, 0.604875)';
  }
  if (direction === 'right') {
    transform = 'matrix(0, -1, 1, 0, -0.604875, 24.381874)';
  }

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <path
        d={d}
        transform={transform} />
    </svg>
  );
};

ChevronIcon.defaultProps = {
  size: 24,
  direction: 'down',
};

export default ChevronIcon;
