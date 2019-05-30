import UserLocation from 'apps/ui/models/UserLocation';
import {
  USER_LOCATION_UPDATE_DATA, USER_LOCATION_ERROR, LEGAL_INFO_URI, USER_LOCATION_INIT, USER_LOCATION_UPDATE_LANG,
} from 'apps/ui/constants/userLocation';
import { IUserLocationActionChangeLanguage, IUserLocationReducer } from 'apps/ui/interfaces/userLocation';
import { getLocalData, getLangFromCountryCode, setLanguage, getCurrentLanguage } from 'apps/ui/utils/localization';
import request from 'apps/ui/utils/request';

export function changeLanguage(params: IUserLocationActionChangeLanguage) {
  const { lang } = params;
  setLanguage(lang);

  return (dispatch, getState) => {
    const { userLocation }: IUserLocationReducer = getState().userLocation;
    userLocation.lang = lang;

    dispatch({
      type: USER_LOCATION_UPDATE_LANG,
      payload: lang,
    });
  };
}

export function init() {
  return (dispatch) => {
    dispatch({
      type: USER_LOCATION_INIT,
    });
  };
}

export function fetchData() {
  return async(dispatch) => {
    try {
      const {
        data: {
          address: companyAddress,
          bank_requisites,
          country_code: countryCode,
          cookies,
          privacy,
          scoring,
          terms,
        },
      } = await request({
        method: 'GET',
        url: LEGAL_INFO_URI,
      });

      let lang: string;

      if (getCurrentLanguage()) {
        lang = getCurrentLanguage();
      }
      else {
        lang = getLangFromCountryCode(countryCode);
        setLanguage(lang);
      }

      const legalDocuments = {
        cookies,
        privacy,
        scoring,
        terms,
      };

      const userLocation = new UserLocation({
        bank_requisites,
        companyAddress,
        countryCode,
        lang,
        legalDocuments,
      });

      dispatch({
        type: USER_LOCATION_UPDATE_DATA,
        payload: userLocation,
      });
    }

    catch (error) {
      if (error.message) {
        const errors = {
          userLocation: [getLocalData('ui.errors.internalServerError')],
        };

        dispatch({
          type: USER_LOCATION_ERROR,
          payload: {
            errors,
            country_code: 'GB',
            lang: getCurrentLanguage(),
          },
        });
      }

      if (error.response) {
        const { status } = error.response;

        // Internal server error cases
        if (status === 404 || status === 500) {
          const errors = {
            userLocation: [getLocalData('ui.errors.internalServerError')],
          };

          dispatch({
            type: USER_LOCATION_ERROR,
            payload: {
              errors,
              country_code: 'GB',
              lang: getCurrentLanguage(),
            },
          });
        }
      }
    }
  };
}
