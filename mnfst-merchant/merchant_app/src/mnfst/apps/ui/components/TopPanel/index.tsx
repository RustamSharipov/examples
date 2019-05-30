import React from 'react';
import styles from './style.css';

interface ITopPanel {
  children: React.ReactNode;
}

const TopPanel: React.SFC<ITopPanel> = ({ children }) => {
  return (
    <div className={styles.topPanel}>
      {children}
    </div>
  );
};

export default TopPanel;
