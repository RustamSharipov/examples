import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

interface IFlagIconProps {
  className?: string;
  countryCode: string;
}

const FlagIcon: React.SFC<IFlagIconProps> = (props) => {
  const { className, countryCode } = props;
  return (
    <span className={classNames(
      styles['flag-icon'],
      styles['flag-icon-squared'],
      styles[`flag-icon-${countryCode.toLowerCase()}`],
      className,
    )} />
  );
};

export default FlagIcon;
