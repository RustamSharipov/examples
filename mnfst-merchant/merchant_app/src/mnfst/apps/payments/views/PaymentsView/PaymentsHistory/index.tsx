import React from 'react';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import DateRangePicker from 'apps/ui/components/DateRangePicker';
import { FlexLayout, FlexLayoutChild } from 'apps/ui/components/FlexLayout';
import InfoCircleIcon from 'apps/ui/components/icons/InfoCircleIcon';
import ExchangeIcon from 'apps/ui/components/icons/ExchangeIcon';
import DocumentIcon from 'apps/ui/components/icons/DocumentFillIcon';
import { IPaymentsHistoryReducer, IPaymentsHistoryActions } from 'apps/payments/interfaces/paymentsHistory';
import { IFormTarget } from 'interfaces';
import { localizeString } from 'utils/localization';
import * as PaymentsHistoryActions from 'apps/payments/actions/PaymentsHistoryActions';
import {
  PaymentsHistoryNavigation, PaymentsHistoryNavigationItem,
} from 'apps/payments/components/PaymentsHistoryNavigation';
import { PaymentsInvoicesTable, PaymentsInvoicesTotal, PaymentsInvoicesStub } from './PaymentsInvoices';
import { PaymentsTransactionsTable, PaymentsTransactionsTotal, PaymentsTransactionsStub } from './PaymentsTransactions';
import {
  PaymentsSpendingDetailsTable, PaymentsSpendingDetailsTotal, PaymentsSpendingDetailsStub,
} from './PaymentsSpendingDetails';
import styles from './style.css';

interface ITotalEntriesStyle {
  width: number;
}

interface IPaymentsHistoryProps {
  history: any;
  paymentsHistory: IPaymentsHistoryReducer;
  PaymentsHistoryActions: IPaymentsHistoryActions;
}

interface IPaymentsHistoryState {
  isTableTotalRowNodeSticky: boolean;
  tableNodeWidth: number;
}

class PaymentsHistory extends React.Component<IPaymentsHistoryProps, IPaymentsHistoryState> {
  public tableNode: HTMLDivElement;
  public tableTotalRowNode: HTMLDivElement;

  public state = {
    isTableTotalRowNodeSticky: false,
    tableNodeWidth: 0,
  };

  public componentDidMount() {
    this.props.PaymentsHistoryActions.init();
    this.props.PaymentsHistoryActions.fetchData();
    this.fitTotalRowToPaymentTable();
    window.addEventListener('resize', this.fitTotalRowToPaymentTable);
    window.addEventListener('scroll', this.handleWindowScroll);
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.handleWindowScroll);
  }

  public render() {
    const {
      dateFrom, dateTo, invoices, transactions, spendingDetails, type, status, total,
    } = this.props.paymentsHistory;
    const { isTableTotalRowNodeSticky, tableNodeWidth } = this.state;
    const totalEntriesRowStyle: ITotalEntriesStyle = {
      width: tableNodeWidth,
    };

    return (
      <React.Fragment>
        <div className={styles.header}>
          <FlexLayout
            alignItems="flex-start"
            justifyContent="space-between">
            <FlexLayoutChild>
              <PaymentsHistoryNavigation>
                <PaymentsHistoryNavigationItem
                  isActive={type === 'spending-details'}
                  icon={<InfoCircleIcon />}
                  onClick={() => this.handleHistoryTypeSelect('spending-details')}>
                  {localizeString('Spending details')}
                </PaymentsHistoryNavigationItem>
                <PaymentsHistoryNavigationItem
                  isActive={type === 'transactions'}
                  icon={<ExchangeIcon />}
                  onClick={() => this.handleHistoryTypeSelect('transactions')}>
                  {localizeString('Transactions')}
                </PaymentsHistoryNavigationItem>
                <PaymentsHistoryNavigationItem
                  isActive={type === 'invoices'}
                  icon={<DocumentIcon />}
                  onClick={() => this.handleHistoryTypeSelect('invoices')}>
                  {localizeString('Invoices')}
                </PaymentsHistoryNavigationItem>
              </PaymentsHistoryNavigation>
            </FlexLayoutChild>
            <FlexLayoutChild>
              {type !== 'invoices' && (
                <DateRangePicker
                  className="spec-billing-history-datepicker"
                  dateFrom={dateFrom}
                  dateTo={dateTo}
                  label={localizeString('for')}
                  onSelect={this.updateHistory} />
              )}
            </FlexLayoutChild>
          </FlexLayout>
        </div>
        <div className={styles.content}>
          {status !== 'receiving' && (
            <React.Fragment>
              <div ref={this.handleTableRef}>
                {type === 'invoices' && (
                  <PaymentsInvoicesTable payments={invoices} />
                )}
                {type === 'transactions' && (
                  <PaymentsTransactionsTable payments={transactions} />
                )}
                {type === 'spending-details' && (
                  <PaymentsSpendingDetailsTable payments={spendingDetails} />
                )}
              </div>
              {total && (
                <div
                  ref={this.handleTableTotalRowRef}
                  className={styles.paymentsListTotal}>
                  <div
                    className={classNames(
                      styles.paymentsListTotalRow,
                      isTableTotalRowNodeSticky && styles.isSticky,
                      'spec-payments-history-total',
                    )}
                    style={totalEntriesRowStyle}>
                    {type === 'invoices' && (
                      <PaymentsInvoicesTotal
                        classNamesList={{
                          column: styles.paymentsListTotalColumn,
                        }}
                        {...total} />
                    )}
                    {type === 'transactions' && (
                      <PaymentsTransactionsTotal
                        classNamesList={{
                          column: styles.paymentsListTotalColumn,
                        }}
                        {...total} />
                    )}
                    {type === 'spending-details' && (
                      <PaymentsSpendingDetailsTotal
                        classNamesList={{
                          column: styles.paymentsListTotalColumn,
                        }}
                        {...total} />
                    )}
                  </div>
                </div>
              )}
            </React.Fragment>
          )}
          {status === 'receiving' && (
            <React.Fragment>
              {type === 'invoices' && <PaymentsInvoicesStub />}
              {type === 'transactions' && <PaymentsTransactionsStub />}
              {type === 'spending-details' && <PaymentsSpendingDetailsStub />}
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }

  private handleTableRef = (node: HTMLDivElement) => {
    this.tableNode = node;
    if (this.tableNode) {
      this.setState({ tableNodeWidth: this.tableNode.getBoundingClientRect().width });
    }
  }

  private handleTableTotalRowRef = (node: HTMLDivElement) => {
    this.tableTotalRowNode = node;
    if (this.tableTotalRowNode) {
      const topOffset = this.tableTotalRowNode.getBoundingClientRect().top + window.scrollY;
      const entryPoint = window.scrollY + window.innerHeight;

      this.setState({
        isTableTotalRowNodeSticky: entryPoint < topOffset + this.tableTotalRowNode.getBoundingClientRect().height,
      });
    }
  }

  private handleWindowScroll = () => {
    if (this.tableTotalRowNode) {
      const topOffset = this.tableTotalRowNode.getBoundingClientRect().top + window.scrollY;
      const entryPoint = window.scrollY + window.innerHeight;

      this.setState({
        isTableTotalRowNodeSticky: entryPoint < topOffset + this.tableTotalRowNode.getBoundingClientRect().height,
      });
    }

    if (this.tableNode) {
      const topOffset = this.tableNode.getBoundingClientRect().top + window.scrollY;
      const entryPoint = window.scrollY + window.innerHeight;
      const { page, totalPages, status } = this.props.paymentsHistory;

      if (
        entryPoint >= topOffset + this.tableNode.getBoundingClientRect().height
          && (!page || totalPages > page)
          && status !== 'downloading' && status !== 'receiving'
      ) {
        this.props.PaymentsHistoryActions.fetchData();
      }
    }
  }

  private handleHistoryTypeSelect = (type: string) => {
    const { history } = this.props;
    this.props.PaymentsHistoryActions.changeHistoryType({ history, type });
    this.props.PaymentsHistoryActions.fetchData();
  }

  private updateHistory = (element: IFormTarget) => {
    const { history } = this.props;
    const { value } = element;
    const [dateFrom, dateTo] = value;

    this.props.PaymentsHistoryActions.updateDate({ dateFrom, dateTo, history });
    this.props.PaymentsHistoryActions.fetchData();
  }

  private fitTotalRowToPaymentTable = () => {
    if (this.tableNode) {
      this.setState({ tableNodeWidth: this.tableNode.getBoundingClientRect().width });
    }
  }
}

function mapStateToProps(state) {
  return {
    paymentsHistory: state.paymentsHistory,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    PaymentsHistoryActions: bindActionCreators(PaymentsHistoryActions, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentsHistory));
