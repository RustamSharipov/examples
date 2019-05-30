import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

interface ISocialNetworksProps {
  icon: React.ReactNode;
  name: string;
}

interface ISocialNetworkIconProps {
  socialNetwork: string;
}

const SocialNetworkIcon: React.SFC<ISocialNetworkIconProps> = (props) => {
  const { socialNetwork } = props;
  return (
    <span className={classNames(
      styles.socialNetworkIcon,
      styles[socialNetwork],
    )} />
  );
};

class SocialNetwork {
  public static facebook: ISocialNetworksProps = {
    icon: <SocialNetworkIcon socialNetwork="facebook" />,
    name: 'Facebook',
  };

  public static instagram: ISocialNetworksProps = {
    icon: <SocialNetworkIcon socialNetwork="instagram" />,
    name: 'Instagram',
  };

  public static twitter: ISocialNetworksProps = {
    icon: <SocialNetworkIcon socialNetwork="twitter" />,
    name: 'Twitter',
  };
}

export default SocialNetwork;
