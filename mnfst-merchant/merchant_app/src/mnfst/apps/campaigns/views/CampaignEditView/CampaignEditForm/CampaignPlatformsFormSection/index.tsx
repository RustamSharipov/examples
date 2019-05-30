import React from 'react';
import { connect } from 'react-redux';
import { CampaignPlatforms } from 'apps/ui/components/CampaignPlatforms';
import { FormRow } from 'apps/ui/components/Form';
import { PageSection } from 'apps/ui/components/Page';
import ValidationStatus from 'apps/ui/components/ValidationStatus';
import { ALLOWED_SOCIAL_NETWORKS } from 'constants/campaigns';
import { ICampaignFormReducer } from 'apps/campaigns/interfaces/campaignForm';
import { IFormTarget } from 'interfaces';
import { getLocalString } from 'utils/localization';
import CampaignPlatform from './CampaignPlatform';

interface ICampaignPlatformFormSectionProps {
  onInit?: (target: IFormTarget) => void;
  campaignForm: ICampaignFormReducer;
}

class CampaignPlatformFormSection extends React.Component<ICampaignPlatformFormSectionProps> {
  public render() {
    const { errors, placements } = this.props.campaignForm;

    return (
      <PageSection
        title={getLocalString('pages.campaigns.create.placement.title')}
        description={getLocalString('pages.campaigns.create.placement.description')}
        onRef={this.handlePageSectionRef}>
        <FormRow type="empty">
          <ValidationStatus
            message={errors['campaign.placements']}
            type="error" />
        </FormRow>
        <FormRow>
          {placements && (
            <CampaignPlatforms>
              {ALLOWED_SOCIAL_NETWORKS.map(socialNetwork => (
                <CampaignPlatform
                  key={socialNetwork}
                  className={`spec-campaign-form-platform-${socialNetwork}`}
                  classNamesList={{
                    button: `spec-campaign-form-platform-${socialNetwork}-button`,
                    input: `spec-campaign-form-platform-${socialNetwork}-input`,
                  }}
                  id={socialNetwork}
                  onCPMFieldInit={this.handleCampaignPlatformRef} />
              ))}
            </CampaignPlatforms>
          )}
        </FormRow>
      </PageSection>
    );
  }

  private handlePageSectionRef = (node: HTMLDivElement) => {
    const { onInit } = this.props;

    if (onInit && node) {
      onInit({
        name: 'campaign.placements',
        children: {
          input: node,
        },
      });
    }
  }

  private handleCampaignPlatformRef = ({ element, type }) => {
    const { children, name } = element;
    const { onInit } = this.props;

    if (onInit && children) {
      onInit({
        children,
        name,
      });
    }
  }
}

function mapStateToProps(state) {
  return {
    campaignForm: state.campaignForm,
  };
}

export default connect(mapStateToProps)(CampaignPlatformFormSection);
