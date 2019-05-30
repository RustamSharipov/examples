import React from 'react';

interface ITwitterLogoIcon {
  className?: string;
}

const TwitterLogoIcon: React.SFC<ITwitterLogoIcon> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="#1da1f2"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      {/* tslint:disable:max-line-length */}
      <path d="M 12.529 3.774 L 13.36 3.728 C 13.97 3.695 14.179 4.075 13.833 4.577 L 13.09 5.656 C 13.093 5.724 13.095 5.792 13.095 5.861 C 13.095 5.89 13.098 6.042 13.097 6.123 C 13.095 10.486 10.158 13.5 6.202 13.5 C 4.248 13.5 2.986 12.98 2.116 11.765 C 1.856 11.403 2.055 10.889 2.488 10.805 C 2.507 10.801 2.546 10.793 2.599 10.782 C 2.69 10.764 3.52 10.586 3.808 10.516 C 3.836 10.509 3.891 10.496 3.891 10.496 L 3.86 10.466 C 2.001 8.572 1.895 5.937 2.976 3.755 C 3.176 3.353 3.719 3.302 3.988 3.66 C 4.765 4.698 5.856 5.426 7.104 5.735 L 7.103 5.703 C 7.164 3.901 8.26 2.51 10.095 2.5 C 11.189 2.494 12.022 2.99 12.529 3.774 Z" />
      {/* tslint:enable:max-line-length */}
    </svg>
  );
};

export default TwitterLogoIcon;
