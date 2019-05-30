import React from 'react';
import { connect } from 'react-redux';
import { ContentFrame } from 'apps/ui/components/ContentFrame';
import Description from 'apps/ui/components/Description';
import { DetailsTable, DetailsTableRow, DetailsTableLabel, DetailsTableValue } from 'apps/ui/components/DetailsTable';
import { Dialog, DialogPreheader, DialogClose } from 'apps/ui/components/Dialog';
import Title from 'apps/ui/components/Title';
import { IUserReducer } from 'apps/users/interfaces/user';
import { IUserLocationReducer } from 'apps/ui/interfaces/userLocation';
import { BILLING_MNFST_SUPPORT_EMAIL } from 'apps/ui/constants/base';
import { getLocalData } from 'apps/ui/utils/localization';
import styles from './style.css';

interface IBankTransferDialogProps {
  onClose: () => void;
  user: IUserReducer;
  userLocation: IUserLocationReducer;
}

class BankTransferDialog extends React.Component<IBankTransferDialogProps> {
  public render() {
    const {
      user: { merchant },
      userLocation: { userLocation },
    } = this.props;

    return (
      <div className={styles.bankTransferDialog}>
        <DialogPreheader>
          <span>
            {getLocalData('pages.payments.billing.billingSummary.howToPayWithBankTransfer.title')}
          </span>
          <DialogClose onClick={this.closeDialog} />
        </DialogPreheader>
        <Dialog>
          <p>
            {getLocalData('pages.payments.billing.billingSummary.howToPayWithBankTransfer.description')}
          </p>
          <ContentFrame>
            <Title level={3}>
              {getLocalData('pages.payments.billing.billingSummary.howToPayWithBankTransfer.paymentDetails.title')}
            </Title>
            {userLocation && (
              <DetailsTable>
                {userLocation.companyName && (
                  <DetailsTableRow>
                    <DetailsTableLabel>
                      {getLocalData(
                        'pages.payments.billing.billingSummary.howToPayWithBankTransfer.paymentDetails.beneficiary',
                      )}
                    </DetailsTableLabel>
                    <DetailsTableValue className={styles.detailsTableValue}>
                      {userLocation.companyName}
                    </DetailsTableValue>
                  </DetailsTableRow>
                )}
                {userLocation.companyNumber && (
                  <DetailsTableRow>
                    <DetailsTableLabel>
                      {getLocalData(
                        'pages.payments.billing.billingSummary.howToPayWithBankTransfer.paymentDetails'
                        + '.companyRegNumber',
                      )}
                    </DetailsTableLabel>
                    <DetailsTableValue className={styles.detailsTableValue}>
                      {userLocation.companyNumber}
                    </DetailsTableValue>
                  </DetailsTableRow>
                )}
                {userLocation && userLocation.bank_requisites && userLocation.bank_requisites.iban && (
                  <DetailsTableRow>
                    <DetailsTableLabel>
                      {getLocalData(
                        'pages.payments.billing.billingSummary.howToPayWithBankTransfer.paymentDetails.iban',
                      )}
                    </DetailsTableLabel>
                    <DetailsTableValue className={styles.detailsTableValue}>
                      {userLocation && userLocation.bank_requisites && userLocation.bank_requisites.iban}
                    </DetailsTableValue>
                  </DetailsTableRow>
                )}
                {userLocation && userLocation.bank_requisites && userLocation.bank_requisites.bic && (
                  <DetailsTableRow>
                    <DetailsTableLabel>
                      {getLocalData(
                        'pages.payments.billing.billingSummary.howToPayWithBankTransfer.paymentDetails.bic',
                      )}
                    </DetailsTableLabel>
                    <DetailsTableValue className={styles.detailsTableValue}>
                      {userLocation && userLocation.bank_requisites && userLocation.bank_requisites.bic}
                    </DetailsTableValue>
                  </DetailsTableRow>
                )}
                {userLocation.beneficiaryAddress && (
                  <DetailsTableRow>
                    <DetailsTableLabel>
                      {getLocalData(
                        'pages.payments.billing.billingSummary.howToPayWithBankTransfer.paymentDetails'
                        + '.beneficiaryAddress',
                      )}
                    </DetailsTableLabel>
                    <DetailsTableValue className={styles.detailsTableValue}>
                      {userLocation.beneficiaryAddress}
                    </DetailsTableValue>
                  </DetailsTableRow>
                )}
                {userLocation && userLocation.bank_requisites && userLocation.bank_requisites.bank && (
                  <DetailsTableRow>
                    <DetailsTableLabel>
                      {getLocalData(
                        'pages.payments.billing.billingSummary.howToPayWithBankTransfer.paymentDetails'
                        + '.paymentInstitution',
                      )}
                    </DetailsTableLabel>
                    <DetailsTableValue className={styles.detailsTableValue}>
                      {userLocation && userLocation.bank_requisites && userLocation.bank_requisites.bank}
                    </DetailsTableValue>
                  </DetailsTableRow>
                )}
                {userLocation && userLocation.bank_requisites && userLocation.bank_requisites.sort_code && (
                  <DetailsTableRow>
                    <DetailsTableLabel>
                      {getLocalData(
                        'pages.payments.billing.billingSummary.howToPayWithBankTransfer.paymentDetails.sortCode',
                      )}
                    </DetailsTableLabel>
                    <DetailsTableValue className={styles.detailsTableValue}>
                      {userLocation && userLocation.bank_requisites && userLocation.bank_requisites.sort_code}
                    </DetailsTableValue>
                  </DetailsTableRow>
                )}
                {userLocation && userLocation.bank_requisites && userLocation.bank_requisites.account_number && (
                  <DetailsTableRow>
                    <DetailsTableLabel>
                      {getLocalData(
                        'pages.payments.billing.billingSummary.howToPayWithBankTransfer.paymentDetails.accountNumber',
                      )}
                    </DetailsTableLabel>
                    <DetailsTableValue className={styles.detailsTableValue}>
                      {userLocation && userLocation.bank_requisites && userLocation.bank_requisites.account_number}
                    </DetailsTableValue>
                  </DetailsTableRow>
                )}
                {merchant && merchant.id && (
                  <DetailsTableRow>
                    <DetailsTableLabel>
                      {getLocalData(
                        'pages.payments.billing.billingSummary.howToPayWithBankTransfer.paymentDetails.reference',
                      )}
                    </DetailsTableLabel>
                    <DetailsTableValue className={styles.detailsTableValue}>
                      {merchant.id}
                      <Description className={styles.detailsTableValueDescriotion}>
                        {getLocalData(
                          'pages.payments.billing.billingSummary.howToPayWithBankTransfer.paymentDetails'
                          + '.referenceDisclaimer',
                        )}
                      </Description>
                    </DetailsTableValue>
                  </DetailsTableRow>
                )}
              </DetailsTable>
            )}
          </ContentFrame>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{
              __html: getLocalData(
                'pages.payments.billing.billingSummary.howToPayWithBankTransfer.support',
                {
                  placeholders: {
                    billingSupportEmail: BILLING_MNFST_SUPPORT_EMAIL,
                  },
                },
              ),
            }} />
        </Dialog>
      </div>
    );
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
    user: state.user,
    userLocation: state.userLocation,
  };
}

export default connect(mapStateToProps)(BankTransferDialog);
