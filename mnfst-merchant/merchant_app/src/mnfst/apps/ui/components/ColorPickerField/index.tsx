import React from 'react';
import classNames from 'classnames';
import TextField from 'apps/ui/components/TextField';
import { validateHex } from 'utils/text';
import { IFormTarget, IClassNames } from 'interfaces';
import styles from './style.css';

function isColorPickerSupported() {
  try {
    const a = document.createElement('input');
    a.type = 'color';
    return a.type === 'color' && typeof a.selectionStart !== 'number';
  }
  catch (e) {
    return false;
  }
}

interface IColorPickerProps {
  classNamesList?: IClassNames;
  className?: string;
  disabled?: boolean;
  hasErrors?: boolean;
  label?: any;
  name?: string;
  onInit?: (element: any) => void;
  onChange: ({}) => void;
  value: string;
}

interface IColorPickerState {
  inputColor: string;
  sampleColor: string;
}

class ColorPickerField extends React.Component<IColorPickerProps, IColorPickerState> {
  public static defaultProps = {
    label: '',
    value: '',
  };

  public state = {
    inputColor: this.props.value || '',
    sampleColor: this.props.value || '',
  };

  public componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ inputColor: this.props.value });
    }
  }

  public render() {
    const { className, classNamesList, disabled, hasErrors, name, label } = this.props;
    const { inputColor, sampleColor } = this.state;

    const sampleColorStyle = {
      backgroundColor: sampleColor || 'transparent',
    };

    return (
      <div className={classNames(
        styles.colorPickerField,
        className,
      )}>
        <TextField
          disabled={disabled}
          dockTo="right"
          hasErrors={hasErrors}
          label={label}
          name={name}
          onInit={this.handleInit}
          onChange={this.handleColorChange}
          value={inputColor} />
        {isColorPickerSupported()
          ? (
            <input
              className={classNames(
                styles.colorSample,
                disabled && styles.isDisabled,
                classNamesList && classNamesList.color,
              )}
              disabled={disabled}
              type="color"
              onChange={this.handleColorPick}
              value={inputColor} />
          )
          : (
            <div
              className={styles.colorSample}
              style={sampleColorStyle} />
          )
        }
      </div>
    );
  }

  private handleInit = (target: IFormTarget) => {
    const { name, value, onInit } = this.props;
    if (onInit) {
      onInit({
        name,
        value,
        children: {
          input: target && target.children && target.children.input,
        },
      });
    }
  }

  private handleColorPick = (event: any) => {
    const { name } = this.props;
    const { value } = event.target;
    this.setState({
      inputColor: value,
    });

    const { onChange } = this.props;
    if (onChange) {
      onChange({
        name,
        value,
      });
    }
  }

  private handleColorChange = (target: any) => {
    const color = target.value;
    const hexColor = color[0] === '#' ? color : `#${color}`;

    if (isColorPickerSupported()) {
      this.setState({
        inputColor: hexColor,
      });
    }
    else {
      const isValid = validateHex(hexColor).isValid;
      this.setState({
        inputColor: hexColor,
        sampleColor: isValid ? hexColor : '',
      });
    }

    const { onChange, name } = this.props;
    if (onChange) {
      onChange({
        name,
        value: color,
      });
    }
  }
}

export default ColorPickerField;
