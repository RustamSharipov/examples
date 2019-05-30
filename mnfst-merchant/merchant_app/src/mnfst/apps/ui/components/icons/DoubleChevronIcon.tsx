import React from 'react';

interface IDoubleChevronIconProps {
  className?: string;
  size?: number | string;
}

const DoubleChevronIcon: React.SFC<IDoubleChevronIconProps> = ({ className, size }) => {
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      fill="#000000"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      {/* tslint:disable:max-line-length */}
      <path d="M 35.599 32.137 L 23.013 19.551 L 35.599 6.965 C 36.38 6.184 36.38 4.918 35.599 4.137 C 34.818 3.356 33.552 3.356 32.771 4.137 L 18.771 18.137 C 17.99 18.918 17.99 20.184 18.771 20.965 L 32.771 34.965 C 33.552 35.746 34.818 35.746 35.599 34.965 C 36.38 34.184 36.38 32.918 35.599 32.137 Z M 18.599 29.137 L 9.013 19.551 L 18.599 9.965 C 19.38 9.184 19.38 7.918 18.599 7.137 C 17.818 6.356 16.552 6.356 15.771 7.137 L 4.771 18.137 C 3.99 18.918 3.99 20.184 4.771 20.965 L 15.771 31.965 C 16.552 32.746 17.818 32.746 18.599 31.965 C 19.38 31.184 19.38 29.918 18.599 29.137 Z" transform="matrix(-1, 0, 0, -1, 40.369999, 39.102001)" />
      {/* tslint:enable:max-line-length */}
    </svg>
  );
};

DoubleChevronIcon.defaultProps = {
  size: 40,
};

export default DoubleChevronIcon;
