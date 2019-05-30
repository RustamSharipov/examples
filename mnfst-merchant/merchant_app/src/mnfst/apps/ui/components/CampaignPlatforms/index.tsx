import React from 'react';
import classNames from 'classnames';
import SocialNetwork from 'apps/ui/components/SocialNetworks';
import styles from './style.css';

interface ICampaignPlatforms {
  children: React.ReactNode;
  className?: string;
}

interface ICampaignPlatform {
  className?: string;
  type: string;
}

export const CampaignPlatforms: React.SFC<ICampaignPlatforms> = (props) => {
  const { children, className } = props;
  return (
    <div className={classNames(
      styles.campaignPlatforms,
      className,
    )}>
      {children}
    </div>
  );
};

export const CampaignPlatform: React.SFC<ICampaignPlatform> = (props) => {
  const { className, type } = props;
  const icon = type && SocialNetwork[type].icon;

  return (
    <div className={classNames(
      styles.campaignPlatform,
      className,
    )}>
      {icon}
    </div>
  );
};

export const CampaignPlatformsStub = () => {
  return (
    <div className={styles.campaignPlatforms}>
      {Array(3).fill(1).map((_, index) => (
        <div
          key={index}
          className={styles.campaignPlatform}>
          <span className={styles.iconStub} />
        </div>
      ))}
    </div>
  );
};
