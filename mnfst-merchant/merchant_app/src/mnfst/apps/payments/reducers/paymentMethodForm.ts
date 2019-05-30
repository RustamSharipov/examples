import PaymentMethodForm from 'apps/payments/models/PaymentMethodForm';
import { IPaymentMethodFormReducer, IPaymentMethodForm } from 'apps/payments/interfaces/paymentMethodForm';
import {
  PAYMENTS_METHOD_FORM_INIT,
  PAYMENTS_METHOD_FORM_UPDATE_FORM_FIELD,
  PAYMENTS_METHOD_FORM_UPDATE_RESPONSE,
  PAYMENTS_METHOD_FORM_ERROR,
  PAYMENTS_METHOD_FORM_PENDING,
  PAYMENTS_METHOD_FORM_SUCCESS,
  PAYMENTS_METHOD_FORM_WIRECARD_STATUS,
} from 'constants/payments';
import { updateForm } from 'utils/form';

const initialState: IPaymentMethodFormReducer = {
  errors: {},
  paymentMethodForm: new PaymentMethodForm(),
  status: null,
  token: null,
  wirecardFormStatus: null,
};

export default function paymentMethodForm(state= initialState, action) {
  switch (action.type) {
    case PAYMENTS_METHOD_FORM_INIT:
      const { countryCode } = action.payload;
      const paymentMethodForm = new PaymentMethodForm();

      if (countryCode) {
        paymentMethodForm.billing_address.country_code.value = countryCode;
      }

      return {
        ...state,
        paymentMethodForm,
        errors: {},
        status: null,
      };

    case PAYMENTS_METHOD_FORM_UPDATE_FORM_FIELD:
      return {
        ...state,
        paymentMethodForm: updateForm<IPaymentMethodForm>(state.paymentMethodForm, action.payload),
        errors: {},
        status: null,
      };

    case PAYMENTS_METHOD_FORM_WIRECARD_STATUS:
      return {
        ...state,
        wirecardFormStatus: action.payload || null,
      };

    case PAYMENTS_METHOD_FORM_UPDATE_RESPONSE:
      return {
        ...state,
        token: action.payload,
        errors: {},
        status: null,
      };

    case PAYMENTS_METHOD_FORM_PENDING:
      return {
        ...state,
        errors: {},
        status: 'pending',
      };

    case PAYMENTS_METHOD_FORM_SUCCESS:
      return {
        ...state,
        errors: {},
        status: 'created',
      };

    case PAYMENTS_METHOD_FORM_ERROR:
      return {
        ...state,
        errors: action.payload,
        status: 'error',
      };

    default:
      return state;
  }
}
