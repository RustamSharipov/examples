import Head from 'next/head'
import { Provider } from 'mobx-react'
import { useTranslation, initReactI18next, I18nextProvider } from 'react-i18next'
import i18n from 'i18next'
import ICU from 'i18next-icu'

import i18nConfig from 'i18n'

import { GlobalStyle, Preloader, PlacesData } from '.'

import { initStore } from 'stores'

i18n
  .use(ICU)
  .use(initReactI18next)
  .init(i18nConfig)

const App = ({ Component, pageProps }) => {
  const [t] = useTranslation()
  const store = initStore()

  return (
    <Provider {...store}>
      <I18nextProvider i18n={i18n}>
        <PlacesData />

        <Head>
          <title>{t('Company.Name')}</title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <GlobalStyle />
        <Preloader />
        <Component {...pageProps} />
      </I18nextProvider>
    </Provider>
  )
}

export default App
