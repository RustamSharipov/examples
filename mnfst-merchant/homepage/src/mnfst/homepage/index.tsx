import React from 'react';
import ReactDOM from 'react-dom';
import smoothscroll from 'smoothscroll-polyfill';
import { Provider } from 'react-redux';
import TagManager from 'react-gtm-module';
import { GTM_ID } from 'apps/ui/constants/base';
import configureStore from './store';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

const tagManagerArgs = {
  gtmId: GTM_ID,
};

TagManager.initialize(tagManagerArgs);

smoothscroll.polyfill();

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app') as HTMLElement,
);

registerServiceWorker();
