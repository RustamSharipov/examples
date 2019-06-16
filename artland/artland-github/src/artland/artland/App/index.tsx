import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppContent from 'apps/base/components/AppContent';
import SearchForm from 'apps/repo/components/SearchForm';
import RepoDetailView from 'apps/repo/views/RepoDetailView';
import ReposIndexView from 'apps/repo/views/ReposIndexView';
import './style.css';

interface IAppState {
  queryString: string;
  userLogin: string | null;
}

export default class App extends React.Component<any, IAppState> {
  public state = {
    queryString: '',
    userLogin: null,
  };

  public render() {
    const { queryString, userLogin } = this.state;

    return (
      <Router>
        <AppContent>
          <Route
            path="*"
            render={({ history}) => (
              <SearchForm
                history={history}
                onChange={this.handleQueryChange} />
            )} />
          <Route
            path="/"
            render={() => (
              <ReposIndexView
                onUserSelect={this.handleUserSelect}
                queryString={queryString}
                userLogin={userLogin} />
            )}
            exact={true} />
          <Route
            path="/:userLogin/:repoName"
            component={RepoDetailView}
            exact={true} />
        </AppContent>
      </Router>
    );
  }

  private handleQueryChange = ({ queryString }) => {
    this.setState({
      queryString,
      userLogin: null,
    });
  }

  private handleUserSelect = ({ userLogin }) => {
    this.setState({ userLogin });
  }
}
