import React from 'react';

interface IPlusCircleIcon {
  className?: string;
}

const PlusCircleIcon: React.SFC<IPlusCircleIcon> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      {/* tslint:disable:max-line-length */}
      <path d="M 8.788 4.693 L 8.788 7.405 L 11.486 7.391 L 11.486 8.594 L 8.788 8.609 L 8.788 11.554 L 7.528 11.54 L 7.528 8.594 L 4.86 8.594 L 4.86 7.391 L 7.528 7.391 L 7.528 4.679 L 8.788 4.693 Z" />
      <path d="M 14.75 8.102 C 14.75 11.759 11.793 14.727 8.146 14.727 C 4.5 14.727 1.543 11.759 1.543 8.102 C 1.543 4.443 4.5 1.477 8.146 1.477 C 11.793 1.477 14.75 4.443 14.75 8.102 Z M 8.085 2.719 C 5.067 2.719 2.892 5.02 2.892 8.048 C 2.892 11.076 5.128 13.584 8.146 13.584 C 11.164 13.584 13.389 11.129 13.389 8.102 C 13.389 5.075 11.103 2.719 8.085 2.719 Z" />
      {/* tslint:enable:max-line-length */}
    </svg>
  );
};

export default PlusCircleIcon;
