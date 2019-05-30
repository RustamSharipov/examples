import React from 'react';

interface IDownloadSquareIconProps {
  className?: string;
  size?: number | string;
}

const DownloadSquareIcon: React.SFC<IDownloadSquareIconProps> = ({ className, size }) => {
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      {/* tslint:disable:max-line-length */}
      <path d="M 19.771 26.915 L 22.008 29.153 L 22.008 6.001 C 22.008 4.896 22.895 4 24.008 4 C 25.112 4 26.008 4.896 26.008 6.001 L 26.008 29.153 L 28.244 26.915 C 29.029 26.131 30.292 26.122 31.079 26.909 C 31.86 27.691 31.855 28.962 31.073 29.745 L 25.428 35.392 C 25.032 35.787 24.521 35.982 24.009 35.981 C 23.497 35.985 22.986 35.79 22.593 35.398 C 22.589 35.394 16.943 29.745 16.943 29.745 C 16.158 28.96 16.15 27.696 16.937 26.909 C 17.718 26.128 18.989 26.133 19.771 26.915 Z M 36 39.999 L 36 33.996 C 36 32.891 36.895 31.995 38 31.995 C 39.105 31.995 40 32.891 40 33.996 L 40 39.999 C 40 42.205 38.208 44 36.009 44 L 11.991 44 C 9.784 44 8 42.213 8 39.999 L 8 33.996 C 8 32.891 8.895 31.995 10 31.995 C 11.105 31.995 12 32.891 12 33.996 L 11.991 39.998 L 36 39.999 Z" />
      {/* tslint:enable:max-line-length */}
    </svg>
  );
};

DownloadSquareIcon.defaultProps = {
  size: 48,
};

export default DownloadSquareIcon;
