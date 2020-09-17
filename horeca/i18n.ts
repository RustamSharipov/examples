import en from 'i18next-icu/locale-data/en'

import translation from 'translation'

export default {
  resources: translation,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  i18nFormat: {
    localeData: en,
    formats: {
      number: {
        RUB: {
          style: 'currency',
          currency: 'RUB',
          unit: '₽',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        },
        EUR: {
          style: 'currency',
          currency: 'EUR',
          unit: '€',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        },
        USD: {
          style: 'currency',
          currency: 'USD',
          unit: '$',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        },
      },
    },
  },
}
