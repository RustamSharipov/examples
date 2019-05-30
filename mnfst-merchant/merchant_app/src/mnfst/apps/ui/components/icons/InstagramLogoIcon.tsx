import React from 'react';

interface IInstagramLogoIconProps {
  className?: string;
}

const InstagramLogoIcon: React.SFC<IInstagramLogoIconProps> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="#cd486b"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      {/* tslint:disable:max-line-length */}
      <path d="M 3.55 0 L 8.45 0 C 9.684 0 10.132 0.129 10.583 0.37 C 11.035 0.611 11.389 0.965 11.63 1.417 C 11.871 1.868 12 2.316 12 3.55 L 12 8.45 C 12 9.684 11.871 10.132 11.63 10.583 C 11.389 11.035 11.035 11.389 10.583 11.63 C 10.132 11.871 9.684 12 8.45 12 L 3.55 12 C 2.316 12 1.868 11.871 1.417 11.63 C 0.965 11.389 0.611 11.035 0.37 10.583 C 0.129 10.132 0 9.684 0 8.45 L 0 3.55 C 0 2.316 0.129 1.868 0.37 1.417 C 0.611 0.965 0.965 0.611 1.417 0.37 C 1.868 0.129 2.316 0 3.55 0 Z M 10 3 C 10.552 3 11 2.552 11 2 C 11 1.448 10.552 1 10 1 C 9.448 1 9 1.448 9 2 C 9 2.552 9.448 3 10 3 Z M 6 9.5 C 7.933 9.5 9.5 7.933 9.5 6 C 9.5 4.067 7.933 2.5 6 2.5 C 4.067 2.5 2.5 4.067 2.5 6 C 2.5 7.933 4.067 9.5 6 9.5 Z M 6 8 C 4.895 8 4 7.105 4 6 C 4 4.895 4.895 4 6 4 C 7.105 4 8 4.895 8 6 C 8 7.105 7.105 8 6 8 Z" style={{ transform: 'translate(12.5%, 12.5%)' }} />
      {/* tslint:enable:max-line-length */}
    </svg>
  );
};

export default InstagramLogoIcon;
