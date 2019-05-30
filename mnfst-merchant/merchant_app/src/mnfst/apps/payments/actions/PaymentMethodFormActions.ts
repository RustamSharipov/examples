import {
  PAYMENTS_METHOD_FORM_INIT,
  PAYMENTS_METHOD_FORM_UPDATE_FORM_FIELD,
  PAYMENTS_METHOD_FORM_PENDING,
  PAYMENTS_METHOD_FORM_ERROR,
  PAYMENTS_METHOD_FORM_SUCCESS,
  PAYMENTS_URI_PAYMENT_ADD_ACCOUNT,
  PAYMENTS_METHOD_FORM_UPDATE_RESPONSE,
  PAYMENTS_URI_WIRECARD_PROCESS,
} from 'constants/payments';
import {
  IPaymentMethodFormReducer,
  IPaymentMethodForm,
  IPaymentMethodFormActionSubmit,
  IPaymentMethodFormActionUpdateToken,
} from 'apps/payments/interfaces/paymentMethodForm';
import { IFormTarget, IFormFields } from 'interfaces';
import { IUserLocationReducer } from 'apps/ui/interfaces/userLocation';
import { validateForm, reduceFormErrors, serializeFormData } from 'utils/form';
import { getLocalData } from 'apps/ui/utils/localization';
import request from 'apps/ui/utils/request';

export function init() {
  return (dispatch, getState) => {
    const { userLocation: { countryCode } }: IUserLocationReducer = getState().userLocation;

    dispatch({
      type: PAYMENTS_METHOD_FORM_INIT,
      payload: { countryCode },
    });
  };
}

export function submit(params: IPaymentMethodFormActionSubmit) {
  const {
    gateway: gatewayType,
    useCompanyAddressAsBillingAddress,
  } = params;

  return async (dispatch, getState) => {
    const { paymentMethodForm, token }: IPaymentMethodFormReducer = getState().paymentMethodForm;
    paymentMethodForm.billing_address.address_line_1.isRequired = !useCompanyAddressAsBillingAddress;
    paymentMethodForm.billing_address.city.isRequired = !useCompanyAddressAsBillingAddress;
    paymentMethodForm.billing_address.country_code.isRequired = !useCompanyAddressAsBillingAddress;
    paymentMethodForm.billing_address.zip_code.isRequired = !useCompanyAddressAsBillingAddress;

    // Validate form
    const { fields, errors, isValid } = validateForm<IPaymentMethodForm>(paymentMethodForm);

    if (isValid) {
      dispatch({
        type: PAYMENTS_METHOD_FORM_PENDING,
      });

      try {
        const { status } = await connectPaymentMethod(fields, gatewayType, token, useCompanyAddressAsBillingAddress);

        if (status === 200) {
          dispatch({
            type: PAYMENTS_METHOD_FORM_SUCCESS,
          });
        }
      }

      catch (error) {
        let errors = {};

        if (error.response) {
          const { data = {}, status } = error.response;

          // Return validation errors (server validation)
          if (status === 400) {
            errors = reduceFormErrors(data.errors);
          }

          // Internal server error cases
          if (status === 404 || status === 500) {
            errors = {
              registrationForm: [getLocalData('ui.errors.internalServerError')],
            };
          }
        }

        dispatch({
          type: PAYMENTS_METHOD_FORM_ERROR,
          payload: errors,
        });
      }
    }

    else {
      dispatch({
        type: PAYMENTS_METHOD_FORM_ERROR,
        payload: errors,
      });
    }
  };
}

export function updateFormField(elementEventTarget: IFormTarget) {
  return (dispatch) => {
    dispatch({
      type: PAYMENTS_METHOD_FORM_UPDATE_FORM_FIELD,
      payload: elementEventTarget,
    });
  };
}

export function updateResponse(params: IPaymentMethodFormActionUpdateToken) {
  const { response } = params;

  return (dispatch) => {
    dispatch({
      type: PAYMENTS_METHOD_FORM_UPDATE_RESPONSE,
      payload: response,
    });
  };
}

function connectPaymentMethod(
  fields: IFormFields,
  gatewayType: 'stripe' | 'wirecard',
  response,
  useCompanyAddressAsBillingAddress,
) {
  const payload = serializeFormData(fields);
  let url;
  payload.response = response;
  payload.use_company_address = useCompanyAddressAsBillingAddress;

  if (gatewayType === 'stripe') {
    url = PAYMENTS_URI_PAYMENT_ADD_ACCOUNT.replace(':account_type', `${gatewayType}_payment_method`);
  }

  if (gatewayType === 'wirecard') {
    url = PAYMENTS_URI_WIRECARD_PROCESS;
  }

  return request({
    url,
    method: 'post',
    data: payload,
  });
}
