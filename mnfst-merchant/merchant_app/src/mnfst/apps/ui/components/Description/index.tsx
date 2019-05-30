import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

interface IDescriptionProps {
  children: React.ReactNode;
  className?: string;
  iconBefore?: React.ReactNode;
  withMargins?: boolean;
}

interface IDescriptionStubProps {
  withMargins?: boolean;
}

const Description: React.SFC<IDescriptionProps> = (props) => {
  const { children, className, iconBefore, withMargins } = props;
  return (
    <div className={classNames(
      styles.description,
      withMargins && styles.withMargins,
      className,
    )}>
      {iconBefore && (
        <span className={styles.iconBefore}>
          {iconBefore}
        </span>
      )}
      <span>
        {children}
      </span>
    </div>
  );
};

export default Description;

export const DescriptionStub: React.SFC<IDescriptionStubProps> = (props) => {
  const { withMargins } = props;
  return (
    <div className={classNames(
      styles.description,
      styles.descriptionStub,
      withMargins && styles.withMargins,
    )} />
  );
};
