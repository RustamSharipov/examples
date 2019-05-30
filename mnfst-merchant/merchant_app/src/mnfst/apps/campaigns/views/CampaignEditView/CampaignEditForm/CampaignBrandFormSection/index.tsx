import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Animation from 'apps/ui/components/Animation';
import BrandLogo from 'apps/ui/components/BrandLogo';
import Button from 'apps/ui/components/Button';
import ColorPickerField from 'apps/ui/components/ColorPickerField';
import { ContentFrameSet, ContentFrame, ContentFrameCTA } from 'apps/ui/components/ContentFrame';
import Description from 'apps/ui/components/Description';
import DropdownListField from 'apps/ui/components/DropdownListField';
import FileUpload from 'apps/ui/components/FileUpload';
import { FlexLayout } from 'apps/ui/components/FlexLayout';
import { FormRow, FormRowSection } from 'apps/ui/components/Form';
import { PageSection } from 'apps/ui/components/Page';
import TextField from 'apps/ui/components/TextField';
import Title from 'apps/ui/components/Title';
import ValidationStatus from 'apps/ui/components/ValidationStatus';
import { BRAND_LOGO_MAX_FILE_SIZE } from 'constants/campaigns';
import { ICampaignFormReducer, ICampaignFormActions } from 'apps/campaigns/interfaces/campaignForm';
import { IFormTarget } from 'interfaces';
import { localizeString } from 'utils/localization';
import * as CampaignFormActions from 'apps/campaigns/actions/CampaignFormActions';

interface ICampaignBrandFormSectionProps {
  onInit?: (target: IFormTarget) => void;
  campaignForm: ICampaignFormReducer;
  CampaignFormActions: ICampaignFormActions;
}

class CampaignBrandFormSection extends React.PureComponent<ICampaignBrandFormSectionProps> {
  public componentDidMount() {
    this.props.CampaignFormActions.fetchBrands();
  }

  public render() {
    const { brands, campaignForm, errors, status } = this.props.campaignForm;
    const isDisplayBrandOptions = !campaignForm.campaign.brand_id.isRequired;
    const brandsListWithAddControl = brands
      ?  [
        {
          isHighlighted: true,
          name: 'Add new brand',
          value: 0,
        },
        ...brands,
      ]
      : [];

    return (
      <PageSection
        title={localizeString('Brand information')}
        description={localizeString('Choose brand')}>
        <FormRow>
          <FormRowSection part="one-third">
            <DropdownListField
              className="spec-campaign-form-brand-dropdown"
              classNamesList={{
                item: 'spec-campaign-form-brand-dropdown-item',
              }}
              disabled={campaignForm.campaign.brand_id.nonEditable || status === 'pending'}
              errors={errors['campaign.brand_id']}
              label={localizeString('Brand')}
              name="campaign.brand_id"
              items={brandsListWithAddControl}
              onInit={this.hookFormField}
              onChange={this.updateFormField}
              value={campaignForm.campaign.brand_id.value} />
          </FormRowSection>
        </FormRow>
        <Animation
          type="expand"
          isActivated={isDisplayBrandOptions}>
          <FormRow>
            <FormRowSection part="one-third">
              <TextField
                disabled={status === 'pending'}
                hasErrors={!!errors['brand.name']}
                label={localizeString('Brand name')}
                maxLength={campaignForm.brand.name.maxLength}
                name="brand.name"
                onInit={this.hookFormField}
                onChange={this.updateFormField}
                value={campaignForm.brand.name.value} />
            </FormRowSection>
          </FormRow>
        </Animation>
        <FormRow type="empty">
          <ValidationStatus
            message={errors['brand.name']}
            type="error" />
        </FormRow>
        <Animation
          type="expand"
          isActivated={isDisplayBrandOptions}>
          <FormRow>
            <ContentFrameSet>
              <ContentFrame>
                <Title level="3">
                  {localizeString('Brand Logo')}
                </Title>
                <Description>
                  {`${localizeString('Upload')} JPEG ${localizeString('or')} PNG, 320 × 320 px`}
                </Description>
                <ContentFrameCTA>
                  <Button
                    disabled={status === 'pending'}
                    elementType="label"
                    theme="grey">
                    <FileUpload
                      accept="image/png, image/jpg, image/jpeg"
                      disabled={status === 'pending'}
                      maxFileSize={BRAND_LOGO_MAX_FILE_SIZE}
                      name="brand.image"
                      onRef={this.hookFormField}
                      onAttach={this.handleAttach} />
                    <span>{localizeString('Upload logo')}</span>
                  </Button>
                </ContentFrameCTA>
              </ContentFrame>
              <ContentFrame>
                <Title level="3">
                  {localizeString('Background Color')}
                </Title>
                <Description>
                  {localizeString('Used on brand page in MNFST app')}
                </Description>
                <ContentFrameCTA>
                  <ColorPickerField
                    classNamesList={{
                      color: 'spec-spec-campaign-form-brand-colorpicker-color',
                    }}
                    disabled={status === 'pending'}
                    hasErrors={!!errors['brand.color']}
                    label={localizeString('HEX color')}
                    name="brand.color"
                    onInit={this.hookFormField}
                    onChange={this.updateFormField}
                    value={campaignForm.brand.color.value} />
                </ContentFrameCTA>
              </ContentFrame>
              <ContentFrame noPaddings={true}>
                <BrandLogo
                  className="spec-campaign-form-brand-logo"
                  classNamesList={{
                    image: 'spec-campaign-form-brand-logo-image',
                    stub: 'spec-campaign-form-brand-logo-stub',
                  }}
                  color={campaignForm.brand.color.value}
                  image={campaignForm.brand.image.value} />
              </ContentFrame>
            </ContentFrameSet>
          </FormRow>
        </Animation>
        <FormRow type="empty">
          <FlexLayout direction="column">
            <ValidationStatus
              message={errors['brand.color']}
              type="error" />
            <ValidationStatus
              message={errors['brand.image']}
              type="error" />
          </FlexLayout>
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

  private handleAttach = (target: IFormTarget) => {
    const { name, value: { base64: value } } = target;
    this.updateFormField({
      name,
      value,
    });
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

export default connect(mapStateToProps, mapDispatchToProps)(CampaignBrandFormSection);
