import React from 'react';
import { Route } from 'react-router-dom';
import HomeIndexView from 'apps/home/views/HomeIndexView';
import NotFound from 'apps/ui/components/NotFound';

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
    component: HomeIndexView,
    isExact: true,
    path: '/',
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

export const renderRoute = (routeName: string) => {
  const route = routes[routeName];

  if (route) {
    const { component, isExact, path, render } = route;

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
