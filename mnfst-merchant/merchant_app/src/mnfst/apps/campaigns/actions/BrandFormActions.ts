import BrandForm from 'apps/campaigns/models/BrandForm';
import {
  CAMPAIGNS_UPDATE_BRAND_FORM, CAMPAIGNS_URI_BRAND_UPDATE, CAMPAIGNS_UPDATE_CAMPAIGNSLIST,
} from 'constants/campaigns';
import { ERRORS_BASE } from 'constants/base';
import { getBase64ImageType, getFileNameExtension } from 'utils/file';
import { validateForm, serializeFormData, reduceFormErrors, updateForm } from 'utils/form';
import request from 'utils/request';
import { IFormFields, IFormTarget } from 'interfaces';
import { IBrandFormReducer, IBrandForm } from 'apps/campaigns/interfaces/brandForm';
import { ICampaignsListReducer } from 'apps/campaigns/interfaces/campaignsList';

export function init(id: string) {
  return (dispatch, getState) => {
    const { brands }: ICampaignsListReducer = getState().campaignsList;
    const brand = brands.filter(brand => brand.id === id)[0];

    dispatch({
      type: CAMPAIGNS_UPDATE_BRAND_FORM,
      payload: {
        brandForm: new BrandForm({ brand }),
        errors: {},
        status: null,
      },
    });
  };
}

export function submit(id: string) {
  return (dispatch, getState) => {
    const { brandForm }: IBrandFormReducer = getState().brandForm;
    const { brands }: ICampaignsListReducer = getState().campaignsList;

    // Validate form
    const form = validateForm<IBrandForm>(brandForm);
    const { errors, fields, isValid } = form;

    if (isValid) {
      dispatch({
        type: CAMPAIGNS_UPDATE_BRAND_FORM,
        payload: {
          status: 'pending',
        },
      });

      updateBrandData(id, fields, dispatch, brands);
    }

    // Return errors for invalid form fields (client validation)
    else {
      dispatch({
        type: CAMPAIGNS_UPDATE_BRAND_FORM,
        payload: {
          errors,
          status: 'error',
        },
      });
    }
  };
}

export function updateFormField(target: IFormTarget) {
  return (dispatch, getState) => {
    const { brandForm }: IBrandFormReducer = getState().brandForm;
    const fields = updateForm<IBrandForm>(brandForm, target);

    dispatch({
      type: CAMPAIGNS_UPDATE_BRAND_FORM,
      payload: {
        brandForm: fields,
        errors: {},
        status: null,
      },
    });
  };
}

async function updateBrandData(id: string, form: IFormFields, dispatch, brands) {
  const payload = serializeFormData(form);

  // Add brand image type
  if (payload.brand) {
    payload.brand.image_type = getBase64ImageType(payload.brand.image) || getFileNameExtension(payload.brand.image);
  }

  await request({
    url: CAMPAIGNS_URI_BRAND_UPDATE.replace('BRAND_ID', id),
    method: 'PUT',
    data: payload,
  })
    .then(({ data, status }) => {
      if (status === 200 && data) {
        const updatedBrands = brands.map(brand => brand.id === data.id ? data : brand);

        dispatch({
          type: CAMPAIGNS_UPDATE_BRAND_FORM,
          payload: {
            status: 'done',
          },
        });

        dispatch({
          type: CAMPAIGNS_UPDATE_CAMPAIGNSLIST,
          payload: {
            brands: updatedBrands,
          },
        });
      }
    })
    .catch((error= {}) => {
      if (error.message) {
        const errors = {
          brand: [ERRORS_BASE.INTERNAL_SERVER_ERROR],
        };
        dispatch({
          type: CAMPAIGNS_UPDATE_BRAND_FORM,
          payload: {
            errors,
            status: 'error',
          },
        });
      }

      if (error.response) {
        const { data= {}, status } = error.response;

        // Return validation errors (server validation)
        if (status === 400 || status === 401) {
          const errors = reduceFormErrors(data.errors);
          dispatch({
            type: CAMPAIGNS_UPDATE_BRAND_FORM,
            payload: {
              errors,
              status: 'error',
            },
          });
        }

        // Internal server error cases
        if (status === 404 || status === 500) {
          const errors = {
            brand: [ERRORS_BASE.INTERNAL_SERVER_ERROR],
          };
          dispatch({
            type: CAMPAIGNS_UPDATE_BRAND_FORM,
            payload: {
              errors,
              status: 'error',
            },
          });
        }
      }
    });
}
