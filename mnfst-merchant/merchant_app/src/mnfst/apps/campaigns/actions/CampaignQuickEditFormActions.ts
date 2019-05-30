import {
  CAMPAIGNS_UPDATE_CAMPAIGN_DETAILS, CAMPAIGNS_UPDATE_CAMPAIGN_QUICK_EDIT_FORM, ALLOWED_SOCIAL_NETWORKS,
  CAMPAIGNS_URI_QUICK_EDIT_CAMPAIGN,
} from 'constants/campaigns';
import { updateForm, validateForm, serializeFormData, reduceFormErrors } from 'utils/form';
import { Currency } from 'utils/number';
import { IFormTarget, IFormFields } from 'interfaces';
import CampaignQuickEditForm from 'apps/campaigns/models/CampaignQuickEditForm';
import request from 'utils/request';
import { ERRORS_BASE } from 'constants/base';
import { ICampaignQuickEditForm, ICampaignQuickEditFormReducer } from 'apps/campaigns/interfaces/campaignQuickEditForm';
import {
  ISocialNetworkPlacementPrice, ISocialNetworkPlacementTypeFormField,
} from 'apps/campaigns/interfaces/campaignForm';
import { ISocialNetworkPlacement, ICampaignReducer } from '../interfaces/campaign';
import { getLocalString } from 'utils/localization';

export function init() {
  return (dispatch, getState) => {
    const { campaign } = getState().campaign;
    const campaignQuickEditForm = new CampaignQuickEditForm({ campaign });

    dispatch({
      type: CAMPAIGNS_UPDATE_CAMPAIGN_QUICK_EDIT_FORM,
      payload: {
        campaignQuickEditForm,
        errors: {},
        redirect: null,
        status: null,
      },
    });
  };
}

export function submit() {
  return (dispatch, getState) => {
    const { campaignQuickEditForm }: ICampaignQuickEditFormReducer = getState().campaignQuickEditForm;

    // Validate form
    const form = validateForm<ICampaignQuickEditForm>(campaignQuickEditForm);

    const { fields } = form;
    let { errors = {}, isValid } = form;

    // Cast prices type to number
    fields.campaign.placements.value = fields.campaign.placements.value.map(placement => ({
      ...placement,
      price: placement.price ? placement.price : placement.price,
    }));

    // Extra feeds and stories validation
    const facebookFeedPlacement = ALLOWED_SOCIAL_NETWORKS.includes('facebook') && fields.campaign.placements.value
      .filter(placement => placement.social_network === 'facebook' && placement.type === 'feed')[0];
    const facebookStoryPlacement = ALLOWED_SOCIAL_NETWORKS.includes('facebook') && fields.campaign.placements.value
      .filter(placement => placement.social_network === 'facebook' && placement.type === 'story')[0];
    const instagramFeedPlacement = ALLOWED_SOCIAL_NETWORKS.includes('instagram') && fields.campaign.placements.value
      .filter(placement => placement.social_network === 'instagram' && placement.type === 'feed')[0];
    const instagramStoryPlacement = ALLOWED_SOCIAL_NETWORKS.includes('instagram') && fields.campaign.placements.value
      .filter(placement => placement.social_network === 'instagram' && placement.type === 'story')[0];
    const twitterFeedPlacement = ALLOWED_SOCIAL_NETWORKS.includes('twitter') && fields.campaign.placements.value
      .filter(placement => placement.social_network === 'twitter' && placement.type === 'feed')[0];

    // Validate placements (feeds and stories) CPM prices
    errors = {
      ...errors,
      ...(!fields.campaign.non_profit.value && facebookFeedPlacement
        && (!facebookFeedPlacement.price.value || facebookFeedPlacement.price.value === 0)
          && { 'campaign.placements.facebook.feed.price':
            [getLocalString('pages.campaigns.errors.campaignCPMRequired')] }
      ),
      ...(!fields.campaign.non_profit.value && facebookStoryPlacement
        && (!facebookStoryPlacement.price.value || facebookStoryPlacement.price.value === 0)
          && { 'campaign.placements.facebook.story.price':
            [getLocalString('pages.campaigns.errors.campaignCPMRequired')] }
      ),
      ...(!fields.campaign.non_profit.value && instagramFeedPlacement
        && (!instagramFeedPlacement.price.value || instagramFeedPlacement.price.value === 0)
          && { 'campaign.placements.instagram.feed.price':
            [getLocalString('pages.campaigns.errors.campaignCPMRequired')] }
      ),
      ...(!fields.campaign.non_profit.value && instagramStoryPlacement
        && (!instagramStoryPlacement.price.value || instagramStoryPlacement.price.value === 0)
          && { 'campaign.placements.instagram.story.price':
            [getLocalString('pages.campaigns.errors.campaignCPMRequired')] }
      ),
      ...(!fields.campaign.non_profit.value && twitterFeedPlacement
        && (!twitterFeedPlacement.price.value || twitterFeedPlacement.price.value === 0)
          && { 'campaign.placements.twitter.feed.price':
            [getLocalString('pages.campaigns.errors.campaignCPMRequired')] }
      ),
    };

    // Revalidate form
    isValid = Object.keys(errors).length === 0;

    if (isValid) {
      dispatch({
        type: CAMPAIGNS_UPDATE_CAMPAIGN_QUICK_EDIT_FORM,
        payload: {
          errors: {},
          status: 'pending',
        },
      });

      updateCampaign(fields, dispatch, getState);
    }

    // Return errors for invalid form fields (client validation)
    else {
      dispatch({
        type: CAMPAIGNS_UPDATE_CAMPAIGN_QUICK_EDIT_FORM,
        payload: {
          errors,
          status: 'error',
        },
      });
    }
  };
}

export function updatePlacementPrice(params: ISocialNetworkPlacementPrice) {
  const {
    socialNetwork,
    type,
    value: price,
  } = params;

  return (dispatch, getState) => {
    const {
      campaignQuickEditForm,
      campaignQuickEditForm: {
        campaign: { placements },
      },
    }: ICampaignQuickEditFormReducer = getState().campaignQuickEditForm;
    const name = 'campaign.placements';
    const updatedPlacements: ISocialNetworkPlacement[] = placements.value.map((placement) => {
      if (placement.social_network === socialNetwork && placement.type === type) {
        placement.price = {
          ...placement.price,
          value: price,
        };
      }
      return placement;
    });
    const fields = updateForm<ICampaignQuickEditForm>(campaignQuickEditForm, {
      name,
      value: updatedPlacements,
    });

    dispatch({
      type: CAMPAIGNS_UPDATE_CAMPAIGN_QUICK_EDIT_FORM,
      payload: {
        campaignQuickEditForm: fields,
        errors: {},
        status: null,
      },
    });
  };
}

export function updatePlacementFormField(params: ISocialNetworkPlacementTypeFormField) {
  const {
    type,
    socialNetwork: social_network,
    value: isChecked,
  } = params;

  return (dispatch, getState) => {
    const {
      campaignQuickEditForm,
      campaignQuickEditForm: {
        campaign: { placements },
      },
    }: ICampaignQuickEditFormReducer = getState().campaignQuickEditForm;
    const { merchant } = getState().user;
    const name = 'campaign.placements';
    let value = placements.value;

    if (isChecked && value.filter(
      placement => placement.social_network === social_network && placement.type === type).length === 0
    ) {
      value.push({
        social_network,
        type,
        post_text: null,
        price: {
          currency_code: merchant.currency,
          value: null,
        },
      });
    }

    else {
      value = value.filter(placement => !(placement.social_network === social_network && placement.type === type));
    }

    const fields = updateForm<ICampaignQuickEditForm>(campaignQuickEditForm, { name, value });

    dispatch({
      type: CAMPAIGNS_UPDATE_CAMPAIGN_QUICK_EDIT_FORM,
      payload: {
        campaignQuickEditForm: fields,
        errors: {},
        status: null,
      },
    });
  };
}

export function updateFormField(target: IFormTarget) {
  return (dispatch, getState) => {
    const { campaignQuickEditForm }: ICampaignQuickEditFormReducer = getState().campaignQuickEditForm;
    const fields = updateForm<ICampaignQuickEditForm>(campaignQuickEditForm, target);

    dispatch({
      type: CAMPAIGNS_UPDATE_CAMPAIGN_QUICK_EDIT_FORM,
      payload: {
        campaignQuickEditForm: fields,
        errors: {},
      },
    });
  };
}

async function updateCampaign(form: IFormFields, dispatch, getState) {
  const { campaign }: ICampaignReducer = getState().campaign;
  const payload = serializeFormData(form);
  const url = CAMPAIGNS_URI_QUICK_EDIT_CAMPAIGN.replace(':id', String(campaign.id));

  // Cast types
  if (payload.campaign.budget) {
    payload.campaign.budget = Currency.toCents(payload.campaign.budget.value);
  }

  // Cast prices type to number
  payload.campaign.placements = payload.campaign.placements.map(placement => ({
    ...placement,
    price: placement.price.value ? Currency.toCents(placement.price.value) : placement.price.value,
  }));

  await request({
    url,
    data: payload,
    method: 'PUT',
  })
    .then((response) => {
      const { data: { data: { campaign } }, status } = response;

      // Campaign is updated
      if (status === 200) {
        dispatch({
          type: CAMPAIGNS_UPDATE_CAMPAIGN_QUICK_EDIT_FORM,
          payload: {
            errors: {},
            status: 'updated',
          },
        });

        dispatch({
          type: CAMPAIGNS_UPDATE_CAMPAIGN_DETAILS,
          payload: {
            campaign,
            status: null,
          },
        });
      }
    })
    .catch((error= {}) => {
      if (error.message) {
        const errors = {
          campaign: [ERRORS_BASE.INTERNAL_SERVER_ERROR],
        };
        dispatch({
          type: CAMPAIGNS_UPDATE_CAMPAIGN_QUICK_EDIT_FORM,
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
            type: CAMPAIGNS_UPDATE_CAMPAIGN_QUICK_EDIT_FORM,
            payload: {
              errors,
              status: 'error',
            },
          });
        }

        // Internal server error cases
        if (status === 404 || status === 500) {
          const errors = {
            campaign: [ERRORS_BASE.INTERNAL_SERVER_ERROR],
          };
          dispatch({
            type: CAMPAIGNS_UPDATE_CAMPAIGN_QUICK_EDIT_FORM,
            payload: {
              errors,
              status: 'error',
            },
          });
        }
      }
    });
}
