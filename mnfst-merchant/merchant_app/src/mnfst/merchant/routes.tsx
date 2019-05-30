import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import IndexView from 'apps/landing/views/LandingIndexView';
import ProfileView from 'apps/users/views/ProfileView';
import PaymentsView from 'apps/payments/views/PaymentsView';
import CampaignsIndexView from 'apps/campaigns/views/CampaignsIndexView';
import CampaignDetailsView from 'apps/campaigns/views/CampaignDetailsView';
import CampaignEditView from 'apps/campaigns/views/CampaignEditView';
import CampaignStaticPageView from 'apps/campaigns/views/CampaignStaticPageView';
import LoginView from 'apps/users/views/LoginView';
import RegistrationView from 'apps/users/views/RegistrationView';
import PasswordResetView from 'apps/users/views/PasswordResetView';
import PasswordChangeView from 'apps/users/views/PasswordChangeView';
import StreamView from 'apps/stream/views/StreamView';
import NotFound from './App/NotFound';

interface IRoute {
  component?: React.ReactNode;
  getPath: (id?: string | number, action?: string) => string;
  isExact?: boolean;
  isAuth?: boolean;
  isUnauth?: boolean;
  path: string;
  render?: (props?: any) => void;
}

interface IRoutes {
  [name: string]: IRoute;
}

export const routes: IRoutes = {
  home: {
    component: IndexView,
    isExact: true,
    path: '/',
    getPath() {
      return this.path;
    },
  },
  profile: {
    component: ProfileView,
    isExact: true,
    isAuth: true,
    path: '/profile',
    getPath() {
      return this.path;
    },
  },
  billing: {
    component: PaymentsView,
    isExact: true,
    isAuth: true,
    path: '/billing',
    getPath() {
      return this.path;
    },
  },
  campaigns: {
    component: CampaignsIndexView,
    isExact: true,
    isAuth: true,
    path: '/campaigns',
    getPath() {
      return this.path;
    },
  },
  'campaigns.new': {
    component: CampaignEditView,
    isExact: true,
    isAuth: true,
    path: '/campaigns/new',
    getPath() {
      return this.path;
    },
  },
  'campaigns.details': {
    component: CampaignDetailsView,
    isExact: true,
    isAuth: true,
    path: '/campaigns/:id',
    getPath(id: string) {
      return this.path.replace(':id', id);
    },
  },
  'campaigns.edit': {
    isExact: true,
    isAuth: true,
    path: '/campaigns/:id/edit',
    getPath(id: string) {
      return this.path.replace(':id', id);
    },
    render: props => (
      <CampaignEditView
        {...props}
        isCampaignExist={true} />
    ),
  },
  'campaigns.copy': {
    isExact: true,
    isAuth: true,
    path: '/campaigns/:id/copy',
    getPath(id: string) {
      return this.path.replace(':id', id);
    },
    render: props => (
      <CampaignEditView
        {...props}
        isCopy={true}
        isCampaignExist={true} />
    ),
  },
  'campaigns.action': {
    isExact: true,
    isAuth: true,
    path: '/campaigns/:id/:action',
    getPath(id: string, action: string) {
      return this.path
        .replace(':id', id)
        .replace(':action', action);
    },
    render: props => (
      <CampaignEditView
        {...props}
        isCopy={true}
        isCampaignExist={true} />
    ),
  },
  'campaigns.faq': {
    component: CampaignStaticPageView,
    isExact: true,
    isAuth: true,
    path: '/campaigns/faq/:slug',
    getPath(slug: string) {
      return this.path.replace(':slug', slug);
    },
  },
  login: {
    component: LoginView,
    isExact: true,
    isUnauth: true,
    path: '/login',
    getPath() {
      return this.path;
    },
  },
  registration: {
    component: RegistrationView,
    isExact: true,
    isUnauth: true,
    path: '/register',
    getPath() {
      return this.path;
    },
  },
  changePassword: {
    component: PasswordResetView,
    isExact: true,
    isUnauth: true,
    path: '/change-password',
    getPath() {
      return this.path;
    },
  },
  resetPassword: {
    component: PasswordChangeView,
    isExact: true,
    isUnauth: true,
    path: '/reset-password',
    getPath() {
      return this.path;
    },
  },
  stream: {
    component: StreamView,
    isExact: true,
    isAuth: true,
    path: '/stream',
    getPath() {
      return this.path;
    },
  },
  'error.404': {
    component: NotFound,
    path: '*',
    getPath() {
      return this.path;
    },
  },
};

export const renderRoute = (routeName: string, isLoggedIn?: boolean) => {
  const route = routes[routeName];

  if (route) {
    const { component, isExact, path, render } = route;
    const needAuth = route.isAuth && !isLoggedIn;
    const needRedirectToCampaignsIndex = route.isUnauth && isLoggedIn;

    if (needAuth) {
      return (
        <Route
          path={path}
          exact={true}
          component={LoginView} />
      );
    }

    if (needRedirectToCampaignsIndex) {
      return (
        <Redirect to={routes.campaigns.getPath()} />
      );
    }

    return (
      <Route
        path={path}
        exact={isExact}
        component={component}
        render={render} />
    );
  }

  return null;
};
