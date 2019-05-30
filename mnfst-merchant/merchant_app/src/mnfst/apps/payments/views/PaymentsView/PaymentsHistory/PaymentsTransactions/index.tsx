import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import {
  HistoryEntries, HistoryEntriesHead, HistoryEntriesHeadCell, HistoryEntriesBody, HistoryEntriesRow,
  HistoryEntriesBodyCell,
} from 'apps/payments/components/HistoryEntries';
import { PaymentMethod } from 'apps/payments/components/PaymentMethod';
import PaymentStatus, { PaymentStatusStub } from 'apps/payments/components/PaymentStatus';
import { TextStub } from 'apps/ui/components/Text';
import { getLocalString } from 'utils/localization';
import { formatMoney } from 'utils/text';
import { IClassNames } from 'interfaces';
import { PAYMENTS_LIST_ITEMS_PER_PAGE } from 'constants/payments';
import { IMoney } from 'apps/campaigns/interfaces/campaign';
import { IPaymentsTransactionsItem } from 'apps/payments/interfaces/paymentsHistory';
import styles from './style.css';

interface IPaymentsTransactionsTableProps {
  payments: IPaymentsTransactionsItem[];
}

interface IPaymentsTransactionsTotalProps {
  amount: IMoney;
  classNamesList?: IClassNames;
  count: number;
}

export const PaymentsTransactionsTable: React.SFC<IPaymentsTransactionsTableProps> = (props) => {
  const { payments } = props;
  return (
    <HistoryEntries>
      <HistoryEntriesHead>
        <HistoryEntriesHeadCell className={styles.transactionDateColumn}>
          {getLocalString('pages.payments.history.transactions.date')}
        </HistoryEntriesHeadCell>
        <HistoryEntriesHeadCell>
          {getLocalString('pages.payments.history.transactions.transactionId')}
        </HistoryEntriesHeadCell>
        <HistoryEntriesHeadCell className={styles.transactionAmountColumn}>
          {getLocalString('Amount billed')}
        </HistoryEntriesHeadCell>
        <HistoryEntriesHeadCell className={styles.transactionPaymentMethodColumn}>
          {getLocalString('pages.payments.history.transactions.paymentMethod')}
        </HistoryEntriesHeadCell>
        <HistoryEntriesHeadCell className={styles.transactionStatusColumn}>
          {getLocalString('pages.payments.history.transactions.status')}
        </HistoryEntriesHeadCell>
      </HistoryEntriesHead>
      <HistoryEntriesBody>
        {payments.map((paymentsItem, index) => (
          <HistoryEntriesRow
            key={index}
            className="spec-payments-transactions-item">
            <HistoryEntriesBodyCell className={styles.transactionDateColumn}>
              {moment(paymentsItem.created_at).format('D MMM YYYY')}
            </HistoryEntriesBodyCell>
            <HistoryEntriesBodyCell>
              <small>{paymentsItem.object_id}</small>
            </HistoryEntriesBodyCell>
            <HistoryEntriesBodyCell className={styles.transactionAmountColumn}>
              {formatMoney(paymentsItem.amount.value, paymentsItem.amount.currency_code)}
            </HistoryEntriesBodyCell>
            <HistoryEntriesBodyCell className={styles.transactionPaymentMethodColumn}>
              {paymentsItem.payment_account && (
                <PaymentMethod
                  brand={paymentsItem.payment_account.brand}
                  cardNumber={paymentsItem.payment_account.last_digits}
                  paymentMethod={paymentsItem.payment_account.account_type} />
              )}
              {(paymentsItem.description && !paymentsItem.payment_account) && paymentsItem.description}
            </HistoryEntriesBodyCell>
            <HistoryEntriesBodyCell className={styles.transactionStatusColumn}>
              <PaymentStatus status={paymentsItem.state} />
            </HistoryEntriesBodyCell>
          </HistoryEntriesRow>
        ))}
      </HistoryEntriesBody>
    </HistoryEntries>
  );
};

export const PaymentsTransactionsTotal: React.SFC<IPaymentsTransactionsTotalProps> = (props) => {
  const { amount, classNamesList, count } = props;
  return (
    <React.Fragment>
      <div className={classNames(
        classNamesList && classNamesList.column,
        styles.transactionDateColumn,
      )}>
        {getLocalString('payments.history.transactions.total.title')}
      </div>
      <div className={classNames(
        classNamesList && classNamesList.column,
        styles.transactionIdColumn,
      )}>
        {count === 1 && getLocalString('pages.payments.history.transactions.total.one')}
        {count > 1 && getLocalString('pages.payments.history.transactions.total.count', { placeholders: { count } })}
      </div>
      <div className={classNames(
        classNamesList && classNamesList.column,
        styles.transactionAmountColumn,
      )}>
        {formatMoney(amount.value, amount.currency_code)}
      </div>
      <div className={classNames(
        classNamesList && classNamesList.column,
        styles.transactionPaymentMethodColumn,
      )} />
      <div className={classNames(
        classNamesList && classNamesList.column,
        styles.transactionStatusColumn,
      )} />
    </React.Fragment>
  );
};

export const PaymentsTransactionsStub = () => {
  return (
    <HistoryEntries>
      <HistoryEntriesHead>
        <HistoryEntriesHeadCell className={styles.paymentsTransactionsStubEntriesHeadCell}>
          <TextStub />
        </HistoryEntriesHeadCell>
        <HistoryEntriesHeadCell className={styles.paymentsTransactionsStubEntriesHeadCell}>
          <TextStub />
        </HistoryEntriesHeadCell>
        <HistoryEntriesHeadCell className={styles.paymentsTransactionsStubEntriesHeadCell}>
          <TextStub />
        </HistoryEntriesHeadCell>
        <HistoryEntriesHeadCell className={styles.paymentsTransactionsStubEntriesHeadCell}>
          <TextStub />
        </HistoryEntriesHeadCell>
        <HistoryEntriesHeadCell className={styles.paymentsTransactionsStubEntriesHeadCell}>
          <TextStub />
        </HistoryEntriesHeadCell>
      </HistoryEntriesHead>
      <HistoryEntriesBody>
        {Array(PAYMENTS_LIST_ITEMS_PER_PAGE).fill(1).map((item, index) => (
          <HistoryEntriesRow key={index}>
            <HistoryEntriesBodyCell>
              <TextStub />
            </HistoryEntriesBodyCell>
            <HistoryEntriesBodyCell>
              <TextStub />
            </HistoryEntriesBodyCell>
            <HistoryEntriesBodyCell>
              <TextStub />
            </HistoryEntriesBodyCell>
            <HistoryEntriesBodyCell>
              <TextStub />
            </HistoryEntriesBodyCell>
            <HistoryEntriesBodyCell>
              <PaymentStatusStub />
            </HistoryEntriesBodyCell>
          </HistoryEntriesRow>
        ))}
      </HistoryEntriesBody>
    </HistoryEntries>
  );
};
