import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Button from 'apps/ui/components/Button';
import CheckIcon from 'apps/ui/components/icons/CheckIcon';
import { Form } from 'apps/ui/components/Form';
import PhoneWithCountryCodeField from 'apps/ui/components/PhoneWithCountryCodeField';
import ValidationStatus from 'apps/ui/components/ValidationStatus';
import { IElementEventTarget, IClassNamesMap } from 'apps/ui/interfaces/elementNode';
import { getLocalData } from 'apps/ui/utils/localization';
import { IUserJoinFormReducer, IUserJoinForm } from 'apps/ui/interfaces/userJoinForm';
import UserJoinFormModel from 'apps/ui/models/UserJoinForm';
import { IUserLocationReducer } from 'apps/ui/interfaces/userLocation';
import { IFormErrors } from 'apps/ui/interfaces/form';
import { USER_JOIN_INVITE_URI } from 'apps/ui/constants/userJoin';
import { Regions } from 'apps/ui/utils/regions';
import { updateForm } from 'apps/ui/utils/form';
import request from 'apps/ui/utils/request';
import styles from './style.css';

interface IUserJoinFormClassNames {
  button: string;
  phoneCode: string;
  textInputContainer: string;
}

interface IUserJoinFormProps {
  classNamesMap?: IClassNamesMap<IUserJoinFormClassNames>;
  onButtonClick?: () => void;
  onFail?: () => void;
  onPhoneChange?: ({ value }) => void;
  onSuccess?: () => void;
  userLocation: IUserLocationReducer;
  userJoinForm: IUserJoinFormReducer;
}

interface IUserJoinFormState {
  errors: IFormErrors;
  status: string | null;
  userJoinForm: IUserJoinForm;
}

class UserJoinForm extends React.PureComponent<IUserJoinFormProps, IUserJoinFormState> {
  public state = {
    errors: {},
    status: 'incomplete',
    userJoinForm: new UserJoinFormModel(),
  };

  public render() {
    const {
      classNamesMap = {},
      onButtonClick,
      userLocation: {
        userLocation: {
          countryCode: cca2,
        },
      },
    } = this.props;
    const { errors, status }: IUserJoinFormState = this.state;
    const phoneCode = cca2 ? Regions.getCountries({ cca2 })[0].callingCode[0] : 44;

    if (phoneCode) {
      return (
        <Form onSubmit={this.handleFormSubmit}>
          {status === 'done'
            ? (
              <div className={styles.result}>
                <div className={styles.resultTitle}>
                  {getLocalData('formFields.userJoin.successStatus')}
                </div>
                <div className={styles.resultStatus}>
                  <span className={styles.resultStatusIcon}>
                    <CheckIcon className={styles.resultStatusIconImage} />
                  </span>
                </div>
              </div>
            )
            : (
              <React.Fragment>
                <div className={styles.userJoinForm}>
                  <div className={styles.userJoinFormRow}>
                    <PhoneWithCountryCodeField
                      className={styles.textField}
                      classNamesMap={{
                        fieldLabel: styles.textFieldLabel,
                        phoneCode: classNamesMap.phoneCode,
                        textInputContainer: classNames(
                          styles.textFieldInput,
                          classNamesMap.textInputContainer,
                        ),
                      }}
                      errors={errors['join.phone_number']}
                      label={getLocalData('formFields.userJoin.phoneNumber')}
                      name="join.phone_number"
                      onChange={this.handlePhoneChange}
                      phoneCode={phoneCode} />
                  </div>
                  <div className={styles.userJoinFormControls}>
                    <Button
                      className={classNames(
                        styles.button,
                        classNamesMap.button,
                      )}
                      classNamesMap={{
                        disabled: styles.disabledButton,
                        disabledLabel: styles.disabledButtonLabel,
                      }}
                      disabled={status === 'incomplete' || status === 'pending'}
                      onClick={onButtonClick && onButtonClick}>
                      {getLocalData('formFields.userJoin.submitButton')}
                    </Button>
                  </div>
                </div>
                <div className={styles.userJoinFormStatus}>
                  <ValidationStatus
                    type="error"
                    message={errors.userJoinForm} />
                </div>
              </React.Fragment>
            )
          }
        </Form>
      );
    }

    return null;
  }

  private handlePhoneChange = (elementEventTarget: IElementEventTarget) => {
    const userJoinForm = updateForm<IUserJoinForm>(this.state.userJoinForm, elementEventTarget);
    const [phoneCode, phoneNumber] = elementEventTarget.value;

    this.setState({
      userJoinForm,
      status: phoneCode && phoneNumber ? null : 'incomplete',
    });

    const { onPhoneChange } = this.props;
    if (onPhoneChange) {
      onPhoneChange(elementEventTarget.value);
    }
  }

  private handleFormSubmit = () => {
    this.setState({
      status: 'pending',
    });
    this.submit();
  }

  private submit = async () => {
    try {
      const { userJoinForm } = this.state;
      const { status } = await request({
        method: 'POST',
        params: {
          phone: userJoinForm.join.phone_number.value[0] + userJoinForm.join.phone_number.value[1],
        },
        url: USER_JOIN_INVITE_URI,
      });

      if (status === 200) {
        this.setSuccessStatus();
      }
    }

    catch (error) {
      let errors: IFormErrors = {};

      if (error.message) {
        errors = {
          userJoinForm: [getLocalData('ui.errors.internalServerError')],
        };
      }

      if (error.response) {
        const { status } = error.response;

        // Internal server error cases
        if (status === 404 || status === 500) {
          errors = {
            userJoinForm: [getLocalData('ui.errors.internalServerError')],
          };
        }
      }

      this.displayErrors(errors);
    }
  }

  private setSuccessStatus = () => {
    this.setState({
      status: 'done',
    });

    const { onSuccess } = this.props;
    if (onSuccess) {
      onSuccess();
    }
  }

  private displayErrors = (errors: IFormErrors) => {
    this.setState({
      errors,
      status: 'error',
    });

    const { onFail } = this.props;
    if (onFail) {
      onFail();
    }
  }
}

function mapStateToProps(state) {
  return {
    userLocation: state.userLocation,
  };
}

export default connect(mapStateToProps)(UserJoinForm);
