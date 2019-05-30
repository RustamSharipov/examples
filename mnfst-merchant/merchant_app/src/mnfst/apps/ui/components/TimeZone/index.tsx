import React from 'react';
import styles from './style.css';

interface ITimeZoneProps {
  className?: string;
  timezone: string;
}

const TimeZone: React.SFC<ITimeZoneProps> = (props) => {
  const { className, timezone } = props;
  const match = timezone.match(/\((.*?)\)/);
  const timezoneCode = match && match[1];
  const timezoneName = match && timezone.replace(match[0], '');

  return (
    <div className={className}>
      {timezoneName}{' '}
      <span className={styles.code}>
        ({timezoneCode})
      </span>
    </div>
  );
};

export default TimeZone;
