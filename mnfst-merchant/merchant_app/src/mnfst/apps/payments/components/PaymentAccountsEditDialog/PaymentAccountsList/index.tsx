import React from 'react';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ActionsListControl from 'apps/ui/components/ActionsListControl';
import Button from 'apps/ui/components/Button';
import { DialogFooter } from 'apps/ui/components/Dialog';
import { FlexLayout } from 'apps/ui/components/FlexLayout';
import { PaymentAccounts, PaymentAccount, PaymentAccountStub } from 'apps/payments/components/PaymentAccount';
import { IPaymentAccountsActions, IPaymentAccountsReducer } from 'apps/payments/interfaces/paymentAccounts';
import * as PaymentAccountsActions from 'apps/payments/actions/PaymentAccountsActions';
import { getLocalString } from 'utils/localization';
import TextLink from 'apps/ui/components/TextLink';

interface IPaymentAccountsListProps {
  onConfirm: () => void;
  onPaymentMethodAdd: () => void;
  paymentAccounts: IPaymentAccountsReducer;
  PaymentAccountsActions: IPaymentAccountsActions;
}

class PaymentAccountsList extends React.Component<IPaymentAccountsListProps> {
  public componentDidMount() {
    this.props.PaymentAccountsActions.fetchData();
  }

  public render() {
    const { paymentAccounts } = this.props.paymentAccounts;
    const paymentAccountsWithLeadingPrimary = paymentAccounts.length > 0
      ? [
        paymentAccounts.filter(paymentAccount => paymentAccount.is_default)[0],
        ...paymentAccounts.filter(paymentAccount => !paymentAccount.is_default),
      ]
      : [];

    return (
      <React.Fragment>
        {paymentAccountsWithLeadingPrimary.length > 0
          ? (
            <PaymentAccounts>
              {paymentAccountsWithLeadingPrimary.map(paymentAccount => (
                <PaymentAccount
                  key={paymentAccount.id}
                  actions={
                    paymentAccount.is_default
                      ? undefined
                      : (
                        <ActionsListControl
                          actionsList={[
                            {
                              id: 1,
                              name: getLocalString('pages.payments.ui.buttons.makePrimary'),
                              onClick: () => this.makePaymentAccountDefault(paymentAccount.id),
                              value: 'primary',
                            },
                            {
                              id: 2,
                              name: getLocalString('pages.payments.ui.buttons.delete'),
                              onClick: () => this.deletePaymentAccount(paymentAccount.id),
                              value: 'delete',
                            },
                          ]} />
                      )
                  }
                  brand={paymentAccount.brand}
                  className={classNames(
                    'spec-billing-payment-method',
                    `spec-billing-payment-${paymentAccount.account_type}-method`,
                  )}
                  cardNumber={paymentAccount.last_digits}
                  expireDate={paymentAccount.card_exp_date}
                  isPrimary={paymentAccount.is_default}
                  paymentAccount={paymentAccount.account_type} />
              ))}
            </PaymentAccounts>
          )
        : <PaymentAccountStub onClick={this.displayAccountAddForm} />}
        <DialogFooter>
          <FlexLayout
            alignItems="center"
            justifyContent="space-between">
            <TextLink
              className="spec-billing-payment-methods-add-button"
              disabled={status === 'pending'}
              onClick={this.displayAccountAddForm}
              theme="violet">
              {getLocalString('pages.payments.ui.buttons.addPaymentsMethod')}
            </TextLink>
            <Button
              className={classNames(
                'spec-billing-payment-methods-add-button',
                'grid-columns-4',
              )}
              disabled={status === 'pending'}
              onClick={this.confirm}
              theme="violet">
              {getLocalString('pages.payments.ui.buttons.confirm')}
            </Button>
          </FlexLayout>
        </DialogFooter>
      </React.Fragment>
    );
  }

  private makePaymentAccountDefault = (id: number) => {
    this.props.PaymentAccountsActions.makePrimary({ id });
  }

  private deletePaymentAccount = (id: number) => {
    this.props.PaymentAccountsActions.deleteAccount({ id });
  }

  private displayAccountAddForm = () => {
    const { onPaymentMethodAdd } = this.props;
    if (onPaymentMethodAdd) {
      onPaymentMethodAdd();
    }
  }

  private confirm = () => {
    const { onConfirm } = this.props;
    if (onConfirm) {
      onConfirm();
    }
  }
}

function mapStateToProps(state) {
  return {
    paymentAccounts: state.paymentAccounts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    PaymentAccountsActions: bindActionCreators(PaymentAccountsActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentAccountsList);
