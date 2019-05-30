import React from 'react';
import moment from 'moment';
import styles from './style.css';

interface ICampaignEventDate {
  date: string;
}

const CampaignEventDate: React.SFC<ICampaignEventDate> = (props) => {
  const { date } = props;
  const formattedDate = moment(date).format('D MMM YYYY');

  return (
    <div className={styles.campaignEventDate}>
      {formattedDate}
    </div>
  );
};

export default CampaignEventDate;
