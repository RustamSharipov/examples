import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dialog, DialogPreheader, DialogClose } from 'apps/ui/components/Dialog';
import { IPaymentAccountsReducer, IPaymentAccountsActions } from 'apps/payments/interfaces/paymentAccounts';
import * as PaymentAccountsActions from 'apps/payments/actions/PaymentAccountsActions';
import { getLocalData } from 'apps/ui/utils/localization';
import PaymentAccountsList from './PaymentAccountsList';
import PaymentAccountForm from './PaymentAccountForm';
import styles from './style.css';

const dialogTitles = {
  accountsList: getLocalData('pages.payments.billing.paymentMethods.title'),
  newAccount: getLocalData('pages.payments.billing.paymentMethods.methodStubTitle'),
};

interface IPaymentAccountsEditDialogProps {
  onClose: () => void;
  paymentAccounts: IPaymentAccountsReducer;
  PaymentAccountsActions: IPaymentAccountsActions;
}

interface IPaymentAccountsEditDialogState {
  formType: 'accountsList' | 'newAccount';
}

class PaymentAccountsEditDialog extends React.Component<IPaymentAccountsEditDialogProps,
  IPaymentAccountsEditDialogState> {
  constructor(props) {
    super(props);
    const { paymentAccounts } = props.paymentAccounts;

    this.state = {
      formType: paymentAccounts.length > 0 ? 'accountsList' : 'newAccount',
    };
  }

  public render() {
    const { formType } = this.state;
    const dialogTitle = dialogTitles[formType];

    return (
      <div className={styles.paymentsMethodsDialog}>
        <DialogPreheader>
          <span>
            {dialogTitle}
          </span>
          <DialogClose onClick={this.closeDialog} />
        </DialogPreheader>
        <Dialog className="spec-billing-payment-methods-dialog">
          {formType === 'accountsList' && (
            <PaymentAccountsList
              onPaymentMethodAdd={this.setAccountAdd}
              onConfirm={this.closeDialog} />
          )}
          {formType === 'newAccount' && (
            <PaymentAccountForm onPaymentAccountsListBack={this.setAccountsList} />
          )}
        </Dialog>
      </div>
    );
  }

  private setAccountAdd = () => {
    this.setState({ formType: 'newAccount' });
  }

  private setAccountsList = () => {
    const {
      onClose,
      paymentAccounts: {
        paymentAccounts,
      },
    } = this.props;

    this.props.PaymentAccountsActions.fetchData();

    if (paymentAccounts.length > 0) {
      this.setState({ formType: 'accountsList' });
    }

    else {
      if (onClose) {
        onClose();
      }
    }
  }

  private closeDialog = () => {
    const { onClose } = this.props;
    if (onClose) {
      onClose();
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentAccountsEditDialog);
