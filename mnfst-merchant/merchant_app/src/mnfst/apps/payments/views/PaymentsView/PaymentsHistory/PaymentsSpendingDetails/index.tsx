import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import {
  HistoryEntries, HistoryEntriesHead, HistoryEntriesHeadCell, HistoryEntriesBody, HistoryEntriesRow,
  HistoryEntriesBodyCell, HistoryEntryDetails, HistoryEntryDetailsItem,
} from 'apps/payments/components/HistoryEntries';
import { PaymentStatusStub } from 'apps/payments/components/PaymentStatus';
import TextLink from 'apps/ui/components/TextLink';
import Tooltip from 'apps/ui/components/Tooltip';
import { localizeString, getLocalString } from 'utils/localization';
import { formatMoney, formatNumber } from 'utils/text';
import { TextStub } from 'apps/ui/components/Text';
import { PAYMENTS_LIST_ITEMS_PER_PAGE } from 'constants/payments';
import { IClassNames } from 'interfaces';
import { IMoney } from 'apps/campaigns/interfaces/campaign';
import { IPaymentsSpendingDetailsItem } from 'apps/payments/interfaces/paymentsHistory';
import styles from './style.css';
import { routes } from 'merchant/routes';

interface IPaymentsSpendingDetailsTableProps {
  payments: IPaymentsSpendingDetailsItem[];
}

interface IPaymentsSpendingDetailsTableState {
  expandedEntry: number;
}

interface IPaymentsSpendingDetailsTotalProps {
  amount: IMoney;
  classNamesList?: IClassNames;
  impressions: number;
  campaigns_count: number;
}

export class PaymentsSpendingDetailsTable extends React.Component
  <IPaymentsSpendingDetailsTableProps, IPaymentsSpendingDetailsTableState> {
  public state = {
    expandedEntry: 0,
  };

  public render() {
    const { payments } = this.props;
    const { expandedEntry } = this.state;

    return (
      <HistoryEntries>
        <HistoryEntriesHead>
          <HistoryEntriesHeadCell className={styles.spendingDetailsDateColumn}>
            {getLocalString('pages.payments.history.spendingDetails.date')}
          </HistoryEntriesHeadCell>
          <HistoryEntriesHeadCell>
            {getLocalString('pages.payments.history.spendingDetails.description')}
          </HistoryEntriesHeadCell>
          <HistoryEntriesHeadCell className={styles.spendingDetailsImpressionsColumn}>
            {getLocalString('pages.payments.history.spendingDetails.personalImpressions')}
          </HistoryEntriesHeadCell>
          <HistoryEntriesHeadCell className={styles.spendingDetailsAmountColumn}>
            <div className={styles.spendingDetailsAmountHeadColumn}>
              {getLocalString('pages.payments.history.spendingDetails.spent')}
              <div className={styles.spendingDetailsAmountTooltip}>
                <Tooltip
                  content={getLocalString('pages.payments.history.spendingDetails.spentDescription')}
                  theme="violet" />
              </div>
            </div>
          </HistoryEntriesHeadCell>
        </HistoryEntriesHead>
        <HistoryEntriesBody>
          {payments.map((paymentsItem, entryIndex) => (
            <HistoryEntriesRow
              key={entryIndex}
              className="spec-payments-spending_details-item"
              isExpandable={true}
              isExpanded={expandedEntry === entryIndex + 1}
              onClick={() => this.toggleHistoryEntryExpand(entryIndex + 1)}>
              <HistoryEntriesBodyCell className={styles.spendingDetailsDateColumn}>
                {moment(paymentsItem.date).format('D MMM YYYY')}
              </HistoryEntriesBodyCell>
              <HistoryEntriesBodyCell>
                <strong>{paymentsItem.campaigns.length}</strong> {localizeString('Active Campaigns')}
                {(expandedEntry === entryIndex + 1) && (
                  <HistoryEntryDetails>
                    {paymentsItem.campaigns.map((campaign, index) => (
                      <HistoryEntryDetailsItem key={index}>
                        <TextLink
                          link={routes['campaigns.details'].getPath(campaign.id)}
                          theme="grey">
                          {campaign.name}
                        </TextLink>
                      </HistoryEntryDetailsItem>
                    ))}
                  </HistoryEntryDetails>
                )}
              </HistoryEntriesBodyCell>
              <HistoryEntriesBodyCell className={styles.spendingDetailsImpressionsColumn}>
                <strong>{formatNumber(paymentsItem.impressions)}</strong>
                {(expandedEntry === entryIndex + 1) && (
                  <HistoryEntryDetails>
                    {paymentsItem.campaigns.map((campaign, index) => (
                      <HistoryEntryDetailsItem key={index}>
                        {formatNumber(campaign.impressions)}
                      </HistoryEntryDetailsItem>
                    ))}
                  </HistoryEntryDetails>
                )}
              </HistoryEntriesBodyCell>
              <HistoryEntriesBodyCell className={styles.spendingDetailsAmountColumn}>
                {formatMoney(paymentsItem.amount.value, paymentsItem.amount.currency_code)}
                {(expandedEntry === entryIndex + 1) && (
                  <HistoryEntryDetails>
                    {paymentsItem.campaigns.map((campaign, index) => (
                      <HistoryEntryDetailsItem key={index}>
                        {formatMoney(campaign.amount.value, campaign.amount.currency_code)}
                      </HistoryEntryDetailsItem>
                    ))}
                  </HistoryEntryDetails>
                )}
              </HistoryEntriesBodyCell>
            </HistoryEntriesRow>
          ))}
        </HistoryEntriesBody>
      </HistoryEntries>
    );
  }

  private toggleHistoryEntryExpand = (expandedEntry: number) => {
    this.setState({ expandedEntry });
  }
}

export const PaymentsSpendingDetailsTotal: React.SFC<IPaymentsSpendingDetailsTotalProps> = (props) => {
  const { amount, classNamesList, campaigns_count, impressions } = props;
  return (
    <React.Fragment>
      <div className={classNames(
        classNamesList && classNamesList.column,
        styles.spendingDetailsDateColumn,
      )}>
        {localizeString('Total')}
      </div>
      <div className={classNames(
        classNamesList && classNamesList.column,
        styles.spendingDetailsIdColumn,
      )}>
        {campaigns_count}{' '}
        {campaigns_count === 1 && (localizeString('Active Campaign'))}
        {campaigns_count > 1 && (localizeString('Active Campaigns'))}
      </div>
      <div className={classNames(
        classNamesList && classNamesList.column,
        styles.spendingDetailsImpressionsColumn,
      )}>
        {formatNumber(impressions)}
      </div>
      <div className={classNames(
        classNamesList && classNamesList.column,
        styles.spendingDetailsAmountColumn,
      )}>
        {formatMoney(amount.value, amount.currency_code)}
      </div>
    </React.Fragment>
  );
};

export const PaymentsSpendingDetailsStub = () => {
  return (
    <HistoryEntries>
      <HistoryEntriesHead>
        <HistoryEntriesHeadCell className={styles.paymentsSpendingDetailsStubEntriesHeadCell}>
          <TextStub />
        </HistoryEntriesHeadCell>
        <HistoryEntriesHeadCell className={styles.paymentsSpendingDetailsStubEntriesHeadCell}>
          <TextStub />
        </HistoryEntriesHeadCell>
        <HistoryEntriesHeadCell className={styles.paymentsSpendingDetailsStubEntriesHeadCell}>
          <TextStub />
        </HistoryEntriesHeadCell>
        <HistoryEntriesHeadCell className={styles.paymentsSpendingDetailsStubEntriesHeadCell}>
          <TextStub />
        </HistoryEntriesHeadCell>
        <HistoryEntriesHeadCell className={styles.paymentsSpendingDetailsStubEntriesHeadCell}>
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
