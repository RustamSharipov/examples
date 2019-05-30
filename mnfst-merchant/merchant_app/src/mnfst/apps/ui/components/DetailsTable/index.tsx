import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

interface IDetailsTableElementProps {
  className?: string;
  children: React.ReactNode;
}

export const DetailsTable: React.SFC<IDetailsTableElementProps> = (props) => {
  const { className, children } = props;
  return (
    <div className={classNames(
      styles.detailsTable,
      className,
    )}>
      {children}
    </div>
  );
};

export const DetailsTableRow: React.SFC<IDetailsTableElementProps> = (props) => {
  const { className, children } = props;
  return (
    <div className={classNames(
      styles.detailsTableRow,
      className,
    )}>
      {children}
    </div>
  );
};

export const DetailsTableLabel: React.SFC<IDetailsTableElementProps> = (props) => {
  const { className, children } = props;
  return (
    <div className={classNames(
      styles.detailsTableLabel,
      className,
    )}>
      {children}
    </div>
  );
};

export const DetailsTableValue: React.SFC<IDetailsTableElementProps> = (props) => {
  const { className, children } = props;
  return (
    <div className={classNames(
      styles.detailsTableValue,
      className,
    )}>
      {children}
    </div>
  );
};
