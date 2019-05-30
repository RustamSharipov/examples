import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import CalendarIcon from 'apps/ui/components/icons/CalendarIcon';
import DateRangePickerControl from 'apps/ui/components/DateRangePickerControl';
import DropdownList from 'apps/ui/components/DropdownList';
import ModalPopup from 'apps/ui/components/ModalPopup';
import { IFormTarget } from 'interfaces';
import styles from './style.css';

interface IDateRangePickerProps {
  className?: string;
  dateFrom: string;
  dateTo: string;
  label?: string | React.ReactNode;
  onSelect: (event: {}) => void;
}

interface IDateRangePickerState {
  isDisplayDateOptions: boolean;
  isDisplayDatePicker: boolean;
  dateFrom: any;
  dateTo: any;
  selectedRangeVariant: string | null;
}

class DateRangePicker extends React.Component<IDateRangePickerProps, IDateRangePickerState> {
  public static defaultProps = {
    className: '',
    dateFrom: '',
    dateTo: '',
  };

  public state = {
    dateFrom: this.props.dateFrom || '',
    dateTo: this.props.dateTo || '',
    isDisplayDateOptions: false,
    isDisplayDatePicker: false,
    selectedRangeVariant: null,
  };

  public render() {
    const { className, label } = this.props;
    const { dateFrom, dateTo, isDisplayDateOptions, isDisplayDatePicker, selectedRangeVariant } = this.state;
    const items = [
      // {
      //   isChecked: true,
      //   isHighlighted: true,
      //   name: 'Overall',
      //   value: 'all',
      // },
      {
        name: 'Last Week',
        value: 'week',
      },
      {
        name: 'Last Month',
        value: 'month',
      },
      {
        name: 'Pick a date',
        value: 'pick',
      },
    ];

    return (
      <div className={classNames(
        styles.dateRangePicker,
        className,
      )}>
        <div
          className={styles.control}
          onClick={this.toggleDateOptions}>
          {label && (
            <span>{label}&nbsp;</span>
          )}
          <span className={styles.range}>
            {moment(dateFrom).format('D MMM YY')}–{moment(dateTo).format('D MMM YY')}
          </span>
          <CalendarIcon className={styles.icon} />
        </div>
        <DropdownList
          className={styles.dropdownList}
          isOpened={isDisplayDateOptions}
          items={items}
          onBlur={this.hideDropdownList}
          onSelect={this.handleDateVariantSelect}
          value={selectedRangeVariant} />
        <ModalPopup
          isOpen={isDisplayDatePicker}
          onClose={this.hideDatePicker}>
          <DateRangePickerControl
            onSelect={this.handleDateSelect}
            startDate={dateFrom}
            endDate={dateTo} />
        </ModalPopup>
      </div>
    );
  }

  private toggleDateOptions = () => {
    this.setState(prevState => ({
      isDisplayDateOptions: !prevState.isDisplayDateOptions,
    }));
  }

  private hideDropdownList = () => {
    this.setState({ isDisplayDateOptions: false });
  }

  private hideDatePicker = () => {
    this.setState({ isDisplayDatePicker: false });
  }

  private handleDateVariantSelect = (target: IFormTarget) => {
    const { value } = target;
    const { onSelect } = this.props;
    const rangeVariants = ['week', 'month'];
    let dateTo;
    let dateFrom;

    if (rangeVariants.includes(value)) {
      dateTo = moment().format();

      if (value === 'week') {
        dateFrom = moment().subtract(7, 'days').format();
      }
      if (value === 'month') {
        dateFrom = moment().subtract(1, 'month').format();
      }

      this.setState({
        dateFrom,
        dateTo,
        selectedRangeVariant: value,
      });
    }
    if (value === 'pick') {
      this.setState({ isDisplayDatePicker: true });
    } else {
      onSelect({
        value: [dateFrom, dateTo],
      });
    }

    this.setState({
      isDisplayDateOptions: false,
    });
  }

  private handleDateSelect = (target: IFormTarget) => {
    const { onSelect } = this.props;
    const { value } = target;

    this.setState({
      dateFrom: value[0],
      dateTo: value[1],
      isDisplayDatePicker: false,
      selectedRangeVariant: null,
    });

    onSelect({
      value,
    });
  }
}

export default DateRangePicker;
