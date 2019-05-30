import moment from 'moment';
import { PAYMENTS_UPDATE_PAYMENTS_HISTORY } from 'constants/payments';
import { IPaymentsHistoryReducer } from 'apps/payments/interfaces/paymentsHistory';

const initialState: IPaymentsHistoryReducer = {
  dateFrom: moment().subtract(1, 'month').format(),
  dateTo: moment().format(),
  page: null,
  totalPages: 0,
  invoices: [],
  transactions: [],
  spendingDetails: [],
  status: 'receiving',
  type: 'transactions',
  total: null,
};

export default function paymentsHistory(state= initialState, action) {
  switch (action.type) {
    case PAYMENTS_UPDATE_PAYMENTS_HISTORY:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
