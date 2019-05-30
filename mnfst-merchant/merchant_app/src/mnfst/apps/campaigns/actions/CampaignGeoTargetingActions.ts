import { CAMPAIGN_FORM_ADD_GEO_TARGET, CAMPAIGN_FORM_DIALOG_DISPLAY } from 'constants/campaigns';
import {
  GEOTARGETING_URI_GEOCODING,
  GEOTARGETING_UPDATE_GEOTARGETING,
  DEFAULT_MAP_RADIUS,
} from 'constants/geoTargeting';
import { ICampaignFormReducer } from 'apps/campaigns/interfaces/campaignForm';
import {
  ICampaignGeoTargetingActionFetchGeoTargetsSuggestions,
  IGeoTarget,
} from 'apps/campaigns/interfaces/campaignGeoTargeting';
import request from 'utils/request';

export function fetchGeoTargetsSuggestions(params: ICampaignGeoTargetingActionFetchGeoTargetsSuggestions) {
  const { query } = params;

  return async (dispatch) => {
    dispatch({
      type: GEOTARGETING_UPDATE_GEOTARGETING,
      payload: {
        status: 'fetching',
      },
    });

    try {
      const {
        data: {
          data: suggestedGeoTargetsList,
        },
      } = await request({
        method: 'GET',
        url: GEOTARGETING_URI_GEOCODING,
        params: {
          geo_target_name: query,
        },
      });

      dispatch({
        payload: { suggestedGeoTargetsList },
        type: GEOTARGETING_UPDATE_GEOTARGETING,
      });
    }

    catch (errors) {
      dispatch({
        payload: errors,
        type: GEOTARGETING_UPDATE_GEOTARGETING,
      });
    }
  };
}

export function selectGeoTargetSuggestion(geoTarget: IGeoTarget) {
  const { country_code, kind, lat, lng, name } = geoTarget;

  return (dispatch, getState) => {
    const {
      campaignForm: {
        campaign: { geo_targets },
      },
      currentGeoTarget,
    }: ICampaignFormReducer = getState().campaignForm;
    const geoTarget = {
      country_code,
      kind,
      lat,
      lng,
      name: name && name.split(', ')[0],
      id: (new Date().getTime() / 1000).toString(),
      radius: DEFAULT_MAP_RADIUS,
    };

    if (geo_targets.value.filter(
      geoTargetItem => geoTarget.kind === 'country'
        ? geoTargetItem.kind === 'circle' && geoTargetItem.country_code === geoTarget.country_code
        : geoTargetItem.kind === 'country' && geoTargetItem.country_code === geoTarget.country_code,
    ).length > 0 && !currentGeoTarget) {
      dispatch({
        type: CAMPAIGN_FORM_DIALOG_DISPLAY,
        payload: {
          currentGeoTarget: geoTarget,
          type: 'targetNestingWarning',
        },
      });
    }

    else {
      dispatch({
        type: CAMPAIGN_FORM_ADD_GEO_TARGET,
        payload: geoTarget,
      });
    }
  };
}
