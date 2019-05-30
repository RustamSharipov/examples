import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

interface ICampaignSelfiePreviewProps {
  className?: string;
}

const CampaignSelfiePreview: React.SFC<ICampaignSelfiePreviewProps> = ({ className }) => {
  return (
    <div className={classNames(
      styles.campaignSelfiePreview,
      className,
    )}>
      <span className={styles.image} />
    </div>
  );
};

export default CampaignSelfiePreview;
