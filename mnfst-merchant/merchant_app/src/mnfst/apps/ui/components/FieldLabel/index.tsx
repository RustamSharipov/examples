import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

interface IFieldLabelProps {
  className?: string;
  children: React.ReactNode;
  notEmptyValue?: boolean;
}

const FieldLabel: React.SFC<IFieldLabelProps> = (props) => {
  const { children, notEmptyValue, className } = props;
  return (
    <div className={classNames(
      styles.label,
      notEmptyValue && styles.notEmptyValue,
      className,
    )}>
      {children}
    </div>
  );
};

export default FieldLabel;
