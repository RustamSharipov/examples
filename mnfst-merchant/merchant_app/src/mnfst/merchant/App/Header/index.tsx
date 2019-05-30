import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { connect } from 'react-redux';
import MNFSTLogo from 'apps/ui/components/MNFSTLogo';
import { Navigation, NavigationItem } from 'apps/ui/components/Navigation';
import User from 'merchant/App/Header/User';
import { getLocalString } from 'utils/localization';
import { routes } from 'merchant/routes';
import styles from './style.css';

interface IHeaderProps {
  location: any;
  user: any;
}

const Header: React.SFC<IHeaderProps> = (props) => {
  const { location, user: { merchant, merchant_user } } = props;
  const homeLink = merchant_user && merchant ? routes.campaigns.getPath() : routes.home.getPath();
  const mnfstLogo = (
    <MNFSTLogo className={classNames(
      styles.logo,
      'spec-app-header-logo',
    )} />
  );

  return (
    <div className={classNames(
      styles.header,
      'spec-app-header',
    )}>
      <div>
        {location.pathname === homeLink
          ? mnfstLogo
          : (
            <Link to={homeLink}>
              {mnfstLogo}
            </Link>
          )
        }
      </div>
      {(merchant_user && merchant) && (
        <React.Fragment>
          <div className={classNames(
            styles.brand,
            'spec-app-header-company',
          )}>
            {merchant.name}
          </div>
          <Navigation className={styles.navigation}>
            <NavigationItem
              className="spec-app-header-navigation-campaigns"
              isActive={routes.campaigns.path === location.pathname}
              link={routes.campaigns.getPath()}>
              {getLocalString('ui.header.campaigns')}
            </NavigationItem>
            <NavigationItem
              className="spec-app-header-navigation-stream"
              isActive={routes.stream.path === location.pathname}
              link={routes.stream.getPath()}>
              {getLocalString('ui.header.stream')}
            </NavigationItem>
            <NavigationItem
              className="spec-app-header-navigation-billing"
              isActive={routes.billing.path === location.pathname}
              link={routes.billing.getPath()}>
              {getLocalString('ui.header.billing')}
            </NavigationItem>
            <NavigationItem
              className="spec-app-header-navigation-account"
              isActive={routes.profile.path === location.pathname}
              link={routes.profile.getPath()}>
              {getLocalString('ui.header.account')}
            </NavigationItem>
          </Navigation>
          <User />
        </React.Fragment>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default withRouter(connect(mapStateToProps)(Header));
