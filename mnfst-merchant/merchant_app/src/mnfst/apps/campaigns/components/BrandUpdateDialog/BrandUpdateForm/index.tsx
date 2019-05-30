import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BrandLogo from 'apps/ui/components/BrandLogo';
import Button from 'apps/ui/components/Button';
import ButtonsSet from 'apps/ui/components/ButtonsSet';
import CampaignThumbnail from 'apps/campaigns/components/CampaignThumbnail';
import ColorPickerField from 'apps/ui/components/ColorPickerField';
import { ContentFrame, ContentFrameCTA, ContentFrameSet } from 'apps/ui/components/ContentFrame';
import Description from 'apps/ui/components/Description';
import { Dialog, DialogPreheader, DialogContent, DialogClose } from 'apps/ui/components/Dialog';
import FileUpload from 'apps/ui/components/FileUpload';
import { FlexLayout } from 'apps/ui/components/FlexLayout';
import { Form, FormRow, FormRowSection } from 'apps/ui/components/Form';
import TextField from 'apps/ui/components/TextField';
import Title from 'apps/ui/components/Title';
import ValidationStatus from 'apps/ui/components/ValidationStatus';
import { BRAND_LOGO_MAX_FILE_SIZE } from 'constants/campaigns';
import { IBrandFormReducer, IBrandFormActions } from 'apps/campaigns/interfaces/brandForm';
import { IFormTarget } from 'interfaces';
import { localizeString } from 'utils/localization';
import * as BrandFormActions from 'apps/campaigns/actions/BrandFormActions';

interface IBrandUpdateFormProps {
  id: string;
  brandForm: IBrandFormReducer;
  BrandFormActions: IBrandFormActions;
  onClose: () => void;
}

class BrandUpdateForm extends React.Component<IBrandUpdateFormProps> {
  public componentDidMount() {
    const { id, BrandFormActions } = this.props;
    BrandFormActions.init(id);
  }

  public componentDidUpdate(prevProps) {
    const { brandForm: { status }, onClose } = this.props;
    if (status === 'done' && status !== prevProps.status) {
      if (onClose) {
        onClose();
      }
    }
  }

  public render() {
    const { brandForm, errors, status } = this.props.brandForm;
    return (
      <React.Fragment>
        <DialogPreheader
          className="spec-brand-update-dialog-header"
          icon={
            <CampaignThumbnail
              classNamesList={{
                image: 'spec-brand-update-dialog-header-logo',
              }}
              name={brandForm.brand.name.value}
              src={brandForm.brand.image.value} />
          }>
          {brandForm.brand.name.value}
          <DialogClose
            className="spec-brand-update-dialog-header-close"
            onClick={this.handleCloseButtonClick} />
        </DialogPreheader>
        <Dialog>
          <DialogContent>
            <Form onSubmit={this.handleSubmit}>
              <FormRow>
                <FormRowSection part="one-third">
                  <TextField
                    disabled={status === 'pending'}
                    errors={errors['brand.name']}
                    label={localizeString('Brand name')}
                    maxLength={brandForm.brand.name.maxLength}
                    name="brand.name"
                    onChange={this.updateFormField}
                    value={brandForm.brand.name.value} />
                </FormRowSection>
              </FormRow>
              <FormRow>
                <ContentFrameSet>
                  <ContentFrame>
                    <Title level={3}>
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
                          onAttach={this.handleAttach} />
                        <span>{localizeString('Upload logo')}</span>
                      </Button>
                    </ContentFrameCTA>
                  </ContentFrame>
                  <ContentFrame>
                    <Title level={3}>
                      {localizeString('Background Color')}
                    </Title>
                    <Description>
                      {localizeString('Used on brand page in MNFST app')}
                    </Description>
                    <ContentFrameCTA>
                      <ColorPickerField
                        disabled={status === 'pending'}
                        hasErrors={!!errors['brand.color']}
                        label={localizeString('HEX color')}
                        name="brand.color"
                        onChange={this.updateFormField}
                        value={brandForm.brand.color.value} />
                    </ContentFrameCTA>
                  </ContentFrame>
                  <ContentFrame noPaddings={true}>
                    <BrandLogo
                      className="spec-brand-update-form-logo"
                      classNamesList={{
                        image: 'spec-brand-update-form-logo-image',
                      }}
                      color={brandForm.brand.color.value}
                      image={brandForm.brand.image.value} />
                  </ContentFrame>
                </ContentFrameSet>
              </FormRow>
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
              <FormRow>
                <ButtonsSet
                  className="grid-column grid-columns-12"
                  align="end">
                  <Button
                    className="grid-column grid-columns-4 spec-brand-update-form-submit-button"
                    disabled={status === 'pending'}
                    size="large"
                    theme="violet">
                    {localizeString('Save changes')}
                  </Button>
                </ButtonsSet>
              </FormRow>
            </Form>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  }

  private handleAttach = (target: IFormTarget) => {
    const { name, value: { base64: value } } = target;
    this.updateFormField({
      name,
      value,
    });
  }

  private updateFormField = (target: IFormTarget) => {
    this.props.BrandFormActions.updateFormField(target);
  }

  private handleCloseButtonClick = () => {
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  }

  private handleSubmit = () => {
    const { id, BrandFormActions } = this.props;
    BrandFormActions.submit(id);
  }
}

function mapStateToProps(state) {
  return {
    brandForm: state.brandForm,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    BrandFormActions: bindActionCreators(BrandFormActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandUpdateForm);
