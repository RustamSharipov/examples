import React from 'react';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BooleanStatus from 'apps/ui/components/BooleanStatus';
import Button from 'apps/ui/components/Button';
import { CampaignCreative, CampaignCreatives } from 'apps/ui/components/CampaignMedia';
import {
  CampaignDetailsBody, CampaignDetailsMain, CampaignDetailsAside, CampaignDetailsHeader,
} from 'apps/campaigns/components/CampaignDetails';
import { CampaignPlatform, CampaignPlatforms } from 'apps/ui/components/CampaignPlatforms';
import CampaignStatus from 'apps/campaigns/components/CampaignStatus';
import { DetailsTable, DetailsTableRow, DetailsTableLabel, DetailsTableValue } from 'apps/ui/components/DetailsTable';
import Image from 'apps/ui/components/Image';
import { StatisticItem, StatisticItemTitle, StatisticItemValue } from 'apps/ui/components/Statistic';
import TimeZone from 'apps/ui/components/TimeZone';
import Title from 'apps/ui/components/Title';
import {
  ICampaignReducer, ICampaignActions, ICampaignStatisticData, ICreativeTemplate,
} from 'apps/campaigns/interfaces/campaign';
import { formatDateTime, formatMoney, formatNumber, getGenderVariant } from 'utils/text';
import { getLocalString } from 'utils/localization';
import { routes } from 'merchant/routes';
import * as CampaignActions from 'apps/campaigns/actions/CampaignActions';
import { ALLOWED_SOCIAL_NETWORKS } from 'constants/campaigns';
import { Regions } from 'utils/regions';
import CampaignDetailsChart from './CampaignDetailsChart';
import CampaignQuickEditForm from './CampaignQuickEditForm';
import CampaignDetailsStub from './CampaignDetailsStub';
import styles from './style.css';

interface ICampaignDetailsProps {
  campaign: ICampaignReducer;
  CampaignActions: ICampaignActions;
  history: any;
  match: any;
}

class CampaignDetails extends React.Component<ICampaignDetailsProps> {
  public componentDidMount() {
    const { match, CampaignActions } = this.props;
    if (match.params && match.params.id) {
      const { id } = match.params;
      CampaignActions.fetchData(id);
    }
  }

  public componentDidUpdate() {
    const { campaign: { redirect }, history } = this.props;
    if (redirect) {
      history.push(redirect);
    }
  }

  public render() {
    const {
      campaign: {
        brand,
        campaign,
        status,
      },
      match: {
        params: { id },
      },
    } = this.props;

    if (status === 'receiving') {
      return (
        <CampaignDetailsStub />
      );
    }

    const feed: ICreativeTemplate = campaign.creative_templates.filter(template => template.placement === 'feed')[0];
    const story: ICreativeTemplate = campaign.creative_templates.filter(template => template.placement === 'story')[0];
    const statisticData: ICampaignStatisticData = Object.entries(campaign.statistic)
      .reduce((result, [chartName, data]) => {
        const facebook = data.map(item => item.facebook);
        const instagram = data.map(item => item.instagram);
        const overall = data.map(item => item.overall);
        const twitter = data.map(item => item.twitter);

        result[chartName] = {
          ...(facebook.filter(item => typeof item === 'number').length > 0 && { facebook }),
          ...(instagram.filter(item => typeof item === 'number').length > 0 && { instagram }),
          ...(overall.filter(item => typeof item === 'number').length > 0 && { overall }),
          ...(twitter.filter(item => typeof item === 'number').length > 0 && { twitter }),
        };

        return result;
      },      {});
    const sexVariant = getGenderVariant(campaign.sex);
    const socialNetworks: string[] = [...campaign.placements]
      .map(placement => placement.social_network)
      .filter(socialNetwork => ALLOWED_SOCIAL_NETWORKS.includes(socialNetwork))
      .sort()
      .filter((socialNetwork, index, socialNetworks) => index === 0 || socialNetwork !== socialNetworks[index - 1]);

    return (
      <CampaignDetailsBody>
        <CampaignDetailsMain>
          <CampaignDetailsHeader>
            <div className={styles.brand}>
              <div className={styles.brandLogo}>
                <Image
                  alt={brand.name}
                  className={styles.brandLogoImage}
                  src={brand.image} />
              </div>
              <div className={styles.brandName}>
                {brand.name}
              </div>
            </div>
            <div className={styles.campaignName}>
              {campaign.name}
            </div>
            <div className={styles.campaignData}>
              <div className={styles.campaignDataItem}>
                <div className={styles.dateTime}>
                  {formatDateTime(campaign.start_at, 'D MMM YYYY, h:mm a')}{' – '}
                  {formatDateTime(campaign.end_at, 'D MMM YYYY, h:mm a')}
                </div>
                {campaign.time_zone && (
                  <div className={styles.dateTime}>
                    <TimeZone timezone={campaign.time_zone} />
                  </div>
                )}
              </div>
              <div className={styles.campaignDataItem}>
                {socialNetworks && (
                  <CampaignPlatforms>
                    {socialNetworks.map(socialNetwork => (
                      <CampaignPlatform
                        key={socialNetwork}
                        className={classNames(
                          `spec-campaign-${id}-platform`,
                          `spec-campaign-platform-${socialNetwork}`,
                        )}
                        type={socialNetwork} />
                    ))}
                  </CampaignPlatforms>
                )}
              </div>
              <div className={styles.campaignDataItem}>
                <CampaignStatus status={campaign.status} />
              </div>
            </div>
            <div className={styles.statistic}>
              <StatisticItem className="spec-campaign-statistic-budget-spent">
                <StatisticItemTitle>
                  {getLocalString('pages.campaigns.details.header.budgetSpent')}
                </StatisticItemTitle>
                <StatisticItemValue>
                  {formatMoney(campaign.spent.value, campaign.spent.currency_code)}
                </StatisticItemValue>
              </StatisticItem>
              <StatisticItem className="spec-campaign-statistic-campaign-budget">
                <StatisticItemTitle>
                  {getLocalString('pages.campaigns.details.header.campaignBudget')}
                </StatisticItemTitle>
                <StatisticItemValue>
                  {formatMoney(campaign.budget.value, campaign.budget.currency_code)}
                </StatisticItemValue>
              </StatisticItem>
              <StatisticItem className="spec-campaign-statistic-total-supporters">
                <StatisticItemTitle>
                  {getLocalString('pages.campaigns.details.header.totalSupporters')}
                </StatisticItemTitle>
                <StatisticItemValue>
                  {campaign.participants_count && formatNumber(campaign.participants_count)}
                </StatisticItemValue>
              </StatisticItem>
            </div>
          </CampaignDetailsHeader>
          <div>
            {(campaign.statistic.impressions_feed && feed) && (
              <CampaignDetailsChart
                campaignId={id}
                classNamesList={{
                  dateTimePicker: 'spec-campaign-impressions_feed-datetime-picker',
                }}
                data={statisticData.impressions_feed}
                labels={campaign.statistic.impressions_feed.map(item => item.label)}
                placement="feed"
                title={getLocalString('pages.campaigns.details.statistic.impressionsFeed.title')}
                type="impressions" />
            )}
            {(campaign.statistic.impressions_story && story) && (
              <CampaignDetailsChart
                campaignId={id}
                classNamesList={{
                  dateTimePicker: 'spec-campaign-impressions_story-datetime-picker',
                }}
                data={statisticData.impressions_story}
                labels={campaign.statistic.impressions_story.map(item => item.label)}
                placement="story"
                title={getLocalString('pages.campaigns.details.statistic.impressionsStory.title')}
                type="impressions" />
            )}
            {(campaign.statistic.supporters_feed && feed) && (
              <CampaignDetailsChart
                campaignId={id}
                classNamesList={{
                  dateTimePicker: 'spec-campaign-supporters_feed-datetime-picker',
                }}
                data={statisticData.supporters_feed}
                labels={campaign.statistic.supporters_feed.map(item => item.label)}
                placement="feed"
                title={getLocalString('pages.campaigns.details.statistic.supportersFeed.title')}
                type="supporters" />
            )}
            {(campaign.statistic.supporters_story && story) && (
              <CampaignDetailsChart
                campaignId={id}
                classNamesList={{
                  dateTimePicker: 'spec-campaign-supporters_story-datetime-picker',
                }}
                data={statisticData.supporters_story}
                labels={campaign.statistic.supporters_story.map(item => item.label)}
                placement="story"
                title={getLocalString('pages.campaigns.details.statistic.supportersStory.title')}
                type="supporters" />
            )}
            {(campaign.statistic.engagements_feed && feed) && (
              <CampaignDetailsChart
                campaignId={id}
                classNamesList={{
                  dateTimePicker: 'spec-campaign-engagements_feed-datetime-picker',
                }}
                data={statisticData.engagements_feed}
                labels={campaign.statistic.engagements_feed.map(item => item.label)}
                placement="feed"
                title={getLocalString('pages.campaigns.details.statistic.engagements.title')}
                type="engagements" />
            )}
          </div>
        </CampaignDetailsMain>
        <CampaignDetailsAside>
          <CampaignCreatives>
            {(feed && feed.preview_url) && (
              <CampaignCreative
                placement="feed"
                src={feed.preview_url}
                type={campaign.creative_type} />
            )}
            {(story && story.preview_url) && (
              <CampaignCreative
                placement="story"
                src={story.preview_url}
                type={campaign.creative_type} />
            )}
          </CampaignCreatives>
          <div className={styles.form}>
            <div className={styles.formRow}>
              <Title
                className={styles.formRowTitle}
                level={2}>
                {getLocalString('pages.campaigns.details.aside.targeting.title')}
              </Title>
              <DetailsTable>
                {campaign.geo_targets.length > 0 && (
                  <DetailsTableRow>
                    <DetailsTableLabel>
                      {getLocalString('pages.campaigns.details.aside.targeting.country')}
                    </DetailsTableLabel>
                    <DetailsTableValue>
                      {Regions.getAllCountries()
                        .filter(country => campaign.countries.includes(country.value))
                        .map(country => country.name)
                        .join(', ')}
                    </DetailsTableValue>
                  </DetailsTableRow>
                )}
                <DetailsTableRow>
                  <DetailsTableLabel>
                    {getLocalString('pages.campaigns.details.aside.targeting.gender')}
                  </DetailsTableLabel>
                  <DetailsTableValue>
                    {sexVariant && sexVariant.label}
                  </DetailsTableValue>
                </DetailsTableRow>
                <DetailsTableRow>
                  <DetailsTableLabel>
                    {getLocalString('pages.campaigns.details.aside.targeting.age')}
                  </DetailsTableLabel>
                  <DetailsTableValue>
                    {campaign.min_age} – {campaign.max_age || '65+'}
                  </DetailsTableValue>
                </DetailsTableRow>
                {'face_required' in campaign && (
                  <DetailsTableRow>
                    <DetailsTableLabel>
                      {getLocalString('pages.campaigns.details.aside.targeting.faceDetection')}
                    </DetailsTableLabel>
                    <DetailsTableValue>
                      <BooleanStatus
                        labels={['On', 'Off']}
                        status={campaign.face_required} />
                    </DetailsTableValue>
                  </DetailsTableRow>
                )}
              </DetailsTable>
            </div>
            {campaign.actions.includes('edit') && (
              <React.Fragment>
                <div className={styles.formControls}>
                  <Button
                    className="spec-campaign-edit"
                    link={routes['campaigns.edit'].getPath(id)}
                    size="large"
                    theme="violet-border">
                    {getLocalString('pages.campaigns.details.aside.editCampaign')}
                  </Button>
                </div>
                <div className={styles.formRow}>
                  <Title
                    className={styles.formRowTitle}
                    level={2}>
                    {getLocalString('pages.campaigns.details.quickEdit.title')}
                  </Title>
                  <CampaignQuickEditForm />
                </div>
              </React.Fragment>
            )}
          </div>
        </CampaignDetailsAside>
      </CampaignDetailsBody>
    );
  }
}

function mapStateToProps(state) {
  return {
    campaign: state.campaign,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CampaignActions: bindActionCreators(CampaignActions, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CampaignDetails));
