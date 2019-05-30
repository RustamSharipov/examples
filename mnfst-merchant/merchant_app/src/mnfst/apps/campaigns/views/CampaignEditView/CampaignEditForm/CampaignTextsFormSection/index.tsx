import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  CampaignSocialNetworkPostText, CampaignSocialNetworkPostTexts,
} from 'apps/campaigns/components/CampaignSocialNetworkPostText';
import { FormRow } from 'apps/ui/components/Form';
import { PageSection } from 'apps/ui/components/Page';
import ValidationStatus from 'apps/ui/components/ValidationStatus';
import * as CampaignFormActions from 'apps/campaigns/actions/CampaignFormActions';
import { ICampaignFormReducer, ICampaignFormActions } from 'apps/campaigns/interfaces/campaignForm';
import {
  POST_TEXT_MAX_LENGTH, FACEBOOK_POST_TEXT_MAX_LENGTH, INSTAGRAM_FEED_POST_TEXT_MAX_LENGTH,
  TWITTER_POST_TEXT_MAX_LENGTH, ALLOWED_SOCIAL_NETWORKS, INSTAGRAM_STORY_POST_TEXT_MAX_LENGTH,
} from 'constants/campaigns';
import { IFormTarget } from 'interfaces';
import { getLocalData } from 'apps/ui/utils/localization';
import styles from './style.css';
import campaignDescriptionPreview from './images/campaignDescriptionPreview.png';
import facebookFeedPreview from './images/facebookFeedPreview.png';
import facebookStoryPreview from './images/facebookStoryPreview.png';
import instagramFeedPreview from './images/instagramFeedPreview.png';
import instagramStoryPreview from './images/instagramStoryPreview.png';
import twitterPreview from './images/twitterPreview.png';

interface ICampaignTextsFormSectionProps {
  onInit?: (target: IFormTarget) => void;
  campaignForm: ICampaignFormReducer;
  CampaignFormActions: ICampaignFormActions;
}

class CampaignTextsFormSection extends React.PureComponent<ICampaignTextsFormSectionProps> {
  public render() {
    const { campaignForm, errors, status } = this.props.campaignForm;
    const placementsList = campaignForm.campaign.placements.value;
    const placements = {
      facebook: {
        feed: placementsList
          .filter(placement => placement.social_network === 'facebook' && placement.type === 'feed')[0],
        story: placementsList
          .filter(placement => placement.social_network === 'facebook' && placement.type === 'story')[0],
      },
      instagram: {
        feed: placementsList
          .filter(placement => placement.social_network === 'instagram' && placement.type === 'feed')[0],
        story: placementsList
          .filter(placement => placement.social_network === 'instagram' && placement.type === 'story')[0],
      },
      twitter: {
        feed: placementsList
          .filter(placement => placement.social_network === 'twitter' && placement.type === 'feed')[0],
        story: placementsList
          .filter(placement => placement.social_network === 'twitter' && placement.type === 'story')[0],
      },
    };

    return (
      <PageSection
        title={getLocalData('pages.campaigns.create.texts.title')}
        description={getLocalData('pages.campaigns.create.texts.description')}>
        <FormRow>
          <CampaignSocialNetworkPostTexts>
            <CampaignSocialNetworkPostText
              classNamesList={{
                input: styles.campaignPostTextInput,
              }}
              description={getLocalData('pages.campaigns.create.texts.postText.description')}
              disabled={campaignForm.campaign.description.nonEditable || status === 'pending'}
              errors={errors['campaign.description']}
              maxLength={POST_TEXT_MAX_LENGTH}
              name="campaign.description"
              onChange={this.updateFormField}
              onRef={this.hookFormField}
              sampleSrc={campaignDescriptionPreview}
              title={getLocalData('pages.campaigns.create.texts.postText.title')}
              value={campaignForm.campaign.description.value} />
            {placements.twitter.feed && (
              <CampaignSocialNetworkPostText
                description={getLocalData('pages.campaigns.create.texts.twitter.description')}
                disabled={campaignForm.campaign.placements.nonEditable || status === 'pending'}
                hasErrors={!!errors['campaign.placements.twitter.feed.post_text']}
                maxLength={TWITTER_POST_TEXT_MAX_LENGTH}
                onChange={formTarget => this.updatePlacementText(formTarget, 'twitter', 'feed')}
                onRef={this.hookFormField}
                sampleSrc={twitterPreview}
                socialNetwork="twitter"
                title={getLocalData('pages.campaigns.create.texts.twitter.title')}
                value={placements.twitter.feed && placements.twitter.feed.post_text} />
            )}
            {ALLOWED_SOCIAL_NETWORKS.includes('instagram') && (
              <React.Fragment>
                {placements.instagram.story && (
                  <CampaignSocialNetworkPostText
                    classNamesList={{
                      input: styles.instagramStoryPostTextInput,
                    }}
                    description={getLocalData('pages.campaigns.create.texts.instagram.storyDescription')}
                    disabled={campaignForm.campaign.placements.nonEditable || status === 'pending'}
                    hasErrors={!!errors['campaign.placements.instagram.story.post_text']}
                    maxLength={INSTAGRAM_STORY_POST_TEXT_MAX_LENGTH}
                    onChange={formTarget => this.updatePlacementText(formTarget, 'instagram', 'story')}
                    onRef={this.hookFormField}
                    sampleSrc={instagramStoryPreview}
                    socialNetwork="instagram"
                    title={getLocalData('pages.campaigns.create.texts.instagram.storyTitle')}
                    value={placements.instagram.story && placements.instagram.story.post_text} />
                )}
                {placements.instagram.feed && (
                  <CampaignSocialNetworkPostText
                    classNamesList={{
                      input: styles.instagramFeedPostTextInput,
                    }}
                    description={getLocalData('pages.campaigns.create.texts.instagram.feedDescription')}
                    disabled={campaignForm.campaign.placements.nonEditable || status === 'pending'}
                    hasErrors={!!errors['campaign.placements.instagram.feed.post_text']}
                    maxLength={INSTAGRAM_FEED_POST_TEXT_MAX_LENGTH}
                    onChange={formTarget => this.updatePlacementText(formTarget, 'instagram', 'feed')}
                    onRef={this.hookFormField}
                    sampleSrc={instagramFeedPreview}
                    socialNetwork="instagram"
                    title={getLocalData('pages.campaigns.create.texts.instagram.feedTitle')}
                    value={placements.instagram.feed && placements.instagram.feed.post_text} />
                )}
              </React.Fragment>
            )}
            {ALLOWED_SOCIAL_NETWORKS.includes('facebook') && (
              <React.Fragment>
                {placements.facebook.story && (
                  <CampaignSocialNetworkPostText
                    description={getLocalData('pages.campaigns.create.texts.facebook.storyDescription')}
                    disabled={campaignForm.campaign.placements.nonEditable || status === 'pending'}
                    hasErrors={!!errors['campaign.placements.facebook.story.post_text']}
                    maxLength={FACEBOOK_POST_TEXT_MAX_LENGTH}
                    onChange={formTarget => this.updatePlacementText(formTarget, 'facebook', 'story')}
                    onRef={this.hookFormField}
                    sampleSrc={facebookStoryPreview}
                    socialNetwork="facebook"
                    title={getLocalData('pages.campaigns.create.texts.facebook.storyTitle')}
                    value={placements.facebook.story && placements.facebook.story.post_text} />
                )}
                {placements.facebook.feed && (
                  <CampaignSocialNetworkPostText
                    description={getLocalData('pages.campaigns.create.texts.facebook.feedDescription')}
                    disabled={campaignForm.campaign.placements.nonEditable || status === 'pending'}
                    hasErrors={!!errors['campaign.placements.facebook.feed.post_text']}
                    maxLength={FACEBOOK_POST_TEXT_MAX_LENGTH}
                    onChange={formTarget => this.updatePlacementText(formTarget, 'facebook', 'feed')}
                    onRef={this.hookFormField}
                    sampleSrc={facebookFeedPreview}
                    socialNetwork="facebook"
                    title={getLocalData('pages.campaigns.create.texts.facebook.feedTitle')}
                    value={placements.facebook.feed && placements.facebook.feed.post_text} />
                )}
              </React.Fragment>
            )}
            </CampaignSocialNetworkPostTexts>
          </FormRow>
        <FormRow type="empty">
          <ValidationStatus
            message={errors['campaign.placements.texts']}
            type="error" />
        </FormRow>
      </PageSection>
    );
  }

  private hookFormField = (target: IFormTarget) => {
    const { onInit } = this.props;
    if (onInit) {
      onInit(target);
    }
  }

  private updateFormField = (formTarget: IFormTarget) => {
    this.props.CampaignFormActions.updateFormField(formTarget);
  }

  private updatePlacementText = (formTarget: IFormTarget, socialNetwork: string, type: string) => {
    const { value } = formTarget;
    this.props.CampaignFormActions.updatePlacementText({ socialNetwork, type, value });
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

export default connect(mapStateToProps, mapDispatchToProps)(CampaignTextsFormSection);
