import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { PaymentMethodSquareIcon } from 'apps/payments/components/PaymentMethod';
import { localizeString, getLocalString } from 'utils/localization';
import styles from './style.css';
import { PAYMENTS_CREDITCARDS_PROVIDERS } from 'constants/payments';
import PlusCircleIcon from 'apps/ui/components/icons/PlusCircleIcon';

interface IPaymentAccountProps {
  actions?: React.ReactElement<any> | Element;
  brand: string | null;
  cardNumber: string | null;
  className?: string;
  expireDate: string | null;
  hasPaymentMethodName?: boolean;
  isPrimary?: boolean;
  paymentAccount: string | null;
}

interface IPaymentAccountStubProps {
  onClick?: () => void;
}

interface IPaymentAccountsProps {
  children: React.ReactNode;
  className?: string;
}

export const PaymentAccount: React.SFC<IPaymentAccountProps> = (props) => {
  const {
    actions, cardNumber, className, expireDate, hasPaymentMethodName, isPrimary, paymentAccount, brand,
  } = props;
  const paymentMethodName = brand && PAYMENTS_CREDITCARDS_PROVIDERS[brand];

  let icon: React.ReactElement<any> = <span />;
  let title: string = '';

  if (paymentAccount === 'stripe_card' || paymentAccount === 'wirecard') {
    icon = brand ? <PaymentMethodSquareIcon method={brand} /> : <span />;
    title = hasPaymentMethodName && paymentMethodName ? `${paymentMethodName} * ${cardNumber}` : `**** ${cardNumber}`;
  }
  if (paymentAccount === 'paypal') {
    icon = <PaymentMethodSquareIcon method="paypal" />;
    title = cardNumber || '';
  }

  return (
    <div className={classNames(
      styles.paymentAccount,
      className,
    )}>
      <div className={styles.iconsSet}>
        {React.cloneElement(icon, { className: styles.icon })}
      </div>
      <div className={styles.info}>
        <div className={styles.title}>
          {title}
        </div>
        {expireDate && (
          <div className={styles.caption}>
            {localizeString('Expires on')} {moment(expireDate).format('MM/YYYY')}
          </div>
        )}
      </div>
      {isPrimary && (
        <div className={styles.status}>
          {localizeString('Primary')}
        </div>
      )}
      {actions && (
        <div className={styles.actions}>
          {actions}
        </div>
      )}
    </div>
  );
};

export const PaymentAccounts: React.SFC<IPaymentAccountsProps> = (props) => {
  const { children, className } = props;
  return (
    <div className={classNames(
      styles.paymentAccounts,
      className,
    )}>
      {children}
    </div>
  );
};

export const PaymentAccountStub: React.SFC<IPaymentAccountStubProps> = (props) => {
  const { onClick } = props;
  return (
    <div
      className={classNames(
        styles.paymentAccount,
        onClick && styles.paymentAccountStub,
      )}
      onClick={onClick && onClick}>
      <div className={styles.iconsSet}>
        <PlusCircleIcon className={classNames(
          styles.icon,
          styles.stubIcon,
        )} />
      </div>
      <div className={styles.info}>
        <div className={styles.title}>
          {getLocalString('pages.payments.billing.paymentMethods.methodStubTitle')}
        </div>
        <div className={styles.caption}>
          {getLocalString('pages.payments.billing.paymentMethods.methodStubCaption')}
        </div>
      </div>
    </div>
  );
};
