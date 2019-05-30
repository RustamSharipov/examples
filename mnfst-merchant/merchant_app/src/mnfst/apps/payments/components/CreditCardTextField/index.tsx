import React from 'react';
import creditCardType from 'credit-card-type';
import { PaymentMethodSquareIcon } from 'apps/payments/components/PaymentMethod';
import TextField from 'apps/ui/components/TextField';
import { IFormTarget } from 'interfaces';
import styles from './style.css';

interface ICreditCardTextFieldProps {
  className?: string;
  disabled?: boolean;
  errors: string[] | null;
  label?: string;
  mask?: string;
  name: string;
  onChange: (element: IFormTarget) => void;
  value: string;
}

interface ICreditCardTextFieldState {
  cardBrand: string | null;
}

class CreditCardTextField extends React.Component<ICreditCardTextFieldProps, ICreditCardTextFieldState> {
  public state = {
    cardBrand: null,
  };

  public render() {
    const { cardBrand } = this.state;
    return (
      <TextField
        {...this.props}
        classNamesList={{ input: styles.input }}
        iconAfter={
          cardBrand && (
            <PaymentMethodSquareIcon
              className={styles.icon}
              method={cardBrand} />
          )
        }
        maskChar=" "
        onInit={this.updateCardNumberFormField}
        onChange={this.updateCardNumberFormField} />
    );
  }

  private updateCardNumberFormField = (element: IFormTarget) => {
    const card = creditCardType(element.value);
    if (card.length === 1) {
      this.setState({ cardBrand: card[0].type });
    }
    else {
      this.setState({ cardBrand: null });
    }

    const { onChange } = this.props;
    if (onChange) {
      onChange(element);
    }
  }
}

export default CreditCardTextField;
