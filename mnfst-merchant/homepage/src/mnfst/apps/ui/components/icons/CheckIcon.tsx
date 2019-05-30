import React from 'react';

interface ICheckIconProps {
  className?: string;
  size?: number | string;
}

const CheckIcon: React.SFC<ICheckIconProps> = (props) => {
  const { className } = props;

  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      {/* tslint:disable:max-line-length */}
      <path d="M 9.424 16.116 L 5.824 12.516 C 5.356 12.047 5.356 11.287 5.824 10.818 C 6.293 10.35 7.053 10.35 7.522 10.818 L 10.273 13.587 L 16.024 7.818 C 16.493 7.35 17.253 7.35 17.722 7.818 C 18.19 8.287 18.19 9.047 17.722 9.516 L 11.122 16.116 C 10.653 16.584 9.893 16.584 9.424 16.116 Z" />
      <path d="M 9.4 16.091 L 5.79 12.481 C 5.32 12.011 5.32 11.25 5.79 10.779 C 6.26 10.309 7.022 10.309 7.491 10.779 L 10.25 13.555 L 16.018 7.771 C 16.488 7.301 17.25 7.301 17.721 7.771 C 18.19 8.241 18.19 9.003 17.721 9.472 L 11.102 16.091 C 10.631 16.561 9.87 16.561 9.4 16.091 Z" />
      {/* tslint:enable:max-line-length */}
    </svg>
  );
};

export default CheckIcon;
