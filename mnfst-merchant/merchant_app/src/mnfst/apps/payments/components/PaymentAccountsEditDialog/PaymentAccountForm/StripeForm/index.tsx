import React from 'react';
import Button from 'apps/ui/components/Button';
import { CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe } from 'react-stripe-elements';
import { FormRow, FormControls, FormRowSection } from 'apps/ui/components/Form';
import { getLocalData } from 'apps/ui/utils/localization';
import TextInputContainer from 'apps/ui/components/TextInputContainer';
import FieldLabel from 'apps/ui/components/FieldLabel';
import { PaymentMethodSquareIcon } from 'apps/payments/components/PaymentMethod';
import { OperationStatus } from 'apps/ui/types/base';
import styles from './style.css';
import ValidationStatus from 'apps/ui/components/ValidationStatus';
import TextLink from 'apps/ui/components/TextLink';
import { FlexLayout } from 'apps/ui/components/FlexLayout';

interface IStripeFormProps {
  onBack: () => void;
  onSuccess: ({ token: any }) => void;
  stripe: any;
}

interface IStripeElements {
  cardNumber: boolean;
  cardExpiry: boolean;
  cardCvc: boolean;
}

interface IStripeFormState {
  cardBrand: string | null;
  elements: IStripeElements;
  error: string[];
  status: OperationStatus;
}

class StripeForm extends React.Component<IStripeFormProps, IStripeFormState> {
  public state = {
    cardBrand: null,
    error: [],
    elements: {
      cardNumber: false,
      cardExpiry: false,
      cardCvc: false,
    },
    status: 'incomplete' as OperationStatus,
  };

  public componentDidUpdate(prevProps, prevState) {
    const { elements } = this.state;
    const isPrevValid = Object.values(prevState.elements)
      .filter(value => value).length === Object.values(prevState.elements).length;
    const isValid = Object.values(elements).filter(value => value).length === Object.values(elements).length;

    if (isValid !== isPrevValid) {
      this.setState({ status: isValid ? null : 'incomplete' });
    }
  }

  public render() {
    const { cardBrand, error, status } = this.state;

    return (
      <React.Fragment>
        <FormRow>
          <FormRowSection part="half">
            <label className={styles.stripeElement}>
              <TextInputContainer className={styles.stripeElementContainer}>
                <CardNumberElement
                  className={styles.stripeElementControl}
                  onChange={this.handleInputChange} />
                <FieldLabel notEmptyValue={true}>
                  {getLocalData('pages.payments.billing.card.cardNumber')}
                </FieldLabel>
                {cardBrand && (
                  <PaymentMethodSquareIcon
                    className={styles.cardBrandIcon}
                    method={cardBrand} />
                )}
              </TextInputContainer>
            </label>
          </FormRowSection>
          <FormRowSection part="one-fourth">
            <label className={styles.stripeElement}>
              <TextInputContainer className={styles.stripeElementContainer}>
                <CardExpiryElement
                  className={styles.stripeElementControl}
                  onChange={this.handleInputChange} />
                <FieldLabel notEmptyValue={true}>
                  {getLocalData('pages.payments.billing.card.expire')}
                </FieldLabel>
              </TextInputContainer>
            </label>
          </FormRowSection>
          <FormRowSection part="one-fourth">
            <label className={styles.stripeElement}>
              <TextInputContainer className={styles.stripeElementContainer}>
                <CardCVCElement
                  className={styles.stripeElementControl}
                  onChange={this.handleInputChange} />
                <FieldLabel notEmptyValue={true}>
                  {getLocalData('pages.payments.billing.card.cvc')}
                </FieldLabel>
              </TextInputContainer>
            </label>
          </FormRowSection>
        </FormRow>
        <FormRow type="empty">
          <ValidationStatus
            message={error}
            type="error" />
        </FormRow>
        <FormControls>
          <FlexLayout
            alignItems="center"
            justifyContent="space-between">
            <TextLink
              onClick={this.handleBackButtonClick}
              theme="violet">
              {getLocalData('pages.payments.ui.buttons.cancel')}
            </TextLink>
            <Button
              className="grid-columns-4"
              disabled={status === 'pending' || status === 'incomplete'}
              onClick={this.handleSubmit}
              theme="violet"
              type="button">
              {status === 'pending'
                ? getLocalData('pages.payments.ui.buttons.verifying')
                : getLocalData('pages.payments.ui.buttons.verify')
              }
            </Button>
          </FlexLayout>
        </FormControls>
      </React.Fragment>
    );
  }

  private handleInputChange = (params) => {
    const {
      brand: cardBrand,
      complete,
      elementType,
    } = params;

    this.setState({
      ...(cardBrand && { cardBrand }),
      elements: {
        ...this.state.elements,
        [elementType]: complete,
      },
    });
  }

  private handleSubmit = () => {
    const { onSuccess, stripe } = this.props;
    this.setState({
      status: 'pending',
    });

    validateCard(stripe, onSuccess, this.displayError);
  }

  private displayError = (error) => {
    this.setState({
      error: [getLocalData('pages.payments.billing.card.errors')[error]],
      status: 'error',
    });
  }

  private handleBackButtonClick = () => {
    const { onBack } = this.props;
    if (onBack) {
      onBack();
    }
  }
}

async function validateCard(stripe, onSuccess, onError) {
  const { error, token } = await stripe.createToken({ name: 'Name' });

  if (token) {
    onSuccess({ token });
  }

  if (error) {
    onError(error.code);
  }
}

export default injectStripe(StripeForm);
