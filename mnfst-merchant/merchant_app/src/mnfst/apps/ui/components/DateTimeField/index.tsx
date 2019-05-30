import React from 'react';
import moment from 'moment';
import CalendarIcon from 'apps/ui/components/icons/CalendarIcon';
import DateTimePickerControl from 'apps/ui/components/DateTimePickerControl';
import TextField from 'apps/ui/components/TextField';
import { IFormTarget } from 'interfaces';
import styles from './style.css';

const dateTimeFormat = 'MM/DD/YYYY h:mm a';

interface IDateTimeFieldProps {
  className?: string;
  disabled: boolean;
  errors: string[] | null;
  label?: any;
  min?: string;
  max?: string;
  name: string;
  onInit?: (arg: any) => void;
  onChange: (event: {}) => void;
  readonly: boolean;
  tooltip?: string;
  type: string;
  value: string;
}

interface IDateTimeFieldState {
  formattedDate?: string;
  isDisplayDateTimePicker: boolean;
}

class DateTimeField extends React.Component<IDateTimeFieldProps, IDateTimeFieldState> {
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

  constructor(props) {
    super(props);
    const formattedDate = (props.value && props.value.length > 0)
      ? moment(props.value).format(dateTimeFormat)
      : '';

    this.state = {
      formattedDate,
      isDisplayDateTimePicker: false,
    };
  }

  public render() {
    const { className, disabled, errors, label, min, max, name, value, onChange, onInit } = this.props;
    const { isDisplayDateTimePicker, formattedDate } = this.state;

    return (
      <div className={styles.dateTimeField}>
        <TextField
          ref={(element) => { this.textField = element; }}
          className={className}
          classNamesList={!disabled
            ? {
              input: styles.input,
            }
            : {}
          }
          disabled={disabled}
          errors={errors}
          iconAfter={<CalendarIcon />}
          label={label}
          name={name}
          onInit={onInit && onInit}
          onChange={onChange && onChange}
          onClick={this.displayDateTimePicker}
          readonly={true}
          value={formattedDate} />
        <DateTimePickerControl
          className={styles.control}
          isOpen={isDisplayDateTimePicker}
          min={min}
          max={max}
          name={name}
          onCickOutside={this.hideDateTimePicker}
          onSelect={this.handleDateTimeSelect}
          value={value} />
      </div>
    );
  }

  private displayDateTimePicker = () => {
    this.setState({ isDisplayDateTimePicker: true });
  }

  private hideDateTimePicker = () => {
    this.setState({ isDisplayDateTimePicker: false });
  }

  private handleDateTimeSelect = (target: IFormTarget) => {
    const { name, onChange } = this.props;
    const { value } = target;
    const formattedDate = (value && value.length > 0) ? moment(value).format(dateTimeFormat) : '';

    this.setState({
      formattedDate,
      isDisplayDateTimePicker: false,
    });

    if (onChange) {
      onChange({
        name,
        value,
      });
    }
  }
}

export default DateTimeField;
