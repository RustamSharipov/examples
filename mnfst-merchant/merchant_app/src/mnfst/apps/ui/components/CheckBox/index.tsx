import React from 'react';
import classNames from 'classnames';
import { IClassNames, IFormTarget } from 'interfaces';
import styles from './style.css';

const themesClassNames = {
  white: styles.whiteTheme,
};

interface ICheckBoxProps {
  className?: string;
  classNamesList?: IClassNames;
  description?: string;
  disabled?: boolean;
  isChecked: boolean;
  label?: string | React.ReactNode;
  name?: string;
  onChange: (formTarget: IFormTarget) => void;
  theme?: string;
  value?: string | number;
}

class CheckBox extends React.Component<ICheckBoxProps> {
  public static defaultProps = {
    disabled: false,
    name: '',
    isChecked: false,
  };

  public render() {
    const { className, classNamesList, description, disabled, isChecked, label, name, theme } = this.props;
    const themeClassName = theme && themesClassNames[theme];

    return (
      <div className={classNames(
        styles.checkBox,
        className,
      )}>
        <label className={classNames(
          styles.container,
          disabled && styles.isDisabled,
          classNamesList && classNamesList.label,
        )}>
          <input
            className={styles.input}
            disabled={disabled}
            type="checkbox"
            name={name}
            checked={isChecked}
            onChange={this.handleChange} />
          <span className={styles.inner}>
            <span className={classNames(
              styles.control,
              themeClassName,
              isChecked && styles.isChecked,
              disabled && styles.isDisabled,
            )}>
              <svg
                viewBox="0 0 12 12"
                width="12"
                height="12"
                xmlns="http://www.w3.org/2000/svg"
                className={classNames(
                  styles.controlImage,
                  classNamesList && classNamesList.controlTick,
                  isChecked && styles.isChecked,
                )}>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M 0 3.85618L 1.23847 2.59739L 3.09924 4.48868L 7.51547 0L 8.75395 1.25879L 3.1054 7L 0 3.85618Z"
                  transform="translate(1.5 2)" />
              </svg>
            </span>
            {label && (
              <span className={styles.label}>
                {label}
              </span>
            )}
          </span>
        </label>
        {description && (
          <div className={styles.description}>
            {description}
          </div>
        )}
      </div>
    );
  }

  private handleChange = (event: any) => {
    const { onChange } = this.props;
    const { name, checked: value } = event.target;

    if (onChange) {
      onChange({
        name,
        value,
      });
    }
  }
}

export default CheckBox;
