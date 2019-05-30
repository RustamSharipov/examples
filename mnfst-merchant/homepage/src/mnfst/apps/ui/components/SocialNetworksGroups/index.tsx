import React from 'react';
import classnames from 'classnames';
import FacebookOLogoIcon from 'apps/ui/components/icons/FacebookOLogoIcon';
import InstagramOLogoIcon from 'apps/ui/components/icons/InstagramOLogoIcon';
import LinkedInOLogoIcon from 'apps/ui/components/icons/LinkedInOLogoIcon';
import MediumOLogoIcon from 'apps/ui/components/icons/MediumOLogoIcon';
import TwitterOLogoIcon from 'apps/ui/components/icons/TwitterOLogoIcon';
import { SOCIAL_NETWORKS_GROUPS } from 'apps/ui/constants/base';
import { IClassNamesMap } from 'apps/ui/interfaces/elementNode';
import styles from './style.css';

interface ISocialNetworksGroupsClassNames {
  socialNetwork: string;
}

interface ISocialNetworksGroupsProps {
  classNamesMap?: IClassNamesMap<ISocialNetworksGroupsClassNames>;
  theme?: string;
}

const SocialNetworksGroups: React.SFC<ISocialNetworksGroupsProps> = (props) => {
  const { classNamesMap = {}, theme } = props;

  return (
    <div className={styles.socialNetworksGroups}>
      <a
        className={classnames(
          styles.socialNetwork,
          classNamesMap.socialNetwork,
          theme === 'dark' && styles.darkTheme,
        )}
        href={SOCIAL_NETWORKS_GROUPS.TWITTER.url}
        target="_blank"
        rel="noopener noreferrer">
        <TwitterOLogoIcon className={styles.socialNetworkIcon} />
      </a>
      <a
        className={classnames(
          styles.socialNetwork,
          classNamesMap.socialNetwork,
          theme === 'dark' && styles.darkTheme,
        )}
        href={SOCIAL_NETWORKS_GROUPS.INSTAGRAM.url}
        target="_blank"
        rel="noopener noreferrer">
        <InstagramOLogoIcon className={styles.socialNetworkIcon} />
      </a>
      <a
        className={classnames(
          styles.socialNetwork,
          classNamesMap.socialNetwork,
          theme === 'dark' && styles.darkTheme,
        )}
        href={SOCIAL_NETWORKS_GROUPS.FACEBOOK.url}
        target="_blank"
        rel="noopener noreferrer">
        <FacebookOLogoIcon className={styles.socialNetworkIcon} />
      </a>
      <a
        className={classnames(
          styles.socialNetwork,
          classNamesMap.socialNetwork,
          theme === 'dark' && styles.darkTheme,
        )}
        href={SOCIAL_NETWORKS_GROUPS.LINKEDIN.url}
        target="_blank"
        rel="noopener noreferrer">
        <LinkedInOLogoIcon className={styles.socialNetworkIcon} />
      </a>
      <a
        className={classnames(
          styles.socialNetwork,
          classNamesMap.socialNetwork,
          theme === 'dark' && styles.darkTheme,
        )}
        href={SOCIAL_NETWORKS_GROUPS.MEDIUM.url}
        target="_blank"
        rel="noopener noreferrer">
        <MediumOLogoIcon className={styles.socialNetworkIcon} />
      </a>
    </div>
  );
};

export default SocialNetworksGroups;
