import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

interface ICampaignsSetProps {
  children: React.ReactNode;
  className?: string;
}

const CampaignsSet: React.SFC<ICampaignsSetProps> = (props) => {
  const { children, className } = props;
  return (
    <div className={classNames(
      styles.campaignsSet,
      className,
    )}>
      {children}
    </div>
  );
};

export default CampaignsSet;
