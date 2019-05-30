import React from 'react';
import styles from './style.css';
import { localizeString } from 'utils/localization';

const NotFound = () => {
  return (
    <div className={styles.error}>
      <div className={styles.code}>404</div>
      <div className={styles.description}>
        {localizeString('Page not found')}
      </div>
    </div>
  );
};

export default NotFound;
