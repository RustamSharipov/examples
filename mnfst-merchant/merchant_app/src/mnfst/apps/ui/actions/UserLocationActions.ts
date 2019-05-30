import UserLocation from 'apps/ui/models/UserLocation';
import {
  USER_LOCATION_UPDATE_DATA, USER_LOCATION_ERROR, LEGAL_INFO_URI, USER_LOCATION_INIT, USER_LOCATION_UPDATE_LANG,
} from 'apps/ui/constants/userLocation';
import { IUserLocationActionChangeLanguage, IUserLocationReducer } from 'apps/ui/interfaces/userLocation';
import { getLocalData, getLangFromCountryCode, setLanguage, getCurrentLanguage } from 'apps/ui/utils/localization';
import request from 'apps/ui/utils/request';
import { IUserReducer } from 'apps/users/interfaces/user';

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
  return async(dispatch, getState) => {
    const { merchant }: IUserReducer = getState().user;
    try {
      const {
        data: {
          address: companyAddress,
          bank_requisites,
          company_address: beneficiaryAddress,
          company_name: companyName,
          company_number: companyNumber,
          country_code: countryCode,
          cookies,
          gateway,
          privacy,
          scoring,
          terms,
        },
      } = await request({
        method: 'GET',
        params: merchant && merchant.country_code && { country_code: merchant.country_code },
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
        beneficiaryAddress,
        companyAddress,
        companyName,
        companyNumber,
        countryCode,
        gateway,
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
