import React from 'react';
import styles from './style.css';

interface IBooleanStatusProps {
  labels: string[];
  status: boolean;
}

const BooleanStatus: React.SFC<IBooleanStatusProps> = (props) => {
  const { labels, status } = props;
  return (
    <span className={status ? styles.on : styles.off}>
      {status ? labels[0] : labels[1]}
    </span>
  );
};

export default BooleanStatus;
