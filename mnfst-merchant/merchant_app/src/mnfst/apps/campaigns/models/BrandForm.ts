import { IBrand } from 'apps/brands/interfaces';
import { IBrandFields } from 'apps/campaigns/interfaces/brandForm';
import { ERRORS_STRINGS, BRAND_NAME_MAX_LENGTH } from 'constants/campaigns';

interface IBrandFormProps {
  brand: IBrand;
}

export default class BrandForm {
  public brand: IBrandFields;

  constructor(props?: IBrandFormProps) {
    this.brand = {
      color: {
        isRequired: true,
        requiredError: ERRORS_STRINGS.BRAND_COLOR_REQUIRED,
        value: props && props.brand && props.brand.color || '#ffffff',
      },
      image: {
        isRequired: true,
        requiredError: ERRORS_STRINGS.BRAND_IMAGE_REQUIRED,
        value: props && props.brand && props.brand.image || '',
      },
      name: {
        isRequired: true,
        maxLength: BRAND_NAME_MAX_LENGTH,
        requiredError: ERRORS_STRINGS.BRAND_NAME_REQUIRED,
        value: props && props.brand && props.brand.name || '',
      },
    };
  }
}
