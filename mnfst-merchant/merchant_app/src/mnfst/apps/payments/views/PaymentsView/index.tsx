import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FlexLayout, FlexLayoutChild } from 'apps/ui/components/FlexLayout';
import MerchantStatistic from 'apps/base/components/MerchantStatistic';
import { Page, PageHeader, PageContent } from 'apps/ui/components/Page';
import Title from 'apps/ui/components/Title';
import { IPaymentsReducer, IPaymentsActions } from 'apps/payments/interfaces/payments';
import { localizeString } from 'utils/localization';
import * as PaymentsActions from 'apps/payments/actions/PaymentsActions';
import PaymentsHistory from './PaymentsHistory';
import PaymentsBilling from './PaymentsBilling';

interface IPaymentsViewProps {
  billing: IPaymentsReducer;
  PaymentsActions: IPaymentsActions;
}

class PaymentsView extends React.Component<IPaymentsViewProps> {
  public render() {
    return (
      <Page>
        <PageHeader>
          <FlexLayout
            alignItems="flex-end"
            justifyContent="space-between">
            <FlexLayoutChild>
              <Title level="1">
                {localizeString('Billing')}
              </Title>
            </FlexLayoutChild>
            <FlexLayoutChild>
              <MerchantStatistic />
            </FlexLayoutChild>
          </FlexLayout>
        </PageHeader>
        <PageContent noPadding={true}>
          <PaymentsBilling />
          <PaymentsHistory />
        </PageContent>
      </Page>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    PaymentsActions: bindActionCreators(PaymentsActions, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(PaymentsView);
