import {
  USER_LOCATION_UPDATE_DATA, USER_LOCATION_INIT, MNFST_LEGAL_ADDRESS, USER_LOCATION_UPDATE_LANG, USER_LOCATION_ERROR,
} from 'apps/ui/constants/userLocation';
import { IUserLocationReducer } from 'apps/ui/interfaces/userLocation';
import UserLocation from 'apps/ui/models/UserLocation';

const initialState: IUserLocationReducer = {
  status: null,
  userLocation: {},
};

export default function userLocation(state = initialState, action) {
  switch (action.type) {
    case USER_LOCATION_INIT:
      return {
        ...state,
        userLocation: new UserLocation({
          companyAddress: MNFST_LEGAL_ADDRESS,
        }),
        status: 'receiving',
      };

    case USER_LOCATION_UPDATE_DATA:
      return {
        ...state,
        userLocation: action.payload,
        status: null,
      };

    case USER_LOCATION_UPDATE_LANG:
      return {
        ...state,
        userLocation: {
          ...state.userLocation,
          lang: action.payload,
        },
        status: null,
      };

    case USER_LOCATION_ERROR:
      const { country_code, errors, lang } = action.payload;

      return {
        ...state,
        country_code,
        errors,
        lang,
        status: 'error',
      };

    default:
      return state;
  }
}
