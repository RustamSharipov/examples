import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

interface IButtonsSet {
  children: React.ReactNode;
  align?: string;
  className?: string;
}

const ButtonsSet: React.SFC<IButtonsSet> = ({ children, align, className }) => {
  const alignmentClasses = {
    center: styles.centerAlign,
    end: styles.endAlign,
  };
  const alignmentClass = align ? alignmentClasses[align] : null;

  return (
    <div className={classNames(
      styles.buttonsSet,
      alignmentClass,
      className,
    )}>
      {children}
    </div>
  );
};

export default ButtonsSet;
