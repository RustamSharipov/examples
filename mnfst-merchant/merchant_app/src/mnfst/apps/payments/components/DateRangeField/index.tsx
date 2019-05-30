import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import CalendarIcon from 'apps/ui/components/icons/CalendarIcon';
import DateRangePickerControl from 'apps/ui/components/DateRangePickerControl';
import { IFormTarget } from 'interfaces';
import styles from './style.css';
import ModalPopup from 'apps/ui/components/ModalPopup';
import { FlexLayout } from 'apps/ui/components/FlexLayout';
import TextInputContainer from 'apps/ui/components/TextInputContainer';
import TextControl from 'apps/ui/components/TextControl';
import ControlIcon from 'apps/ui/components/ControlIcon';

interface IDateRangeFieldProps {
  className?: string;
  dateFrom: string;
  dateTo: string;
  disabled: boolean;
  name: string;
  onInit?: (arg: any) => void;
  onChange: (event: {}) => void;
  readonly: boolean;
  type: string;
}

interface IDateRangeFieldState {
  isDatePickerDisplay: boolean;
  hasFocus: boolean;
  isHover: boolean;
}

class DateRangeField extends React.Component<IDateRangeFieldProps, IDateRangeFieldState> {
  public static defaultProps = {
    className: '',
    disabled: false,
    errors: null,
    formattedDate: '',
    name: '',
    readonly: false,
    type: 'text',
  };

  public textField: React.ReactNode;

  public state = {
    isDatePickerDisplay: false,
    hasFocus: false,
    isHover: false,
  };

  public render() {
    const { className, dateFrom, dateTo, disabled, name, onChange, onInit } = this.props;
    const { hasFocus, isDatePickerDisplay, isHover } = this.state;
    const currentYear = moment().format('YYYY');
    const fromDateYear = moment(dateFrom).format('YYYY');
    const toDateYear = moment(dateTo).format('YYYY');
    const datesRange = [
      moment(dateFrom).format(fromDateYear !== toDateYear ? 'D MMM YYYY' : 'D MMM'),
      moment(dateTo).format(toDateYear !== currentYear || toDateYear !== fromDateYear ? 'D MMM YYYY' : 'D MMM'),
    ].join(' – ');

    return (
      <div className={classNames(
        styles.dateRangeField,
        className,
      )}>
        <FlexLayout direction="column">
          <TextInputContainer
            disabled={disabled}
            hasFocus={hasFocus}
            isHover={isHover}>
            <TextControl
              className={styles.input}
              disabled={disabled}
              name={name}
              onInit={onInit && onInit}
              onChange={onChange && onChange}
              onClick={this.displayDatePicker}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
              readonly={true}
              value={datesRange}
              withIconAfter={true} />
            <ControlIcon
              appendTo="after"
              className={styles.icon}>
              <CalendarIcon />
            </ControlIcon>
          </TextInputContainer>
        </FlexLayout>
        <ModalPopup
          isOpen={isDatePickerDisplay}
          onClose={this.hideDatePicker}>
          <DateRangePickerControl
            onSelect={this.handleDateSelect}
            startDate={dateFrom}
            endDate={dateTo} />
        </ModalPopup>
      </div>
    );
  }

  private handleMouseEnter = () => {
    this.setState({ isHover: true });
  }

  private handleMouseLeave = () => {
    this.setState({ isHover: false });
  }

  private handleFocus = () => {
    this.setState({ hasFocus: true });
  }

  private handleBlur = () => {
    this.setState({ hasFocus: false });
  }

  private displayDatePicker = () => {
    this.setState({ isDatePickerDisplay: true });
  }

  private hideDatePicker = () => {
    this.setState({ isDatePickerDisplay: false });
  }

  private handleDateSelect = (element: IFormTarget) => {
    const { name, onChange } = this.props;
    const { value } = element;

    this.setState({
      isDatePickerDisplay: false,
    });

    if (onChange) {
      onChange({
        name,
        value,
      });
    }
  }
}

export default DateRangeField;
