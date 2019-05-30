export interface ILegalDocuments {
  [name: string]: string;
}

export interface IBankRequisites {
  account_number?: string;
  bank?: string;
  beneficiary?: string;
  beneficiary_address?: string;
  bic?: string;
  company_number?: string;
  iban?: string;
  sort_code?: string;
}

export interface IUserLocation {
  bank_requisites?: IBankRequisites;
  beneficiaryAddress?: string | null;
  companyAddress?: string | null;
  companyName?: string | null;
  companyNumber?: string | null;
  countryCode?: string | null;
  gateway?: 'stripe' | 'wirecard';
  lang?: string | null;
  legalDocuments?: ILegalDocuments;
}

export interface IUserLocationReducer {
  status: string | null;
  userLocation: IUserLocation;
}

export interface IUserLocationActionChangeLanguage {
  lang: string;
}

export interface IUserLocationActions {
  changeLanguage: (params: IUserLocationActionChangeLanguage) => void;
  fetchData: () => void;
  init: () => void;
}
