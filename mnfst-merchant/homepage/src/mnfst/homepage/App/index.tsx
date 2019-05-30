import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AppContainer from 'apps/ui/components/AppContainer';
import AppRoot from 'apps/ui/components/AppRoot';
import PdfDocument from 'apps/ui/components/PdfDocument';
import { IUserLocationReducer, IUserLocationActions } from 'apps/ui/interfaces/userLocation';
import { renderRoute } from 'homepage/routes';
import * as UserLocationActions from 'apps/ui/actions/UserLocationActions';
import Content from './Content';
import Header from './Header';
import Footer from './Footer';
import 'kute.js/kute-svg';
import 'homepage/App/style/settings.css';

interface IAppProps {
  userLocation: IUserLocationReducer;
  UserLocationActions: IUserLocationActions;
}

class App extends React.Component<IAppProps> {
  public componentDidMount() {
    this.props.UserLocationActions.init();
    this.props.UserLocationActions.fetchData();
  }

  public render() {
    const {
      countryCode,
      legalDocuments,
    } = this.props.userLocation.userLocation;

    if (countryCode) {
      return (
        <Router>
          <AppRoot>
            <AppContainer>
              <Header />
              <Content>
                <Switch>
                  {renderRoute('home')}
                  <Route
                    path="/cookie"
                    exact={true}
                    render={() => <PdfDocument src={legalDocuments && legalDocuments.cookies} />} />
                  <Route
                    path="/license"
                    exact={true}
                    render={() => <PdfDocument src={legalDocuments && legalDocuments.terms} />} />
                  <Route
                    path="/privacy"
                    exact={true}
                    render={() => <PdfDocument src={legalDocuments && legalDocuments.privacy} />} />
                  <Route
                    path="/scoring-policy"
                    exact={true}
                    render={() => <PdfDocument src={legalDocuments && legalDocuments.scoring} />} />
                  {renderRoute('error.404')}
                </Switch>
              </Content>
              <Footer />
            </AppContainer>
          </AppRoot>
        </Router>
      );
    }

    return null;
  }
}

function mapStateToProps(state) {
  return {
    userLocation: state.userLocation,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    UserLocationActions: bindActionCreators(UserLocationActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
