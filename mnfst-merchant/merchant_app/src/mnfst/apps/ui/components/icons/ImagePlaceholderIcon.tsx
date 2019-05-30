import React from 'react';

interface IImagePlaceholderIconProps {
  className?: string;
  size?: number | string;
}

const ImagePlaceholderIcon: React.SFC<IImagePlaceholderIconProps> = ({ className, size }) => {
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      {/* tslint:disable:max-line-length */}
      <path d="M39.800995,79.60199 C17.8195124,79.60199 0,61.7824776 0,39.800995 C0,17.8195124 17.8195124,0 39.800995,0 C61.7824776,0 79.60199,17.8195124 79.60199,39.800995 C79.60199,61.7824776 61.7824776,79.60199 39.800995,79.60199 Z M39.800995,71.641791 C57.3861811,71.641791 71.641791,57.3861811 71.641791,39.800995 C71.641791,22.215809 57.3861811,7.960199 39.800995,7.960199 C22.215809,7.960199 7.960199,22.215809 7.960199,39.800995 C7.960199,57.3861811 22.215809,71.641791 39.800995,71.641791 Z M28.5006336,31.9706545 C29.2233535,30.520099 30.5140522,30.4556524 31.3713637,31.8075868 L36.349015,39.6570759 C37.2117555,41.0175715 39.0250833,41.4279116 40.4081022,40.5680591 L43.3058056,38.7664947 C44.6848371,37.9091213 46.557322,38.2727452 47.5057478,39.6034072 L54.1388091,48.9097357 C55.0793416,50.2293231 54.5259664,51.2990601 52.9098164,51.2990601 L21.802491,51.2990607 C20.1832047,51.2990607 19.4586268,50.1186716 20.1791138,48.6725977 L28.5006336,31.9706545 Z M56.2528557,36.6500831 C53.8257337,36.6500831 51.8581624,34.6825118 51.8581624,32.2553898 C51.8581624,29.8282678 53.8257337,27.8606965 56.2528557,27.8606965 C58.6799777,27.8606965 60.6475489,29.8282678 60.6475489,32.2553898 C60.6475489,34.6825118 58.6799777,36.6500831 56.2528557,36.6500831 Z" />
      {/* tslint:enable:max-line-length */}
    </svg>
  );
};

ImagePlaceholderIcon.defaultProps = {
  size: 80,
};

export default ImagePlaceholderIcon;