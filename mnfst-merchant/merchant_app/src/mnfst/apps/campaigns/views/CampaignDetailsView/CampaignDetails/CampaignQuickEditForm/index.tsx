import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from 'apps/ui/components/Button';
import { FormRow, FormRowSection, Form, FormRowsGroup } from 'apps/ui/components/Form';
import SubmitStatus from 'apps/ui/components/SubmitStatus';
import TextField from 'apps/ui/components/TextField';
import { getLocalString } from 'utils/localization';
import {
  ICampaignQuickEditFormActions, ICampaignQuickEditFormReducer,
} from 'apps/campaigns/interfaces/campaignQuickEditForm';
import { IFormTarget } from 'interfaces';
import { getGenderVariant } from 'utils/text';
import * as CampaignQuickEditFormActions from 'apps/campaigns/actions/CampaignQuickEditFormActions';
import ValidationStatus from 'apps/ui/components/ValidationStatus';
import { ICampaignReducer, ISocialNetworkPlacement } from 'apps/campaigns/interfaces/campaign';
import { isMoneyValue } from 'utils/number';

interface ICampaignQuickEditFormProps {
  campaign: ICampaignReducer;
  campaignQuickEditForm: ICampaignQuickEditFormReducer;
  CampaignQuickEditFormActions: ICampaignQuickEditFormActions;
}

class CampaignQuickEditForm extends React.PureComponent<ICampaignQuickEditFormProps> {
  public componentDidMount() {
    this.props.CampaignQuickEditFormActions.init();
  }

  public render() {
    const {
      campaignQuickEditForm: {
        campaignQuickEditForm,
        errors,
        status,
      },
    } = this.props;
    const sexVariant = getGenderVariant(campaignQuickEditForm.campaign.sex.value);
    const isNonProfitCampaign: boolean = campaignQuickEditForm.campaign.non_profit.value;
    const socialNetworkPlacements: ISocialNetworkPlacement[] = campaignQuickEditForm.campaign.placements.value;
    const instagramFeed = socialNetworkPlacements
      .filter(placement => placement.type === 'feed' && placement.social_network === 'instagram')[0];
    const instagramStory = socialNetworkPlacements
      .filter(placement => placement.type === 'story' && placement.social_network === 'instagram')[0];
    const twitterFeed = socialNetworkPlacements
      .filter(placement => placement.type === 'feed' && placement.social_network === 'twitter')[0];

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormRow>
          <TextField
            disabled={campaignQuickEditForm.campaign.budget.nonEditable || status === 'pending'}
            errors={errors['campaign.budget']}
            label={getLocalString('pages.campaigns.details.quickEdit.budget')}
            name="campaign.budget"
            onChange={this.updateMoneyFormField}
            value={campaignQuickEditForm.campaign.budget.value && campaignQuickEditForm.campaign.budget.value.value} />
        </FormRow>
        {(instagramFeed || twitterFeed) && (
          <FormRowsGroup caption={getLocalString('pages.campaigns.details.quickEdit.feedTitle')}>
            <FormRow>
              {instagramFeed && (
                <FormRowSection part="half">
                  <TextField
                    disabled={status === 'pending' || isNonProfitCampaign
                      || campaignQuickEditForm.campaign.placements.nonEditable}
                    errors={errors['campaign.placements.instagram.feed.price']}
                    label={getLocalString('pages.campaigns.details.quickEdit.instagramCPM')}
                    name="instagram.feed"
                    onChange={formTarget => this.updatePlacementPrice(formTarget, 'instagram', 'feed')}
                    value={instagramFeed && instagramFeed.price && instagramFeed.price.value} />
                </FormRowSection>
              )}
              {twitterFeed && (
                <FormRowSection part="half">
                  <TextField
                    disabled={status === 'pending' || isNonProfitCampaign
                      || campaignQuickEditForm.campaign.placements.nonEditable}
                    errors={errors['campaign.placements.twitter.feed.price']}
                    label={getLocalString('pages.campaigns.details.quickEdit.twitterCPM')}
                    name="twitter.feed"
                    onChange={formTarget => this.updatePlacementPrice(formTarget, 'twitter', 'feed')}
                    value={twitterFeed && twitterFeed.price && twitterFeed.price.value} />
                </FormRowSection>
              )}
            </FormRow>
          </FormRowsGroup>
        )}
        {instagramStory && (
          <FormRowsGroup caption={getLocalString('pages.campaigns.details.quickEdit.storyTitle')}>
            <FormRow>
              <FormRowSection part="half">
                <TextField
                  disabled={status === 'pending' || isNonProfitCampaign
                    || campaignQuickEditForm.campaign.placements.nonEditable}
                  errors={errors['campaign.placements.instagram.story.price']}
                  label={getLocalString('pages.campaigns.details.quickEdit.instagramCPM')}
                  name="instagram.story"
                  onChange={formTarget => this.updatePlacementPrice(formTarget, 'instagram', 'story')}
                  value={instagramStory && instagramStory.price && instagramStory.price.value} />
              </FormRowSection>
            </FormRow>
          </FormRowsGroup>
        )}
        <FormRow type="empty">
          <ValidationStatus
            type="error"
            message={errors['campaign.social_networks']} />
        </FormRow>
        <FormRow>
          {!isNonProfitCampaign && (
            <FormRowSection
              className="spec-quick-edit-form-paid-participant-section"
              part="one-third">
              <TextField
                disabled={campaignQuickEditForm.campaign.paid_participations_count.nonEditable || status === 'pending'}
                label={getLocalString('pages.campaigns.details.quickEdit.paidParticipations')}
                name="campaign.paid_participations_count"
                onChange={this.updateIntegerValueFormField}
                value={campaignQuickEditForm.campaign.paid_participations_count.value} />
            </FormRowSection>
          )}
        </FormRow>
        <FormRow>
          <Button
            disabled={campaignQuickEditForm.campaign.sex.nonEditable || status === 'pending'}
            dockTo="right"
            name="campaign.sex"
            onClick={this.updateFormField}
            theme={sexVariant && sexVariant.value === 'any' ? 'violet-readonly' : 'white'}
            type="button"
            value={['male', 'female']}>
            {getLocalString('ui.genders.any')}
          </Button>
          <Button
            disabled={campaignQuickEditForm.campaign.sex.nonEditable || status === 'pending'}
            dockTo="left-right"
            name="campaign.sex"
            onClick={this.updateFormField}
            theme={sexVariant && sexVariant.value === 'male' ? 'violet-readonly' : 'white'}
            type="button"
            value={['male']}>
            {getLocalString('ui.genders.male')}
          </Button>
          <Button
            disabled={campaignQuickEditForm.campaign.sex.nonEditable || status === 'pending'}
            dockTo="left"
            name="campaign.sex"
            onClick={this.updateFormField}
            theme={sexVariant && sexVariant.value === 'female' ? 'violet-readonly' : 'white'}
            type="button"
            value={['female']}>
            {getLocalString('ui.genders.female')}
          </Button>
        </FormRow>
        <FormRow type="empty">
          <ValidationStatus
            type="error"
            message={errors.campaign} />
        </FormRow>
        <FormRow type="control">
          <Button
            disabled={status === 'pending'}
            size="large"
            theme="violet">
            {getLocalString('pages.campaigns.details.quickEdit.submitButton')}
          </Button>
        </FormRow>
        <FormRow type="control">
          <SubmitStatus
            message={status === 'updated' ? 'Saved!' : ''}
            type="success" />
        </FormRow>
      </Form>
    );
  }

  private updatePlacementPrice = (formTarget: IFormTarget, socialNetwork: string, type: string) => {
    const { value } = formTarget;
    if (isMoneyValue(value)) {
      this.props.CampaignQuickEditFormActions.updatePlacementPrice({ socialNetwork, type, value });
    }
  }

  private updateMoneyFormField = (target: IFormTarget) => {
    const { name, value } = target;
    if (isMoneyValue(value)) {
      this.updateFormField({
        name,
        value: { value },
      });
    }
  }

  private updateIntegerValueFormField = (target: IFormTarget) => {
    const { name } = target;
    const value = target.value ? +target.value : null;

    if (Number.isInteger(+target.value)) {
      this.updateFormField({
        name,
        value,
      });
    }
  }

  private updateFormField = (formTarget: IFormTarget) => {
    this.props.CampaignQuickEditFormActions.updateFormField(formTarget);
  }

  private handleSubmit = () => {
    this.props.CampaignQuickEditFormActions.submit();
  }
}

function mapStateToProps(state) {
  return {
    campaign: state.campaign,
    campaignQuickEditForm: state.campaignQuickEditForm,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CampaignQuickEditFormActions: bindActionCreators(CampaignQuickEditFormActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignQuickEditForm);
