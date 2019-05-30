import React from 'react';
import { getLocalData } from 'apps/ui/utils/localization';
import styles from './style.css';

const NotFound = () => {
  return (
    <div className={styles.error}>
      <div className={styles.code}>404</div>
      <div className={styles.description}>
        {getLocalData('ui.errors.pageNotFound')}
      </div>
    </div>
  );
};

export default NotFound;
