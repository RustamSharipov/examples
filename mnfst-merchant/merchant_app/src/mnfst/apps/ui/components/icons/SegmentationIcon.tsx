import React from 'react';

interface ISegmentationIconProps {
  className?: string;
  size?: number | string;
}

const SegmentationIcon: React.SFC<ISegmentationIconProps> = ({ className, size }) => {
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      {/* tslint:disable:max-line-length */}
      <path d="M 42 8 L 42 14 C 42 15.105 41.112 16 40 16 C 38.895 16 38 15.113 38 14 L 38 10 L 34 10 C 32.895 10 32 9.112 32 8 C 32 6.895 32.887 6 34 6 L 40 6 C 40.552 6 41.052 6.222 41.414 6.583 C 41.776 6.944 42 7.444 42 8 Z M 42 28 L 42 22 C 42 20.887 41.105 20 40 20 C 38.888 20 38 20.895 38 22 L 38 26 L 34 26 C 32.887 26 32 26.895 32 28 C 32 29.112 32.895 30 34 30 L 40 30 C 40.556 30 41.056 29.776 41.417 29.414 C 41.778 29.052 42 28.552 42 28 Z M 18 8 L 18 14 C 18 15.113 18.895 16 20 16 C 21.112 16 22 15.105 22 14 L 22 10 L 26 10 C 27.113 10 28 9.105 28 8 C 28 6.888 27.105 6 26 6 L 20 6 C 19.444 6 18.944 6.224 18.583 6.586 C 18.222 6.948 18 7.448 18 8 Z M 6 20.005 C 6 18.898 6.897 18 8.005 18 L 27.995 18 C 29.102 18 30 18.897 30 20.005 L 30 39.995 C 30 41.102 29.103 42 27.995 42 L 8.005 42 C 6.898 42 6 41.103 6 39.995 L 6 20.005 Z M 9.987 38.002 L 26.001 38.017 L 26.011 22 L 10.025 22 L 9.987 38.002 Z" />
      {/* tslint:enable:max-line-length */}
    </svg>
  );
};

SegmentationIcon.defaultProps = {
  size: 48,
};

export default SegmentationIcon;
