import React from 'react';
import styles from './style.css';

interface IDarkCenteringContainerProps {
  children: React.ReactNode;
}

const DarkCenteringContainer: React.SFC<IDarkCenteringContainerProps> = (props) => {
  const { children } = props;
  return (
    <div className={styles.darkCenteringContainer}>
      {children}
    </div>
  );
};

export default DarkCenteringContainer;
