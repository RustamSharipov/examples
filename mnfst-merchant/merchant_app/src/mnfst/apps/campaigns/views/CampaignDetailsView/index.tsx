import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BackControl from 'apps/ui/components/BackControl';
import { FlexLayout, FlexLayoutChild } from 'apps/ui/components/FlexLayout';
import MerchantStatistic from 'apps/base/components/MerchantStatistic';
import { Page, PageHeader, PageContent } from 'apps/ui/components/Page';
import Title from 'apps/ui/components/Title';
import { ICampaignActions } from 'apps/campaigns/interfaces/campaign';
import { getLocalString } from 'utils/localization';
import * as CampaignActions from 'apps/campaigns/actions/CampaignActions';
import { routes } from 'merchant/routes';
import CampaignDetails from './CampaignDetails';

interface ICampaignDetailsViewProps {
  CampaignActions: ICampaignActions;
  history: any;
  match: any;
}

class CampaignDetailsView extends React.Component<ICampaignDetailsViewProps> {
  public componentDidMount() {
    const { match, CampaignActions } = this.props;
    if (match.params && match.params.id) {
      const { id } = match.params;
      CampaignActions.fetchData(id);
    }
  }

  public render() {
    return (
      <Page>
        <PageHeader>
          <FlexLayout
            alignItems="flex-end"
            justifyContent="space-between">
            <FlexLayoutChild>
              <BackControl
                className="spec-campaign-linkto-campaigns"
                link={routes.campaigns.path}>
                {getLocalString('pages.campaigns.ui.back')}
              </BackControl>
              <Title level={1}>
                {getLocalString('pages.campaigns.details.title')}
              </Title>
            </FlexLayoutChild>
            <FlexLayoutChild>
              <MerchantStatistic />
            </FlexLayoutChild>
          </FlexLayout>
        </PageHeader>
        <PageContent noPadding={true}>
          <CampaignDetails />
        </PageContent>
      </Page>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    CampaignActions: bindActionCreators(CampaignActions, dispatch),
  };
}

export default withRouter(connect(null, mapDispatchToProps)(CampaignDetailsView));
