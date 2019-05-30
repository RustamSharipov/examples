import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PopupPreloader from 'apps/ui/components/PopupPreloader';
import { UserAuthorization } from 'utils/users';
import { renderRoute } from 'merchant/routes';
import { ILayoutActions } from 'apps/base/interfaces/layout';
import { IUserLocationActions, IUserLocationReducer } from 'apps/ui/interfaces/userLocation';
import { IUserReducer } from 'apps/users/interfaces/user';
import * as LayoutActions from 'apps/base/actions/LayoutActions';
import * as ProfileActions from 'apps/users/actions/ProfileActions';
import * as UserLocationActions from 'apps/ui/actions/UserLocationActions';
import Alerts from './Alerts';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';
import Modals from './Modals';
import ScrollToTop from './ScrollToTop';
import styles from './style.css';

const hasAuthorizationToken = !!UserAuthorization.get();

interface IAppProps {
  layout: any;
  user: IUserReducer;
  userLocation: IUserLocationReducer;
  LayoutActions: ILayoutActions;
  ProfileActions: any;
  UserLocationActions: IUserLocationActions;
}

class App extends React.Component<IAppProps> {
  public subscriptions: any;

  public componentDidMount() {
    this.props.UserLocationActions.init();
    this.props.UserLocationActions.fetchData();
    if (hasAuthorizationToken) {
      this.props.ProfileActions.fetchUserData();
    }
  }

  public componentDidUpdate(prevProps) {
    const { isAdaptive } = this.props.layout;

    if (isAdaptive !== prevProps.isAdaptive) {
      if (isAdaptive) {
        document.body.classList.add('isAdaptive');
      }
      else {
        document.body.classList.remove('isAdaptive');
      }
    }
  }

  public render() {
    const {
      layout: {
        isHeaderHidden,
        isFooterHidden,
      },
      user,
      user: {
        merchant,
        merchant_user,
      },
      userLocation: {
        userLocation: { countryCode },
      },
    } = this.props;
    const isPreloaderDisplay = hasAuthorizationToken ? !(user.status === 'done' && !!countryCode) : false;
    const isLoggedIn = !!merchant_user;

    return (
      <Router>
        <ScrollToTop>
          <Modals />
          {countryCode && (
            <div className={styles.app}>
              <PopupPreloader isDisplay={isPreloaderDisplay} />
              {!isHeaderHidden && (
                <React.Fragment>
                  <Header />
                  <Alerts alert={merchant && merchant.alert_messages[0]} />
                </React.Fragment>
              )}
              <Content>
                <Switch>
                  {renderRoute('home', isLoggedIn)}
                  {renderRoute('billing', isLoggedIn)}
                  {renderRoute('stream', isLoggedIn)}
                  {renderRoute('campaigns', isLoggedIn)}
                  {renderRoute('campaigns.new', isLoggedIn)}
                  {renderRoute('campaigns.details', isLoggedIn)}
                  {renderRoute('campaigns.edit', isLoggedIn)}
                  {renderRoute('campaigns.copy', isLoggedIn)}
                  {renderRoute('campaigns.faq', isLoggedIn)}
                  {renderRoute('profile', isLoggedIn)}
                  {renderRoute('login', isLoggedIn)}
                  {renderRoute('registration', isLoggedIn)}
                  {renderRoute('resetPassword', isLoggedIn)}
                  {renderRoute('changePassword', isLoggedIn)}
                  {renderRoute('error.404')}
                </Switch>
              </Content>
              {!isFooterHidden && <Footer />}
            </div>
          )}
        </ScrollToTop>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    layout: state.layout,
    user: state.user,
    userLocation: state.userLocation,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    LayoutActions: bindActionCreators(LayoutActions, dispatch),
    ProfileActions: bindActionCreators(ProfileActions, dispatch),
    UserLocationActions: bindActionCreators(UserLocationActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
