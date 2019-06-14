import React from 'react';
import styles from './style.css';

interface IAppContentProps {
  children: React.ReactNode;
}

export default (props: IAppContentProps) => {
  const { children } = props;

  return (
    <div className={styles.appContent}>
      {children}
    </div>
  );
};
