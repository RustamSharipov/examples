import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import classNames from 'classnames';
import { IFormTarget } from 'interfaces';
import styles from './style.css';

interface IDateRangePickerControlProps {
  className?: string;
  onSelect: (props: IFormTarget) => void;
  startDate: string;
  endDate: string;
}

interface IDateRangePickerControlState {
  selectionPhase: string | null;
  startDate: string;
  endDate: string;
}

class DateRangePickerControl extends React.Component<IDateRangePickerControlProps, IDateRangePickerControlState> {
  public state = {
    selectionPhase: 'start-date',
    startDate: this.props.startDate,
    endDate: this.props.endDate,
  };

  public render() {
    const { className } = this.props;
    const { startDate, endDate } = this.state;

    return (
      <div className={classNames(
        styles.dateRangePickerControl,
        className,
      )}>
        <DatePicker
          inline={true}
          monthsShown={2}
          selected={moment(startDate)}
          selectsStart={true}
          selectsEnd={true}
          startDate={moment(startDate)}
          endDate={moment(endDate)}
          onChange={this.handleSelect} />
      </div>
    );
  }

  private handleSelect = (date: moment.Moment) => {
    const { selectionPhase, startDate } = this.state;
    const { onSelect } = this.props;

    if (selectionPhase === 'start-date') {
      this.setState({
        selectionPhase: 'end-date',
        startDate: date.format(),
      });
    }

    if (selectionPhase === 'end-date') {
      this.setState({
        selectionPhase: 'start-date',
        endDate: date.format(),
      });

      if (onSelect) {
        onSelect({
          name: '',
          value: [
            startDate,
            date.format(),
          ],
        });
      }
    }
  }
}

export default DateRangePickerControl;
