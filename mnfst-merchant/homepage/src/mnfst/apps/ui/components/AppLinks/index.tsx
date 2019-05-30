import React from 'react';
import classNames from 'classnames';
import AppleIcon from 'apps/ui/components/icons/AppleIcon';
import GooglePlayIcon from 'apps/ui/components/icons/GooglePlayIcon';
import { APP_STORE_STORE_URI, GOOGLE_PLAY_STORE_URI } from 'apps/ui/constants/base';
import { getLocalData } from 'apps/ui/utils/localization';
import styles from './style.css';
import { IClassNamesMap } from 'apps/ui/interfaces/elementNode';

interface IAppLinkElement {
  store: string;
  url: string;
}

interface IAppLinkClassNames {
  caption: string;
}

interface IAppLinkProps {
  className?: string;
  classNamesMap?: IClassNamesMap<IAppLinkClassNames>;
  onClick?: (element: IAppLinkElement) => void;
  size?: string;
  store: string;
  theme?: string;
  withCaption?: boolean;
}

interface IAppsLinksProps {
  children: React.ReactNode;
  className?: string;
  noLabel?: boolean;
}

const sizesClassNames = {
  large: styles.largeSize,
  small: styles.smallSize,
};

const themesClassNames = {
  grey: styles.greyTheme,
  white: styles.whiteTheme,
};

const stores = {
  'app-store': {
    caption: getLocalData('ui.mobileApps.appStore'),
    icon: <AppleIcon className={styles.icon} />,
    url: APP_STORE_STORE_URI,
  },
  'google-play': {
    caption: getLocalData('ui.mobileApps.googlePlay'),
    icon: <GooglePlayIcon className={styles.icon} />,
    url: GOOGLE_PLAY_STORE_URI,
  },
};

export class AppLink extends React.Component<IAppLinkProps> {
  public render() {
    const {
      className,
      classNamesMap = {},
      size,
      store,
      theme,
      withCaption,
    } = this.props;
    const sizeClassName = size && sizesClassNames[size];
    const themeClassName = theme && themesClassNames[theme];

    return (
      <a
        className={classNames(
          styles.app,
          withCaption && styles.withCaption,
          sizeClassName,
          themeClassName,
          className,
        )}
        href={stores[store].url}
        onClick={() => this.handleClick(stores[store].url)}
        target="_blank">
        {stores[store].icon}
        {withCaption && (
          <span className={classNames(
            styles.caption,
            classNamesMap.caption,
          )}>
            {stores[store].caption}
          </span>
        )}
      </a>
    );
  }

  private handleClick = (href) => {
    const { store, onClick } = this.props;
    if (onClick) {
      onClick({ store, url: href });
    }
  }
}

export const AppsLinks: React.SFC<IAppsLinksProps> = (props) => {
  const { children, className, noLabel } = props;
  return (
    <div className={classNames(
      styles.appsLinks,
      className,
    )}>
      {!noLabel && (
        <div className={styles.label}>
          {getLocalData('ui.mobileApps.label')}
        </div>
      )}
      {children}
    </div>
  );
};
