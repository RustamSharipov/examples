import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

interface ILoadingStatusProps {
  caption?: React.ReactNode | string;
  children: React.ReactNode;
  className?: string;
  isLoading: boolean;
}

const LoadingStatus: React.SFC<ILoadingStatusProps> = (props) => {
  const { children, className, isLoading, caption } = props;
  return (
    <div className={classNames(
      styles.loadingStatus,
      className,
    )}>
      <div className={classNames(
        isLoading && styles.loadingArea,
      )}>
        {children}
      </div>
      {(caption && isLoading) && (
        <div className={styles.caption}>
          {caption}
        </div>
      )}
    </div>
  );
};

export default LoadingStatus;
