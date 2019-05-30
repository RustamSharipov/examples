import React from 'react';

interface IGlobusIconProps {
  className?: string;
  size?: number | string;
}

const GlobusIcon: React.SFC<IGlobusIconProps> = ({ className, size }) => {
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      {/* tslint:disable:max-line-length */}
      <path d="M 24 44 C 12.954 44 4 35.046 4 24 C 4 12.954 12.954 4 24 4 C 35.046 4 44 12.954 44 24 C 44 35.046 35.046 44 24 44 Z M 8.124 26 C 8.832 31.608 12.444 36.426 17.628 38.68 C 15.742 35.316 14.374 30.724 14.066 26 L 8.124 26 Z M 8.124 22 L 14.064 22 C 14.366 17.272 15.708 12.696 17.576 9.342 C 12.418 11.606 8.83 16.412 8.124 22 Z M 39.876 22 C 39.17 16.412 35.582 11.606 30.424 9.342 C 32.292 12.696 33.634 17.272 33.936 22 L 39.876 22 Z M 30.372 38.68 C 35.556 36.426 39.168 31.608 39.876 26 L 33.934 26 C 33.626 30.724 32.258 35.316 30.372 38.68 Z M 20.652 35.838 C 21.95 38.446 23.472 40 24 40 C 24.528 40 26.05 38.446 27.348 35.838 C 28.738 33.044 29.672 29.598 29.928 26 L 18.072 26 C 18.328 29.596 19.262 33.044 20.652 35.838 Z M 20.616 12.158 C 19.244 14.938 18.322 18.39 18.07 22 L 29.93 22 C 29.678 18.39 28.756 14.94 27.384 12.158 C 26.09 9.538 24.576 8 24 8 C 23.424 8 21.91 9.536 20.616 12.158 Z" />
      {/* tslint:enable:max-line-length */}
    </svg>
  );
};

GlobusIcon.defaultProps = {
  size: 48,
};

export default GlobusIcon;
