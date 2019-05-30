import React from 'react';
import classNames from 'classnames';
import enhanceWithClickOutside from 'react-click-outside';
import ChevronIcon from 'apps/ui/components/icons/ChevronIcon';
import ControlIcon from 'apps/ui/components/ControlIcon';
import { DropdownListItems, DropdownListItem } from 'apps/ui/components/DropdownList';
import FieldLabel from 'apps/ui/components/FieldLabel';
import { FlexLayout } from 'apps/ui/components/FlexLayout';
import TextControl from 'apps/ui/components/TextControl';
import TextInputContainer from 'apps/ui/components/TextInputContainer';
import ValidationStatus from 'apps/ui/components/ValidationStatus';
import { IElementEventTarget, IClassNamesMap } from 'apps/ui/interfaces/elementNode';
import { Regions } from 'apps/ui/utils/regions';
import styles from './style.css';

const DEFAULT_PHONE_CODE = 44;

interface IPhoneWithCountryCodeFieldClassNames {
  fieldLabel: string;
  phoneCode: string;
  phoneNumber: string;
  textInputContainer: string;
}

interface IPhoneWithCountryCodeFieldProps {
  autoFocus?: boolean;
  className?: string;
  classNamesMap?: IClassNamesMap<IPhoneWithCountryCodeFieldClassNames>;
  disabled?: boolean;
  dockTo?: string;
  errors: string[] | null;
  formatChars?: any;
  hasErrors?: boolean;
  iconAfter?: React.ReactNode;
  iconBefore?: React.ReactNode;
  label?: any;
  mask?: string | undefined;
  maxLength?: number;
  name: string;
  onChange: (elementEventTarget: IElementEventTarget) => void;
  onClick?: (elementEventTarget: IElementEventTarget) => void;
  onFocus?: (elementEventTarget: IElementEventTarget) => void;
  onBlur?: (elementEventTarget: IElementEventTarget) => void;
  phoneCode?: number;
  readonly?: boolean;
  tooltip?: string;
  type?: string | undefined;
}

interface IPhoneWithCountryCodeFieldState {
  hasFocus: boolean;
  isHover: boolean;
  isPhoneCodesOpen: boolean;
  phoneCode?: number;
  phoneNumber: number | null;
}

const countryCodesList = Regions
  .getAllCountries()
  .map(country => ({
    name: country.name,
    value: country.callingCode[0],
  }))
  .filter(country => country.value);

class PhoneWithCountryCodeField extends React.Component
  <IPhoneWithCountryCodeFieldProps, IPhoneWithCountryCodeFieldState> {
  public static defaultProps = {
    className: '',
    classNamesMap: {},
    disabled: false,
    errors: null,
    hasErrors: false,
    name: '',
    readonly: false,
    type: 'text',
  };

  public phoneNumberNode: HTMLInputElement;

  public state = {
    hasFocus: false,
    isHover: false,
    isPhoneCodesOpen: false,
    phoneNumber: null,
    phoneCode: this.props.phoneCode || DEFAULT_PHONE_CODE,
  };

  public handleClickOutside = () => {
    this.setState({
      isPhoneCodesOpen: false,
    });
  }

  public componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize);
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  public render() {
    const {
      autoFocus, className, classNamesMap = {}, disabled, dockTo, errors, label, mask, maxLength, name,
      type, readonly,
    } = this.props;
    const { hasFocus, isHover, isPhoneCodesOpen, phoneCode, phoneNumber } = this.state;
    const currentCountry = countryCodesList.filter(item => String(item.value) === String(phoneCode))[0] || {};
    const hasErrors = this.props.hasErrors || errors && errors.length > 0 || false;
    const notEmptyValue = phoneNumber && !!(typeof phoneNumber === 'string' && String(phoneNumber).length > 0) ||
      typeof phoneNumber === 'number' || !!mask && hasFocus;

    return (
      <FlexLayout
        className={className}
        direction="column">
        <TextInputContainer
          className={classNamesMap.textInputContainer}
          disabled={disabled}
          dockTo={dockTo}
          hasErrors={hasErrors}
          hasFocus={hasFocus}
          isHover={isHover}>
          <div className={classNames(
            styles.phoneCode,
            classNamesMap.phoneCode,
          )}>
            <DropdownListItems isOpened={isPhoneCodesOpen}>
              {countryCodesList.map((item, index) => (
                <DropdownListItem
                  key={index}
                  className={classNames(
                    styles.phoneNumbersListItem,
                    item.value === phoneCode && styles.isSelected,
                  )}
                  isSelected={item.value === phoneCode}
                  name={item.name}
                  onClick={this.handlePhoneCodeSelect}
                  value={item.value}>
                  <div className={styles.country}>
                    <div className={styles.countryName}>
                      {item.name}
                    </div>
                    <div className={styles.countryCallingCode}>
                      +{item.value}
                    </div>
                  </div>
                </DropdownListItem>
              ))}
            </DropdownListItems>
            <div
              className={styles.phoneCodeControl}
              onClick={this.handlePhoneCodeClick}>
              <TextControl
                className={styles.textControl}
                disabled={disabled}
                elementType="div"
                notEmptyValue={notEmptyValue}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                value={`+${currentCountry.value}`} />
              <ControlIcon className={styles.controlIcon}>
                <ChevronIcon
                  className={styles.controlIconImage}
                  direction={isPhoneCodesOpen ? 'top' : 'bottom'} />
              </ControlIcon>
            </div>
          </div>
          <div className={classNames(
            styles.phoneNumber,
            classNamesMap.phoneNumber,
          )}>
            <TextControl
              autoFocus={autoFocus}
              disabled={disabled}
              maxLength={maxLength}
              name={name}
              notEmptyValue={notEmptyValue}
              onInit={this.handlePhoneNumberNodeRef}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onChange={this.handlePhoneNumberChange}
              onClick={this.collapseDropdown}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
              readonly={readonly}
              type={type}
              value={phoneNumber || ''} />
            {label && (
              <FieldLabel
                className={classNames(
                  styles.fieldLabel,
                  classNamesMap.fieldLabel,
                )}
                notEmptyValue={notEmptyValue}>
                {label}
              </FieldLabel>
            )}
          </div>
        </TextInputContainer>
        <ValidationStatus
          message={errors}
          type="error" />
      </FlexLayout>
    );
  }

  private handleWindowResize = () => {
    this.setState({
      isPhoneCodesOpen: false,
    });
  }

  private handlePhoneNumberNodeRef = (node: HTMLInputElement) => {
    this.phoneNumberNode = node;
  }

  private handlePhoneCodeClick = () => {
    this.setState(state => ({
      isPhoneCodesOpen: !state.isPhoneCodesOpen,
    }));
  }

  private handlePhoneCodeSelect = (elementEventTarget: IElementEventTarget) => {
    const { value } = elementEventTarget;

    this.setState(
      {
        isPhoneCodesOpen: false,
        phoneCode: value,
      },
      () => {
        this.handlePhoneChange();
      },
    );
  }

  private handlePhoneNumberChange = (elementEventTarget: IElementEventTarget) => {
    const { value: phoneNumber } = elementEventTarget;

    if (/^[0-9]{0,20}$/i.test(phoneNumber) || phoneNumber === '') {
      this.setState(
        { phoneNumber },
        () => {
          this.handlePhoneChange();
        },
      );
    }
  }

  private handlePhoneChange = () => {
    const { name, onChange } = this.props;
    const { phoneCode, phoneNumber } = this.state;

    if (onChange) {
      onChange({
        name,
        value: [phoneCode, phoneNumber],
      });
    }
  }

  private handleMouseEnter = () => {
    this.setState({
      isHover: true,
    });
  }

  private handleMouseLeave = () => {
    this.setState({
      isHover: false,
    });
  }

  private handleFocus = (elementEventTarget: IElementEventTarget) => {
    const { name, value } = elementEventTarget;
    const { onFocus } = this.props;

    this.setState({
      hasFocus: true,
    });

    if (onFocus) {
      onFocus({
        name,
        value,
      });
    }
  }

  private handleBlur = () => {
    this.setState({
      hasFocus: false,
      isPhoneCodesOpen: false,
    });
  }

  private collapseDropdown = () => {
    this.setState({
      isPhoneCodesOpen: false,
    });
  }
}

export default enhanceWithClickOutside(PhoneWithCountryCodeField);
