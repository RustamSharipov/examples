import { IFormField, IFormErrors, IFormTarget } from 'interfaces';
import { IBillingAddressFields } from 'apps/payments/interfaces/billingForm';
import { IBillingAddress } from 'apps/payments/interfaces/payments';

export interface IPaymentAccountsPromoCodeFields {
  promocode: IFormField<string>;
}

export interface IPaymentMethodForm {
  billing_address: IBillingAddressFields;
}

export interface IPaymentMethodFormPayload {
  billing_address: IBillingAddress;
}

export interface IPaymentMethodFormReducer {
  errors: IFormErrors;
  paymentMethodForm: IPaymentMethodForm;
  status: string | null;
  token: any | null;
  wirecardFormStatus: string | null;
}

export interface IPaymentMethodFormActionSubmit {
  gateway: 'stripe' | 'wirecard';
  useCompanyAddressAsBillingAddress: boolean;
}

export interface IPaymentMethodFormActionUpdateToken {
  response: any;
}

export interface IPaymentMethodFormActionFetchWirecardConnectionStatus {
  requestId: string;
}

export interface IPaymentMethodFormActions {
  init: () => void;
  fetchWirecardConnectionStatus: (params: IPaymentMethodFormActionFetchWirecardConnectionStatus) => void;
  submit: (params: IPaymentMethodFormActionSubmit) => void;
  updateFormField: (target: IFormTarget) => void;
  updateResponse: (params: IPaymentMethodFormActionUpdateToken) => void;
}
