import React from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import classNames from 'classnames';
import DropdownList from 'apps/ui/components/DropdownList';
import FieldLabel from 'apps/ui/components/FieldLabel';
import { FlexLayout } from 'apps/ui/components/FlexLayout';
import TextControl from 'apps/ui/components/TextControl';
import TextInputContainer from 'apps/ui/components/TextInputContainer';
import ValidationStatus from 'apps/ui/components/ValidationStatus';
import { IFormField, IFormTarget, IClassNames } from 'interfaces';
import styles from './style.css';

interface IDropdownSuggestionsFieldProps {
  className?: string;
  classNamesList?: IClassNames;
  disabled: boolean;
  dockTo?: string;
  errors: string[] | null;
  // tslint:disable
  items: Array<IFormField<string | number | boolean>>;
  // tslint:enable
  label?: any;
  name?: string;
  onBlur: () => void;
  onChange: (query: string) => void;
  onFocus: ({ hasFocus: boolean }) => void;
  onSelect: (event: any) => void;
  value: string;
}

interface IDropdownSuggestionsFieldState {
  hasFocus: boolean;
  isDropdownListDisplay: boolean;
  isHover: boolean;
  selectedOptionsList: any[];
}

class DropdownSuggestionsField extends React.Component<IDropdownSuggestionsFieldProps, IDropdownSuggestionsFieldState> {
  public static defaultProps = {
    className: '',
    classNamesList: {},
    disabled: false,
    errors: null,
    name: '',
    type: 'text',
    value: '',
  };

  public textControl: any;

  public state = {
    isDropdownListDisplay: false,
    hasFocus: false,
    isHover: false,
    selectedOptionsList: this.props.value
      ? this.props.items.filter(item => this.props.value.includes(item.value))
      : [],
  };

  public render() {
    const { className, classNamesList, disabled, dockTo, errors, label, name, value, items } = this.props;
    const { isDropdownListDisplay, isHover, hasFocus } = this.state;
    const hasErrors = errors && errors.length > 0 || false;
    const notEmptyValue = typeof value === 'string' && value.length > 0;

    return (
      <FlexLayout direction="column">
        <TextInputContainer
          className={classNames(
            styles.dropdownSuggestionsList,
            className,
          )}
          disabled={disabled}
          dockTo={dockTo}
          hasErrors={hasErrors}
          hasFocus={hasFocus}
          isHover={isHover}
          onBlur={this.handleClickOutside}>
          <DropdownList
            classNamesList={{
              item: classNamesList && classNamesList.dropdownItem,
              items: classNamesList && classNamesList.dropdownItems,
            }}
            disabled={disabled}
            isOpened={isDropdownListDisplay}
            items={items}
            name={name}
            onSelect={this.handleSelect}
            value={value} />
          <div className={styles.control}>
            <TextControl
              className={classNamesList && classNamesList.control}
              disabled={disabled}
              notEmptyValue={notEmptyValue}
              onChange={this.handleQuery}
              onInit={this.handleTextControlInit}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
              onKeyPress={this.handleKeyPress}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
              value={value} />
          </div>
          {label && (
            <FieldLabel notEmptyValue={notEmptyValue}>
              {label}
            </FieldLabel>
          )}
        </TextInputContainer>
        <ValidationStatus
          message={errors}
          type="error" />
      </FlexLayout>
    );
  }

  private handleMouseEnter = () => {
    this.setState({ isHover: true });
  }

  private handleMouseLeave = () => {
    this.setState({ isHover: false });
  }

  private handleFocus = () => {
    const { items, onFocus } = this.props;
    const { hasFocus } = this.state;

    if (items.length > 0) {
      this.setState({ isDropdownListDisplay: true });
    }

    this.setState({ hasFocus: true });

    if (onFocus) {
      onFocus({ hasFocus });
    }
  }

  private handleBlur = () => {
    const { onBlur } = this.props;
    if (onBlur) {
      onBlur();
    }
  }

  private handleClickOutside = () => {
    this.setState({
      hasFocus: false,
      isDropdownListDisplay: false,
    });
  }

  private handleKeyPress(event) {
    if (event.charCode === 13) {
      event.preventDefault();
    }
  }

  private handleQuery = (target: IFormTarget) => {
    const { value } = target;
    const { onChange } = this.props;

    if (onChange) {
      onChange(value);
    }
    this.setState({
      isDropdownListDisplay: true,
    });
  }

  private handleTextControlInit = (node: any) => {
    this.textControl = node;
  }

  private handleSelect = (target: any) => {
    const { onSelect } = this.props;
    this.setState({
      isDropdownListDisplay: false,
    });

    if (onSelect) {
      onSelect(target);
    }
  }
}

export default enhanceWithClickOutside(DropdownSuggestionsField);
