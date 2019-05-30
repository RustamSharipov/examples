import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DateTimeField from 'apps/ui/components/DateTimeField';
import Description from 'apps/ui/components/Description';
import { FormRow, FormRowSection } from 'apps/ui/components/Form';
import InfoCircleIcon from 'apps/ui/components/icons/InfoCircleIcon';
import { PageSection } from 'apps/ui/components/Page';
import TextField from 'apps/ui/components/TextField';
import { ICampaignFormReducer, ICampaignFormActions } from 'apps/campaigns/interfaces/campaignForm';
import { IFormTarget } from 'interfaces';
import { getLocalData } from 'apps/ui/utils/localization';
import * as CampaignFormActions from 'apps/campaigns/actions/CampaignFormActions';
import styles from './style.css';

const MAX_CAMPAIGN_NAME_LENGTH = 35;

interface ICampaignInformationFormSection {
  onInit?: (target: IFormTarget) => void;
  campaignForm: ICampaignFormReducer;
  CampaignFormActions: ICampaignFormActions;
}

class CampaignInformationFormSection extends React.PureComponent<ICampaignInformationFormSection> {
  public render() {
    const { campaignForm, errors, status } = this.props.campaignForm;
    const currentTimestamp = Date.now();
    const startDateTimestamp = new Date(campaignForm.campaign.start_at.value).getTime();
    const minStartDate = startDateTimestamp > currentTimestamp
      ? campaignForm.campaign.start_at.value
      : new Date();
    const maxEndDate = campaignForm.campaign.end_at.value
      ? campaignForm.campaign.end_at.value
      : null;

    return (
      <PageSection
        title={getLocalData('pages.campaigns.create.information.title')}
        description={getLocalData('pages.campaigns.create.information.description')}>
        <FormRow>
          <FormRowSection part="two-thirds">
            <TextField
              disabled={campaignForm.campaign.name.nonEditable || status === 'pending'}
              errors={errors['campaign.name']}
              iconAfter={(
                <div className={styles.campaignNameCharCount}>
                  {MAX_CAMPAIGN_NAME_LENGTH - campaignForm.campaign.name.value.length}
                  {' / '}
                  {MAX_CAMPAIGN_NAME_LENGTH}
                </div>
              )}
              isRequired={campaignForm.campaign.name.isRequired}
              label={getLocalData('pages.campaigns.create.information.labels.campaignName')}
              maxLength={MAX_CAMPAIGN_NAME_LENGTH}
              name="campaign.name"
              onInit={this.hookFormField}
              onChange={this.updateFormField}
              value={campaignForm.campaign.name.value} />
          </FormRowSection>
        </FormRow>
        <FormRow>
          <FormRowSection
            className="spec-campaign-form-start_at-section"
            part="one-third">
            <DateTimeField
              disabled={campaignForm.campaign.start_at.nonEditable || status === 'pending'}
              errors={errors['campaign.start_at']}
              label={getLocalData('pages.campaigns.create.information.labels.startDateTime')}
              name="campaign.start_at"
              min={minStartDate}
              max={maxEndDate}
              onInit={this.hookFormField}
              onChange={this.updateFormField}
              value={campaignForm.campaign.start_at.value} />
          </FormRowSection>
          <FormRowSection
            className="spec-campaign-form-end_at-section"
            part="one-third">
            <DateTimeField
              disabled={campaignForm.campaign.end_at.nonEditable || status === 'pending'}
              errors={errors['campaign.end_at']}
              label={getLocalData('pages.campaigns.create.information.labels.endDateTime')}
              name="campaign.end_at"
              min={minStartDate}
              onInit={this.hookFormField}
              onChange={this.updateFormField}
              value={campaignForm.campaign.end_at.value} />
          </FormRowSection>
          <FormRowSection
            part="one-third"
            align="center">
            <Description iconBefore={<InfoCircleIcon />}>
              {getLocalData('pages.campaigns.create.information.disclaimer')}
            </Description>
          </FormRowSection>
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

export default connect(mapStateToProps, mapDispatchToProps)(CampaignInformationFormSection);
