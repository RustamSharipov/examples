import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

const appendVariantsClassNames = {
  after: styles.appendAfter,
  before: styles.appendBefore,
};

interface IControlIcon {
  appendTo?: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: (event: any) => void;
  onMouseEnter?: (event?: any) => void;
  onMouseLeave?: (event?: any) => void;
  hasPointerEvents?: boolean;
}

const ControlIcon: React.SFC<IControlIcon> = (props) => {
  const { appendTo, children, className, hasPointerEvents, onClick, onMouseEnter, onMouseLeave } = props;
  const appendVariantClassName = appendTo && appendVariantsClassNames[appendTo];

  return (
    <div
      className={classNames(
        styles.controlIcon,
        appendVariantClassName,
        className,
        hasPointerEvents && styles.hasPointerEvents,
      )}
      onClick={onClick && onClick}
      onMouseEnter={onMouseEnter && onMouseEnter}
      onMouseLeave={onMouseLeave && onMouseLeave}>
      {children}
    </div>
  );
};

export default ControlIcon;
