import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Balance from 'apps/payments/components/Balance';
import BankTransferDialog from 'apps/payments/components/BankTransferDialog';
import Button from 'apps/ui/components/Button';
import ButtonsSet from 'apps/ui/components/ButtonsSet';
import { ContentFrame, ContentFrameSet, ContentFrameCTA } from 'apps/ui/components/ContentFrame';
import { FlexLayout, FlexLayoutChild } from 'apps/ui/components/FlexLayout';
import InfoCircleIcon from 'apps/ui/components/icons/InfoCircleIcon';
import { PaymentAccounts, PaymentAccount, PaymentAccountStub } from 'apps/payments/components/PaymentAccount';
import PaymentAccountsEditDialog from 'apps/payments/components/PaymentAccountsEditDialog';
import TextLink from 'apps/ui/components/TextLink';
import Title from 'apps/ui/components/Title';
import { IPaymentsReducer, IPaymentsActions } from 'apps/payments/interfaces/payments';
import { formatMoney } from 'utils/text';
import { getLocalData } from 'apps/ui/utils/localization';
import { IModalsActions } from 'apps/base/interfaces/modals';
import {
  IPaymentAccountsActions, IPaymentAccountsReducer, IPaymentAccount,
} from 'apps/payments/interfaces/paymentAccounts';
import { IUserReducer } from 'apps/users/interfaces/user';
import { IUserLocationActions } from 'apps/ui/interfaces/userLocation';
import * as PaymentsActions from 'apps/payments/actions/PaymentsActions';
import * as ModalsActions from 'apps/base/actions/ModalsActions';
import * as PaymentAccountsActions from 'apps/payments/actions/PaymentAccountsActions';
import * as ProfileActions from 'apps/users/actions/ProfileActions';
import * as UserLocationActions from 'apps/ui/actions/UserLocationActions';
import styles from './style.css';

interface IPaymentsBillingProps {
  payments: IPaymentsReducer;
  paymentAccounts: IPaymentAccountsReducer;
  user: IUserReducer;
  PaymentsActions: IPaymentsActions;
  ModalsActions: IModalsActions;
  PaymentAccountsActions: IPaymentAccountsActions;
  ProfileActions: any;
  UserLocationActions: IUserLocationActions;
}

class PaymentsBilling extends React.Component<IPaymentsBillingProps> {
  public componentDidMount() {
    this.props.PaymentAccountsActions.fetchData();
    this.props.PaymentsActions.init();
    this.props.UserLocationActions.fetchData();
  }

  public componentDidUpdate(prevProps) {
    const { status } = this.props.payments;
    if (status === 'created' && status !== prevProps.payments.status) {
      this.props.ProfileActions.fetchUserData();
    }
  }

  public render() {
    const { user: { merchant } } = this.props;
    const { paymentAccounts } = this.props.paymentAccounts;
    const paymentAccount: IPaymentAccount | null = paymentAccounts
      ? paymentAccounts.filter(account => account.is_default)[0]
      : null;

    return (
      <div className={styles.billingPayments}>
        <ContentFrameSet>
          <ContentFrame className={classNames(
            styles.billingPaymentsSection,
            'grid-column grid-columns-6',
          )}>
            <div className={styles.paymentHeader}>
              <Title level={3}>
                {getLocalData('pages.payments.billing.paymentMethods.title')}
              </Title>
            </div>
            <PaymentAccounts className={styles.paymentAccounts}>
              {paymentAccount
                ? (
                  <PaymentAccount
                    cardNumber={paymentAccount.last_digits}
                    className={classNames(
                      'spec-billing-payment-method',
                      `spec-billing-payment-${paymentAccount.account_type}-method`,
                    )}
                    expireDate={paymentAccount.card_exp_date}
                    hasPaymentMethodName={true}
                    paymentAccount={paymentAccount.account_type}
                    brand={paymentAccount.brand} />
                )
                : (
                  <PaymentAccountStub onClick={() => this.displayDialog(
                    <PaymentAccountsEditDialog onClose={this.handleClosePaymentAccountsDialog} />,
                  )} />
                )
              }
            </PaymentAccounts>
            <ContentFrameCTA>
              <ButtonsSet>
                <Button
                  className={classNames(
                    'spec-billing-add-payment-method-button',
                    'grid-columns-5',
                  )}
                  onClick={() => this.displayDialog(
                    <PaymentAccountsEditDialog onClose={this.handleClosePaymentAccountsDialog} />,
                  )}
                  theme="violet">
                  {getLocalData('pages.payments.ui.buttons.manage')}
                </Button>
              </ButtonsSet>
            </ContentFrameCTA>
          </ContentFrame>
          <ContentFrame className={classNames(
            styles.billingPaymentsSection,
            'grid-column grid-columns-6',
          )}>
            <div className={styles.paymentHeader}>
              <Title level={3}>
                {getLocalData('pages.payments.billing.billingSummary.title')}
              </Title>
            </div>
            <div className={styles.paymentSummary}>
              <FlexLayout
                alignItems="center"
                justifyContent="space-between">
                <FlexLayoutChild className={styles.paymentSummaryTitle}>
                  {getLocalData('pages.payments.billing.billingSummary.totalBalance')}
                </FlexLayoutChild>
                <FlexLayoutChild>
                  <TextLink
                    iconAfter={<InfoCircleIcon />}
                    onClick={() => this.displayDialog(
                      <BankTransferDialog onClose={this.handleClosePaymentAccountsDialog} />,
                    )}
                    theme="violet">
                    {getLocalData('pages.payments.billing.billingSummary.howToPayWithBankTransfer.title')}
                  </TextLink>
                </FlexLayoutChild>
              </FlexLayout>
              <Balance
                className="spec-billing-total-balance"
                value={merchant && merchant.balance_due} />
              <ContentFrameCTA>
                <FlexLayout justifyContent="space-between">
                  <FlexLayoutChild className="grid-columns-5">
                    <Button
                      className={classNames(
                        'grid-columns-9',
                        'spec-billing-create-payment-button',
                      )}
                      disabled={
                        !merchant || (merchant && !merchant.pay_now_enabled)
                          || !paymentAccounts || paymentAccounts && paymentAccounts.length === 0
                      }
                      onClick={this.pay}
                      theme="violet">
                      {getLocalData('pages.payments.ui.buttons.pay')}
                    </Button>
                  </FlexLayoutChild>
                  <FlexLayoutChild className="grid-columns-7">
                    {merchant && (
                      <p>
                        {getLocalData('pages.payments.billing.billingSummary.thresholdDescription', {
                          placeholders: {
                            threshold: formatMoney(merchant.credit.value, merchant.credit.currency_code),
                          },
                        })}
                      </p>
                    )}
                  </FlexLayoutChild>
                </FlexLayout>
              </ContentFrameCTA>
            </div>
          </ContentFrame>
        </ContentFrameSet>
      </div>
    );
  }

  private displayDialog = (modal: any) => {
    this.props.ModalsActions.display({ modal });
  }

  private pay = () => {
    this.props.PaymentsActions.pay();
  }

  private handleClosePaymentAccountsDialog = () => {
    this.props.ModalsActions.close();
  }
}

function mapStateToProps(state) {
  return {
    payments: state.payments,
    paymentAccounts: state.paymentAccounts,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    PaymentsActions: bindActionCreators(PaymentsActions, dispatch),
    ModalsActions: bindActionCreators(ModalsActions, dispatch),
    PaymentAccountsActions: bindActionCreators(PaymentAccountsActions, dispatch),
    ProfileActions: bindActionCreators(ProfileActions, dispatch),
    UserLocationActions: bindActionCreators(UserLocationActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsBilling);
