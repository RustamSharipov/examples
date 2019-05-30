import React from 'react';
import classNames from 'classnames';
import ControlIcon from 'apps/ui/components/ControlIcon';
import FieldLabel from 'apps/ui/components/FieldLabel';
import { FlexLayout } from 'apps/ui/components/FlexLayout';
import TextControl from 'apps/ui/components/TextControl';
import TextInputContainer from 'apps/ui/components/TextInputContainer';
import Tooltip from 'apps/ui/components/Tooltip';
import ValidationStatus from 'apps/ui/components/ValidationStatus';
import { IFormTarget, IClassNames } from 'interfaces';

interface ITextFieldProps {
  alwaysShowMask?: boolean;
  autoFocus?: boolean;
  childAfter?: React.ReactNode;
  className?: string;
  classNamesList?: IClassNames;
  disabled: boolean;
  dockTo?: string;
  errors: string[] | null;
  formatChars?: any;
  hasErrors: boolean;
  iconAfter?: React.ReactNode;
  iconBefore?: React.ReactNode;
  isRequired?: boolean;
  label?: any;
  mask?: string | undefined;
  maskChar?: string;
  maxLength?: number;
  min?: string | number;
  name: string;
  onInit?: (element: any) => void;
  onChange: (formTarget: IFormTarget) => void;
  onClick?: (event: {}) => void;
  onFocus?: (event: {}) => void;
  onBlur?: (event: {}) => void;
  readonly: boolean;
  tooltip?: string;
  type: string | undefined;
  value: string | number;
  placeholder?: string;
}

interface ITextFieldState {
  hasFocus: boolean;
  isHover: boolean;
}

interface ITextFieldTarget {
  name: string;
  value: string;
}

class TextField extends React.Component<ITextFieldProps, ITextFieldState> {
  public static defaultProps = {
    className: '',
    classNamesList: {},
    disabled: false,
    errors: null,
    hasErrors: false,
    name: '',
    readonly: false,
    type: 'text',
    value: '',
  };

  public state = {
    hasFocus: false,
    isHover: false,
  };

  public render() {
    const {
      alwaysShowMask, autoFocus, childAfter, className, classNamesList, disabled, dockTo, errors, formatChars,
      iconAfter, iconBefore, label, mask, maskChar, maxLength, min, name, onClick, type, readonly, tooltip, value,
      placeholder,
    } = this.props;
    const { hasFocus, isHover } = this.state;
    const hasErrors = this.props.hasErrors || errors && errors.length > 0 || false;
    const notEmptyValue = !!(typeof value === 'string' && value.length > 0) || typeof value === 'number'
      || (!!mask && hasFocus) || alwaysShowMask;

    return (
      <FlexLayout
        className={classNamesList && classNamesList.root}
        direction="column">
        <TextInputContainer
          className={className}
          disabled={disabled}
          dockTo={dockTo}
          hasErrors={hasErrors}
          hasFocus={hasFocus}
          isHover={isHover}>
          <TextControl
            alwaysShowMask={alwaysShowMask}
            autoFocus={autoFocus}
            className={classNames(
              classNamesList && classNamesList.input,
            )}
            disabled={disabled}
            mask={mask}
            maskChar={maskChar}
            formatChars={formatChars}
            maxLength={maxLength}
            notEmptyValue={notEmptyValue}
            onInit={this.handleInit}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onClick={onClick && onClick}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            readonly={readonly}
            type={type}
            min={min}
            name={name}
            value={value}
            placeholder={placeholder}
            withIconAfter={!!iconAfter}
            withTooltip={!!tooltip} />
          {label && (
            <FieldLabel notEmptyValue={notEmptyValue}>
              {label}
            </FieldLabel>
          )}
          {iconBefore && (
            <ControlIcon appendTo="before">
              {iconBefore}
            </ControlIcon>
          )}
          {(iconAfter && !tooltip) && (
            <ControlIcon appendTo="after">
              {iconAfter}
            </ControlIcon>
          )}
          {childAfter && (
            <ControlIcon
              appendTo="after"
              hasPointerEvents={true}>
              {childAfter}
            </ControlIcon>
          )}
          {tooltip && (
            <ControlIcon
              appendTo="after"
              hasPointerEvents={true}>
              <Tooltip content={tooltip} />
            </ControlIcon>
          )}
        </TextInputContainer>
        <ValidationStatus
          message={errors}
          type="error" />
      </FlexLayout>
    );
  }

  private handleInit = (element: HTMLInputElement) => {
    const { name, value, onInit } = this.props;
    if (onInit) {
      onInit({
        name,
        value,
        children: {
          input: element,
        },
      });
    }
  }

  private handleMouseEnter = () => {
    this.setState({ isHover: true });
  }

  private handleMouseLeave = () => {
    this.setState({ isHover: false });
  }

  private handleChange = (target: IFormTarget) => {
    const { onChange } = this.props;
    const { name, value } = target;
    const data: ITextFieldTarget = {
      name,
      value,
    };

    if (onChange) {
      onChange(data);
    }
  }

  private handleFocus = (target: IFormTarget) => {
    const { name, value } = target;
    const { onFocus } = this.props;
    const data: ITextFieldTarget = {
      name,
      value,
    };

    this.setState({ hasFocus: true });

    if (onFocus) {
      onFocus(data);
    }
  }

  private handleBlur = (target: IFormTarget) => {
    const { name, value } = target;
    const { onBlur } = this.props;
    const data: ITextFieldTarget = {
      name,
      value,
    };

    this.setState({ hasFocus: false });

    if (onBlur) {
      onBlur(data);
    }
  }
}

export default TextField;
