import Cookie from 'js-cookie';
import { LS_LANG_KEY } from 'apps/ui/constants/base';
import messages from 'localization';

const DEFAULT_LANG = 'en';

interface ILocalStringPlaceholders {
  [name: string]: any;
}

interface IGetLocalDataParams {
  lang?: string;
  placeholders?: ILocalStringPlaceholders | any[];
}

export function getLocalData(key: string, params?: IGetLocalDataParams): any {
  const pathNameParts = location.pathname.split('/');
  const localLang = pathNameParts && pathNameParts[1];
  const langKeyFromStorage = Cookie.get(LS_LANG_KEY);
  const languageData = langKeyFromStorage && getLanguages()
    .filter(language => language.lang === langKeyFromStorage)[0];
  const langFromStorage = languageData && languageData.lang;
  const actualLang = localLang || params && params.lang || langFromStorage || DEFAULT_LANG;
  const searchRoutes = key.split('.');
  const messagesForLanguage = messages[actualLang];
  const messagesForDefaultLanguage = messages[DEFAULT_LANG];

  let targetString = findString(searchRoutes, messagesForLanguage)
    || findString(searchRoutes, messagesForDefaultLanguage);

  if (targetString && params && params.placeholders) {
    if (Array.isArray(params.placeholders)) {
      params.placeholders.forEach((value, key) => {
        targetString = targetString.replace('${[' + key + ']}', value).replace('${' + key + '}', value);
      });
    }
    else {
      Object.entries(params.placeholders).forEach(([key, value]) => {
        targetString = targetString.replace('${' + key + '}', value).replace('${' + key + '}', value);
      });
    }
  }

  return targetString || null;
}

export function getLanguages() {
  return Object.entries(messages).map(([lang, { language: { name } }]) => ({ lang, name }));
}

export function getCurrentLanguage(): string {
  return Cookie.get(LS_LANG_KEY);
}

export function setLanguage(lang: string) {
  Cookie.set(LS_LANG_KEY, lang, { domain: process.env.REACT_APP_BASE_DOMAIN });
}

function findString(searchRoutes: string[], messages) {
  const match = searchRoutes.reduce(
    (result, routeName) => {
      if (result) {
        return result[routeName];
      }
    },
    messages,
  );

  return match;
}

export function localizeString(str: string): string {
  return str;
}

export function getLangFromCountryCode(countryCode: string): string {
  let lang = 'en';

  if (countryCode.toLowerCase() === 'pl') {
    lang = 'pl';
  }
  if (countryCode.toLowerCase() === 'ru') {
    lang = 'ru';
  }

  return lang;
}
