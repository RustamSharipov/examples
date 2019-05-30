import { CAMPAIGNS_UPDATE_CAMPAIGN_QUICK_EDIT_FORM } from 'constants/campaigns';
import CampaignQuickEditForm from 'apps/campaigns/models/CampaignQuickEditForm';
import { ICampaignQuickEditFormReducer } from 'apps/campaigns/interfaces/campaignQuickEditForm';

const initialState: ICampaignQuickEditFormReducer = {
  campaignQuickEditForm: new CampaignQuickEditForm(),
  errors: {},
  status: null,
};

export default function campaignQuickEditForm(state= initialState, action) {
  switch (action.type) {
    case CAMPAIGNS_UPDATE_CAMPAIGN_QUICK_EDIT_FORM:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
