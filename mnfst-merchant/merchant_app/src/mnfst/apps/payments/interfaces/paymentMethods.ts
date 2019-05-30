export interface IPaymentMethod {
  card_cvc: number;
  card_exp_month: string;
  card_holder: string;
  card_number: string;
  // email: string;
  ref_number: string;
  use_company_address: boolean;
}
