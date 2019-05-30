import React from 'react';
import classNames from 'classnames';
import { localizeString } from 'utils/localization';
import styles from './style.css';

const paymentStatuses = {
  completed: {
    caption: localizeString('Verified'),
    className: styles.completed,
  },
  failed: {
    caption: localizeString('Failed'),
    className: styles.failed,
  },
  pending: {
    caption: localizeString('Pending'),
    className: styles.pending,
  },
  refunded: {
    caption: localizeString('Refunded'),
    className: styles.refunded,
  },
};

interface IPaymentStatusProps {
  className?: string;
  status: string;
}

const PaymentStatus: React.SFC<IPaymentStatusProps> = (props) => {
  const { className, status } = props;
  const paymentStatus = status && paymentStatuses[status];

  return (
    <div className={classNames(
      styles.paymentStatus,
      paymentStatus.className,
      className,
    )}>
      {paymentStatus.caption}
    </div>
  );
};

export default PaymentStatus;

export const PaymentStatusStub = () => {
  return (
    <div className={classNames(
      styles.paymentStatus,
      styles.paymentStatusStub,
    )} />
  );
};
