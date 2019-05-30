import {
  PAYMENTS_URI_GATEWAY,
  PAYMENTS_URI_PAYMENT_ACCOUNTS,
  PAYMENTS_URI_ACCOUNT_MAKE_DEFAULT,
  PAYMENTS_URI_PAYMENT_ACCOUNT,
  PAYMENTS_ACCOUNTS_FETCH_START,
  PAYMENTS_ACCOUNTS_UPDATE_DATA,
  PAYMENTS_ACCOUNTS_ERROR,
  PAYMENTS_ACCOUNTS_REMOVE_ACCOUNT,
  PAYMENTS_ACCOUNTS_MAKE_ACCOUNT_PRIMARY,
  PAYMENTS_ACCOUNTS_UPDATE_GATEWAY,
} from 'constants/payments';
import {
  IPaymentMethodFormActionMakePrimaryParams, IPaymentMethodFormActionDeleteAccountParams,
} from 'apps/payments/interfaces/paymentAccounts';
import { reduceFormErrors } from 'utils/form';
import request from 'utils/request';
import { getLocalData } from 'apps/ui/utils/localization';

export function fetchData() {
  return async(dispatch) => {
    dispatch({
      type: PAYMENTS_ACCOUNTS_FETCH_START,
    });

    try {
      const {
        data: { data },
        status,
      } = await request({
        method: 'GET',
        url: PAYMENTS_URI_PAYMENT_ACCOUNTS,
      });

      const paymentAccounts = data.payment_accounts;
      if (status === 200 && data) {
        dispatch({
          type: PAYMENTS_ACCOUNTS_UPDATE_DATA,
          payload: paymentAccounts,
        });
      }
    }

    catch (error) {
      let errors;

      if (error.message) {
        errors = {
          paymentsAccounts: [getLocalData('ui.errors.internalServerError')],
        };
      }

      if (error.response) {
        const { data = {}, status } = error.response;

        // Return validation errors (server validation)
        if (status === 400 || status === 401) {
          errors = reduceFormErrors(data.errors);
        }

        // Internal server error cases
        if (status === 404 || status === 500) {
          errors = {
            paymentsAccounts: [getLocalData('ui.errors.internalServerError')],
          };
        }
      }

      dispatch({
        type: PAYMENTS_ACCOUNTS_ERROR,
        payload: errors,
      });
    }
  };
}

export function fetchGateway() {
  return async(dispatch) => {
    try {
      const frameAncestor = `${location.protocol}//${location.host}`;
      const { data } = await request({
        method: 'GET',
        url: `${PAYMENTS_URI_GATEWAY}?mode=seamless&frame_ancestor=${frameAncestor}`,
      });

      dispatch({
        type: PAYMENTS_ACCOUNTS_UPDATE_GATEWAY,
        payload: data,
      });
    }

    catch (error) {
      let errors;

      if (error.message) {
        errors = {
          paymentsAccounts: [getLocalData('ui.errors.internalServerError')],
        };
      }

      if (error.response) {
        const { data = {}, status } = error.response;

        // Return validation errors (server validation)
        if (status === 400 || status === 401) {
          errors = reduceFormErrors(data.errors);
        }

        // Internal server error cases
        if (status === 404 || status === 500) {
          errors = {
            paymentsAccounts: [getLocalData('ui.errors.internalServerError')],
          };
        }
      }

      dispatch({
        type: PAYMENTS_ACCOUNTS_ERROR,
        payload: errors,
      });
    }
  };
}

export function deleteAccount(params: IPaymentMethodFormActionDeleteAccountParams) {
  const { id } = params;

  return async(dispatch) => {
    try {
      const { status } = await request({
        url: PAYMENTS_URI_PAYMENT_ACCOUNT.replace(':id', String(id)),
        method: 'DELETE',
      });

      if (status === 200) {
        dispatch({
          type: PAYMENTS_ACCOUNTS_REMOVE_ACCOUNT,
          payload: { id },
        });
      }
    }

    catch (error) {
      let errors;

      if (error.message) {
        errors = {
          paymentsAccounts: [getLocalData('ui.errors.internalServerError')],
        };
      }

      if (error.response) {
        const { data = {}, status } = error.response;

        // Return validation errors (server validation)
        if (status === 400 || status === 401) {
          errors = reduceFormErrors(data.errors);
        }

        // Internal server error cases
        if (status === 404 || status === 500) {
          errors = {
            paymentsAccounts: [getLocalData('ui.errors.internalServerError')],
          };
        }
      }

      dispatch({
        type: PAYMENTS_ACCOUNTS_ERROR,
        payload: errors,
      });
    }
  };
}

export function makePrimary(params: IPaymentMethodFormActionMakePrimaryParams) {
  const { id } = params;

  return async(dispatch) => {
    try {
      const { data, status } = await request({
        url: PAYMENTS_URI_ACCOUNT_MAKE_DEFAULT.replace(':id', String(id)),
        method: 'PATCH',
      });

      if (status === 200 && data) {
        dispatch({
          type: PAYMENTS_ACCOUNTS_MAKE_ACCOUNT_PRIMARY,
          payload: { id, data },
        });
      }
    }

    catch (error) {
      let errors;

      if (error.message) {
        errors = {
          paymentsAccounts: [getLocalData('ui.errors.internalServerError')],
        };
      }

      if (error.response) {
        const { data = {}, status } = error.response;

        // Return validation errors (server validation)
        if (status === 400 || status === 401) {
          errors = reduceFormErrors(data.errors);
        }

        // Internal server error cases
        if (status === 404 || status === 500) {
          errors = {
            paymentsAccounts: [getLocalData('ui.errors.internalServerError')],
          };
        }
      }

      dispatch({
        type: PAYMENTS_ACCOUNTS_ERROR,
        payload: errors,
      });
    }
  };
}
