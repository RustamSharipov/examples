import { IBrand } from 'apps/brands/interfaces';
import { IBrandFields } from 'apps/campaigns/interfaces/brandForm';
import { ICampaign, ISocialNetworkPlacement } from 'apps/campaigns/interfaces/campaign';
import { ICampaignFields } from 'apps/campaigns/interfaces/campaignForm';
import { ERRORS_STRINGS, POST_TEXT_MAX_LENGTH, BRAND_NAME_MAX_LENGTH } from 'constants/campaigns';
import { Currency } from 'utils/number';
import { getLocalString } from 'utils/localization';

interface ICampaignFormProps {
  brand: IBrand;
  campaign: ICampaign;
}

export default class CampaignForm {
  public brand: IBrandFields;
  public campaign: ICampaignFields;

  constructor(props?: ICampaignFormProps) {
    const editableFields = props && props.campaign && props.campaign.editable_fields;
    // const isFullEdit =

    this.brand = {
      color: {
        isRequired: false,
        nonEditable: editableFields && !editableFields.includes('brand.color'),
        requiredError: ERRORS_STRINGS.BRAND_COLOR_REQUIRED,
        value: props && props.brand && props.brand.color || '#ffffff',
      },
      image: {
        isRequired: false,
        nonEditable: editableFields && !editableFields.includes('brand.image'),
        requiredError: ERRORS_STRINGS.BRAND_IMAGE_REQUIRED,
        value: props && props.brand && props.brand.image || '',
      },
      name: {
        isRequired: false,
        maxLength: BRAND_NAME_MAX_LENGTH,
        nonEditable: editableFields && !editableFields.includes('brand.name'),
        requiredError: ERRORS_STRINGS.BRAND_NAME_REQUIRED,
        value: props && props.brand && props.brand.name || '',
      },
    };
    this.campaign = {
      id: {
        value: props && props.campaign && props.campaign.id || null,
      },
      brand_id: {
        nonEditable: editableFields && !editableFields.includes('campaign.brand_id'),
        isRequired: true,
        requiredError: ERRORS_STRINGS.BRAND_ID_REQUIRED,
        value: props && props.campaign && props.campaign.brand_id || null,
      },
      budget: {
        isRequired: true,
        nonEditable: editableFields && !editableFields.includes('campaign.budget'),
        requiredError: ERRORS_STRINGS.CAMPAIGN_BUDGET,
        value: props && props.campaign && props.campaign.budget
          && { value: Currency.fromCents(props.campaign.budget.value) } || null,
      },
      non_profit: {
        nonEditable: editableFields && !editableFields.includes('campaign.non_profit'),
        value: props && props.campaign && props.campaign.non_profit || false,
      },
      geo_targets: {
        nonEditable: editableFields && !editableFields.includes('campaign.geo_targets'),
        value: props && props.campaign && props.campaign.geo_targets || [],
      },
      creative_type: {
        isRequired: true,
        nonEditable: editableFields && !editableFields.includes('campaign.creative_type'),
        value: props && props.campaign && props.campaign.creative_type || 'segmentation',
      },
      creative_templates: {
        nonEditable: editableFields && !editableFields.includes('campaign.creative_templates'),
        value: props && props.campaign && props.campaign.creative_templates || [],
      },
      description: {
        nonEditable: editableFields && !editableFields.includes('campaign.description'),
        isRequired: true,
        maxLength: POST_TEXT_MAX_LENGTH,
        maxLengthError: getLocalString('pages.campaigns.errors.campaignPostTextMaxLength'),
        requiredError: getLocalString('pages.campaigns.errors.campaignPostTextRequired'),
        value: props && props.campaign && props.campaign.description || null,
      },
      start_at: {
        nonEditable: editableFields && !editableFields.includes('campaign.start_at'),
        isRequired: true,
        requiredError: ERRORS_STRINGS.CAMPAIGN_START_AT,
        value: props && props.campaign && props.campaign.start_at || null,
      },
      end_at: {
        nonEditable: editableFields && !editableFields.includes('campaign.end_at'),
        isRequired: true,
        requiredError: ERRORS_STRINGS.CAMPAIGN_END_AT,
        value: props && props.campaign && props.campaign.end_at || null,
      },
      face_required: {
        nonEditable: editableFields && !editableFields.includes('campaign.face_required'),
        value: props && props.campaign && props.campaign.face_required !== undefined
          ? props.campaign.face_required
          : true,
      },
      max_age: {
        nonEditable: editableFields && !editableFields.includes('campaign.max_age'),
        value: props && props.campaign && props.campaign.max_age || 65,
      },
      min_age: {
        nonEditable: editableFields && !editableFields.includes('campaign.min_age'),
        value: props && props.campaign && props.campaign.min_age || 16,
      },
      name: {
        nonEditable: editableFields && !editableFields.includes('campaign.name'),
        isRequired: true,
        requiredError: ERRORS_STRINGS.CAMPAIGN_NAME_REQUIRED,
        value: props && props.campaign && props.campaign.name || '',
      },
      paid_participations_count: {
        isRequired: true,
        nonEditable: editableFields && !editableFields.includes('campaign.paid_participations_count'),
        requiredError: ERRORS_STRINGS.CAMPAIGN_PAID_PARTICIPATIONS_COUNT_REQUIRED,
        value: props && props.campaign && props.campaign.paid_participations_count || null,
      },
      placements: {
        isRequired: true,
        nonEditable: editableFields && !editableFields.includes('campaign.placements'),
        requiredError: ERRORS_STRINGS.CAMPAIGN_SOCIAL_NETWORKS_REQUIRED,
        value: props && props.campaign && props.campaign.placements
          ? [...props.campaign.placements].map((placement: ISocialNetworkPlacement) => ({
            ...placement,
            price: {
              currency_code: placement.price.currency_code,
              value: Currency.fromCents(placement.price.value),
            },
          }))
          : [
            {
              post_text: null,
              price: {
                value: null,
              },
              social_network: 'instagram',
              type: 'feed',
            },
            {
              post_text: null,
              price: {
                value: null,
              },
              social_network: 'instagram',
              type: 'story',
            },
            {
              post_text: null,
              price: {
                value: null,
              },
              social_network: 'twitter',
              type: 'feed',
            },
          ],
      },
      sex: {
        nonEditable: editableFields && !editableFields.includes('campaign.sex'),
        value: props && props.campaign && props.campaign.sex || ['male', 'female'],
      },
      time_zone: {
        nonEditable: editableFields && !editableFields.includes('campaign.time_zone'),
        value: props && props.campaign && props.campaign.time_zone || '',
      },
    };
  }
}
