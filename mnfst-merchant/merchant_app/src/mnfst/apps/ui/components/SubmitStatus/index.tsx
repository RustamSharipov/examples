import React from 'react';
import classNames from 'classnames';
import CheckIcon from 'apps/ui/components/icons/CheckIcon';
import ACrossIcon from 'apps/ui/components/icons/ACrossIcon';
import styles from './style.css';

interface ISubmitStatusProps {
  message?: string | string[] | null;
  type?: string;
}

const SubmitStatus: React.SFC<ISubmitStatusProps> = ({ message, type }) => {
  if (!message) {
    return null;
  }

  const fullMessage = Array.isArray(message) ? message.join('\n') : message;

  return (
    <div className={styles.submitStatus}>
      <span className={styles.icon}>
        {type === 'success' && (
          <CheckIcon className={classNames(
            styles.image,
            styles.successIcon,
          )} />
        )}
        {type === 'error' && (
          <ACrossIcon className={classNames(
            styles.image,
            styles.errorIcon,
          )} />
        )}
      </span>
      <span>{fullMessage}</span>
    </div>
  );
};

SubmitStatus.defaultProps = {
  message: null,
  type: 'error',
};

export default SubmitStatus;
