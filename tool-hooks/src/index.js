import React from 'react';
import ReactDOM from 'react-dom';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import smoothscroll from 'smoothscroll-polyfill';
import { ResizeObserver } from '@juggle/resize-observer';

import App from './App';

import i18nConfig from 'config/i18n';

if (!window.ResizeObserver) {
  window.ResizeObserver = ResizeObserver;
}

smoothscroll.polyfill();

i18n
  .use(initReactI18next)
  .init(i18nConfig);

window.i18n = i18n;

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>,
  document.getElementById('root'),
);
