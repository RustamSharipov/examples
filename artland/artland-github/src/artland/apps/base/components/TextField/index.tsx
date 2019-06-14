import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

interface ITextFieldInputElement {
  name: string;
  value: string;
}

interface ITextFieldProps {
  autoFocus?: boolean;
  className?: string;
  disabled?: boolean;
  dockTo?: string;
  isTextArea?: boolean;
  name: string;
  onChange: (element: ITextFieldInputElement) => void;
  onKeyPress?: (event) => void;
  placeholder?: string;
  readOnly?: boolean;
  rows?: number;
  type: string | undefined;
  value: string;
}

interface ITextFieldState {
  hasFocus: boolean;
}

const dockVariantsClassNames = {
  bottom: styles.dockBottom,
  left: styles.dockLeft,
  right: styles.dockRight,
  top: styles.dockTop,
};

export default class TextField extends React.Component<ITextFieldProps, ITextFieldState> {
  public static defaultProps = {
    disabled: false,
    isTextArea: false,
    name: '',
    readOnly: false,
    type: 'text',
    value: '',
  };

  public state = {
    hasFocus: false,
  };

  public render() {
    const {
      autoFocus, className, disabled, dockTo, isTextArea, name, placeholder, rows, type, readOnly, value,
    } = this.props;
    const dockVariantClassName = dockTo && dockVariantsClassNames[dockTo];
    const { hasFocus } = this.state;
    const componentProps = {
      autoFocus,
      disabled,
      name,
      placeholder,
      readOnly,
      value,
      className: styles.input,
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onKeyPress: this.handleKeyPress,
    }

    return (
      <div
        className={classNames(
          styles.textField,
          dockVariantClassName,
          className,
          {
            [styles.hasFocus]: hasFocus,
            [styles.textarea]: isTextArea,
          },
        )}>
        {isTextArea
          ? (
            <textarea
              {...componentProps}
              rows={rows} />
          )
          : (
            <input
              {...componentProps}
              type={type} />
          )
        }
        
      </div>
    );
  }

  private handleChange = (event) => {
    const { onChange } = this.props;
    const { name, value } = event.target;

    if (onChange) {
      onChange({ name, value });
    }
  }

  private handleFocus = () => {
    this.setState({ hasFocus: true });
  }

  private handleBlur = () => {
    this.setState({ hasFocus: false });
  }

  private handleKeyPress = (event) => {
    const { onKeyPress } = this.props;

    if (onKeyPress) {
      onKeyPress(event);
    }
  }
}
