import React from 'react';
import classNames from 'classnames';
import MNFSTLogo from 'apps/ui/components/MNFSTLogo';
import SandwichMenu from 'apps/ui/components/SandwichMenu';
import SocialNetworksGroups from 'apps/ui/components/SocialNetworksGroups';
import { IClassNamesMap } from 'apps/ui/interfaces/elementNode';
import styles from './style.css';
import { AppsLinks, AppLink } from '../AppLinks';

interface IClassNames {
  app: string;
}

interface IAppHeaderProps {
  apps?: React.ReactElement<any>;
  className?: string;
  classNamesMap?: IClassNamesMap<IClassNames>;
  externalNavigation?: React.ReactElement<any>;
  isExpanded: boolean;
  languageSwitcher?: React.ReactNode;
  navigation?: React.ReactElement<any>;
  onAppClick?: ({ store, url }) => void;
  onControlClick?: () => void;
  theme?: string;
}

class AppHeader extends React.Component<IAppHeaderProps> {
  public render() {
    const {
      className,
      classNamesMap = {},
      externalNavigation,
      isExpanded,
      languageSwitcher,
      navigation,
      onAppClick,
    } = this.props;

    return (
      <div className={classNames(
        styles.appHeader,
        isExpanded && styles.isExpanded,
        className,
      )}>
        <div className={styles.appHeaderInner}>
          <div className={styles.appHeaderSections}>
            <div className={styles.logo}>
              <MNFSTLogo className={styles.mnfstLogo} />
            </div>
            <div className={styles.navigation}>
              {externalNavigation && (
                <nav className={styles.externalNavigation}>
                  {React.cloneElement(externalNavigation, {
                    className: classNames(
                      externalNavigation.props.className,
                      styles.navigationInner,
                    ),
                  })}
                </nav>
              )}
              {navigation && (
                <nav className={styles.internalNavigation}>
                  {React.cloneElement(navigation, {
                    className: classNames(
                      navigation.props.className,
                      styles.navigationInner,
                      styles.internalNavigationInner,
                    ),
                  })}
                </nav>
              )}
              <div className={styles.apps}>
                <AppsLinks noLabel={true}>
                  <AppLink
                    className={classNamesMap.app}
                    onClick={onAppClick && onAppClick}
                    store="app-store" />
                  <AppLink
                    className={classNamesMap.app}
                    onClick={onAppClick && onAppClick}
                    store="google-play" />
                </AppsLinks>
              </div>
              <div className={styles.socialNetworksGroups}>
                <SocialNetworksGroups />
              </div>
              {languageSwitcher && (
                <div className={styles.languageSwitcher}>
                  {languageSwitcher}
                </div>
              )}
            </div>
            <SandwichMenu
              className={classNames(
                styles.navigationControl,
                'spec-landing-navigation-control',
              )}
              isActive={isExpanded}
              onClick={this.handleControlClick} />
          </div>
        </div>
        <div
          className={styles.backdrop}
          onClick={this.handleControlClick} />
      </div>
    );
  }

  private handleControlClick = () => {
    const { onControlClick } = this.props;
    if (onControlClick) {
      onControlClick();
    }
  }
}

export default AppHeader;
