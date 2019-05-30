export const PAYMENTS_INIT = 'PAYMENTS_INIT';
export const PAYMENTS_UPDATE_PAYMENTS_DETAILS = 'PAYMENTS_UPDATE_PAYMENTS_DETAILS';
export const PAYMENTS_UPDATE_PAYMENTS_HISTORY = 'PAYMENTS_UPDATE_PAYMENTS_HISTORY';
export const PAYMENTS_UPDATE_PAYMENT_METHODS_FORM = 'PAYMENTS_UPDATE_PAYMENT_METHODS_FORM';
export const PAYMENTS_UPDATE_PAYMENT_METHODS = 'PAYMENTS_UPDATE_PAYMENT_METHODS';
export const PAYMENTS_METHOD_FORM_UPDATE_RESPONSE = 'PAYMENTS_METHOD_FORM_UPDATE_RESPONSE';
export const PAYMENTS_METHOD_FORM_PENDING = 'PAYMENTS_METHOD_FORM_PENDING';
export const PAYMENTS_METHOD_FORM_SUCCESS = 'PAYMENTS_METHOD_FORM_SUCCESS';
export const PAYMENTS_METHOD_FORM_WIRECARD_STATUS = 'PAYMENTS_METHOD_FORM_WIRECARD_STATUS';

export const PAYMENTS_ACCOUNTS_FETCH_START = 'PAYMENTS_ACCOUNTS_FETCH_START';
export const PAYMENTS_ACCOUNTS_UPDATE_DATA = 'PAYMENTS_ACCOUNTS_UPDATE_DATA';
export const PAYMENTS_ACCOUNTS_UPDATE_GATEWAY = 'PAYMENTS_ACCOUNTS_UPDATE_GATEWAY';
export const PAYMENTS_ACCOUNTS_ERROR = 'PAYMENTS_ACCOUNTS_ERROR';
export const PAYMENTS_ACCOUNTS_REMOVE_ACCOUNT = 'PAYMENTS_ACCOUNTS_REMOVE_ACCOUNT';
export const PAYMENTS_ACCOUNTS_MAKE_ACCOUNT_PRIMARY = 'PAYMENTS_ACCOUNTS_MAKE_ACCOUNT_PRIMARY';

export const PAYMENTS_METHOD_FORM_INIT = 'PAYMENTS_METHOD_FORM_INIT';
export const PAYMENTS_METHOD_FORM_UPDATE_FORM_FIELD = 'PAYMENTS_METHOD_FORM_UPDATE_FORM_FIELD';
export const PAYMENTS_METHOD_FORM_ERROR = 'PAYMENTS_METHOD_FORM_ERROR';

export const PAYMENTS_URI_PAYMENT_ACCOUNTS = '/api/merchants/v1/payment_accounts';
export const PAYMENTS_URI_PAYMENT_ACCOUNT = '/api/merchants/v1/payment_accounts/:id';
export const PAYMENTS_URI_PAYMENT_ADD_ACCOUNT = '/api/merchants/v1/payment_accounts/:account_type';
export const PAYMENTS_URI_ACCOUNT_MAKE_DEFAULT = '/api/merchants/v1/payment_accounts/:id/make_default';
export const PAYMENTS_URI_TRANSACTIONS = '/api/merchants/v1/transactions';
export const PAYMENTS_URI_INVOICES = '/api/merchants/v1/invoices';
export const PAYMENTS_URI_SPENDING_DETAILS = '/api/merchants/v1/spending_details';
export const PAYMENTS_URI_GATEWAY = '/api/merchants/v1/payment_accounts/gateway';
export const PAYMENTS_URI_PAYMENT_METHOD_CHECK = '/api/merchants/v1/payment_accounts/check';
export const PAYMENTS_URI_WIRECARD_PROCESS = '/api/merchants/v1/payment_accounts/wirecard_payment_method';

export const PAYMENTS_PAYMENT_METHODS = {
  banktransfer: 'Bank transfer',
  creditcard: 'Credit card',
  paypal: 'PayPal',
  promocode: 'Promo code',
};

export const PAYMENTS_CREDITCARDS_PROVIDERS = {
  amex: 'American Express',
  mastercard: 'Mastercard',
  visa: 'Visa',
};

export const PAYMENTS_ERRORS = {
  CARD_NUMBER_REQUIRED: 'Card number required',
  CARD_HOLDER_REQUIRED: 'Card holder required',
  CARD_CVC_REQUIRED: 'CVC/CVV required',
  CARD_EXPIRE_DATE_REQUIRED: 'Expire date required',
  ADDRESS_REQUIRED: 'You need to fill address',
  CITY_REQUIRED: 'City is required',
  COUNTRY_REQUIRED: 'You need to select you\'r country',
  ZIPCODE_REQUIRED: 'Zip code is required',
  NO_PAYMENT_METHODS_AVAILABLE: 'No payment methods available',
};

export const PAYMENTS_LIST_ITEMS_PER_PAGE = 20;
export const PAYMENTS_BILLING_LIMIT = 10 * 100;
