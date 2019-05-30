import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

const dockVariantsClassNames = {
  bottom: styles.dockBottom,
  left: styles.dockLeft,
  right: styles.dockRight,
  top: styles.dockTop,
};

interface ITextInputContainerProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  dockTo?: string;
  hasFocus?: boolean;
  hasErrors?: boolean;
  isHover?: boolean;
  onBlur?: () => void;
}

class TextInputContainer extends React.Component<ITextInputContainerProps>  {
  public handleClickOutside = () => {
    const { onBlur } = this.props;
    if (onBlur) {
      onBlur();
    }
  }

  public render() {
    const { children, className, disabled, dockTo, hasFocus, hasErrors, isHover } = this.props;
    const dockVariantClassName = dockTo && dockVariantsClassNames[dockTo];

    return (
      <div
        className={classNames(
          styles.textInputContainer,
          dockVariantClassName,
          hasErrors && styles.hasErrors,
          hasFocus && styles.hasFocus,
          (isHover && !disabled) && styles.isHover,
          className,
        )}>
        {children}
      </div>
    );
  }
}

export default TextInputContainer;
