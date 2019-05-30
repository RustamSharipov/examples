import React from 'react';

interface IPlusIcon {
  className?: string;
}

const PlusIcon: React.SFC<IPlusIcon> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="#000000"
      width="48"
      height="48"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      {/* tslint:disable:max-line-length */}
      <path d="M26,7.99970728 C26,6.88989258 25.1045695,6 24,6 C22.8877296,6 22,6.89529944 22,7.99970728 L22,22 L7.99970728,22 C6.88989258,22 6,22.8954305 6,24 C6,25.1122704 6.89529944,26 7.99970728,26 L22,26 L22,40.0002927 C22,41.1101074 22.8954305,42 24,42 C25.1122704,42 26,41.1047006 26,40.0002927 L26,26 L40.0002927,26 C41.1101074,26 42,25.1045695 42,24 C42,22.8877296 41.1047006,22 40.0002927,22 L26,22 L26,7.99970728 Z" />
      {/* tslint:enable:max-line-length */}
    </svg>
  );
};

export default PlusIcon;
