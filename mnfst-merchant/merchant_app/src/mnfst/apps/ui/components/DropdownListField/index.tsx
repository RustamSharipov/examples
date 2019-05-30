import React from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import ChevronIcon from 'apps/ui/components/icons/ChevronIcon';
import ControlIcon from 'apps/ui/components/ControlIcon';
import DropdownList from 'apps/ui/components/DropdownList';
import FieldLabel from 'apps/ui/components/FieldLabel';
import { FlexLayout } from 'apps/ui/components/FlexLayout';
import TextControl from 'apps/ui/components/TextControl';
import TextInputContainer from 'apps/ui/components/TextInputContainer';
import ValidationStatus from 'apps/ui/components/ValidationStatus';
import { IFormTarget, IClassNames } from 'interfaces';
import styles from './style.css';

interface IDropdownListItem {
  [name: string]: string | number;
}

interface IDropdownListFieldProps {
  className?: string;
  classNamesList?: IClassNames;
  disabled: boolean;
  dockTo?: string;
  errors: string[] | null;
  forceDropdownListPosition?: string;
  items: IDropdownListItem[];
  label?: any;
  name?: string;
  onInit?: (element: any) => void;
  onChange: (event: {}) => void;
  value: any;
}

interface IDropdownListFieldState {
  hasFocus: boolean;
  isDisplayDropdownList: boolean;
  isHover: boolean;
}

class DropdownListField extends React.Component<IDropdownListFieldProps, IDropdownListFieldState> {
  public static defaultProps = {
    className: '',
    classNamesList: {},
    disabled: false,
    dockTo: null,
    errors: null,
    name: '',
    type: 'text',
    value: '',
  };

  public state = {
    hasFocus: false,
    isDisplayDropdownList: false,
    isHover: false,
  };

  public handleClickOutside = () => {
    this.collapseDropDownList();
  }

  public render() {
    const {
      className, classNamesList, disabled, dockTo, errors, forceDropdownListPosition, items, label, name, value,
    } = this.props;
    const { hasFocus, isDisplayDropdownList, isHover } = this.state;
    const currentItem = items.filter(item => String(item.value) === String(value))[0] || {};
    const hasErrors = errors && errors.length > 0 || false;
    const notEmptyValue = String(value).length > 0 && Object.keys(currentItem).length > 0;

    return (
      <FlexLayout
        className={className}
        direction="column">
        <TextInputContainer
          disabled={disabled}
          dockTo={dockTo}
          hasErrors={hasErrors}
          hasFocus={hasFocus}
          isHover={isHover}>
          <DropdownList
            classNamesList={classNamesList}
            disabled={disabled}
            forceDropdownListPosition={forceDropdownListPosition}
            isOpened={isDisplayDropdownList}
            items={items}
            name={name}
            onSelect={this.handleSelect}
            value={value} />
          <div
            className={styles.control}
            onClick={this.handleClick}>
            <TextControl
              className={classNamesList && classNamesList.control}
              disabled={disabled}
              elementType="div"
              notEmptyValue={notEmptyValue}
              onInit={this.handleInit}
              onClick={this.collapseDropDownList}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
              value={currentItem.name}
              withIconAfter={true} />
            <ControlIcon appendTo="after">
              <ChevronIcon direction={isDisplayDropdownList ? 'top' : 'down'} />
            </ControlIcon>
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

  private handleClick = () => {
    if (!this.props.disabled) {
      this.setState(prevState => ({
        hasFocus: true,
        isDisplayDropdownList: !prevState.isDisplayDropdownList,
      }));
    }
  }

  private handleSelect = (target: IFormTarget) => {
    const { name } = this.props;
    const value = target.value !== String(target.value)
      ? +target.value
      : target.value;

    this.setState({
      isDisplayDropdownList: false,
    });

    const { onChange } = this.props;
    if (onChange) {
      onChange({
        name,
        value,
      });
    }
  }

  private collapseDropDownList = () => {
    this.setState({
      hasFocus: false,
      isDisplayDropdownList: false,
    });
  }
}

export default enhanceWithClickOutside(DropdownListField);
