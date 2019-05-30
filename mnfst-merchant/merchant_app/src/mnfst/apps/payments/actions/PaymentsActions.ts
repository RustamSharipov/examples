import { ERRORS_BASE } from 'constants/base';
import {
  PAYMENTS_INIT,
  PAYMENTS_UPDATE_PAYMENTS_DETAILS,
  PAYMENTS_URI_TRANSACTIONS,
  PAYMENTS_ERRORS,
  PAYMENTS_UPDATE_PAYMENTS_HISTORY,
} from 'constants/payments';
import { reduceFormErrors } from 'utils/form';
import request from 'utils/request';
import { IPaymentAccountsReducer, IPaymentAccount } from 'apps/payments/interfaces/paymentAccounts';
import { IPaymentsHistoryReducer } from 'apps/payments/interfaces/paymentsHistory';

export function init() {
  return (dispatch, getState) => {
    const {
      merchant: {
        address_line_1,
        city,
        country_code,
        zip_code,
      },
    } = getState().user;
    const useCompanyAddress = !!address_line_1 && !!city && !!country_code && !!zip_code;

    dispatch({
      type: PAYMENTS_INIT,
      payload: {
        useCompanyAddress,
      },
    });
  };
}

export function pay() {
  return async(dispatch, getState) => {
    const { paymentAccounts }: IPaymentAccountsReducer = getState().paymentAccounts;
    const paymentAccount: IPaymentAccount | null = paymentAccounts
      ? paymentAccounts.filter(account => account.is_default)[0]
      : null;

    if (paymentAccount) {
      dispatch({
        type: PAYMENTS_UPDATE_PAYMENTS_DETAILS,
        payload: {
          redirect: null,
          status: 'pending',
        },
      });

      await request({
        method: 'POST',
        data: {
          payment_account_id: paymentAccount.id,
        },
        url: PAYMENTS_URI_TRANSACTIONS,
      })

        .then((response) => {
          const { data, status } = response;
          const { transactions: prevTransactions }: IPaymentsHistoryReducer = getState().paymentsHistory;

          if (status === 200 && data) {
            dispatch({
              type: PAYMENTS_UPDATE_PAYMENTS_DETAILS,
              payload: {
                status: 'created',
              },
            });

            dispatch({
              type: PAYMENTS_UPDATE_PAYMENTS_HISTORY,
              payload: {
                transactions: [
                  data,
                  ...prevTransactions,
                ],
              },
            });
          }
        })

        .catch((error= {}) => {
          if (error.message) {
            const errors = {
              payments: [ERRORS_BASE.INTERNAL_SERVER_ERROR],
            };
            dispatch({
              type: PAYMENTS_UPDATE_PAYMENTS_DETAILS,
              payload: {
                errors,
                status: 'error',
              },
            });
          }

          if (error.response) {
            const { data= {}, status } = error.response;

            // Return validation errors (server validation)
            if (status === 400 || status === 401) {
              const errors = reduceFormErrors(data.errors);
              dispatch({
                type: PAYMENTS_UPDATE_PAYMENTS_DETAILS,
                payload: {
                  errors,
                  status: 'error',
                },
              });
            }

            // Internal server error cases
            if (status === 404 || status === 500) {
              const errors = {
                payments: [ERRORS_BASE.INTERNAL_SERVER_ERROR],
              };
              dispatch({
                type: PAYMENTS_UPDATE_PAYMENTS_DETAILS,
                payload: {
                  errors,
                  status: 'error',
                },
              });
            }
          }
        });
    }

    else {
      const errors = {
        payments: [PAYMENTS_ERRORS.NO_PAYMENT_METHODS_AVAILABLE],
      };

      dispatch({
        type: PAYMENTS_UPDATE_PAYMENTS_DETAILS,
        payload: {
          errors,
          status: 'error',
        },
      });
    }
  };
}
