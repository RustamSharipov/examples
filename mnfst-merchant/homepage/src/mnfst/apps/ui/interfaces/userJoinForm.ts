import { IElementEventTarget } from 'apps/ui/interfaces/elementNode';
import { IFormField, IFormErrors } from 'apps/ui/interfaces/form';
import { OperationStatus } from 'apps/ui/types/base';

export interface IJoin {
  phone_number: IFormField<string>;
}

export interface IUserJoinForm {
  join: IJoin;
}

export interface IUserJoinFormReducer {
  errors: IFormErrors;
  status: OperationStatus;
  userJoinForm: IUserJoinForm;
}

export interface IUserJoinFormActions {
  init: () => void;
  submit: () => void;
  updateFormField: (target: IElementEventTarget) => void;
}
