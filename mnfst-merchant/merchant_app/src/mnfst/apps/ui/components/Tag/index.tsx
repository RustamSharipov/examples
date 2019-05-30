import React from 'react';
import classNames from 'classnames';
import { IClassNames } from 'interfaces';
import styles from './style.css';

interface ITagProps {
  children: React.ReactNode;
  className?: string;
  classNamesList?: IClassNames;
  disabled?: boolean;
  onRemove?: () => void;
}

const Tag: React.SFC<ITagProps> = (props) => {
  const { children, className, classNamesList, disabled, onRemove } = props;
  return (
    <div className={classNames(
      styles.tag,
      disabled && styles.isDisabled,
      className,
    )}>
      <span className={styles.caption}>{children}</span>
      {!disabled && (
        <button
          className={classNames(
            styles.removeButton,
            classNamesList && classNamesList.removeButton,
          )}
          onClick={onRemove && onRemove}
          type="button">
          ×
        </button>
      )}
    </div>
  );
};

export default Tag;
