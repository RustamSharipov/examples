import React from 'react';
import InputMask from 'react-input-mask';
import classNames from 'classnames';
import styles from './style.css';

interface ITextControlProps {
  alwaysShowMask?: boolean;
  autoFocus?: boolean;
  className?: string;
  disabled: boolean;
  elementType?: string;
  formatChars?: any;
  mask?: string;
  maskChar: string;
  maxLength?: number;
  min?: string | number;
  name?: string;
  notEmptyValue: boolean;
  onChange?: (event: any) => void;
  onClick?: (event: any) => void;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
  onInit?: (event?: any) => void;
  onMouseEnter?: (event?: any) => void;
  onMouseLeave?: (event?: any) => void;
  readonly?: boolean;
  type?: string;
  value: string | number;
  withTooltip?: boolean;
  withIconAfter?: boolean;
  withIconBefore?: boolean;
}

class TextControl extends React.Component<ITextControlProps> {
  public static defaultProps = {
    disabled: false,
    maskChar: '_',
    notEmptyValue: false,
    readonly: false,
    type: 'text',
    withTooltip: false,
  };

  public textControl: HTMLElement | HTMLInputElement | null;

  public componentDidMount() {
    const { onInit } = this.props;

    if (this.textControl && onInit) {
      onInit(this.textControl);
    }
  }

  public render() {
    const {
      alwaysShowMask, autoFocus, className, disabled, elementType, formatChars, mask, maskChar, maxLength, min, name,
      notEmptyValue, readonly, type, value, withTooltip, withIconBefore, withIconAfter,
      onClick, onFocus, onBlur, onMouseEnter, onMouseLeave,
    } = this.props;

    const textControlClassNames = classNames(
      styles.textControl,
      className,
      disabled && styles.isDisabled,
      notEmptyValue && styles.notEmptyValue,
      withTooltip && styles.withTooltip,
      withIconAfter && styles.withIconAfter,
      withIconBefore && styles.withIconBefore,
    );

    const inputProps = {
      autoFocus,
      disabled,
      min,
      name,
      maxLength,
      type,
      onChange: this.handleChange,
      onClick: onClick && onClick,
      onFocus: onFocus && onFocus,
      onBlur: onBlur && onBlur,
      readOnly: readonly,
      value: typeof value === 'number'
        ? (min && +value < +min) ? min : value
        : value || '',
    };

    const sharedProps = {
      onMouseEnter: onMouseEnter && onMouseEnter,
      onMouseLeave: onMouseLeave && onMouseLeave,
    };

    if (elementType === 'span') {
      return (
        <span
          ref={(element) => { this.textControl = element; }}
          className={classNames(
            textControlClassNames,
            styles.static,
          )}
          {...sharedProps}>
          {value}
        </span>
      );
    }

    if (elementType === 'div') {
      return (
        <div
          ref={(element) => { this.textControl = element; }}
          className={classNames(
            textControlClassNames,
            styles.static,
          )}
          {...sharedProps}>
          {value}
        </div>
      );
    }

    if (mask) {
      return (
        <InputMask
          ref={(element) => { this.textControl = element; }}
          alwaysShowMask={alwaysShowMask}
          className={classNames(
            textControlClassNames,
            styles.input,
          )}
          mask={mask}
          maskChar={maskChar}
          formatChars={formatChars}
          {...sharedProps}
          {...inputProps} />
      );
    }

    return (
      <input
        ref={(element) => { this.textControl = element; }}
        className={classNames(
          textControlClassNames,
          styles.input,
        )}
        {...sharedProps}
        {...inputProps} />
    );
  }

  private handleChange = (event: any) => {
    const { onChange } = this.props;
    const { name, value } = event.target;

    if (onChange) {
      onChange({
        name,
        value,
      });
    }
  }
}

export default TextControl;

export const TextControlStub = () => {
  return (
    <div className={styles.textControlStub} />
  );
};
