import { PAYMENTS_INIT, PAYMENTS_UPDATE_PAYMENTS_DETAILS } from 'constants/payments';
import { IPaymentsReducer } from 'apps/payments/interfaces/payments';

const initialState: IPaymentsReducer = {
  status: null,
  useCompanyAddress: false,
};

export default function payments(state= initialState, action) {
  switch (action.type) {
    case PAYMENTS_INIT:
      return {
        ...state,
        ...action.payload,
      };

    case PAYMENTS_UPDATE_PAYMENTS_DETAILS:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
