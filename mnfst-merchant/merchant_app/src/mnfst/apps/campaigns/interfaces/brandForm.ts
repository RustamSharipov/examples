import { IFormField, IFormErrors, IFormTarget } from 'interfaces';

export interface IBrandFields {
  color: IFormField<string>;
  image: IFormField<string>;
  name: IFormField<string>;
}

export interface IBrandForm {
  brand: IBrandFields;
}

export interface IBrandFormReducer {
  brandForm: IBrandForm;
  errors: IFormErrors;
  status: string | null;
}

export interface IBrandFormActions {
  init: (id: string) => void;
  submit: (id: string) => void;
  updateFormField: (target: IFormTarget) => void;
}
