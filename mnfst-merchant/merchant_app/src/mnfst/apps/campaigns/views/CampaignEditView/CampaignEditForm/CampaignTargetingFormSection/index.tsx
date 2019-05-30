import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from 'apps/ui/components/Button';
import DropdownListField from 'apps/ui/components/DropdownListField';
import { FormRow, FormRowSection } from 'apps/ui/components/Form';
import { PageSection } from 'apps/ui/components/Page';
import TextField from 'apps/ui/components/TextField';
import { ICampaignFormReducer, ICampaignFormActions } from 'apps/campaigns/interfaces/campaignForm';
import { IFormTarget } from 'interfaces';
import * as CampaignFormActions from 'apps/campaigns/actions/CampaignFormActions';
import { getLocalData } from 'apps/ui/utils/localization';
import { getGenderVariant } from 'utils/text';
import GeoTargeting from './GeoTargeting';

const ageList = Array(66)
  .fill(1)
  .map((item, index) => index)
  .filter(item => item >= 16)
  .map((item, index, arr) => ({
    name: index === arr.length - 1 ? `${item}+` : String(item),
    value: item,
  }));

interface ICampaignTargetingFormSectionProps {
  campaignForm: ICampaignFormReducer;
  CampaignFormActions: ICampaignFormActions;
  onInit?: (target: IFormTarget) => void;
}

class CampaignTargetingFormSection extends React.PureComponent<ICampaignTargetingFormSectionProps> {
  public render() {
    const { campaignForm, errors, status } = this.props.campaignForm;
    const minAgeList = ageList;
    const maxAgeList = +campaignForm.campaign.min_age.value
      ? ageList.filter(age => +age.value > +campaignForm.campaign.min_age.value)
      : ageList;

    const sexVariant = getGenderVariant(campaignForm.campaign.sex.value);

    return (
      <PageSection
        title={getLocalData('pages.campaigns.create.targeting.title')}
        description={getLocalData('pages.campaigns.create.targeting.description')}>
        <GeoTargeting />
        <FormRow>
          <FormRowSection part="one-third">
            <Button
              className="spec-campaign-form-sex-any-button"
              disabled={campaignForm.campaign.sex.nonEditable || status === 'pending'}
              dockTo="right"
              name="campaign.sex"
              onClick={this.updateFormField}
              theme={sexVariant && sexVariant.value === 'any' ? 'violet-readonly' : 'white'}
              type="button"
              value={['male', 'female']}>
              {getLocalData('ui.genders.any')}
            </Button>
            <Button
              className="spec-campaign-form-sex-male-button"
              disabled={campaignForm.campaign.sex.nonEditable || status === 'pending'}
              dockTo="left-right"
              name="campaign.sex"
              onClick={this.updateFormField}
              theme={sexVariant && sexVariant.value === 'male' ? 'violet-readonly' : 'white'}
              type="button"
              value={['male']}>
              {getLocalData('ui.genders.male')}
            </Button>
            <Button
              className="spec-campaign-form-sex-female-button"
              disabled={campaignForm.campaign.sex.nonEditable || status === 'pending'}
              dockTo="left"
              name="campaign.sex"
              onClick={this.updateFormField}
              theme={sexVariant && sexVariant.value === 'female' ? 'violet-readonly' : 'white'}
              type="button"
              value={['female']}>
              {getLocalData('ui.genders.female')}
            </Button>
          </FormRowSection>
          <FormRowSection part="one-third">
            <DropdownListField
              className="spec-campaign-form-min_age-dropdown"
              classNamesList={{
                control: 'spec-campaign-form-min_age-dropdown-control',
                item: 'spec-campaign-form-min_age-dropdown-item',
              }}
              disabled={campaignForm.campaign.min_age.nonEditable || status === 'pending'}
              dockTo="right"
              errors={errors['campaign.min_age']}
              items={minAgeList}
              label={getLocalData('pages.campaigns.create.targeting.ageFrom')}
              name="campaign.min_age"
              onChange={this.updateFormField}
              value={campaignForm.campaign.min_age.value} />
            <DropdownListField
              className="spec-campaign-form-max_age-dropdown"
              classNamesList={{
                control: 'spec-campaign-form-max_age-dropdown-control',
                item: 'spec-campaign-form-max_age-dropdown-item',
              }}
              disabled={campaignForm.campaign.max_age.nonEditable || status === 'pending'}
              dockTo="left"
              errors={errors['campaign.max_age']}
              items={maxAgeList}
              label={getLocalData('pages.campaigns.create.targeting.ageTo')}
              name="campaign.max_age"
              onChange={this.updateFormField}
              value={campaignForm.campaign.max_age.value} />
          </FormRowSection>
          {!campaignForm.campaign.non_profit.value && (
            <FormRowSection part="one-third">
              <div className="grid-columns-8">
                <TextField
                  disabled={campaignForm.campaign.paid_participations_count.nonEditable || status === 'pending'}
                  errors={errors['campaign.paid_participations_count']}
                  label={getLocalData('pages.campaigns.create.targeting.paidParticipations.label')}
                  name="campaign.paid_participations_count"
                  onInit={this.hookFormField}
                  onChange={this.updateIntegerValueFormField}
                  tooltip={getLocalData('pages.campaigns.create.targeting.paidParticipations.description')}
                  value={campaignForm.campaign.paid_participations_count.value}
                />
              </div>
            </FormRowSection>
          )}
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

  private updateIntegerValueFormField = (target: IFormTarget) => {
    const { name } = target;
    const value = target.value ? +target.value : null;

    if (Number.isInteger(+target.value)) {
      this.updateFormField({ name, value });
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(CampaignTargetingFormSection);
