import { IFormField } from 'interfaces';

export interface IBillingAddressFields {
  address_line_1: IFormField<string>;
  address_line_2: IFormField<string>;
  city: IFormField<string>;
  country_code: IFormField<string>;
  state: IFormField<string>;
  zip_code: IFormField<string>;
}
