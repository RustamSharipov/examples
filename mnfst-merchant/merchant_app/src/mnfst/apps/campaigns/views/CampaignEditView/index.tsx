import React from 'react';
import { withRouter } from 'react-router-dom';
import { Page, PageHeader, PageContent } from 'apps/ui/components/Page';
import Title from 'apps/ui/components/Title';
import BackControl from 'apps/ui/components/BackControl';
import { FlexLayout, FlexLayoutChild } from 'apps/ui/components/FlexLayout';
import MerchantStatistic from 'apps/base/components/MerchantStatistic';
import { localizeString } from 'utils/localization';
import { routes } from 'merchant/routes';
import CampaignEditForm from './CampaignEditForm';

interface ICampaignEditViewProps {
  history: any;
  match: any;
  isCampaignExist?: boolean;
  isCopy?: boolean;
}

const CampaignEditView: React.SFC<ICampaignEditViewProps> = (props) => {
  const { isCampaignExist, match, isCopy } = props;
  const isNew = !isCampaignExist || isCopy;
  const pageTitle = isNew
    ? localizeString('Create new campaign')
    : localizeString('Edit campaign');

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
              {localizeString('Back to Campaigns')}
            </BackControl>
            <Title level="1">
              {pageTitle}
            </Title>
          </FlexLayoutChild>
          <FlexLayoutChild>
            <MerchantStatistic />
          </FlexLayoutChild>
        </FlexLayout>
      </PageHeader>
      <PageContent>
        <CampaignEditForm
          campaignId={match.params && match.params.id}
          isNew={isNew}
          isCopy={isCopy} />
      </PageContent>
    </Page>
  );
};

export default withRouter(CampaignEditView);
