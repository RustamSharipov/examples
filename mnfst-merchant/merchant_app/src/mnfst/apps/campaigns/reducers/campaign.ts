import { CAMPAIGNS_UPDATE_CAMPAIGN_DETAILS } from 'constants/campaigns';
import Brand from 'apps/campaigns/models/Brand';
import Campaign from 'apps/campaigns/models/Campaign';
import { ICampaignReducer } from 'apps/campaigns/interfaces/campaign';

const initialState: ICampaignReducer = {
  brand: new Brand(),
  campaign: new Campaign(),
  redirect: null,
  status: null,
};

export default function campaignForm(state= initialState, action) {
  switch (action.type) {
    case CAMPAIGNS_UPDATE_CAMPAIGN_DETAILS:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
