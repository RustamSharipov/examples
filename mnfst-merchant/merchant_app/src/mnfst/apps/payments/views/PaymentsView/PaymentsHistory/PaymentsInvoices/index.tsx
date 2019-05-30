import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import {
  HistoryEntries, HistoryEntriesHead, HistoryEntriesHeadCell, HistoryEntriesBody, HistoryEntriesRow,
  HistoryEntriesBodyCell,
} from 'apps/payments/components/HistoryEntries';
import InvoiceLink from 'apps/payments/components/InvoiceLink';
import { PaymentStatusStub } from 'apps/payments/components/PaymentStatus';
import { TextStub } from 'apps/ui/components/Text';
import { localizeString } from 'utils/localization';
import { formatMoney } from 'utils/text';
import { PAYMENTS_LIST_ITEMS_PER_PAGE } from 'constants/payments';
import { IClassNames, IPDF } from 'interfaces';
import { IMoney } from 'apps/campaigns/interfaces/campaign';
import { IPaymentsInvoicesItem } from 'apps/payments/interfaces/paymentsHistory';
import styles from './style.css';

interface IPaymentsInvoicesTableProps {
  payments: IPaymentsInvoicesItem[];
}

interface IPaymentsInvoicesTotalProps {
  amount: IMoney;
  classNamesList?: IClassNames;
  pdf: IPDF;
}

export const PaymentsInvoicesTable: React.SFC<IPaymentsInvoicesTableProps> = (props) => {
  const { payments } = props;

  return (
    <HistoryEntries>
      <HistoryEntriesHead>
        <HistoryEntriesHeadCell className={styles.transactionDateColumn}>
          {localizeString('Invoice')}
        </HistoryEntriesHeadCell>
        <HistoryEntriesHeadCell className={styles.transactionAmountColumn}>
          {localizeString('Amount spent')}
        </HistoryEntriesHeadCell>
        <HistoryEntriesHeadCell className={styles.transactionLinkColumn}>
          {localizeString('Download link')}
        </HistoryEntriesHeadCell>
      </HistoryEntriesHead>
      <HistoryEntriesBody>
        {payments.map((paymentsItem, index) => (
          <HistoryEntriesRow
            key={index}
            className="spec-payments-invoices-item">
            <HistoryEntriesBodyCell className={styles.transactionDateColumn}>
              {moment(paymentsItem.date).format('MMMM YYYY')}
            </HistoryEntriesBodyCell>
            <HistoryEntriesBodyCell className={styles.transactionAmountColumn}>
              {formatMoney(paymentsItem.amount.value, paymentsItem.amount.currency_code)}
            </HistoryEntriesBodyCell>
            <HistoryEntriesBodyCell className={styles.transactionLinkColumn}>
              <InvoiceLink
                caption={paymentsItem.pdf.title}
                type="application/pdf"
                target="_blank"
                url={paymentsItem.pdf.url} />
            </HistoryEntriesBodyCell>
          </HistoryEntriesRow>
        ))}
      </HistoryEntriesBody>
    </HistoryEntries>
  );
};

export const PaymentsInvoicesTotal: React.SFC<IPaymentsInvoicesTotalProps> = (props) => {
  const { amount, classNamesList, pdf } = props;

  return (
    <React.Fragment>
      <div className={classNames(
        classNamesList && classNamesList.column,
        styles.transactionDateColumn,
      )}>
        {localizeString('Total')}
      </div>
      <div className={classNames(
        classNamesList && classNamesList.column,
        styles.transactionAmountColumn,
      )}>
        {formatMoney(amount.value, amount.currency_code)}
      </div>
      <div className={classNames(
        classNamesList && classNamesList.column,
        styles.transactionLinkColumn,
      )}>
        {pdf && (
          <InvoiceLink
            caption={pdf.title}
            type="application/zip"
            url={pdf.url} />
        )}
      </div>
    </React.Fragment>
  );
};

export const PaymentsInvoicesStub = () => {
  return (
    <HistoryEntries>
      <HistoryEntriesHead>
        <HistoryEntriesHeadCell className={styles.paymentsInvoicesStubEntriesHeadCell}>
          <TextStub />
        </HistoryEntriesHeadCell>
        <HistoryEntriesHeadCell className={styles.paymentsInvoicesStubEntriesHeadCell}>
          <TextStub />
        </HistoryEntriesHeadCell>
        <HistoryEntriesHeadCell className={styles.paymentsInvoicesStubEntriesHeadCell}>
          <TextStub />
        </HistoryEntriesHeadCell>
        <HistoryEntriesHeadCell className={styles.paymentsInvoicesStubEntriesHeadCell}>
          <TextStub />
        </HistoryEntriesHeadCell>
        <HistoryEntriesHeadCell className={styles.paymentsInvoicesStubEntriesHeadCell}>
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
