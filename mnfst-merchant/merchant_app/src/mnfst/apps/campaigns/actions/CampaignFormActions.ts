import moment from 'moment';
import CampaignForm from 'apps/campaigns/models/CampaignForm';
import {
  CAMPAIGNS_UPDATE_CAMPAIGN_FORM, CAMPAIGNS_URI_COPY_CAMPAIGN, CAMPAIGNS_URI_EDIT_CAMPAIGN,
  CAMPAIGNS_URI_CREATE_CAMPAIGN, CAMPAIGNS_URI_BRANDS, CAMPAIGNS_URI_PLACEMENTS, FEED_CREATIVE_SIZE,
  STORY_CREATIVE_SIZE, STATIC_OVERLAY_MAX_FILE_SIZE, VIDEO_OVERLAY_MAX_FILE_SIZE, ALLOWED_SOCIAL_NETWORKS,
  FACEBOOK_POST_TEXT_MAX_LENGTH, INSTAGRAM_FEED_POST_TEXT_MAX_LENGTH, TWITTER_POST_TEXT_MAX_LENGTH,
  INSTAGRAM_STORY_POST_TEXT_MAX_LENGTH,
  CAMPAIGNS_CREATE_NEW_CAMPAIGN,
  CAMPAIGN_FORM_REMOVE_GEO_TARGET,
  CAMPAIGN_FORM_ADD_GEO_TARGET,
  CAMPAIGN_FORM_ERROR,
  CAMPAIGN_FORM_UPDATE_GEO_TARGET,
  CAMPAIGN_FORM_DIALOG_DISPLAY,
  CAMPAIGN_FORM_DIALOG_CLOSE,
} from 'constants/campaigns';
import { ASSETS_UPLOAD_URI, MODAL_DISPLAY } from 'constants/base';
import { routes } from 'merchant/routes';
import { getBase64ImageType } from 'utils/file';
import { validateForm, reduceFormErrors, serializeFormData, updateForm } from 'utils/form';
import { Currency } from 'utils/number';
import request, { post } from 'utils/request';
import {
  ICampaignFormActionFetchDataParams, ICampaignFormActionSubmitParams, ICampaignFormReducer, ICampaignForm,
  ISocialNetworkPlacementTypeFormField, ISocialNetworkPlacementPrice, ISocialNetworkPlacementText,
  ICampaignFormActionUploadCreativeTemplate, ICampaignFormActionRemoveCreativeTemplate,
  ICampaignFormActionRemoveGeoTargets, ICampaignFormActionAddGeoTarget, ICampaignFormActionUpdateGeoTarget,
} from 'apps/campaigns/interfaces/campaignForm';
import { IFormFields, IFormTarget } from 'interfaces';
import { ISocialNetworkPlacement, ICreativeTemplate } from 'apps/campaigns/interfaces/campaign';
import { IUserReducer } from 'apps/users/interfaces/user';
import { getLocalString } from 'utils/localization';
import { MAPBOX_TOKEN, MAPBOX_GEOCODING_API_URI } from 'constants/geoTargeting';
import { GeoLocationCoordiantes } from 'apps/ui/types/geoTargeting';
import { getLocalData } from 'apps/ui/utils/localization';
import { Regions } from 'utils/regions';

export function init() {
  return (dispatch, getState) => {
    const { merchant }: IUserReducer = getState().user;

    if (merchant) {
      const merchantCountry = Regions.getCountries({ cca2: merchant.country_code })[0];

      dispatch({
        type: CAMPAIGNS_CREATE_NEW_CAMPAIGN,
        payload: [
          {
            id: String(new Date().getTime() / 1000),
            country_code: merchant.country_code,
            kind: 'country',
            lat: merchantCountry.latlng[0],
            lng: merchantCountry.latlng[1],
            name: merchantCountry.name.common,
          },
        ],
      });
    }
  };
}

export function fetchBrands() {
  return async(dispatch) => {
    const {
      data: {
        data,
      },
      status,
    } = await request({
      method: 'GET',
      url: CAMPAIGNS_URI_BRANDS,
    });

    if (status === 200 && data) {
      const brands = data.brands
        .sort((a, b) => a.name > b.name)
        .map(brand => ({
          id: brand.id,
          color: brand.color,
          image: brand.image,
          name: brand.name,
          value: brand.id,
        }));

      dispatch({
        type: CAMPAIGNS_UPDATE_CAMPAIGN_FORM,
        payload: { brands },
      });
    }
  };
}

export function fetchPlacements() {
  return async(dispatch) => {
    const {
      data: {
        data: placements,
      },
      status,
    } = await request({
      method: 'GET',
      url: CAMPAIGNS_URI_PLACEMENTS,
    });

    if (status === 200 && placements) {
      dispatch({
        type: CAMPAIGNS_UPDATE_CAMPAIGN_FORM,
        payload: { placements },
      });
    }
  };
}

export function fetchData(params: ICampaignFormActionFetchDataParams) {
  const { id, isCopy } = params;
  const url = isCopy
    ? CAMPAIGNS_URI_COPY_CAMPAIGN.replace('CAMPAIGN_ID', id)
    : CAMPAIGNS_URI_EDIT_CAMPAIGN.replace('CAMPAIGN_ID', id);

  return async(dispatch) => {
    dispatch({
      type: CAMPAIGNS_UPDATE_CAMPAIGN_FORM,
      payload: {
        redirect: null,
        status: 'receiving',
      },
    });

    await request({
      url,
      method: 'get',
    })

    .then((response) => {
      const { data: { data }, status } = response;

      if (status === 200 && data) {
        const campaignForm: ICampaignForm = new CampaignForm(data);

        dispatch({
          type: CAMPAIGNS_UPDATE_CAMPAIGN_FORM,
          payload: {
            campaignForm,
            errors: {},
            status: 'done',
          },
        });
      }
    })

    .catch((error = {}) => {
      if (error.response) {
        const { status } = error.response;

        // Campaign not found
        if (status === 403 || status === 404) {
          dispatch({
            type: CAMPAIGNS_UPDATE_CAMPAIGN_FORM,
            payload: {
              redirect: routes.campaigns.path,
              status: null,
            },
          });
        }
      }
    });
  };
}

export function submit(params: ICampaignFormActionSubmitParams = {}) {
  return (dispatch, getState) => {
    const { campaignForm }: ICampaignFormReducer = getState().campaignForm;

    // Validate form
    const form = validateForm<ICampaignForm>(campaignForm);
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

    const feedCreativeTemplate = [...fields.campaign.creative_templates.value
      .filter(template => template.placement === 'feed')][0];
    const storyCreativeTemplate = [...fields.campaign.creative_templates.value
      .filter(template => template.placement === 'story')][0];

    // Validate placements (feeds and stories) CPM prices and post texts
    errors = {
      ...errors,
      ...(!fields.campaign.non_profit.value && facebookFeedPlacement
        && (!facebookFeedPlacement.price.value || facebookFeedPlacement.price.value === 0)
          && { 'campaign.placements.facebook.feed.price':
            [getLocalString('pages.campaigns.errors.campaignCPMRequired')] }
      ),
      ...(!fields.campaign.non_profit.value && facebookFeedPlacement && facebookFeedPlacement.post_text
        && facebookFeedPlacement.post_text.length > FACEBOOK_POST_TEXT_MAX_LENGTH
          && { 'campaign.placements.facebook.feed.post_text':
            [getLocalString('pages.campaigns.errors.campaignPlacementPostTextMaxLength')] }
      ),
      ...(!fields.campaign.non_profit.value && facebookStoryPlacement
        && (!facebookStoryPlacement.price.value || facebookStoryPlacement.price.value === 0)
          && { 'campaign.placements.facebook.story.price':
            [getLocalString('pages.campaigns.errors.campaignCPMRequired')] }
      ),
      ...(!fields.campaign.non_profit.value && facebookStoryPlacement && facebookStoryPlacement.post_text
        && facebookStoryPlacement.post_text.length > FACEBOOK_POST_TEXT_MAX_LENGTH
          && { 'campaign.placements.facebook.story.post_text':
            [getLocalString('pages.campaigns.errors.campaignPlacementPostTextMaxLength')] }
      ),
      ...(!fields.campaign.non_profit.value && instagramFeedPlacement
        && (!instagramFeedPlacement.price.value || instagramFeedPlacement.price.value === 0)
          && { 'campaign.placements.instagram.feed.price':
            [getLocalString('pages.campaigns.errors.campaignCPMRequired')] }
      ),
      ...(!fields.campaign.non_profit.value && instagramFeedPlacement && instagramFeedPlacement.post_text
        && instagramFeedPlacement.post_text.length > INSTAGRAM_FEED_POST_TEXT_MAX_LENGTH
          && { 'campaign.placements.instagram.feed.post_text':
            [getLocalString('pages.campaigns.errors.campaignPlacementPostTextMaxLength')] }
      ),
      ...(!fields.campaign.non_profit.value && instagramStoryPlacement
        && (!instagramStoryPlacement.price.value || instagramStoryPlacement.price.value === 0)
          && { 'campaign.placements.instagram.story.price':
            [getLocalString('pages.campaigns.errors.campaignCPMRequired')] }
      ),
      ...(!fields.campaign.non_profit.value && instagramStoryPlacement && instagramStoryPlacement.post_text
        && instagramStoryPlacement.post_text.length > INSTAGRAM_STORY_POST_TEXT_MAX_LENGTH
          && { 'campaign.placements.instagram.story.post_text':
            [getLocalString('pages.campaigns.errors.campaignPlacementPostTextMaxLength')] }
      ),
      ...(!fields.campaign.non_profit.value && twitterFeedPlacement
        && (!twitterFeedPlacement.price.value || twitterFeedPlacement.price.value === 0)
          && { 'campaign.placements.twitter.feed.price':
            [getLocalString('pages.campaigns.errors.campaignCPMRequired')] }
      ),
      ...(!fields.campaign.non_profit.value && twitterFeedPlacement && twitterFeedPlacement.post_text
        && twitterFeedPlacement.post_text.length > TWITTER_POST_TEXT_MAX_LENGTH
          && { 'campaign.placements.twitter.feed.post_text':
            [getLocalString('pages.campaigns.errors.campaignPlacementPostTextMaxLength')] }
      ),
    };

    // Validate creative templates
    if (feedCreativeTemplate && feedCreativeTemplate.assets.length === 1
      && feedCreativeTemplate.assets.filter(asset => asset.layout === 'back').length > 0) {
      errors['campaign.creative_templates'] = [
        ...[...errors['campaign.creative_templates'] || []],
        getLocalString('pages.campaigns.errors.campaignCreativeTemplateFeedOverlayRequired'),
      ];
    }

    if (storyCreativeTemplate && storyCreativeTemplate.assets.length === 1
      && storyCreativeTemplate.assets.filter(asset => asset.layout === 'back').length > 0) {
      errors['campaign.creative_templates'] = [
        ...[...errors['campaign.creative_templates'] || []],
        getLocalString('pages.campaigns.errors.campaignCreativeTemplateStoryOverlayRequired'),
      ];
    }

    if ((facebookFeedPlacement || instagramFeedPlacement || twitterFeedPlacement) && !feedCreativeTemplate) {
      errors['campaign.creative_templates'] = [
        ...[...errors['campaign.creative_templates'] || []],
        getLocalString('pages.campaigns.errors.campaignCreativeTemplateFeedRequired'),
      ];
    }

    if ((facebookStoryPlacement || instagramStoryPlacement) && !storyCreativeTemplate) {
      errors['campaign.creative_templates'] = [
        ...[...errors['campaign.creative_templates'] || []],
        getLocalString('pages.campaigns.errors.campaignCreativeTemplateStoryRequired'),
      ];
    }

    // Revalidate form
    isValid = Object.keys(errors).length === 0;

    if (isValid) {
      dispatch({
        type: CAMPAIGNS_UPDATE_CAMPAIGN_FORM,
        payload: {
          status: 'pending',
        },
      });

      updateCampaign(fields, params, dispatch);
    }

    // Return errors for invalid form fields (client validation)
    else {
      dispatch({
        type: CAMPAIGNS_UPDATE_CAMPAIGN_FORM,
        payload: {
          errors,
          status: 'error',
        },
      });
    }
  };
}

export function updateFormField(formTarget: IFormTarget) {
  return (dispatch, getState) => {
    const { brands, campaignForm }: ICampaignFormReducer = getState().campaignForm;
    const fields = updateForm<ICampaignForm>(campaignForm, formTarget);

    if (formTarget.name === 'campaign.brand_id') {
      const brand = brands.filter(brand => String(brand.value) === String(formTarget.value))[0];

      // Use existing brand
      if (brand) {
        fields.brand.color.isRequired = false;
        fields.brand.color.value = '';
        fields.brand.image.isRequired = false;
        fields.brand.image.value = '';
        fields.brand.name.isRequired = false;
        fields.brand.name.value = '';
        fields.campaign.brand_id.isRequired = true;
        fields.campaign.brand_id.value = brand.id;
      }

      // Create new brand
      else {
        fields.brand.color.isRequired = true;
        fields.brand.image.isRequired = true;
        fields.brand.name.isRequired = true;
        fields.campaign.brand_id.isRequired = false;
        fields.campaign.brand_id.value = 0;
      }
    }

    if (formTarget.name === 'campaign.creative_type') {
      const { value } = formTarget;
      const creativeTypes = {
        image: asset => asset.type === 'image' && asset.layout === 'front',
        segmentation: asset => asset.type === 'image' && (asset.layout === 'front' || asset.layout === 'back'),
        video: asset => asset.type === 'video' && asset.layout === 'front',
      };

      fields.campaign.creative_templates.value = fields.campaign.creative_templates.value.map(template => ({
        ...template,
        assets: template.assets.filter(creativeTypes[value]),
      }));
    }

    if (formTarget.name === 'campaign.non_profit') {
      if (fields.campaign.placements.value) {
        fields.campaign.placements.value = fields.campaign.placements.value.map((placement) => {
          placement.price = {
            ...placement.price,
            value: null,
          };
          return placement;
        });
      }

      fields.campaign.budget.isRequired = !formTarget.value;
      fields.campaign.paid_participations_count.isRequired = !formTarget.value;

      if (!formTarget.value) {
        fields.campaign.budget.value = null;
      }
    }

    dispatch({
      type: CAMPAIGNS_UPDATE_CAMPAIGN_FORM,
      payload: {
        campaignForm: fields,
        errors: {},
        status: null,
      },
    });
  };
}

export function updatePlacementPrice(params: ISocialNetworkPlacementPrice) {
  const { socialNetwork, type, value: price } = params;
  return (dispatch, getState) => {
    const { campaignForm, campaignForm: { campaign: { placements } } }: ICampaignFormReducer = getState().campaignForm;
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
    const fields = updateForm<ICampaignForm>(campaignForm, {
      name,
      value: updatedPlacements,
    });

    dispatch({
      type: CAMPAIGNS_UPDATE_CAMPAIGN_FORM,
      payload: {
        campaignForm: fields,
        errors: {},
        status: null,
      },
    });
  };
}

export function updatePlacementText(params: ISocialNetworkPlacementText) {
  const { socialNetwork, type, value: post_text } = params;

  return (dispatch, getState) => {
    const { campaignForm, campaignForm: { campaign: { placements } } }: ICampaignFormReducer = getState().campaignForm;
    const name = 'campaign.placements';
    const updatedPlacements: ISocialNetworkPlacement[] = placements.value.map((placement) => {
      if (placement.social_network === socialNetwork && placement.type === type) {
        placement.post_text = post_text;
      }
      return placement;
    });
    const fields = updateForm<ICampaignForm>(campaignForm, {
      name,
      value: updatedPlacements,
    });

    dispatch({
      type: CAMPAIGNS_UPDATE_CAMPAIGN_FORM,
      payload: {
        campaignForm: fields,
        errors: {},
        status: null,
      },
    });
  };
}

export function updatePlacementFormField(params: ISocialNetworkPlacementTypeFormField) {
  const { socialNetwork: social_network, type, value: isChecked } = params;

  return (dispatch, getState) => {
    const { campaignForm, campaignForm: { campaign: { placements } } }: ICampaignFormReducer = getState().campaignForm;
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

    const fields = updateForm<ICampaignForm>(campaignForm, { name, value });

    dispatch({
      type: CAMPAIGNS_UPDATE_CAMPAIGN_FORM,
      payload: {
        campaignForm: fields,
        errors: {},
        status: null,
      },
    });
  };
}

export function addCreativeTemplateAsset(params: ICampaignFormActionUploadCreativeTemplate) {
  const {
    formTarget: { value: { base64, formData, fileSize, fileType } },
    layout,
    placement,
  } = params;
  const type = fileType.split('/')[0];
  const name = 'campaign.creative_templates';

  return (dispatch, getState) => {
    dispatch({
      type: CAMPAIGNS_UPDATE_CAMPAIGN_FORM,
      payload: {
        errors: {},
        status: null,
      },
    });

    if (type === 'video') {
      if (fileSize > VIDEO_OVERLAY_MAX_FILE_SIZE) {
        const errors = {
          [`${name}.${placement}.size`]: getLocalString('pages.campaigns.create.design.errors.invalidAssetSize', {
            placeholders: {
              maxFileSize: `${VIDEO_OVERLAY_MAX_FILE_SIZE / 1024 / 1024} Mb`,
            },
          }),
        };

        dispatch({
          type: CAMPAIGNS_UPDATE_CAMPAIGN_FORM,
          payload: {
            errors,
            status: 'error',
          },
        });
      }

      else {
        uploadCreativeAsset({ formData, layout, name, placement, type }, dispatch, getState);
      }
    }

    if (type === 'image') {
      if (fileSize > STATIC_OVERLAY_MAX_FILE_SIZE) {
        const errors = {
          [`${name}.${placement}.size`]: getLocalString('pages.campaigns.create.design.errors.invalidAssetSize', {
            placeholders: {
              maxFileSize: `${STATIC_OVERLAY_MAX_FILE_SIZE / 1024 / 1024} Mb`,
            },
          }),
        };

        dispatch({
          type: CAMPAIGNS_UPDATE_CAMPAIGN_FORM,
          payload: {
            errors,
            status: 'error',
          },
        });
      }

      else {
        const image = new Image();
        image.src = base64;

        image.addEventListener('load', () => {
          const { height, width } = image;
          let aspectRatio: number = 1;

          if (placement === 'feed') {
            aspectRatio = FEED_CREATIVE_SIZE[0] / FEED_CREATIVE_SIZE[1];
          }
          if (placement === 'story') {
            aspectRatio = STORY_CREATIVE_SIZE[0] / STORY_CREATIVE_SIZE[1];
          }

          // Pass image with valid aspect ratio or any video
          if (aspectRatio === width / height) {
            uploadCreativeAsset({ formData, layout, name, placement, type }, dispatch, getState);
          }

          // Throw invalid aspect ratio error
          else {
            const errors = {
              [`${name}.${placement}.aspect`]:
                getLocalString('pages.campaigns.create.design.errors.invalidAspectRatio'),
            };

            dispatch({
              type: CAMPAIGNS_UPDATE_CAMPAIGN_FORM,
              payload: {
                errors,
                status: 'error',
              },
            });
          }
        });
      }
    }
  };
}

export function removeCreativeTemplateAsset(params: ICampaignFormActionRemoveCreativeTemplate) {
  const { id, placement } = params;
  const name = 'campaign.creative_templates';

  return (dispatch, getState) => {
    const { campaignForm }: ICampaignFormReducer = getState().campaignForm;
    let updatedCreativeTemplates: ICreativeTemplate[] = [...campaignForm.campaign.creative_templates.value];

    // Remove asset from assets of template
    if (updatedCreativeTemplates.filter(template => template.placement === placement).length > 0) {
      updatedCreativeTemplates = updatedCreativeTemplates.map((template) => {
        if (template.placement === placement) {
          template.assets = template.assets.filter(asset => asset.id !== id);
        }

        return template;
      });
    }
    updatedCreativeTemplates = updatedCreativeTemplates.filter(template => template.assets.length > 0);

    const value = updatedCreativeTemplates;
    const fields = updateForm<ICampaignForm>(campaignForm, { name, value });

    dispatch({
      type: CAMPAIGNS_UPDATE_CAMPAIGN_FORM,
      payload: {
        campaignForm: fields,
        errors: {},
      },
    });
  };
}

export function addGeoTarget(params: ICampaignFormActionAddGeoTarget) {
  const { geoTarget, geoTarget: { lat, lng } } = params;

  if (lat && lng) {
    return async (dispatch, getState) => {
      try {
        const { data: { features } } = await fetchGeoTargetData([lng, lat]);

        if (features.length > 0) {
          const {
            campaignForm: {
              campaign: { geo_targets },
            },
            currentGeoTarget,
          }: ICampaignFormReducer = getState().campaignForm;

          geoTarget.country_code = features[0].properties.short_code.toUpperCase();

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
        }

        else {
          dispatch({
            type: MODAL_DISPLAY,
            payload: {
              text: getLocalData('pages.campaigns.create.targeting.placeOnLandOnly'),
            },
          });
        }
      }

      catch (errors) {
        dispatch({
          type: CAMPAIGN_FORM_ERROR,
          payload: errors,
        });
      }
    };
  }

  return null;
}

export function updateGeoTarget(params: ICampaignFormActionUpdateGeoTarget) {
  const { id, lat, lng, name, radius } = params;

  if (lat && lng) {
    return async (dispatch, getState) => {
      try {
        const {
          campaignForm: {
            campaign: { geo_targets },
          },
          currentGeoTarget,
          lastGeoTarget,
        }: ICampaignFormReducer = getState().campaignForm;
        const { data: { features } } = await fetchGeoTargetData([lng, lat]);

        if (features.length > 0) {
          const geoTarget = {
            ...geo_targets.value.filter(geoTargetItem => String(geoTargetItem.id) === String(id))[0],
            name,
            lat,
            lng,
            country_code: features[0].properties.short_code.toUpperCase(),
          };

          if (geo_targets.value.filter(
            geoTargetItem => geoTargetItem.kind === 'country' && geoTargetItem.country_code === geoTarget.country_code,
          ).length > 0 && !currentGeoTarget) {
            dispatch({
              type: CAMPAIGN_FORM_DIALOG_DISPLAY,
              payload: {
                currentGeoTarget: geoTarget,
                isCurrentGeoTargetNeedUpdate: true,
                type: 'targetNestingWarning',
              },
            });
          }

          else {
            dispatch({
              type: CAMPAIGN_FORM_UPDATE_GEO_TARGET,
              payload: geoTarget,
            });
          }
        }

        else {
          dispatch({
            type: MODAL_DISPLAY,
            payload: {
              text: getLocalData('pages.campaigns.create.targeting.placeOnLandOnly'),
            },
          });
          dispatch({
            type: CAMPAIGN_FORM_REMOVE_GEO_TARGET,
            payload: [id],
          });
          dispatch({
            type: CAMPAIGN_FORM_ADD_GEO_TARGET,
            payload: {
              ...lastGeoTarget,
              id: (new Date().getTime() / 1000).toString(),
              kind: 'circle',
            },
          });
        }
      }

      catch (errors) {
        dispatch({
          type: CAMPAIGN_FORM_ERROR,
          payload: errors,
        });
      }
    };
  }

  if (radius) {
    return (dispatch) => {
      dispatch({
        type: CAMPAIGN_FORM_UPDATE_GEO_TARGET,
        payload: { id, radius },
      });
    };
  }

  return null;
}

export function removeGeoTargets(params: ICampaignFormActionRemoveGeoTargets) {
  const { ids } = params;

  return (dispatch) => {
    dispatch({
      type: CAMPAIGN_FORM_REMOVE_GEO_TARGET,
      payload: ids,
    });
  };
}

function uploadCreativeAsset(params, dispatch, getState) {
  const { formData, layout, name, placement, type } = params;
  const { campaignForm }: ICampaignFormReducer = getState().campaignForm;
  let updatedCreativeTemplates: ICreativeTemplate[] = [...campaignForm.campaign.creative_templates.value];

  // Update existing template
  if (updatedCreativeTemplates.filter(template => template.placement === placement).length > 0) {
    updatedCreativeTemplates = updatedCreativeTemplates.map((template) => {
      if (template.placement === placement) {
        // Update existing layout (back or front)
        if (template.assets.filter(asset => asset.layout === layout).length > 0) {
          template.assets = template.assets.map((asset) => {
            if (asset.layout === layout) {
              asset.layout = layout;
              asset.type = type;
              delete asset.url;
            }
            return asset;
          });
        }

        // Add new layout
        else {
          template.assets.push({
            layout,
            type,
          });
        }

        template.placement = placement;
      }

      return template;
    });
  }

  // Add new placement with new layout
  else {
    updatedCreativeTemplates.push({
      placement,
      assets: [{
        layout,
        type,
      }],
    });
  }

  const value = updatedCreativeTemplates;
  const fields = updateForm<ICampaignForm>(campaignForm, { name, value });

  dispatch({
    type: CAMPAIGNS_UPDATE_CAMPAIGN_FORM,
    payload: {
      campaignForm: fields,
      status: 'loading',
    },
  });

  post(ASSETS_UPLOAD_URI, formData)
    .then(({ data: { data }, status }) => {
      if (status === 200 && data) {
        const { url } = data.asset;
        const {
          campaignForm,
          campaignForm: {
            campaign: {
              creative_templates: { value: creativeTemplates },
            },
          },
        }: ICampaignFormReducer = getState().campaignForm;
        const value = creativeTemplates.map((template) => {
          if (template.placement === placement) {
            template.assets = template.assets.map((asset) => {
              if (asset.layout === layout) {
                asset.url = url;
              }
              return asset;
            });
          }
          return template;
        });
        const fields = updateForm<ICampaignForm>(campaignForm, { name, value });

        dispatch({
          type: CAMPAIGNS_UPDATE_CAMPAIGN_FORM,
          payload: {
            campaignForm: fields,
            status: null,
          },
        });
      }
    })

    .catch((error = {}) => {
      if (error.message) {
        const errors = {
          campaignForm: [getLocalString('ui.errors.internalServerError')],
        };

        dispatch({
          type: CAMPAIGNS_UPDATE_CAMPAIGN_FORM,
          payload: {
            errors,
            status: 'error',
          },
        });
      }

      if (error.response) {
        const { status } = error.response;
        const {
          campaignForm,
          campaignForm: { campaign: { creative_templates: { value: creativeTemplates } } },
        }: ICampaignFormReducer = getState().campaignForm;
        const value = creativeTemplates.map((template) => {
          if (template.placement === placement) {
            template.assets = template.assets.filter(asset => asset.layout !== layout);
          }
          return template;
        });
        const fields = updateForm<ICampaignForm>(campaignForm, { name, value });

        dispatch({
          type: CAMPAIGNS_UPDATE_CAMPAIGN_FORM,
          payload: {
            campaignForm: fields,
            status: null,
          },
        });

        // Internal server error cases
        if (status === 404 || status === 500) {
          const errors = {
            [name]: [getLocalString('ui.errors.internalServerError')],
          };

          dispatch({
            type: CAMPAIGNS_UPDATE_CAMPAIGN_FORM,
            payload: {
              errors,
              status: 'error',
            },
          });
        }
      }
    });
}

export function displayDialog({ type }) {
  return (dispatch) => {
    dispatch({
      type: CAMPAIGN_FORM_DIALOG_DISPLAY,
      payload: type,
    });
  };
}

export function closeDialog() {
  return (dispatch) => {
    dispatch({
      type: CAMPAIGN_FORM_DIALOG_CLOSE,
    });
  };
}

async function updateCampaign(form: IFormFields, params: ICampaignFormActionSubmitParams = {}, dispatch) {
  const { isDraft = false, isCopy, method } = params;
  const payload = serializeFormData(form);
  const campaignId = payload.campaign.id;
  const isNew = !campaignId || isCopy;
  const url = isNew ? CAMPAIGNS_URI_CREATE_CAMPAIGN : `${CAMPAIGNS_URI_CREATE_CAMPAIGN}/${campaignId}`;

  // Delete redundant brand id if new brand is selected
  if (payload.campaign.brand_id) {
    payload.brand = null;
  }

  // ToDo: use campaign id instead
  // Delete redundant id
  if (!payload.campaign.id) {
    delete payload.campaign.id;
  }

  // Delete redundant budget in campaign in non profit
  if (payload.campaign.non_profit) {
    delete payload.campaign.budget;
  }

  // Add brand image file type
  if (payload.brand) {
    payload.brand.image_type = getBase64ImageType(payload.brand.image);
  }

  if (payload.campaign.brand_id === 0) {
    payload.campaign.brand_id = null;
  }

  // Cast types
  if (payload.campaign.budget) {
    payload.campaign.budget = Currency.toCents(payload.campaign.budget.value);
  }

  // Cast prices type to number
  payload.campaign.placements = payload.campaign.placements.map(placement => ({
    ...placement,
    price: placement.price.value ? Currency.toCents(placement.price.value) : placement.price.value,
  }));

  payload.campaign.start_at = moment(payload.campaign.start_at).format();
  payload.campaign.end_at = moment(payload.campaign.end_at).format();

  if (payload.campaign.min_age === 65) {
    payload.campaign.min_age = null;
  }
  if (payload.campaign.max_age === 65) {
    payload.campaign.max_age = null;
  }

  // Remove excess ids of geo targets
  payload.campaign.geo_targets = payload.campaign.geo_targets.map((geoTarget) => {
    delete geoTarget.id;
    return geoTarget;
  });

  // Set draft / published state
  payload.campaign.draft = isDraft;

  await request({
    method,
    url,
    data: payload,
  })

  .then((response) => {
    const { status } = response;

    // Campaign is created
    if (status === 200 || status === 201) {
      dispatch({
        type: CAMPAIGNS_UPDATE_CAMPAIGN_FORM,
        payload: {
          errors: {},
          redirect: routes.campaigns.path,
          status: null,
        },
      });
    }
  })

  .catch((error = {}) => {
    if (error.message) {
      const errors = {
        campaignForm: [getLocalString('ui.errors.internalServerError')],
      };

      dispatch({
        type: CAMPAIGNS_UPDATE_CAMPAIGN_FORM,
        payload: {
          errors,
          status: 'error',
        },
      });
    }

    if (error.response) {
      const { data = {}, status } = error.response;

      // Return validation errors (server validation)
      if (status === 400 || status === 401) {
        const errors = reduceFormErrors(data.errors);

        dispatch({
          type: CAMPAIGNS_UPDATE_CAMPAIGN_FORM,
          payload: {
            errors,
            status: 'error',
          },
        });
      }

      // Internal server error cases
      if (status === 404 || status === 500) {
        const errors = {
          campaignForm: [getLocalString('ui.errors.internalServerError')],
        };

        dispatch({
          type: CAMPAIGNS_UPDATE_CAMPAIGN_FORM,
          payload: {
            errors,
            status: 'error',
          },
        });
      }
    }
  });
}

function fetchGeoTargetData(lngLat: GeoLocationCoordiantes) {
  const [lng, lat] = lngLat;

  return request(
    {
      method: 'GET',
      params: {
        access_token: MAPBOX_TOKEN,
      },
      url: MAPBOX_GEOCODING_API_URI.replace(':lngLat', `${lng},${lat}`),
    },
    {
      absoluteUri: true,
      noAuthToken: true,
    },
  );
}
