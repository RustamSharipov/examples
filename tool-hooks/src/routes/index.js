function pathWithEnvVar(path) {
  return [
    process.env.REACT_APP_ROOT || '',
    path,
  ].join('').replace('//', '/');
}

class Route {
  constructor({ exact, path, isView = false }) {
    this.exact = exact;
    this.isView = isView;
    this.path = pathWithEnvVar(path);
    this.getPath = function(params={}) {
      return Object.entries(params).reduce(
        (result, [key, value]) => result.replace(`:${key}`, value),
        this.path,
      );
    }
  }
};

export default {
  home: new Route({
    exact: true,
    path: '/',
    isView: true,
  }),

  products: new Route({
    exact: true,
    path: '/products',
    isView: true,
  }),

  productDetails: new Route({
    exact: true,
    path: '/products/:model',
    isView: true,
  }),

  productFullDetails: new Route({
    exact: true,
    path: '/products/:model/:modification',
  }),
};
