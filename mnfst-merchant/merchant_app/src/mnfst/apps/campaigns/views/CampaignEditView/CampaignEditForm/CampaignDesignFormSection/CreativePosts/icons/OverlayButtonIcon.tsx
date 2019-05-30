import React from 'react';
import { IClassNames } from 'interfaces';

interface IOverlayButtonIconProps {
  className?: string;
  classNamesList?: IClassNames;
}

const OverlayButtonIcon: React.SFC<IOverlayButtonIconProps> = (props) => {
  const { className, classNamesList } = props;
  return (
    <svg
      viewBox="0 0 12 12"
      width="12"
      height="12"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      {/* tslint:disable:max-line-length */}
      <path
        className={classNamesList && classNamesList.back}
        d="M 12 0.667 L 12 2.667 C 12 3.035 11.704 3.333 11.333 3.333 C 10.965 3.333 10.667 3.038 10.667 2.667 L 10.667 1.333 L 9.333 1.333 C 8.965 1.333 8.667 1.037 8.667 0.667 C 8.667 0.298 8.962 0 9.333 0 L 11.333 0 C 11.517 0 11.684 0.074 11.805 0.194 C 11.925 0.315 12 0.481 12 0.667 Z M 12 7.333 L 12 5.333 C 12 4.962 11.702 4.667 11.333 4.667 C 10.963 4.667 10.667 4.965 10.667 5.333 L 10.667 6.667 L 9.333 6.667 C 8.962 6.667 8.667 6.965 8.667 7.333 C 8.667 7.704 8.965 8 9.333 8 L 11.333 8 C 11.519 8 11.685 7.925 11.806 7.805 C 11.926 7.684 12 7.517 12 7.333 Z M 4 0.667 L 4 2.667 C 4 3.038 4.298 3.333 4.667 3.333 C 5.037 3.333 5.333 3.035 5.333 2.667 L 5.333 1.333 L 6.667 1.333 C 7.038 1.333 7.333 1.035 7.333 0.667 C 7.333 0.296 7.035 0 6.667 0 L 4.667 0 C 4.481 0 4.315 0.075 4.194 0.195 C 4.074 0.316 4 0.483 4 0.667 Z"
        fill="#000000"
        opacity="0.1" />
      <path
        className={classNamesList && classNamesList.front}
        d="M 0 4.668 C 0 4.299 0.299 4 0.668 4 L 7.332 4 C 7.701 4 8 4.299 8 4.668 L 8 11.332 C 8 11.701 7.701 12 7.332 12 L 0.668 12 C 0.299 12 0 11.701 0 11.332 L 0 4.668 Z M 1.329 10.667 L 6.667 10.672 L 6.67 5.333 L 1.342 5.333 L 1.329 10.667 Z"
        fill="#674FF1" />
      {/* tslint:enable:max-line-length */}
    </svg>
  );
};

export default OverlayButtonIcon;
