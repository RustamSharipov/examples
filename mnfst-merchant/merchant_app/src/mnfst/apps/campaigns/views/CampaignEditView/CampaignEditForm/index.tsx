import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import Button from 'apps/ui/components/Button';
import ButtonsSet from 'apps/ui/components/ButtonsSet';
import { Form } from 'apps/ui/components/Form';
import { PageSection } from 'apps/ui/components/Page';
import SubmitStatus from 'apps/ui/components/SubmitStatus';
import * as CampaignFormActions from 'apps/campaigns/actions/CampaignFormActions';
import { ICampaignFormReducer, ICampaignFormActions } from 'apps/campaigns/interfaces/campaignForm';
import { scrollToFirstInvalidFormFieldElement } from 'utils/form';
import { IFormTarget, IFormTargetChildren } from 'interfaces';
import { getLocalData } from 'apps/ui/utils/localization';
import CampaignEditFormStub from './CampaignEditFormStub';
import CampaignBrandFormSection from './CampaignBrandFormSection';
import CampaignTargetingFormSection from './CampaignTargetingFormSection';
import CampaignPlatformsFormSection from './CampaignPlatformsFormSection';
import CampaignDesignFormSection from './CampaignDesignFormSection';
import CampaignInformationFormSection from './CampaignInformationFormSection';
import CampaignBudgetFormSection from './CampaignBudgetFormSection';
import CampaignFeaturesFormSection from './CampaignFeaturesFormSection';
import CampaignTextsFormSection from './CampaignTextsFormSection';
import CampaignTimezoneFormSection from './CampaignTimezoneFormSection';
import ValidationStatus from 'apps/ui/components/ValidationStatus';

interface ICampaignEditViewProps {
  campaignForm: ICampaignFormReducer;
  CampaignFormActions: ICampaignFormActions;
  isNew: boolean;
  campaignId?: string;
  isCopy?: boolean;
  history: any;
}

class CampaignEditView extends React.PureComponent<ICampaignEditViewProps> {
  public formFieldsInputElements: IFormTargetChildren;

  constructor(props) {
    super(props);
    this.formFieldsInputElements = {};

    const { isNew, campaignId: id, CampaignFormActions, isCopy } = props;
    CampaignFormActions.fetchPlacements();

    if (isNew && !id) {
      CampaignFormActions.init();
    }
    if (id) {
      CampaignFormActions.fetchData({ id, isCopy });
    }
  }

  public componentDidUpdate(prevProps) {
    const { campaignForm: { redirect, status }, history } = this.props;

    if (status === 'error' && status !== prevProps.campaignForm.status) {
      this.scrollToFirstInvalidFormField();
    }

    if (redirect) {
      history.push(redirect);
    }
  }

  public render() {
    const {
      campaignForm: {
        campaignForm,
        errors,
        status,
      },
      isNew,
    } = this.props;
    const method = isNew ? 'POST' : 'PUT';
    let saveButtonLabel;
    let submitButtonLabel;

    if (campaignForm.campaign.creative_templates.nonEditable) {
      submitButtonLabel = getLocalData('pages.campaigns.create.ui.updateButton');
    }

    else {
      saveButtonLabel = isNew
        ? getLocalData('pages.campaigns.create.ui.createButton')
        : getLocalData('pages.campaigns.create.ui.saveButton');
      submitButtonLabel = isNew
        ? getLocalData('pages.campaigns.create.ui.createSubmitButton')
        : getLocalData('pages.campaigns.create.ui.saveSubmitButton');
    }

    if (status === 'receiving') {
      return (
        <CampaignEditFormStub />
      );
    }

    return (
      <Form
        encType="multipart/form-data"
        method={method}
        onSubmit={this.handleSubmit}>
        <CampaignBrandFormSection onInit={this.hookFormFieldsInputElement} />
        <CampaignInformationFormSection onInit={this.hookFormFieldsInputElement} />
        <CampaignTimezoneFormSection />
        <CampaignTargetingFormSection onInit={this.hookFormFieldsInputElement} />
        <CampaignBudgetFormSection onInit={this.hookFormFieldsInputElement} />
        <CampaignPlatformsFormSection onInit={this.hookFormFieldsInputElement} />
        <CampaignTextsFormSection onInit={this.hookFormFieldsInputElement} />
        <CampaignDesignFormSection onInit={this.hookFormFieldsInputElement} />
        <CampaignFeaturesFormSection />
        <PageSection type="footer">
          <div className={classNames(
            'grid-column',
            'grid-columns-3',
            'spec-campaign-save-status-element',
          )}>
            <SubmitStatus
              message={status === 'updated' ? 'Saved!' : ''}
              type="success" />
            <ValidationStatus
              message={errors.campaignForm}
              type="error" />
          </div>
          <ButtonsSet
            align="end"
            className="grid-column grid-columns-9">
            {saveButtonLabel && (
              <Button
                className={classNames(
                  'grid-column',
                  'grid-columns-4',
                  'spec-campaign-save-draft-button',
                )}
                disabled={status === 'pending' || status === 'loading'}
                onClick={() => this.handleDraftSubmit(method)}
                size="large"
                theme="violet-transparent">
                {saveButtonLabel}
              </Button>
            )}
            <Button
              className={classNames(
                'grid-column',
                'grid-columns-4',
                'spec-campaign-submit-button',
              )}
              disabled={status === 'pending' || status === 'loading'}
              size="large"
              theme="violet">
              {submitButtonLabel}
            </Button>
          </ButtonsSet>
        </PageSection>
      </Form>
    );
  }

  private hookFormFieldsInputElement = (target: IFormTarget) => {
    const { name, children } = target;

    if (children) {
      this.formFieldsInputElements[name] = children.input;
    }
  }

  private handleDraftSubmit = (method: string) => {
    const { isCopy } = this.props;

    this.props.CampaignFormActions.submit({
      isCopy,
      method,
      isDraft: true,
    });
  }

  private handleSubmit = (method: string) => {
    const { isCopy } = this.props;

    this.props.CampaignFormActions.submit({
      method,
      isCopy,
    });
  }

  private scrollToFirstInvalidFormField = () => {
    scrollToFirstInvalidFormFieldElement({
      elements: this.formFieldsInputElements,
      errors: this.props.campaignForm.errors,
    });
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CampaignEditView));
