import { IBillingAddress } from 'apps/payments/interfaces/payments';
import { IBillingAddressFields } from 'apps/payments/interfaces/billingForm';
import { PAYMENTS_ERRORS } from 'constants/payments';

interface IPaymentMethodFormProps {
  billing_address: IBillingAddress;
}

export default class PaymentMethodForm {
  public billing_address: IBillingAddressFields;

  constructor(props?: IPaymentMethodFormProps) {
    this.billing_address = {
      address_line_1: {
        isRequired: true,
        requiredError: PAYMENTS_ERRORS.ADDRESS_REQUIRED,
        value: props && props.billing_address && props.billing_address.address_line_1 || null,
      },
      address_line_2: {
        value: props && props.billing_address && props.billing_address.address_line_2 || null,
      },
      city: {
        isRequired: true,
        requiredError: PAYMENTS_ERRORS.CITY_REQUIRED,
        value: props && props.billing_address && props.billing_address.city || null,
      },
      country_code: {
        isRequired: true,
        requiredError: PAYMENTS_ERRORS.COUNTRY_REQUIRED,
        value: props && props.billing_address && props.billing_address.country_code || null,
      },
      state: {
        value: props && props.billing_address && props.billing_address.state || null,
      },
      zip_code: {
        isRequired: true,
        requiredError: PAYMENTS_ERRORS.ZIPCODE_REQUIRED,
        value: props && props.billing_address && props.billing_address.zip_code || null,
      },
    };
  }
}
