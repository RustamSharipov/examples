import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

interface ISpinnerProps {
  className?: string;
}

const Spinner: React.SFC<ISpinnerProps> = (props) => {
  const { className } = props;
  return (
    <div className={styles.spinner}>
      <div className={classNames(
        styles.icon,
        className,
      )}>
        <div className={styles.iconInner} />
      </div>
    </div>
  );
};

export default Spinner;
