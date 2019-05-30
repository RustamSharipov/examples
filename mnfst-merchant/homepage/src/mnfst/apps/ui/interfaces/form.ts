export interface IFormField<T> {
  nonEditable?: boolean;
  isRequired?: boolean;
  name?: string;
  type?: string;
  value: T | any;
}

export interface IFormFields {
  [group: string]: IFormGroupItem | any;
}

export interface IFormGroupItem {
  [name: string]: IFormField<any>;
}

export interface IForm<T> {
  fields: T;
  status?: boolean;
}

export interface IFormTarget {
  name: string;
  value?: any;
}

export interface IFormErrors {
  [name: string]: string[];
}

export interface IServerFormFieldError {
  source: string;
  detail: string[];
}

export interface IValidatedForm<T> {
  errors?: IFormErrors;
  fields: T | IFormFields;
  isValid: boolean;
}

export interface ISerializedFormData {
  [name: string]: string | number | boolean | null;
}
