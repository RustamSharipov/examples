import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

const typesClassNames = {
  error: styles.errorType,
  success: styles.successType,
};

interface IValidationStatusProps {
  className?: string;
  message?: string | string[] | null;
  type?: string;
}

const ValidationStatus: React.SFC<IValidationStatusProps> = (props) => {
  const { className, message, type } = props;

  if (!message) {
    return null;
  }

  const typeClassName = type && typesClassNames[type];
  const fullMessage = Array.isArray(message)
    ? message.map((item, index, items) => (
      <React.Fragment key={index}>
        {index !== 0 && <br />}
        {item}
      </React.Fragment>
    ))
    : message;

  return (
    <div className={classNames(
      styles.validationStatus,
      typeClassName,
      className,
      'spec-validation-status-element',
    )}>
      {fullMessage}
    </div>
  );
};

ValidationStatus.defaultProps = {
  message: null,
  type: 'error',
};

export default ValidationStatus;
