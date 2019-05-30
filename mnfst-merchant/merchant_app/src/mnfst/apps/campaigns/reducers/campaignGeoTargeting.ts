import { ICampaignsGeoTargetingReducer } from 'apps/campaigns/interfaces/campaignGeoTargeting';
import { GEOTARGETING_UPDATE_GEOTARGETING } from 'constants/geoTargeting';

const initialState: ICampaignsGeoTargetingReducer = {
  suggestedGeoTargetsList: [],
  status: null,
};

export default function campaignGeoTargeting(state = initialState, action) {
  switch (action.type) {
    case GEOTARGETING_UPDATE_GEOTARGETING:
      return {
        ...state,
        ...action.payload,
        status: null,
      };

    default:
      return state;
  }
}
