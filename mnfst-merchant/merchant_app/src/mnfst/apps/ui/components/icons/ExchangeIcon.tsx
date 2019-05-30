import React from 'react';

interface IExchangeIconProps {
  className?: string;
  size?: number | string;
}

const ExchangeIcon: React.SFC<IExchangeIconProps> = ({ className, size }) => {
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      {/* tslint:disable:max-line-length */}
      <path id="a" d="M16.506 8.414a2 2 0 0 1 2.828-2.828l6 6a2 2 0 0 1 0 2.828l-6 6a2 2 0 0 1-2.828-2.828L19.079 15h-2.082C12.032 15 8 19.032 8 24c0 4.664 4.186 9 7.995 9a2 2 0 1 1 0 4C9.945 37 4 30.842 4 24c0-7.177 5.823-13 12.997-13h2.082l-2.573-2.586zm14.828 31.172a2 2 0 1 1-2.828 2.828l-6-6a2 2 0 0 1 0-2.828l6-6a2 2 0 1 1 2.828 2.828L28.761 33h2.162c4.964 0 8.997-4.032 8.997-9 0-4.664-4.187-9-7.995-9a2 2 0 1 1 0-4c6.05 0 11.995 6.158 11.995 13 0 7.177-5.824 13-12.997 13h-2.162l2.573 2.586z" />
      {/* tslint:enable:max-line-length */}
    </svg>
  );
};

ExchangeIcon.defaultProps = {
  size: 48,
};

export default ExchangeIcon;
