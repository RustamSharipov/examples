import { CAMPAIGNS_UPDATE_BRAND_FORM } from 'constants/campaigns';
import BrandForm from 'apps/campaigns/models/BrandForm';
import { IBrandFormReducer } from 'apps/campaigns/interfaces/brandForm';

const initialState: IBrandFormReducer = {
  brandForm: new BrandForm(),
  errors: {},
  status: null,
};

export default function brandForm(state= initialState, action) {
  switch (action.type) {
    case CAMPAIGNS_UPDATE_BRAND_FORM:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
