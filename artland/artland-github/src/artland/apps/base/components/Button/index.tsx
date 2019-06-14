import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

interface IButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  dockTo?: string | null | undefined;
  onClick?: () => void;
  theme?: 'green' | 'red';
  type?: 'button' | 'submit' | 'reset';
}

const dockVariantsClassNames = {
  bottom: styles.dockBottom,
  left: styles.dockLeft,
  'left-right': styles.dockLeftRight,
  right: styles.dockRight,
  top: styles.dockTop,
};

const themeClassNames = {
  green: styles.greenTheme,
  red: styles.redTheme,
};

export default (props: IButtonProps) => {
  const { children, className, disabled, dockTo, onClick, theme, type } = props;
  const dockVariantClassName = dockTo && dockVariantsClassNames[dockTo];
  const themeClassName = theme && themeClassNames[theme];

  return (
    <button
      className={classNames(
        styles.button,
        { [styles.isDisabled]: disabled },
        dockVariantClassName,
        themeClassName,
        className,
      )}
      onClick={onClick && onClick}
      disabled={disabled}
      type={type}>
      {children}
    </button>
  );
}
