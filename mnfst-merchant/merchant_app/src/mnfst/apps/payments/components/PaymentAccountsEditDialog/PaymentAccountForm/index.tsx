import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Elements, StripeProvider } from 'react-stripe-elements';
import Animation from 'apps/ui/components/Animation';
import Button from 'apps/ui/components/Button';
import CheckBox from 'apps/ui/components/CheckBox';
import { DialogContent } from 'apps/ui/components/Dialog';
import { FormRow, FormRowSection, FormRowsGroup, Form } from 'apps/ui/components/Form';
import { PaymentAccount } from 'apps/payments/components/PaymentAccount';
import TextField from 'apps/ui/components/TextField';
import TextLink from 'apps/ui/components/TextLink';
import { PAYMENTS_CREDITCARDS_PROVIDERS } from 'constants/payments';
import { IFormTarget } from 'interfaces';
import { IPaymentMethodFormReducer, IPaymentMethodFormActions } from 'apps/payments/interfaces/paymentMethodForm';
import { IPaymentAccountsReducer, IPaymentAccountsActions } from 'apps/payments/interfaces/paymentAccounts';
import { IPaymentsReducer } from 'apps/payments/interfaces/payments';
import { IPaymentsTransactionsActionUpdateDateParams } from 'apps/payments/interfaces/paymentsHistory';
import { IUserReducer } from 'apps/users/interfaces/user';
import { OperationStatus } from 'apps/ui/types/base';
import { Regions } from 'utils/regions';
import { getLocalData } from 'apps/ui/utils/localization';
import * as PaymentMethodFormActions from 'apps/payments/actions/PaymentMethodFormActions';
import * as PaymentAccountsActions from 'apps/payments/actions/PaymentAccountsActions';
import StripeForm from './StripeForm';
import WirecardDialog from './WirecardDialog';
import styles from './style.css';

interface IPaymentAccountFormProps {
  onPaymentAccountsListBack: () => void;
  payments: IPaymentsReducer;
  paymentAccounts: IPaymentAccountsReducer;
  paymentMethodForm: IPaymentMethodFormReducer;
  PaymentsActions: IPaymentsTransactionsActionUpdateDateParams;
  PaymentAccountsActions: IPaymentAccountsActions;
  PaymentMethodFormActions: IPaymentMethodFormActions;
  user: IUserReducer;
}

interface IValidatedPaymentMethod {
  accountType: string | null;
  brand?: string | null;
  expireDate?: string | null;
  lastDigits?: string | null;
}

interface IPaymentAccountFormState {
  paymentMethod: IValidatedPaymentMethod | null;
  selectedGateway: 'stripe' | 'wirecard' | null;
  wirecardStatus: OperationStatus;
  useCompanyAddressAsBillingAddress: boolean;
}

const gatewayLogos = {
  stripe: (
    <span
      className={classNames(
        styles.paymentMethodIcon,
        styles.stripe,
      )} />
  ),
  wirecard: (
    <span
      className={classNames(
        styles.paymentMethodIcon,
        styles.wirecard,
      )} />
  ),
};

class PaymentAccountForm extends React.Component<IPaymentAccountFormProps, IPaymentAccountFormState> {
  public state = {
    paymentMethod: {
      accountType: null,
      brand: null,
      expireDate: null,
      lastDigits: null,
    },
    selectedGateway: null,
    wirecardStatus: null,
    useCompanyAddressAsBillingAddress: this.props.payments.useCompanyAddress,
  };

  public componentDidMount() {
    this.props.PaymentMethodFormActions.init();
    this.props.PaymentAccountsActions.fetchGateway();
  }

  public componentDidUpdate(prevProps) {
    const { status } = this.props.paymentMethodForm;

    if (status === 'created' && status !== prevProps.paymentMethodForm.status) {
      const { onPaymentAccountsListBack } = this.props;
      if (onPaymentAccountsListBack) {
        onPaymentAccountsListBack();
      }
    }
  }

  public render() {
    const {
      payments: { useCompanyAddress },
      paymentAccounts: { gateway },
      paymentMethodForm: {
        paymentMethodForm: {
          billing_address,
        },
        errors,
        status,
      },
      user: { merchant },
    } = this.props;
    const { wirecardStatus } = this.state;
    const {
      paymentMethod,
      selectedGateway,
      useCompanyAddressAsBillingAddress,
    } = this.state;
    const gatewayLogo = gateway && gatewayLogos[gateway.gateway];
    const merchantCountry = merchant && Regions.getCountries({ cca2: merchant.country_code })[0];

    return (
      <DialogContent>
        {paymentMethod.accountType
          ? (
            <React.Fragment>
              {paymentMethod.accountType === 'stripe' && (
                <PaymentAccount
                  cardNumber={paymentMethod.lastDigits}
                  expireDate={paymentMethod.expireDate}
                  hasPaymentMethodName={true}
                  paymentAccount={paymentMethod.accountType}
                  brand={paymentMethod.brand} />
              )}
            </React.Fragment>
          )
          : (
            <React.Fragment>
              {(!selectedGateway) && (
                <React.Fragment>
                  <FormRow>
                    <Button
                      className={styles.paymentMethodButton}
                      onClick={this.handlePaymentMethodClick}
                      type="button">
                      {gateway && (
                        <span className={styles.paymentMethod}>
                          <span className={styles.paymentMethodLabel}>
                            {getLocalData('pages.payments.ui.buttons.connectPaymentMethod')}
                          </span>
                          {gatewayLogo}
                        </span>
                      )}
                    </Button>
                  </FormRow>
                  <div className={styles.paymentMethodControls}>
                    <TextLink
                      className="grid-columns-4 spec-billing-payment-methods-cancel-button"
                      disabled={status === 'pending'}
                      onClick={this.displayAccountsList}
                      theme="violet">
                      {getLocalData('pages.payments.ui.buttons.cancel')}
                    </TextLink>
                  </div>
                </React.Fragment>
              )}
              {(selectedGateway === 'stripe' && gateway && gateway.form_fields) && (
                <StripeProvider apiKey={gateway.form_fields.key}>
                  <React.Fragment>
                    <Elements>
                      <StripeForm
                        onBack={this.displayAccountsList}
                        onSuccess={this.handleStripeValidationSuccess} />
                    </Elements>
                  </React.Fragment>
                </StripeProvider>
              )}
              {(selectedGateway === 'wirecard' && gateway && gateway.form_url) && (
                <React.Fragment>
                  <WirecardDialog url={gateway.form_url} />
                  <div className={styles.paymentMethodControls}>
                    <TextLink
                      className="spec-billing-payment-methods-cancel-button"
                      onClick={this.displayAccountsList}
                      theme="violet">
                      {getLocalData('pages.payments.ui.buttons.cancel')}
                    </TextLink>
                    <Button
                      className={classNames(
                        'grid-columns-4',
                        'spec-billing-payment-methods-add-button',
                      )}
                      disabled={wirecardStatus === 'pending'}
                      onClick={this.handleWirecardFormSubmit}
                      type="button"
                      theme="violet">
                      {status === 'pending'
                        ? getLocalData('pages.payments.ui.buttons.verifying')
                        : getLocalData('pages.payments.ui.buttons.verify')
                      }
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          )
        }
        {paymentMethod.accountType && (
          <Form onSubmit={this.handleFormSubmit}>
            {useCompanyAddress && (
              <FormRow>
                <CheckBox
                  isChecked={useCompanyAddressAsBillingAddress}
                  label={getLocalData('pages.payments.billing.billingAddress.useCompanyAddress')}
                  onChange={this.handleUseCompanyAddressAsBillingAddressChange} />
              </FormRow>
            )}
            <Animation
              type="expand"
              isActivated={!useCompanyAddressAsBillingAddress}>
              <FormRowsGroup
                caption={getLocalData('pages.payments.billing.billingAddress.title')}
                className={styles.paymentMethodBillingAddress}>
                <FormRow>
                  <FormRowSection part="half">
                    <TextField
                      className="spec-billing-billing_address-address_line_1-field"
                      disabled={status === 'pending'}
                      hasErrors={!!errors['billing_address.address_line_1']}
                      label={getLocalData('pages.payments.billing.billingAddress.addressLine1')}
                      name="billing_address.address_line_1"
                      onChange={this.updateFormField}
                      value={billing_address.address_line_1.value} />
                  </FormRowSection>
                  <FormRowSection part="half">
                    <TextField
                      className="spec-billing-billing_address-address_line_2-field"
                      disabled={status === 'pending'}
                      label={getLocalData('pages.payments.billing.billingAddress.addressLine2')
                        + ` (${getLocalData('formFields.ui.optionalField')})`}
                      name="billing_address.address_line_2"
                      onChange={this.updateFormField}
                      value={billing_address.address_line_2.value} />
                  </FormRowSection>
                </FormRow>
                <FormRow>
                  <FormRowSection part="half">
                    <TextField
                      className="spec-billing-billing_address-country_code-field"
                      disabled={true}
                      label={getLocalData('pages.payments.billing.billingAddress.country')}
                      name="billing_address.country_code"
                      onChange={this.updateFormField}
                      value={merchantCountry && merchantCountry.name.common} />
                  </FormRowSection>
                  <FormRowSection part="half">
                    <TextField
                      className="spec-billing-billing_address-state-field"
                      disabled={status === 'pending'}
                      label={getLocalData('pages.payments.billing.billingAddress.state')
                        + ` (${getLocalData('formFields.ui.optionalField')})`}
                      name="billing_address.state"
                      onChange={this.updateFormField}
                      value={billing_address.state.value} />
                  </FormRowSection>
                </FormRow>
                <FormRow>
                  <FormRowSection part="half">
                    <TextField
                      className="spec-billing-billing_address-city-field"
                      disabled={status === 'pending'}
                      hasErrors={!!errors['billing_address.city']}
                      label={getLocalData('pages.payments.billing.billingAddress.city')}
                      name="billing_address.city"
                      onChange={this.updateFormField}
                      value={billing_address.city.value} />
                  </FormRowSection>
                  <FormRowSection part="half">
                    <TextField
                      className="spec-billing-billing_address-zip_code-field"
                      disabled={status === 'pending'}
                      hasErrors={!!errors['billing_address.zip_code']}
                      label={getLocalData('pages.payments.billing.billingAddress.postCode')}
                      name="billing_address.zip_code"
                      onChange={this.updatePostCodeFormField}
                      value={billing_address.zip_code.value} />
                  </FormRowSection>
                </FormRow>
              </FormRowsGroup>
            </Animation>
            <div className={styles.paymentMethodControls}>
              <TextLink
                className="spec-billing-payment-methods-cancel-button"
                disabled={status === 'pending'}
                onClick={this.displayAccountsList}
                theme="violet">
                {getLocalData('pages.payments.ui.buttons.cancel')}
              </TextLink>
              <Button
                className={classNames(
                  'grid-columns-4',
                  'spec-billing-payment-methods-add-button',
                )}
                theme="violet"
                disabled={status === 'pending'}>
                {status === 'pending'
                  ? getLocalData('pages.payments.ui.buttons.verifying')
                  : getLocalData('pages.payments.ui.buttons.continue')
                }
              </Button>
            </div>
          </Form>
        )}
      </DialogContent>
    );
  }

  private updateFormField = (element: IFormTarget) => {
    this.props.PaymentMethodFormActions.updateFormField(element);
  }

  private handlePaymentMethodClick = () => {
    const { gateway } = this.props.paymentAccounts;

    this.setState({
      selectedGateway: gateway ? gateway.gateway : null,
    });
  }

  private handleFormSubmit = () => {
    const { selectedGateway, useCompanyAddressAsBillingAddress } = this.state;

    if (selectedGateway) {
      this.props.PaymentMethodFormActions.submit({
        useCompanyAddressAsBillingAddress,
        gateway: selectedGateway,
      });
    }
  }

  private handleUseCompanyAddressAsBillingAddressChange = () => {
    this.setState(state => ({
      useCompanyAddressAsBillingAddress: !state.useCompanyAddressAsBillingAddress,
    }));
  }

  private handleWirecardFormSubmit = () => {
    const { WPP } = window as any;

    this.setState({ wirecardStatus: 'pending' });

    WPP.seamlessSubmit({
      onSuccess: (response) => {
        this.handleWirecardValidationSuccess(response);
        this.setState({ wirecardStatus: null });
      },

      onError: () => {
        console.log();
      },
    });
  }

  private handleWirecardValidationSuccess = (response: any) => {
    this.setState({
      paymentMethod: {
        accountType: 'wirecard',
      },
    });

    this.props.PaymentMethodFormActions.updateResponse({ response });
  }

  private handleStripeValidationSuccess = (params) => {
    const { token: response } = params;

    this.setState({
      paymentMethod: {
        accountType: 'stripe_card',
        brand: Object.entries(PAYMENTS_CREDITCARDS_PROVIDERS)
          .filter(([, value]) => value.toLowerCase() === response.card.brand.toLowerCase())[0][0],
        lastDigits: response.card.last4,
        expireDate: `${response.card.exp_year}-${response.card.exp_month}-01 00:00:00`,
      },
    });

    this.props.PaymentMethodFormActions.updateResponse({ response });
  }

  private updatePostCodeFormField = (element: IFormTarget) => {
    if (/^[0-9]+$/i.test(element.value) || element.value === '') {
      this.updateFormField(element);
    }
  }

  private displayAccountsList = () => {
    const { onPaymentAccountsListBack } = this.props;
    if (onPaymentAccountsListBack) {
      onPaymentAccountsListBack();
    }
  }
}

function mapStateToProps(state) {
  return {
    payments: state.payments,
    paymentAccounts: state.paymentAccounts,
    paymentMethodForm: state.paymentMethodForm,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    PaymentAccountsActions: bindActionCreators(PaymentAccountsActions, dispatch),
    PaymentMethodFormActions: bindActionCreators(PaymentMethodFormActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentAccountForm);
