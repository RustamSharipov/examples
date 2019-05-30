export const AUTH_USER = 'AUTH_USER';
export const UPDATE_LOGIN_FORM = 'UPDATE_LOGIN_FORM';
export const UPDATE_REGISTRATION_FORM = 'UPDATE_REGISTRATION_FORM';
export const REMOVE_LOGIN_FORM_ERRORS = 'REMOVE_LOGIN_FORM_ERRORS';
export const REMOVE_REGISTRATION_FORM_ERRORS = 'REMOVE_REGISTRATION_FORM_ERRORS';
export const AUTH_SWITCH_FORM = 'AUTH_SWITCH_FORM';
export const SIGN_OUT = 'SIGN_OUT';
export const USER_PROFILE_FETCHING_STATUS = 'USER_PROFILE_FETCHING_STATUS';
export const UPDATE_PROFILE_FORM = 'UPDATE_PROFILE_FORM';
export const UPDATE_PASSWORD_RESET_FORM = 'UPDATE_PASSWORD_RESET_FORM';
export const UPDATE_PASSWORD_CHANGE_FORM = 'UPDATE_PASSWORD_CHANGE_FORM';

export const USERS_URI_USER_LOGIN = '/api/merchants/v1/sign_in';
export const USERS_URI_USER_LOGOUT = '/api/merchants/v1/sign_out';
export const USERS_URI_USER_REGISTRATION = '/api/merchants/v2/sign_up';
export const USERS_URI_USER_PROFILE = '/api/merchants/v1/profile';
export const USERS_URI_PASSWORD = '/api/merchants/v1/password';
export const USERS_URI_CURRENCIES = '/api/merchants/v1/countries/:country_code/currency';

export const ERRORS_STRINGS = {
  EMAIL_REQUIRED: 'You need to fill the Email',
  COMPANY_NAME_REQUIRED : 'You need to fill the Company name',
  NAME_REQUIRED: 'You need to fill Full name',
  PASSWORD_REQUIRED: 'You need to fill the Password',
  PASSWORD_CONFIRMATION_REQUIRED: 'You need to confirm the Password',
  PASSWORDS_NOT_MATCH: 'Passwords doesn\'t match',
  PHONE_NUMBER_INVALID: 'Phone number is invalid',
  COUNTRY_REQUIRED: 'You need to select you\'r country',
  ADDRESS_REQUIRED: 'You need to fill address',
  INTERNAL_SERVER_ERROR: 'Something went wrong. Please try later',
};
