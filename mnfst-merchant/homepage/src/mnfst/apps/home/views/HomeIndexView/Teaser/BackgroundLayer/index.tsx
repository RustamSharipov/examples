import React from 'react';
import styles from './style.css';

const BackgroundLayer = () => {
  return (
    <div className={styles.backgroundLayer}>
      <div className={styles.waveContainer}>
        <div className={styles.wave} />
        <div className={styles.wave} />
      </div>
    </div>
  );
};

export default BackgroundLayer;
