export interface IBillingAddress {
  address_line_1: string;
  address_line_2: string;
  city: string;
  country_code: string;
  state: string;
  zip_code: string;
}

export interface IPaymentsReducer {
  status: string | null;
  useCompanyAddress: boolean;
}

export interface IBillingActionFetchDataParams {
  id: number;
}

export interface IPaymentsActions {
  init: () => void;
  fetchData: (params: IBillingActionFetchDataParams) => void;
  fetchBankRequisits: () => void;
  pay: () => void;
}
