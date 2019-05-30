import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BlockDescription from 'apps/ui/components/BlockDescription';
import Button from 'apps/ui/components/Button';
import { ContentFrame } from 'apps/ui/components/ContentFrame';
import { CreativeDesignExample, CreativeDesignExamples } from 'apps/campaigns/components/CreativeDesignExamples';
import Description from 'apps/ui/components/Description';
import { FormRow, FormRowSection } from 'apps/ui/components/Form';
import { FlexLayout, FlexLayoutChild } from 'apps/ui/components/FlexLayout';
import GridDashedIcon from 'apps/ui/components/icons/GridDashedcon';
import { PageSection } from 'apps/ui/components/Page';
import ThreeCardsIcon from 'apps/ui/components/icons/ThreeCardsIcon';
import Title from 'apps/ui/components/Title';
import ValidationStatus from 'apps/ui/components/ValidationStatus';
import {
  ICampaignFormReducer, ICampaignFormActions, ICampaignFormActionUploadCreativeTemplate,
  ICampaignFormActionRemoveCreativeTemplate,
} from 'apps/campaigns/interfaces/campaignForm';
import { IFormTarget } from 'interfaces';
import { getLocalString } from 'utils/localization';
import { MNFST_EXTERNAL_LINKS } from 'constants/base';
import { ICreativeTemplate, ISocialNetworkPlacement } from 'apps/campaigns/interfaces/campaign';
import * as CampaignFormActions from 'apps/campaigns/actions/CampaignFormActions';
import { CreativePosts, CreativePost } from './CreativePosts';
import styles from './style.css';

interface ICreativeTemplatesExamples {
  [name: string]: ICreativeTemplate[];
}

interface ICampaignDesignFormSectionProps {
  onInit?: (target: IFormTarget) => void;
  campaignForm: ICampaignFormReducer;
  CampaignFormActions: ICampaignFormActions;
}

interface ICampaignDesignFormSectionState {
  selectedExampleName: string | null;
}

const creativeTemplatesExamples: ICreativeTemplatesExamples = {
  'staticBackdrop&staticOverlay': [
    {
      assets: [
        {
          layout: 'back',
          type: 'image',
          url: `${MNFST_EXTERNAL_LINKS.STORAGE}/merchant/creatives-examples/mnfstFeedStaticBackdrop.png`,
        },
        {
          layout: 'front',
          type: 'image',
          url: `${MNFST_EXTERNAL_LINKS.STORAGE}/merchant/creatives-examples/mnfstFeedStaticOverlay.png`,
        },
      ],
      placement: 'feed',
    },
    {
      assets: [
        {
          layout: 'back',
          type: 'image',
          url: `${MNFST_EXTERNAL_LINKS.STORAGE}/merchant/creatives-examples/mnfstStoryStaticBackdrop.png`,
        },
        {
          layout: 'front',
          type: 'image',
          url: `${MNFST_EXTERNAL_LINKS.STORAGE}/merchant/creatives-examples/mnfstStoryStaticOverlay.png`,
        },
      ],
      placement: 'story',
    },
  ],
  staticOverlay: [
    {
      assets: [
        {
          layout: 'front',
          type: 'image',
          url: `${MNFST_EXTERNAL_LINKS.STORAGE}/merchant/creatives-examples/aspireFeedStaticOverlay.png`,
        },
      ],
      placement: 'feed',
    },
    {
      assets: [
        {
          layout: 'front',
          type: 'image',
          url: `${MNFST_EXTERNAL_LINKS.STORAGE}/merchant/creatives-examples/aspireStoryStaticOverlay.png`,
        },
      ],
      placement: 'story',
    },
  ],
  videoOverlay: [
    {
      assets: [
        {
          layout: 'front',
          type: 'video',
          url: `${MNFST_EXTERNAL_LINKS.STORAGE}/merchant/creatives-examples/feedVideoOverlay.mp4`,
        },
      ],
      placement: 'feed',
    },
    {
      assets: [
        {
          layout: 'front',
          type: 'video',
          url: `${MNFST_EXTERNAL_LINKS.STORAGE}/merchant/creatives-examples/storyVideoOverlay.mp4`,
        },
      ],
      placement: 'story',
    },
  ],
};

class CampaignDesignFormSection extends React.Component
  <ICampaignDesignFormSectionProps, ICampaignDesignFormSectionState> {
  public state = {
    selectedExampleName: null,
  };

  public render() {
    const {
      errors,
      status,
      campaignForm: {
        campaign: {
          creative_templates,
          creative_type,
          placements,
        },
      },
      placements: availablePlacements,
    } = this.props.campaignForm;
    const { selectedExampleName } = this.state;
    const creativeTemplatesExample: ICreativeTemplate[] = selectedExampleName
      ? creativeTemplatesExamples[selectedExampleName]
      : [];
    const feed: ICreativeTemplate = creativeTemplatesExample.filter(template => template.placement === 'feed')[0]
      || creative_templates.value.filter(template => template.placement === 'feed')[0];
    const story: ICreativeTemplate = creativeTemplatesExample.filter(template => template.placement === 'story')[0]
      || creative_templates.value.filter(template => template.placement === 'story')[0];
    const hasVideosNotice: boolean = !selectedExampleName && (
      (feed && feed.assets.filter(asset => asset.type === 'video' && asset.url).length > 0)
        || (story && story.assets.filter(asset => asset.type === 'video' && asset.url).length > 0)
    );
    const placementFeeds: ISocialNetworkPlacement[] = placements.value && placements.value
      .filter(placement => placement.type === 'feed');
    const placementStories: ISocialNetworkPlacement[] = placements.value && placements.value
      .filter(placement => placement.type === 'story');

    return (
      <PageSection>
        <Title
          onInit={this.handlePageSectionRef}
          level={3}>
          {getLocalString('pages.campaigns.create.design.title')}
        </Title>
        <Description>
          {getLocalString('pages.campaigns.create.design.description')}
        </Description>
        <FormRow className="spec-campaign-form-creative-static">
          <FormRowSection className={styles.creativeTemplates}>
            <FlexLayout direction="column">
              <FlexLayout className={styles.creativeType}>
                <FlexLayoutChild className="grid-columns-6">
                  <Button
                    disabled={creative_templates.nonEditable || status === 'pending' || status === 'loading'}
                    dockTo="right"
                    name="campaign.creative_type"
                    onClick={this.updateFormField}
                    theme={creative_type.value === 'segmentation' ? 'violet-readonly' : 'white'}
                    type="button"
                    value="segmentation">
                    {getLocalString('pages.campaigns.create.design.creativeTypes.staticOverlay&staticBackdrop')}
                  </Button>
                </FlexLayoutChild>
                <FlexLayoutChild className="grid-columns-3">
                  <Button
                    disabled={creative_templates.nonEditable || status === 'pending' || status === 'loading'}
                    dockTo="left-right"
                    name="campaign.creative_type"
                    onClick={this.updateFormField}
                    theme={creative_type.value === 'image' ? 'violet-readonly' : 'white'}
                    type="button"
                    value="image">
                    {getLocalString('pages.campaigns.create.design.creativeTypes.staticOverlay')}
                  </Button>
                </FlexLayoutChild>
                <FlexLayoutChild className="grid-columns-3">
                  <Button
                    disabled={creative_templates.nonEditable || status === 'pending' || status === 'loading'}
                    dockTo="left"
                    name="campaign.creative_type"
                    onClick={this.updateFormField}
                    theme={creative_type.value === 'video' ? 'violet-readonly' : 'white'}
                    type="button"
                    value="video">
                    {getLocalString('pages.campaigns.create.design.creativeTypes.videoOverlay')}
                  </Button>
                </FlexLayoutChild>
              </FlexLayout>
              <ContentFrame
                className={styles.creativesPosts}
                hasErrors={
                  !!errors['campaign.creative_templates']
                    || !!errors['campaign.creative_type']
                    || !!errors['campaign.creative_templates.feed.aspect']
                    || !!errors['campaign.creative_templates.feed.size']
                    || !!errors['campaign.creative_templates.story.aspect']
                    || !!errors['campaign.creative_templates.story.size']
                }>
                <CreativePosts
                  description={
                    hasVideosNotice && getLocalString('pages.campaigns.create.design.videoPreviewNotice')
                  }>
                  <CreativePost
                    assets={story && story.assets}
                    creativeType={creative_type.value}
                    description={getLocalString('pages.campaigns.create.design.story.formatSpecification')}
                    disabled={(placementStories.length === 0 && !selectedExampleName)
                      || (availablePlacements
                        && Object.entries(availablePlacements).filter(([key, { story }]) => story).length === 0)
                      || creative_templates.nonEditable}
                    errors={errors['campaign.creative_templates.story.size']}
                    hasControls={!selectedExampleName}
                    hasErrors={!!errors['campaign.creative_templates.story.aspect']}
                    onAssetRemoveClick={this.handleAssetRemoveClick}
                    onBackdropChange={this.handleBackdropChange}
                    onOverlayChange={this.handleOverlayChange}
                    title={getLocalString('pages.campaigns.create.design.story.title')}
                    placement="story" />
                  <CreativePost
                    assets={feed && feed.assets}
                    creativeType={creative_type.value}
                    description={getLocalString('pages.campaigns.create.design.feed.formatSpecification')}
                    disabled={(placementFeeds.length === 0 && !selectedExampleName)
                      || (availablePlacements
                        && Object.entries(availablePlacements).filter(([key, { feed }]) => feed).length === 0)
                      || creative_templates.nonEditable}
                    errors={errors['campaign.creative_templates.feed.size']}
                    hasControls={!selectedExampleName}
                    hasErrors={!!errors['campaign.creative_templates.feed.aspect']}
                    onAssetRemoveClick={this.handleAssetRemoveClick}
                    onBackdropChange={this.handleBackdropChange}
                    onOverlayChange={this.handleOverlayChange}
                    title={getLocalString('pages.campaigns.create.design.feed.title')}
                    placement="feed" />
                </CreativePosts>
              </ContentFrame>
            </FlexLayout>
          </FormRowSection>
          <FormRowSection className={styles.examples}>
            <FlexLayout direction="column">
              <div className={styles.creativeType} />
              <BlockDescription
                className={styles.example}
                dockTo="bottom"
                iconBefore={<ThreeCardsIcon />}
                title={getLocalString('pages.campaigns.create.design.examples.title')}>
                <CreativeDesignExamples>
                  <CreativeDesignExample
                    name="staticOverlay"
                    notAvailable={creative_templates.nonEditable}
                    onMouseEnter={this.handleExampleEnter}
                    onMouseLeave={this.handleExampleLeave}>
                    {getLocalString('pages.campaigns.create.design.examples.items.staticOverlay')}
                  </CreativeDesignExample>
                  <CreativeDesignExample
                    name="videoOverlay"
                    notAvailable={creative_templates.nonEditable}
                    onMouseEnter={this.handleExampleEnter}
                    onMouseLeave={this.handleExampleLeave}>
                    {getLocalString('pages.campaigns.create.design.examples.items.videoOverlay')}
                  </CreativeDesignExample>
                  <CreativeDesignExample
                    name="staticBackdrop&staticOverlay"
                    notAvailable={creative_templates.nonEditable}
                    onMouseEnter={this.handleExampleEnter}
                    onMouseLeave={this.handleExampleLeave}>
                    {getLocalString('pages.campaigns.create.design.examples.items.staticBackdrop&staticOverlay')}
                  </CreativeDesignExample>
                  <CreativeDesignExample
                    name="staticBackdrop&videoOverlay"
                    notAvailable={true}
                    onMouseEnter={this.handleExampleEnter}
                    onMouseLeave={this.handleExampleLeave}>
                    {getLocalString('pages.campaigns.create.design.examples.items.staticBackdrop&videoOverlay')}
                  </CreativeDesignExample>
                  <CreativeDesignExample
                    name="videoBackdrop&staticOverlay"
                    notAvailable={true}
                    onMouseEnter={this.handleExampleEnter}
                    onMouseLeave={this.handleExampleLeave}>
                    {getLocalString('pages.campaigns.create.design.examples.items.videoBackdrop&staticOverlay')}
                  </CreativeDesignExample>
                  <CreativeDesignExample
                    name="videoBackdrop&videoOverlay"
                    notAvailable={true}
                    onMouseEnter={this.handleExampleEnter}
                    onMouseLeave={this.handleExampleLeave}>
                    {getLocalString('pages.campaigns.create.design.examples.items.videoBackdrop&videoOverlay')}
                  </CreativeDesignExample>
                  <CreativeDesignExample
                    name="panoramicBackdrop"
                    notAvailable={true}
                    onMouseEnter={this.handleExampleEnter}
                    onMouseLeave={this.handleExampleLeave}>
                    {getLocalString('pages.campaigns.create.design.examples.items.panoramicBackdrop')}
                  </CreativeDesignExample>
                  <CreativeDesignExample
                    name="faceLences&masks&filters"
                    notAvailable={true}
                    onMouseEnter={this.handleExampleEnter}
                    onMouseLeave={this.handleExampleLeave}>
                    {getLocalString('pages.campaigns.create.design.examples.items.faceLences&masks&filters')}
                  </CreativeDesignExample>
                </CreativeDesignExamples>
              </BlockDescription>
              <BlockDescription
                className={styles.example}
                dockTo="top"
                iconBefore={<GridDashedIcon />}
                title={getLocalString('pages.campaigns.create.design.specifications.title')}>
                <FlexLayout justifyContent="space-between">
                  <FlexLayoutChild className="grid-column grid-columns-5">
                    <div className="title-5">
                      {getLocalString('pages.campaigns.create.design.specifications.backdrop.title')}
                    </div>
                    <Description withMargins={true}>
                      {getLocalString('pages.campaigns.create.design.specifications.backdrop.description')}
                    </Description>
                  </FlexLayoutChild>
                  <FlexLayoutChild className="grid-column grid-columns-5">
                    <div className="title-5">
                      {getLocalString('pages.campaigns.create.design.specifications.overlay.title')}
                    </div>
                    <Description withMargins={true}>
                      {getLocalString('pages.campaigns.create.design.specifications.overlay.description')}
                    </Description>
                  </FlexLayoutChild>
                </FlexLayout>
              </BlockDescription>
            </FlexLayout>
          </FormRowSection>
        </FormRow>
        <FormRow type="empty">
          <ValidationStatus
            message={errors['campaign.creative_templates']}
            type="error" />
          <ValidationStatus
            message={errors['campaign.creative_type']}
            type="error" />
        </FormRow>
      </PageSection>
    );
  }

  private handlePageSectionRef = (title) => {
    const { element } = title;
    const { onInit } = this.props;
    if (onInit && element) {
      onInit({
        name: 'campaign.creative_templates',
        children: {
          input: element,
        },
      });
    }
  }

  private handleAssetRemoveClick = (params: ICampaignFormActionRemoveCreativeTemplate) => {
    this.props.CampaignFormActions.removeCreativeTemplateAsset(params);
  }

  private handleBackdropChange = (params: ICampaignFormActionUploadCreativeTemplate) => {
    this.props.CampaignFormActions.addCreativeTemplateAsset(params);
  }

  private handleOverlayChange = (params: ICampaignFormActionUploadCreativeTemplate) => {
    this.props.CampaignFormActions.addCreativeTemplateAsset(params);
  }

  private handleExampleEnter = (props) => {
    const { name } = props;
    if (!this.props.campaignForm.campaignForm.campaign.creative_templates.nonEditable) {
      this.setState({ selectedExampleName: name });
    }
  }

  private handleExampleLeave = () => {
    this.setState({ selectedExampleName: null });
  }

  private updateFormField = (target: IFormTarget) => {
    this.props.CampaignFormActions.updateFormField(target);
  }
}

function mapStateToProps(state) {
  return {
    campaignForm: state.campaignForm,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CampaignFormActions: bindActionCreators(CampaignFormActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignDesignFormSection);
