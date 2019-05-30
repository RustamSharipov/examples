import React from 'react';
import classNames from 'classnames';
import { AppLink, AppsLinks } from 'apps/ui/components/AppLinks';
import MNFSTLogo from 'apps/ui/components/MNFSTLogo';
import { SecondaryNavigation, SecondaryNavigationItem } from 'apps/ui/components/SecondaryNavigation';
import SocialNetworksGroups from 'apps/ui/components/SocialNetworksGroups';
import TextLink from 'apps/ui/components/TextLink';
import { MNFST_EXTERNAL_LINKS } from 'apps/ui/constants/base';
import { getLocalData } from 'apps/ui/utils/localization';
import { IClassNamesMap } from 'apps/ui/interfaces/elementNode';
import styles from './style.css';

interface IAppFooterClassNames {
  app: string;
  link: string;
  logoImage: string;
  socialNetwork: string;
}

interface IAppFooterProps {
  className?: string;
  classNamesMap?: IClassNamesMap<IAppFooterClassNames>;
  companyAddress?: string | null;
  email: string;
  onAppClick?: ({ store, url }) => void;
  theme?: string;
}

const AppFooter: React.SFC<IAppFooterProps> = (props) => {
  const {
    className,
    classNamesMap = {},
    companyAddress,
    email,
    onAppClick,
    theme,
  } = props;

  return (
    <div className={classNames(
      styles.appFooter,
      className,
    )}>
      <div className={styles.company}>
        <div className={styles.logo}>
          <MNFSTLogo className={classNames(
            styles.logoImage,
            classNamesMap.logoImage,
          )} />
        </div>
        <div className={styles.socialNetworksGroups}>
          <SocialNetworksGroups
            classNamesMap={{
              socialNetwork: classNames(
                styles.socialNetwork,
                classNamesMap.socialNetwork,
              ),
            }} />
        </div>
        <AppsLinks>
          <AppLink
            className={classNamesMap.app}
            onClick={onAppClick && onAppClick}
            size="small"
            store="app-store" />
          <AppLink
            className={classNamesMap.app}
            onClick={onAppClick && onAppClick}
            size="small"
            store="google-play" />
        </AppsLinks>
      </div>
      <div className={styles.copyright}>
        © 2019, {companyAddress}
      </div>
      <div className={styles.links}>
        <SecondaryNavigation>
          <SecondaryNavigationItem
            classNamesMap={{
              link: classNamesMap.link,
            }}
            href={MNFST_EXTERNAL_LINKS.LICENSE}
            target="_blank">
            {getLocalData('externalLinks.license')}
          </SecondaryNavigationItem>
          <SecondaryNavigationItem
            classNamesMap={{
              link: classNamesMap.link,
            }}
            href={MNFST_EXTERNAL_LINKS.PRIVACY_POLICY}
            target="_blank">
            {getLocalData('externalLinks.privacyPolicy')}
          </SecondaryNavigationItem>
          <SecondaryNavigationItem
            classNamesMap={{
              link: classNamesMap.link,
            }}
            href={MNFST_EXTERNAL_LINKS.COOKIE_POLICY}
            target="_blank">
            {getLocalData('externalLinks.cookiePolicy')}
          </SecondaryNavigationItem>
        </SecondaryNavigation>
        <div className={styles.support}>
          {getLocalData('ui.footer.supportEmail.label')}{' '}
          <TextLink
            className={classNamesMap.link}
            hasUnderline={true}
            href={`mailto:${email}`}
            theme={theme}>
            {email}
          </TextLink>
        </div>
      </div>
    </div>
  );
};

export default AppFooter;
