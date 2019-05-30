import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DropdownListField from 'apps/ui/components/DropdownListField';
import { FormRow, FormRowSection } from 'apps/ui/components/Form';
import { PageSection } from 'apps/ui/components/Page';
import { Regions } from 'utils/regions';
import { localizeString } from 'utils/localization';
import { ICampaignFormReducer, ICampaignFormActions } from 'apps/campaigns/interfaces/campaignForm';
import { IFormTarget } from 'interfaces';
import * as CampaignFormActions from 'apps/campaigns/actions/CampaignFormActions';

const timezonesList = Regions.getAllTimezones();

interface ICampaignTimezoneFormSectionProps {
  campaignForm: ICampaignFormReducer;
  CampaignFormActions: ICampaignFormActions;
}

class CampaignTimezoneFormSection extends React.PureComponent<ICampaignTimezoneFormSectionProps> {
  public render() {
    const { campaignForm, errors, status } = this.props.campaignForm;
    return (
      <PageSection title="Campaign timezone">
        <FormRow>
          <FormRowSection part="one-third">
            <DropdownListField
              className="spec-campaign-form-timezone-dropdown"
              classNamesList={{
                item: 'spec-campaign-form-timezone-dropdown-item',
              }}
              disabled={campaignForm.campaign.time_zone.nonEditable || status === 'pending'}
              label={localizeString('Select timezone')}
              name="campaign.time_zone"
              value={campaignForm.campaign.time_zone.value || '(GMT+00:00) London'}
              errors={errors['campaign.time_zone']}
              items={timezonesList}
              onChange={this.updateFormField} />
          </FormRowSection>
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

export default connect(mapStateToProps, mapDispatchToProps)(CampaignTimezoneFormSection);
