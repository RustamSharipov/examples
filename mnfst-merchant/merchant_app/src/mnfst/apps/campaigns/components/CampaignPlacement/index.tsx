import React from 'react';
import classNames from 'classnames';
import CheckBox from 'apps/ui/components/CheckBox';
import FacebookOLogoIcon from 'apps/ui/components/icons/FacebookOLogoIcon';
import InstagramOLogoIcon from 'apps/ui/components/icons/InstagramOLogoIcon';
import TwitterOLogoIcon from 'apps/ui/components/icons/TwitterOLogoIcon';
import { ISocialNetworkSupoortedFeatures } from 'apps/campaigns/interfaces/campaignForm';
import { IFormTarget } from 'interfaces';
import { getLocalString } from 'utils/localization';
import styles from './style.css';

const socialNetworks = {
  facebook: {
    className: styles.facebook,
    icon: <FacebookOLogoIcon className={styles.campaignPlacementSocialNetworkIcon} />,
    name: getLocalString('socialNetworks.facebook'),
  },
  instagram: {
    className: styles.instagram,
    icon: <InstagramOLogoIcon className={styles.campaignPlacementSocialNetworkIcon} />,
    name: getLocalString('socialNetworks.instagram'),
  },
  twitter: {
    className: styles.twitter,
    icon: <TwitterOLogoIcon className={styles.campaignPlacementSocialNetworkIcon} />,
    name: getLocalString('socialNetworks.twitter'),
  },
};

interface ICampaignPlacementProps {
  children: React.ReactNode;
}

interface ICampaignPlacementSocialNetworkProps {
  disabled?: boolean;
  onFeedCheck: (formTarget: IFormTarget) => void;
  onStoryCheck: (formTarget: IFormTarget) => void;
  socialNetwork: string;
  supportedFeatures: ISocialNetworkSupoortedFeatures;
  value: ISocialNetworkSupoortedFeatures | null;
}

export const CampaignPlacement: React.SFC<ICampaignPlacementProps> = (props) => {
  const { children } = props;
  return (
    <div className={styles.campaignPlacement}>
      {children}
    </div>
  );
};

export class CampaignPlacementSocialNetwork extends React.Component<ICampaignPlacementSocialNetworkProps> {
  public render() {
    const { disabled, socialNetwork, supportedFeatures, value } = this.props;
    const socialNetworkData = socialNetwork && socialNetworks[socialNetwork];

    return (
      <div className={classNames(
        styles.campaignPlacementSocialNetwork,
        socialNetworkData.className,
      )}>
        <div className={styles.campaignPlacementSocialNetworkTitle}>
          {socialNetworkData.icon}
          {socialNetworkData.name}
        </div>
        <div className={styles.campaignPlacementSocialNetworkContent}>
          <label className={classNames(
            styles.campaignPlacementSocialNetworkPost,
            styles.campaignPlacementSocialNetworkStory,
            !!(value && value.story) && styles.isChecked,
            !supportedFeatures.story && styles.notSupported,
            disabled && styles.isDisabled,
          )}>
            {!disabled && (
              <div className={styles.campaignPlacementSocialNetworkPostControl}>
                {supportedFeatures.story
                  ? (
                    <CheckBox
                      classNamesList={{
                        controlTick: styles.campaignPlacementSocialNetworkPostControlTick,
                      }}
                      isChecked={!!(value && value.story)}
                      label={getLocalString('pages.campaigns.socialNetworks.story')}
                      name="story"
                      onChange={this.handleStoryCheck}
                      theme="white" />
                  )
                  : getLocalString('pages.campaigns.socialNetworks.notSupported')
                }
              </div>
            )}
          </label>
          <label className={classNames(
            styles.campaignPlacementSocialNetworkPost,
            styles.campaignPlacementSocialNetworkFeed,
            !!(value && value.feed) && styles.isChecked,
            !supportedFeatures.feed && styles.notSupported,
            disabled && styles.isDisabled,
          )}>
            {!disabled && (
              <div className={styles.campaignPlacementSocialNetworkPostControl}>
                {supportedFeatures.feed
                  ? (
                    <CheckBox
                      classNamesList={{
                        controlTick: styles.campaignPlacementSocialNetworkPostControlTick,
                      }}
                      isChecked={!!(value && value.feed)}
                      label={socialNetwork === 'twitter'
                        ? getLocalString('pages.campaigns.socialNetworks.tweet')
                        : getLocalString('pages.campaigns.socialNetworks.feed')
                      }
                      name="feed"
                      onChange={this.handleFeedCheck}
                      theme="white" />
                  )
                  : getLocalString('pages.campaigns.socialNetworks.notSupported')
                }
              </div>
            )}
          </label>
        </div>
      </div>
    );
  }

  private handleFeedCheck = (formTarget: IFormTarget) => {
    const { onFeedCheck } = this.props;
    if (onFeedCheck) {
      onFeedCheck(formTarget);
    }
  }

  private handleStoryCheck = (formTarget: IFormTarget) => {
    const { onStoryCheck } = this.props;
    if (onStoryCheck) {
      onStoryCheck(formTarget);
    }
  }
}
