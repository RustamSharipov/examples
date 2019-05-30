import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BlockDescription from 'apps/ui/components/BlockDescription';
import CampaignSelfiePreview from 'apps/campaigns/components/CampaignSelfiePreview';
import CheckBox from 'apps/ui/components/CheckBox';
import { ContentFrame, ContentFrameCTA } from 'apps/ui/components/ContentFrame';
import Description from 'apps/ui/components/Description';
import { FlexLayout, FlexLayoutChild } from 'apps/ui/components/FlexLayout';
import { FormRow, FormRowSection } from 'apps/ui/components/Form';
import { PageSection } from 'apps/ui/components/Page';
import Title from 'apps/ui/components/Title';
import ValidationStatus from 'apps/ui/components/ValidationStatus';
import * as CampaignFormActions from 'apps/campaigns/actions/CampaignFormActions';
import { localizeString } from 'utils/localization';
import { ICampaignFormReducer, ICampaignFormActions } from 'apps/campaigns/interfaces/campaignForm';
import { IFormTarget } from 'interfaces';

interface ICampaignFeaturesFormSectionProps {
  campaignForm: ICampaignFormReducer;
  CampaignFormActions: ICampaignFormActions;
}

class CampaignFeaturesFormSection extends React.PureComponent<ICampaignFeaturesFormSectionProps> {
  public render() {
    const { campaignForm, errors, status } = this.props.campaignForm;
    return (
      <PageSection title={localizeString('Features')}>
        <FormRow>
          <FormRowSection className="grid-column grid-columns-6">
            <ContentFrame className="grid-column grid-columns-12">
              <FlexLayout
                alignItems="center"
                justifyContent="space-between">
                <FlexLayoutChild>
                  <Title level="3">
                    {localizeString('Selfie campaign')}
                  </Title>
                  <Description>
                    {localizeString('Applies only images with faces')}
                  </Description>
                  <ContentFrameCTA>
                    <CheckBox
                      classNamesList={{
                        label: 'spec-campaign-form-face_required',
                      }}
                      disabled={campaignForm.campaign.face_required.nonEditable || status === 'pending'}
                      isChecked={campaignForm.campaign.face_required.value}
                      label={localizeString('Turn on Face tracker')}
                      name="campaign.face_required"
                      onChange={this.updateFormField} />
                  </ContentFrameCTA>
                </FlexLayoutChild>
                <FlexLayoutChild>
                  <CampaignSelfiePreview />
                </FlexLayoutChild>
              </FlexLayout>
            </ContentFrame>
          </FormRowSection>
          <FormRowSection
            className="grid-column grid-columns-6"
            align="stretch">
            <BlockDescription
              title={localizeString('Campaigns with face tracker')}>
              <Description>
                Turn face tracker on to create more personalized campaigns. With this feature turned on users
                tend to create more lively photos. Best options for campaigns with high score accounts.
              </Description>
            </BlockDescription>
          </FormRowSection>
        </FormRow>
        <FormRow type="empty">
          <ValidationStatus
            message={errors.campaigns}
            type="error" />
        </FormRow>
      </PageSection>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(CampaignFeaturesFormSection);
