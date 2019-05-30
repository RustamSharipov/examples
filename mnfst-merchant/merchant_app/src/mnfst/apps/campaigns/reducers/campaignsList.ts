import { CAMPAIGNS_UPDATE_CAMPAIGNSLIST } from 'constants/campaigns';
import { ICampaignsListReducer } from 'apps/campaigns/interfaces/campaignsList';

const initialState: ICampaignsListReducer = {
  brands: [],
  campaignsList: [],
  meta: {},
  status: null,
};

export default function campaignsList(state= initialState, action) {
  switch (action.type) {
    case CAMPAIGNS_UPDATE_CAMPAIGNSLIST:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
