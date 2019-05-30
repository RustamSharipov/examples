import { IBillingAddress } from 'apps/payments/interfaces/payments';
import { IFormErrors } from 'interfaces';

export interface IPaymentAccountPromoCode {
  promocode: string;
}

export interface IPaymentAccount {
  id: number;
  account_type: string;
  billing_address: IBillingAddress;
  brand: string;
  created_at: string;
  card_exp_date: string;
  is_default: boolean;
  is_deleted: boolean;
  is_verified: boolean;
  last_digits: string;
}

interface IStripeForm {
  amount: number;
  currency: string;
  email: string;
  key: string;
  name: string;
  url: string;
}

export interface IPaymentGateway {
  gateway: 'stripe' | 'wirecard';
  form_fields?: IStripeForm;
  form_url?: string;
}

export interface IPaymentAccountsReducer {
  errors: IFormErrors;
  gateway: IPaymentGateway | null;
  paymentAccounts: IPaymentAccount[];
  status: string | null;
}

export interface IPaymentMethodFormActionDeleteAccountParams {
  id: number;
}

export interface IPaymentMethodFormActionMakePrimaryParams {
  id: number;
}

export interface IPaymentAccountsActions {
  fetchData: () => void;
  fetchGateway: () => void;
  deleteAccount: (params: IPaymentMethodFormActionMakePrimaryParams) => void;
  makePrimary: (params: IPaymentMethodFormActionMakePrimaryParams) => void;
}
