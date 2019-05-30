import React from 'react';

interface IShieldIconProps {
  className?: string;
  size?: number | string;
}

const ShieldIcon: React.SFC<IShieldIconProps> = ({ className, size }) => {
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      {/* tslint:disable:max-line-length */}
      <path id="a" d="M13.735 39.047C8.965 35.117 6.036 30.01 6 23.994c.022-6.624 0-17.897 0-17.98a2 2 0 0 1 2.512-1.946c.047.012 2.712.67 4.656.961 3.58.537 7.26.972 10.832.972 3.597 0 7.278-.435 10.858-.972 1.944-.291 4.609-.949 4.656-.961a2 2 0 0 1 2.512 1.946c0 .083-.022 11.356 0 17.98-.036 6.015-2.965 11.123-7.735 15.053-3.518 2.898-8.023 4.983-10.291 4.954-2.242.03-6.747-2.056-10.265-4.954zM12.458 9.018c-.872-.124-1.656-.348-2.458-.506 0 .763.022 8.862 0 15.477.028 4.68 2.354 8.738 6.279 11.971a23.275 23.275 0 0 0 4.923 3.112c1.292.598 2.417.934 2.798.93.407.004 1.532-.332 2.824-.93a23.275 23.275 0 0 0 4.923-3.112c3.925-3.233 6.25-7.29 6.28-11.971-.023-6.615-.001-14.714-.001-15.477-.802.158-1.586.382-2.458.506-3.82.544-7.724.983-11.568.983-3.818 0-7.721-.44-11.542-.983zm8.128 21.397l-6-6a2 2 0 0 1 2.828-2.828L22 26.2l9.586-9.614a2 2 0 0 1 2.828 2.828l-11 11a2 2 0 0 1-2.828 0z" />
      {/* tslint:enable:max-line-length */}
    </svg>
  );
};

ShieldIcon.defaultProps = {
  size: 48,
};

export default ShieldIcon;
