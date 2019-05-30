import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from 'apps/ui/components/Button';
import Description from 'apps/ui/components/Description';
import { FormRow, FormRowSection } from 'apps/ui/components/Form';
import { PageSection } from 'apps/ui/components/Page';
import TextField from 'apps/ui/components/TextField';
import { ICampaignFormReducer, ICampaignFormActions } from 'apps/campaigns/interfaces/campaignForm';
import { IFormTarget } from 'interfaces';
import { getLocalString } from 'utils/localization';
import { isMoneyValue } from 'utils/number';
import * as CampaignFormActions from 'apps/campaigns/actions/CampaignFormActions';
import { IUserReducer } from 'apps/users/interfaces/user';

interface ICampaignBudgetFormSectionProps {
  onInit?: (target: IFormTarget) => void;
  campaignForm: ICampaignFormReducer;
  CampaignFormActions: ICampaignFormActions;
  user: IUserReducer;
}

class CampaignBudgetFormSection extends React.PureComponent<ICampaignBudgetFormSectionProps> {
  public inputElement: HTMLInputElement;

  public render() {
    const {
      campaignForm: {
        campaignForm,
        errors,
        status,
      },
      user: {
        merchant,
      },
    } = this.props;

    return (
      <PageSection title={getLocalString('pages.campaigns.create.budget.title')}>
        <FormRow>
          <FormRowSection part="one-third">
            <Button
              className="spec-campaign-form-non_profit-off-button"
              disabled={campaignForm.campaign.non_profit.nonEditable || status === 'pending'}
              dockTo="right"
              name="campaign.non_profit"
              onClick={this.updateFormField}
              theme={campaignForm.campaign.non_profit.value ? 'white' : 'violet-readonly'}
              type="button"
              value={false}>
              {getLocalString('pages.campaigns.create.budget.profit')}
            </Button>
            <Button
              className="spec-campaign-form-non_profit-on-button"
              disabled={campaignForm.campaign.non_profit.nonEditable || status === 'pending'}
              dockTo="left"
              name="campaign.non_profit"
              onClick={this.updateFormField}
              theme={campaignForm.campaign.non_profit.value ? 'violet-readonly' : 'white'}
              type="button"
              value={true}>
              {getLocalString('pages.campaigns.create.budget.nonProfit')}
            </Button>
          </FormRowSection>
          {!campaignForm.campaign.non_profit.value && (
            <FormRowSection part="one-third">
              <TextField
                disabled={campaignForm.campaign.budget.nonEditable || status === 'pending'}
                errors={errors['campaign.budget']}
                iconAfter={
                  <Description>
                    {merchant && merchant.currency}
                  </Description>
                }
                label={getLocalString('pages.campaigns.create.budget.labels.campaignBudget')}
                name="campaign.budget"
                onInit={this.hookFormField}
                onChange={this.updateMoneyValue}
                value={campaignForm.campaign.budget.value && campaignForm.campaign.budget.value.value} />
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

  private updateMoneyValue = (target: IFormTarget) => {
    const { name, value } = target;
    if (isMoneyValue(value)) {
      this.updateFormField({
        name,
        value: { value },
      });
    }
  }

  private updateFormField = (target: IFormTarget) => {
    this.props.CampaignFormActions.updateFormField(target);
  }
}

function mapStateToProps(state) {
  return {
    campaignForm: state.campaignForm,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CampaignFormActions: bindActionCreators(CampaignFormActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignBudgetFormSection);
