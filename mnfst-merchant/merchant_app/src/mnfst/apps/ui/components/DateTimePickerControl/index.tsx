import React from 'react';
import moment from 'moment';
import 'moment/locale/en-gb';
import DatePicker from 'react-datepicker';
import enhanceWithClickOutside from 'react-click-outside';
import classNames from 'classnames';
import { localizeString } from 'utils/localization';
import { IFormTarget } from 'interfaces';
import styles from './style.css';

interface IDateTimePickerControlProps {
  className?: string;
  isOpen: boolean;
  min?: string;
  max?: string;
  name: string;
  onSelect: (props: IFormTarget) => void;
  onCickOutside: () => void;
  value: string;
}

interface IDateTimePickerControlState {
  date: any;
  time: any;
  isDateSelected: boolean;
}

class DateTimePickerControl extends React.Component<IDateTimePickerControlProps, IDateTimePickerControlState> {
  constructor(props) {
    super(props);
    const { value } = props;
    const [date, time] = value
      ? value.split('T')
      : [null, null];

    this.state = {
      date: date && date.length > 0 ? moment(value) : null,
      time: time && time.length > 0 ? moment(value) : null,
      isDateSelected: date && date.length > 0,
    };
  }

  public handleClickOutside = () => {
    const { onCickOutside } = this.props;
    if (onCickOutside) {
      onCickOutside();
    }
  }

  public render() {
    const { className, isOpen, min, max, name } = this.props;
    const { date, isDateSelected, time } = this.state;
    const formattedMinDate = moment(min);
    const formattedMaxDate = name === 'campaign.start_at' ? moment(max) : undefined;

    if (isOpen) {
      return (
        <div className={classNames(
          styles.dateTimePickerControl,
          className,
        )}>
          <div className={styles.datePicker}>
            <DatePicker
              inline={true}
              minDate={formattedMinDate}
              maxDate={formattedMaxDate}
              locale="en-gb"
              onChange={this.handleDateSelect}
              selected={date} />
          </div>
          <div className={classNames(
            styles.timePicker,
            isDateSelected && styles.isDisplay,
          )}>
            <DatePicker
              dateFormat="LT"
              inline={true}
              onChange={this.handleTimeSelect}
              selected={time}
              showTimeSelect={true}
              showTimeSelectOnly={true}
              timeFormat="h:mm a"
              timeIntervals={15}
              timeCaption={localizeString('Time')} />
          </div>
        </div>
      );
    }

    return null;
  }

  private handleDateSelect = (date: any) => {
    this.setState({
      date,
      isDateSelected: true,
    });
  }

  private handleTimeSelect = (time: any) => {
    const { onSelect } = this.props;
    const dateTime = [
      this.state.date.format('YYYY-MM-DD'),
      time.format('kk:mm:ss').replace('24', '00'),
    ].join('T');

    if (onSelect) {
      onSelect({
        name: '',
        value: dateTime,
      });
    }
  }
}

export default enhanceWithClickOutside(DateTimePickerControl);
