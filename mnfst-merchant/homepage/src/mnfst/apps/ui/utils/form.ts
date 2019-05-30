import {
  IFormFields, IFormErrors, IFormTarget, IServerFormFieldError, IValidatedForm, ISerializedFormData,
} from 'apps/ui/interfaces/form';


export function validateForm<T>(fields: T | {}): IValidatedForm<T> {
  const groupNames = Object.keys(fields)
    .filter(groupName => typeof fields[groupName] === 'object' && fields[groupName] !== null);
  const errors = {};
  let isValid = true;

  // Parse form
  groupNames.forEach(
    (groupName) => {
      const group = fields[groupName];
      Object.keys(group).forEach((fieldName) => {
        const field = group[fieldName];
        const { isRequired, requiredError, maxLength, maxLengthError, minLength, minLengthError, value } = field;
        const fieldErrorsList: string[] = [];

        // Apply required field rule:
        if (isRequired && requiredError) {
          let isErrorCase = !value;

          if (typeof value === 'string') {
            isErrorCase = String(value).length === 0;
          }
          if (Array.isArray(value)) {
            isErrorCase = value.length === 0;
          }

          if (isErrorCase) {
            fieldErrorsList.push(requiredError);
          }
        }

        // Apply min length rule: mark as invalid if minimal length is less then minLength
        if (minLength && minLengthError && (isRequired
          ? String(value).length < minLength
          : String(value).length < minLength && String(value).length >= 1)) {
          fieldErrorsList.push(minLengthError);
        }

        // Apply max length rule: mark as invalid if maximal length is more then maxLength
        if (maxLength && String(value).length > maxLength && maxLengthError) {
          fieldErrorsList.push(maxLengthError);
        }

        // Add errors to field and mark whole form as invalid
        if (fieldErrorsList.length > 0) {
          isValid = false;
          errors[`${groupName}.${fieldName}`] = fieldErrorsList;
        }
      });
    },
  );

  return {
    fields,
    isValid,
    ...(Object.keys(errors).length > 0 && { errors }),
  };
}

export function updateForm<T>(fields: IFormFields, target: IFormTarget): T {
  const { name, value } = target;
  const [fieldGroup, fieldName] = name.split('.');
  let updatedFields;

  if (fieldName) {
    updatedFields = {
      ...fields,
      [fieldGroup]: {
        ...fields[fieldGroup],
        [fieldName]: {
          ...fields[fieldGroup][fieldName],
          value,
        },
      },
    };
  }

  else {
    updatedFields = {
      ...fields,
      [fieldGroup]: {
        ...fields[fieldGroup],
        value,
      },
    };
  }

  return updatedFields;
}

export function reduceFormErrors(errorsList: IServerFormFieldError[], renamedFields?: {}): IFormErrors {
  const errors = errorsList.reduce(
    (obj: IFormErrors, item) => {
      const name = renamedFields && renamedFields[item.source] ? renamedFields[item.source] : item.source;
      obj[name] = item.detail;
      return obj;
    },
    {},
  );

  return errors;
}

// Deprecated!
// Use serializeFormFields<T> instead
export function serializeFormData(formData: IFormFields): ISerializedFormData | IFormFields {
  const form = {};

  Object.keys(formData).forEach((groupName) => {
    const group = formData[groupName];
    const groupData = Object.keys(group).reduce(
      (result, key) => {
        let value = group[key].value;

        if (typeof value === 'object' && value !== null) {
          value = Array.isArray(value) ? [...value] : { ...value };
        }

        if (typeof value === 'string' && value === '') {
          value = null;
        }

        result[key] = value;

        return result;
      },
      {},
    );
    form[groupName] = groupData;
  });

  return form;
}

export function serializeFormFields<T>(fields: IFormFields): T | IFormFields {
  const formData = {};

  Object.keys(fields).forEach((groupName) => {
    const group = fields[groupName];
    const groupData = Object.keys(group).reduce(
      (result, key) => {
        let value = group[key].value;

        if (typeof value === 'object' && value !== null) {
          value = Array.isArray(value) ? [...value] : { ...value };
        }

        if (typeof value === 'string' && value === '') {
          value = null;
        }

        result[key] = value;

        return result;
      },
      {},
    );
    formData[groupName] = groupData;
  });

  return formData;
}
