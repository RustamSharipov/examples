import React from 'react';

interface IFacebookLogoIconProps {
  className?: string;
}

const FacebookLogoIcon: React.SFC<IFacebookLogoIconProps> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="#3b5998"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      {/* tslint:disable:max-line-length */}
      <path d="M8.99 15H6.33V8.5H5V6.26h1.33V4.913C6.33 3.087 7.08 2 9.212 2h1.775v2.24h-1.11c-.83 0-.885.314-.885.898L8.99 6.259H11l-.235 2.24H8.989V15z" />
      {/* tslint:enable:max-line-length */}
    </svg>
  );
};

export default FacebookLogoIcon;
