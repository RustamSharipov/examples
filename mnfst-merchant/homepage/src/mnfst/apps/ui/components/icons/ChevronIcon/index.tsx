import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

interface IChevronIconProps {
  className?: string;
  direction: string;
}

const directionsClassNames = {
  left: styles.leftDirection,
  right: styles.rightDirection,
  top: styles.topDirection,
};

const ChevronIcon: React.SFC<IChevronIconProps> = (props) => {
  const { className, direction } = props;
  const directionClassName = directionsClassNames[direction];

  return (
    <svg
      viewBox="0 0 48 48"
      width="48"
      height="48"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames(
        directionClassName,
        className,
      )}>
      {/* tslint:disable:max-line-length */}
      <path d="M 21.504 36.011 L 4.046 17.936 C 2.698 16.587 2.698 14.397 4.046 13.046 C 5.394 11.699 7.586 11.699 8.931 13.046 L 23.943 28.728 L 39.13 13.295 C 40.484 11.944 42.671 11.944 44.026 13.295 C 45.371 14.643 45.371 16.832 44.026 18.181 L 26.393 36.011 C 25.037 37.362 22.852 37.362 21.504 36.011 Z" />
      {/* tslint:enable:max-line-length */}
    </svg>
  );
};

ChevronIcon.defaultProps = {
  direction: 'bottom',
};

export default ChevronIcon;
