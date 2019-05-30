import { IPaymentAccountsReducer } from 'apps/payments/interfaces/paymentAccounts';
import {
  PAYMENTS_UPDATE_PAYMENT_METHODS,
  PAYMENTS_ACCOUNTS_FETCH_START,
  PAYMENTS_ACCOUNTS_UPDATE_DATA,
  PAYMENTS_ACCOUNTS_UPDATE_GATEWAY,
  PAYMENTS_ACCOUNTS_ERROR,
  PAYMENTS_ACCOUNTS_REMOVE_ACCOUNT,
  PAYMENTS_ACCOUNTS_MAKE_ACCOUNT_PRIMARY,
} from 'constants/payments';

const initialState: IPaymentAccountsReducer = {
  errors: {},
  gateway: null,
  paymentAccounts: [],
  status: null,
};

export default function paymentAccounts(state= initialState, action) {
  switch (action.type) {
    case PAYMENTS_UPDATE_PAYMENT_METHODS:
      return {
        ...state,
        ...action.payload,
      };

    case PAYMENTS_ACCOUNTS_FETCH_START:
      return {
        ...state,
        redirect: null,
        status: 'receiving',
      };

    case PAYMENTS_ACCOUNTS_UPDATE_DATA:
      return {
        ...state,
        paymentAccounts: action.payload,
        status: null,
      };

    case PAYMENTS_ACCOUNTS_UPDATE_GATEWAY:
      return {
        ...state,
        gateway: action.payload,
        status: null,
      };

    case PAYMENTS_ACCOUNTS_REMOVE_ACCOUNT:
      return {
        ...state,
        paymentAccounts: state.paymentAccounts.filter(paymentAccount => paymentAccount.id !== action.payload.id),
        status: null,
      };

    case PAYMENTS_ACCOUNTS_MAKE_ACCOUNT_PRIMARY:
      return {
        ...state,
        paymentAccounts: state.paymentAccounts.map(paymentAccount => paymentAccount.id === action.payload.id
          ? action.payload.data
          : {
            ...paymentAccount,
            is_default: false,
          },
        ),
        status: null,
      };

    case PAYMENTS_ACCOUNTS_ERROR:
      return {
        ...state,
        errors: action.payload,
        status: 'error',
      };

    default:
      return state;
  }
}
