import React from 'react';

interface IThreeDotsIconProps {
  className?: string;
}

const ThreeDotsIcon: React.SFC<IThreeDotsIconProps> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 48 48"
      width="48"
      height="48"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      {/* tslint:disable:max-line-length */}
      <path d="M 28.877 8.417 A 5 5 0 0 1 23.877 13.417 A 5 5 0 0 1 18.877 8.417 A 5 5 0 0 1 23.877 3.417 A 5 5 0 0 1 28.877 8.417 Z" />
      <path d="M 28.877 23.793 A 5 5 0 0 1 23.877 28.793 A 5 5 0 0 1 18.877 23.793 A 5 5 0 0 1 23.877 18.793 A 5 5 0 0 1 28.877 23.793 Z" />
      <path d="M 28.877 39.793 A 5 5 0 0 1 23.877 44.793 A 5 5 0 0 1 18.877 39.793 A 5 5 0 0 1 23.877 34.793 A 5 5 0 0 1 28.877 39.793 Z" />
      {/* tslint:enable:max-line-length */}
    </svg>
  );
};

export default ThreeDotsIcon;
