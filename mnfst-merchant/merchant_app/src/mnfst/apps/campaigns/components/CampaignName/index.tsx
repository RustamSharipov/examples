import React from 'react';
import classNames from 'classnames';
import TextLink from 'apps/ui/components/TextLink';
import styles from './style.css';

interface ICampaignNameProps {
  children: React.ReactNode;
  className?: string;
  link?: string;
}

const CampaignName: React.SFC<ICampaignNameProps> = (props) => {
  const { children, className, link } = props;
  const campaignNameClassNames = {
    className: classNames(
      styles.campaignName,
      className,
    ),
  };

  if (link) {
    return (
      <TextLink
        {...campaignNameClassNames}
        link={link}
        theme="violet">
        {children}
      </TextLink>
    );
  }

  return (
    <div {...campaignNameClassNames}>
      {children}
    </div>
  );
};

export default CampaignName;
