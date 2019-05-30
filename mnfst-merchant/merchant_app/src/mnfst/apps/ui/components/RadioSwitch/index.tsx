import React from 'react';
import classNames from 'classnames';
import Button from 'apps/ui/components/Button';
import ValidationStatus from 'apps/ui/components/ValidationStatus';
import styles from './style.css';

interface IRadioSwitchProps {
  className?: string;
  disabled?: boolean;
  errors?: string[] | null;
  items: any[];
  name: string;
  onChange: (event: {}) => void;
  value: any;
}

class RadioSwitch extends React.Component<IRadioSwitchProps> {
  public static defaultProps = {
    disabled: false,
    name: '',
  };

  public render() {
    const { className, disabled, errors, items, name, value } = this.props;
    return (
      <div className={styles.radioSwitch}>
        {items.map((item, index, arr) => {
          const isChecked = String(item.value) === String(value);
          const theme = isChecked ? 'violet' : 'white';
          let dockTo = 'left-right';

          if (index === 0) {
            dockTo = 'right';
          }
          if (index === arr.length - 1) {
            dockTo = 'left';
          }

          return (
            <label
              key={index}
              className={classNames(
                styles.button,
                className,
              )}>
              <input
                className={styles.input}
                disabled={disabled}
                type="radio"
                name={name}
                value={item.value}
                checked={isChecked}
                onChange={this.handleChange} />
              <Button
                disabled={disabled}
                dockTo={dockTo}
                elementType="span"
                theme={theme}>
                {item.name}
              </Button>
            </label>
          );
        })}
        <ValidationStatus
          message={errors}
          type="error" />
      </div>
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

export default RadioSwitch;
