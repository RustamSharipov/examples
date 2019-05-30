import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import Button from 'apps/ui/components/Button';
import CampaignsSet, { CampaignsSetStub } from './CampaignsSet';
import { FlexLayout, FlexLayoutChild } from 'apps/ui/components/FlexLayout';
import { FormRow } from 'apps/ui/components/Form';
import MerchantStatistic from 'apps/base/components/MerchantStatistic';
import { Page, PageHeader, PageContent } from 'apps/ui/components/Page';
import PageNavigation from 'apps/ui/components/PageNavigation';
import Title from 'apps/ui/components/Title';
import TopPanel from 'apps/ui/components/TopPanel';
import { Table, TableHead, TableBody, TableHeadCell } from 'apps/ui/components/Table';
import PlusIcon from 'apps/ui/components/icons/PlusIcon';
import PlusCircleIcon from 'apps/ui/components/icons/PlusCircleIcon';
import LighthouseIcon from 'apps/ui/components/icons/LighthouseIcon';
import { ICampaignsListReducer, ICampaignsListActions } from 'apps/campaigns/interfaces/campaignsList';
import * as CampaignsListActions from 'apps/campaigns/actions/CampaignsListActions';
import { routes } from 'merchant/routes';
import styles from './style.css';
import { getLocalData } from 'apps/ui/utils/localization';

const campaignsCaptions = [
  { id: 1, name: getLocalData('pages.campaigns.list.titles.campaignName') },
  { id: 2, name: getLocalData('pages.campaigns.list.titles.startDate') },
  { id: 3, name: getLocalData('pages.campaigns.list.titles.endDate') },
  { id: 4, name: getLocalData('pages.campaigns.list.titles.platforms') },
  { id: 5, name: getLocalData('pages.campaigns.list.titles.formats') },
  { id: 6, name: getLocalData('pages.campaigns.list.titles.budget') },
  { id: 7, name: getLocalData('pages.campaigns.list.titles.supporters') },
  { id: 8, name: getLocalData('pages.campaigns.list.titles.status') },
  { id: 9, name: getLocalData('pages.campaigns.list.titles.actions') },
];

interface ICampaignsIndexViewProps {
  campaignsList: ICampaignsListReducer;
  CampaignsListActions: ICampaignsListActions;
  history: any;
}

class CampaignsIndexView extends React.Component<ICampaignsIndexViewProps> {
  public componentDidMount() {
    this.props.CampaignsListActions.fetchData();
  }

  public render() {
    const { meta, brands, campaignsList, status } = this.props.campaignsList;
    const currentPage = meta.current_page;
    const totalPages = meta.total_pages || 0;

    const brandsWithCampaigns = brands.reduce(
      (list, brand) => {
        const hasBrands = campaignsList.filter(campaign => campaign.brand_id === brand.id).length > 0;
        if (hasBrands) {
          list.push(brand);
        }
        return list;
      },
      [],
    );

    const campaigns = brandsWithCampaigns
      .map(brand => ({
        id: brand.id,
        brand: {
          id: brand.id,
          name: brand.name,
          image: brand.image,
        },
        items: campaignsList
          .filter(campaign => campaign.brand_id === brand.id)
          .map((campaign, index) => ({
            id: index + 1,
            ...campaign,
          })),
      }));

    return (
      <Page>
        <PageHeader>
          <FlexLayout
            alignItems="flex-end"
            justifyContent="space-between">
            <FlexLayoutChild>
              <Title level={1}>
                {getLocalData('pages.campaigns.list.title')}
              </Title>
            </FlexLayoutChild>
            <FlexLayoutChild>
              <MerchantStatistic />
            </FlexLayoutChild>
          </FlexLayout>
        </PageHeader>
        <PageContent noPadding={true}>
          {status === 'empty'
            ? (
              <FlexLayout
                direction="column"
                grow={1}>
                <div className={styles.emptyListToolbar}>
                  <FormRow className="grid-columns-3">
                    <Button
                      className="spec-campaigns-create-new-button"
                      link={routes['campaigns.new'].getPath()}
                      theme="violet">
                      <span className={styles.createCampaignButton}>
                        <PlusIcon className={styles.createCampaignButtonIcon} />
                        <span className={styles.createCampaignButtonCaption}>
                          {getLocalData('pages.campaigns.list.ui.createCampaignButton')}
                        </span>
                      </span>
                    </Button>
                  </FormRow>
                </div>
                <FlexLayout
                  alignItems="center"
                  direction="column"
                  grow={1}
                  justifyContent="center">
                  <LighthouseIcon className={styles.lighthouseIcon} />
                  <div className="title-2">
                    {getLocalData('pages.campaigns.list.emptyListTitle')}
                  </div>
                  <div className={styles.createCampaignCaption}>
                    {getLocalData('pages.campaigns.list.emptyListDescription')}
                  </div>
                </FlexLayout>
              </FlexLayout>
            )
            : (
              <React.Fragment>
                <TopPanel>
                  <Button
                    className="grid-column grid-columns-3 spec-campaigns-create-new-button"
                    link={routes['campaigns.new'].path}
                    theme="violet">
                    <span className={styles.createCampaignButton}>
                      <PlusCircleIcon className={styles.createCampaignButtonIcon} />
                      <span className={styles.createCampaignButtonCaption}>
                        {getLocalData('pages.campaigns.list.ui.createCampaignButton')}
                      </span>
                    </span>
                  </Button>
                </TopPanel>
                <Table>
                  <TableHead>
                    <TableHeadCell className={styles.thumbnailColumn} />
                    {campaignsCaptions.map(caption => (
                      <TableHeadCell key={caption.id}>
                        {caption.name}
                      </TableHeadCell>
                    ))}
                  </TableHead>
                  <TableBody>
                    {status === 'loading'
                      ? Array(3).fill(1).map((_, index) => (
                        <CampaignsSetStub key={index} />
                      ))
                      : campaigns.map(campaign => (
                        <CampaignsSet
                          key={campaign.id}
                          {...campaign}
                          onActionChange={this.handleActionChange} />
                      ))
                    }
                  </TableBody>
                </Table>
                {totalPages > 1 && (
                  <div className={classNames(
                    styles.navigation,
                    'spec-campaigns-navigation',
                  )}>
                    <PageNavigation
                      classNamesList={{
                        item: 'spec-campaigns-navigation-item',
                        nextLink: 'spec-campaigns-navigation-next',
                        prevLink: 'spec-campaigns-navigation-prev',
                      }}
                      currentPage={currentPage}
                      onPageChange={this.handlePageChange}
                      totalPages={totalPages} />
                  </div>
                )}
              </React.Fragment>
            )
          }
        </PageContent>
      </Page>
    );
  }

  private handleActionChange = ({ id, value }) => {
    const { history } = this.props;
    if (value === 'edit' || value === 'copy') {
      history.push(routes['campaigns.action'].getPath(id, value));
    }
    else {
      this.props.CampaignsListActions.changeCampaignStatus({ id, action: value });
    }
  }

  private handlePageChange = ({ pageNumber }) => {
    this.props.CampaignsListActions.fetchData({ pageNumber });
  }
}

function mapStateToProps(state) {
  return {
    campaignsList: state.campaignsList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CampaignsListActions: bindActionCreators(CampaignsListActions, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CampaignsIndexView));
