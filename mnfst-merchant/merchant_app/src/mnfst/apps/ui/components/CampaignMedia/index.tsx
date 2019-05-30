import React from 'react';
import classNames from 'classnames';
import CampaignThumbnail from 'apps/campaigns/components/CampaignThumbnail';
import Image from 'apps/ui/components/Image';
import ImagePlaceholderIcon from 'apps/ui/components/icons/ImagePlaceholderIcon';
import styles from './style.css';

interface ICampaignBrandLogoProps {
  className?: string;
  color: string;
  image?: string;
}

export const CampaignBrandLogo: React.SFC<ICampaignBrandLogoProps> = (props) => {
  const { className, color, image } = props;

  const sampleColorStyle = {
    backgroundColor: color,
  };

  return (
    <div
      className={classNames(
        styles.campaignMedia,
        className,
      )}
      style={sampleColorStyle}>
      {image
        ? (
          <Image
            src={image}
            width="80"
            height="80"
            className={styles.image}
            alt="Brand logo" />
        )
        : (
          <ImagePlaceholderIcon className={classNames(
            styles.image,
            styles.imageStub,
          )} />
        )
      }
    </div>
  );
};

interface ICampaignCreativeProps {
  className?: string;
  color?: string;
  placement: string;
  src: string;
  type?: string;
}

const campaignCreativePlacementsClassNames = {
  feed: styles.feed,
  story: styles.story,
};

export const CampaignCreative: React.SFC<ICampaignCreativeProps> = (props) => {
  const { className, color, placement, src, type } = props;
  const campaignCreativePlacementClassName = placement && campaignCreativePlacementsClassNames[placement];
  const sampleColorStyle = {
    backgroundColor: color,
  };

  return (
    <div
      className={classNames(
        styles.campaignMedia,
        campaignCreativePlacementClassName,
        className,
      )}
      style={sampleColorStyle}>
      <CampaignThumbnail
        className={styles.creative}
        classNamesList={{
          image: styles.creative,
          stubIcon: styles.stubIcon,
        }}
        src={src}
        type={type}
        width={164}
        height={164} />
    </div>
  );
};

interface ICampaignCreatives {
  children: React.ReactNode;
}

export const CampaignCreatives: React.SFC<ICampaignCreatives> = (props) => {
  const { children } = props;
  return (
    <div className={styles.campaignCreatives}>
      {children}
    </div>
  );
};

interface ICampaignCreativeStubProps {
  placement?: string;
}

export const CampaignCreativeStub: React.SFC<ICampaignCreativeStubProps> = (props) => {
  const { placement } = props;
  const campaignCreativePlacementClassName = placement && campaignCreativePlacementsClassNames[placement];

  return (
    <div className={classNames(
      styles.campaignMedia,
      campaignCreativePlacementClassName,
    )} />
  );
};
