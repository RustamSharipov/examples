import React from 'react';

interface ILinkedInOLogoIconProps {
  className?: string;
}

const LinkedInOLogoIcon: React.SFC<ILinkedInOLogoIconProps> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 48 48"
      width="48"
      height="48"
      fill="#3b5998"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      {/* tslint:disable:max-line-length */}
      <path d="M 4 38.01 L 4 9.99 C 4 6.682 6.681 4 9.99 4 L 38.01 4 C 41.318 4 44 6.681 44 9.99 L 44 38.01 C 44 41.318 41.319 44 38.01 44 L 9.99 44 C 6.682 44 4 41.319 4 38.01 Z M 9.99 8 C 8.89 8 8 8.891 8 9.99 L 8 38.01 C 8 39.11 8.891 40 9.99 40 L 38.01 40 C 39.11 40 40 39.109 40 38.01 L 40 9.99 C 40 8.89 39.109 8 38.01 8 L 9.99 8 Z M 14 22.006 C 14 20.898 14.888 20 16 20 C 17.105 20 18 20.897 18 22.006 L 18 31.994 C 18 33.102 17.112 34 16 34 C 14.895 34 14 33.103 14 31.994 L 14 22.006 Z M 16 18 C 14.895 18 14 17.105 14 16 C 14 14.895 14.895 14 16 14 C 17.105 14 18 14.895 18 16 C 18 17.105 17.105 18 16 18 Z M 25 26.5 L 25 32 C 25 33.105 24.105 34 23 34 C 21.895 34 21 33.105 21 32 L 21 26.5 C 21 22.912 23.914 20 27.5 20 C 31.088 20 34 22.916 34 26.5 L 34 32 C 34 33.105 33.105 34 32 34 C 30.895 34 30 33.105 30 32 L 30 26.5 C 30 25.124 28.877 24 27.5 24 C 26.122 24 25 25.122 25 26.5 Z" />
      {/* tslint:enable:max-line-length */}
    </svg>
  );
};

export default LinkedInOLogoIcon;
