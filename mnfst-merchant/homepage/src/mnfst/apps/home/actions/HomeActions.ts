import { HOMEPAGE_INFO_URI, HOME_UPDATE_HOME_DETAILS, HOME_ADD_NAVIGATION_ITEM } from 'constants/home';
import { IHomeActionAddNavigationItem } from '../interfaces/home';
import { getLocalData } from 'apps/ui/utils/localization';
import request from 'apps/ui/utils/request';

export function fetchData() {
  return async(dispatch) => {
    try {
      const { data } = await request({
        method: 'GET',
        url: HOMEPAGE_INFO_URI,
      });

      const home = {
        total_earn: {
          currency_code: data.total_earn.currency,
          value: data.total_earn.cents,
        },
      };

      dispatch({
        type: HOME_UPDATE_HOME_DETAILS,
        payload: {
          home,
          status: null,
        },
      });
    }

    catch (error) {
      if (error.message) {
        const errors = {
          home: [getLocalData('ui.errors.internalServerError')],
        };

        dispatch({
          type: HOME_UPDATE_HOME_DETAILS,
          payload: {
            errors,
            status: 'error',
          },
        });
      }

      if (error.response) {
        const { status } = error.response;

        // Internal server error cases
        if (status === 404 || status === 500) {
          const errors = {
            home: [getLocalData('ui.errors.internalServerError')],
          };

          dispatch({
            type: HOME_UPDATE_HOME_DETAILS,
            payload: {
              errors,
              status: 'error',
            },
          });
        }
      }
    }
  };
}

export function addNavigationItem(params: IHomeActionAddNavigationItem) {
  const { id, elementNode } = params;

  return (dispatch) => {
    dispatch({
      type: HOME_ADD_NAVIGATION_ITEM,
      payload: { id, elementNode },
    });
  };
}

