import React from 'react';

interface ITargetIconProps {
  className?: string;
  size?: number | string;
}

const TargetIcon: React.SFC<ITargetIconProps> = ({ className, size }) => {
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      {/* tslint:disable:max-line-length */}
      <path id="a" d="M27 25.385a4 4 0 1 1-2.962-3.864l3.034-3.035-1.204-6.021a2 2 0 0 1 .547-1.806l7.07-7.072c1.13-1.129 3.063-.544 3.376 1.022l1.153 5.764 5.764 1.153c1.566.313 2.151 2.246 1.021 3.375l-7.07 7.071a2 2 0 0 1-1.807.547L29.9 21.315l-3.035 3.035c.088.33.135.677.135 1.035zm7.135-13.961l-.49-2.34-3.636 3.637.468 2.36 3.658-3.657zm-.826 6.483l2.362.466 3.672-3.672-2.367-.462-3.667 3.668zm-12.66-4.291a2 2 0 0 1 .78 3.923A8.003 8.003 0 0 0 15 25.385a8 8 0 0 0 8 8c3.81 0 7.07-2.684 7.833-6.364a2 2 0 0 1 3.917.812A12.003 12.003 0 0 1 23 37.385c-6.627 0-12-5.373-12-12 0-5.75 4.075-10.661 9.65-11.77zM23 5.386a2 2 0 1 1 0 4c-8.837 0-16 7.163-16 16 0 8.836 7.163 16 16 16s16-7.164 16-16a2 2 0 1 1 4 0c0 11.045-8.954 20-20 20s-20-8.955-20-20c0-11.047 8.954-20 20-20z" />
      {/* tslint:enable:max-line-length */}
    </svg>
  );
};

TargetIcon.defaultProps = {
  size: 48,
};

export default TargetIcon;
