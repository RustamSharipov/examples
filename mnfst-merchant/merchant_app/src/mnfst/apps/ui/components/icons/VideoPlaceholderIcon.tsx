import React from 'react';

interface IVideoPlaceholderIconProps {
  className?: string;
  size?: number | string;
}

const VideoPlaceholderIcon: React.SFC<IVideoPlaceholderIconProps> = (props) => {
  const { className, size } = props;
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      {/* tslint:disable:max-line-length */}
      <path d="M 39.801 79.602 C 17.82 79.602 0 61.782 0 39.801 C 0 17.82 17.82 0 39.801 0 C 61.782 0 79.602 17.82 79.602 39.801 C 79.602 61.782 61.782 79.602 39.801 79.602 Z M 39.801 71.642 C 57.386 71.642 71.642 57.386 71.642 39.801 C 71.642 22.216 57.386 7.96 39.801 7.96 C 22.216 7.96 7.96 22.216 7.96 39.801 C 7.96 57.386 22.216 71.642 39.801 71.642 Z M 61.718 40.084 L 30.064 57.615 L 30.064 20.954 L 61.718 40.084 Z" />
      {/* tslint:enable:max-line-length */}
    </svg>
  );
};

VideoPlaceholderIcon.defaultProps = {
  size: 80,
};

export default VideoPlaceholderIcon;
