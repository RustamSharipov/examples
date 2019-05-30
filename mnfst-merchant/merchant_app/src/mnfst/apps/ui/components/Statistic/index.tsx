import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

interface IStatisticElementProps {
  children: React.ReactNode;
  className?: string;
}

interface IStatisticItemValueProps extends IStatisticElementProps {
  isTotal?: boolean;
}

export const StatisticItem: React.SFC<IStatisticElementProps> = (props) => {
  const { children, className } = props;

  return (
    <div className={classNames(
      styles.statisticItem,
      className,
    )}>
      {children}
    </div>
  );
};

export const StatisticItemTitle: React.SFC<IStatisticElementProps> = (props) => {
  const { children, className } = props;

  return (
    <div className={classNames(
      styles.statisticItemTitle,
      className,
    )}>
      {children}
    </div>
  );
};

export const StatisticItemAddition: React.SFC<IStatisticElementProps> = (props) => {
  const { children, className } = props;

  return (
    <div className={classNames(
      styles.statisticItemAddition,
      className,
    )}>
      {children}
    </div>
  );
};

export const StatisticItemValue: React.SFC<IStatisticItemValueProps> = (props) => {
  const { children, className, isTotal } = props;

  return (
    <div className={classNames(
      styles.statisticItemValue,
      className,
      isTotal && styles.isTotal,
    )}>
      {children}
    </div>
  );
};
