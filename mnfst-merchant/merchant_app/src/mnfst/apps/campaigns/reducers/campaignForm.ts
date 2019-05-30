import {
  CAMPAIGNS_CREATE_NEW_CAMPAIGN,
  CAMPAIGNS_UPDATE_CAMPAIGN_FORM,
  CAMPAIGNS_UPDATE_CAMPAIGN_FORM_FIELD,
  CAMPAIGN_FORM_ADD_GEO_TARGET,
  CAMPAIGN_FORM_REMOVE_GEO_TARGET,
  CAMPAIGN_FORM_ERROR,
  CAMPAIGN_FORM_UPDATE_GEO_TARGET,
  CAMPAIGN_FORM_DIALOG_DISPLAY,
  CAMPAIGN_FORM_DIALOG_CLOSE,
  CAMPAIGN_FORM_RESTORE_PREVIOUS_GEO_TARGET,
} from 'constants/campaigns';
import CampaignForm from 'apps/campaigns/models/CampaignForm';
import { ICampaignFormReducer, ICampaignForm } from 'apps/campaigns/interfaces/campaignForm';
import { IGeoTarget } from 'apps/campaigns/interfaces/campaignGeoTargeting';
import { updateForm } from 'utils/form';

const initialState: ICampaignFormReducer = {
  brands: null,
  campaignForm: new CampaignForm(),
  currentGeoTarget: null,
  lastGeoTarget: null,
  isCurrentGeoTargetNeedUpdate: false,
  dialogType: null,
  errors: {},
  placements: null,
  redirect: null,
  status: null,
  isNew: true,
};

export default function campaignForm(state = initialState, action): ICampaignFormReducer {
  switch (action.type) {
    case CAMPAIGNS_CREATE_NEW_CAMPAIGN:
      return {
        ...state,
        campaignForm: updateForm<ICampaignForm>(
          new CampaignForm(),
          {
            name: 'campaign.geo_targets',
            value: action.payload,
          },
        ),
      };

    case CAMPAIGNS_UPDATE_CAMPAIGN_FORM:
      return {
        ...state,
        ...action.payload,
        isNew: false,
      };

    case CAMPAIGNS_UPDATE_CAMPAIGN_FORM_FIELD:
      return {
        ...state,
        campaignForm: updateForm<ICampaignForm>(state.campaignForm, action.payload),
        errors: {},
        status: null,
      };

    case CAMPAIGN_FORM_ADD_GEO_TARGET:
      return {
        ...state,
        campaignForm: updateForm<ICampaignForm>(
          state.campaignForm,
          {
            name: 'campaign.geo_targets',
            value: [
              ...state.campaignForm.campaign.geo_targets.value,
              action.payload,
            ],
          },
        ),
        lastGeoTarget: action.payload,
        errors: {},
        status: null,
      };

    case CAMPAIGN_FORM_REMOVE_GEO_TARGET:
      return {
        ...state,
        campaignForm: updateForm<ICampaignForm>(
          state.campaignForm,
          {
            name: 'campaign.geo_targets',
            value: state.campaignForm.campaign.geo_targets.value
              .filter(geoTarget => !action.payload.map(item => String(item)).includes(String(geoTarget.id))),
          },
        ),
        errors: {},
        status: null,
      };

    case CAMPAIGN_FORM_UPDATE_GEO_TARGET:
      const { id, country_code, lat, lng, name, radius }: IGeoTarget = action.payload;

      return {
        ...state,
        campaignForm: updateForm<ICampaignForm>(
          state.campaignForm,
          {
            name: 'campaign.geo_targets',
            value: [
              ...state.campaignForm.campaign.geo_targets.value.map((geoTarget) => {
                if (id && +geoTarget.id === +id) {
                  geoTarget.id = +id;
                  if ('country_code' in action.payload) {
                    geoTarget.country_code = country_code;
                  }
                  if ('lat' in action.payload) {
                    geoTarget.lat = lat;
                  }
                  if ('lng' in action.payload) {
                    geoTarget.lng = lng;
                  }
                  if ('name' in action.payload) {
                    geoTarget.name = name;
                  }
                  if ('radius' in action.payload) {
                    geoTarget.radius = radius;
                  }
                }

                return geoTarget;
              }),
            ],
          },
        ),
        lastGeoTarget: {
          ...state.campaignForm.campaign.geo_targets.value.filter(geoTarget => geoTarget.id === id)[0],
          country_code,
          lat,
          lng,
          name,
          radius,
        },
        errors: {},
        status: null,
      };

    case CAMPAIGN_FORM_RESTORE_PREVIOUS_GEO_TARGET:
      return {
        ...state,
        campaignForm: updateForm<ICampaignForm>(
          state.campaignForm,
          {
            name: 'campaign.geo_targets',
            value: [
              ...state.campaignForm.campaign.geo_targets.value
                .filter(geoTarget => state.lastGeoTarget && geoTarget.id !== state.lastGeoTarget.id),
              state.lastGeoTarget,
            ],
          },
        ),
        errors: {},
        status: null,
      };

    case CAMPAIGN_FORM_DIALOG_DISPLAY:
      return {
        ...state,
        currentGeoTarget: action.payload.currentGeoTarget || null,
        isCurrentGeoTargetNeedUpdate: action.payload.isCurrentGeoTargetNeedUpdate || false,
        dialogType: action.payload.type,
        status: null,
      };

    case CAMPAIGN_FORM_DIALOG_CLOSE:
      return {
        ...state,
        currentGeoTarget: null,
        isCurrentGeoTargetNeedUpdate: false,
        dialogType: null,
        status: null,
      };

    case CAMPAIGN_FORM_ERROR:
      return {
        ...state,
        errors: action.payload,
        status: 'error',
      };

    default:
      return state;
  }
}
