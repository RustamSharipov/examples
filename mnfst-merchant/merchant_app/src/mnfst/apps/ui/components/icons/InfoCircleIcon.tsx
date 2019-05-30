import React from 'react';

interface IInfoCircleIconProps {
  className?: string;
}

const InfoCircleIcon: React.SFC<IInfoCircleIconProps> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      {/* tslint:disable:max-line-length */}
      <path d="M 14.75 8.102 C 14.75 11.759 11.793 14.727 8.146 14.727 C 4.5 14.727 1.543 11.759 1.543 8.102 C 1.543 4.443 4.5 1.477 8.146 1.477 C 11.793 1.477 14.75 4.443 14.75 8.102 Z M 8.085 2.719 C 5.067 2.719 2.892 5.02 2.892 8.048 C 2.892 11.076 5.128 13.584 8.146 13.584 C 11.164 13.584 13.389 11.129 13.389 8.102 C 13.389 5.075 11.103 2.719 8.085 2.719 Z" />
      <path d="M 10.66 11.31 L 6.543 11.31 C 6.188 11.352 6.153 10.406 6.543 10.362 L 8.095 10.362 L 8.095 7.372 L 6.543 7.372 C 6.064 7.296 6.298 6.37 6.543 6.411 L 9.01 6.411 L 9.01 10.362 L 10.66 10.362 C 10.854 10.289 11.115 11.141 10.66 11.31 Z M 7.596 5.054 C 7.596 4.878 7.654 4.727 7.771 4.6 C 7.886 4.474 8.034 4.409 8.216 4.409 C 8.404 4.409 8.561 4.474 8.689 4.6 C 8.815 4.727 8.879 4.878 8.879 5.054 C 8.879 5.225 8.815 5.371 8.689 5.487 C 8.561 5.604 8.404 5.663 8.216 5.663 C 8.034 5.663 7.886 5.604 7.771 5.487 C 7.654 5.371 7.596 5.225 7.596 5.054 Z" />
      {/* tslint:enable:max-line-length */}
    </svg>
  );
};

export default InfoCircleIcon;
