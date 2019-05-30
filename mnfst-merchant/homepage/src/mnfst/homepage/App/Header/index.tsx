import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TagManager from 'react-gtm-module';
import AppHeader from 'apps/ui/components/AppHeader';
import ExternalNavigation from 'apps/ui/components/ExternalNavigation';
import LanguageSwitcher from 'apps/ui/components/LanguageSwitcher';
import { Navigation, NavigationItem } from 'apps/ui/components/Navigation';
import { IHomeReducer } from 'apps/home/interfaces/home';
import { IUserLocationReducer, IUserLocationActions } from 'apps/ui/interfaces/userLocation';
import { getLanguages, setLanguage, getLocalData } from 'apps/ui/utils/localization';
import * as UserLocationActions from 'apps/ui/actions/UserLocationActions';
import styles from './style.css';
import { GTM_EVENTS } from 'constants/tracking';

interface IHeaderProps {
  home: IHomeReducer;
  userLocation: IUserLocationReducer;
  UserLocationActions: IUserLocationActions;
}

interface IHeaderState {
  isExpanded: boolean;
}

const navigationItems = [
  {
    id: 'how-it-works',
    getTitle: () => getLocalData('pages.userLanding.header.howItWorks'),
  },
  {
    id: 'qna',
    getTitle: () => getLocalData('pages.userLanding.header.qna'),
  },
];

class Header extends React.Component<IHeaderProps, IHeaderState> {
  public state = {
    isExpanded: false,
  };

  public render() {
    const { lang } = this.props.userLocation.userLocation;
    const { isExpanded } = this.state;
    const languages = getLanguages();

    return (
      <header className={styles.header}>
        <AppHeader
          classNamesMap={{
            app: styles.app,
          }}
          externalNavigation={(
            <ExternalNavigation
              currentPage="user"
              onClick={this.handleExternalNavigationItemClick} />
          )}
          isExpanded={isExpanded}
          languageSwitcher={
            <LanguageSwitcher
              lang={lang}
              onLanguageChange={this.changeLanguage}
              languages={languages} />
          }
          onAppClick={this.handleAppClick}
          navigation={(
            <Navigation theme="front">
              {navigationItems.map(item => (
                <NavigationItem
                  key={item.id}
                  onClick={() => this.handleNavigationItemClick(item.id)}>
                  {item.getTitle()}
                </NavigationItem>
              ))}
            </Navigation>
          )}
          onControlClick={this.handleHeaderControlClick} />
      </header>
    );
  }

  private handleAppClick = (params) => {
    const { store } = params;
    const dataLayer = GTM_EVENTS.FOOTER.APPS[store];

    if (dataLayer) {
      TagManager.dataLayer({ dataLayer });
    }
  }

  private handleHeaderControlClick = () => {
    this.setState(state => ({
      isExpanded: !state.isExpanded,
    }));
  }

  private handleNavigationItemClick = (id: string) => {
    const {
      home: {
        navigation,
      },
    } = this.props;
    const navigationItem = navigation[id];

    window.scroll({
      behavior: 'smooth',
      top: navigationItem.top,
    });

    this.setState({ isExpanded: false });

    const dataLayer = GTM_EVENTS.HEADER.NAVIGATION[id];

    if (dataLayer) {
      TagManager.dataLayer({ dataLayer });
    }
  }

  private handleExternalNavigationItemClick = (params) => {
    const { name } = params;
    const dataLayer = GTM_EVENTS.HEADER.NAVIGATION[name];

    if (dataLayer) {
      TagManager.dataLayer({ dataLayer });
    }
  }

  private changeLanguage = (lang: string) => {
    this.props.UserLocationActions.changeLanguage({ lang });
    setLanguage(lang);
  }
}

function mapStateToProps(state) {
  return {
    home: state.home,
    userLocation: state.userLocation,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    UserLocationActions: bindActionCreators(UserLocationActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
