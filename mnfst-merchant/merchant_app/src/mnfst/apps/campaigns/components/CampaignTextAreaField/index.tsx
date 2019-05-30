import React from 'react';
import classNames from 'classnames';
import ControlIcon from 'apps/ui/components/ControlIcon';
import { FlexLayout } from 'apps/ui/components/FlexLayout';
import ValidationStatus from 'apps/ui/components/ValidationStatus';
import { getLocalString } from 'utils/localization';
import { IClassNames } from 'interfaces';
import styles from './style.css';

interface ICampaignTextAreaFieldProps {
  autoFocus?: boolean;
  className?: string;
  classNamesList?: IClassNames;
  disabled: boolean;
  errors?: string[] | null;
  iconBefore?: React.ReactNode;
  isRequired?: boolean;
  maxLength?: number;
  name: string;
  onRef?: (node: any) => void;
  onChange: (event: {}) => void;
  onFocus?: (event: {}) => void;
  onBlur?: (event: {}) => void;
  value: string;
}

interface ICampaignTextAreaFieldState {
  hasFocus: boolean;
  isHover: boolean;
}

class CampaignTextAreaField extends React.Component<ICampaignTextAreaFieldProps, ICampaignTextAreaFieldState> {
  public static defaultProps = {
    className: '',
    disabled: false,
    errors: null,
    maxLength: null,
    name: '',
    type: 'text',
    value: '',
  };

  public maxTextSize: number;
  public textAreaNode: HTMLTextAreaElement;

  public state = {
    hasFocus: false,
    isHover: false,
  };

  public render() {
    const { autoFocus, className, classNamesList, disabled, errors, iconBefore, maxLength, name, value } = this.props;
    const charsCount = value ? value.length : 0;

    return (
      <FlexLayout
        className={className}
        direction="column">
        <div className={styles.campaignTextAreaField}>
          {iconBefore && (
            <ControlIcon appendTo="before">
              {iconBefore}
            </ControlIcon>
          )}
          <textarea
            ref={this.handleRef}
            autoFocus={autoFocus}
            className={classNames(
              styles.input,
              classNamesList && classNamesList.input,
              disabled && styles.isDisabled,
            )}
            disabled={disabled}
            name={name}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            placeholder={!disabled && getLocalString('pages.campaigns.create.texts.startTyping') || undefined}
            rows={3}
            value={value || ''} />
        </div>
        {charsCount === 0 && (
          <div className={styles.charsCount}>
            &nbsp;
          </div>
        )}
        {(!disabled && !errors && charsCount > 0 && (maxLength && charsCount <= maxLength)) && (
          <div className={styles.charsCount}>
            {maxLength - charsCount} {maxLength - charsCount !== 1 ? 'characters' : 'character'} left
          </div>
        )}
        {(!errors && maxLength && charsCount > maxLength) && (
          <div className={styles.charsError}>
            <span className={styles.charsErrorText}>
              {`
                ${charsCount - maxLength} more ${charsCount - maxLength > 1 ? 'characters' : 'character'}.
                ${getLocalString('pages.campaigns.create.texts.textLengthLimitReach')}
              `}
            </span>
          </div>
        )}
        {errors && (
          <ValidationStatus
            message={errors}
            type="error" />
        )}
      </FlexLayout>
    );
  }

  private handleRef = (node: HTMLTextAreaElement) => {
    if (node) {
      const { name, value, onRef } = this.props;
      const { fontSize } = getComputedStyle(node);

      this.textAreaNode = node;
      this.maxTextSize = fontSize ? parseInt(fontSize, 10) : 12;

      if (onRef) {
        onRef({
          name,
          value,
          children: {
            input: node,
          },
        });
      }
    }
  }

  private handleChange = (event: any) => {
    const { onChange } = this.props;
    const { name, value } = event.target;

    if (onChange) {
      onChange({ name, value });
    }
  }

  private handleFocus = (event: any) => {
    const { name, value } = event.target;
    const { onFocus } = this.props;
    const data = {
      name,
      value,
    };

    this.setState({ hasFocus: true });

    if (onFocus) {
      onFocus(data);
    }
  }

  private handleBlur = (event: any) => {
    const { name, value } = event.target;
    const { onBlur } = this.props;
    const data = {
      name,
      value,
    };

    this.setState({ hasFocus: false });

    if (onBlur) {
      onBlur(data);
    }
  }
}

export default CampaignTextAreaField;
