import moment from 'moment';
import queryString from 'query-string';
import { ERRORS_BASE } from 'constants/base';
import {
  PAYMENTS_UPDATE_PAYMENTS_HISTORY, PAYMENTS_UPDATE_PAYMENTS_DETAILS, PAYMENTS_LIST_ITEMS_PER_PAGE,
  PAYMENTS_URI_INVOICES, PAYMENTS_URI_TRANSACTIONS, PAYMENTS_URI_SPENDING_DETAILS,
} from 'constants/payments';
import {
  IPaymentsTransactionsActionUpdateDateParams, IPaymentsHistoryReducer, IPaymentsHistoryActionChangeHistoryTypeParams,
} from 'apps/payments/interfaces/paymentsHistory';
import { reduceFormErrors } from 'utils/form';
import request from 'utils/request';
import { IFormErrors } from 'interfaces';

export function init() {
  const qs = queryString.parse(location.search);
  const { history_type: type } = qs;
  const dateFrom = qs.from_date ? moment(qs.from_date).format() : moment().subtract(30, 'days').format();
  const dateTo = qs.to_date ? moment(qs.to_date).format() : moment().format();

  return (dispatch) => {
    dispatch({
      type: PAYMENTS_UPDATE_PAYMENTS_HISTORY,
      payload: {
        dateFrom,
        dateTo,
        ...(type && { type }),
        page: null,
      },
    });
  };
}

export function changeHistoryType(params: IPaymentsHistoryActionChangeHistoryTypeParams) {
  const { history, type } = params;

  return (dispatch, getState) => {
    const { dateFrom, dateTo, type: prevType }: IPaymentsHistoryReducer = getState().paymentsHistory;

    if (type !== prevType) {
      history.push({
        search: queryString.stringify({
          ...(type !== 'invoices' && { from_date: moment(dateFrom).format('YYYY-MM-DD') }),
          ...(type !== 'invoices' && { to_date: moment(dateTo).format('YYYY-MM-DD') }),
          history_type: type,
        }),
      });

      dispatch({
        type: PAYMENTS_UPDATE_PAYMENTS_HISTORY,
        payload: {
          type,
          page: null,
        },
      });
    }
  };
}

export function fetchData() {
  return async (dispatch, getState) => {
    const {
      dateFrom,
      dateTo,
      page,
      type,
    }: IPaymentsHistoryReducer = getState().paymentsHistory;

    let url;

    if (type === 'invoices') {
      url = PAYMENTS_URI_INVOICES;
    }
    if (type === 'spending-details') {
      url = PAYMENTS_URI_SPENDING_DETAILS;
    }
    if (type === 'transactions') {
      url = PAYMENTS_URI_TRANSACTIONS;
    }

    dispatch({
      type: PAYMENTS_UPDATE_PAYMENTS_HISTORY,
      payload: {
        ...((!page && type === 'transactions') && {
          transactions: [],
        }),
        ...((!page && type === 'invoices') && {
          invoices: [],
        }),
        ...((!page && type === 'spending-details') && {
          spendingDetails: [],
        }),
        status: page ? 'downloading' : 'receiving',
      },
    });

    const params = {
      ...(type !== 'invoices' && { from_date: moment(dateFrom).format('YYYY-MM-DD') }),
      ...(type !== 'invoices' && { to_date: moment(dateTo).format('YYYY-MM-DD') }),
      ...(type !== 'invoices' && { 'page[number]': page ? page + 1 : 1 }),
      'page[size]': type === 'invoices' ? 100 : PAYMENTS_LIST_ITEMS_PER_PAGE,
    };

    await request({
      url,
      params,
      method: 'GET',
    })
      .then((response) => {
        const {
          invoices: existingInvoices,
          spendingDetails: existingSpendingDetails,
          transactions: existingTransactions,
          type,
        }: IPaymentsHistoryReducer = getState().paymentsHistory;
        const { data: { data, meta: { current_page: page, total_pages: totalPages } }, status } = response;

        if (status === 200 && data) {
          const { invoices, transactions, spending_details, total } = data;
          dispatch({
            type: PAYMENTS_UPDATE_PAYMENTS_HISTORY,
            payload: {
              ...(type === 'transactions' && {
                transactions: [
                  ...existingTransactions,
                  ...transactions,
                ],
              }),
              ...(type === 'invoices' && {
                invoices: [
                  ...existingInvoices,
                  ...invoices,
                ],
              }),
              ...(type === 'spending-details' && {
                spendingDetails: [
                  ...existingSpendingDetails,
                  ...spending_details,
                ],
              }),
              page,
              totalPages,
              total,
              status: null,
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
            const errors: IFormErrors = reduceFormErrors(data.errors);
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
  };
}

export function updateDate(params: IPaymentsTransactionsActionUpdateDateParams) {
  const { history } = params;
  const dateFrom = moment(params.dateFrom).format();
  const dateTo = moment(params.dateTo).format();

  return (dispatch, getState) => {
    const { type }: IPaymentsHistoryReducer = getState().paymentsHistory;

    history.push({
      search: queryString.stringify({
        from_date: moment(dateFrom).format('YYYY-MM-DD'),
        to_date: moment(dateTo).format('YYYY-MM-DD'),
        history_type: type,
      }),
    });

    dispatch({
      type: PAYMENTS_UPDATE_PAYMENTS_HISTORY,
      payload: {
        dateFrom,
        dateTo,
        invoices: [],
        transactions: [],
        spendingDetails: [],
        page: null,
      },
    });
  };
}
