import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { HomeView, ProductsView, ProductView, NotFoundView } from 'views';

import theme from 'theme';
import routes from 'routes';

import resetCSS from './reset.css';
import globalCSS from './global.css';

const GlobalStyle = createGlobalStyle`
  ${resetCSS};
  ${globalCSS};
`;

export default () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />

    <Router>
      <Switch>
        <Redirect
          exact={routes.productDetails.exact}
          from={routes.productDetails.path}
          to={routes.products.getPath()}
        />

        <Route
          exact={routes.home.exact}
          path={routes.home.path}
          component={HomeView}
        />

        <Route
          exact={routes.products.exact}
          path={routes.products.path}
          component={ProductsView}
        />

        <Route
          exact={routes.productFullDetails.exact}
          path={routes.productFullDetails.path}
          component={ProductView}
        />

        <Route
          path="*"
          component={NotFoundView}
        />
      </Switch>
    </Router>
  </ThemeProvider>
);
