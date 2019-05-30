import React from 'react';
import styles from './style.css';

interface ICampaignDetailsProps {
  children: React.ReactNode;
}

export const CampaignDetailsBody: React.SFC<ICampaignDetailsProps> = (props) => {
  const { children } = props;
  return (
    <div className={styles.campaignDetailsBody}>
      {children}
    </div>
  );
};

export const CampaignDetailsMain: React.SFC<ICampaignDetailsProps> = (props) => {
  const { children } = props;
  return (
    <div className={styles.campaignDetailsMain}>
      {children}
    </div>
  );
};

export const CampaignDetailsAside: React.SFC<ICampaignDetailsProps> = (props) => {
  const { children } = props;
  return (
    <div className={styles.campaignDetailsAside}>
      {children}
    </div>
  );
};

export const CampaignDetailsHeader: React.SFC<ICampaignDetailsProps> = (props) => {
  const { children } = props;
  return (
    <header className={styles.campaignDetailsHeader}>
      {children}
    </header>
  );
};
