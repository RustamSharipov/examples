import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

const methodsClassNames = {
  'american express': styles.amex,
  'american-express': styles.amex,
  amex: styles.amex,
  mastercard: styles.masterCard,
  paypal: styles.payPal,
  visa: styles.visa,
};

interface IPaymentMethodSquareIconProps {
  className?: string;
  method: string;
}

interface IPaymentMethodProps {
  brand: string;
  cardNumber: string;
  className?: string;
  paymentMethod: string;
}

export const PaymentMethodSquareIcon: React.SFC<IPaymentMethodSquareIconProps> = (props) => {
  const { className, method } = props;
  const methodClassName: string = method && methodsClassNames[method];

  return (
    <span className={classNames(
      className,
      methodClassName,
      styles.paymentMethodSquareIcon,
    )} />
  );
};

export const PaymentMethod: React.SFC<IPaymentMethodProps> = (props) => {
  const { cardNumber, className, paymentMethod, brand } = props;

  let icon: React.ReactElement<any> = <span />;
  let caption: string = '';

  if (paymentMethod === 'stripe_card') {
    icon = <PaymentMethodSquareIcon method={brand} />;
    caption = `**** ${cardNumber}`;
  }
  if (paymentMethod === 'paypal') {
    icon = <PaymentMethodSquareIcon method="paypal" />;
    caption = cardNumber;
  }

  return (
    <div className={classNames(
      styles.paymentMethod,
      className,
    )}>
      <div className={styles.iconsSet}>
        {React.cloneElement(icon, { className: styles.icon })}
      </div>
      <div className={styles.caption}>
        {caption}
      </div>
    </div>
  );
};

export const PaymentMethodStub = () => {
  return (
    <div className={classNames(
      styles.paymentMethod,
      styles.paymentMethodStub,
    )} />
  );
};
