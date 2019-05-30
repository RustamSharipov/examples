export interface IFormField<T> {
  nonEditable?: boolean;
  isRequired?: boolean;
  requiredError?: string | null | undefined;
  maxLength?: number;
  maxLengthError?: string;
  minLength?: number;
  minLengthError?: string;
  name?: string;
  type?: string;
  value: T | any;
}

export interface IFormGroupItem {
  [name: string]: IFormField<any>;
}

export interface IFormFields {
  [group: string]: IFormGroupItem | any;
}

export interface IFormErrors {
  [name: string]: string[];
}

export interface IServerFormFieldError {
  source: string;
  detail: string[];
}

export interface IForm<T> {
  fields: T;
  status?: boolean;
}

export interface IValidatedForm<T> {
  errors?: IFormErrors;
  fields: T | IFormFields;
  isValid: boolean;
}

export interface IFormTarget {
  children?: IFormTargetChildren;
  name: string;
  value?: any;
}

export interface IElementEventTargetChildren {
  [name: string]: HTMLInputElement | HTMLElement;
}

export interface IElementEventTarget<T> {
  children?: IElementEventTargetChildren;
  name: string;
  value?: T;
}

export interface IFormTargetChildren {
  [name: string]: HTMLInputElement | HTMLElement;
}

export interface ISerializedFormData {
  [name: string]: string | number | boolean | null;
}

export interface INavigation {
  [name: string]: INavigationItem;
}

export interface INavigationItem {
  children: React.ReactNode;
  className?: string;
  classNamesList?: IClassNames;
  href?: string;
  isActive?: boolean;
  link?: string;
  onClick?: () => void;
}

export interface IClassNames {
  [name: string]: string | undefined;
}

export interface IUrlsSet {
  [name: string]: string;
}

export interface IActionItem<T> {
  id: number;
  name: string;
  onClick?: (element: IFormTarget) => void;
  value: T;
}

export interface IGetResponseMeta {
  current_page?: number;
  first_page?: string;
  last_page?: string;
  next_page?: string;
  prev_page?: string;
  self_page?: string;
  total_pages?: number;
}

export interface IPDF {
  title: string;
  url: string;
}
